import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './admin_info.scss'
import crypto from '../../../../service/crypto';
import { useNavigate } from 'react-router-dom';
import EditProfileForm from './EditProfileForm';

export default function Admin_info() {
  const navigate = useNavigate()
  const [editProfile , setEditProfile] = useState(false)

  const adminObj= crypto.verifyToken(localStorage.getItem("token"),import.meta.env.VITE_PRIVATE_KEY)
  return (
    <div className='info_container'>
      {editProfile && <EditProfileForm adminObj={adminObj} setEditProfile={setEditProfile}/>}
        <h1 className='admin_title'>Adminstrator Info</h1>
        <div className='admin_detail'>
          <img src={adminObj.avatar} alt="" />
          <ul>
            <li>Admin ID: {adminObj.id}</li>
            <li>Admin Name: {adminObj.firstname} {adminObj.lastname}</li>
            <li>User Name: {adminObj.username}</li>
            <li>Email: {adminObj.email}</li>
            <li>B.O.D: {adminObj.birthday}</li>
            <button className='adminInfo-btn' onClick={()=>{setEditProfile(true)}}>Edit Profile</button>
            <button className='adminInfo-btn' onClick={()=>{navigate("/")}}>Get Back To Home Page</button>
          </ul>
        </div>
    </div>
  )
}
