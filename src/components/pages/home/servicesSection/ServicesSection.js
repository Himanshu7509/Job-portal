import React from "react";
import { MdContentPasteSearch } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      icon: <FaUserTie />,
      title: "Post a job",
      description: "It’s free and easy to post a job. Simply fill in a title, description.",
      link: "/host-login"
    },
    {
      icon: <GrUserWorker />,
      title: "Choose freelancers",
      description: "It’s free and easy to post a job. Simply fill in a title, description.",
      link: "/"
    },
    {
      icon: <MdContentPasteSearch />,
      title: "Choose Jobs",
      description: "It’s free and easy to post a job. Simply fill in a title, description.",
      link: "/alljobs"
    },
    {
      icon: <BiSolidPhoneCall />,
      title: "We’re here to help",
      description: "It’s free and easy to post a job. Simply fill in a title, description.",
      link: "/contact"
    },
  ];

  return (
    <div className="bg-gray-50 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="lg:text-4xl text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text  w-full lg:w-1/3">Services we offer</h2>
        <p className="text-gray-600 mb-10">
          Mostly services we offer to our customers...
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link to={service.link} key={index}>
              <div className="flex flex-col items-center text-center border p-6 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-500">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
