import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../../service'
import { useDispatch } from 'react-redux'
import { loginUserAction } from '../../../store/slices/loginUserDetail.reducer'
import { useParams } from 'react-router-dom'

export default function AllProducts() {
  const {category}= useParams()
  const productList = useSelector(store => store.productsStore).data
  const renderProductList = !category ? productList : productList.filter(item => item.product_category == category || item.product_brand == category)
  const loginUserStore = useSelector(store => store.loginUserStore).user
  const dispatch = useDispatch()

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
            })
        }
      })
  }

return (
    <div className='productList_container'>
      <h1>All product</h1>
      <div className='productList'>
        {renderProductList && renderProductList.map(item => (
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
    </div>
  )
}
