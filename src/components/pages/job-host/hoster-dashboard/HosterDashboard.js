import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { IoEllipsisHorizontal } from "react-icons/io5";
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
      <div className="w-1/4 h-screen fixed top-0 left-0">
        <HostSidebar />
      </div>
      <div className="p-2 sm:w-3/4 ml-auto sm:p-10">
        <div className="flex justify-between items-center">
          <h1 className="mt-2 text-4xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
            Dashboard
          </h1>
          <Link to="/jobpost">
            <button className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-blue-500 hover:font-semibold px-4 py-2 rounded cursor-pointer">
              Post Job
            </button>
          </Link>
        </div>
        <Statistics stats={stats} />
        <h2 className="text-xl font-semibold mb-4">Posted Jobs</h2>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="w-full max-w-lg">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-gray-100 p-4 rounded-lg flex items-center justify-between shadow-md mb-4"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 text-gray-700 font-semibold flex items-center justify-center rounded-lg text-xl uppercase">
                    {job.title.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">{job.title}</h3>
                    <p className="text-gray-500">Full-time • {job.location}</p>
                  </div>
                </div>
                <IoEllipsisHorizontal className="text-gray-500 text-xl cursor-pointer" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobHostingDashboard;
