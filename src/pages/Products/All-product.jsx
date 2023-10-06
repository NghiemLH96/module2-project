import React from 'react'
import { useSelector } from 'react-redux'
import './products.scss'
import { Outlet } from 'react-router-dom'
import { api } from '../../service'



export default function Allproduct() {

  return (
    <Outlet />
  )
}
