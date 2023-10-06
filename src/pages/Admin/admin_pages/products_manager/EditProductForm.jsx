import React,{ useState , useEffect } from 'react'
import { uploadFileToStorage } from '../../../../../firebase';
import { api } from '../../../../service'
import { useDispatch } from 'react-redux';
import { productAction } from '../../../../store/slices/productList.reducer';
import { Modal } from 'antd';

export default function EditProductForm({setEditProductForm,editingProduct}) {
    const dispatch = useDispatch()

    const productEditSuccess = () => {
        Modal.success({
          content: 'Product was edited!',
          onOk(){
            api.productsApi.findAllProducts()
        .then(res=>{
            dispatch(productAction.setProducts(res.data))
        })
        setEditProductForm(false)
          }
        });
      };

    async function handleEditProduct(e){
        e.preventDefault();
        const editProduct={
            id:editingProduct.id,
            product_name:e.target.querySelector("#product_name").value,
            product_price:e.target.querySelector("#product_price").value,
            product_category:e.target.querySelector("#product_category").value,
            product_brand:e.target.querySelector("#product_brand").value,
            product_status:e.target.querySelector("#product_status").value,
            product_inventory:e.target.querySelector("#product_inventory").value,
        }
        await api.productsApi.editById(editProduct)
        productEditSuccess()
    }
  return (
    <div className='addProduct_container'>
        <div className='addProduct_frame'>
            <h2>Edit Product</h2>
            <form onSubmit={(e)=>{handleEditProduct(e)}}>
                <div className='addProduct_info'>
                    <label htmlFor="product_name">Product name:</label>
                    <input /* onChange={(e)=>{setAddProductName(e.target.value)}} */ defaultValue={editingProduct.product_name}  id='product_name' type="text" />
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="product_price">Price:</label>
                    <input /* onChange={(e)=>{setAddProductPrice(e.target.value)}} */ defaultValue={editingProduct.product_price} id="product_price" type="number" />
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="product_category">Category:</label>
                    <select defaultValue={editingProduct.product_category} /* onChange={(e)=>{setAddProductCategory(e.target.value)}} */ id="product_category" name="">
                        <option disabled value="None">--Select Category--</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Projector">Projector</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="product_brand">Brand:</label>
                    <select defaultValue={editingProduct.product_brand} /* onChange={(e)=>{setAddProductBrand(e.target.value)}} */  id="product_brand">
                        <option disabled value="None">--Select Brand--</option>
                        <option value="Predator">Predator</option>
                        <option value="ASUS TUF">ASUS TUF</option>
                        <option value="ASUS ROG">ASUS ROG</option>
                        <option value="ALIENWARE">ALIENWARE</option>
                        <option value="GIGABYTE AORUS">GIGABYTE AORUS</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Status:</label>
                    <select defaultValue={editingProduct.product_status} /* onChange={(e)=>{setAddProductStatus(e.target.value)}} */ name="" id="product_status">
                        <option disabled value={false}>--Select Status--</option>
                        <option value={true}>AVAILABLE</option>
                        <option value={false}>SOLD OUT</option>
                    </select>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="product_inventory">Inventory:</label>
                    <input id="product_inventory" defaultValue={editingProduct.product_inventory}/* onChange={(e)=>{setAddProductInventory(e.target.value)}} */ type="number" max={99} min={0}/>
                </div>
                <div className='addProduct_btnBox'>
                    <button className='action_btn' type='submit'>Edit</button>
                    <button className='cancel_btn' onClick={()=>{setEditProductForm(false)}}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}