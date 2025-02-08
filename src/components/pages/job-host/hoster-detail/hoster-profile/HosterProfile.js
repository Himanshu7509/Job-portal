import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HostSidebar from "../../hoster-dashboard/sidebar/HostSidebar";
import { Link, useNavigate } from "react-router-dom";
import ProfileImg from "../../../../../assets/profile.png";
import { FaUserEdit, FaTrashAlt, FaTimes, FaCheck } from "react-icons/fa";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-500">
        <p className="text-red-600 text-5xl">{error}</p>
      </div>
    );
  }

  if (!hoster) {
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
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        <div className="w-1/4 h-screen fixed top-0 left-0">
          <HostSidebar />
        </div>

        <main className="p-2 sm:w-3/4 ml-auto sm:p-10">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="mt-2 text-4xl font-bold text-center sm:text-left text-transparent text-zinc-600 mb-6">
              Profile
            </h1>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left w-full sm:w-auto gap-4">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                  alt="Profile"
                  className="w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 border-4 rounded-2xl border-gray-300 shadow-lg"
                />
                <div className="md:ml-6 mt-4 md:mt-0">
                  <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-zinc-700 bg-clip-text mb-2">
                    {hoster.fullName || "Admin"}
                  </h1>
                  <h4 className="text-xl md:text-1xl text-gray-400 font-semibold">
                    {hoster.email}
                  </h4>
                  <Link to="/host-detail">
                    <button className="font-semibold text-2xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent hover:font-bold rounded cursor-pointer mt-2">
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

            <section>
              <h2 className="text-3xl mt-6 font-bold text-zinc-500 mb-6">
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {[
                  ["Gender", hoster.gender],
                  ["Company Url", hoster.companyURL],
                  ["Phone No", hoster.phoneNumber],
                ].map(([label, value]) => (
                  <div key={label} className="bg-sky-50 rounded-xl p-4">
                    <p className="text-gray-600 font-semibold">
                      {label}
                    </p>
                    <p className="font-semibold text-base sm:text-lg text-gray-900 mt-1 break-words">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl mt-4 font-bold text-zinc-500 mb-6">
                Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {[
                  ["Address", hoster.address],
                  ["City", hoster.city],
                  ["Country", hoster.country],
                  ["Pincode", hoster.pincode],
                ].map(([label, value]) => (
                  <div key={label} className="bg-sky-50 rounded-xl p-4">
                    <p className="text-gray-600 font-semibold">
                      {label}
                    </p>
                    <p className="font-semibold text-base sm:text-lg text-gray-900 mt-1 break-words">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full transform transition-all scale-100 hover:scale-105">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Are you sure you want to delete your account?
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  This action cannot be undone and will permanently remove your
                  profile.
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
        </main>
      </div>
    </>
  );
};

export default HosterProfile;
