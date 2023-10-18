import React from 'react'
import './viewOrder.scss'

export default function ViewOrder({setViewOrderDetail , viewOrder}) {
  return (
    <div className='viewOrder-container'>
        <div className='viewOrder-box'>
            <h2>Order Detail</h2>
            <table border={"1px solid"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th style={{width:"200px"}}>Order ID</th>
                    <th>Product Image</th>
                    <th>Product name</th>
                    <th>Item quantity</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th style={{width:"200px"}}>Total Cost</th>
                </tr>
                </thead>
                <tbody>
                    {viewOrder.product.map((item,index)=>(
                        <tr>
                            <td className='number'>{index+1}</td>
                            <td>{item.id}</td>
                            <td><img src={item.product_image} alt="" /></td>
                            <td>{item.product_name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.product_brand}</td>
                            <td>{item.product_price}</td>
                            <td>{item.product_price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}>Total item: {viewOrder.product.reduce((cur,val)=>{return cur += val.quantity},0)}</td>
                        <td colSpan={4}>Total Cost: {viewOrder.product.reduce((cur,val)=>{return cur += Number(val.product_price)},0)}</td>
                    </tr>
                </tfoot>
            </table>
            <button className='close-btn' onClick={()=>{
                setViewOrderDetail(false)
            }}> Close </button>
        </div>
    </div>
  )
}
