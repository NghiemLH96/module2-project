import React from 'react'
import { api } from '../../service'
import crypto from '../../service/crypto'
import { Modal } from 'antd'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
const navigate = useNavigate()

  const SignInsuccess = () => {
    Modal.success({
      content: 'Log-in Successed!',
      onOk(){
        navigate("/")
      }
    });
  };

  if (localStorage.getItem("token")) {
    api.usersApi.findByUsername(crypto.verifyToken(localStorage.getItem("token"),import.meta.env.VITE_PRIVATE_KEY).username)
    .then(res=>{
      if (res.data.length > 0) {
        navigate("/")
      }
    })
  }

  async function handleLogin(e){
    e.preventDefault();
    const loginInfo={
      username:e.target.querySelector("#username").value,
      passwords:e.target.querySelector("#passwords").value
    }
    
    const findByUserName = await api.usersApi.findByUsername(loginInfo.username)
    if(findByUserName.data.length > 0){
      if (crypto.verifyToken(findByUserName.data[0].passwords,import.meta.env.VITE_PRIVATE_KEY) == loginInfo.passwords) {
        localStorage.setItem("token",crypto.createToken(findByUserName.data[0]));
        SignInsuccess()
      }else{
        alert("password incorrect!")
      }
    }else{
      alert("account wasn't exist!")
    }
  }

  return (
    <div className='login-container'>
        <div className='form-container'>
          <form className='login-form' onSubmit={(e)=>{handleLogin(e)}}>
            <h1>Sign in</h1>
            <div className='login-detail'>
              <label htmlFor="username">User Name:</label>
              <input id='username' type="text" placeholder='Enter your user name'/>
              <p>Account was not exist!</p>
            </div>
            <div className='login-detail'>
              <label htmlFor="passwords">Passwords:</label>
              <input id='passwords' type="password" placeholder='Enter your passwords'/>
              <p>Password should more than 8 letter</p>
              <p>Password</p>
            </div>
            <div className='login-detail'>
              <p className='err-msg'>This account wasn't exist</p>
              <p className='err-msg'>Passwords incorrect</p>
              <button>Log in</button>
            </div>
            <Link className='navigateLink' to={"/register"}>Create a new account</Link>
          </form>
        </div>
    </div>
  )
}
