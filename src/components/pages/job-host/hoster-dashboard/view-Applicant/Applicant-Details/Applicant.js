import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import HostSidebar from "../../sidebar/HostSidebar";

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      < >
      <div className="w-1/4 h-screen fixed top-0 left-0">
          <HostSidebar />
        </div>
        <div className="p-2 w-full sm:w-3/4 ml-auto sm:p-10">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-0">
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center gap-4">
                <div className="flex gap-5">
                  {/* <Link to={`/job/${id}/applicants`}>
                    <button>
                      <FaArrowLeftLong className="text-white font-bold w-6 h-6 mt-2" />
                    </button>
                  </Link> */}
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Applicant Details
                  </h2>
                </div>

                <div>
                  <button
                    onClick={handleShorlisted}
                    className={`w-full sm:w-auto px-6 py-2 rounded-full transition-all duration-300 ${
                      application.shortListed
                        ? "bg-green-300 hover:bg-green-500 text-white"
                        : "bg-white hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    {application.shortListed ? "✓ Shortlisted" : "Shortlist"}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Info Cards */}
              {[
                {
                  title: "Applied Job Details",
                  bgColor: "bg-orange-50",
                  fields: [
                    { label: "Company Name", value: job?.companyName },
                    { label: "Company Email", value: job?.companyEmail },
                    {
                      label: "Company Website",
                      value: job?.companyURL,
                      isLink: true,
                    },
                  ],
                },
                {
                  title: "Personal Information",
                  bgColor: "bg-pink-50",
                  fields: [
                    { label: "Full Name", value: applicant.fullName },
                    { label: "Email", value: applicant.email },
                    { label: "Phone", value: applicant.phoneNumber },
                    { label: "Gender", value: applicant.gender },
                    {
                      label: "Date of Birth",
                      value: applicant.dateOfBirth
                        ? new Date(applicant.dateOfBirth).toLocaleDateString()
                        : null,
                    },
                  ],
                },
                {
                  title: "Address",
                  bgColor: "bg-blue-50",
                  fields: [
                    { label: "Street", value: applicant.address },
                    { label: "City", value: applicant.city },
                    { label: "State", value: applicant.state },
                    { label: "Country", value: applicant.country },
                    { label: "Pincode", value: applicant.pincode },
                  ],
                },
              ].map((section, index) => (
                <div
                  key={index}
                  className={`${section.bgColor} rounded-xl p-4 transition-all duration-300 hover:shadow-md`}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="space-y-1">
                        <p className="text-gray-600 text-sm font-medium">
                          {field.label}
                        </p>
                        {field.isLink && field.value ? (
                          <a
                            href={field.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all"
                          >
                            {field.value}
                          </a>
                        ) : (
                          <p className="font-medium break-words">
                            {field.value || "N/A"}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Skills & Links Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(applicant.skills) &&
                    applicant.skills.length > 0 ? (
                      applicant.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills listed</p>
                    )}
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    Links
                  </h3>
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Project URL
                    </p>
                    {applicant.projectUrl ? (
                      <a
                        href={applicant.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {applicant.projectUrl}
                      </a>
                    ) : (
                      <p className="text-gray-500">No project URL provided</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="bg-gray-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  Summary
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {applicant.summary || "No summary provided"}
                </p>
              </div>

              {/* Application Status */}
              <div className="bg-green-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  Application Status
                </h3>
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full ${
                    application.shortListed
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${
                      application.shortListed ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></span>
                  {application.shortListed ? "Shortlisted" : "Under Review"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Applicant;
