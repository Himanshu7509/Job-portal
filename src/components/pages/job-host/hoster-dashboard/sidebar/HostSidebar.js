import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { HiBriefcase } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { useState, useEffect } from "react";
import ProfileImg from "../../../../../assets/profile.png";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";


const HostSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoster, setHoster] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    Cookies.remove("userId");
    Cookies.remove("jwtToken");
    navigate("/");
  };

  return (
    <>
      <div className="relative h-screen flex">
        <button
          className="lg:hidden bg-gradient-to-r from-pink-500 to-blue-500 text-white p-2 rounded-md fixed top-4 left-4 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div
          className={`sticky top-0 left-0 h-full overflow-y-auto bg-gray-50 shadow-lg p-4 transform transition-transform duration-300 z-40 flex flex-col justify-between 
              ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } lg:relative lg:translate-x-0 lg:w-64 flex-shrink-0`}
        >
          <div className="flex justify-center mb-6">
            <Link to="/">
              <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Job Quick
              </span>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center p-4 mb-6 mt-4 space-y-3">
            <img
              src={"https://cdn-icons-png.freepik.com/512/3397/3397425.png"}
              className="w-28 rounded-full border-orange-500 border-[2px]"
              alt="Profile"
            />
            <div className="text-center">
              <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text">
              {"Admin"}
              </div>
            </div>
          </div>

          <nav className="w-full p-2 flex-1">
            <Link to="/host-dashboard">
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <LuUsers className="w-5 h-5 text-purple-700" />
                <span className="pointer">Dashboard</span>
              </div>
            </Link>
            {[
              {
                icon: <FaRegUser className="w-5 h-5 text-purple-700" />,
                label: "My Profile",
                path: "/host-profile",
              },
              {
                icon: <HiBriefcase className="w-5 h-5 text-purple-700" />,
                label: "My Jobs",
                path: "/host-jobs",
              },
              
            ].map((item, index) => (
              <Link to={item.path} key={index}>
                <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="mt-auto p-4">
            <div
              className="flex items-center space-x-2 text-gray-600 cursor-pointer"
              onClick={handleLogout}
            >
              <IoLogOutOutline className="w-5 h-5 text-purple-700" />
              <span className="text-pink-600 hover:text-pink-700 text-lg font-semibold">
                Logout
              </span>
            </div>
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
};

export default HostSidebar;
