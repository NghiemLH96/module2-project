import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Space } from 'antd';
import './register.scss'
import { api } from '../../service'
import crypto from '../../service/crypto'

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

//Success Notification
  const enrollSuccess = () => {
    Modal.success({
      content: 'Sign up success !',
      onOk(){
        navigate("/login")
      }
    });
  };

//Enroll function
  async function validateInfo(e) {
    e.preventDefault();
    let validate=true
    const newUser ={
      id:Math.random()*Date.now(),
      username:e.target.querySelector(".user-name").value,
      firstname:e.target.querySelector(".first-name").value,
      lastname:e.target.querySelector(".last-name").value,
      email:e.target.querySelector(".email").value,
      passwords:crypto.createToken(e.target.querySelector(".passwords").value),
      birthday:e.target.querySelector(".birthday").value,
      admin:false,
      active:true,
      avatar:"https://firebasestorage.googleapis.com/v0/b/module2-project-53e34.appspot.com/o/users-avatar%2Fdownload.png?alt=media&token=5385b2fb-7590-4146-a764-4ff818ec75e2&_gl=1*x797hd*_ga*NDg1NTQxNjU1LjE2OTU4MTYxMTc.*_ga_CW55HF8NVT*MTY5NjQ4NTUyNS4xNS4xLjE2OTY0ODU1NjQuMjEuMC4w",
      cart:[],
      receipt:[]
    }
    //infomation validate
      //fullName
    if (!newUser.firstname) {
      e.target.querySelector(".fn-empty").style.display="block"
      validate=false
    }

    if (!newUser.lastname) {
      e.target.querySelector(".lstn-empty").style.display="block"
      validate=false
    }
      //userName
    let findUserByName = await api.usersApi.findByUsername(newUser.username)
    if (newUser.username) {
      if (newUser.username.split("").length >8) {
        if(findUserByName.data.length > 0 ){
          e.target.querySelector(".usr-existed").style.display="block"
          validate=false
        }
      }else{
        e.target.querySelector(".usr-letters").style.display="block"
        validate=false
      }
    }else{
      e.target.querySelector(".usr-empty").style.display="block"
      validate=false
    }
    
      //email
    let validateEmail = {
      isEmail: function (emailString) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailString)
      }
    }
    if (newUser.email) {
      if(validateEmail.isEmail(newUser.email)){
        let findUserByEmail = await api.usersApi.findByEmail(newUser.email)
        if (findUserByEmail.data.length > 0) {
          e.target.querySelector(".email_existed").style.display="block"
          validate=false
        }
      }else{
        e.target.querySelector(".email_invalid").style.display="block"
        validate=false
      }
    }else{
      e.target.querySelector(".email_empty").style.display="block"
      validate=false
    }
    
    //Passwords
    const inputPW = crypto.verifyToken(newUser.passwords,import.meta.env.VITE_PRIVATE_KEY)
    if (inputPW) {
      if (inputPW.split("").length<8) {
        e.target.querySelector(".pw-letters").style.display="block"
        validate=false
      }
    }else{
      e.target.querySelector(".pw-empty").style.display="block"
      validate=false
    }

    //Confirm Passwords
    if (e.target.querySelector(".confirm_passwords").value) {
      if(e.target.querySelector(".confirm_passwords").value !== inputPW){
        e.target.querySelector(".cfpw-err").style.display="block"
        validate=false
      }
    }else{
      e.target.querySelector(".cfpw-empty").style.display="block"
      validate=false
    }
    
    //Birthday
    if (!newUser.birthday) {
      e.target.querySelector(".bd-empty").style.display="block"
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
                <input id="first-name" className='first-name' type="text" placeholder='Enter your first name' onChange={(e)=>{e.target.parentNode.querySelector(".fn-empty").style.display="none"}}/>
                <div className='err-messageBox'>
                  <span className='err_message fn-empty'>First name can't be empty !</span>
                </div>
              </div>
              <div>
                <label htmlFor="last-name">Last name:</label>
                <input id='last-name' className='last-name' type="text" placeholder='Enter your last name' onChange={(e)=>{e.target.parentNode.querySelector(".lstn-empty").style.display="none"}}/>
                <div className='err-messageBox'>
                  <span className='err_message lstn-empty'>Last name can't be empty !</span>
                </div>
              </div>
            </div>
            <div className='enroll-detail'>
              <label htmlFor="user-name">User Name:</label>
              <input id='user-name' className='user-name' type="text" placeholder='Enter your user name' onChange={(e)=>{
                e.target.parentNode.querySelector(".usr-empty").style.display="none";
                e.target.parentNode.querySelector(".usr-existed").style.display="none";
                e.target.parentNode.querySelector(".usr-letters").style.display="none";
                }}/>
              <div className='err-messageBox'>
                <span className='err_message usr-empty'>Username can't be empty !</span>
                <span className='err_message usr-existed'>Username was existed !</span>
                <span className='err_message usr-letters'>Username need more than 8 letters !</span>
              </div>
            </div>
            <div className='enroll-detail'>
              <label htmlFor="passwords">Passwords:</label>
              <input id='passwords' className='passwords' type="password" placeholder='Enter your passwords' onChange={(e)=>{
                e.target.parentNode.querySelector(".pw-empty").style.display="none";
                e.target.parentNode.querySelector(".pw-letters").style.display="none";
              }}/>
              <div className='err-messageBox'>
              <span className='err_message pw-empty'>Passwords can't be empty !</span>
                <span className='err_message pw-letters'>Passwords need more than 8 letter !</span>
              </div>
            </div>
            <div className='enroll-detail'>
              <label htmlFor="confirm_passwords">Confirm Passwords:</label>
              <input id='confirm_passwords' className='confirm_passwords' type="password" placeholder='Enter your passwords' onChange={(e)=>{
                e.target.parentNode.querySelector(".cfpw-empty").style.display="none";
                e.target.parentNode.querySelector(".cfpw-err").style.display="none";
              }}/>
              <div className='err-messageBox'>
                <span className='err_message cfpw-empty'>Confirm passwords can't be empty !</span>
                <span className='err_message cfpw-err'>Confirm passwords not match !</span>
              </div>
            </div>
            <div className='enroll-detail'>
              <label htmlFor="birthday">Birthday:</label>
              <input id='birthday' className='birthday' type="date" onChange={(e)=>{
                e.target.parentNode.querySelector(".bd-empty").style.display="none";
              }}/>
              <div className='err-messageBox'>
                <span className='err_message bd-empty'>Birthday can't be empty !</span>
              </div>
            </div>
            <div className='enroll-detail'>
              <label htmlFor="email">Email Address:</label>
              <input id='email' className='email' type="text" placeholder='Enter your email'onChange={(e)=>{
                e.target.parentNode.querySelector(".email_empty").style.display="none";
                e.target.parentNode.querySelector(".email_invalid").style.display="none";
                e.target.parentNode.querySelector(".email_existed").style.display="none";
              }}/>
              <div className='err-messageBox'>
                <span className='err_message email_empty'>Email can't be empty !</span>
                <span className='err_message email_invalid'>Email isn't valid !</span>
                <span className='err_message email_existed'>This email was existed !</span>
              </div>
            </div>
              <button>Create Account</button>
              <Link className='navigateLink' to={"/login"}>Sign in</Link>
          </form>
        </div>
    </div>
  )
}
