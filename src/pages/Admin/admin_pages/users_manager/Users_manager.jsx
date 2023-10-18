import React from 'react'
import './user_manager.scss'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../../../store'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { api } from '../../../../service';
import crypto from '../../../../service/crypto';
import { userAction } from '../../../../store/slices/userList.reducer';

export default function Users_manager() {
  const dispatch = useDispatch()
  const userList = useSelector( store => store.usersStore).user
  let renderUserList;
  if (userList) {
    renderUserList = userList.filter(user=> user.id != crypto.verifyToken(localStorage.getItem("token"),import.meta.env.VITE_PRIVATE_KEY))
  }
  

  const resetPasswordSuccess = () => {
    Modal.success({
      content: 'Passwords was reseted!',
      onOk(){
        return
      }
    });
  };


const { confirm } = Modal;
const destroyAll = () => {
  Modal.destroyAll();
};
const resetPasswords = (userId) => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <Button onClick={destroyAll()}>Are you sure to reset passwords?</Button>,
        onOk() {
          api.usersApi.resetPasswords(userId,{passwords:crypto.createToken("12345678")})
          resetPasswordSuccess()
        },
        onCancel() {
          return;
        },
      });
;
};

 const freezeUser = (userId , status) => {
  confirm({
    icon: <ExclamationCircleOutlined />,
    content: <Button onClick={destroyAll()}>Are you sure to freeze this user?</Button>,
    onOk() {
      api.usersApi.freezeUser(userId , {active:status})
      .then(res =>{
        api.usersApi.findAllUser()
        .then(res=>{
          dispatch(userAction.setUser(res.data))
        })
      })
    },
    onCancel() {
      return;
    },
  });
;
};

  return (
    <div className='page_container'>
      <h1 className='page_title'>User Managerment</h1>
      <table border={"1px solid"}>
        <thead>
          <tr>
            <th>#</th>
            <th style={{width:"200px"}}>User ID</th>
            <th>User Avatar</th>
            <th>Username</th>
            <th>User full name</th>
            <th style={{width:"200px"}}>User Email</th>
            <th>User Permission</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(renderUserList != null) && renderUserList.map((user,index) => (
            <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.id}</td>
              <td><img style={{width:"100px",height:"100px"}} src={user.avatar} alt="" /></td>
              <td>{user.username}</td>
              <td>{user.firstname + user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.admin ? "Admin" : "Member"}</td>
              <td className='userManager_btnBox'>
                <button className='userManager_btn resetPW' onClick={()=>{
                  resetPasswords(user.id)
                }}>Reset PW</button>
                {user.active ? <button className='userManager_btn freezeBtn' onClick={()=>{freezeUser(user.id,false)}}>freeze</button> : <button className='userManager_btn defreezeBtn' onClick={()=>{freezeUser(user.id,true)}}>defreeze</button>}
              </td>
          </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>Total Member</td>
            <td>{(renderUserList != null ) && renderUserList.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
