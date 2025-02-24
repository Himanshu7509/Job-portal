import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SignUpImg from "../../../assets/signup.png";

const HosterSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const signupApi = "https://jobquick.onrender.com/hostuser/signup";

  const validateForm = () => {
    const errors = [];
    
    // Password validation
    if (password.length < 5) {
      errors.push("Password must be at least 5 characters long");
    }
    
    // Email validation
    if (!email.toLowerCase().endsWith('.com') && !email.toLowerCase().endsWith('.in')) {
      errors.push("Email must end with .com or .in");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const person = {
      email: email,
      password: password,
    };

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
        setValidationErrors([]);
        navigate("/host-login");
      })
      .catch((error) => {
        console.error("Signup Error:", error);
        setError("Signup failed. Please try again.");
        setSuccess(null);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center w-full max-w-6xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
        <div className="w-full p-6 space-y-6 md:w-10/12 lg:w-1/2 sm:p-8">
          <h2 className="text-2xl md:text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent lg:mt-6">
            Create an Account
          </h2>
          <p className="text-center text-gray-700 text-lg font-semibold mt-4">
            Signup to your account
          </p>
          <form onSubmit={handleSignup} className="mt-8 space-y-6">
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

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white bg-gradient-to-r from-pink-500 to-indigo-500 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 shadow-xl transition duration-300"
            >
              Sign Up
            </button>
            
            {validationErrors.length > 0 && (
              <div className="space-y-2">
                {validationErrors.map((error, index) => (
                  <div key={index} className="p-3 text-sm text-center text-red-600 bg-red-100 rounded">
                    {error}
                  </div>
                ))}
              </div>
            )}
            
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
          <p className="text-sm text-center text-gray-600 sm:text-base mt-4">
            Already have an account?{" "}
            <Link
              to={"/host-login"}
              className="text-indigo-500 hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>

        <div className="hidden w-full lg:block md:w-1/2">
          <img
            src={SignUpImg}
            alt="Signup Illustration"
            className="w-full h-auto rounded-lg hidden sm:block"
          />
        </div>
      </div>
    </div>
  );
};

export default HosterSignup;