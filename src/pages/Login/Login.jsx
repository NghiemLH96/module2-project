import React from 'react'
import { Modal } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './login.scss'
import { api } from '../../service'
import crypto from '../../service/crypto'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //Login Success notification
  const SignInsuccess = () => {
    Modal.success({
      content: 'Log-in Successed!',
      onOk() {
        navigate("/")
      }
    });
  };

  const error = () => {
    Modal.error({
      title: 'Login faild!',
      content: 'Account was freezed! Kindly contact customer service for more detail.',
    });
  };

  //Verify Login Status
  if (localStorage.getItem("token")) {
    api.usersApi.findByUsername(crypto.verifyToken(localStorage.getItem("token"), import.meta.env.VITE_PRIVATE_KEY).username)
      .then(res => {
        if (res.data.length > 0) {
          navigate("/")
        }
      })
  }

  //Login Function
  async function handleLogin(e) {
    e.preventDefault();
    //Get Login Form Info
    const loginInfo = {
      username: e.target.querySelector("#username").value,
      passwords: e.target.querySelector("#passwords").value
    }
    //Verify Login Detail
    const findByUserName = await api.usersApi.findByUsername(loginInfo.username)
    if (loginInfo.username) {
      if (findByUserName.data.length) {
        console.log(findByUserName.data[0].active);
        if (findByUserName.data[0].active) {
          if (loginInfo.passwords) {
            if (crypto.verifyToken(findByUserName.data[0].passwords, import.meta.env.VITE_PRIVATE_KEY) == loginInfo.passwords) {
              localStorage.setItem("token", crypto.createToken(findByUserName.data[0].id));
              SignInsuccess()
            } else {
              e.target.parentNode.querySelector(".pw-incorrect").style.display = "block"
            }
          } else {
            e.target.parentNode.querySelector(".pw-empty").style.display = "block"
          }

        } else {
          error()
        }
      } else {
        e.target.parentNode.querySelector(".usr-not_existed").style.display = "block"
      }
    } else {
      e.target.parentNode.querySelector(".usr-empty").style.display = "block"
    }
  }

  return (
    <div className='login-container'>
      <div className='form-container'>
        <form className='login-form' onSubmit={(e) => { handleLogin(e) }}>
          <h1>Sign in</h1>
          <div className='login-detail'>
            <label htmlFor="username">User Name:</label>
            <input id='username' type="text" placeholder='Enter your user name' onChange={(e) => {
              e.target.parentNode.querySelector(".usr-empty").style.display = "none";
              e.target.parentNode.querySelector(".usr-not_existed").style.display = "none";
              e.target.parentNode.querySelector(".usr-freezed").style.display = "none";
            }} />
            <div className='err_messageBox'>
              <p className='err_message usr-empty'>Account can't be empty !</p>
              <p className='err_message usr-not_existed'>Account was not exist !</p>
              <p className='err_message usr-freezed'>Account was freezed !</p>
            </div>
          </div>
          <div className='login-detail'>
            <label htmlFor="passwords">Passwords:</label>
            <input id='passwords' type="password" placeholder='Enter your passwords' onChange={(e) => {
              e.target.parentNode.querySelector(".pw-empty").style.display = "none";
              e.target.parentNode.querySelector(".pw-incorrect").style.display = "none";
            }} />
            <div className='err_messageBox'>
              <p className='err_message pw-empty'>Password can't be empty !</p>
              <p className='err_message pw-incorrect'>Passwords incorrect !</p>
            </div>
          </div>
          <div className='login-detail'>
            <button>Log in</button>
          </div>
          <Link className='navigateLink' to={"/register"}>Create a new account</Link>
        </form>
      </div>
    </div>
  )
}
