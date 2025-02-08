import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { LuLayoutDashboard  } from "react-icons/lu";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiBriefcase2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";

const HostSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoster, setHoster] = useState("");
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
    <div className="relative h-screen flex w-full">
      <button
        className="lg:hidden text-blue-800 p-3 rounded-md fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-full md:w-80 bg-white shadow-lg p-6 transform transition-transform duration-300 z-40 flex flex-col justify-between 
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
            src="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
            className="w-28 rounded-full border-blackorange-500 border-2 shadow-md"
            alt="Profile"
          />
          <div className="text-center">
            <div className="text-lg font-bold text-transparent bg-gradient-to-r from-zinc-500 to-zinc-800 bg-clip-text">
              {hoster.fullName}
            </div>
          </div>
        </div>

        <nav className="w-full p-2 flex-1 space-y-2">
          <Link to="/host-dashboard">
            <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <LuLayoutDashboard className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Dashboard</span>
            </div>
          </Link>
          {[
            {
              icon: <FaRegUser className="w-5 h-5 text-green-600" />,
              label: "My Profile",
              path: "/host-profile",
            },
            {
              icon: <RiBriefcase2Line className="w-5 h-5 text-purple-600" />,
              label: "My Jobs",
              path: "/host-jobs",
            },
            {
              icon: <MdOutlinePostAdd  className="w-5 h-5 text-red-600" />,
              label: "Post Job",
              path: "/jobpost",
            },
          ].map((item, index) => (
            <Link to={item.path} key={index}>
              <div className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-4">
          <div
            className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-red-600"
            onClick={handleLogout}
          >
            <IoLogOutOutline className="w-5 h-5 text-red-600" />
            <span className="text-lg font-semibold text-red-500">Logout</span>
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
  );
};

export default HostSidebar;
