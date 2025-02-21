import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import HostSidebar from "./sidebar/HostSidebar";
import Statistics from "./statistics/Statistics";
import LineChart from "./Graph/LineChart";
import PieChart from "./Graph/PieChart";
import { Loader2 } from "lucide-react";
import JobApplications from "../hoster-dashboard/table/JobApplications";
import { FaBriefcase } from "react-icons/fa";

const HosterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [applicantsData, setApplicantsData] = useState({});

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

    try {
      const response = await fetch(
        `https://jobquick.onrender.com/job/createdby/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch jobs");
      }

      const jobsData = result.success && result.jobs ? result.jobs : [];
      setJobs(jobsData);
      setStats(result.statistics);

      // Only fetch applicants data if there are jobs
      if (jobsData.length > 0) {
        await fetchAllApplicantsData(jobsData, token);
      }
      setLoading(false); // Set loading to false regardless of jobs existence
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchAllApplicantsData = async (jobsData, token) => {
    try {
      const data = {};
      await Promise.all(
        jobsData.map(async (job) => {
          const response = await fetch(
            `https://jobquick.onrender.com/applicants/graph/${job._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const result = await response.json();
          data[job._id] = result.data || [];
        })
      );
      setApplicantsData(data);
    } catch (error) {
      console.error("Error fetching applicants data:", error);
    }
  };

  const lineGraphs = () => {
    if (!jobs.length) return null;
    return (
      <div className="bg-white rounded-xl shadow-sm p-2 lg:mt-8">
        <LineChart jobs={jobs} applicantsData={applicantsData} />
      </div>
    );
  };

  const pieGraphs = () => {
    if (!jobs.length) return null;
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <PieChart jobs={jobs} applicantsData={applicantsData} />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
          <HostSidebar />
        </div>
        <div className="w-full lg:ml-72 xl:ml-76 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
          <HostSidebar />
        </div>
        <div className="w-full lg:ml-72 xl:ml-76 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
        <HostSidebar />
      </div>

      <div className="w-full lg:ml-72 xl:ml-76 p-3 sm:p-4 lg:p-2 mt-2 xl:p-4 overflow-y-auto">
        <div className="max-w-7xl xl:max-w-[130rem] mx-auto space-y-4 sm:space-y-4">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 lg:mt-0">
              <div>
                <div className="mb-4">
                  <Statistics stats={stats} />
                </div>
                {lineGraphs()}
              </div>

              <div>
                {pieGraphs()}
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Posted Jobs
                    </h2>

                    {jobs.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-[138px] gap-3">
                        <p className="text-gray-500">No jobs posted yet</p>
                        <Link to="/jobpost">
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-xl">
                            Post your first job
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div
                        className={`grid gap-4 ${
                          jobs.length > 3
                            ? "h-auto lg:h-[345px] overflow-y-scroll -ms-overflow-style-none"
                            : "h-auto"
                        }`}
                        style={jobs.length > 3 ? { scrollbarWidth: "none" } : {}}
                      >
                        {jobs.map((job) => (
                          <Link
                            key={job._id}
                            to="/host-jobs"
                            className="block group"
                          >
                            <div className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg transition-all duration-200">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 font-bold flex items-center justify-center rounded-lg text-xl uppercase">
                                  <FaBriefcase />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                                    {job.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm">
                                    {job.location}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:max-w-[130rem]">
          <JobApplications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HosterDashboard;