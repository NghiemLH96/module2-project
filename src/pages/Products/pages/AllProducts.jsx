import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../../service'
import { useDispatch } from 'react-redux'
import { loginUserAction } from '../../../store/slices/loginUserDetail.reducer'
import { useParams } from 'react-router-dom'
import { Pagination } from 'antd';
import { Button, message, Space } from 'antd';


export default function AllProducts() {
  const {category}= useParams()
  const productList = useSelector(store => store.productsStore).data
  const loginUserStore = useSelector(store => store.loginUserStore).user
  const [sortBtn,setSortBtn] = useState(true)
  const [renderProductList,setRenderProductList] =useState([])
  const dispatch = useDispatch()
  
  useEffect(()=>{
    setRenderProductList(!category ? productList : productList.filter(item => item.product_category == category || item.product_brand == category))
    if (productList) { 
      handlePagination(currentPage)
    }
  },[productList])

  const info = () => {
    message.info('Product was added to your cart!');
  };
  
  async function addToCart(product) {
    await api.usersApi.findUserById(loginUserStore.id)
      .then(res => {
        const userCart = res.data.cart
        const check = userCart.find(item => item.id == product.id)
        if (!check) {
          const newUserCart = [...userCart, product]
          api.usersApi.setCart(loginUserStore.id, { cart: newUserCart })
            .then(res => {
              dispatch(loginUserAction.setCart(res.data.cart))
              info()
            })
        } else {
          const increaseQuantityCart = userCart.map(item => {
            if (item.id == product.id) {
              const updateProduct = { ...item }
              updateProduct.quantity += 1
              return updateProduct
            } else {
              return item
            }
          })
          api.usersApi.setCart(loginUserStore.id, { cart: increaseQuantityCart })
            .then(res => {
              dispatch(loginUserAction.setCart(res.data.cart))
              info()
            })
        }
      })
  }

  function handleSort(status){
    if(status){
      setRenderProductList([...renderProductList].sort((a,b)=>{
        return a.product_price - b.product_price
      }))
    }else{
      setRenderProductList([...renderProductList].sort((a,b)=>{
        return b.product_price - a.product_price
      }))
    }
  }

  function handleSearch(text){
    const searchProducts = productList.filter(item => item.product_name.toLowerCase().includes(text) || item.product_category.toLowerCase().includes(text) || item.product_brand.toLowerCase().includes(text))
    setRenderProductList(searchProducts)
    console.log(text);
  }
  
//pagination
const [currentPage,setCurrentPage] = useState(1)
const pageSize = 9
function handlePagination(page){
        scrollTo({top:0,behavior:"smooth"})
        
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
    <div className='productList_container'>
      <h1>All product</h1>
      <div className='toolBox'>
        <input onChange={(e)=>{handleSearch(e.target.value)}} type="text" placeholder='Search'/>
        <button onClick={()=>{setSortBtn(!sortBtn); handleSort(sortBtn)}} className='sort-btn'>{sortBtn ? "Sort by price low to high" : "Sort by price high to slow"}</button>
      </div>
      <div className='productList'>
        {!renderProductList ? <span> Empty </span> : renderProductList.map(item => (
          <div key={item.id} className='productCard'>
            <div className='zoom-image'>
              <img src={item.product_image} alt="" />
            </div>
            <ul>
              <li>Product Name: {item.product_name}</li>
              <li>Product Price: {item.product_price}</li>
              <li>Category: {item.product_category}</li>
              <li>Brand: {item.product_brand}</li>
            </ul>
            <button onClick={() => { addToCart(item) }}>Add To Cart</button>
          </div>
        ))}
      </div>
      <div className='pagination'>
      <Pagination  defaultCurrent={1} current={currentPage} total={productList.length} pageSize={pageSize} onChange={(page)=>{
          handlePagination(page)
          }}/>
      </div>
      
    </div>
  )
}
