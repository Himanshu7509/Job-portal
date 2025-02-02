import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HostSidebar from "../../hoster-dashboard/sidebar/HostSidebar";
import { Link } from "react-router-dom";
import ProfileImg from '../../../../../assets/profile.png'

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
              <h1 className="mt-2 text-4xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
                Hoster Profile
              </h1>
              <div className="flex flex-col items-center md:flex-row md:items-center text-center md:text-left">
                <img
                  src={hoster.profileImg || ProfileImg}
                  alt="Profile"
                  className="w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 border-4 rounded-2xl border-pink-300 shadow-lg"
                />
                <div className="md:ml-6 mt-4 md:mt-0">
                  <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
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

              <div className="mt-8">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <div>
                    <p className="font-semibold text-gray-500">Gender:</p>{" "}
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {hoster.gender}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Company Url:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {hoster.companyURL}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Phone No.:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {hoster.phoneNumber}
                    </span>{" "}
                  </div>
                  
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                  Location
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <div>
                    <p className="font-semibold text-gray-500">Address:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {hoster.address}{" "}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">City:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {hoster.city}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">State:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {hoster.state}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Country:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {hoster.country}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Pincode:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {hoster.pincode}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </main>
        
      </div>
    </>
  );
};

export default HosterProfile;
