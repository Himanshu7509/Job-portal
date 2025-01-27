import React, { useState } from "react";
import { Search } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { MapPin } from "lucide-react";
import { Clock } from "lucide-react";
import { Wallet } from "lucide-react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const jobListings = [
  {
    title: "Forward Security Director",
    company: "Bauch, Schuppe and Schulist Co",
    category: " Hotels & Tourism",
    type: "Full time",
    salary: "$40000-$42000",
    location: "New-York, USA",
    postedTime: "10 min ago",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer2.jpg",
  },
  {
    title: "Regional Creative Facilitator",
    company: "Wilson - Becker Co",
    category: "Media",
    type: "Part time",
    salary: "$28000-$32000",
    location: "Los-Angeles, USA",
    postedTime: "12 min ago",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer6.jpg",
  },
  {
    title: "Internal Integration Planner",
    company: "Mraz, Quigley and Feest Inc.",
    category: "Construction",
    type: "Full time",
    salary: "$48000-$50000",
    location: "Texas, USA",
    postedTime: "15 min ago",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer2.jpg",
  },
  {
    title: "District Intranet Director",
    company: "VonRueden - Weber Co",
    category: "Commerce",
    type: "Full time",
    salary: "$42000-$48000",
    location: "Florida, USA",
    postedTime: "24 min ago",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer6.jpg",
  },
  {
    title: "Corporate Tactics Facilitator",
    company: "Cormier, Turner and Fahey Inc",
    category: "Commerce",
    type: "Full time",
    salary: "$38000-$40000",
    location: "Boston, USA",
    postedTime: "26 min ago",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
  },
  {
    title: "Forward Accounts Consultant",
    company: "Miller Group",
    category: "Financial services",
    type: "Full time",
    salary: "$45000-$48000",
    location: "Boston, USA",
    postedTime: "30 min ago",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
  },
  
];

const TopCompanies = [

  {
    title: "Google",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
    description: "Google, founded in 1998 by Larry Page and Sergey Brin, is the world’s most popular search engine. Beyond search, Google is a technology giant offering services such as Gmail, Google Maps, YouTube, and Google Drive."
  },
  {
    title: "Instagram",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
    description: "Instagram is a social media platform focused on photo and video sharing.Launched in 2010 and acquired by Facebook. It is widely used by individuals, influencers, and businesses for personal expression and brand promotion."
  },
  {
    title: "Tesla",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
    description: "Tesla is an American company founded by Elon Musk and others in 2003. It specializes in electric vehicles (EVs), renewable energy, and advanced technology, such as autonomous driving.Tesla's popular EVs include the Model S, Model 3, Model X, and Model Y. "
  },
   {
    title: "McDonald's",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
    description: "McDonald’s is a global fast-food chain founded in 1940 in the U.S. It is known for its iconic menu items, such as the Big Mac, French fries, and Chicken McNuggets.Operating in over 100 countries, McDonald’s is a symbol of quick-service restaurants."
  },
   {
    title: "Apple",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
    description: "Apple Inc., founded in 1976 by Steve Jobs, Steve Wozniak, and Ronald Wayne, is a leading technology company. It is known for designing innovative products, including the iPhone, iPad, Mac computers, Apple Watch, and AirPods. "
  },
  {
    title: "Facebook",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
    description: "Facebook, launched in 2004 by Mark Zuckerberg and his co-founders, is a social networking platform that connects users globally. It allows people to share updates, photos, and videos, and engage with communities and businesses."
  },
  {
    title: "Netflix",
    logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
    description: "Netflix is a global streaming service and entertainment company founded in 1997 by Reed Hastings and Marc Randolph. Originally a DVD rental-by-mail service, it transitioned to streaming in 2007 and has since become a leader in on-demand video content."
  }
]

