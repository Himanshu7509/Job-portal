import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

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
        console.log(data);
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
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:max-w-2xl p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row items-center p-4 sm:p-8">
            <div className="flex-shrink-0">
              <img
                src={hoster.profileImg}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                John William
              </h2>
              <p className="text-gray-500 text-sm mt-2">Web Developer</p>
            </div>
            <div className="ml-auto mt-4 sm:mt-0">
              <Link to={`/host-detail`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>

          <div className="px-4 sm:px-6 md:px-8 pb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6 sm:mb-8">
              My Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  Full Name
                </p>
                <p className="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.fullName}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  City
                </p>
                <p className="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.city}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  State
                </p>
                <p className="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.state}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  Address
                </p>
                <p className="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.address}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  Phone Number
                </p>
                <p className="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  Company URL
                </p>
                <a
                  href={hoster.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg font-medium text-blue-600 hover:underline"
                >
                  {hoster.companyUrl}
                </a>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  Gender
                </p>
                <p className="text-base sm:text-lg font-medium text-gray-800">
                  {hoster.gender}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  Pincode
                </p>
                <p className="text-base sm:text-lg font-medium text-gray-800">
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