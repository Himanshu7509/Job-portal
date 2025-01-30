import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const [seeker, setseeker] = useState(null);
  const [error, setError] = useState(null);

  const userId = Cookies.get("Id");
  const userToken = Cookies.get("Token");
  const userProfileApi = `https://jobquick.onrender.com/seekuser/${userId}`;

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
        setseeker(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching host profile:", error);
        setError("Failed to load seeker details.");
      }
    };

    fetchUserProfile();
  }, [userProfileApi, userToken]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (!seeker) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading seeker details...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:max-w-2xl p-4 sm:p-6 md:p-8 lg:p-10">
         

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
                  {seeker.fullName}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  City
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {seeker.city}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  State
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {seeker.state}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  Address
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {seeker.address}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  Phone Number
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {seeker.phoneNumber}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  skills
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {seeker.skills}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  Gender
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {seeker.gender}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold text-gray-800">
                  Pincode
                </p>
                <p class="text-base sm:text-lg font-medium text-gray-800">
                  {seeker.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
