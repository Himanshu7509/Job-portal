import React from 'react'

import Signup from './components/auth/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/pages/home/Home'
import ATS_Checker from './components/pages/AI-Tools/ATS/ATS_Checker'
import Blog from './components/pages/Blogs/Blog'
import Categories from './components/pages/categories/Categories'
import Contact from './components/pages/contact/Contact'


const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/atschk' element={<ATS_Checker/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
