import React, { useState } from "react";

const JobPosting = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-black mb-6 text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
        Post Job
      </h2>

      <form className="space-y-6 p-4">
        {step === 1 && (
          <>
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the company name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Location
              </label>
              <input
                type="text"
                required
                placeholder="Enter your job location"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Company Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your company email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Enter your phone number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="comp-description"
                className="block text-sm font-medium text-gray-700"
              >
                Company Description
              </label>
              <textarea
                id="comp-description"
                name="comp-description"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="5"
                placeholder="Describe the job responsibilities and requirements"
                required
              ></textarea>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="w-full font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-1xl text-white py-3 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <div>
              <label
                htmlFor="categories"
                className="block text-sm font-medium text-gray-700"
              >
                Categories
              </label>
              <select
                id="categories"
                name="categories"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select Categories</option>
                <option value="IT-Networking">IT & Networking </option>
                <option value="Sales-Marketing">Sales & Marketing</option>
                <option value="Data-Science">Data Science</option>
                <option value="Customer-Service">Customer Service </option>
                <option value="Digital-Marketing ">Digital Marketing </option>
                <option value="Human-Resource">Human Resource</option>
                <option value="Project-Manager">Project Manager</option>
                <option value="Accounting">Accounting</option>
              </select>
            </div>

            <div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Salary
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Enter the package of the job"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Positions
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Number of openings"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700"
              >
                Skills Required
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., $50,000 - $70,000"
                required
              />
            </div>

            <div>
              <label
                htmlFor="jobType"
                className="block text-sm font-medium text-gray-700"
              >
                Job Type
              </label>
              <select
                id="jobType"
                name="jobType"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="OnSite">On-Site</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="5"
                placeholder="Describe the job responsibilities and requirements"
                required
              ></textarea>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="w-[35%] bg-gradient-to-r from-pink-700 to-blue-700 text-1xl text-white py-3 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-semibold"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="submit"
                className="w-1/2 bg-gradient-to-r from-pink-500 to-blue-500 text-1xl text-white py-3 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-semibold"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default JobPosting;
