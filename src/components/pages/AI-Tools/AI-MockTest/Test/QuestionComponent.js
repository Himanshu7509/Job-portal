import { useState } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import {
  RefreshCcw,
  Clock,
  ArrowLeft,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Header from "../../../../common/header/Header";
import Footer from "../../../../common/footer/Footer";
import { useEffect } from "react";

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
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

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
    navigate("/mocktest");
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
        setStartTime(Date.now()); // Store the start time
        startTimer();
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
        if (item.startsWith("**")) return;

        if (item.startsWith("Q:")) {
          if (currentQuestion && options.length > 0) {
            processed.push(currentQuestion);
          }

          currentQuestion = {
            question: item.substring(2).trim(),
            options: [],
            correctAnswer: "",
          };
          options = [];
        } else if (item.match(/^[A-D]\)/)) {
          const letter = item[0].toLowerCase();
          const text = item.substring(2).trim();
          options.push({ letter, text });

          if (currentQuestion) {
            currentQuestion.options = options;
          }
        } else if (item.startsWith("Correct:")) {
          const correctAnswer = item.split(":")[1].trim().toLowerCase();
          if (currentQuestion) {
            currentQuestion.correctAnswer = correctAnswer;
          }
        }
      });

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

    // Calculate total time taken
    if (startTime) {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000); // in seconds
      setTotalTimeTaken(timeTaken);
    }

    setShowResults(true);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-2xl">
          <div className="text-red-500 text-center space-y-4">
            <XCircle className="w-16 h-16 mx-auto" />
            <p className="text-lg font-medium">{error}</p>
            <button
              onClick={handleGoBack}
              className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
            >
              Return to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-8 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white shadow-xl rounded-lg p-6">
              <h2 className="text-4xl font-bold text-center sm:flex-1 mb-4">
                Test Results
              </h2>

              <div className="flex flex-row sm:flex-row justify-between items-center gap-4 mb-6 mt-2">
                <button
                  onClick={handleGoBack}
                  className=" sm:w-auto  flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span className="hidden sm:block"> Go Back </span>
                </button>
                <button
                  onClick={resetQuiz}
                  className=" sm:w-auto  flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  <RefreshCcw size={16} />
                  <span className="hidden sm:block"> Reset Quiz </span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 text-center">
                  <p className="text-lg">Your Score</p>
                  <p className="text-4xl font-bold">{score}%</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 text-center">
                  <p className="text-lg">Time Taken</p>
                  <p className="text-4xl font-bold">
                    {formatTime(totalTimeTaken)}
                  </p>
                </div>
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
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {currentQuestion ? (
            <div className="bg-white shadow-xl rounded-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
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
                  <div className="text-gray-600">
                    {userAnswers[currentQuestionIndex]
                      ? "Answered"
                      : "Not answered"}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) / questions.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg font-medium">
                  {currentQuestion.question}
                </p>
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <label
                      key={option.letter}
                      className={`block rounded-lg transition-all cursor-pointer ${
                        userAnswers[currentQuestionIndex] === option.letter
                          ? "bg-blue-50 border-2 border-blue-500"
                          : "bg-white border-2 border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="p-4 flex items-center gap-3">
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={option.letter}
                          checked={
                            userAnswers[currentQuestionIndex] === option.letter
                          }
                          onChange={() => handleAnswerSelection(option.letter)}
                          className="w-4 h-4 text-blue-500"
                        />
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium">
                          {option.letter.toUpperCase()}
                        </span>
                        <span className="flex-1">{option.text}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`px-6 py-3 rounded-lg transition-colors w-full sm:w-auto ${
                    currentQuestionIndex === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-500 text-white hover:bg-gray-600"
                  }`}
                >
                  Previous
                </button>
                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={calculateScore}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto"
                  >
                    Submit Test
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-xl rounded-lg p-6">
              <div className="text-center space-y-4">
                <p className="text-2xl text-zinc-500">
                  Test will be starting soon...
                </p>
                <div className="text-lg text-gray-600 text-left">
                  <p className="font-semibold text-2xl text-red-500">Instructions:</p>
                  <ul className="list-disc pl-4 text-lg mb-3 text-left font-semibold">
                    <li className="mb-2">This test consists of 15 questions.</li>
                    <li className="mb-2">The time limit for this test is 2 minutes.</li>
                    <li className="mb-2">Please select one answer for each question.</li>
                    <li className="mb-2">
                      Once you've answered all questions, click the "Submit
                      Test" button to see your results.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuestionComponent;
