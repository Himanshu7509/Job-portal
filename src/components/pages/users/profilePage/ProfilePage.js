import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Header from "../../../common/header/Header";
import Footer from "../../../common/footer/Footer";
import ProfileImg from '../../../../assets/profile.png'

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
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        <div className="flex-1 p-4 lg:p-6">
          <main className="w-full max-w-6xl p-2 sm:p-6 mx-auto">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-4 md:p-10 transition-all duration-300">
              <h1 className="text-4xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
                User Profile
              </h1>
              <div className="flex flex-col items-center md:flex-row md:items-center text-center md:text-left">
                <img
                  src={seeker.profileImg || ProfileImg}
                  alt="Profile"
                  className="w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 border-4 rounded-2xl border-pink-300 shadow-lg"
                />
                <div className="md:ml-6 mt-4 md:mt-0">
                  <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                    {seeker.fullName || "Admin"}
                  </h1>
                  <h4 className="text-xl md:text-1xl text-gray-400 font-semibold">
                    {seeker.email}
                  </h4>
                  <Link to="/user-detail">
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
                      {seeker.gender}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">DOB:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.dateOfBirth}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Phone No.:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.phoneNumber}
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
                      {seeker.address}{" "}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">City:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.city}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">State:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.state}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Country:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.country}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Pincode:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.pincode}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                  Education
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <div>
                    <p className="font-semibold text-gray-500">Degree:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.education.degree}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">University:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.education.institution}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">
                      Specialisation:
                    </p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.education.specialisation}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Start Year:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.education.startYear}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">End Year:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.education.endYear}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                  Work Experience
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <div>
                    <p className="font-semibold text-gray-500">Company Name:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.workExperience.company}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Position:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.workExperience.position}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Start Date:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.workExperience.startDate}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">End Date:</p>
                    <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
                      {" "}
                      {seeker.workExperience.endDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2 mt-4">
                  {seeker.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold rounded-lg shadow-md text-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
