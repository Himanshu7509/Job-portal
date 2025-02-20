import React from "react";
import { FaBriefcase, FaUsers, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";

const Statistics = ({ stats }) => {
  if (!stats) {
    return <p className="text-center text-gray-600">Loading statistics...</p>;
  }

  return (

    <div className="w-full px-2 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-4">

        <div className="bg-white hover:bg-blue-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="p-4 sm:p-5 flex items-center h-full">
            <div className="bg-blue-100 text-blue-600 p-2 md:p-3 rounded-lg mr-3 group-hover:bg-blue-200 transition-all duration-200 flex items-center justify-center">
              <FaBriefcase className="h-6 w-6 md:h-7 md:w-7 lg:h-6 lg:w-6" />
            </div>
            <div className="flex flex-col">
              <p className="text-gray-700 font-medium text-base md:text-md lg:text-lg">Total Jobs</p>
              <span className="text-2xl md:text-2xl lg:text-2xl xl:text-4xl font-bold text-blue-800 ml-1">
                {stats?.totalJobs?.toLocaleString() || "0"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white hover:bg-green-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300  overflow-hidden group">
          <div className="p-4 sm:p-5 flex items-center h-full">
            <div className="bg-green-100 text-green-600 p-2 md:p-3 rounded-lg mr-3 group-hover:bg-green-200 transition-all duration-200 flex items-center justify-center">
              <FaUsers className="h-6 w-6 md:h-7 md:w-7 lg:h-6 lg:w-6" />
            </div>
            <div className="flex flex-col">
              <p className="text-gray-700 font-medium text-base md:text-md lg:text-lg">Applicants</p>
              <span className="text-2xl md:text-2xl lg:text-2xl xl:text-4xl font-bold text-green-800 ml-1">
                {stats?.totalApplicants?.toLocaleString() || "0"}
              </span>
            </div>
          </div>
        </div>


        <div className="bg-white hover:bg-yellow-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300  overflow-hidden group">
          <div className="p-4 sm:p-5 flex items-center h-full">
            <div className="bg-yellow-100 text-yellow-600 p-2 md:p-3 rounded-lg mr-3 group-hover:bg-yellow-200 transition-all duration-200 flex items-center justify-center">
              <FaUserCheck className="h-6 w-6 md:h-7 md:w-7 lg:h-6 lg:w-6" />
            </div>
            <div className="flex flex-col">
              <p className="text-gray-700 font-medium text-base md:text-md lg:text-lg">Shortlisted</p>
              <span className="text-2xl md:text-2xl lg:text-2xl xl:text-4xl font-bold text-yellow-800 ml-1">
                {stats?.totalShortlisted?.toLocaleString() || "0"}
              </span>
            </div>
          </div>
        </div>


        <Link to="/jobpost" className="block group">
          <div className="bg-white hover:bg-red-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300  overflow-hidden h-full group">
            <div className="p-4 sm:p-5 flex items-center h-full">
              <div className="bg-red-100 text-red-600 p-2 md:p-3 rounded-lg mr-3 group-hover:bg-red-200 transition-all duration-200 flex items-center justify-center">
                <MdOutlinePostAdd className="h-6 w-6 md:h-7 md:w-7 lg:h-6 lg:w-6" />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-700 font-medium text-base md:text-md lg:text-lg">Post Jobs</p>
                <span className="text-red-600 text-sm group-hover:translate-x-1 transition-transform duration-200 flex items-center mt-1">
                  Create new position <span className="ml-1">→</span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>

  );
};

export default Statistics;
