import React from "react";
import NotImg from "../../../assets/pg.jpg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <img
        src={NotImg}
        alt="Not Found"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto mb-8 rounded-lg"
      />
      <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-6">
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link to='/'>
      <button
        className="px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
      >
        Back to Home
      </button>
      </Link>
    </div>
  );
};

export default NotFound;