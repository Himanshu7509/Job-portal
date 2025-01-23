import React from "react";
import Amazon from "../../../../assets/b1.png";
import AMD from "../../../../assets/b2.png";
import Logitech from "../../../../assets/b5.png";
import Spotify from "../../../../assets/b6.png";
import { FaSearch } from "react-icons/fa";
import HeroSl from "../../../../assets/slider72.jpg";
import HeroS2 from "../../../../assets/slider73.jpg";
import HeroS3 from "../../../../assets/slider71.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HeroSection = () => {
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
          <div className="mt-6">
            <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <div className="flex items-center pl-4">
                <span className="text-gray-400 text-xl">
                  <FaSearch />
                </span>
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 px-4 py-3 text-gray-800 focus:outline-none"
              />
              
            </div>
          </div>

          {/* Logos */}
          <div className="flex items-center justify-center lg:justify-start space-x-6 mt-6">
            <img src={Amazon} alt="Amazon" className="h-6" />
            {/* <img
              src={AMD}
              alt="AMD"
              className="h-6"
            /> */}
            <img src={Logitech} alt="Logitech" className="h-6" />
            <img src={Spotify} alt="Spotify" className="h-6" />
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
              delay: 2000, 
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
