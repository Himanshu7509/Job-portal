import { FaSearch } from "react-icons/fa";

const JobFilters = ({
  filters,
  onFilterChange,
  categories,
  isLoading,
  searchInput,
  handleSearch,
  selectedCategory,
  selectedSubcategory,
  handleCategoryChange,
  handleSubcategoryChange,
  onApplyFilters,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      onApplyFilters();
    }
  };

  return (
    <div className="sticky rounded-lg p-4 lg:border-2  lg:border-gray-200 bg-white shadow-lg w-full max-w-md mx-auto sm:w-90 z-50">
      <div className="mb-4 lg:mt-6 mt-10">
        <label className="text-lg sm:text-2xl font-bold block text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-4">
          Search by Title or Company
        </label>
        <div className="relative mt-2">
          <div className="flex items-center border border-gray-300 rounded-lg shadow-md overflow-hidden focus-within:border-blue-500 transition-all">
            <FaSearch className="text-gray-500 ml-3" />
            <input
              type="text"
              placeholder="Search by Job Title or Company Name"
              className="w-full p-3 text-sm outline-none"
              value={searchInput}
              onKeyUp={handleKeyPress}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button
              onClick={onApplyFilters}
              className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-3 h-full transition-transform transform hover:scale-105"
              type="button"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xl sm:text-2xl font-bold block text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
          Categories
        </label>
        <select
          value={selectedCategory?._id || ""}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory?.subcategories?.length > 0 && (
        <div className="mb-6">
          <label className="text-xl sm:text-2xl font-bold block text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
            Subcategories
          </label>
          <select
            value={selectedSubcategory}
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white"
          >
            <option value="">All Subcategories</option>
            {selectedCategory.subcategories.map((subcategory) => (
              <option key={subcategory.title} value={subcategory.title}>
                {subcategory.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-6">
        <label className="text-xl sm:text-2xl font-bold block text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
          Experience Level
        </label>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {["Fresher", "1 to 3 years", "3 to 5 years", "More than 5 years"].map(
            (level) => (
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
            )
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xl sm:text-2xl font-bold block text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
          Job Type
        </label>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {["Full-Time", "Part-Time"].map((type) => (
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
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {["Remote", "OnSite", "Hybrid"].map((work) => (
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
        disabled={isLoading}
        className="w-full h-12 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Applying..." : "Apply Filters"}
      </button>
    </div>
  );
};

export default JobFilters;
