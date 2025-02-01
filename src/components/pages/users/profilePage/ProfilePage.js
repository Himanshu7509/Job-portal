import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [seeker, setSeeker] = useState(null);
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
        setSeeker(data);
        console.log(data);
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">

      <div className="flex-1 p-4 lg:p-6">
        <main className="w-full max-w-6xl p-4 sm:p-6 mx-auto">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-6 md:p-10 transition-all duration-300">
            <div className="flex flex-col items-center md:flex-row md:items-center text-center md:text-left">
              <img
                src={seeker.profileImg}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-200 shadow-lg"
              />
              <div className="md:ml-6 mt-4 md:mt-0">
                <h1 className="text-3xl md:text-4xl font-bold text-pink-500">{seeker.fullName}</h1>
                <h3 className="text-xl md:text-2xl text-gray-600">{seeker.email}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {[
                { label: "Gender", value: seeker.gender },
                { label: "DOB", value: seeker.dateOfBirth },
                { label: "Phone No.", value: seeker.phoneNumber },
                { label: "Address", value: seeker.address },
                { label: "City", value: seeker.city },
                { label: "State", value: seeker.state },
                { label: "Country", value: seeker.country },
                { label: "Pincode", value: seeker.pincode },
                { label: "Degree", value: seeker.education.degree },
                { label: "University", value: seeker.education.institution },
                { label: "Specialisation", value: seeker.education.specialisation },
                { label: "Start Year", value: seeker.education.startYear },
                { label: "End Year", value: seeker.education.endYear },
                { label: "Company Name", value: seeker.workExperience.company },
                { label: "Position", value: seeker.workExperience.position },
                { label: "Start Date", value: seeker.workExperience.startDate },
                { label: "End Date", value: seeker.workExperience.endDate },
              ].map((item, index) => (
                <div key={index}>
                  <p className="text-lg font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                    {item.label}
                  </p>
                  <p className="text-xl font-medium text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-500 mt-6">Skills</h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {seeker.skills.map((skill, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md text-lg hover:bg-blue-600 transition-all"
                >
                  {skill}
                </button>
              ))}
            </div>

            <div className="mt-8 flex">
              <Link to="/user-detail">
                <button className="bg-gradient-to-r from-pink-700 to-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all hover:opacity-80">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