const JobListingPage = () => {


  return (
    <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col space-y-8">
            {/* Main Section with Filters and Jobs */}
            <div className="flex gap-6">
              {/* Left Sidebar */}
              <div className="w-64 flex-shrink-0">
                <div className="bg-gray-50   rounded-lg p-4">
                  {/* Search */}
                  <div className="mb-6">
                  <h2 className="text-2xl font-bold  text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">   Search by Job Title
                    </h2>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Job title or company"
                        className="w-full p-2 pr-8 border border-gray-700 rounded-md text-sm"
                      />
                      <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-6">
                  <h2 className="text-2xl font-bold  text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">Location</h2>
                    <select className="w-full p-2 border border-gray-700 rounded-md text-sm text-gray-500">
                      <option>Choose city</option>
                      <option>Nagpur</option>
                      <option>Banglore</option>
                      <option> Pune</option>
                      <option>Noida </option>
                    </select>
                  </div>

                  {/* Category */}
                  <div className="mb-6">
                  <h2 className="text-2xl font-bold  text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6"> Category </h2>

                    {[
                      "IT & Networking",
                      "Sales & Marketing",
                      "Data Science",
                      "Customer Service",
                      "Digital Marketing",
                      "Human Resource",
                      "Project Manager",
                      "Accounting"
                    ].map((category) => (
                      <div
                        key={category}
                        className="flex justify-between items-center mb-2"
                      >
                        <label className="flex items-center text-sm">
                          <input type="checkbox" className="mr-2" />
                          {category}
                        </label>
                       
                      </div>
                    ))}
            
                  </div>

                  {/* Job Type */}
                  <div className="mb-6">
                  <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">Job Type</h2>
                    {[
                      "Full Time",
                      "Part Time",
                      "Freelance",
                      "Seasonal",
                      "Fixed-Price",
                    ].map((type) => (
                      <div
                        key={type}
                        className="flex justify-between items-center mb-2"
                      >
                        <label className="flex items-center text-sm">
                          <input type="checkbox" className="mr-2" />
                          {type}
                        </label>
                       
                      </div>
                    ))}
                  </div>

                  {/* Experience Level */}
                  <div className="mb-6">
                  <h2 className="text-2xl font-bold  text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">                      Experience Level
                    </h2>
                    {["No-experience", "Fresher", "Intermediate", "Expert"].map(
                      (level) => (
                        <div
                          key={level}
                          className="flex justify-between items-center mb-2"
                        >
                          <label className="flex items-center text-sm">
                            <input type="checkbox" className="mr-2" />
                            {level}
                          </label>
                         
                        </div>
                      )
                    )}
                  </div>

                  {/* Date Posted */}
                  <div className="mb-6">
                  <h2 className="text-2xl font-bold  text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">Date Posted</h2>
                    {[
                      "All",
                      "Last Hour",
                      "Last 24 Hours",
                      "Last 7 Days",
                      "Last 30 Days",
                    ].map((date) => (
                      <div
                        key={date}
                        className="flex justify-between items-center mb-2"
                      >
                        <label className="flex items-center text-sm">
                          <input type="checkbox" className="mr-2" />
                          {date}
                        </label>
                       
                      </div>
                    ))}
                  </div>

                  {/* Salary Range */}
                  <div className="mb-6">
                  <h2 className="text-2xl font-bold  text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6"> Salary </h2>
                    <div className="mb-4">
                      <div className="h-1 bg-teal-600 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg">Salary: $0 - $9999</span>
                      <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-1 rounded-md text-sm">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-6">
                  <h2 className="text-2xl font-bold  text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">Tags</h2>
                    <div className="flex flex-wrap gap-2 font-semibold">
                      {[
                        "engineering",
                        "design",
                        "office",
                        "marketing",
                        "management",
                        "soft",
                        "construction",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="bg-slate-100 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

  
              </div>

              {/* Main Content - Job Listings */}
              <div className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-800 text-semibold">
                    Showing 6-6 of 10 results
                  </span>
                  <select className="border border-gray-700 rounded-md p-2 text-sm">
                      <option>Sort by latest</option>
                      <option> Newest</option>
                      <option>Oldest</option>
                  </select>
                </div>

                {/* Job Cards */}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {jobListings.map((job, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 flex flex-col justify-between items-start hover:shadow-lg transition-shadow bg-white"
                      >
                       
                        <div className="flex w-full mb-4">
                          <img
                            src={job.logo}
                            alt={`${job.company} logo`}
                            className="w-14 h-14 rounded-lg object-cover mr-4"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-black-800 mb-1">
                              {job.title}
                            </h3>
                            <p className="text-gray-500 text-semibold mb-1">{job.company}</p>
                            <span className="text-gray-500 text-semibold">{job.postedTime}</span>
                          </div>
                        </div>

                        {/* Job Details */}
                        <div className="text-sm text-gray-500 mb-4 font-semibold">
                          <div className="flex items-center mb-2">
                            <BriefcaseBusiness className="w-5 h-5 text-pink-500 mr-2" />
                            {job.category}
                          </div>
                          <div className="flex items-center mb-2">
                            <Clock className="w-5 h-5 text-pink-500 mr-2" />
                            {job.type}
                          </div>
                          <div className="flex items-center mb-2">
                            <Wallet className="w-5 h-5 text-pink-500 mr-2" />
                            {job.salary}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 text-pink-500 mr-2" />
                            {job.location}
                          </div>
                        </div>

                        {/* Job Details Button */}
                        <button className="w-full h-10 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                          View Job Details
                        </button>
                      </div>
                    ))}
                </div>



                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-md text-sm">
                      1
                    </button>
                    <button className="w-8 h-8 border rounded-md text-sm hover:bg-gradient-to-r from-pink-500 to-blue-500 hover:text-white">
                      2
                    </button>
                  </div>
                  <button className="flex items-center gap-2 text-sm hover:text-pink-600">
                    Next
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>



            {/* Top Companies Section */}

         <div className="mt-16 py-16">
            <div className="text-center mb-12">
            <h2 className="text-4xl  text-transparent font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6"> Top Companies</h2>

            <p className="font-semibold"> Find your dream job at top companies. Explore your talent with us.</p> 

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
              {TopCompanies.map((myjob, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 relative hover:shadow-md transition">

                  
                    <img
                      src={myjob.logo}
                      alt={myjob.image}
                      className="w-16 h-16 rounded-full mx-auto"
                    />
                  
                    <div className="text-center mt-4">
                      <h3 className="text-lg font-semibold">{myjob.title}</h3>
                      <p className="text-sm font-semibold mt-4">{myjob.description}</p>
                      <button className=" text-teal-600 bg-teal-50 px-4 py-2 rounded-full text-sm mt-4">
                            {[8, 18, 12, 9,10,2,4][index]} open jobs
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

        </div>
        </div>
            
          </div>
        </div>
      </div>
  );
};

export default JobListingPage;
