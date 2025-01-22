import React from "react";
import { MdContentPasteSearch } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

const ServicesSection = () => {
  const services = [
    {
      icon: <FaUserTie />,
      title: "Post a job",
      description: "It’s free and easy to post a job. Simply fill in a title, description.",
    },
    {
      icon: <GrUserWorker />,
      title: "Choose freelancers",
      description: "It’s free and easy to post a job. Simply fill in a title, description.",
    },
    {
      icon: <MdContentPasteSearch />,
      title: "Choose Jobs",
      description: "It’s free and easy to post a job. Simply fill in a title, description.",
    },
    {
      icon: <BiSolidPhoneCall />,
      title: "We’re here to help",
      description: "It’s free and easy to post a job. Simply fill in a title, description.",
    },
  ];

  return (
    <div className="bg-gray-50 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Services we offer</h2>
        <p className="text-gray-600 mb-10">
          Mostly services we offer to our customers...
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center border p-6 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <div className="text-4xl text-green-600 mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
