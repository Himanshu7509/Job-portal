import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../common/header/Header";
import Footer from "../../../common/footer/Footer";
import ProfileImg from "../../../../assets/profile.png";
import ShowJobs from "./showAppliedJobs/ShowJobs";
import { FaUserEdit, FaTrashAlt, FaTimes, FaCheck } from "react-icons/fa";

const ProfilePage = () => {
  const [seeker, setSeeker] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const userId = Cookies.get("Id");
  const userToken = Cookies.get("Token");
  const userProfileApi = `https://jobquick.onrender.com/seekuser/${userId}`;
  const deleteProfile = `https://jobquick.onrender.com/seekuser/delete/${userId}`;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(userProfileApi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSeeker(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching host profile:", error);
        setError("Failed to load seeker details.");
      }
    };

    fetchUserProfile();
  }, [userProfileApi, userToken]);

  const handleDeleteProfile = async (userId) => {
    console.log("Attempting to delete profile with ID:", userId);
    try {
      const response = await fetch(deleteProfile, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("Delete API Response:", result);
      if (response.ok) {
        Cookies.remove("Token");
        Cookies.remove("Id");
        navigate("/");
      }

      if (!response.ok) {
        throw new Error(
          `Failed to delete profile. Status: ${response.status}, Message: ${
            result.message || "Unknown error"
          }`
        );
      }

      console.log("Profile deleted successfully");
    } catch (error) {
      console.error("Delete profile Error:", error);
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-500">
        <p className="text-red-600 text-5xl">{error}</p>
      </div>
    );
  }

  if (!seeker) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-center mt-5 text-5xl text-pink-500 font-semibold">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">
        {seeker ? (
          <>
            <div className="w-full p-0 sm:p-4 md:p-6 mx-auto max-w-7xl">
              <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-3 sm:p-6 md:p-8 lg:p-10">
                <h1 className="text-4xl sm:text-4xl font-bold mb-8 text-zinc-500 sm:mb-6">
                  Profile
                </h1>

                {/* Profile Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex flex-col sm:flex-row items-center text-center sm:text-left w-full sm:w-auto gap-4">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                      alt="Profile"
                      className="rounded-full w-32 h-32 sm:w-44 sm:h-44 border-4 border-black shadow-lg"
                    />
                    <div className="sm:ml-6">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-gray-600 bg-clip-text mb-2">
                        {seeker.fullName || "Admin"}
                      </h1>
                      <h4 className="text-lg sm:text-xl text-gray-400 font-semibold">
                        {seeker.email}
                      </h4>
                      <Link to="/user-detail">
                        <button className="font-semibold text-xl sm:text-2xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent hover:font-bold mt-2">
                          Edit Profile
                        </button>
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="border border-red-500 text-red-500 font-semibold px-4 py-2 sm:py-3 rounded sm:w-50 hover:bg-red-500 hover:text-white"
                  >
                    Delete Account
                  </button>
                </div>

                {/* Personal Details Section */}
                <section className="mt-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-500 mb-4">
                    Personal Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      ["Gender", seeker.gender],
                      ["Company Url", seeker.dateOfBirth],
                      ["Phone No", seeker.phoneNumber],
                      ["Github Link", seeker.projectUrl],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-sky-50 rounded-xl p-4">
                        <p className="text-gray-600 font-semibold">{label}</p>
                        <p className="font-semibold text-base sm:text-lg text-gray-900 mt-1 break-words">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* About Section */}
                {/* <div className="mt-6">
                  <div className="bg-sky-50 rounded-xl p-4">
                    <p className="text-gray-600 font-semibold">
                      About yourself
                    </p>
                    <p className="text-base sm:text-lg text-gray-900 mt-2 font-semibold break-words">
                      {seeker.summary}
                    </p>
                  </div>
                </div> */}

                {/* Skills Section */}
                <section className="mt-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-transparent text-zinc-500 mb-4">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {seeker.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 sm:px-5 py-2 sm:py-3 bg-sky-50 font-semibold rounded-xl text-sm sm:text-base transform hover:scale-105 transition-transform duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Location Section */}
                <section className="mt-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-transparent text-zinc-500 mb-4">
                    Location
                  </h2>
                  <div className="bg-sky-50 rounded-xl p-4 mb-4">
                    <p className="text-gray-600 font-semibold">Address</p>
                    <p className="font-semibold text-base sm:text-lg text-gray-900 mt-1 break-words">
                      {seeker.address}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      ["City", seeker.city],
                      ["State", seeker.state],
                      ["Country", seeker.country],
                      ["Pincode", seeker.Pincode],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-sky-50 rounded-xl p-4">
                        <p className="text-gray-600 font-semibold">{label}</p>
                        <p className="font-semibold text-base sm:text-lg text-gray-900 mt-1 break-words">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education Section */}
                <section className="mt-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-transparent text-zinc-500 mb-4">
                    Education
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      ["Degree", seeker.eduDegree],
                      ["University", seeker.eduInstitution],
                      ["Specialisation", seeker.eduSpecialisation],
                      ["Start Year", seeker.eduStartYear],
                      ["End Year", seeker.eduEndYear],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-sky-50 rounded-xl p-4">
                        <p className="text-gray-600 font-semibold">{label}</p>
                        <p className="font-semibold text-base sm:text-lg text-gray-900 mt-1 break-words">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Work Experience Section */}
                <section className="mt-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-transparent text-zinc-500 mb-4">
                    Work Experience
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      ["Company Name", seeker.expCompany],
                      ["Position", seeker.expPosition],
                      ["Start Date", seeker.expStartYear],
                      ["End Date", seeker.expEndYear],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-sky-50 rounded-xl p-4">
                        <p className="text-gray-600 font-semibold">{label}</p>
                        <p className="font-semibold text-base sm:text-lg text-gray-900 mt-1 break-words">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <ShowJobs />
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500">Loading...</p>
          </>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full transform transition-all scale-100 hover:scale-105">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Are you sure you want to delete your account?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              This action cannot be undone and will permanently remove your profile.
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteProfile}
                className="px-5 py-2 bg-red-500 text-white font-medium rounded-lg flex items-center gap-2 hover:bg-red-700 transition-all duration-200"
              >
                <FaCheck className="w-5 h-5" /> Yes, Delete
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg flex items-center gap-2 hover:bg-gray-400 transition-all duration-200"
              >
                <FaTimes className="w-5 h-5" /> Cancel
              </button>
            </div>
          </div>
        </div>
        
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;
