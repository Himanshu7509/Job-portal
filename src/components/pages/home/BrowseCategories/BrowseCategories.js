import React from "react";
import { FaLaptopCode } from "react-icons/fa6";
import { MdOutlineDesignServices } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { BsTranslate } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { LuFileCode } from "react-icons/lu";

const categories = [
  {
    title: "Development & IT",
    services: 8,
    description: "Software Engineer, Web / Mobile Developer & More",
    icon: <FaLaptopCode />,
  },
  {
    title: "Design & Creative",
    services: 8,
    description: "Website Design Adobe XD, Figma, Adobe Photoshop",
    icon: <MdOutlineDesignServices />,
  },
  {
    title: "Digital Marketing",
    services: 1,
    description: "Service Digital and Social Media Management",
    icon: <BsFileEarmarkBarGraph />,
  },
  {
    title: "Writing & Translation",
    services: 1,
    description: "Writing, Translation Project, Get It Quickly Done",
    icon: <BsTranslate />,
  },
  {
    title: "Music & Audio",
    services: 0,
    description: "Freelancer Music, Audio Services, Music Projects",
    icon: <FaMicrophoneAlt />,
  },
  {
    title: "Video & Animation",
    services: 0,
    description: "Animation Video Maker that Brings Studio Quality",
    icon: <MdOutlineOndemandVideo />,
  },
  {
    title: "Programming & Tech",
    services: 1,
    description: "Programmers and Coders Both for Your Project",
    icon: <LuFileCode />,
  },
  {
    title: "Finance & Accounting",
    services: 4,
    description: "Team Works, Collaboration Meet for Your Business",
    icon: <FaChartLine />,
  },
];

const CategoryCard = ({ title, services, description, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out">
    <div className="flex items-center space-x-4 mb-4">
      <div className="text-4xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{services} Services</p>
      </div>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const BrowseCategories = () => (
  <div className="max-w-7xl mx-auto p-6 md:p-12 lg:p-10">
    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">Browse talent by category</h1>
    <p className="text-gray-600 mb-8">Get some inspirations from differnet skills</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
      {categories.map((category, index) => (
        <CategoryCard key={index} {...category} />
      ))}
    </div>
  </div>
);

export default BrowseCategories;