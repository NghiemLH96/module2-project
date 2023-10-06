import React , {useEffect, useState} from 'react'
import './set.avatar.scss'
import { uploadFileToStorage } from '../../../../firebase'
import { useSelector , useDispatch } from 'react-redux'
import { store } from '../../../store'
import { api } from '../../../service'
import { loginUserAction } from '../../../store/slices/loginUserDetail.reducer'

export default function SetAvatarForm({setAvatar}) {
  const loginUserStore = useSelector(store => store.loginUserStore).user
  const [uploadImage , setUploadImage] = useState("https://firebasestorage.googleapis.com/v0/b/module2-project-53e34.appspot.com/o/users-avatar%2Fdownload.png?alt=media&token=5385b2fb-7590-4146-a764-4ff818ec75e2&_gl=1*x797hd*_ga*NDg1NTQxNjU1LjE2OTU4MTYxMTc.*_ga_CW55HF8NVT*MTY5NjQ4NTUyNS4xNS4xLjE2OTY0ODU1NjQuMjEuMC4w")

  useEffect(()=>{
    console.log(uploadImage);
  },[uploadImage])

  const dispatch = useDispatch()
  function handleChangeAvatar(e){
    console.log(uploadImage);
    e.preventDefault();
    api.usersApi.setAvatar(loginUserStore.id, {avatar:uploadImage})
    .then(res=>{
      dispatch(loginUserAction.setLoginUser(res.data))
      setAvatar(false)
    })
  }
  return (
    <div className='setAvatar-container'>
      <form className='setAvatar-form' onSubmit={(e)=>{handleChangeAvatar(e)}}>
        <h2>Avatar</h2>
        <img className='setAvatar-image' src={uploadImage} alt="" />
        <input className='upload-image' onChange={async (e)=>{
          const uploadUrl = await uploadFileToStorage(e.target.files[0],"user-avatar")
          setUploadImage(uploadUrl)
        }} type="file" />
        <div className='btnBox'>
          <button className='save'>Save</button>
          <button className='cancel' onClick={()=>{setAvatar(false)}}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
