import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  

  const navigate = useNavigate();
  const loginApi = "https://jobquick.onrender.com/seekuser/login";

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
  
        if (data.token && data.userId) {
    
          Cookies.set("Token", data.token, { expires: 1 }); 
          Cookies.set("Id", data.userId, { expires: 1 });
  
          setSuccess("Login successful!");
          setError(null);
          navigate("/");
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
    <div className="flex flex-col-reverse lg:flex-row items-center justify-around min-h-screen p-5 md:p-10 bg-gray-100">

      <div className="w-full max-w-lg bg-white p-6 md:p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Welcome to Job Quick</h2>
        <p className="mt-2 text-center text-gray-600">Login to your account</p>
        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 shadow-lg transition duration-300"
          >
            Login
          </button>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          {success && <div className="text-green-500 text-sm mt-2">{success}</div>}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don’t have an account? <Link to="/signup" className="text-indigo-500 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>

      <div className="w-full max-w-md lg:max-w-lg mb-8 lg:mb-0 justify-center md:block hidden">
        <img
          src="https://epaylater.in/assets/images/help.svg"
          alt="Login Illustration"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
