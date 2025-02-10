
import React from "react";
import { TbCategory } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserClock } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-5 flex flex-col justify-between items-start hover:shadow-xl transition-shadow bg-white shadow-md max-w-md mx-auto sm:max-w-full w-11/12">
      <div className="flex w-full mb-4 items-center">
        <img
          src="https://thumbs.dreamstime.com/b/building-logo-19190924.jpg"
          alt={`${job.companyName} logo`}
          className="w-20 h-20 rounded-lg object-cover mr-4 sm:w-24 sm:h-24"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">
            {job.title}
          </h3>
          <p className="text-gray-500 font-semibold mb-1">
            {job.companyName}
          </p>
          <span className="text-gray-500 text-sm">
            {new Date(job.dateCreated).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="bg-white w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <div className="flex items-center mb-3 text-gray-700">
              <TbCategory className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-semibold">{job.category?.title || "Uncategorized"}</span>
            </div>
            <div className="flex items-center mb-3 text-gray-700">
              <FaUserClock className="w-5 h-5 mr-2 text-green-600" />
              <span className="font-semibold">{job.jobType}</span>
            </div>
            <div className="flex items-center mb-3 text-gray-700">
              <GiWallet className="w-5 h-5 mr-2 text-purple-600" />
              <span className="font-semibold">{job.minPackage} - {job.maxPackage}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-3 text-gray-700">
              <IoLocationOutline className="w-5 h-5 mr-2 text-red-600" />
              <span className="font-semibold">{job.location}</span>
            </div>
            <div className="flex items-center mb-3 text-gray-700">
              <GrUserWorker className="w-5 h-5 mr-2 text-yellow-600" />
              <span className="font-semibold">{job.experience}</span>
            </div>
            <div className="flex items-center mb-3 text-gray-700">
              <BsPersonWorkspace className="w-5 h-5 mr-2 text-indigo-600" />
              <span className="font-semibold">{job.workType}</span>
            </div>
          </div>
        </div>
      </div>

      <Link to={`/job-detials/${job._id}`}>
        <button className="flex items-center mt-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-blue-500 hover:font-semibold px-4 py-2 rounded cursor-pointer">
          View Job Details
          <span className="text-blue-500 ml-2"><FaArrowRight /></span>
        </button>
      </Link>
    </div>
  );
};

export default JobCard;