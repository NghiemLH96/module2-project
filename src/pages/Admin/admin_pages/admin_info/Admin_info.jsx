import React from 'react'
import { useSelector } from 'react-redux'
import './admin_info.scss'
import crypto from '../../../../service/crypto';

export default function Admin_info() {

  const adminObj= crypto.verifyToken(localStorage.getItem("token"),import.meta.env.VITE_PRIVATE_KEY)
  return (
    <div className='info_container'>
        <h1 className='admin_title'>Adminstrator Info</h1>
        <div className='admin_detail'>
          <img src="" alt="" />
          <ul>
            <li>Admin ID: {adminObj.id}</li>
            <li>Admin Name: {adminObj.firstname} {adminObj.lastname}</li>
            <li>User Name: {adminObj.username}</li>
            <li>Email: {adminObj.email}</li>
            <li>B.O.D: {adminObj.birthday}</li>
          </ul>
        </div>
    </div>
  )
}
