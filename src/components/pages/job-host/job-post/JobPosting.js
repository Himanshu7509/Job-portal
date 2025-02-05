import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HostSidebar from "../hoster-dashboard/sidebar/HostSidebar";

const JobPosting = () => {
  const JobId = Cookies.get("userId");
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [skillInput, setSkillInput] = useState("");
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
    createdBy: JobId,
  });

  const JobToken = Cookies.get("jwtToken");
  const jobPostApi = "https://jobquick.onrender.com/job";
  const CategoryApi = "https://jobquick.onrender.com/categories";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(CategoryApi, {
          headers: {
            Authorization: `Bearer ${JobToken}`,
          },
        });

        let processedCategories = [];
        const data = response.data;

        if (data.categories) {
          processedCategories = data.categories;
        } else if (data.data) {
          processedCategories = data.data;
        } else if (Array.isArray(data)) {
          processedCategories = data;
        } else if (typeof data === "object") {
          processedCategories = Object.values(data);
        }

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

  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill]
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        // Check file type
        if (!file.type.startsWith("image/")) {
          setError("Please upload an image file");
          return;
        }
        // Check file size (e.g., 5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          setError("File size should be less than 5MB");
          return;
        }

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setFormData((prev) => ({ ...prev, [name]: file }));
      }
      return;
    }

    else if (name === "skills") {
      setSkillInput(value);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      if (skillInput.trim()) {
        addSkill(skillInput);
        setSkillInput(''); // Clear input after adding
      }
    } else if (e.key === ',' ){
      e.preventDefault();
      if (skillInput.trim()) {
        addSkill(skillInput);
        setSkillInput('');
      }
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== indexToRemove)
    }));
  };


  const handlePostJob = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const submitFormData = new FormData();

      // Append all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          if (key === 'skills') {
            // Convert skills array to a simple comma-separated string when sending to server
            const skillsString = formData[key].join(", ");
            submitFormData.append(key, skillsString);
          } else if (key === 'profileImg') {
            if (formData[key] instanceof File) {
              submitFormData.append(key, formData[key]);
            }
          } else {
            submitFormData.append(key, formData[key]);
          }
        }
      });

      const response = await axios.post(jobPostApi, submitFormData, {
        headers: {
          Authorization: `Bearer ${JobToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        navigate("/host-dashboard");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      setError(
        error.response?.data?.message || "Failed to post job. Please try again."
      );
    } finally {
      setIsLoading(false);
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
        <div className="mt-1 flex items-center space-x-4">
          <input
            type="file"
            name="profileImg"
            accept="image/*"
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-lg"
            />
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
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
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option
                key={category._id || category.id || Math.random().toString(36)}
                value={category.title || category.name || ""}
              >
                {category.title || category.name || "Unnamed Category"}
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
            type="text"
            name="minPackage"
            value={formData.minPackage}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter minimum package eg: 3LPA"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Maximum Package
          </label>
          <input
            type="text"
            name="maxPackage"
            value={formData.maxPackage}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter maximum package eg: 5LPA"
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
        <div className="relative">
          <input
            type="text"
            name="skills"
            value={skillInput}
            onChange={handleInputChange}
            onKeyDown={handleSkillInputKeyDown}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Type a skill and press Enter or comma to add"
          />
          <div className="mt-2 text-xs text-gray-500">
            Press Enter or comma (,) to add a skill
          </div>
        </div>
        {formData.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-1 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="w-1/4 h-screen fixed top-0 left-0">
        <HostSidebar/>
      </div>
      <div className="p-2 sm:w-3/4 ml-auto sm:p-10">
      <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
        Post Job
      </h2>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      <form className="space-y-6 p-4" onSubmit={handlePostJob}>
        {step === 1 && renderCompanyForm()}
        {step === 2 && renderJobDetailsForm()}
        {step === 3 && renderRequirementsForm()}
      </form>
      </div>
    </div>
  );
};

export default JobPosting;
