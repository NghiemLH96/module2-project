import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from '../pages/Register/Register'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import Allproduct from '../pages/All-product'
import Contact from '../pages/Contact'
import About from '../pages/About'
import HomeBanner from '../pages/Home/HomeBanner'

export default function Body() {
  return (
    <div className='body'>
      <Routes>
        <Route path='/' element={<HomeBanner/>}></Route>
      </Routes>
      <div className='body-container'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/all-products' element={<Allproduct/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </div>
    </div>
  )
}
