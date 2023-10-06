import React, { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import './cart.scss';
import { store } from '../../store';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { api } from '../../service';
import { loginUserAction } from '../../store/slices/loginUserDetail.reducer';
import { userAction, usersReducer } from '../../store/slices/userList.reducer';

export default function Cart() {
    const dispatch = useDispatch()
    const loginUserStore = useSelector(store => store.loginUserStore).user

    useEffect(()=>{
        if (loginUserStore) {
            api.usersApi.findUserById(loginUserStore.id)
            .then(res=>{
            dispatch(loginUserAction.setLoginUser(res.data))
            })
        }   
    },[loginUserStore])

//CheckOut one product    
    const { confirm } = Modal;
    const destroyAll = () => {
    Modal.destroyAll();
    };
    const confirmCheckOut = (productId) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: <Button onClick={destroyAll()}>Are you sure to checkout this product?</Button>,
            onOk() {
                api.usersApi.findUserById(loginUserStore.id)
                .then(res=>{
                    const userCart = res.data.cart
                    const userReceipt = res.data.receipt
                    const checkOutReceipt = {
                        receiptId:Math.random()*Date.now(),
                        buyerName:res.data.username,
                        product:[userCart.find(item => item.id == productId)]
                    }
                    const newUserCart = userCart.filter(item => item.id != productId)
                    api.usersApi.setCart(loginUserStore.id,{cart:newUserCart})
                    .then(res => {
                        dispatch(loginUserAction.setLoginUser(res.data))
                    })
                    api.usersApi.findAllUser()
                    .then(res=>{
                        dispatch(userAction.setUser(res.data))
                        console.log("vao");
                    })
                    
                    api.usersApi.setReceipt(loginUserStore.id,{receipt:[...userReceipt,checkOutReceipt]})
                })
            },
            onCancel() {
            return;
            },
        });
    ;
    };

//CheckOut All
    const confirmCheckOutAll = () => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: <Button onClick={destroyAll()}>Are you sure to checkout all products?</Button>,
            async onOk() {
                const checkOutCart=[...loginUserStore.cart];
                const currentReceipts = [...loginUserStore.receipt]
                api.usersApi.setReceipt(loginUserStore.id,{receipt:[...loginUserStore.receipt,{
                    receiptId:Math.random()*Date.now(),
                    buyerName:loginUserStore.username,
                    product:checkOutCart}]})
                api.usersApi.setCart(loginUserStore.id,{cart:[]})
                    .then(res=>{
                        dispatch(loginUserAction.setLoginUser(res.data)) 
                    })
                api.usersApi.findAllUser()
                .then(res=>{
                    dispatch(userAction.setUser(res.data))
                    console.log("vao");
                })
            },
            onCancel() {
            return;
            },
        });
    ;
    };

    const confirmClearCart = () => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: <Button onClick={destroyAll()}>Are you sure to remove all products?</Button>,
            onOk() {
                api.usersApi.setCart(loginUserStore.id,{cart:[]})
                    .then(res=>{
                        dispatch(loginUserAction.setLoginUser(res.data)) 
                })
            },
            onCancel() {
            return;
            },
        });
    ;
    };

    const confirmRemove = (productId) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: <Button onClick={destroyAll()}>Are you sure to remove?</Button>,
            onOk() {
                api.usersApi.findUserById(loginUserStore.id)
                .then(res=>{
                    const userCart= res.data.cart
                    const newUserCart = userCart.filter(item =>
                        item.id != productId
                    )
                    api.usersApi.setCart(loginUserStore.id,{cart:newUserCart})
                    .then(res =>{
                        dispatch(loginUserAction.setLoginUser(res.data))
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
    <div className='cart_container'>
        <h1>Cart</h1>
        <table border={"1px solid"}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {loginUserStore && loginUserStore.cart.length != 0 ? loginUserStore.cart.map((item,index)=>(
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td><img src={item.product_image} alt="" /></td>
                        <td>{item.product_name}</td>
                        <td>{item.product_price}</td>
                        <td>{item.quantity}</td>
                        <td>
                            <button className='check-out' onClick={async ()=>{confirmCheckOut(item.id)}}>Check Out</button>
                            <button className='remove' onClick={async () =>{confirmRemove(item.id)}}>Remove</button>
                        </td>
                    </tr>
                )) : <tr>
                        <td colSpan={6}>Empty</td>
                    </tr>}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}>Total</td>
                    <td>{loginUserStore && loginUserStore.cart.reduce((cur,value)=>cur+= value.quantity * value.product_price,0)}</td>
                    <td>{loginUserStore && loginUserStore.cart.reduce((cur,value)=>cur+value.quantity,0)}</td>
                    <td>
                        <button className='checkOutAll' onClick={async ()=>{confirmCheckOutAll()}}>Check-out All</button>
                        <button className='removeAll' onClick={async()=>{confirmClearCart()}}>Remove All</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
  )
}
