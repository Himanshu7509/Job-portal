import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import HostSidebar from "../../sidebar/HostSidebar";
import { FaUser } from "react-icons/fa";
import { IoSyncCircleSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FaCity } from "react-icons/fa";

const Applicant = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("jwtToken");

  useEffect(() => {
    const fetchApplicant = async () => {
      if (!token) {
        setError("Authentication required");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://jobquick.onrender.com/applicants/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applicant");
        }

        const data = await response.json();
        console.log("API Response:", data);
        setApplication(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchApplicant();
  }, [id, token]);

  const handleShorlisted = async () => {
    if (!application) return;
    const shortListedApi = `https://jobquick.onrender.com/applicants/shortlisted/${id}`;
    const updatedStatus = !application.shortListed;

    try {
      const response = await fetch(shortListedApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shortListed: updatedStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update shortlist status");
      }

      setApplication((prev) => ({ ...prev, shortListed: updatedStatus }));
    } catch (error) {
      console.error("Error updating shortlist status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-pink-700">Loading applicant details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <p className="text-2xl text-red-500 mb-4">{error}</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!application || !application.applicantId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500">No applicant found</p>
        </div>
      </div>
    );
  }

  const applicant = application.applicantId;
  const job = application.jobId;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      <div className="w-1/4 h-screen fixed top-0 left-0">
        <HostSidebar />
      </div>

      <div
        className="w-full  lg:ml-72 xl:ml-80 p-3 sm:p-4 lg:p-6 xl:p-4 h-auto sm:h-[690px] overflow-y-scroll -ms-overflow-style-none"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 bg-white p-4 rounded-lg shadow-md">
          <div className="w-full rounded-lg mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-2 sm:p-4">
              <h2 className="text-2xl sm:text-3xl ml-8  lg:text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
                Applicant Details
              </h2>
              <button
                onClick={handleShorlisted}
                className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                  application.shortListed
                    ? "bg-green-300 hover:bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                {application.shortListed
                  ? "✓ Shortlisted"
                  : "Click Here To Shortlist"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-sky-50 rounded-xl p-4 sm:p-6 col-span-1 lg:col-span-2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
                Applied Job Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Company Name", value: job?.companyName },
                  { label: "Company Email", value: job?.companyEmail },
                  {
                    label: "Company Website",
                    value: job?.companyURL,
                    isLink: true,
                  },
                ].map((field, index) => (
                  <div key={index} className="p-3 sm:p-4 rounded-lg">
                    <p className="text-gray-600 text-sm font-medium mb-2">
                      {field.label}
                    </p>
                    {field.isLink ? (
                      <a
                        href={field.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all text-sm sm:text-base"
                      >
                        {field.value}
                      </a>
                    ) : (
                      <p className="font-medium break-words text-gray-800 text-sm sm:text-base">
                        {field.value || "N/A"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-sky-50 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
                Application Status
              </h3>
              <span
                className={`px-3 sm:px-4 py-2 sm:py-3 rounded-full text-base sm:text-lg font-medium flex items-center gap-2 transition-all duration-300 ${
                  application.shortListed
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {application.shortListed ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <IoSyncCircleSharp className="text-blue-600" />
                )}
                {application.shortListed ? "Shortlisted" : "Under Review"}
              </span>
            </div>
          </div>

          {/* Skills and Links Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-sky-50 p-4 sm:p-6 rounded-xl max-h-[200px] overflow-y-auto">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(applicant.skills) &&
                  applicant.skills.length > 0 ? (
                    applicant.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-purple-200 text-purple-900 rounded-md text-sm sm:text-md font-semibold shadow-sm hover:bg-purple-300 transition"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills listed</p>
                  )}
                </div>
              </div>

              <div className="bg-sky-50 p-4 sm:p-6 rounded-xl">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                  Links
                </h3>
                <p className="text-gray-700 text-sm font-medium mb-2">
                  Project URL
                </p>
                {applicant.projectUrl ? (
                  <a
                    href={applicant.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-2 break-all text-sm sm:text-base"
                  >
                    {applicant.projectUrl}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-10 10a1 1 0 01-1.414-1.414l10-10-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </a>
                ) : (
                  <p className="text-gray-500">No project URL provided</p>
                )}
              </div>
            </div>

            <div className="bg-sky-50 rounded-xl p-4 sm:p-6 col-span-1 lg:col-span-2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 pb-2">
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                  <FaUser className="text-blue-800 text-xl sm:text-2xl" />
                  <p className="text-gray-700 text-xl sm:text-2xl font-semibold">
                    {applicant.fullName}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Email", value: applicant.email },
                    { label: "Phone Number", value: applicant.phoneNumber },
                    { label: "Gender", value: applicant.gender },
                    { label: "Date of Birth", value: applicant.dateOfBirth },
                  ].map((field, index) => (
                    <div key={index}>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-700">
                        {field.label}
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Address and Summary Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
            <div className="bg-sky-50 p-4 sm:p-6 rounded-xl">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 pb-2">
                Address
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                  <FaCity className="text-blue-800 text-xl sm:text-2xl" />
                  <p className="text-gray-700 text-xl sm:text-2xl font-semibold">
                    {applicant.address}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "City", value: applicant.city },
                    { label: "State", value: applicant.state },
                    { label: "Country", value: applicant.country },
                    { label: "Pincode", value: applicant.pincode },
                  ].map((field, index) => (
                    <div key={index}>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-700">
                        {field.label}
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-sky-50 p-4 sm:p-6 rounded-xl">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                Summary
              </h3>
              <div className="max-h-[300px] overflow-y-auto">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {applicant.summary || "No summary provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicant;
