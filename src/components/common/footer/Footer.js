import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">About</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Become Seller</li>
            <li>Jobs on Freeio</li>
            <li>Pricing</li>
            <li>Services Freeio</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>Design & Creative</li>
            <li>Development & IT</li>
            <li>Music & Audio</li>
            <li>Programming & Tech</li>
            <li>Digital Marketing</li>
            <li>Finance & Accounting</li>
            <li>Writing & Translation</li>
            <li>Trending</li>
            <li>Lifestyle</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>Help & Support</li>
            <li>FAQs </li>
            <li>Contact Us</li>
            <li>Services</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Subscribe</h3>
          <form>
            <div className="flex items-center mb-4">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="w-full p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <button
                type="submit"
                className="bg-gray-700 px-4 py-2 text-white rounded-r-md hover:bg-gray-900 hover:text-white transition"
              >
                Send
              </button>
            </div>
          </form>
         
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row justify-between items-center text-sm border-t border-gray-300 pt-4">
        <p className="mb-4 md:mb-0 text-center md:text-left">
          &copy; Freeio. 2022 CreativeLayers. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Site Map
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
