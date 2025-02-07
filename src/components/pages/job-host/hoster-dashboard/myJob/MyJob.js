import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import HostSidebar from "../sidebar/HostSidebar";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { Menu } from "lucide-react";

const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      console.log("API Response:", result);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch jobs. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      if (result.success && result.jobs) {
        setJobs(result.jobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplicant = (jobId) => {
    navigate(`/job/${jobId}/applicants`);
  };

  const handleDeleteJob = async (jobId) => {
    const token = Cookies.get("jwtToken");

    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    console.log("Attempting to delete job with ID:", jobId);

    const deleteUrl = `https://jobquick.onrender.com/job/${jobId}`;

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("Delete API Response:", result);

      if (!response.ok) {
        throw new Error(
          `Failed to delete job. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Delete Job Error:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-center mt-5 text-5xl text-pink-500 font-semibold">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h1 className="text-red-500 text-lg font-semibold">Error: {error}</h1>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-6 py-2 rounded mt-4 hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar wrapper - only shown on larger screens */}
      <div className="lg:block w-64 fixed top-0 left-0 h-screen z-20">
        <HostSidebar />
      </div>

    

      {/* Main content area with improved responsive padding */}
      <div className="w-full lg:w-[calc(100%-16rem)] lg:ml-64 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 lg:mb-12">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            My Jobs 
          </span>
        </h1>

        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm">
            <BsFillBriefcaseFill className="h-16 w-16 text-pink-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              No jobs found
            </h2>
            <p className="text-gray-500 mt-2">
              Start by posting your first job
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent bg:text-2xl">
                      {job.title}
                    </h2>
                    <span className="px-3 py-1 text-sm font-medium text-pink-600 bg-pink-50 rounded-full">
                      {job.jobType}
                    </span>
                  </div>

                  <div className="space-y-4 mt-8">
                    <div className="flex items-center text-gray-700 hover:text-pink-500 transition-colors">
                      <BsFillBriefcaseFill className="h-5 w-5 mr-3 text-purple-500" />
                      <span className="font-medium">{job.companyName}</span>
                    </div>
                    <div className="flex items-center text-gray-700 hover:text-pink-500 transition-colors">
                      <FaLocationDot className="h-5 w-5 mr-3 text-purple-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700 hover:text-pink-500 transition-colors">
                      <FaUser className="h-5 w-5 mr-3 text-purple-500" />
                      <span>{job.noOfOpeaning} openings</span>
                    </div>
                  </div>

                  {job.skills?.length > 0 && (
                    <div className="mt-5">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-pink-100 to-blue-100 text-gray-700 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                      onClick={() => handleViewApplicant(job._id)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600  text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-700 transition-all duration-300 transform"
                    >
                      View Applicants
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform"
                    >
                      Delete Job
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJob;
