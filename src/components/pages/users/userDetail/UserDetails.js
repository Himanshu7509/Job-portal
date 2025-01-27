import React, { useState } from "react";
import HeroSl from "../../../../assets/slider71.png";
import HeroS2 from "../../../../assets/slider72.jpg";
import HeroS3 from "../../../../assets/slider73.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Header from "../../../common/header/Header";

const UserDetails = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [step, setStep] = useState(1);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  return (
    <>
    <Header/>
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
            <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
              User Details
            </h2>

            {step === 1 && (
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-1 px-3 focus:ring-blue-500 focus:border-blue-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-gradient-to-r from-pink-500 to-blue-500 file:text-white hover:file:opacity-90"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="number"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="number"
                      name="number"
                      required
                      placeholder="Enter your phone number"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      required
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="" disabled selected>
                        Select your gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your Address"
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
              </form>
            )}

            {step === 2 && (
              <form className="space-y-6">
                <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your city"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your state"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your country"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PinCode
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="Enter your pincode"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your education"
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    required
                    placeholder="Enter your skills"
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Experience
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    required
                    placeholder="Enter your work experience"
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
                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white py-33 px-5 rounded-lg shadow-md hover:opacity-90"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
