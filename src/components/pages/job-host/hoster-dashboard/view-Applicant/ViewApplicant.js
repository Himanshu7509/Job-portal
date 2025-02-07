import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import HostSidebar from "../sidebar/HostSidebar";
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading applicants...</p>
        </div>
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
    <div className="min-h-screen bg-gray-100">
      <div className="lg:block fixed left-0 top-0 w-80 h-screen">
        <HostSidebar />
      </div>

      <div className="lg:ml-80 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-4 lg:p-6">
            <div className="flex gap-4 lg:gap-6 border-b pb-3 overflow-x-auto">
              <Link to={"/host-jobs"}>
                <button>
                  <FaArrowLeftLong className="text-pink-600 mt-2" />
                </button>
              </Link>

              <button
                className={`text-base lg:text-lg font-semibold pb-2 whitespace-nowrap ${
                  viewMode === "all"
                    ? "text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text border-b-2 border-pink-600"
                    : "text-gray-500"
                }`}
                onClick={() => setViewMode("all")}
              >
                Job Applicants
              </button>
              <button
                className={`text-base lg:text-lg font-semibold pb-2 whitespace-nowrap ${
                  viewMode === "shortlisted"
                    ? "text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text border-b-2 border-pink-600"
                    : "text-gray-500"
                }`}
                onClick={() => setViewMode("shortlisted")}
              >
                Shortlisted
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                  {applicants.map((application) => (
                    <div
                      key={application._id}
                      className="bg-gray-50 border rounded-lg p-4 lg:p-6 shadow-md hover:shadow-lg transition"
                    >
                      <div className="w-full p-4 hover:bg-gray-50 transition-colors rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          {/* Left section with user info */}
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            {/* Avatar container */}
                            <div className="p-3 bg-pink-100 rounded-full ring-4 ring-pink-50">
                              <CiUser className="text-pink-600 w-5 h-5" />
                            </div>

                            {/* Name section */}
                            <div className="min-w-0">
                              <h3 className="text-lg font-bold text-gray-800 truncate">
                                {application?.applicantId?.fullName || "N/A"}
                              </h3>
                            </div>
                          </div>

                          {/* Status badge */}
                          <div className="w-full sm:w-auto">
                            {application.shortListed ? (
                              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                                <span className="mr-1.5">✅</span>
                                Shortlisted
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                <span className="mr-1.5">🔄</span>
                                Under Review
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                          <MdEmail className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-sm lg:text-base text-gray-800 font-semibold truncate">
                            {application?.applicantId?.email || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                          <FaLocationDot className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-sm lg:text-base text-gray-800 font-semibold truncate">
                            {application?.applicantId?.city || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                          <FaPhoneAlt className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-sm lg:text-base text-gray-800 font-semibold truncate">
                            {application?.applicantId?.phoneNumber || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                          <FaUserGraduate className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-sm lg:text-base text-gray-800 font-semibold truncate">
                            {application?.applicantId?.eduDegree || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                          <BsFillBriefcaseFill className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-sm lg:text-base text-gray-800 font-semibold truncate">
                            {application?.applicantId?.expPosition || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                          <FaStar className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-sm lg:text-base text-gray-800 font-semibold truncate">
                            {application?.applicantId?.skills || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <button
                          onClick={() => handleViewProfile(application)}
                          className="text-sm lg:text-base bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-blue-500 hover:font-semibold px-3 py-2 lg:px-4 lg:py-3 rounded cursor-pointer"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicant;
