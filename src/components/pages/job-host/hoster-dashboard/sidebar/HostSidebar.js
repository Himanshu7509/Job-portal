import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { HiBriefcase } from "react-icons/hi2";
import { FaRegMessage } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { useState } from "react";

import { Menu, X } from "lucide-react";

const HostSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
              <span className="ml-16 mr-4 text-2xl md:text-4xl lg:ml-2 mr-2 font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Job Quick
              </span>
            </Link>
          </div>

          <div className="flex items-center p-2 mb-6 mt-4">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="ml-3">
              <div className="font-medium">John William</div>
            </div>
          </div>

          <nav className="w-full p-2 flex-1">
            <Link to='/host-dashboard'>
            <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <LuUsers className="w-5 h-5 text-pink-600" />
              <span className="pointer">Dashboard</span>
            </div>
            </Link>
            {[
              {
                icon: <FaRegUser className="w-5 h-5 text-pink-500" />,
                label: <Link to='/host-profile'>My Profile</Link>,
              },
              {
                icon: <HiBriefcase className="w-5 h-5 text-pink-500" />,
                label: <Link to='/host-profile'>My Jobs</Link>,
              },
              {
                icon: <FaRegMessage className="w-5 h-5 text-pink-500" />,
                label: <Link to='/host-profile'>Candidates</Link>,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </nav>

          <div className="mt-auto p-4">
            <div className="flex items-center space-x-2 text-gray-600 cursor-pointer">
              <IoLogOutOutline className="w-5 h-5 text-pink-600" />
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
