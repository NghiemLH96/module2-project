import React from 'react'

export default function EditProfileForm({adminObj,setEditProfile}) {
    
  return (
    <div className='addProduct_container'>
        <div className='addProduct_frame'>
            <h2>Edit Profile</h2>
            <form onSubmit={(e)=>{e.preventDefault()}}>
                <div className='addProduct_info'>
                    <label htmlFor="">First name:</label>
                    <input type="text" defaultValue={adminObj.firstname}/>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Last name:</label>
                    <input type="text" defaultValue={adminObj.lastname}/>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Username:</label>
                    <input type="text" defaultValue={adminObj.username}/>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Email:</label>
                    <input type="text" defaultValue={adminObj.email}/>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">D.O.B:</label>
                    <input type="date" defaultValue={adminObj.birthday}/>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Avatar:</label>
                    <input type="file" />
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
