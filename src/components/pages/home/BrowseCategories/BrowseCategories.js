import React from "react";
import { FaLaptopCode } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { LuDatabaseZap } from "react-icons/lu";
import { RiCustomerService2Fill } from "react-icons/ri";
import { SiCoinmarketcap } from "react-icons/si";
import { GrResources } from "react-icons/gr";
import { FaProjectDiagram } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";

import { Link } from "react-router-dom";

const categories = [
  {
    title: "IT & Networking",
    services: 8,
    description: "Software Engineer, Web / Mobile Developer & More",
    icon: <FaLaptopCode />,
  },
  {
    title: "Sales & Marketing",
    services: 8,
    description: "Focuses on selling products/services and promoting brands",
    icon: <GiReceiveMoney />,
  },
  {
    title: "Data Science",
    services: 1,
    description: "Analyzing large datasets to derive insights and make predictions",
    icon: <LuDatabaseZap />,
  },
  {
    title: "Customer Service",
    services: 1,
    description: "Involves assisting customers with inquiries, complaints, and support",
    icon: <RiCustomerService2Fill/>,
  },
  {
    title: "Digital Marketing",
    services: 0,
    description: "Promotes businesses online through social media paid advertising",
    icon: <SiCoinmarketcap/>,
  },
  {
    title: "Human Resource",
    services: 0,
    description: "Manages recruitment, employee relations, and organizational policies",
    icon: <GrResources/>,
  },
  {
    title: "Project Manager",
    services: 1,
    description: "Oversees projects from initiation to completion and budgets are met",
    icon: <FaProjectDiagram/>,
  },
  {
    title: "Accounting",
    services: 4,
    description: "Handles financial records, audits, and taxation",
    icon: <FaChartLine />,
  },
];

const CategoryCard = ({ title, services, description, icon }) => (
  <Link to={"/alljobs"}>
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out">
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-4xl text-purple-500">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{services} Services</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </Link>
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