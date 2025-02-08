import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaBuilding, FaMapMarkerAlt, FaBriefcase, FaUserTie, FaDollarSign, FaUsers } from "react-icons/fa";

const ShowJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState(2);
  const [error, setError] = useState(null);

  useEffect(() => {
    showJobs();
  }, []);

  const showJobs = async () => {
    const userId = Cookies.get("Id");
    const userToken = Cookies.get("Token");

    const userJobs = `https://jobquick.onrender.com/applicants?applicantId=${userId}`;
    try {
      const response = await fetch(userJobs, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch jobs. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      // Extract just the jobId details from each application
      if (Array.isArray(result)) {
        const jobDetails = result.map((application) => application.jobId);
        setJobs(jobDetails);
      } else {
        setJobs([]);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSeeMoreJobs = () => {
    setShowAllJobs(!showAllJobs);
  };

  const displayedJobs = showAllJobs ? jobs : jobs.slice(0, visibleJobs);
  return (
    <>
      <div className="max-w-7xl mx-auto px-0 sm:px-4">
        <h2 className="text-2xl lg:text-4xl md:text-5xl font-bold text-center mt-6 mb-8">
          <span className="text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
            Jobs you've applied to
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  <span className="text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                    {job.title}
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Company", value: job.companyName, icon: <FaBuilding /> },
                    { label: "Location", value: job.location, icon: <FaMapMarkerAlt /> },
                    { label: "Type", value: job.jobType, icon: <FaBriefcase /> },
                    { label: "Experience", value: job.experience, icon: <FaUserTie /> },
                    { label: "Package", value: job.minPackage, icon: <FaDollarSign /> },
                    { label: "Openings", value: job.noOfOpeaning, icon: <FaUsers /> },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl p-4 transform hover:scale-102 transition-transform duration-200 flex items-center gap-3"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-gray-500 font-semibold text-sm whitespace-nowrap">
                          {item.label}
                        </span>
                        <span className="text-gray-800 text-lg font-semibold break-words mt-1">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <section className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 transform hover:scale-102 transition-transform duration-200 mt-4">
                  <span className="text-gray-500 font-semibold text-sm whitespace-nowrap">
                    Skills
                  </span>
                  <div className="flex flex-wrap mt-2 gap-3">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-transparent text-gray-800 text-lg font-semibold px-3 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && <span className="text-gray-600">...</span>}
                  </div>
                </section>
              </div>
            </div>
          ))}
        </div>

        {jobs.length > visibleJobs && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSeeMoreJobs}
              className="mb-4 mt-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
            >
              {showAllJobs ? "Show Less" : "See More Jobs"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowJobs;
