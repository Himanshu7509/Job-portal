import React, { useState } from "react";

const ATS_Checker = () => {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setScore(null); // Reset score on new file upload
    setFeedback(""); // Reset feedback
  };

  const calculateATSScore = (file) => {
    // Mock function to simulate ATS scoring
    if (!file) return;
    const score = Math.floor(Math.random() * 101); // Random score between 0-100
    const feedback = score > 75 
      ? "Your resume is highly ATS-friendly!" 
      : "Consider improving keywords and formatting.";
    setScore(score);
    setFeedback(feedback);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      calculateATSScore(file);
    } else {
      alert("Please upload a resume file.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">ATS Score Checker</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Your Resume
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="block w-full text-gray-700 border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Check ATS Score
        </button>
      </form>
      {score !== null && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">ATS Score: {score}/100</h2>
          <p className="text-gray-600 mt-2">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default ATS_Checker;
