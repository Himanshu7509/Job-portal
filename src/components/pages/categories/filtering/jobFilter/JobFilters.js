import React from 'react'

const JobFilters = ({
  filters,
  onFilterChange,
  categories,
  isLoading,
  onApplyFilters,
}) => {
  return (
    <div className="sticky rounded-lg p-4 bg-white shadow-lg w-90 max-w-md mx-auto sm:w-90 z-50">
      <div className="mb-4 mt-4">
        <label className="text-xl sm:text-2xl font-bold text-center block text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
          Search by Job Title
        </label>
        <div className="relative mt-2">
          <input
            type="text"
            placeholder="Job title ex: frontend"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            value={filters.title}
            onChange={(e) => onFilterChange("title", e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xl sm:text-2xl font-bold block text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
          Categories
        </label>
        <select
          value={filters.categories}
          onChange={(e) => onFilterChange("categories", e.target.value)}
          className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
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
        <label className="text-xl sm:text-2xl font-bold block text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
          Experience Level
        </label>
        <div className="mt-2 flex flex-col space-y-2">
          {['Fresher', '1 to 3 years', '3 to 5 years', 'More than 5 years'].map((level) => (
            <label key={level} className="flex items-center space-x-2">
              <input
                type="radio"
                name="experience"
                value={level}
                checked={filters.experience === level}
                onChange={(e) => onFilterChange("experience", e.target.value)}
              />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xl sm:text-2xl font-bold block text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
          Job Type
        </label>
        <div className="mt-2 flex flex-col space-y-2">
          {['Full-Time', 'Part-Time'].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="jobType"
                value={type}
                checked={filters.jobType === type}
                onChange={(e) => onFilterChange("jobType", e.target.value)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xl sm:text-2xl font-bold block text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
          Work Type
        </label>
        <div className="mt-2 flex flex-col space-y-2">
          {['Remote', 'OnSite', 'Hybrid'].map((work) => (
            <label key={work} className="flex items-center space-x-2">
              <input
                type="radio"
                name="workType"
                value={work}
                checked={filters.workType === work}
                onChange={(e) => onFilterChange("workType", e.target.value)}
              />
              <span>{work}</span>
            </label>
          ))}
        </div>
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

export default JobFilters