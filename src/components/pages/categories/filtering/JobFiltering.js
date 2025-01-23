//https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer2.jpg
//https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer6.jpg
//https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg

import React, { useState } from "react";

const jobListings = [
  {
    id: 1,
    title: "Senior/ Staff Nurse",
    company: "Upwork",
    salary: "$90 - $100 / week",
    category: "Business",
    type: "Full Time",
    location: "New York",
    experience: "Senior Level",
    industry: "Healthcare",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer2.jpg", 
  },
  {
    id: 2,
    title: "Executive, HR Operations",
    company: "NetTrue",
    salary: "$220 - $250 / week",
    category: "Developers",
    type: "Temporary",
    location: "New York",
    experience: "Mid Level",
    industry: "Management",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer6.jpg", 
  },
  {
    id: 3,
    title: "Restaurant Team Member",
    company: "DesignBlue",
    salary: "$30 - $60 / day",
    category: "Business",
    type: "Part Time",
    location: "New York",
    experience: "Entry Level",
    industry: "Hospitality",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg", 
  },
  // Add more jobs as needed
];

const JobListingPage = () => {
  const [filter, setFilter] = useState({
    category: "",
    salaryType: "",
    priceRange: [0, 450],
    type: "",
    location: "",
    experience: "",
    industry: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredJobs = jobListings.filter((job) => {
    // Apply filtering logic here (example: category, type, etc.)
    return true; // Replace with actual filtering logic
  });

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Filters</h2>

          {/* Categories */}
          <div className="mb-6">
            <label htmlFor="category" className="text-gray-600 block mb-2">
              Categories
            </label>
            <select
              name="category"
              id="category"
              className="w-full border-gray-300 rounded-md shadow-sm py-2 pl-10 text-sm text-gray-700"
              value={filter.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="Business">Business</option>
              <option value="Developers">Developers</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Salary Type */}
          <div className="mb-6">
            <label htmlFor="salaryType" className="text-gray-600 block mb-2">
              Salary Type
            </label>
            <select
              name="salaryType"
              id="salaryType"
              className="w-full border-gray-300 rounded-md shadow-sm py-2 pl-10 text-sm text-gray-700"
              value={filter.salaryType}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              <option value="Hourly">Hourly</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <label htmlFor="experience" className="text-gray-600 block mb-2">
              Experience
            </label>
            <select
              name="experience"
              id="experience"
              className="w-full border-gray-300 rounded-md shadow-sm py-2 pl-10 text-sm text-gray-700"
              value={filter.experience}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
            </select>
          </div>

          {/* Type */}
          <div className="mb-6">
            <label htmlFor="type" className="text-gray-600 block mb-2">
              Type
            </label>
            <select
              name="type"
              id="type"
              className="w-full border-gray-300 rounded-md shadow-sm py-2 pl-10 text-sm text-gray-700"
              value={filter.type}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>

          {/* Industry */}
          <div className="mb-6">
            <label htmlFor="industry" className="text-gray-600 block mb-2">
              Industry
            </label>
            <select
              name="industry"
              id="industry"
              className="w-full border-gray-300 rounded-md shadow-sm py-2 pl-10 text-sm text-gray-700"
              value={filter.industry}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Management">Management</option>
              <option value="Accounting">Accounting</option>
              <option value="Hospitality">Hospitality</option>
            </select>
          </div>

          {/* Price Range */}
          {/* <div className="mb-6">
            <label htmlFor="priceRange" className="text-gray-600 block mb-2">
              Price Range
            </label>
            <input
              type="range"
              min={0}
              max={450}
              className="w-full"
              value={filter.priceRange[1]}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  priceRange: [0, parseInt(e.target.value)],
                })
              }
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>$0</span>
              <span>${filter.priceRange[1]}</span>
            </div>
          </div> */}

          <button className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-2 rounded-md">
            Search
          </button>
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text mb-4">Job Listings</h2>
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {job.company} - {job.location}
                    </p>
                    <p className="text-sm text-gray-500">{job.salary}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{job.category}</p>
                  <p className="text-sm text-gray-500">{job.type}</p>
                  <p className="text-sm text-gray-500">{job.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingPage;