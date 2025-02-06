import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import HostSidebar from "../sidebar/HostSidebar";
import { Link } from "lucide-react";

const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("jwtToken");

    if (!userId || !token) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    const apiUrl = `https://jobquick.onrender.com/job/createdby/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
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

      if (result.success && result.jobs) {
        setJobs(result.jobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplicant = (jobId) =>{
    navigate(`/job/${jobId}/applicants`);
  }

  const handleDeleteJob = async (jobId) => {
    const token = Cookies.get("jwtToken");

    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    console.log("Attempting to delete job with ID:", jobId);

    const deleteUrl = `https://jobquick.onrender.com/job/${jobId}`;

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("Delete API Response:", result);

      if (!response.ok) {
        throw new Error(
          `Failed to delete job. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Delete Job Error:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-center mt-5 text-5xl text-pink-500 font-semibold">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h1 className="text-red-500 text-lg font-semibold">Error: {error}</h1>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-6 py-2 rounded mt-4 hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="w-1/4 h-screen fixed top-0 left-0">
        <HostSidebar />
      </div>
      <div className="p-2 sm:w-3/4 ml-auto sm:p-10">
        <h1 className="mt-2 text-4xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          My Jobs
        </h1>
        {jobs.length === 0 ? (
          <div className="text-center">
            <h1 className="text-xl font-semibold">No jobs found.</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl mt-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl "
              >
                <h2 className="text-xl mb-3 font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                  {job.title}
                </h2>
                <p className="text-gray-500 font-semibold">
                  <span className="font-bold text-black">Company:</span> {job.companyName}
                </p>
                <p className="text-gray-500 font-semibold">
                  <span className="font-bold text-black">Location:</span> {job.location}
                </p>
                <p className="text-gray-500 font-semibold">
                  <span className="font-bold text-black">Type:</span> {job.jobType}
                </p>
                <p className="text-gray-500 font-semibold">
                  <span className="font-bold text-black">Skills:</span>{" "}
                  {job.skills?.length > 0 ? job.skills.join(", ") : "N/A"}
                </p>
                <p className="text-gray-500 font-semibold">
                  <span className="font-bold text-black">Openings:</span> {job.noOfOpeaning}
                </p>

                <div className="flex justify-between">
                  
                  <button onClick={()=> handleViewApplicant(job._id)} className="bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold px-4 py-2 rounded mt-4 w-35">
                    View Applicants
                  </button>
                  
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="bg-gradient-to-r from-red-500 to-red-800 text-white font-semibold px-4 py-2 rounded mt-4 w-30"
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJob;
