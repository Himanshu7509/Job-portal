import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { RefreshCcw, Clock, ArrowLeft } from "lucide-react";
import Header from "../../../../common/header/Header";
import Footer from "../../../../common/footer/Footer";

const QuestionComponent = () => {
  const navigate = useNavigate();
  const { category, subcategory } = useParams();
  const QuestionApi = "https://jobquick.onrender.com/mocktest/generate";
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [category, subcategory]);

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsTimerRunning(false);
            calculateScore();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const handleGoBack = () => {
    navigate("/mocktest"); // Navigate back to mocktest page
  };

  const resetQuiz = async () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(null);
    setShowResults(false);
    setTimeLeft(60);
    setIsTimerRunning(false);
    await fetchQuestions();
  };

  const fetchQuestions = async () => {
    try {
      const token = Cookies.get("Token");
      const response = await fetch(QuestionApi, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, subcategory }),
      });
      const data = await response.json();

      if (data.success && Array.isArray(data.questions)) {
        processQuestionsData(data.questions);
        startTimer(); // Start timer when questions are loaded
      } else {
        setError("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to fetch questions");
    }
  };

  const processQuestionsData = (rawQuestions) => {
    try {
      const processed = [];
      let currentQuestion = null;
      let options = [];

      rawQuestions.forEach((item) => {
        // Skip level headers
        if (item.startsWith("**")) return;

        // If it's a question
        if (item.startsWith("Q:")) {
          // If we have a previous question complete, add it
          if (currentQuestion && options.length > 0) {
            processed.push(currentQuestion);
          }

          // Start new question
          currentQuestion = {
            question: item.substring(2).trim(),
            options: [],
            correctAnswer: "",
          };
          options = [];
        }
        // If it's an option
        else if (item.match(/^[A-D]\)/)) {
          const letter = item[0].toLowerCase();
          const text = item.substring(2).trim();
          options.push({ letter, text });

          if (currentQuestion) {
            currentQuestion.options = options;
          }
        }
        // If it's the correct answer
        else if (item.startsWith("Correct:")) {
          const correctAnswer = item.split(":")[1].trim().toLowerCase();
          if (currentQuestion) {
            currentQuestion.correctAnswer = correctAnswer;
          }
        }
      });

      // Add the last question if exists
      if (currentQuestion && options.length > 0) {
        processed.push(currentQuestion);
      }

      console.log("Processed questions:", processed);
      setQuestions(processed);
    } catch (error) {
      console.error("Error processing questions:", error);
      setError("Error processing questions data");
    }
  };

  const handleAnswerSelection = (answer) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const percentage = (correctAnswers / questions.length) * 100;
    setScore(percentage.toFixed(2));
    setShowResults(true);
  };

  if (error) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-6">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <>
        <Header />
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
            <h2 className="text-xl font-bold text-center">Test Results</h2>
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <RefreshCcw size={16} />
              Reset Quiz
            </button>
          </div>
          <div className="text-center text-2xl font-bold mb-6">
            Your Score: {score}%
          </div>
          <div className="text-center text-lg mb-6">
            Time Taken: {formatTime(1800 - timeLeft)}
          </div>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="border p-4 rounded">
                <p className="font-semibold">
                  {index + 1}. {question.question}
                </p>
                <div className="mt-2 space-y-1">
                  {question.options.map((option) => (
                    <div
                      key={option.letter}
                      className={`p-2 rounded ${
                        option.letter === question.correctAnswer
                          ? "bg-green-100 border-green-500"
                          : option.letter === userAnswers[index]
                          ? "bg-red-100 border-red-500"
                          : "bg-gray-50"
                      }`}
                    >
                      {option.letter.toUpperCase()}) {option.text}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-sm">
                  {userAnswers[index] !== question.correctAnswer && (
                    <p className="text-red-500">
                      Your answer: {userAnswers[index]?.toUpperCase()}){" "}
                      {
                        question.options.find(
                          (opt) => opt.letter === userAnswers[index]
                        )?.text
                      }
                    </p>
                  )}
                  <p className="text-green-500">
                    Correct answer: {question.correctAnswer.toUpperCase()}){" "}
                    {
                      question.options.find(
                        (opt) => opt.letter === question.correctAnswer
                      )?.text
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <Header />
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-6">
        
        {currentQuestion ? (
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 font-medium ${
                    timeLeft < 10 ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  <Clock size={20} />
                  {formatTime(timeLeft)}
                </div>
              </div>
              <div className="text-gray-600">
                {userAnswers[currentQuestionIndex]
                  ? "Answered"
                  : "Not answered"}
              </div>
            </div>
            <p className="font-semibold mb-4">{currentQuestion.question}</p>
            <div className="space-y-2">
              {currentQuestion.options.map((option) => (
                <label
                  key={option.letter}
                  className={`block p-3 rounded-md cursor-pointer ${
                    userAnswers[currentQuestionIndex] === option.letter
                      ? "bg-blue-100 border-blue-500"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option.letter}
                    checked={
                      userAnswers[currentQuestionIndex] === option.letter
                    }
                    onChange={() => handleAnswerSelection(option.letter)}
                    className="mr-2"
                  />
                  {option.letter.toUpperCase()}) {option.text}
                </label>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`px-4 py-2 rounded ${
                  currentQuestionIndex === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Previous
              </button>
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={calculateScore}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center">Loading questions...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default QuestionComponent;
