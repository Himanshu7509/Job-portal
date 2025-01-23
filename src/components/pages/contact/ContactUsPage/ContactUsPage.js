import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaPhoneFlip } from "react-icons/fa6";
import { IoIosMailUnread } from "react-icons/io";

const ContactUsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text mb-6">Contact us</h1>
        <p className="text-gray-600 text-lg mb-10">
          We'd love to talk about how we can help you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text mb-4">
              Keep In Touch With Us.
            </h2>
            <p className="text-gray-600 mb-6">
              Neque convallis a cras semper auctor. Libero id faucibus nisl
              tincidunt egetnulla.
            </p>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-md text-4xl">
                  <FaMapLocationDot/>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800 text-2xl">Address</h3>
                  <p className="text-gray-600">
                    328 Queensberry Street, North Melbourne VIC 3051, Australia.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-md text-4xl">
                  <FaPhoneFlip/>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800 text-2xl">Phone</h3>
                  <p className="text-gray-600">+(088) 123 456 789</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-md text-4xl">
                  <IoIosMailUnread/>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800 text-2xl">Email</h3>
                  <p className="text-gray-600">hello@freeio.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text mb-4">
              Tell us about yourself
            </h2>
            <p className="text-gray-600 mb-6">
              Whether you have questions or you would just like to say hello,
              contact us.
            </p>
            <form>
              {/* Name */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border-gray-300 rounded-md shadow-sm outline-none"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border-gray-300 rounded-md shadow-sm outline-none"
                  placeholder="example@gmail.com"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-600 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full border-gray-300 rounded-md shadow-sm outline-none"
                  placeholder="Your message"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Send Message &rarr;
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
