import React from "react";
import BrowseCategories from "./BrowseCategories/BrowseCategories";
import HeroSection from "./heroSection/HeroSection";
import RecentJobListing from "./popularSection/RecentJobListing";
import ServicesSection from "./servicesSection/ServicesSection";
import JobExploreSec from "./job-explore-sec/JobExploreSec";
import PopularJobs from "./popularJobs/PopularJobs";
import FAQSection from "./FAQ/FAQSection";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import BlogSection from "./BlogSection/BlogSection";
import Testimonials from "./Testimonals/Testimonials";

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <HeroSection />
      <PopularJobs />
      <BrowseCategories />
      <RecentJobListing />
      <BlogSection />
      <Testimonials />
      <JobExploreSec />
      <ServicesSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Home;
