import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Bookmark,
} from "lucide-react";
import Cookies from "js-cookie";
import HostSidebar from "./sidebar/HostSidebar";

const JobHostingDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jobToken = Cookies.get("jwtToken");
  const jobId = Cookies.get("userId");

  const JOBS_API = `https://jobquick.onrender.com/job/createdby/${jobId}`;

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(JOBS_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jobToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load job listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (jobToken && jobId) {
      fetchPostedJobs();
    }
  }, [JOBS_API, jobToken, jobId]);


  const stats = {
    postedJobs: jobs.length || 0,

  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="w-1/4 h-screen fixed top-0 left-0">
        <HostSidebar />
      </div>
      
      <div className="p-2 sm:w-3/4 ml-auto sm:p-10">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/jobpost">
              <button className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold">
                Post a Job
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              number: stats.postedJobs.toString().padStart(2, '0'), 
              label: "Posted Jobs", 
              icon: <User className="w-6 h-6 text-pink-600" /> 
            }
            
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Posted Jobs</h2>
            <div className="space-y-4">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div key={job._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        {job.companyName?.[0] || '?'}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{job.title}</div>
                        <div className="text-sm text-gray-500">
                          {job.jobType} · {job.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No jobs posted yet
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