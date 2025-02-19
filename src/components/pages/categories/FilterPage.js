import React from 'react'
import Header from '../../common/header/Header'
import Jobs from './filtering/Jobs'
import Footer from '../../common/footer/Footer'
import { useLocation } from "react-router-dom";


const Categories = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTitle = queryParams.get("title") || "";
  const initialCategory = queryParams.get("categories") || "";

  return (
    <div>
        <Header/>
        <Jobs initialTitle={initialTitle} initialCategory={initialCategory} />
        <Footer/>
    </div>
  )
}

export default Categories