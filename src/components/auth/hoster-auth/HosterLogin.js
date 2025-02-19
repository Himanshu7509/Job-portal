import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import loginimg from "../../../assets/host-login.png";
import { Eye, EyeOff } from "lucide-react";

const HosterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const loginApi = "https://jobquick.onrender.com/hostuser/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    const person = {
      email: email,
      password: password,
    };

    fetch(loginApi, {
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
        console.log("Login Response:", data);

        if (data.token && data._id) {
          Cookies.set("jwtToken", data.token, { expires: 1 });
          Cookies.set("userId", data._id, { expires: 1 });

          setSuccess("Login successful!");
          setError(null);
          navigate("/host-dashboard");
        } else {
          throw new Error("Token or ID not received");
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        setError("Login failed. Please try again.");
        setSuccess(null);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center w-full max-w-6xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
        <div className="w-full p-6 space-y-6 md:w-10/12 lg:w-1/2 sm:p-8">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent sm:text-3xl lg:mt-8">
            Welcome to Job Quick
          </h2>
          <p className="text-center text-gray-700 text-lg font-semibold mt-4">
            Login to your account
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                  placeholder="Enter your password"
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
              className="w-full px-4 py-3 font-semibold text-white bg-gradient-to-r from-pink-500 to-indigo-500 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 shadow-xl transition duration-300"
            >
              Login
            </button>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {success && (
              <div className="text-green-500 text-sm mt-2">{success}</div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-700 text-lg">
              Don’t have an account?{" "}
              <Link
                to="/host-signup"
                className="text-indigo-500 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden w-full lg:block md:w-1/2">
          <img
            src={loginimg}
            alt="Login Illustration"
            className="w-full h-auto rounded-lg hidden sm:block"
          />
        </div>
      </div>
    </div>
  );
};

export default HosterLogin;
