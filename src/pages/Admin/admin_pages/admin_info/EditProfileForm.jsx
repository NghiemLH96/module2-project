import React from 'react'
import {api} from '../../../../service'
import { useDispatch } from 'react-redux';
import { userAction } from '../../../../store/slices/userList.reducer';
import { loginUserAction } from '../../../../store/slices/loginUserDetail.reducer';
import crypto from '../../../../service/crypto';
import { Modal } from 'antd';

export default function EditProfileForm({loginUserDetail,setEditProfile}) {
    const dispatch = useDispatch()

    const editProfileSuccess = () => {
        Modal.success({
          content: 'Edit profile successed!',
          onOk(){
            
          }
        });
      };

    async function handleEditProfile(e){
        e.preventDefault();
        const editUser={
            username: e.target.querySelector("#editUser_username").value,
            firstname: e.target.querySelector("#editUser_firstname").value,
            lastname: e.target.querySelector("#editUser_lastname").value,
            email:e.target.querySelector("#editUser_email").value,
            birthday:e.target.querySelector("#editUser_birthday").value,
        }
        const confirmPassword = prompt("Enter passwords")
        if (confirmPassword == crypto.verifyToken(loginUserDetail.passwords,import.meta.env.VITE_PRIVATE_KEY)) {
            await api.usersApi.editById(editUser,loginUserDetail.id);
            api.usersApi.findUserById(loginUserDetail.id)
            .then(res=>{
            dispatch(loginUserAction.setLoginUser(res.data))
            editProfileSuccess()
        })
        }else{
            alert("passwords incorrect!")
        }
        
        setEditProfile(false)
    }
  return (
    <div className='addProduct_container'>
        <div className='addProduct_frame'>
            <h2>Edit Profile</h2>
            <form onSubmit={(e)=>{handleEditProfile(e)}}>
                <div className='addProduct_info'>
                    <label htmlFor="">First name:</label>
                    <input id='editUser_firstname' type="text" defaultValue={loginUserDetail.firstname}/>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Last name:</label>
                    <input id='editUser_lastname' type="text" defaultValue={loginUserDetail.lastname}/>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Username:</label>
                    <input id='editUser_username' type="text" defaultValue={loginUserDetail.username}/>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Email:</label>
                    <input id='editUser_email' type="text" defaultValue={loginUserDetail.email}/>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">D.O.B:</label>
                    <input id='editUser_birthday' type="date" defaultValue={loginUserDetail.birthday}/>
                </div>
                <div className='addProduct_btnBox'>
                    <button className='action_btn' type='submit'>Edit</button>
                    <button className='cancel_btn' onClick={()=>{setEditProfile(false)}}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}
