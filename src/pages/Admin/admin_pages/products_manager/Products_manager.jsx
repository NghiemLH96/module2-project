import React , {useEffect, useState} from 'react'
import AddProductForm from './AddProductForm';
import { useDispatch ,useSelector } from 'react-redux';
import './products_manager.scss'
import { api } from '../../../../service';
import { productAction } from '../../../../store/slices/productList.reducer';
import EditProductForm from './EditProductForm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import {Pagination} from 'antd';

export default function Products_manager() {
    const dispatch = useDispatch()
    const [addProductForm, setAddProductForm] = useState(false)
    const [editProductForm , setEditProductForm] = useState(false)
    const [editingProduct , setEditingProduct] =useState({})
    const [renderProductList,setRenderProductList] = useState([])

    const { confirm } = Modal;
    const destroyAll = () => {
    Modal.destroyAll();
    };
    const confirmDelete = (productId) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: <Button onClick={destroyAll()}>Are you sure to quit?</Button>,
            onOk() {
                api.productsApi.deleteById(productId);
                dispatch(productAction.deleteProduct(productId))
            },
            onCancel() {
            return;
            },
        });
    ;
    };

    
    const productList = useSelector( store => store.productsStore).data
    useEffect(()=>{
        api.productsApi.findAllProducts()
        .then(res =>{
            dispatch(productAction.setProducts(res.data))
            setRenderProductList(res.data)
        })
        if (productList) { 
            handlePagination(currentPage)
          }
    },[productList])

    //pagination
    const [currentPage,setCurrentPage] = useState(1)
    const pageSize = 10
    function handlePagination(page){
            const min = (page - 1)*pageSize
            const max = page * pageSize
            const pageRender = []
            for (let i = 0; i < productList.length; i++) {
            if (i>=min && i<max) {
                pageRender.push(productList[i])
            } 
            }
            if (pageRender[0]) {
            setRenderProductList(pageRender)
            setCurrentPage(page)
            }
    }

  return (
    <div className='page_container'>
        <h1 className='page_title'>Product Managerment</h1>
        {addProductForm && <AddProductForm setAddProductForm={setAddProductForm}/>}
        {editProductForm && <EditProductForm setEditProductForm={setEditProductForm} editingProduct={editingProduct}/>}
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
                    <th>Inventory</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {renderProductList.map((item,index) => (
                    <tr key={item.id}>
                        <td>{index+1+(currentPage*pageSize-pageSize)}</td>
                        <td>{item.product_name}</td>
                        <td><img src={item.product_image} alt="" /></td>
                        <td>{item.product_category}</td>
                        <td>{item.product_brand}</td>
                        <td>{item.product_price}</td>
                        <td>{item.product_status ? "Available" : "Sold Out"}</td>
                        <td>{item.product_inventory}</td>
                        <td className='action_btnBox'>
                            <button onClick={()=>{setEditProductForm(true);setEditingProduct(item)}} className='edit_btn' >Edit</button>
                            <button onClick={()=>{confirmDelete(item.id)}}className='delete_btn'>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot></tfoot>
        </table>
        <div className='pagination'>
            <Pagination  defaultCurrent={1} current={currentPage} total={productList.length} pageSize={pageSize} onChange={(page)=>{
            handlePagination(page)}}/>
        </div>

    </div>
  )
}
