import React,{useState , useEffect} from 'react'
import { uploadFileToStorage } from '../../../../../firebase';
import { api } from '../../../../service'
import { useDispatch } from 'react-redux';
import { productAction } from '../../../../store/slices/productList.reducer';

export default function AddProductForm({setAddProductForm}) {
    const dispatch = useDispatch()
    const [addProductName,setAddProductName] = useState("");
    const [addProductPrice,setAddProductPrice] = useState(0);
    const [addProductCategory,setAddProductCategory] = useState("");
    const [addProductBrand,setAddProductBrand] = useState("");
    const [addProductStatus,setAddProductStatus] = useState(false);
    const [addProductInventory,setAddProductInventory] = useState(0);

    async function handleAddProduct(e){
        e.preventDefault();
        
        const newProduct = {
            id:Math.random()*Date.now(),
            product_name:addProductName,
            product_price:addProductPrice,
            product_category:addProductCategory,
            product_brand:addProductBrand,
            product_status:addProductStatus,
            product_inventory:addProductInventory,
            product_image: await uploadFileToStorage(e.target.querySelector("#addProduct_avatar").files[0],"products_img"),
        };
        console.log(newProduct);
        if (newProduct) {
            await api.productsApi.addProducts(newProduct)
            api.productsApi.findAllProducts()
            .then(res=>{
                dispatch(productAction.setProducts(res.data))
            })
        }
        setAddProductForm(false)
    }

  return (
    <div className='addProduct_container'>
        <div className='addProduct_frame'>
            <h2>Add new product</h2>
            <form onSubmit={(e)=>{handleAddProduct(e)}}>
                <div className='addProduct_info'>
                    <label htmlFor="product_name">Product name:</label>
                    <input onChange={(e)=>{setAddProductName(e.target.value)}} id='product_name' type="text" />
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="product_price">Price:</label>
                    <input onChange={(e)=>{setAddProductPrice(e.target.value)}} id="product_price" type="number" />
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="product_category">Category:</label>
                    <select defaultValue="None" onChange={(e)=>{setAddProductCategory(e.target.value)}} id="product_category" name="">
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
                    <select defaultValue="None" onChange={(e)=>{setAddProductBrand(e.target.value)}}  name="product_brand" id="">
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
                    <select defaultValue={false} onChange={(e)=>{setAddProductStatus(e.target.value)}} name="" id="">
                        <option disabled value={false}>--Select Status--</option>
                        <option value={true}>AVAILABLE</option>
                        <option value={false}>SOLD OUT</option>
                    </select>
                </div>
                <div className='addProduct_info'>
                    <label htmlFor="product_inventory">Inventory:</label>
                    <input id="product_inventory" onChange={(e)=>{setAddProductInventory(e.target.value)}} type="number" max={99} min={0}/>
                </div>
                <input id='addProduct_avatar' type="file" />
                <div className='addProduct_btnBox'>
                    <button className='action_btn' type='submit'>Add</button>
                    <button className='cancel_btn' onClick={()=>{setAddProductForm(false)}}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}
