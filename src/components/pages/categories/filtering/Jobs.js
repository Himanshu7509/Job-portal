import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import JobCard from "./jobCard/JobCard";
import JobFilters from "./jobFilter/JobFilters";

const Jobs = ({ initialTitle = "", initialCategory = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    categories: initialCategory,
    search: initialTitle,
    jobType: "",
    workType: "",
    experience: "",
    subcategories: "",
    
    
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const JobToken = Cookies.get("Token");
  const userId = Cookies.get("Id");

  const isAuthenticated = () => {
    return !!JobToken && !!userId;
  };

  const buildFilterUrl = (pageNum = 1) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    queryParams.append('page', pageNum);
    queryParams.append('limit', '10');
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

  const fetchJobs = async (pageNum = 1, isLoadMore = false) => {
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
        setJobListings(prevJobs => [...prevJobs, ...(data.jobs || [])]);
      } else {
        setJobListings(data.jobs || []);
      }

      setTotalPages(data.pagination?.totalPages || 1);
      setCurrentPage(pageNum);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    setJobListings([]);
    fetchJobs(1, false);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    fetchJobs(nextPage, true);
  };

  const handleCategoryChange = (categoryId) => {
    const selectedCat = categories.find((cat) => cat._id === categoryId);
    setSelectedCategory(selectedCat);
    setSelectedSubcategory("");
    handleFilterChange("categories", selectedCat?.title || "");
    handleFilterChange("subcategories", "");
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    handleFilterChange("subcategories", subcategory);
  };

  const handleSearch = (value) => {
    handleFilterChange("title", value);
    handleFilterChange("search", value);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      fetchJobs(1, false);
    }
  }, []);

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

      <div className="max-w-8xl px-4 py-8">

        <div className="flex flex-col space-y-8"
        >
          <div className="flex gap-4">
            <div>
            <span
                className="fixed top-16 p-1 left-4 text-pink-500 font-semibold z-10 rounded-lg lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-7" />
                ) : (
                  <Menu className="h-6 w-7" />
                )}
              </span>

              <div
                className={`fixed top-4 lg:top-0 left-0 h-full  w-full p-4 lg:p-0 sm:w-96 transition-transform duration-300 ease-in-out transform overflow-y-auto
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:relative lg:translate-x-0 lg:w-90 lg:flex-shrink-0`}
              >
                <JobFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  categories={categories}
                  isLoading={isLoading}
                  searchInput={filters.title}
                  handleSearch={handleSearch}
                  selectedCategory={selectedCategory}
                  selectedSubcategory={selectedSubcategory}
                  handleCategoryChange={handleCategoryChange}
                  handleSubcategoryChange={handleSubcategoryChange}
                  onApplyFilters={handleApplyFilters}
                />
              </div>
            </div>

            <div className="flex-1 sm:px-2 lg:px-2">
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                  {jobListings.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              )}

              {currentPage < totalPages && !isLoading && jobListings.length > 0 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    className="w-60 h-10 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg text-base font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 sm:h-12 md:h-14 lg:h-12"
                  >
                    {isLoading ? "Loading..." : "Show More"}
                  </button>
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