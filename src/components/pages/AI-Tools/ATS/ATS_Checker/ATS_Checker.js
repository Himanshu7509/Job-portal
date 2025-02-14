import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Cookies from "js-cookie";
import ReactMarkdown from 'react-markdown';

const ATS_Checker = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleUpload = async () => {
    if (!file) return alert("Please upload a resume!");
  
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
  
    const userToken = Cookies.get("Token");
    if (!userToken) {
      alert("Authentication token is missing. Please log in again.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(
        "https://jobquick.onrender.com/ats/check",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
  
      let feedbackText = response.data.feedback;
  
      if (typeof feedbackText === "string") {
        // Split by newlines and filter out empty strings
        feedbackText = feedbackText
          .split('\n')
          .map(item => item.trim())
          .filter(item => item.length > 0);
      } else if (!Array.isArray(feedbackText)) {
        feedbackText = [feedbackText];
      }
  
      setResult({ ...response.data, feedback: feedbackText });
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Error analyzing resume! Check authentication.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start text-gray-900 font-inter px-4 sm:px-8">
      <header className="w-full text-center py-8 bg-gradient-to-b from-blue-100 to-pink-100 text-zinc-700 shadow-lg rounded-b-3xl">
        <h1 className="text-2xl sm:text-4xl font-extrabold">
          ATS Resume Checker
        </h1>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 py-12">
        <section className="bg-white rounded-xl p-2 sm:p-8  shadow-lg border border-gray-200 hover:shadow-xl transition-all flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center text-blue-700">
            Upload Your Resume
          </h2>
          <p className="text-center text-gray-500 font-semibold text-sm mt-2">
            Supported formats: PDF. Max size: 5MB.
          </p>
          <div
            {...getRootProps()}
            className="mt-6 border-2 border-dashed border-gray-300 rounded-xl py-12 text-center hover:border-indigo-500 transition cursor-pointer w-full max-w-md"
          >
            <input {...getInputProps()} />
            {file ? (
              <p className="text-sm sm:text-lg font-medium text-gray-700">
                {file.name}
              </p>
            ) : (
              <p className="text-lg font-medium text-gray-700">
                Drag & Drop your resume here
              </p>
            )}
            <p className="text-gray-500 text-sm mt-2">or</p>
            <label className="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 cursor-pointer">
              Choose a File
            </label>
          </div>
          <button
            onClick={handleUpload}
            className="mt-6 w-full max-w-md px-6 py-3 border border-blue-500 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent font-semibold rounded-lg shadow-md"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </section>

        <section className="bg-white rounded-xl p-2 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          {result !== null ? (
            <>
              <div className="mt-4 bg-gradient-to-r from-pink-400 to-blue-500 p-6 rounded-xl text-center shadow-lg">
                <p className="text-6xl font-extrabold text-white">
                  {result.score}
                </p>
                <p className="text-white font-semibold mt-2 text-lg">
                  {result.score >= 80
                    ? "Fantastic! Your resume stands out!"
                    : "Good effort! A few tweaks can make it even better."}
                </p>
              </div>

              {result.feedback.length > 0 && (
                <div
                  className="mt-8 bg-sky-50 p-6 rounded-xl shadow-md max-h-64 overflow-y-scroll -ms-overflow-style-none"
                  style={{ scrollbarWidth: "none" }}
                >
                  <h3 className="text-lg font-bold text-blue-700">
                    Suggestions for Improvement
                  </h3>
                  <div className="mt-4 border-l-4 border-blue-500 pl-4">
                    <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-800">
                      {result.feedback.map((suggestion, index) => (
                        <li key={index}>
                          <ReactMarkdown className="inline">{suggestion}</ReactMarkdown>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-600 text-md">
              Upload your resume to see its score and improvement suggestions.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ATS_Checker;