import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-blue-500 px-6 py-5 w-full flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Applicant Details</h2>
            <button
              onClick={handleShorlisted}
              className={`bg-white text-black p-3 ${
                application.shortListed ? "bg-green-500 text-white" : ""
              }`}
            >
              {application.shortListed ? "Shortlisted" : "Shortlist"}
            </button>
          </div>

          <div className="p-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Job Details */}
              <div className="mb-8 bg-orange-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Applied Job Details
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Company Name</p>
                    <p className="font-semibold">{job?.companyName || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Company Email</p>
                    <p className="font-semibold">
                      {job?.companyEmail || "N/A"}
                    </p>
                  </div>
                  {job?.companyURL && (
                    <div>
                      <p className="text-gray-600">Company Website</p>
                      <a
                        href={job.companyURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {job.companyURL}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="mb-8 bg-pink-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Full Name</p>
                    <p className="font-semibold">
                      {applicant.fullName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-semibold">{applicant.email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-semibold">
                      {applicant.phoneNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Gender</p>
                    <p className="font-semibold">{applicant.gender || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date of Birth</p>
                    <p className="font-semibold">
                      {applicant.dateOfBirth
                        ? new Date(applicant.dateOfBirth).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Address
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Street</p>
                    <p className="font-semibold">
                      {applicant.address || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">City</p>
                    <p className="font-semibold">{applicant.city || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">State</p>
                    <p className="font-semibold">{applicant.state || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Country</p>
                    <p className="font-semibold">
                      {applicant.country || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pincode</p>
                    <p className="font-semibold">
                      {applicant.pincode || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-8 bg-green-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Education
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Degree</p>
                    <p className="font-semibold">
                      {applicant.eduDegree || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Specialization</p>
                    <p className="font-semibold">
                      {applicant.eduSpecialisation || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Institution</p>
                    <p className="font-semibold">
                      {applicant.eduInstitution || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-semibold">
                      {applicant.eduStartYear && applicant.eduEndYear
                        ? `${new Date(
                            applicant.eduStartYear
                          ).getFullYear()} - ${new Date(
                            applicant.eduEndYear
                          ).getFullYear()}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Experience
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Position</p>
                    <p className="font-semibold">
                      {applicant.expPosition || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Company</p>
                    <p className="font-semibold">
                      {applicant.expCompany || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-semibold">
                      {applicant.expStartYear && applicant.expEndYear
                        ? `${new Date(
                            applicant.expStartYear
                          ).getFullYear()} - ${new Date(
                            applicant.expEndYear
                          ).getFullYear()}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills & Links */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(applicant.skills) &&
                    applicant.skills.length > 0 ? (
                      applicant.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills listed</p>
                    )}
                  </div>
                </div>
                <div className="bg-indigo-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Links
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-600">Project URL</p>
                      {applicant.projectUrl ? (
                        <a
                          href={applicant.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {applicant.projectUrl}
                        </a>
                      ) : (
                        <p className="text-gray-500">No project URL provided</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-8 bg-gray-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Summary
                </h3>
                <p className="text-gray-700">
                  {applicant.summary || "No summary provided"}
                </p>
              </div>

              {/* Application Status */}
              <div className="mt-8 bg-green-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Application Status
                </h3>
                <p className="font-semibold text-green-600">
                  {application.shortListed ? "Shortlisted" : "Under Review"}
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
