import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpImg from "../../assets/signup.png"


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const signupApi = "https://jobquick.onrender.com/seekuser/signup";

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess(null);
      return;
    }
  
    if (password.length < 5) {
      setError("Password must be at least 6 characters.");
      setSuccess(null);
      return;
    }

    const person = {
      email: email,
      password:password
    }

    fetch(signupApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Signup Response:", data);
        setSuccess("Signup successful!");
        setError(null);
        navigate('/login')
      })
      .catch((error) => {
        console.error("Signup Error:", error);
        setError("Signup failed. Please try again.");
        setSuccess(null);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50 sm:px-6 lg:px-8">
      <div className="flex flex-col w-full max-w-6xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">

        <div className="hidden w-full md:block md:w-1/2">
          <img
            src={SignUpImg}
            alt="Signup"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full p-6 space-y-6 md:w-1/2 sm:p-8">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent sm:text-3xl lg:mt-5">
            Create an Account
          </h2>
          <p className="text-sm text-center text-gray-600 sm:text-base">
            Join us to unlock exciting features!
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 font-medium text-white bg-purple-600 rounded-md shadow hover:bg-purple-700 focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50"
            >
              Sign Up
            </button>

            {error && (
              <div className="p-3 text-sm text-center text-red-600 bg-red-100 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 text-sm text-center text-green-600 bg-green-100 rounded">
                {success}
              </div>
            )}
          </form>

          <p className="text-sm text-center text-gray-600 sm:text-base">
            Already have an account?{" "}
            <Link to={"/login"} className="text-indigo-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Signup;