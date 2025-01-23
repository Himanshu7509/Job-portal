import React, { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <span className="text-black text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Job Quick
            </span>
          </Link>
        </div>

        <nav
          className={`hidden lg:flex items-center space-x-6 transition-all duration-300`}
        >
          <div className="relative">
            <Link to="/alljobs">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-black">
                Jobs
              </button>
            </Link>
          </div>

          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-black"
              onClick={() => setShowAI(!showAI)}
            >
              <span>AI Tools</span>
            </button>
            {showAI && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md w-48">
                <ul className="py-2 px-4">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Resume Builder
                  </li>
                  <Link to="/atschk">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Resume Checker
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
          <Link to="/blog">
            <button className="text-gray-700 hover:text-black">Blog</button>
          </Link>
          <Link to="/contact">
            <button className="text-gray-700 hover:text-black">Contact</button>
          </Link>
        </nav>

        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-black"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <button className="border border-black text-black bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text px-4 py-2 rounded hover:bg-green-800">
            Log In
          </button>
          <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded hover:bg-green-800">
            Sign Up
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-4 py-4 px-6">
            <li>
              <Link to="/alljobs">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-black">
                  Jobs
                </button>
              </Link>
            </li>

            <li>
              <button
                className="text-gray-700 hover:text-black"
                onClick={() => setShowAI(!showAI)}
              >
                AI Tools
              </button>
              {showAI && (
                <ul className="mt-2 bg-gray-100 rounded-md">
                  <li className="px-4 py-2 hover:bg-gray-200">
                    Resume Builder
                  </li>
                  <Link to="/atschk">
                    <li className="px-4 py-2 hover:bg-gray-200">
                      Resume Checker
                    </li>
                  </Link>
                </ul>
              )}
            </li>
            <li>
              <Link to="/blog">
                <button className="text-gray-700 hover:text-black">Blog</button>
              </Link>
            </li>

            <li>
              <Link to="/contact">
                <button className="text-gray-700 hover:text-black">
                  Contact
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
