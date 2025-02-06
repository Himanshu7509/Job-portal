import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ViewApplicant = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const token = Cookies.get("jwtToken");

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!token) {
        setError("Authentication required");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://jobquick.onrender.com/applicants?jobId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applicants");
        }

        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setApplicants(data); // Store the entire application object
        } else {
          setApplicants([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchApplicants();
    }
  }, [id, token]);

  const handleViewProfile = (application) => {
    navigate(`/applicant/${application._id}`, { state: { application } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-pink-700">Loading applicants...</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-blue-500 px-6 py-5">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <FiUser className="w-10 h-8" />
              Job Applicants
            </h2>
          </div>

          <div className="p-6">
            {applicants.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-500">No applicants yet</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {applicants.map((application) => (
                  <div
                    key={application?._id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      <div className="bg-pink-100 px-6 py-3 flex items-center justify-between gap-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className=" p-3 rounded-full">
                            <FiUser className="text-blue-900 w-8 h-8" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-2xl">
                              {application?.applicantId?.fullName || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div>
                          <div>
                            <button
                              onClick={() => handleViewProfile(application)}
                              className="w-60 h-4 bg-pink-500  text-white rounded-lg shadow-md  hover:scale-105 hover:shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400  sm:h-12 md:h-14 lg:h-12"
                            >
                              View Job Details
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4 gap-6">
                        <div className="flex gap-4">
                          <MdMail className="w-5 h-5 text-pink-600" />
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="font-medium text-gray-900 truncate">
                              {application?.applicantId?.email || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <FaPhoneAlt className="w-5 h-5 text-pink-600" />
                          <div>
                            <p className="text-sm text-gray-500"> Phone No </p>
                            <p className="font-medium text-gray-900">
                              {application?.applicantId?.phoneNumber || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <FaGraduationCap className="w-5 h-5 text-pink-600" />
                          <div>
                            <p className="text-sm text-gray-500">Education</p>
                            <p className="font-medium text-gray-900">
                              {application?.applicantId?.eduDegree
                                ? `${application?.applicantId?.eduDegree} - ${application?.applicantId?.eduSpecialisation}`
                                : "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <BsBriefcaseFill className="w-5 h-5 text-pink-600" />
                          <div>
                            <p className="text-sm text-gray-500">Experience</p>
                            <p className="font-medium text-gray-900">
                              {application?.applicantId?.expPosition
                                ? `${application?.applicantId?.expPosition} at ${application?.applicantId?.expCompany}`
                                : "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <FaStar className="w-5 h-5 text-pink-600" />
                          <div>
                            <p className="text-sm text-gray-500">Skills</p>
                            {application?.applicantId?.skills.map((skill, index) => (
                              <span
                                key={index}
                                className=" text-gray-900 rounded-lg text-md font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
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
