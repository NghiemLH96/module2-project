import axios from "axios";

export default {
    addProducts: async function(newProduct){
        return axios.post(import.meta.env.VITE_SERVER_HOST + `products`,newProduct)
    },
    findAllProducts: async function(){
        return axios.get(import.meta.env.VITE_SERVER_HOST + `products`)
    }
}