import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../store/slices/userList.reducer';
import crypto from '../service/crypto';
import { store } from '../store';
import { api } from '../service';
import { loginUserAction } from '../store/slices/loginUserDetail.reducer';
import { productAction } from '../store/slices/productList.reducer';





export default function Header({setAvatar}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()



  useEffect(()=>{
    if (localStorage.getItem("token")) {
      api.usersApi.findUserById(crypto.verifyToken(localStorage.getItem("token"),import.meta.env.VITE_PRIVATE_KEY))
      .then(res=>{
        dispatch(loginUserAction.setLoginUser(res.data))
        dispatch(loginUserAction.setCart(res.data.cart))
      })
    }

    api.productsApi.findAllProducts()
    .then(res=>{
      dispatch(productAction.setProducts(res.data))
    })
  },[])
const loginUser = useSelector( store => store.loginUserStore) 

const { confirm } = Modal;
const destroyAll = () => {
  Modal.destroyAll();
};
const showConfirm = () => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <Button onClick={destroyAll()}>Are you sure to quit?</Button>,
        onOk() {
          localStorage.removeItem("token")
          dispatch(loginUserAction.removeLoginUser())
        },
        onCancel() {
          return;
        },
      });
;
};

  return (
    <header>

        <div className='header-container'>
            <img className='logo' src="https://firebasestorage.googleapis.com/v0/b/module2-project-53e34.appspot.com/o/image%2Flogo.png?alt=media&token=1b6eedea-2fda-4147-a92c-52da375c557b&_gl=1*a020vb*_ga*NDg1NTQxNjU1LjE2OTU4MTYxMTc.*_ga_CW55HF8NVT*MTY5NjE3MTUxNS41LjEuMTY5NjE3MTU5MS40NS4wLjA." alt="" />
            <ul className='navbar'>
                <Link className='nav' to={"/"}>Home</Link>
                <Link className='nav' to={"/all-products"}>Products</Link>
                <Link className='nav' to={"/contact"}>Contact</Link>
                <Link className='nav' to={"/about"}>About</Link>
                <Link className='nav' to={"/cart"}>Cart</Link>
            </ul>
            <div className='user-box'>      
                { !loginUser.user && <Link className='userBox-btn' to={"/register"}>Register</Link>}
                { loginUser.user && (loginUser.user.admin && <span onClick={()=>{navigate("/admin")}} className='userBox-btn'>Admin</span>)}
                { loginUser.user ? <span onClick={()=>{showConfirm()}} className='userBox-btn'>Logout</span> : <Link className='userBox-btn' to={"/login"}>Login</Link>}
                { loginUser.user && <img onClick={()=>{setAvatar(true)}} className='userAvatar' src={loginUser.user.avatar} alt="" />}
                { loginUser.user && <span className='hello-word'>Hi,{loginUser.user.firstname}</span>}
                { loginUser.user && <div className='cartBox'>
                  <span className="material-symbols-outlined cart_icon">shopping_cart</span>
                  <span className='cart_quantity'>{loginUser.cart.reduce((cur,value) => cur + value.quantity,0)}</span>
                  </div>}
            </div>
        </div>
    </header>
  )
}
