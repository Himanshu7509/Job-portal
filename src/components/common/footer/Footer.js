import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-50 to-blue-50 text-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <Link to={"/"}>
            <span className="text-black text-4xl mb-2 font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Job Quick
            </span>
          </Link>

          <p className="text-sm/6 mt-6 font-semibold">
            {" "}
            The Job Quick is a powerful job search platform that helps job
            seekers find their dream job quickly and efficiently.{" "}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Helpful Links </h3>

          <div className="space-y-2">
          <Link
              to="/"
              className="block text-sm hover:text-blue-500 transition"
            >
              Home
            </Link>
            <Link
              to="/alljobs"
              className="block text-sm hover:text-blue-500 transition"
            >
              Jobs
            </Link>
            
            <Link
              to="/blog"
              className="block text-sm hover:text-blue-500 transition"
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              className="block text-sm hover:text-blue-500 transition"
            >
              Contact
            </Link>
            
           
          </div>
        </div>

        

        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li className="text-sm hover:text-blue-500 transition">
              Help & Support
            </li>
            <li className="text-sm hover:text-blue-500 transition">FAQs</li>
            <li className="text-sm hover:text-blue-500 transition">
              Contact Us
            </li>
            <li className="text-sm hover:text-blue-500 transition">Services</li>
            <li className="text-sm hover:text-blue-500 transition">
              Terms of Service
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Subscribe</h3>
          <form>
            <div className="flex items-center mb-4">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="w-full p-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="bg-blue-500 px-4 py-2 text-white rounded-r-md hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row justify-between items-center text-sm border-t border-gray-300 pt-4">
        <p className="mb-4 md:mb-0 text-center md:text-left">
          &copy; Job Quick 2025. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-500 transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-500 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-500 transition">
            Site Map
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
