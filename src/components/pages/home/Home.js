import React from 'react'
import BrowseCategories from './BrowseCategories/BrowseCategories'
import HeroSection from './heroSection/HeroSection'
import PopularSection from './popularSection/PopularSection'
import ServicesSection from './servicesSection/ServicesSection'
import JobExploreSec from './job-explore-sec/JobExploreSec'
import RecentJobs from './recentJobs/RecentJobs'
import FAQSection from './FAQ/FAQSection'
import Header from '../../common/header/Header'
import Footer from '../../common/footer/Footer'
import BlogSection from './BlogSection/BlogSection'
import Testimonials from './Testimonals/Testimonials'

const Home = () => {
  return (
    <div className='w-full'>
        <Header/>
        <HeroSection/>
        <PopularSection/>
        <BrowseCategories/>
        <RecentJobs/>
        <BlogSection/>
        <Testimonials/>
        <JobExploreSec/>
        <ServicesSection/>
        <FAQSection/>
        <Footer/>
    </div>
  )
}

export default Home