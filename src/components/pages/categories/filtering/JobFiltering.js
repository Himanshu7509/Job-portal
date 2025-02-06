import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { TbCategory } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserClock } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const JobFilters = ({
  filters,
  onFilterChange,
  categories,
  isLoading,
  onApplyFilters,
}) => {
  return (
    <div className="sticky top-4 rounded-lg p-4 bg-white shadow-lg w-90">
      <div className="mb-4 mt-4">
        <label className="text-2xl font-bold text-center ml-8 text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text lg:ml-2">
          Search by Job Title
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Job title or company"
            className="w-full p-2 pr-8 border border-gray-300 rounded-md text-sm mt-5"
            value={filters.title}
            onChange={(e) => onFilterChange("title", e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          Categories
        </label>
        <select
          value={filters.categories}
          onChange={(e) => onFilterChange("categories", e.target.value)}
          className="mt-5 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        >
          <option value="">All Categories</option>
          <option value="IT & Networking">IT & Networking</option>
          <option value="Sales & Marketing">Sales & Marketing</option>
          <option value="Data Science">Data Science</option>
          <option value="Customer Service">Customer Service</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Human Resource">Human Resource</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Accounting">Accounting</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          Experience Level
        </label>
        <select
          value={filters.experience}
          onChange={(e) => onFilterChange("experience", e.target.value)}
          className="mt-5 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        >
          <option value="">All Experience Levels</option>
          <option value="fresher">Fresher</option>
          <option value="1 to 3 years">1-3 years</option>
          <option value="3 to 5 years">3-5 years</option>
          <option value="more than 5 years">More than 5 years</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          Job Type
        </label>
        <select
          value={filters.jobType}
          onChange={(e) => onFilterChange("jobType", e.target.value)}
          className="mt-5 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        >
          <option value="">All Types</option>
          <option value="Full-Time">Full Time</option>
          <option value="Part-Time">Part Time</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          Work Type
        </label>
        <select
          value={filters.workType}
          onChange={(e) => onFilterChange("workType", e.target.value)}
          className="mt-5 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        >
          <option value="">All Work Types</option>
          <option value="Remote">Remote</option>
          <option value="OnSite">On-Site</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <button
        onClick={onApplyFilters}
        className="w-full h-12 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-md font-medium hover:opacity-90 transition-opacity"
      >
        Apply Filters
      </button>
    </div>
  );
};

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-6 flex flex-col justify-between items-start hover:shadow-lg transition-shadow bg-white">
      <div className="flex w-full mb-4">
        <img
          src={job.profileImg}
          alt={`${job.companyName} logo`}
          className="w-24 h-24 rounded-lg object-cover mr-4"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">
            {job.title}
          </h3>
          <p className="text-gray-500 font-semibold mb-1">{job.companyName}</p>
          <span className="text-gray-500 font-semibold">
            {new Date(job.dateCreated).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="bg-white w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="flex items-center mb-3">
              <TbCategory className="w-6 h-6 text-pink-500 mr-3" />
              <span className="text-gray-700 font-semibold">
                {job.category?.title || "Uncategorized"}
              </span>
            </div>
            <div className="flex items-center mb-3">
              <FaUserClock className="w-6 h-6 text-pink-500 mr-3" />
              <span className="text-gray-700 font-semibold">{job.jobType}</span>
            </div>
            <div className="flex items-center mb-3">
              <GiWallet className="w-6 h-6 text-pink-500 mr-3" />
              <span className="text-gray-700 font-semibold">
                ${job.minPackage} - ${job.maxPackage}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-3">
              <IoLocationOutline className="w-6 h-6 text-pink-500 mr-3" />
              <span className="text-gray-700 font-semibold">
                {job.location}
              </span>
            </div>
            <div className="flex items-center mb-3">
              <GrUserWorker className="w-6 h-6 text-pink-500 mr-3" />
              <span className="text-gray-700 font-semibold">
                {job.experience}
              </span>
            </div>
            <div className="flex items-center mb-3">
              <BsPersonWorkspace className="w-6 h-6 text-pink-500 mr-3" />
              <span className="text-gray-700 font-semibold">
                {job.workType}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Link to={`/job-detials/${job._id}`} className="block w-full">
        <button className="mt-4 w-48 h-10 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-lg text-base font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 sm:h-12 md:h-14 lg:h-12">
          View Job Details
        </button>
      </Link>
    </div>
  );
};

const Jobs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState();
  const jobsPerPage = 10;

  const [filters, setFilters] = useState({
    categories: "",
    title: "",
    jobType: "",
    workType: "",
    experience: "",
  });

  const [pendingFilters, setPendingFilters] = useState(filters);

  const JobToken = Cookies.get("Token");
  const userId = Cookies.get("Id");

  const isAuthenticated = () => {
    return !!JobToken && !!userId;
  };

  const buildFilterUrl = (pageNum) => {
    const queryParams = new URLSearchParams();
    Object.entries(pendingFilters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    queryParams.append("page", pageNum);
    queryParams.append("limit", jobsPerPage);
    return `https://jobquick.onrender.com/job/filter?${queryParams.toString()}`;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (!isAuthenticated()) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          "https://jobquick.onrender.com/categories",
          {
            headers: {
              Authorization: `Bearer ${JobToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data.categories || data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [JobToken]);

  const fetchJobs = async (pageNum, isLoadMore = false) => {
    if (!isAuthenticated()) return;

    setIsLoading(true);
    try {
      const response = await fetch(buildFilterUrl(pageNum), {
        headers: {
          Authorization: `Bearer ${JobToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (isLoadMore) {
        setJobListings(prevJobs => [...prevJobs, ...data.jobs]);
      } else {
        setJobListings(data.jobs || []);
      }
      
      setTotalJobs(data.pagination.total);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setPendingFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setPage(1); // Reset page when applying new filters
    setJobListings([]); // Clear existing jobs
    setFilters(pendingFilters);
    fetchJobs(1, false);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchJobs(nextPage, true);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      fetchJobs(1, false);
    }
  }, []);

  useEffect(() => {
    if (page === 1) {
      fetchJobs(false);
    }
  }, [filters]);

  // Show load more button only if there are more jobs to load
  const showLoadMore = currentPage < totalPages;

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-4">
            You need to be logged in to view job listings
          </p>
          <Link
            to="/login"
            className="inline-block bg-gradient-to-r from-pink-500 to-blue-500 text-white py-2 px-6 rounded-md hover:opacity-90"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          <div className="flex gap-6">
            <div>
              <button
                className="fixed top-16 left-4 z-50 p-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-5 w-6" />
                ) : (
                  <Menu className="h-5 w-6" />
                )}
              </button>

              <div
                className={`fixed top-4 left-0 h-full w-96 p-4 transition-transform duration-300 ease-in-out transform 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:relative lg:translate-x-0 lg:w-90 lg:flex-shrink-0`}
              >
                <JobFilters
                  filters={pendingFilters}
                  onFilterChange={handleFilterChange}
                  categories={categories}
                  isLoading={isLoading}
                  onApplyFilters={handleApplyFilters}
                />
              </div>
            </div>
            <div className="flex-1 px-4 sm:px-6 lg:px-8">
              {isLoading && jobListings.length === 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="border rounded-lg p-4 animate-pulse"
                    >
                      <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-red-500 text-center py-8">
                  <p className="text-xl font-semibold mb-2">Error</p>
                  <p>{error}</p>
                </div>
              ) : jobListings.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                  <p className="text-xl font-semibold mb-2">No jobs found</p>
                  <p className="text-gray-400">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
                  {jobListings.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {showLoadMore && !isLoading && jobListings.length > 0 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    className="w-60 h-10 bg-gradient-to-r from-purple-500 to-purple-800 text-white rounded-lg text-base font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 sm:h-12 md:h-14 lg:h-12"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      "Load More"
                    )}
                  </button>
                </div>
              )}

              {/* Loading indicator for load more */}
              {isLoading && jobListings.length > 0 && (
                <div className="flex justify-center mt-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
