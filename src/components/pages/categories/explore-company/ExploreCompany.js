import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ExploreCompany = () => {
  const TopCompanies = [
    {
      title: "Google",
      logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
      description:
        "Google, founded in 1998 by Larry Page and Sergey Brin, is the world’s most popular search engine. Beyond search, Google is a technology giant offering services such as Gmail, Google Maps, YouTube, and Google Drive.",
    },
    {
      title: "Instagram",
      logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
      description:
        "Instagram is a social media platform focused on photo and video sharing.Launched in 2010 and acquired by Facebook. It is widely used by individuals, influencers, and businesses for personal expression and brand promotion.",
    },
    {
      title: "Tesla",
      logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
      description:
        "Tesla is an American company founded by Elon Musk and others in 2003. It specializes in electric vehicles (EVs), renewable energy, and advanced technology, such as autonomous driving.Tesla's popular EVs include the Model S, Model 3, Model X, and Model Y. ",
    },
    {
      title: "McDonald's",
      logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
      description:
        "McDonald’s is a global fast-food chain founded in 1940 in the U.S. It is known for its iconic menu items, such as the Big Mac, French fries, and Chicken McNuggets.Operating in over 100 countries, McDonald’s is a symbol of quick-service restaurants.",
    },
    {
      title: "Apple",
      logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
      description:
        "Apple Inc., founded in 1976 by Steve Jobs, Steve Wozniak, and Ronald Wayne, is a leading technology company. It is known for designing innovative products, including the iPhone, iPad, Mac computers, Apple Watch, and AirPods. ",
    },
    {
      title: "Facebook",
      logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
      description:
        "Facebook, launched in 2004 by Mark Zuckerberg and his co-founders, is a social networking platform that connects users globally. It allows people to share updates, photos, and videos, and engage with communities and businesses.",
    },
    {
      title: "Netflix",
      logo: "https://demoapus1.com/freeio/wp-content/uploads/2022/10/employer5.jpg",
      description:
        "Netflix is a global streaming service and entertainment company founded in 1997 by Reed Hastings and Marc Randolph. Originally a DVD rental-by-mail service, it transitioned to streaming in 2007 and has since become a leader in on-demand video content.",
    },
  ];

  return (
    <div className="mt-16 py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl text-transparent font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text mb-6">
          Explore Companies
        </h2>
        <p className="font-semibold text-gray-600">
          Find your dream job at top companies. Explore your talent with us.
        </p>
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
        {TopCompanies.map((myjob, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 relative hover:shadow-md transition transform hover:scale-105">
              <img
                src={myjob.logo}
                alt={myjob.image}
                className="w-16 h-16 rounded-full mx-auto"
              />
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {myjob.title}
                </h3>
                <p className="text-sm font-medium text-gray-600 mt-2">
                  {myjob.description}
                </p>
                <button className="bg-teal-50 text-teal-600 px-4 py-2 rounded-full text-sm mt-4">
                  {[8, 18, 12, 9, 10, 2, 4][index]} open jobs
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ExploreCompany;
