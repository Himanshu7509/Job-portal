import React from 'react';
import SignUpImg from '../../../assets/host-signup.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



const HosterSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
  
    const signupApi = "https://jobquick.onrender.com/hostuser/signup";
  
    const handleSignup = (e) => {
      e.preventDefault();
      console.log("Email:", email);
      console.log("Password:", password);
  
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
          navigate('/host-login')
        })
        .catch((error) => {
          console.error("Signup Error:", error);
          setError("Signup failed. Please try again.");
          setSuccess(null);
        });
    }

    return (

    <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-around min-h-screen p-5 md:p-10 bg-white">

      <div className="w-full max-w-lg bg-white p-6 md:p-10 rounded-lg shadow-2xl">

      <h2 className="text-2xl md:text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
          Create an Account
        </h2>
        <p className="text-center text-gray-700 text-lg font-semibold mt-4">Signup to your account</p>
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
            className="w-full px-4 py-3 text-white bg-gradient-to-r from-pink-500 to-indigo-500 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 shadow-xl transition duration-300"
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
        <p className="text-sm text-center text-gray-600 sm:text-base mt-4">
          Already have an account?{" "}
          <Link to={"/host-login"} className="text-indigo-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    
      <div className="w-full max-w-md lg:max-w-lg mb-8 lg:mb-0 flex justify-center">
      <img
          src={SignUpImg}
          alt="Signup Illustration"
          className="w-full h-auto rounded-lg hidden sm:block"
        />
      </div>
    </div>
    

      );
    };
    

export default HosterSignup