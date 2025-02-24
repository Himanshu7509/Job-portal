import React from "react";
import Slh from "../../../../assets/slider71.png";
import { Link } from "react-router-dom";

const JobExploreSec = () => {
  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section: Image */}
        <div className="flex justify-center">
          <img
            src={Slh}
            alt="Explore Jobs"
            className="w-full h-auto object-cover rounded-md shadow-lg"
          />
        </div>

        {/* Right Section: Text Content */}
        <div>
          <p className="text-sm text-gray-500 uppercase mb-2">Discover</p>
          <h1 className="lg:text-3xl text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
            Find Your Dream Job Effortlessly Today
          </h1>
          <p className="text-gray-600 mb-6">
            Our powerful job search engine allows you to filter opportunities by
            location, industry, and job type. Experience a seamless way to
            connect with your ideal job.
          </p>
          <div className="flex space-x-8 mb-6">
            <div>
              <h2 className="md:text-2xl text-1xl font-bold mb-1">50%</h2>
              <p className="text-gray-500">
                Tailored searches for your unique career path.
              </p>
            </div>
            <div>
              <h2 className="md:text-2xl text-1xl font-bold mb-1">50%</h2>
              <p className="text-gray-500">
                Explore jobs that match your skills and interests.
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            
            <Link to='/alljobs'>
            <button className="px-6 py-2 border border-gray-500 rounded-md bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
              Learn More →
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobExploreSec;
