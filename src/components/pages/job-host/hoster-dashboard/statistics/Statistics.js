import React from "react";
import { FaBriefcase, FaUsers, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";

const Statistics = ({ stats }) => {
  if (!stats) {
    return <p className="text-center text-gray-600">Loading statistics...</p>;
  }

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
        <div className="bg-white hover:bg-blue-50 rounded-xl shadow hover:shadow-lg transition-all duration-300 flex items-stretch">
          <div className="flex items-center p-2 w-full xl:p-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg mr-4 flex-shrink-0">
              <FaBriefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-600 font-medium mb-1">Total Jobs</p>
              <p className="text-blue-800 text-2xl xl:text-3xl font-bold">
                {stats?.totalJobs?.toLocaleString() || "0"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white hover:bg-green-50 rounded-xl shadow hover:shadow-lg transition-all duration-300 flex items-stretch">
          <div className="flex items-center p-2 w-full xl:p-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-lg mr-4 flex-shrink-0">
              <FaUsers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-600 font-medium mb-1">Applicants</p>
              <p className="text-green-800 text-2xl xl:text-3xl font-bold">
                {stats?.totalApplicants?.toLocaleString() || "0"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white hover:bg-yellow-50 rounded-xl shadow hover:shadow-lg transition-all duration-300 flex items-stretch">
          <div className="flex items-center p-2 w-full xl:p-4">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg mr-4 flex-shrink-0">
              <FaUserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-600 font-medium mb-1">Shortlisted</p>
              <p className="text-yellow-800 text-2xl xl:text-3xl font-bold">
                {stats?.totalShortlisted?.toLocaleString() || "0"}
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/jobpost"
          className="bg-white hover:bg-red-50 rounded-xl shadow hover:shadow-lg transition-all duration-300 flex items-stretch"
        >
          <div className="flex items-center p-2 w-full xl:p-4">
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mr-4 flex-shrink-0">
              <MdOutlinePostAdd className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-600 font-medium mb-1">Post Jobs</p>
              <p className="flex items-center text-red-600 text-sm mt-1 group-hover:translate-x-1 transition-transform duration-200 lg:hidden xl:block">
                Create new position <span className="ml-2">→</span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Statistics;
