import React from 'react'
import Header from '../../common/header/Header'
import JobFiltering from './filtering/JobFiltering'
import Footer from '../../common/footer/Footer'
import ExploreCompany from './explore-company/ExploreCompany'

const Categories = () => {
  return (
    <div>
        <Header/>
        <JobFiltering/>
        <ExploreCompany/>
        <Footer/>
    </div>
  )
}

export default Categories