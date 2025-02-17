import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaHeart } from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const JobSection = () => {
  const jobListings = [
    {
      title: "Frontend Developer",
      company: "TechCorp",
      location: "New York, USA",
      salary: "$60,000 - $80,000 / year",
      skills: ["React", "JavaScript", "CSS"],
      jobType: "Full-Time",
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/team5-150x150.jpg",
    },
    {
      title: "Graphic Designer",
      company: "Design Studio",
      location: "Los Angeles, USA",
      salary: "$40,000 - $50,000 / year",
      skills: ["Photoshop", "Illustrator", "Figma"],
      jobType: "Part-Time",
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/team2-150x150.jpg",
    },
    {
      title: "Data Scientist",
      company: "DataCorp",
      location: "San Francisco, USA",
      salary: "$100,000 - $120,000 / year",
      skills: ["Python", "Machine Learning", "SQL"],
      jobType: "Remote",
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/team2-150x150.jpg",
    },
    {
      title: "Marketing Manager",
      company: "Marketing Pros",
      location: "Chicago, USA",
      salary: "$70,000 - $90,000 / year",
      skills: ["SEO", "Google Ads", "Analytics"],
      jobType: "Full-Time",
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/9-150x150.jpg",
    },
    {
      title: "Frontend Developer",
      company: "TechCorp",
      location: "New York, USA",
      salary: "$60,000 - $80,000 / year",
      skills: ["React", "JavaScript", "CSS"],
      jobType: "Full-Time",
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/team5-150x150.jpg",
    },
    {
      title: "Graphic Designer",
      company: "Design Studio",
      location: "Los Angeles, USA",
      salary: "$40,000 - $50,000 / year",
      skills: ["Photoshop", "Illustrator", "Figma"],
      jobType: "Part-Time",
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/team2-150x150.jpg",
    },
    {
      title: "Data Scientist",
      company: "DataCorp",
      location: "San Francisco, USA",
      salary: "$100,000 - $120,000 / year",
      skills: ["Python", "Machine Learning", "SQL"],
      jobType: "Remote",
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/team2-150x150.jpg",
    },
    {
      title: "Marketing Manager",
      company: "Marketing Pros",
      location: "Chicago, USA",
      salary: "$70,000 - $90,000 / year",
      skills: ["SEO", "Google Ads", "Analytics"],
      jobType: "Full-Time",
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/9-150x150.jpg",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
            Recent Job Listings
            </h2>
            <p className="text-gray-600 mt-2">
              Discover top opportunities for your next career move.
            </p>
          </div>
          <Link to="/alljobs">
          <div className="text-black font-semibold hover:underline flex items-center">
            Browse All Jobs &rarr;
          </div>
          </Link>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-10"
        >
          {jobListings.map((job, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 relative hover:shadow-md transition">
                {/* Favorite Icon */}
                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-600">
                  <FaHeart />
                </button>

                {/* Company Logo */}
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-16 h-16 rounded-full mx-auto"
                />

                {/* Job Info */}
                <div className="text-center mt-4">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-500 text-sm">{job.company}</p>

                  {/* Location */}
                  <p className="text-gray-700 text-sm mt-2">
                    <span className="font-semibold">Location:</span> {job.location}
                  </p>

                  {/* Salary */}
                  <p className="text-gray-700 text-sm mt-1">
                    <span className="font-semibold">Salary:</span> {job.salary}
                  </p>

                  {/* Job Type */}
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mt-2 inline-block">
                    {job.jobType}
                  </span>

                  {/* Skills */}
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-pink-100 text-pink-600 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default JobSection;
