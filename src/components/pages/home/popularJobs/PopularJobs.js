import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const JobGrid = () => {
  const jobs = [
    {
      image:
        "https://media.wired.com/photos/5926aae5f3e2356fd800a0e8/master/pass/amazon-logo.jpg",
      title: "Amazon",
      description:
        "As a Cybersecurity Engineer at Amazon, you will be responsible for developing security protocols, monitoring systems for threats, and mitigating risks associated with cloud and e-commerce data",
      tags: ["Ethical hacking", "Network security", "Firewalls"],
    },
    {
      image:
        "https://imageio.forbes.com/specials-images/imageserve/657299f9c6898fd9524d546c/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      title: "AMD",
      description:
        "AMD is a leading semiconductor company specializing in high-performance computing, graphics, and visualization technologies",
      tags: ["Machine Learning", "Python", "AI Algorithms"],
    },
    {
      image:
        "https://images.yourstory.com/cs/2/220356402d6d11e9aa979329348d4c3e/Flipkart-1582211499554.jpg?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75",
      title: "Flipkart",
      description:
        "The Regional Sales Manager at Flipkart will be responsible for driving revenue growth, managing key accounts, and leading a team to expand market presence",
      tags: ["Sales strategy", "Team management", "Negotiation"],
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBIoIr2Y33v0IdprP2CEPnEU07j1IPUUyjnw&s",
      title: "Zomato",
      description:
        "Zomato is a leading food delivery and restaurant discovery platform, offering services in multiple countries",
      tags: ["Communication", "CRM Tools", "Multilingual Skills"],
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG-mTOvpR2vZqrFGr65sUgVRPJhX5F7VBIBg&s",
      title: "Infosys",
      description:
        "Infosys is a global leader in technology services and consulting, helping businesses accelerate digital transformation",
      tags: ["SEO", "Content Strategy", "Google Ads"],
    },
    {
      image:
        "https://worktheater.com/wp-content/uploads/2023/04/tcs-business-model.png.webp",
      title: "TCS",
      description:
        "Tata Consultancy Services is a multinational IT services and consulting company that helps global enterprises with digital transformation",
      tags: ["AWS", "Google Cloud", "DevOps"],
    },
  ];

  const navigate = useNavigate();

  const handleTitleClick = (companyName) => {
    navigate(`/alljobs?title=${encodeURIComponent(companyName)}`);

    console.log(companyName);
  };

  return (
    <>
      <div className="bg-gray-50 py-16 lg:px-8 px-2">
        <div className="max-w-7xl mx-auto mb-10">
         

          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center sm:text-left bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            Discover Your Next Career Move
          </h2>
          <p className="text-gray-600 text-center sm:text-left text-lg">
            Explore top opportunities tailored to your expertise
          </p>
        </div>

        <div className="max-w-7xl mx-auto mb-10" onClick={onclick}>
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
            {jobs.map((job, index) => (
              <SwiperSlide
                key={index}
                {...job}
                onClick={() => handleTitleClick(job.title)}
              >
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg overflow-hidden border"
                >
                  <div className="max-w-5xl justify-center lg:p-6 p-2">
                    <img
                      src={job.image}
                      alt={job.title}
                      className="w-full h-48 object-cover rounded"
                    />

                    <h3 className="text-lg font-semibold mb-2 mt-4">
                      {job.title}
                    </h3>

                    <p className="text-gray-500 mb-4 line-clamp-2 overflow-hidden text-ellipsis">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-gradient-to-r from-pink-50 to-purple-50 text-gray-700 px-3 py-2 text-xs font-medium rounded-full border border-pink-100 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link to="/alljobs">
                      <div className="text-blue-600 hover:text-blue-800 text-md font-medium">
                        Apply Now &rarr;
                      </div>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default JobGrid;
