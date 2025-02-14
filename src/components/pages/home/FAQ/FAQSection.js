import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I register?",
      answer:
        "To register, simply click on the 'Sign Up' button on the homepage. Fill in your details and verify your email. Once done, you can start exploring job opportunities.",
    },
    {
      question: "How to reset password?",
      answer:
        "If you've forgotten your password, click on 'Forgot Password?' on the login page. Follow the instructions sent to your email to reset it. You'll be back to job searching in no time!",
    },
    {
      question: "Can I edit my profile?",
      answer:
        "Yes, you can edit your profile anytime. Just log in and navigate to your profile settings. Make the necessary changes and save them.",
    },
    {
      question: "What is Job Quick?",
      answer:
        "Job Quick is a platform designed to streamline your job search process. We connect job seekers with employers efficiently. Our goal is to help you find the right job quickly.",
    },
    {
      question: "How to apply jobs?",
      answer:
        "To apply for a job, browse through our listings and select the position that interests you. Click on 'Apply Now' and follow the prompts. Ensure your profile is up to date for the best chances!",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text w-20">FAQs</h1>
          <p className="text-gray-600 mb-6">
            Find answers to your questions about job searching and using Job Quick effectively.
          </p>
          <Link to="/contact">
          <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
            Contact
          </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="md:col-span-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-md mb-4"
            >
              <div
                onClick={() => toggleFAQ(index)}
                className="cursor-pointer flex justify-between items-center px-4 py-3 bg-pink-50"
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <span className="text-gray-500">
                  {activeIndex === index ? "×" : "+"}
                </span>
              </div>
              {activeIndex === index && (
                <div className="px-4 py-3 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
