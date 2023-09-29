import React , {useState} from 'react'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

export default function Header() {
  const [login,setLogin] = useState(localStorage.getItem("token"))

  function logout(){
    if (confirm("Do you want to logout?")) {
      setLogin(localStorage.removeItem("token"))
    }
  }
  return (
    <header>
        <div className='header-container'>
            <img className='logo' src={logo} alt="" />
            <ul className='navbar'>
                <Link className='nav' to={"/"}>Home</Link>
                <Link className='nav' to={"/all-products"}>All Products</Link>
                <Link className='nav' to={"/contact"}>Contact</Link>
                <Link className='nav' to={"/about"}>About</Link>
            </ul>
            <div className='user-box'>
                <Link className='userBox-btn' to={"/register"}>Register</Link>
                { login ? <span onClick={()=>{logout()}} className='userBox-btn'>Logout</span> : <Link className='userBox-btn' to={"/login"}>Login</Link>}
                
                <img className='userAvatar' src="" alt="" />
                <span className='hello-word'>Hi, Nghiem</span>
            </div>
        </div>
        
        {/* <Link to={"/register"}>Register</Link>
        <Link to={"/login"}>Login</Link> */}
    </header>
  )
}
