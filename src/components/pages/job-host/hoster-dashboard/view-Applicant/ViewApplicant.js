import React, { useEffect, useState } from "react";
import {
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  Phone,
} from "lucide-react";
import { FaUserAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import HostSidebar from "../sidebar/HostSidebar";

const ViewApplicant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("all"); // 'all' or 'shortlisted'

  const token = Cookies.get("jwtToken");

  const fetchApplicants = async (mode) => {
    if (!token) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    try {
      const url = `https://jobquick.onrender.com/applicants?jobId=${id}${
        mode === "shortlisted" ? "&shortListed=true" : ""
      }`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch applicants");
      }

      const data = await response.json();
      console.log(data);
      setApplicants(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchApplicants(viewMode);
    }
  }, [id, token, viewMode]);

  const handleViewProfile = (application) => {
    navigate(`/applicant/${application._id}`, { state: { application } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-center mt-5 sm:text-5xl text-3xl text-pink-500 font-semibold">
          Loading Applicants...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <p className="text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
        <HostSidebar />
      </div>

      <div
        className="w-full  lg:ml-72 xl:ml-80 p-3 sm:p-4 lg:p-6 xl:p-4 h-auto sm:h-[690px] overflow-y-scroll -ms-overflow-style-none"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 bg-white p-4 rounded-lg shadow-md">
          <h1 className="mt-4 sm:text-4xl text-3xl font-bold text-center sm:text-left text-transparent text-zinc-600 mb-6">
            Job Applicants
          </h1>

          <div className="flex items-center justify-center sm:justify-start gap-4 sm:pt-4 p-2">
            <button
              className={`py-2 sm:text-lg text-md font-semibold ${
                viewMode === "all"
                  ? "bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent"
                  : "text-zinc-500"
              }`}
              onClick={() => setViewMode("all")}
            >
              Job Applicants
              {viewMode === "all" && (
                <span className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-3/4 bg-green-600 rounded-full"></span>
              )}
            </button>

            <button
              className={`py-2 sm:text-lg text-md font-semibold ${
                viewMode === "shortlisted"
                  ? "bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent"
                  : "text-zinc-500"
              }`}
              onClick={() => setViewMode("shortlisted")}
            >
              Shortlisted
              {viewMode === "shortlisted" && (
                <span className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-3/4 bg-green-600 rounded-full"></span>
              )}
            </button>
          </div>

          <div className="mt-6">
            {applicants.length === 0 ? (
              <p className="text-center text-gray-600">
                {viewMode === "shortlisted"
                  ? "No shortlisted applicants yet."
                  : "No applicants yet."}
              </p>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {applicants.map((application) => (
                  <div
                    key={application._id}
                    className="bg-white border border-gray-200 shadow-lg sm:p-6 p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-pink-100 to-blue-100 ">
                          <FaUserAlt className="text-blue-500 w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 md:text-sm">
                            {application?.applicantId?.fullName || "N/A"}
                          </h3>
                          <div>
                            {application.shortListed ? (
                              <span className=" text-green-500 rounded-full text-sm font-semibold">
                                ✅ Shortlisted
                              </span>
                            ) : (
                              <span className=" text-gray-700 rounded-full text-sm font-semibold">
                                🔄 Under Review
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-gray-700">
                      <div className="space-y-4 mt-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                          <Mail className="w-6 h-6 text-blue-500" />
                          <p className="text-md text-gray-600 font-semibold">
                            {application?.applicantId?.email || "N/A"}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                            <Phone className="w-6 h-6 text-green-500" />
                            <span className="text-gray-600 font-medium">
                              {application?.applicantId?.phoneNumber || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                            <MapPin className="w-6 h-6 text-red-500" />
                            <span className="text-gray-600 font-medium">
                              {application?.applicantId?.city || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                            <GraduationCap className="w-6 h-6 text-purple-500" />
                            <span className="text-gray-600 font-medium">
                              {application?.applicantId?.eduDegree || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                            <Briefcase className="w-6 h-6 text-yellow-500" />
                            <span className="text-gray-600 font-medium">
                              {application?.applicantId?.expPosition || "N/A"}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-4">
                            <Star className="w-6 h-6 text-indigo-500" />
                            <span className="text-gray-600 font-semibold">
                              Skills
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {application?.applicantId?.skills?.length > 0 ? (
                              application.applicantId.skills.map(
                                (skill, index) => (
                                  <span
                                    key={index}
                                    className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition"
                                  >
                                    {skill}
                                  </span>
                                )
                              )
                            ) : (
                              <span className="text-gray-500">N/A</span>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 w-full flex justify-center sm:justify-end">
                          <button
                            onClick={() => handleViewProfile(application)}
                            className="h-10 bg-blue-500 text-white rounded-md font-semibold shadow-md px-4 hover:bg-blue-600 transition"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicant;
