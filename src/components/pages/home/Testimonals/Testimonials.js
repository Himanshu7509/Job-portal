import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  
  const jobListings = [
    {
      name : "eliana Doe",
      title: "Data Scientist",
      company: "DataCorp",
      description : "Designing and implementing predictive models. Working with tools like Python, Communicating insights through data visualization tools like Tableau, Power BI, or matplotlib.",
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/team2-150x150.jpg",
    },
    {
      name: "Ema Jolly",
      title: "Frontend Developer",
      company: "TechCorp",
      description : "Ensuring cross-browser compatibility and optimizing for performance. Collaborating with UI/UX designers to bring visual concepts to life. Debugging and maintaining front-end codebases.", 
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/team5-150x150.jpg",
    },
    {
      name: "Diana William",
      title: "Graphic Designer",
      company: "Design Studio",
      description : "Designing logos, brochures, social media posts, and advertisements. Using tools like Adobe Creative Suite or Canva. Understanding brand guidelines and maintaining consistency across projects.", 
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/team2-150x150.jpg",
    },
    {
      name: "Anthony Cena",
      title: "Marketing Manager",
      company: "Marketing Pros",
      description : "Conducting market research to understand customer behavior and competitive positioning. Collaborating with creative teams to develop promotional materials and content.",
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/9-150x150.jpg",
    },
    {
      name: "Ema Jolly",
      title: "Frontend Developer",
      company: "TechCorp",
      description : "Ensuring cross-browser compatibility and optimizing for performance. Collaborating with UI/UX designers to bring visual concepts to life. Debugging and maintaining front-end codebases.", 
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/team5-150x150.jpg",
    },
    {
      name: "Diana William",
      title: "Graphic Designer",
      company: "Design Studio",
      description : "Designing logos, brochures, social media posts, and advertisements. Using tools like Adobe Creative Suite or Canva. Understanding brand guidelines and maintaining consistency across projects.", 
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/team2-150x150.jpg",
    },
    {
      name: "Anthony Cena",
      title: "Marketing Manager",
      company: "Marketing Pros",
      description : "Conducting market research to understand customer behavior and competitive positioning. Collaborating with creative teams to develop promotional materials and content.",
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/9-150x150.jpg",
    },
    {
      name : "eliana Doe",
      title: "Data Scientist",
      company: "DataCorp",
      description : "Designing and implementing predictive models. Working with tools like Python, Communicating insights through data visualization tools like Tableau, Power BI, or matplotlib.",
      companyLogo:
        "https://demoapus1.com/freeio/wp-content/uploads/2022/10/team2-150x150.jpg",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              What Our User Says
            </h2>
            <p className="text-gray-600 mt-2">
              Our users are our greatest asset. Here's what they have to say about us.
            </p>
          </div>
          
        </div>

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
              <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-8 relative hover:shadow-md transition ">

                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-50 mx-auto"
                />

                <div className="text-center mt-4">
                  <h2 className="text-lg font-bold">{job.name}</h2>
                  <h5 className="text-lg font-semibold mt-2 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">{job.title}</h5>
                  <p className="text-pink-900 text-sm mt-2">{job.company}</p>
                  <p className="text-gray-500 text-sm mt-3 font-serif">{ job.description}</p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;