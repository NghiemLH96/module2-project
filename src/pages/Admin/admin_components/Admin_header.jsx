import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import crypto from '../../../service/crypto'
import { useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useDispatch , useSelector } from 'react-redux';
import { userAction } from '../../../store/slices/userList.reducer';
import { store } from '../../../store';
import { api } from '../../../service';
import { loginUserAction } from '../../../store/slices/loginUserDetail.reducer';

export default function Admin_header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()


   useEffect(()=>{
    api.usersApi.findUserById(crypto.verifyToken(localStorage.getItem("token"),import.meta.env.VITE_PRIVATE_KEY))
    .then(res=>{
      if (!res.data.admin) {
        navigate("/")
      }
      dispatch(loginUserAction.setLoginUser(res.data))
    })

    api.usersApi.findAllUser()
    .then(res=>{
      dispatch(userAction.setUser(res.data))
    })
   },[])

    const loginUser = useSelector(store => store.loginUserStore)


    const { confirm } = Modal;
    const destroyAll = () => {
        Modal.destroyAll();
      };
    const showConfirm = () => {
        confirm({
          icon: <ExclamationCircleOutlined/>,
          content: <Button onClick={destroyAll()}>Are you sure to quit?</Button>,
          onOk() {
            localStorage.removeItem("token")
            dispatch(loginUserAction.removeLoginUser())
            navigate("/")
          },
          onCancel() {
            console.log("vao");
            return;
          },
        });
  ;
  };

  return (
    <header>
        <div className='header-container'>
            <img onClick={()=>{navigate("/")}} className='logo' src="https://firebasestorage.googleapis.com/v0/b/module2-project-53e34.appspot.com/o/image%2Flogo.png?alt=media&token=1b6eedea-2fda-4147-a92c-52da375c557b&_gl=1*a020vb*_ga*NDg1NTQxNjU1LjE2OTU4MTYxMTc.*_ga_CW55HF8NVT*MTY5NjE3MTUxNS41LjEuMTY5NjE3MTU5MS40NS4wLjA." alt="" />
            <ul className='navbar'>
                <Link className='nav' to={"/admin"}>Admin Info</Link>
                <Link className='nav' to={"/admin/products-manager"}>Products Managerment</Link>
                <Link className='nav' to={"/admin/users-manager"}>Users Managerment</Link>
                <Link className='nav' to={"/admin/orders-manager"}>Orders Managerment</Link>
            </ul>
            <div className='user-box'>      
                <span onClick={()=>{showConfirm()}} className='userBox-btn'>Logout</span>
                <img className='userAvatar' src={loginUser.user && loginUser.user.avatar} alt="" />
                <span className='hello-word'>Hi,{loginUser.user && loginUser.user.firstname}</span>
            </div>
        </div>
    </header>
  )
}
