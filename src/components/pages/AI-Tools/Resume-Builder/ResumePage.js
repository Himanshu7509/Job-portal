import React from 'react'
import Header from '../../../common/header/Header'
import ResumeBuilder from './Builder/ResumeBuilder'
import Footer from '../../../common/footer/Footer'

const ResumePage = () => {
  return (
    <div>
        <Header/>
        <ResumeBuilder/>
        <Footer/>
    </div>
  )
}

export default ResumePage