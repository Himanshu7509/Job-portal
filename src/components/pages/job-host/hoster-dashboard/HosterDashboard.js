import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import HostSidebar from "./sidebar/HostSidebar";
import Statistics from "./statistics/Statistics";

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="w-1/4 h-screen fixed top-0 left-0 z-50">
        <HostSidebar />
      </div>

      <div className="p-2 w-full sm:w-3/4 ml-auto sm:p-10">
        <div className="flex sm:justify-between justify-center items-center">
          <h1 className="mt-10 text-4xl font-bold text-zinc-600 mb-6">
            Dashboard
          </h1>
          <Link to="/jobpost">
            <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded cursor-pointer sm:block hidden">
              Post Job
            </button>
          </Link>
        </div>

        <Statistics stats={stats} />

        <h2 className="text-2xl text-zinc-600 font-semibold mb-4">Posted Jobs</h2>

        {loading ? (
          <h2>Just a sec...</h2>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-start transition-transform duration-300 hover:shadow-xl"
              >
                <div className="flex items-center w-full">
                  <div className="w-14 h-14 bg-sky-200 text-sky-700 font-bold flex items-center justify-center rounded-xl text-2xl uppercase">
                    {job.title.charAt(0)}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-lg text-gray-800">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 text-md font-semibold">{job.location}</p>
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

export default JobHostingDashboard;
