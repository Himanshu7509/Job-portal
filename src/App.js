import React from 'react'

import Signup from './components/auth/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/pages/home/Home'


const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


// https://demoapus1.com/freeio/wp-content/uploads/2022/10/team5-150x150.jpg

// https://demoapus1.com/freeio/wp-content/uploads/2022/09/bg-video-150pngx150.

// https://demoapus1.com/freeio/wp-content/uploads/2022/10/team2-150x150.jpg

// https://demoapus1.com/freeio/wp-content/uploads/2022/10/9-150x150.jpg