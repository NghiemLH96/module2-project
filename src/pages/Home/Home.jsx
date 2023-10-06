import React from 'react'
import './home.scss'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SetAvatarForm from './windows/SetAvatarForm'
import { useState } from 'react'



export default function Home() {
  const [avatar,setAvatar] =useState(false)

  return (
    <div className='Home'>
      {avatar && <SetAvatarForm setAvatar={setAvatar}/>}
      <Header setAvatar={setAvatar}/>
      <div className='home-container'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
