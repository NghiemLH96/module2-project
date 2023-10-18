import React, { useEffect, useState } from 'react'
import '../users_manager/user_manager.scss'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../../../store'
import { api } from '../../../../service'
import { userAction } from '../../../../store/slices/userList.reducer'
import ViewOrder from './ViewOrder'

export default function Orders_manager() {
  const dispatch = useDispatch()
  const [viewOrderDetail, setViewOrderDetail] = useState(false)
  const [receipts , setReceipts] = useState([]);
  const [products , setProducts] = useState([])
  const usersStore = useSelector(store => store.usersStore).user || []


  useEffect(()=>{
    api.usersApi.findAllUser()
    .then(res=>{
      dispatch(userAction.setUser(res.data))
    })
  },[usersStore])
    
  
  useEffect(()=>{
    setReceipts(usersStore.map(user =>{
      return user.receipt
    }).flat())
    setProducts(receipts.map(receipt=>{
      return receipt.product
    }).flat())
  },[usersStore]) 

  const [viewOrder,setViewOrder] = useState({})
  function handleView(receipt){
    setViewOrder(receipt)
  }

  return (
    <div className='page_container'>
      {viewOrderDetail && <ViewOrder setViewOrderDetail={setViewOrderDetail} viewOrder={viewOrder}/>}
      <h1 className='page_title'>Orders Managerment</h1>
      <table border={"1px solid"}>
        <thead>
          <tr>
            <th>#</th>
            <th style={{width:"200px"}}>Order ID</th>
            <th>Buyer Username</th>
            <th>Item quantity</th>
            <th style={{width:"200px"}}>Total Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {receipts && receipts.map((receipt,index) =>(
            <tr key={receipt.receiptId}>
              <td>{index+1}</td>
              <td>{receipt.receiptId}</td>
              <td>{receipt.buyerName}</td>
              <td>{receipt.product.reduce((cur,val)=>{return cur += val.quantity},0)}</td>
              <td>{receipt.product.reduce((cur,val)=>{return cur += Number(val.product_price)},0)}</td>
              <td>
                <button className='view-btn' onClick={()=>{setViewOrderDetail(true); handleView(receipt)}}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>Total Orders: {(receipts != null ) && receipts.length}</td>
            <td colSpan={2}>Total Items: {(products != null ) && products.reduce((cur,val)=>{return cur+=val.quantity},0)}</td>
            <td colSpan={2}>Total Cost :{(products != null ) && products.reduce((cur,val)=>{return cur+=Number(val.product_price)},0)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
