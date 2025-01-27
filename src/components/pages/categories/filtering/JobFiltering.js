//https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer2.jpg
//https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer6.jpg
//https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg

import React, { useState } from "react";
import { Search } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { MapPin } from "lucide-react";
import { Clock } from "lucide-react";
import { Wallet } from "lucide-react";

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
                    <h2 className="text-lg font-semibold mb-3">
                      Search by Job Title
                    </h2>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Job title or company"
                        className="w-full p-2 pr-8 border rounded-md text-sm"
                      />
                      <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Location</h2>
                    <select className="w-full p-2 border rounded-md text-sm text-gray-500">
                      <option>Choose city</option>
                      <option>Nagpur</option>
                      <option>Banglore</option>
                      <option> Pune</option>
                      <option>Noida </option>
                    </select>
                  </div>

                  {/* Category */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Category</h2>

                    {[
                      "Commerce",
                      "Telecomunications",
                      "Hotels & Tourism",
                      "Education",
                      "Financial Services",
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
                    <h2 className="text-lg font-semibold mb-3">Job Type</h2>
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
                    <h2 className="text-lg font-semibold mb-3">
                      Experience Level
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
                    <h2 className="text-lg font-semibold mb-3">Date Posted</h2>
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
                    <h2 className="text-lg font-semibold mb-3">Salary</h2>
                    <div className="mb-4">
                      <div className="h-1 bg-teal-600 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg">Salary: $0 - $9999</span>
                      <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Tags</h2>
                    <div className="flex flex-wrap gap-2">
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
                  <span className="text-gray-500 text-sm">
                    Showing 6-6 of 10 results
                  </span>
                  <select className="border rounded-md p-2 text-sm">
                    <option>Sort by latest</option>
                  </select>
                </div>

                {/* Job Cards */}
                <div className="space-y-4">
                  {jobListings.map((job, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 flex justify-between items-start hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="w-12 h-12 rounded-lg"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm">
                              {job.title}
                            </h3>
                            <span className="text-gray-400 text-xs">
                              {job.postedTime}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm mb-2">
                            {job.company}
                          </p>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <BriefcaseBusiness className="w-4 h-4 text-teal-500 mr-1" />
                              {job.category}
                            </span>

                            <span className="flex items-center gap-1">
                              {" "}
                              <Clock className="w-4 h-4 text-teal-600 mr-1" />
                              {job.type}
                            </span>

                            <span className="flex items-center gap-1">
                              <Wallet className="w-4 h-4 text-teal-600 mr-1" />
                              {job.salary}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-teal-600 mr-1" />
                              {job.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700 transition-colors">
                        Job Details
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-teal-600 text-white rounded-md text-sm">
                      1
                    </button>
                    <button className="w-8 h-8 border rounded-md text-sm">
                      2
                    </button>
                  </div>
                  <button className="flex items-center gap-2 text-sm">
                    Next
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Top Companies Section */}
            <div className="mt-16 bg-slate-50 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Top Company</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  At eu lobortis pretium tincidunt amet lacus et senean
                  aliqueat. Blandit a massa elementum
                </p>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {["Instagram", "Tesla", "McDonald's", "Apple"].map(
                  (company, index) => (
                    <div
                      key={company}
                      className="bg-white p-6 rounded-lg text-center"
                    >
                      <img
                        src="/assets/image1.png"
                        alt={`${company} logo`}
                        className="w-12 h-12 mx-auto mb-4"
                      />
                      <h3 className="font-semibold mb-3">{company}</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Et velit mauris aliquam est diam. Leo sagittis
                        consectetur diam morbi erat
                      </p>
                      <button className="bg-slate-50 text-teal-600 px-4 py-2 rounded-full text-sm">
                        {[8, 18, 12, 9][index]} open jobs
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default JobListingPage;