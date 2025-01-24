import React from 'react'
import Signup from './components/auth/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/pages/home/Home'
import Blog from './components/pages/Blogs/Blog'
import Categories from './components/pages/categories/Categories'
import Contact from './components/pages/contact/Contact'
import ATS from './components/pages/AI-Tools/ATS/ATS'
import ResumePage from './components/pages/AI-Tools/Resume-Builder/ResumePage'
import Salaries from './components/pages/Salaries/Salaries'
import UserDetails from './components/pages/users/UserDetails'


const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/salary' element={<Salaries/>}/>
          <Route path='/alljobs' element={<Categories/>}/>
          <Route path='/resbuild' element={<ResumePage/>}/>
          <Route path='/atschk' element={<ATS/>}/>
          <Route path='/user' element={<UserDetails/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
