import React from 'react'
import './register.scss'
import { api } from '../../service'
import crypto from '../../service/crypto'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Space } from 'antd';

export default function Register() {
  const navigate = useNavigate()
  if (localStorage.getItem("token")) {
    api.usersApi.findByUsername(crypto.verifyToken(localStorage.getItem("token"),import.meta.env.VITE_PRIVATE_KEY).username)
    .then(res=>{
      if (res.data.length > 0) {
        navigate("/")
      }
    })
  }

  const enrollSuccess = () => {
    Modal.success({
      content: 'Sign up success !',
      onOk(){
        navigate("/login")
      }
    });
  };

  let validate = true
  async function validateInfo(e) {
    e.preventDefault();
    validate=true
    const newUser ={
      id:Math.random()*Date.now(),
      username:e.target.querySelector(".user-name").value,
      firstname:e.target.querySelector(".first-name").value,
      lastname:e.target.querySelector(".last-name").value,
      email:e.target.querySelector(".email").value,
      passwords:crypto.createToken(e.target.querySelector(".passwords").value),
      birthday:e.target.querySelector(".birthday").value,
      admin:false,
      cart:[],
    }
    console.log(newUser);

    if (!newUser.firstname) {
      alert("firstname can't be empty")
    }

    if (!newUser.lastname) {
      alert("lastname can't be empty")
    }

    let findUserByName = await api.usersApi.findByUsername(newUser.username)
    if(findUserByName.data.length > 0 ){
      alert("account was existed!")
      validate=false
      console.log(validate);
    }
    
    if (newUser.username.split("").length<8) {
      alert("account should have more than 8 letters")
      validate=false
    }

    let findUserByEmail = await api.usersApi.findByEmail(newUser.email)
    if (findUserByEmail.data.length > 0) {
      alert("email was existed!")
      validate=false
    }

    let passwordsValidate = e.target.querySelector(".passwords").value.split("").length;
    if (passwordsValidate<8) {
      alert("passwords should have more than 8 letters")
      validate=false
    }

    if (!newUser.birthday) {
      alert("birthday is required!")
      validate=false
    }
    
    if(validate){
      await api.usersApi.register(newUser)
      enrollSuccess()

    }
  }




  return (
    <div className='register-container'>
        <div className='form-container'>
          <form className='enroll-form' onSubmit={(e)=>{validateInfo(e)}}>
            <h1>Register</h1>
            <div className='enroll-namebox'>
              <div>
                <label htmlFor="first-name">First name:</label>
                <input id="first-name" className='first-name' type="text" placeholder='Enter your first name'/>
              </div>
              <div>
                <label htmlFor="last-name">Last name:</label>
                <input id='last-name' className='last-name' type="text" placeholder='Enter your last name'/>
              </div>
            </div>
            <div className='enroll-detail'>
              <label htmlFor="user-name">User Name:</label>
              <input id='user-name' className='user-name' type="text" placeholder='Enter your user name'/>
            </div>
            <div className='enroll-detail'>
              <label htmlFor="passwords">Passwords:</label>
              <input id='passwords' className='passwords' type="password" placeholder='Enter your passwords'/>
            </div>
            <div className='enroll-detail'>
              <label htmlFor="birthday">Birthday:</label>
              <input id='birthday' className='birthday' type="date" />
            </div>
            <div className='enroll-detail'>
              <label htmlFor="email">Email Address:</label>
              <input id='email' className='email' type="text" placeholder='Enter your email'/>
            </div>
            <div className='enroll-detail'>
            <p className='err-msg'>Username was existed</p>
            <p className='err-msg'>password should be more than 8 letter</p>
            <p className='err-msg'>Email was existed</p>
            <p className='err-msg'>Email format not correct</p>
              <button>Create Account</button>
              <Link to={"/login"}>Sign in</Link>
            </div>
          </form>
        </div>
    </div>
  )
}
