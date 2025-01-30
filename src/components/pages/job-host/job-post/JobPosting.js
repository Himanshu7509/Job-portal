import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const JobPosting = () => {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    profileImg: null,
    fullName: "",
    title: "",
    experience: "",
    minEducation: "",
    companyName: "",
    numOfEmployee: "",
    companyURL: "",
    companyEmail: "",
    phoneNo: "",
    jobType: "",
    jobDescription: "",
    workType: "",
    interviewType: "",
    companyDescription: "",
    minPackage: "",
    maxPackage: "",
    skills: [],
    noOfOpeaning: "",
    location: "",
    categoryTitle: "",
  });

  const JobId = Cookies.get("userId");
  const JobToken = Cookies.get("jwtToken");
  const jobPostApi = "https://jobquick.onrender.com/job";
  const CategoryApi = "https://jobquick.onrender.com/categories";

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(CategoryApi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JobToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw API response:", data); // Debug log

        // Handle different possible data structures
        let processedCategories = [];

        if (data.categories) {
          // If data is wrapped in a 'categories' property
          processedCategories = data.categories;
        } else if (data.data) {
          // If data is wrapped in a 'data' property
          processedCategories = data.data;
        } else if (typeof data === "object" && !Array.isArray(data)) {
          // If data is an object with category entries
          processedCategories = Object.values(data);
        } else if (Array.isArray(data)) {
          // If data is already an array
          processedCategories = data;
        }

        if (!processedCategories.length) {
          console.log("No categories found in response");
          setCategories([]);
          return;
        }

        console.log("Processed categories:", processedCategories);
        setCategories(processedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (JobToken) {
      fetchCategories();
    }
  }, [JobToken]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (name === "skills") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((skill) => skill.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();

    try {
      const formPayload = {
        ...formData,
        createdBy: JobId,
      };

      console.log(formPayload);

      const response = await fetch(jobPostApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JobToken}`,
        },
        body: JSON.stringify(formPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Job posted successfully:", data);
      // Add success notification here
    } catch (error) {
      console.error("Error posting job:", error);
      // Add error notification here
    }
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const renderCompanyForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Company Logo
        </label>
        <input
          type="file"
          name="profileImg"
          accept="image/*"
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter company name"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Provider Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your full name"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Company Email
          </label>
          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter company email"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Company URL
          </label>
          <input
            type="url"
            name="companyURL"
            value={formData.companyURL}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter company website"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Number of Employees
          </label>
          <input
            type="number"
            name="numOfEmployee"
            value={formData.numOfEmployee}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter employee count"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Description
        </label>
        <textarea
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleInputChange}
          rows="5"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Describe your company"
        ></textarea>
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
      >
        Next
      </button>
    </>
  );

  const renderJobDetailsForm = () => (
    <>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter job title"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Number of Openings
        </label>
        <input
          type="number"
          name="noOfOpeaning"
          value={formData.noOfOpeaning}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter number of positions"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        {isLoading ? (
          <div className="mt-1 block w-full h-10 bg-gray-100 animate-pulse rounded-md" />
        ) : error ? (
          <div className="mt-1 text-red-500 text-sm">{error}</div>
        ) : (
          <select
            name="categoryTitle"
            value={formData.categoryTitle}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>Select Category</option>
            {categories.map((category) => (
              <option 
                key={category._id || category.id || Math.random().toString(36)} 
                value={category.title || category.name || ''}
              >
                {category.title || category.name || 'Unnamed Category'}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Job Type
        </label>
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full Time</option>
          <option value="Part-Time">Part Time</option>
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter job location"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          className="w-1/3 bg-gradient-to-r from-pink-700 to-blue-700 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w-1/2 bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Next
        </button>
      </div>
    </>
  );

  const renderRequirementsForm = () => (
    <>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Minimum Package
          </label>
          <input
            type="number"
            name="minPackage"
            value={formData.minPackage}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter minimum package"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Maximum Package
          </label>
          <input
            type="number"
            name="maxPackage"
            value={formData.maxPackage}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter maximum package"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Interview Type
          </label>
          <select
            name="interviewType"
            value={formData.interviewType}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Interview Type</option>
            <option value="Online">Online</option>
            <option value="Walk-In">Walk In</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Experience Level
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select experience level</option>
            <option value="Fresher">Fresher</option>
            <option value="1 to 3 years">1 to 3 years</option>
            <option value="3 to 5 years">1 to 3 years</option>
            <option value="3 to 5 years">3 to 5 years</option>
            <option value="more than 5 years">more than 5 years</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Work Type
          </label>
          <select
            name="workType"
            value={formData.workType}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Work Type</option>
            <option value="Remote">Remote</option>
            <option value="OnSite">On-Site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Minimum Education
          </label>
          <input
            type="text"
            name="minEducation"
            value={formData.minEducation}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter minimum education required"
          />
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Required Skills
        </label>
        <input
          type="text"
          name="skills"
          value={formData.skills.join(", ")}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter skills (comma-separated)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job Description
        </label>
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleInputChange}
          rows="5"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Describe the job responsibilities and requirements"
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          className="w-1/3 bg-gradient-to-r from-pink-700 to-blue-700 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Previous
        </button>
        <button
          type="submit"
          className="w-1/2 bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Submit
        </button>
      </div>
    </>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
        Post Job
      </h2>

      <form className="space-y-6 p-4" onSubmit={handlePostJob}>
        {step === 1 && renderCompanyForm()}
        {step === 2 && renderJobDetailsForm()}
        {step === 3 && renderRequirementsForm()}
      </form>
    </div>
  );
};

export default JobPosting;
