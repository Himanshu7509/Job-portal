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
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-2xl mx-auto w-full border">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex">
          <img
            src="https://thumbs.dreamstime.com/b/building-logo-19190924.jpg"
            alt={`${job.companyName} logo`}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {job.title}
          </h3>
          <p className="text-sm text-gray-500 font-semibold mb-1">
            {job.companyName}
          </p>
          <span className="text-sm text-gray-500">
            {new Date(job.dateCreated).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center mb-2 text-gray-700">
            <TbCategory className="w-5 h-5 mr-2 text-blue-600" />
            <span className="font-semibold">
              {job.category?.title || "Uncategorized"}
            </span>
          </div>
          <div className="flex items-center mb-2 text-gray-700">
            <FaUserClock className="w-5 h-5 mr-2 text-green-600" />
            <span className="font-semibold">{job.jobType}</span>
          </div>
          <div className="flex items-center mb-2 text-gray-700">
            <GiWallet className="w-5 h-5 mr-2 text-purple-600" />
            <span className="font-semibold">
              {job.minPackage} - {job.maxPackage}
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-2 text-gray-700">
            <IoLocationOutline className="w-5 h-5 mr-2 text-red-600" />
            <span className="font-semibold">{job.location}</span>
          </div>
          <div className="flex items-center mb-2 text-gray-700">
            <GrUserWorker className="w-5 h-5 mr-2 text-yellow-600" />
            <span className="font-semibold">{job.experience}</span>
          </div>
          <div className="flex items-center mb-2 text-gray-700">
            <BsPersonWorkspace className="w-5 h-5 mr-2 text-indigo-600" />
            <span className="font-semibold">{job.workType}</span>
          </div>
        </div>
      </div>

      <Link to={`/job-details/${job._id}`}>
        <div className="w-full flex justify-end">
        <button className="flex items-center w-full justify-center mt-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-blue-500 hover:font-semibold px-4 py-2 rounded cursor-pointer">
          View Job Details
          <span className="text-blue-500 ml-2">
            <FaArrowRight />
          </span>
        </button>
        </div>
      </Link>
    </div>
  );
};

export default JobCard;
