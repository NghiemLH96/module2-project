import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import './admin.scss'
import crypto from '../../service/crypto'

export default function Admin() {
  if (crypto.verifyToken(localStorage.getItem("token"),import.meta)) {
    
  }

  const [usersList,setUsersList] = useState([])

    axios.get("http://localhost:3000/users")
    .then(res=>{
      setUsersList(res.data)
    })


  return (
    <div className='admin-container'>
        <h2>Admin Managerment</h2>
        <div className='admin-content'>
          <div className='admin-detail'>

          </div>
          <div>
              
          </div>
        </div>
    </div>
  )
}
