import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

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
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
          Jobs you've applied to
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl mt-5">
          {displayedJobs.map((job) => (
            <div
              key={job._id}
              className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-xl mb-3 font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                 {job.title}
              </h2>
              <p className="text-gray-500 font-semibold">
                <span className="font-bold text-black">Company:</span>{" "}
                {job.companyName}
              </p>
              <p className="text-gray-500 font-semibold">
                <span className="font-bold text-black">Location:</span>{" "}
                {job.location}
              </p>
              <p className="text-gray-500 font-semibold">
                <span className="font-bold text-black">Type:</span>{" "}
                {job.jobType}
              </p>
              <p className="text-gray-500 font-semibold">
                <span className="font-bold text-black">Experience:</span>{" "}
                {job.experience}
              </p>
              <p className="text-gray-500 font-semibold">
                <span className="font-bold text-black">Package:</span>{" "}
                {job.minPackage} - {job.maxPackage}
              </p>
              <p className="text-gray-500 font-semibold">
                <span className="font-bold text-black">Skills:</span>{" "}
                {job.skills?.length > 0 ? job.skills.join(", ") : "N/A"}
              </p>
              <p className="text-gray-500 font-semibold">
                <span className="font-bold text-black">Openings:</span>{" "}
                {job.noOfOpeaning}
              </p>
            </div>
          ))}
        </div>

        {jobs.length > visibleJobs && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSeeMoreJobs}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
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
