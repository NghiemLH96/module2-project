import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../store/slices/userList.reducer';



export default function Header() {
const loginUser = useSelector( store => store.usersStore.user)

const navigate = useNavigate()
const dispatch = useDispatch()

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
          dispatch(userAction.removeUser())
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
                <Link className='nav' to={"/all-products"}>All Products</Link>
                <Link className='nav' to={"/contact"}>Contact</Link>
                <Link className='nav' to={"/about"}>About</Link>
            </ul>
            <div className='user-box'>      
                { !loginUser && <Link className='userBox-btn' to={"/register"}>Register</Link>}
                { loginUser && (loginUser.admin && <span onClick={()=>{navigate("/admin")}} className='userBox-btn'>Admin</span>)}
                { loginUser ? <span onClick={()=>{showConfirm()}} className='userBox-btn'>Logout</span> : <Link className='userBox-btn' to={"/login"}>Login</Link>}
                { loginUser && <img className='userAvatar' src={loginUser.avatar} alt="" />}
                { loginUser && <span className='hello-word'>Hi,{loginUser.firstname}</span>}
            </div>
        </div>
    </header>
  )
}
