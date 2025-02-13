import React from "react";
import { FaBriefcase, FaUsers, FaUserCheck } from "react-icons/fa";

const Statistics = ({ stats }) => {
  if (!stats) {
    return <p className="text-center text-gray-600">Loading statistics...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-4 h-[85px] rounded-2xl shadow-md flex items-center gap-4 border border-gray-200">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
          <FaBriefcase size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-blue-800">{stats.totalJobs}</h3>
          <p className="text-gray-500 text-md font-semibold">Total Jobs</p>
        </div>
      </div>

      <div className="bg-white h-[85px] p-4 rounded-2xl shadow-md flex items-center gap-4 border border-gray-200">
        <div className="p-2 bg-green-100 text-green-600 rounded-full">
          <FaUsers size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-green-800">{stats.totalApplicants}</h3>
          <p className="text-gray-500 text-md font-semibold">Total Applicants</p>
        </div>
      </div>

      <div className="bg-white h-[85px] p-4 rounded-2xl shadow-md flex items-center gap-4 border border-gray-200">
        <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full">
          <FaUserCheck size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-yellow-800">{stats.totalShortlisted}</h3>
          <p className="text-gray-500 text-md font-semibold">Total Shortlisted</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
