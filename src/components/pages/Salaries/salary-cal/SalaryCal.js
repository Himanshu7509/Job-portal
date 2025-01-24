import React, { useState } from "react";

const SalaryCal = () => {
    const [company, setCompany] = useState("");
    const [designation, setDesignation] = useState("");
    const [previousCTC, setPreviousCTC] = useState("");
    const [experience, setExperience] = useState("");
    const [expectedSalary, setExpectedSalary] = useState(null);
  
    const calculateSalary = () => {
      // Mock calculation logic
      if (company && designation && previousCTC && experience) {
        const ctc = parseFloat(previousCTC);
        const exp = parseInt(experience);
        const multiplier = exp > 5 ? 1.3 : exp > 2 ? 1.2 : 1.1; // Mock multiplier logic
        const calculatedSalary = (ctc * multiplier).toFixed(2);
        setExpectedSalary(`₹${calculatedSalary}`);
      } else {
        alert("Please fill out all fields to calculate salary.");
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="">
        <div className="max-w-lg w-full bg-white rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-6">
            Salary Calculator
          </h1>
          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Company Name</label>
              <input
                type="text"
                placeholder="Enter company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
  
            {/* Designation */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Designation</label>
              <input
                type="text"
                placeholder="Enter designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
  
            {/* Previous CTC */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Previous CTC (₹)</label>
              <input
                type="number"
                placeholder="Enter previous annual CTC"
                value={previousCTC}
                onChange={(e) => setPreviousCTC(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
  
            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Experience (in years)</label>
              <input
                type="number"
                placeholder="Enter years of experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
  
            {/* Calculate Button */}
            <button
              onClick={calculateSalary}
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Calculate Expected Salary
            </button>
  
            {/* Result Section */}
            {expectedSalary && (
              <div className="mt-6 p-6 rounded-lg text-center">
                <h3 className="text-2xl font-semibold text-blue-700">Your Expected Salary</h3>
                <div className="mt-3 flex justify-center items-center space-x-3 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                  {/* <FaRegMoneyBillAlt className="text-4xl" /> */}
                  <p className="text-3xl font-bold">{expectedSalary}</p>
                </div>
              </div>
            )}
  
            {/* Motivational Quote */}
            <p className="text-center text-gray-600 mt-6 text-sm italic">
              "Success comes to those who are too busy to be looking for it." –
            </p>
          </div>
        </div>
        
        </div>
      </div>
    );
  };

export default SalaryCal