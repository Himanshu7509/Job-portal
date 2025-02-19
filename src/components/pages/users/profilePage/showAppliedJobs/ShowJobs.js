import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUserTie,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";

const ShowJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    showJobs(currentPage);
  }, []); // Load first page on mount

  const showJobs = async (page) => {
    const userId = Cookies.get("Id");
    const userToken = Cookies.get("Token");

    const userJobs = `https://jobquick.onrender.com/applicants?applicantId=${userId}&page=${page}&limit=2`;
    setIsLoading(true);

    try {
      const response = await fetch(userJobs, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch jobs. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      // Extract job details and update pagination state
      if (result.success && Array.isArray(result.applicants)) {
        const jobDetails = result.applicants.map((application) => application.jobId);
        
        // Append new jobs to existing ones if loading more
        if (page > 1) {
          setJobs((prevJobs) => [...prevJobs, ...jobDetails]);
        } else {
          setJobs(jobDetails);
        }
        
        // Update pagination state
        setHasNextPage(result.pagination.hasNextPage);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    showJobs(nextPage);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
          <span className="inline-block">Jobs you've applied to</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-4 sm:p-6 space-y-6">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold transition-transform duration-300">
                  <span className="text-transparent text-zinc-500">
                    {job.title}
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      label: "Company",
                      value: job.companyName,
                      icon: <FaBuilding className="text-pink-500" />,
                    },
                    {
                      label: "Location",
                      value: job.location,
                      icon: <FaMapMarkerAlt className="text-blue-500" />,
                    },
                    {
                      label: "Type",
                      value: job.jobType,
                      icon: <FaBriefcase className="text-purple-500" />,
                    },
                    {
                      label: "Experience",
                      value: job.experience,
                      icon: <FaUserTie className="text-indigo-500" />,
                    },
                    {
                      label: "Package",
                      value: job.minPackage,
                      icon: <FaDollarSign className="text-green-500" />,
                    },
                    {
                      label: "Openings",
                      value: job.noOfOpeaning,
                      icon: <FaUsers className="text-cyan-500" />,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 group/item"
                    >
                      <span className="text-2xl transition-transform duration-300">
                        {item.icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-gray-500 font-medium text-sm">
                          {item.label}
                        </span>
                        <span className="text-gray-800 text-base sm:text-lg font-semibold break-words">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 transition-all duration-300">
                  <span className="text-gray-500 font-medium text-sm">
                    Skills
                  </span>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-white/100 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="text-gray-600 px-2 py-1">...</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasNextPage && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="group px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg relative overflow-hidden disabled:opacity-50"
            >
              <span className="relative z-10 inline-block transition-transform duration-300">
                {isLoading ? "Loading..." : "Load More Jobs"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center mt-4">
            Error: {error}
          </div>
        )}
      </div>
    </>
  );
};

export default ShowJobs;