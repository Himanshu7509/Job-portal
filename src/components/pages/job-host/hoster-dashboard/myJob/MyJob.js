import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { TbCategory } from "react-icons/tb";
import { FaUserClock } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import HostSidebar from "../sidebar/HostSidebar";

const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("jwtToken");

    if (!userId || !token) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    const apiUrl = `https://jobquick.onrender.com/job/createdby/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to fetch jobs. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      setJobs(result.success && result.jobs ? result.jobs : []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplicants = async (jobId) => {
    navigate(`/job/${jobId}/applicants`);
  };

  const handleDeleteJob = async () => {
    if (!selectedJob) return;
    const token = Cookies.get("jwtToken");

    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    const deleteUrl = `https://jobquick.onrender.com/job/${selectedJob}`;

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to delete job. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== selectedJob));
      setSelectedJob(null);
    } catch (error) {
      setError(error.message);
    }
  };


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-500">
        <p className="text-red-600 text-5xl">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
          <HostSidebar />
        </div>

        <div className="p-2 w-full lg:w-3/4 ml-auto sm:p-8 h-auto sm:h-[690px] overflow-y-scroll -ms-overflow-style-none" style={{ scrollbarWidth: 'none' }}>
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md sm:p-8 p-2">
            <h1 className="mt-2 text-4xl font-bold text-center sm:text-left text-transparent text-zinc-600 mb-6">
              My Jobs
            </h1>

            <div className="sm:p-6 p-2">
              {jobs.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-xl text-gray-500">No jobs found</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                  {jobs.map((job) => {
                    const isExpanded = expandedId === job?._id;

                    return (
                      <div
                        key={job?._id}
                        className={`bg-white border border-gray-200 shadow-lg sm:p-6 p-3 ${
                          isExpanded ? "h-auto" : "h-fit"
                        }`}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-10 bg-pink-100 text-zinc-700 font-bold flex items-center justify-center rounded-xl text-2xl uppercase">
                              {job.companyName.charAt(0)}
                            </div>
                            <div className="w-full">
                              <p className="font-semibold text-zinc-700 sm:text-lg text-md">
                                {job.companyName}
                              </p>
                              <p className="text-sm text-gray-500 truncate max-w-full overflow-hidden whitespace-nowrap font-semibold">
                                {new Date(job.dateCreated).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="text-lg text-gray-600 font-semibold">
                                {job.title}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              setExpandedId(isExpanded ? null : job?._id)
                            }
                            className="mt-4 text-blue-600 font-semibold cursor-pointer"
                          >
                            {isExpanded ? "View Less" : "View More"}
                          </button>

                          {isExpanded && (
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Left Side */}
                              <div className="flex items-center gap-3">
                                <BsPersonWorkspace className="w-5 h-5 text-zinc-600" />
                                <div>
                                  
                                  <p className="font-medium text-gray-900">
                                    {job.workType}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <FaUserClock className="w-5 h-5 text-zinc-600" />
                                <div>
                                  
                                  <p className="font-medium text-gray-900">
                                    {job.jobType}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <GiWallet className="w-5 h-5 text-zinc-600" />
                                <div>
                                 
                                  <p className="font-medium text-gray-900">
                                    ${job.minPackage} - ${job.maxPackage}
                                  </p>
                                </div>
                              </div>

                              {/* Right Side */}
                              <div className="flex items-center gap-3">
                                <FaLocationDot className="w-5 h-5 text-zinc-600" />
                                <div>
                                 
                                  <p className="font-medium text-gray-900">
                                    {job.location}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <GrUserWorker className="w-5 h-5 text-zinc-600" />
                                <div>
                                 
                                  <p className="font-medium text-gray-900">
                                    {job.experience}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <TbCategory className="w-5 h-5 text-zinc-600" />
                                <div>
                                  
                                  <p className="font-medium text-gray-900">
                                    {job.category?.title || "Uncategorized"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Shortlist Button */}
                          <div className="flex justify-between w-full mt-4 space-x-4">
                            <button
                              onClick={() => handleViewApplicants(job._id)}
                              className="flex-1 h-10 bg-blue-500 text-white rounded-md font-semibold shadow-md"
                            >
                              Applicants
                            </button>
                            <button
                              onClick={() => setSelectedJob(job._id)}
                              className="flex-1 h-10 bg-red-500 text-white rounded-md font-semibold shadow-md "
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {selectedJob && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
                  <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Are you sure you want to delete this job?
                    </h2>
                    <div className="mt-6 flex justify-center gap-6">
                      <button
                        onClick={handleDeleteJob}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setSelectedJob(null)}
                        className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition shadow-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyJob;
