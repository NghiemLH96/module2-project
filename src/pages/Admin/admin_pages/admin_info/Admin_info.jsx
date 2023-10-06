import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './admin_info.scss'
import crypto from '../../../../service/crypto';
import { useNavigate } from 'react-router-dom';
import EditProfileForm from './EditProfileForm';
import { api } from '../../../../service';
import ChangPasswordsForm from './ChangPasswordsForm';

export default function Admin_info() {
  const navigate = useNavigate()
  const [editProfile , setEditProfile] = useState(false)
  const [changePassword , setChangePasswords] = useState(false)

  const loginUser = useSelector(store => store.loginUserStore)

  return (
    <div className='info_container'>
      {editProfile && <EditProfileForm loginUserDetail={loginUser.user} setEditProfile={setEditProfile}/>}
      {changePassword && <ChangPasswordsForm setChangePasswords={setChangePasswords}/>}
        <h1 className='admin_title'>Adminstrator Info</h1>
        <div className='admin_detail'>
          <img src={loginUser.user && loginUser.user.avatar} alt="" />
          <ul>
            <li>Admin ID: {loginUser.user && loginUser.user.id}</li>
            <li>Admin Name: {loginUser.user && loginUser.user.firstname} {loginUser.user && loginUser.user.lastname}</li>
            <li>User Name: {loginUser.user && loginUser.user.username}</li>
            <li>Email: {loginUser.user && loginUser.user.email}</li>
            <li>B.O.D: {loginUser.user && loginUser.user.birthday}</li>
            <button className='adminInfo-btn' onClick={()=>{setEditProfile(true)}}>Edit Profile</button>
            <button className='adminInfo-btn' onClick={()=>{setChangePasswords(true)}}>Change passwords</button>
            <button className='adminInfo-btn' onClick={()=>{navigate("/")}}>Get Back To Home Page</button>
          </ul>
        </div>
    </div>
  )
}
