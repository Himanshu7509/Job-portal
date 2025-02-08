import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import HeroSl from "../../../../assets/slider72.jpg";
import HeroS2 from "../../../../assets/slider73.jpg";
import HeroS3 from "../../../../assets/slider71.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/alljobs`);
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:flex lg:items-center lg:space-x-10">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
            Hire the best employer for any jobs / Search the Job that you are
            looking for.
          </h1>
          <p className="text-gray-600 mt-4">
            Millions of people use jobquick.com to turn their ideas into
            reality.
          </p>

          {/* Search Box */}
          <div className="mt-6 flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm w-full">
            <div className="flex items-center pl-4">
              <span className="text-gray-400 text-xl">
                <FaSearch />
              </span>
            </div>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-1 px-4 py-3 text-gray-800 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="hidden lg:block bg-blue-500 text-white px-4 py-3 hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
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
          >
            <SwiperSlide>
              <img
                src={HeroSl}
                alt="Freelancer"
                className="rounded-lg shadow-lg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={HeroS2}
                alt="Freelancer"
                className="rounded-lg shadow-lg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={HeroS3}
                alt="Freelancer"
                className="rounded-lg shadow-lg"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
