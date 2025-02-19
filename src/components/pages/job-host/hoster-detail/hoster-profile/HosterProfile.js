import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HostSidebar from "../../hoster-dashboard/sidebar/HostSidebar";
import { Link, useNavigate } from "react-router-dom";
import ProfileImg from "../../../../../assets/profile.png";
import { FaTimes, FaCheck } from "react-icons/fa";

const HosterProfile = () => {
  const [hoster, setHoster] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const HostId = Cookies.get("userId");
  const HostToken = Cookies.get("jwtToken");
  const hostProfileApi = `https://jobquick.onrender.com/hostuser/${HostId}`;
  const deleteProfile = `https://jobquick.onrender.com/hostuser/delete/${HostId}`;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostProfile = async () => {
      try {
        const response = await fetch(hostProfileApi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HostToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setHoster(data);
      } catch (error) {
        console.error("Error fetching host profile:", error);
        setError("Failed to load hoster details.");
      }
    };

    fetchHostProfile();
  }, [hostProfileApi, HostToken]);

  const handleDeleteProfile = async (HostId) => {
    console.log("Attempting to delete profile with ID:", HostId);
    try {
      const response = await fetch(deleteProfile, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${HostToken}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("Delete API Response:", result);
      if (response.ok) {
        Cookies.remove("jwtToken");
        Cookies.remove("userId");
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-5xl">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        <div className="w-1/4 h-screen fixed top-0 left-0">
          <HostSidebar />
        </div>

        {!hoster ? (
          <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full  lg:ml-72 xl:ml-80 p-3 sm:p-4 lg:p-6 xl:p-4 overflow-y-auto">
              <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rounded-lg">
                  <h1 className="text-center text-3xl sm:text-4xl lg:text-left font-bold mb-12 text-gray-700 border-b pb-4">
                    Profile
                  </h1>

                  <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                      <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                        <div>
                          <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                            alt="Profile"
                            className="rounded-full w-32 h-32 sm:w-36 sm:h-36 border-4 border-white shadow-xl"
                          />
                        </div>
                        <div className="text-center sm:text-left">
                          <h1 className="text-2xl sm:text-2xl md:text-2xl xl:text-4xl font-bold text-zinc-800">
                            {hoster.fullName || "Admin"}
                          </h1>
                          <h4 className="text-lg sm:text-xl text-gray-500 font-medium mt-2">
                            {hoster.email}
                          </h4>
                          <Link to="/host-detail">
                            <button className="font-semibold text-xl sm:text-2xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent hover:font-bold mt-2">
                              Edit Profile
                            </button>
                          </Link>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 border-2 border-red-500 rounded-lg hover:bg-red-700"
                      >
                        <span className="text-red-500 font-semibold hover:text-white">
                          Delete Account
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <section className="bg-white rounded-2xl shadow-lg p-6">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                        Personal Details
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        {[
                          ["Gender", hoster.gender],
                          ["Company Url", hoster.companyURL],
                          ["Phone No", hoster.phoneNumber],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
                          >
                            <p className="text-gray-500 font-medium text-sm">
                              {label}
                            </p>
                            <p className="font-semibold text-gray-900 mt-1 break-words">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="bg-white rounded-2xl shadow-lg p-6">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                        Location
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        {[
                          ["Address", hoster.address],
                          ["City", hoster.city],
                          ["Country", hoster.country],
                          ["Pincode", hoster.pincode],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
                          >
                            <p className="text-gray-500 font-medium text-sm">
                              {label}
                            </p>
                            <p className="font-semibold text-gray-900 mt-1 break-words">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>

                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full transform transition-all scale-100 hover:scale-105">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Are you sure you want to delete your account?
                      </h2>
                      <p className="text-gray-500 text-sm mb-6">
                        This action cannot be undone and will permanently remove
                        your profile.
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HosterProfile;
