import React , {useEffect, useState} from 'react'
import AddProductForm from './AddProductForm';
import './products_manager.scss'
import { api } from '../../../../service';
import { useDispatch ,useSelector } from 'react-redux';
import { productAction } from '../../../../store/slices/productList.reducer';
import { store } from '../../../../store';

export default function Products_manager() {
    const dispatch = useDispatch()
    const [addProductForm, setAddProductForm] = useState(false)
    useEffect(()=>{
        api.productsApi.findAllProducts()
        .then(res =>{
            dispatch(productAction.setProducts(res.data))
        })
    },[])
    const productList = useSelector( store => store.productsStore).data

  return (
    <div className='page_container'>
        <h1 className='page_title'>Product Managerment</h1>
        {addProductForm && <AddProductForm setAddProductForm={setAddProductForm}/>}
        <button className='addProduct_btn' onClick={()=>{setAddProductForm(true)}}>Add New Product</button>
        <table border={"1px solid"}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Product Image</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {productList.map((item,index) => (
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.product_name}</td>
                        <td><img src={item.product_image} alt="" /></td>
                        <td>{item.product_category}</td>
                        <td>{item.product_brand}</td>
                        <td>{item.product_price}</td>
                        <td>{item.product_status ? "Available" : "Sold Out"}</td>
                        <td>{item.product_inventory}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot></tfoot>
        </table>
    </div>
  )
}
