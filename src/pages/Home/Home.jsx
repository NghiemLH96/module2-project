import React from 'react'
import './home.scss'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'



export default function Home() {
  
  return (
    <div className='Home'>
      <Header/>
      <div className='home-container'>
        {/* <Routes>
              

        </Routes> */}
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
