import React from 'react'
import crypto from '../../../../service/crypto'
import { useSelector , useDispatch } from 'react-redux'
import { store } from '../../../../store'
import { api } from '../../../../service'
import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { loginUserAction } from '../../../../store/slices/loginUserDetail.reducer'

export default function ChangPasswordsForm({setChangePasswords}) {
    const loginUser = useSelector(store=>store.loginUserStore).user
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changePasswordsSuccess = () => {
        Modal.success({
          content: 'password was changed! please log in again!',
          onOk(){
            localStorage.removeItem("token")
            dispatch(loginUserAction.removeLoginUser())
            navigate("/")
          }
        });
      };

    function handleChangePasswords(e){
        e.preventDefault()
        const currentPasswords = crypto.verifyToken(loginUser.passwords,import.meta.env.VITE_PRIVATE_KEY)
        const inputPasswords = e.target.querySelector("#current_passwords").value;
        if (currentPasswords == inputPasswords) {
            const newPasswords = e.target.querySelector("#new_passwords").value;
            const confirmNewPasswords = e.target.querySelector("#confirm_passwords").value;
            if (newPasswords == confirmNewPasswords) {
                api.usersApi.changePassword(loginUser.id,{passwords:crypto.createToken(newPasswords,import.meta.env.VITE_PRIVATE_KEY)})
                setChangePasswords(false)
                changePasswordsSuccess()
            }else{
                alert("Confirm Passwords Not Match!")
            }
        }else{
            alert("Enter passwords incorrect!")
        }
    }
  return (
    <div className='addProduct_container'>
        <div className='addProduct_frame'>
            <h2>Change Passwords</h2>
            <form onSubmit={(e)=>{handleChangePasswords(e)}}>
                <div className='addProduct_info'>
                    <label htmlFor="">Passwords:</label>
                    <input id='current_passwords' type="text"/>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">New Passwords:</label>
                    <input id='new_passwords' type="text"/>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Confirm Passwords:</label>
                    <input id='confirm_passwords' type="text"/>
                </div>
                <div className='addProduct_btnBox'>
                    <button className='action_btn' type='submit'>Save</button>
                    <button className='cancel_btn' onClick={()=>{setChangePasswords(false)}}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}
