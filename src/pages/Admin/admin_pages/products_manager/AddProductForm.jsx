import React from 'react'

export default function AddProductForm({setAddProductForm}) {
  return (
    <div className='addProduct_container'>
        <div className='addProduct_frame'>
            <h2>Add new product</h2>
            <form onSubmit={(e)=>{e.preventDefault()}}>
                <div className='addProduct_info'>
                    <label htmlFor="">Product name:</label>
                    <input type="text" />
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Price:</label>
                    <input type="number" />
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Category:</label>
                    <select name="" id="">
                        <option value="">Desktop</option>
                        <option value="">Laptop</option>
                        <option value="">Projector</option>
                        <option value="">Accessories</option>
                        <option value="">Monitor</option>
                    </select>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Brand:</label>
                    <select name="" id="">
                        <option value="">Predator</option>
                        <option value="">ASUS TUF</option>
                        <option value="">ASUS ROG</option>
                        <option value="">ALIENWARE</option>
                        <option value="">GIGABYTE AORUS</option>
                        <option value="">OTHER</option>
                    </select>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="">Status:</label>
                    <select name="" id="">
                        <option value="">AVAILABLE</option>
                        <option value="">SOLD OUT</option>
                    </select>
                </div>
                <input type="file" />
                <div>
                <button type='submit'>Add</button>
                <button onClick={()=>{setAddProductForm(false)}}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}
