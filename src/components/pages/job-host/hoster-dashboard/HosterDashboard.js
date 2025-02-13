import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import HostSidebar from "./sidebar/HostSidebar";
import Statistics from "./statistics/Statistics";
import LineChart from "./Graph/LineChart";
import PieChart from "./Graph/PieChart";
import { Plus, Loader2 } from "lucide-react";

const HosterDashboard = () => {
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
      console.log(result)

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch jobs");
      }

      setJobs(result.success && result.jobs ? result.jobs : []);
      setStats(result.statistics);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 h-screen fixed top-0 left-0">
        <HostSidebar />
      </div>

      {/* Main Content */}
      <div className="p-2 w-full lg:w-[83%] ml-auto sm:p-5">
        <div className="w-full lg:max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              Dashboard
            </h1>
            <Link to="/jobpost">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hidden sm:flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                <span>Post Job</span>
              </button>
            </Link>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column - Stats & Graph */}
            <div className="lg:col-span-3 space-y-6">
              {/* Statistics Cards */}
              <div className="">
                <Statistics stats={stats} />
              </div>

              {/* Line Chart */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <LineChart jobs={jobs} />
              </div>
            </div>

            {/* Right Column - Pie Chart & Jobs List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pie Chart */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <PieChart jobs={jobs} />
              </div>

              {/* Jobs List */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Posted Jobs</h2>
                
                {loading ? (
                  <div className="flex items-center justify-center h-48">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-48">
                    <p className="text-red-500">{error}</p>
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 gap-3">
                    <p className="text-gray-500">No jobs posted yet</p>
                    <Link to="/jobpost">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Post your first job
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-4 h-auto sm:h-[110px] overflow-y-scroll -ms-overflow-style-none" style={{ scrollbarWidth: 'none' }}>
                    {jobs.map((job) => (
                      <Link 
                        key={job._id} 
                        to="/host-jobs"
                        className="block group"
                      >
                        <div className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg transition-all duration-200">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 font-bold flex items-center justify-center rounded-lg text-xl uppercase">
                              {job.title.charAt(0)}
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
    </div>
  );
};

export default HosterDashboard;