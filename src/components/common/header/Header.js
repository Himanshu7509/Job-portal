import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa6";
import Cookies from "js-cookie";

const Header = () => {
  const [showAI, setShowAI] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hostLoggedIn, sethostLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check login status on mount
    const token = Cookies.get("Token"); // Assuming login stores a token
    const userId = Cookies.get("Id");
    const hostId = Cookies.get("userId");
    const hostToken = Cookies.get("jwtToken");
    if (token && userId) {
      setIsLoggedIn(true);
    }
    if (hostToken && hostId) {
      sethostLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".dropdown")) {
        setShowAI(false);
        setUserDropdown(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    Cookies.remove("Token");
    Cookies.remove("Id");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <header className="shadow-md bg-transparent backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Job Quick
              </span>
            </Link>
          </div>

          <nav
            className={`hidden lg:flex items-center space-x-6 transition-all duration-300`}
          >
            <Link to="/">
              <button className="flex items-center space-x-2 font-semibold text-gray-600 hover:text-pink-500 cursor-pointer">
                Home
              </button>
            </Link>
            <Link to="/alljobs">
              <button className="flex items-center space-x-2 font-semibold text-gray-600 hover:text-pink-500 cursor-pointer">
                Jobs
              </button>
            </Link>

            <div className="relative dropdown">
              <button
                className="flex items-center space-x-2 font-semibold text-gray-600 hover:text-pink-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAI(!showAI);
                }}
              >
                <span>AI Tools</span>
              </button>
              {showAI && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md w-48">
                  <ul className="py-2 px-4">
                    <Link to="/resbuild">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Resume Builder
                      </li>
                    </Link>
                    <Link to="/atschk">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Resume Checker
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
            <Link to="/salary">
              <button className="flex items-center space-x-2 font-semibold text-gray-600 hover:text-pink-500 cursor-pointer">
                Salaries
              </button>
            </Link>
            <Link to="/blog">
              <button className="font-semibold text-gray-600 hover:text-pink-500 cursor-pointer">
                Blog
              </button>
            </Link>
            <Link to="/contact">
              <button className="font-semibold text-gray-600 hover:text-pink-500 cursor-pointer">
                Contact
              </button>
            </Link>
          </nav>

          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-black cursor-pointer"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {hostLoggedIn ? (
                  <Link to="/host-dashboard">
                    <button className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-blue-500 hover:font-semibold px-4 py-2 rounded cursor-pointer">
                      Dashboard
                    </button>
                  </Link>
                ) : (
                  <Link to="/host-login">
                    <button className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-blue-500 hover:font-semibold px-4 py-2 rounded cursor-pointer">
                      Job Hoster
                    </button>
                  </Link>
                )}

                <div className="relative dropdown">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserDropdown(!userDropdown);
                    }}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-pink-500 hover:font-semibold px-4 py-2 rounded cursor-pointer flex items-center"
                  >
                    <FaUserTie className="text-lg text-pink-500 mr-2" />
                    <span className="font-semibold">User</span>
                  </button>
                  {userDropdown && (
                    <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md w-40 text-center">
                      <ul className="py-2 px-4">
                        <Link to="/user-profile">
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-purple-500 font-semibold">
                            User Profile
                          </li>
                        </Link>

                        <li
                          onClick={handleLogout}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <button className="font-semibold text-red-700">
                            LogOut{" "}
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {hostLoggedIn ? (
                  <Link to="/host-dashboard">
                    <button className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-blue-500 hover:font-semibold px-4 py-2 rounded cursor-pointer">
                      Dashboard
                    </button>
                  </Link>
                ) : (
                  <Link to="/host-login">
                    <button className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-blue-500 hover:font-semibold px-4 py-2 rounded cursor-pointer">
                      Job Hoster
                    </button>
                  </Link>
                )}
                <Link to="/login">
                  <button className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-pink-500 hover:font-semibold px-4 py-2 rounded cursor-pointer">
                    Job Seeker
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white shadow-md">
            <ul className="flex flex-col space-y-4 py-4 px-6">
              <li>
                <Link to="/">
                  <button className="flex items-center space-x-2 font-semibold text-gray-600 hover:text-pink-500 cursor-pointer">
                    Home
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/alljobs">
                  <button className="flex items-center space-x-2 font-semibold text-gray-600 hover:text-pink-500 cursor-pointer">
                    Jobs
                  </button>
                </Link>
              </li>

              <li className="relative dropdown">
                <button
                  className="font-semibold text-gray-600 hover:text-pink-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAI(!showAI);
                  }}
                >
                  AI Tools
                </button>
                {showAI && (
                  <ul className="mt-2 bg-gray-100 rounded-md">
                    <Link to="/resbuild">
                      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                        Resume Builder
                      </li>
                    </Link>
                    <Link to="/atschk">
                      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                        Resume Checker
                      </li>
                    </Link>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/salary">
                  <button className="flex items-center space-x-2 font-semibold text-gray-600 hover:text-pink-500 cursor-pointer">
                    Salaries
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/blog">
                  <button className="font-semibold text-gray-600 hover:text-pink-500 cursor-pointer">
                    Blog
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/contact">
                  <button className="font-semibold text-gray-600 hover:text-pink-500 cursor-pointer">
                    Contact
                  </button>
                </Link>
              </li>
              {isLoggedIn ? (
                <div className="flex">
                  {hostLoggedIn ? (
                    <li>
                      <Link to="/host-dashboard">
                        <button className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-blue-500 hover:font-semibold px-4 py-2 rounded cursor-pointer mr-3">
                          Dashboard
                        </button>
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/host-login">
                        <button className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-blue-500 hover:font-semibold px-4 py-2 rounded cursor-pointer mr-3">
                          Job Hoster
                        </button>
                      </Link>
                    </li>
                  )}

                  <li className="relative dropdown">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserDropdown(!userDropdown);
                      }}
                      className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-pink-500 hover:font-semibold px-4 py-2 rounded cursor-pointer flex items-center"
                    >
                      <FaUserTie className="text-lg text-pink-500 mr-2" />
                      <span className="font-semibold">User</span>
                    </button>
                    {userDropdown && (
                      <div className="mt-2 bg-white shadow-md rounded-md">
                        <ul className="py-2 px-4">
                          <Link to="/user-profile">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold text-purple-500">
                              User Profile
                            </li>
                          </Link>

                          <li
                            onClick={handleLogout}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <button className="font-semibold text-red-700">
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                </div>
              ) : (
                <div className="flex">
                  {hostLoggedIn ? (
                    <Link to="/host-dashboard">
                      <button className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-blue-500 hover:font-semibold px-4 py-2 rounded cursor-pointer mr-3">
                        Dashboard
                      </button>
                    </Link>
                  ) : (
                    <Link to="/host-login">
                      <button className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-blue-500 hover:font-semibold px-4 py-2 rounded cursor-pointer mr-3">
                        Job Hoster
                      </button>
                    </Link>
                  )}
                  <Link to="/login">
                    <button className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent border border-pink-500 hover:font-semibold px-4 py-2 rounded cursor-pointer">
                      Job Seeker
                    </button>
                  </Link>
                </div>
              )}
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
