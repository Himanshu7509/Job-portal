import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../../../common/header/Header";
import Footer from "../../../../common/footer/Footer";

const JobDetails = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const jobToken = Cookies.get("Token");
  const userId = Cookies.get("Id");
  const jobDetailsAPI = `https://jobquick.onrender.com/job/${id}`;
  const jobApplyAPI = `https://jobquick.onrender.com/applicants`;
  const userProfileApi = `https://jobquick.onrender.com/seekuser/${userId}`;

  useEffect(() => {
    const fetchAllJobDetails = async () => {
      try {
        const response = await fetch(jobDetailsAPI, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jobToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        setJobData(data);
      } catch (error) {
        console.error("Error fetching host jobs:", error);
        setError("Failed to load hoster job details.");
      }
    };

    fetchAllJobDetails();
  }, [id]);

   useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(userProfileApi, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jobToken}`,
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();

          console.log([
            data._id,
            data.fullName,
            data.email,
            data.phoneNumber,

          ]);
        } catch (error) {
          console.error("Error fetching host profile:", error);
          setError("Failed to load seeker details.");
        }
      };
  
      fetchUserProfile();
    }, [userProfileApi, jobToken]);

  const handleApplynow = async () => {
    try {
      const response = await axios.post(
        jobApplyAPI,
        {
          jobId: id,
          applicantId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jobToken}`,
          },
        }
      );

      if (response && response.data) {
        console.log(response.data);
        if (hasApplied) {
          setShowModal(true);
          return;
        }
        setShowSuccessModal(true);
        setHasApplied(true);
      } else {
        console.error("Error applying for job: No response data");
        setShowModal(true);
      }
    } catch (error) {
      console.error(
        "Error applying for job:",
        error.response?.data || error.message
      );
      setShowModal(true);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading hoster job details...</p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-pink-200 to-blue-200" />
              <div className="px-4 sm:px-6 lg:px-8 pb-6">
                <div className="relative -mt-16 flex flex-col items-center sm:flex-row sm:items-end sm:space-x-8">
                  <img
                    src={jobData.profileImg}
                    alt="Company Profile"
                    className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-white"
                  />
                  <div className="mt-6 sm:mt-0 text-center sm:text-left flex-1">
                    <h1 className="text-4xl font-bold text-pink-900">
                      {jobData.title}
                    </h1>
                    <p className="text-xl text-gray-600 mt-1">
                      {jobData.companyName}
                    </p>
                  </div>
                  <div className="mt-6 sm:mt-0">
                    <button
                      onClick={handleApplynow}
                      disabled={hasApplied}
                      className={`px-8 py-3 ${
                        hasApplied
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-pink-500 to-blue-500 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white"
                      } rounded-xl font-semibold shadow-lg`}
                    >
                      {hasApplied ? "Applied" : "Apply Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
              <div className="space-y-8">
                <section>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-6">
                    Company Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      ["Company Email", jobData.companyEmail],
                      ["Company URL", jobData.companyURL],
                      ["Full Name", jobData.fullName],
                      ["Phone", jobData.phoneNo],
                      ["Company Size", jobData.numOfEmployee],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-600 text-sm">{label}</p>
                        <p className="font-semibold text-gray-900 mt-1">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-6">
                    Required Skills
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {jobData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-4 bg-gradient-to-r from-blue-500/30 to-pink-500/30 text-blue-900 rounded-lg text-md font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-6">
                    Job Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      ["Job Type", jobData.jobType],
                      ["Location", jobData.location],
                      ["Work Type", jobData.workType],
                      ["Min Education", jobData.minEducation],
                      ["Experience", jobData.experience],
                      ["Interview Type", jobData.interviewType],
                      ["Openings", jobData.noOfOpeaning],
                      ["Min Package", jobData.minPackage],
                      ["Max Package", jobData.maxPackage],
                      ["Categories",jobData.category.title],
                      ["Posted Date", new Date(jobData.dateCreated).toLocaleDateString()]
                    ].map(([label, value]) => (
                      <div key={label} className="bg-pink-50 rounded-xl p-4">
                        <p className="text-gray-600 text-sm">{label}</p>
                        <p className="font-semibold text-gray-900 mt-1">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-6">
                    Description
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-3">
                        About Company
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {jobData.companyDescription}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-3">
                        Job Description
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {jobData.jobDescription}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <Link to="/alljobs">
                <button className="px-8 py-3 mb-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">You have already applied</h2>
            <p>You have already submitted your application for this job.</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Application submitted successfully!</h2>
            <p>Thank you for applying for this job. We will review your application and get back to you soon.</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default JobDetails;
