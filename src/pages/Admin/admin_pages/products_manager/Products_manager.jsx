import React , {useState} from 'react'
import AddProductForm from './AddProductForm';
import './products_manager.scss'

export default function Products_manager() {
    const [addProductForm, setAddProductForm] = useState(false)
    console.log(addProductForm);
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
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
            <tfoot></tfoot>
        </table>
    </div>
  )
}
