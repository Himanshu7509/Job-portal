import React, { useState, useEffect } from "react";
import {Search, BriefcaseBusiness, MapPin, Clock, Wallet, Menu, X} from "lucide-react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const JobFilters = ({filters, onFilterChange, categories, isLoading, onApplyFilters}) => {
  return (
    <div className="rounded-lg">
      {/* Search by title */}
      <div className="mb-6">
        <label className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-4 mt-12">
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
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Categories */}
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

      {/* Experience Level */}
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

      {/* Job Type */}
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

      {/* Work Type */}
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

      {/* Apply Filters Button */}
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
    <div className="border rounded-lg p-4 flex flex-col justify-between items-start hover:shadow-lg transition-shadow bg-white">
      <div className="flex w-full mb-4">
        <img
          src={job.profileImg || "https://www.pngkey.com/png/full/191-1911374_company-building-png-office-building-png.png"}
          alt={`${job.companyName} logo`}
          className="w-14 h-14 rounded-lg object-cover mr-4"
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

      <div className="text-sm text-gray-500 mb-4 font-semibold w-full">
        <div className="flex items-center mb-2">
          <BriefcaseBusiness className="w-5 h-5 text-pink-500 mr-2" />
          {job.category?.title || "Uncategorized"}
        </div>
        <div className="flex items-center mb-2">
          <Clock className="w-5 h-5 text-pink-500 mr-2" />
          {job.jobType}
        </div>
        <div className="flex items-center mb-2">
          <Wallet className="w-5 h-5 text-pink-500 mr-2" />${job.minPackage} - ${job.maxPackage}
        </div>
        <div className="flex items-center mb-2">
          <MapPin className="w-5 h-5 text-pink-500 mr-2" />
          {job.location}
        </div>
        <div className="flex items-center">
          <BriefcaseBusiness className="w-5 h-5 text-pink-500 mr-2" />
          {job.experience}
        </div>
        <div className="flex items-center">
          <BriefcaseBusiness className="w-5 h-5 text-pink-500 mr-2" />
          {job.workType}
        </div>
      </div>
      <Link to={`/job-detials/${job._id}`}>
      <button
        className="w-full h-10 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
      >
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
  
  // Simplified filters without pagination
  const [filters, setFilters] = useState({
    categories: "",
    title: "",
    jobType: "",
    workType: "",
    experience: "",
    limit: 100
  });

  const [pendingFilters, setPendingFilters] = useState(filters);

  const JobToken = Cookies.get("Token");
  const userId = Cookies.get("Id");

  const isAuthenticated = () => {
    return !!JobToken && !!userId;
  };

  const buildFilterUrl = () => {
    const queryParams = new URLSearchParams();
    Object.entries(pendingFilters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    return `https://jobquick.onrender.com/job/filter?${queryParams.toString()}`;
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      if (!isAuthenticated()) return;

      setIsLoading(true);
      try {
        const response = await fetch("https://jobquick.onrender.com/categories", {
          headers: {
            Authorization: `Bearer ${JobToken}`,
          },
        });

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

  // Fetch jobs
  const fetchJobs = async () => {
    if (!isAuthenticated()) return;

    setIsLoading(true);
    try {
      const response = await fetch(buildFilterUrl(), {
        headers: {
          Authorization: `Bearer ${JobToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setJobListings(data.jobs || data.data || []);
      setTotalJobs(data.totalJobs || 0);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setPendingFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    setFilters(pendingFilters);
    fetchJobs();
  };

  // Initial fetch
  useEffect(() => {
    fetchJobs();
  }, []);

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-4">
            You need to be logged in to view job listings
          </p>
          <a
            href="/login"
            className="inline-block bg-gradient-to-r from-pink-500 to-blue-500 text-white py-2 px-6 rounded-md hover:opacity-90"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          <div className="flex gap-6">
            {/* Sidebar filters */}
            <div className="relative">
              <button
                className="lg:hidden bg-gradient-to-r from-pink-500 to-blue-500 text-white p-2 rounded-md fixed top-4 left-4 z-50"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              <div
                className={`fixed top-0 left-0 h-full overflow-y-auto bg-gray-50 shadow-lg p-4 transform transition-transform duration-300 z-40 ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:relative lg:translate-x-0 lg:w-64 flex-shrink-0`}
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

            {/* Job Listings */}
            <div className="flex-1 px-4 sm:px-6 lg:px-8">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="border rounded-lg p-4 animate-pulse">
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {jobListings.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
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