import React,{useEffect , useState , useRef} from 'react'
import './register.scss'
import axios from 'axios'

export default function Register() {
  const [usersList,setUsersList] = useState([])
  const errUserExist = useRef()

  useEffect(()=>{
    axios.get("http://localhost:3000/users")
    .then(res=>{
      setUsersList(res.data)
    })
  },[usersList])


  function handleAddAccount(e) {
    e.preventDefault();
    const newUser ={
      id:Math.random()*Date.now(),
      username:e.target.querySelector(".user-name").value,
      firstname:e.target.querySelector(".first-name").value,
      lastname:e.target.querySelector(".last-name").value,
      email:e.target.querySelector(".email").value,
      passwords:e.target.querySelector(".passwords").value,
      birthday:e.target.querySelector(".birthday").value,
      admin:false,
      cart:[],
    }

    //validate infor
    usersList.map(user=>{
      //validate username
        axios.post("http://localhost:3000/users",newUser)
    })
    e.target.querySelector(".first-name").value = "";
    e.target.querySelector(".user-name").value = "";
    e.target.querySelector(".last-name").value ="";
    e.target.querySelector(".email").value="";
    e.target.querySelector(".passwords").value="";
    e.target.querySelector(".birthday").value="";
  }

  return (
    <div className='register-container'>
        <div className='form-container'>
          <form className='enroll-form' onSubmit={(e)=>{handleAddAccount(e)}}>
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
            <p ref={errUserExist} className='err-msg'>Username was existed</p>
            <p className='err-msg'>password should be more than 8 letter</p>
            <p className='err-msg'>Email was existed</p>
            <p className='err-msg'>Email format not correct</p>
              <button>Create Account</button>
            </div>
          </form>
        </div>
    </div>
  )
}
