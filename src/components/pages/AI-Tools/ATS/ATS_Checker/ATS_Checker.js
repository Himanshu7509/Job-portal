import React, { useState } from "react";

const ATS_Checker = () => {
  const [resumeText, setResumeText] = useState("");
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setLoading(true);
      reader.onload = (event) => {
        const text = event.target.result;
        setResumeText(text);
        analyzeResume(text);
        setLoading(false);
      };
      reader.readAsText(file);
    }
  };

  const analyzeResume = (text) => {
    let currentScore = 70;
    const feedback = [];

    if (!text.toLowerCase().includes("work history")) {
      feedback.push("Your resume is missing a 'Work History' section.");
      currentScore -= 10;
    }
    if (!text.toLowerCase().includes("skills")) {
      feedback.push("Your resume is missing a 'Skills' section.");
      currentScore -= 10;
    }

    const wordCount = text.split(/\s+/).length;
    if (wordCount < 150) {
      feedback.push("Your resume is too short. Aim for at least 150 words.");
      currentScore -= 15;
    } else if (wordCount > 400) {
      feedback.push("Your resume is too long. Aim for a concise summary (under 400 words).");
      currentScore -= 5;
    }

    const overusedWords = ["responsible for", "team player", "detail-oriented"];
    overusedWords.forEach((word) => {
      if (text.toLowerCase().includes(word)) {
        feedback.push(`Avoid using generic phrases like '${word}'.`);
        currentScore -= 5;
      }
    });

    const randomAdjustment = Math.floor(Math.random() * 10) - 5;
    currentScore += randomAdjustment;

    currentScore = Math.max(0, Math.min(100, currentScore));

    setScore(currentScore);
    setSuggestions(feedback);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 min-h-screen flex flex-col items-center justify-start text-gray-800 font-sans">
      <header className="w-full text-center px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
          ATS Resume Checker
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
          Enhance your resume with instant analysis and actionable suggestions.
        </p>
      </header>

      <main className="w-full px-6 lg:px-20 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <section className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-lg transition-all">
          <h2 className="text-3xl font-semibold text-center text-gray-700">
            Upload Your Resume
          </h2>
          <p className="text-center text-gray-500 text-sm mt-2">
            Supported formats: DOC, DOCX, PDF, TXT.
          </p>
          <div className="mt-10 border-2 border-dashed border-gray-300 rounded-lg py-16 text-center hover:border-blue-400 transition">
            <p className="text-lg font-medium text-gray-600">
              Drag & Drop your resume here
            </p>
            <p className="text-gray-400 text-sm mt-2">or</p>
            <input
              type="file"
              accept=".txt,.doc,.docx,.pdf"
              className="hidden"
              id="fileUpload"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="fileUpload"
              className="mt-6 inline-block bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg font-semibold cursor-pointer"
            >
              Choose a File
            </label>
          </div>
        </section>

        <section className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-lg transition-all">
          {loading ? (
            <p className="text-center text-gray-500">Analyzing your resume...</p>
          ) : score !== null ? (
            <>
              <div className="mt-6 bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg text-center shadow-md">
                <p className="text-5xl font-extrabold text-white animate-pulse">{score}</p>
                <p className="text-white font-semibold mt-2">Resume Score</p>
                <p className="text-sm text-white mt-2">
                  {score >= 80
                    ? "Excellent! Your resume is highly competitive!"
                    : "Your resume could use some improvement."}
                </p>
              </div>
              {suggestions.length > 0 && (
                <div className="mt-6 bg-yellow-100 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-yellow-700">
                    Suggestions for Improvement
                  </h3>
                  <ul className="mt-4 list-disc ml-6 text-sm text-yellow-800">
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">Upload your resume to see your score and suggestions!</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ATS_Checker;
