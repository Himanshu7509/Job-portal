import React, { useState } from "react";



const UserDetails = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const userDetailApi = 'https://jobquick.onrender.com/user/update'

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl p-6 sm:p-10">
            <h2 className="text-4xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-8">
              User Details
            </h2>
    
            <form className="space-y-6" encType="multipart/form-data" >

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Profile Image  
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
    

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              
              <div className="flex gap-4">
                <div className="flex-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                />

                </div>
                <div className="flex-1">
                   <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  required
                  placeholder="Enter your phone number"
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                </div>
              </div>
    
    
              <div className="flex gap-4">
                <div className="flex-1">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                </div>
                <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  required
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled selected>
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your Address"
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
    
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your city"
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your state"
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
    
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your country"
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">PinCode</label>
                  <input
                    type="number"
                    required
                    placeholder="Enter your pincode"
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your education"
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  required
                  placeholder="Enter your skills"
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your role"
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  required
                  placeholder="Enter your work experience"
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
    
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-xl text-white py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        
      );
    };

export default UserDetails;