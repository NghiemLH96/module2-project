import React, { useEffect ,useState } from 'react'
import axios from 'axios'

import './login.scss'

export default function Login() {
  const [usersList,setUsersList] = useState([])
  if (localStorage.getItem("token")) {
    window.location.href="/"
  }

  useEffect(()=>{
    axios.get("http://localhost:3000/users")
    .then(res=>{
      setUsersList(res.data)
    })
  },[usersList])

  function handleLogin(e){
    e.preventDefault();
    const loginUsername = e.target.querySelector("#username").value;
    const loginPasswords = e.target.querySelector("#passwords").value;
    const loginUser = usersList.find(user=> user.username == loginUsername)
    if (!loginUser) {
      alert("this account was not exist")
    }else{
      if (loginUser.passwords != loginPasswords) {
      alert("passwords incorrect")
      }else {
        localStorage.setItem("token",loginUser.id)
      }
    }

    e.target.querySelector("#username").value=""
    e.target.querySelector("#passwords").value=""
    alert("Log-in successed!")
    window.location.href="/"
  }
  return (
    <div className='login-container'>
        <div className='form-container'>
          <form className='login-form' onSubmit={(e)=>{handleLogin(e)}}>
            <h1>Sign in</h1>
            <div className='login-detail'>
              <label htmlFor="username">User Name:</label>
              <input id='username' type="text" placeholder='Enter your user name'/>
            </div>
            <div className='login-detail'>
              <label htmlFor="passwords">Passwords:</label>
              <input id='passwords' type="password" placeholder='Enter your passwords'/>
            </div>
            <div className='login-detail'>
              <p className='err-msg'>This account wasn't exist</p>
              <p className='err-msg'>Passwords incorrect</p>
              <button>Log in</button>
            </div>
          </form>
        </div>
    </div>
  )
}
