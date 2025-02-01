import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HostSidebar from "../../hoster-dashboard/sidebar/HostSidebar";

const HosterProfile = () => {
  const [hoster, setHoster] = useState(null);
  const [error, setError] = useState(null);

  const HostId = Cookies.get("userId");
  const HostToken = Cookies.get("jwtToken");
  const hostProfileApi = `https://jobquick.onrender.com/hostuser/${HostId}`;

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (!hoster) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading hoster details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
        
        <HostSidebar/>

        <div className="flex-1 p-4 lg:p-6">
          <main className="w-full flex-grow max-w-6xl p-4 sm:p-6 mx-auto">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-4 sm:p-6 md:p-10 transition-all duration-300">
              <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left">
                <img
                  src={hoster.profileImg}
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-200 shadow-lg"
                />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-500 mt-4 md:mt-0 md:ml-6">
                  {hoster.fullName}
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 ml-4">
                <div>
                  <p className="text-lg mb-2 sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                    {" "}
                    Mob No{" "}
                  </p>
                  <p className="text-2xl font-medium text-gray-900">
                    {hoster.phoneNumber}
                  </p>
                </div>

                <div>
                  <p className="text-lg mb-2 sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                    {" "}
                    CompanyUrl{" "}
                  </p>
                  <a
                    href={hoster.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-medium text-blue-600 hover:underline break-all"
                  >
                    {hoster.companyUrl}
                  </a>
                </div>
                <div>
                  <p className="text-lg mb-2 sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                    City
                  </p>
                  <p className="text-2xl font-medium text-gray-800">
                    {hoster.city}
                  </p>
                </div>
                <div>
                  <p className="text-lg mb-2 sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                    {" "}
                    State
                  </p>
                  <p className="text-2xl font-medium text-gray-800">
                    {hoster.state}
                  </p>
                </div>
                <div>
                  <p className="text-lg mb-2 sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                    Address
                  </p>
                  <p className="text-2xl font-medium text-gray-800">
                    {hoster.address}
                  </p>
                </div>

                <div>
                  <p className="text-lg mb-2 sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                    {" "}
                    Gender{" "}
                  </p>
                  <p className="text-2xl font-medium text-gray-900">
                    {hoster.gender}
                  </p>
                </div>
                <div>
                  <p className="text-lg mb-2 sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                    Pincode{" "}
                  </p>
                  <p className="text-2xl font-medium text-gray-900">
                    {hoster.pincode}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex ml-4">
                <button className="bg-gradient-to-r from-pink-700 to-blue-700  text-white px-6 py-3 rounded-lg shadow-md transition-all">
                  Edit Profile
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default HosterProfile;
