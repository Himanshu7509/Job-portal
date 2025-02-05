import React from 'react'
import BrowseCategories from './BrowseCategories/BrowseCategories'
import HeroSection from './heroSection/HeroSection'
import JobSection from './jobSection/JobSection'
import ServicesSection from './servicesSection/ServicesSection'
import JobExploreSec from './job-explore-sec/JobExploreSec'
import JobGrid from './jobGrid/JobGrid'
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
        <JobSection/>
        <BrowseCategories/>
        <JobGrid/>
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