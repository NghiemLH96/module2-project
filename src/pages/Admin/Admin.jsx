import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import './admin.scss'
import Admin_header from './admin_components/Admin_header'
import { Outlet } from 'react-router-dom'

export default function Admin() {



  return (
    <div className='admin-container'>
        <Admin_header/>
        <div>
          <Outlet/>
        </div>
    </div>
  )
}
