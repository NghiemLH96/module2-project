import axios from "axios";

export default {
    addProducts: async function(newProduct){
        return axios.post(import.meta.env.VITE_SERVER_HOST + `products`,newProduct)
    },
    findAllProducts: async function(){
        return axios.get(import.meta.env.VITE_SERVER_HOST + `products`)
    },
    editById: async function(editProduct){
        return axios.patch(import.meta.env.VITE_SERVER_HOST + `products` + `/${editProduct.id}` , editProduct)
    },
    deleteById: async function(productId){
        return axios.delete(import.meta.env.VITE_SERVER_HOST + `products` + `/${productId}`)
    },
    findById: async function(productId){
        return axios.get(import.meta.env.VITE_SERVER_HOST + `products` + `/${productId}`)
    }
}