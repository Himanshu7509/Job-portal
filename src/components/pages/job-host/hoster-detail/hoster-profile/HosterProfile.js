import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

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
      <div>
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:max-w-2xl p-4 sm:p-6 md:p-8 lg:p-10">
          <div class="flex flex-col sm:flex-row items-center p-4 sm:p-8">
            <div class="flex-shrink-0">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h2 class="text-2xl sm:text-3xl font-semibold text-gray-800">
                John William
              </h2>
              <p class="text-gray-500 text-sm mt-2">Web Developer</p>
            </div>
          </div>

          <div class="px-4 sm:px-6 md:px-8 pb-6">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6 sm:mb-8">
              My Profile
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  Full Name
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.fullName}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  City
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.city}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  State
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.state}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  Address
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.address}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  Phone Number
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.phoneNumber}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  Company URL
                </p>
                <a
                  href={hoster.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-base sm:text-lg font-medium text-blue-600 hover:underline"
                >
                  {hoster.companyUrl}
                </a>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  Gender
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.gender}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  Pincode
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HosterProfile;
