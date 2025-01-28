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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Hoster Profile
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Full Name</p>
            <p className="text-lg font-medium text-gray-800">{hoster.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">City</p>
            <p className="text-lg font-medium text-gray-800">{hoster.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">State</p>
            <p className="text-lg font-medium text-gray-800">{hoster.state}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Address</p>
            <p className="text-lg font-medium text-gray-800">{hoster.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone Number</p>
            <p className="text-lg font-medium text-gray-800">{hoster.phoneNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Company URL</p>
            <a
              href={hoster.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-blue-600 hover:underline"
            >
              {hoster.companyUrl}
            </a>
          </div>
          <div>
            <p className="text-sm text-gray-600">Gender</p>
            <p className="text-lg font-medium text-gray-800">{hoster.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Pincode</p>
            <p className="text-lg font-medium text-gray-800">{hoster.pincode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HosterProfile;
