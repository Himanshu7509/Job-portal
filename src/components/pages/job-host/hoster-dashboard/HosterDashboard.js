import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import HostSidebar from "./sidebar/HostSidebar";
import Statistics from "./statistics/Statistics";
import LineChart from "./Graph/LineChart";
import { Plus, Loader2 } from "lucide-react";

const JobHostingDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

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

      setJobs(result.success && result.jobs ? result.jobs : []);
      setStats(result.statistics);
      console.log(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:block fixed top-0 left-0 w-64 h-screen">
        <HostSidebar />
      </div>

      <div className="lg:ml-64 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 lg:justify-between">
            <h1 className=" ml-4 text-3xl text-center md:text-3xl mb-4 lg:text-4xl mr-4 font-bold text-zinc-600">
              Dashboard
            </h1>
            <Link to="/jobpost">
              <button className="hidden sm:block lg:bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
                Post Job
              </button>
            </Link>
          </div>

          <div className="mb-8">
            <Statistics stats={stats} />
          </div>

          <div className="flex flex-col md:flex-col lg:flex-row gap-8 w-full">
            <div className="lg:w-3/5 w-full shadow-lg p-2 sm:p-4 bg-white rounded-xl">
              <LineChart jobs={jobs} />
            </div>

            <div className="lg:w-2/5 w-full bg-white rounded-xl p-4 h-[680px] overflow-y-scroll -ms-overflow-style-none" style={{ scrollbarWidth: 'none' }}>
              <h2 className="text-xl md:text-2xl text-zinc-600 font-semibold mb-6 text-center md:text-left">
                Posted Jobs
              </h2>

              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="text-gray-500">Loading...</div>
                </div>
              ) : jobs.length === 0 ? (
                <div className="flex items-center justify-center h-48">
                  <p className="text-gray-500">No jobs found.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {jobs.map((job) => (
                    <div
                      key={job._id}
                      className="group bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-sky-200 text-sky-700 font-bold flex items-center justify-center rounded-lg text-xl md:text-2xl uppercase">
                          {job.title.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-blue-600 transition-colors duration-200">
                            {job.title}
                          </h3>
                          <p className="text-gray-600 text-sm md:text-base">
                            {job.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHostingDashboard;
