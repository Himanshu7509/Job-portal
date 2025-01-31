import React, { useState } from "react";
import HeroSl from "../../../../assets/slider71.png";
import HeroS2 from "../../../../assets/slider72.jpg";
import HeroS3 from "../../../../assets/slider73.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Header from "../../../common/header/Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    fullName: "",
    city: "",
    workExperience: {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
    },
    address: "",
    pincode: "",
    state: "",
    country: "",
    gender: "",
    phoneNumber: "",
    dateOfBirth: "",
    skills: [],
    education: {
      degree: "",
      institution: "",
      specialisation: "",
      startYear: "",
      endYear: "",
    },
  });

  const SeekId = Cookies.get("Id");
  const SeekToken = Cookies.get("Token");
  const SeekApi = `https://jobquick.onrender.com/seekuser/update/${SeekId}`;

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (name === "skills") {
      setFormData((prev) => ({
        ...prev,
        skills: value.split(",").map((skill) => skill.trim()),
      }));
    } else if (name.includes(".")) {

      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else if (name.startsWith("workExperience")) {
 
      const field = name;
      setFormData((prev) => ({
        ...prev,
        workExperience: {
          ...prev.workExperience,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSeekData = async (e) => {
    e.preventDefault();
  
    try {
    
      const formDataToSend = new FormData();
      
  
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
  
      const dataToSend = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        workExperience: {
          company: formData.workExperience.company,
          position: formData.workExperience.position,
          startDate: formData.workExperience.startDate,
          endDate: formData.workExperience.endDate
        },
        education: {
          degree: formData.education.degree,
          institution: formData.education.institution,
          specialisation: formData.education.specialisation,
          startYear: formData.education.startYear,
          endYear: formData.education.endYear
        },
        skills: formData.skills,
      };

       console.log(dataToSend)
  
      formDataToSend.append('data', JSON.stringify(dataToSend));
  
      if (!SeekId || !SeekToken) {
        throw new Error('Authentication credentials missing');
      }
  
      const response = await fetch(SeekApi, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${SeekToken}`,
          'Content-Type': formData.image ? 'multipart/form-data' : 'application/json',
        },
        body: formData.image ? formDataToSend : JSON.stringify(dataToSend)
      });
  
      // Handle different HTTP status codes
      if (response.status === 404) {
        throw new Error('User not found or invalid endpoint');
      } else if (response.status === 401) {
        throw new Error('Unauthorized access. Please login again');
      } else if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('User details updated successfully:', data);
     
  
    } catch (error) {
      console.error('Error updating user details:', error);
    
      if (error.message.includes('Authentication')) {
        
      }
    }
  };


  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const renderuserDetailForm = () => (
    <>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          User Details
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Profile image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-1 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-gradient-to-r from-pink-500 to-blue-500 file:text-white hover:file:opacity-90"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </>
  );

  const renderuserAddressForm = () => (
    <>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          User Location
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your Address"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter your city"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PinCode
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="Enter your pincode"
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Enter your country"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="Enter your state"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:opacity-90"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );

  const renderuserEducationForm = () => (
    <>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          User Education
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Degree
          </label>
          <input
            type="text"
            name="education.degree"
            value={formData.education.degree}
            onChange={handleInputChange}
            placeholder="Enter the degree"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            University
          </label>
          <input
            type="text"
            name="education.institution"
            value={formData.education.institution}
            onChange={handleInputChange}
            placeholder="Enter the name of your university"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialisation
          </label>
          <input
            type="text"
            name="education.specialisation"
            value={formData.education.specialisation}
            onChange={handleInputChange}
            placeholder="Enter the field"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting Year
            </label>
            <input
              type="date"
              name="education.startYear"
              value={formData.education.startYear}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ending Year
            </label>
            <input
              type="date"
              name="education.endYear"
              value={formData.education.endYear}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:opacity-90"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xl py-3 px-4 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  )

  const renderuserExperienceForm = () => (
    <>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          User Work Experience and Skills
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="workExperience.company"
            value={formData.workExperience.company}
            onChange={handleInputChange}
            placeholder="Enter the company name"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position
          </label>
          <input
            type="text"
            name="workExperience.position"
            value={formData.workExperience.position}
            onChange={handleInputChange}
            placeholder="Enter the position you have been working"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="workExperience.startDate"
              value={formData.workExperience.startDate}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              name="workExperience.endDate"
              value={formData.workExperience.endDate}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills.join(", ")}
            onChange={handleInputChange}
            placeholder="Enter your skills (comma-separated)"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:opacity-90"
          >
            Previous
          </button>

          <button
            type="submit"
            onClick={handleSeekData}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:opacity-90"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4 flex flex-col lg:flex-row lg:items-center lg:space-x-10 space-y-6 lg:space-y-0">
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
            className="w-full sm:w-4/5"
          >
            <SwiperSlide>
              <img
                src={HeroSl}
                alt="Freelancer"
                className="rounded-lg shadow-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={HeroS2}
                alt="Freelancer"
                className="rounded-lg shadow-lg object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={HeroS3}
                alt="Freelancer"
                className="rounded-lg shadow-lg object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-lg sm:p-6 p-4">
            <form onSubmit={handleSeekData}>
              {step === 1 && renderuserDetailForm()}
              {step === 2 && renderuserAddressForm()}
              {step === 3 && renderuserEducationForm()}
              {step === 4 && renderuserExperienceForm()}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;