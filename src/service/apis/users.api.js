import axios from "axios";

export default {
    findByUsername: async function(username){
        return await axios.get(import.meta.env.VITE_SERVER_HOST + `users` +`?username=${username}`)
    },
    findByEmail: async function(email){
        return await axios.get(import.meta.env.VITE_SERVER_HOST + `users` + `?email=${email}`)
    },
    findAllUser: async function(){
        return await axios.get(import.meta.env.VITE_SERVER_HOST + `users`)
    },
    findUserById: async function(userId){
        return await axios.get(import.meta.env.VITE_SERVER_HOST + `users` + `/${userId}`)
    },
    register: async function(newUser){
        return await axios.post(import.meta.env.VITE_SERVER_HOST + `users` , newUser)
    },
    editById: async function(data,userId){
        return await axios.patch(import.meta.env.VITE_SERVER_HOST + `users` + `/${userId}` , data)
    },
    changePassword: async function(userId,data){
        return await axios.patch(import.meta.env.VITE_SERVER_HOST + `users` + `/${userId}` , data)
    },
    resetPasswords: async function(userId,newPasswords){
        return await axios.patch(import.meta.env.VITE_SERVER_HOST + `users` + `/${userId}` ,newPasswords)
    },
    freezeUser: async function(userId,status){
        return await axios.patch(import.meta.env.VITE_SERVER_HOST + `users` + `/${userId}` ,status )
    },
    setCart: async function(userId,cart){
        return await axios.patch(import.meta.env.VITE_SERVER_HOST + `users` + `/${userId}`,cart )
    },
    setReceipt: async function(userId,receipt){
        return await axios.patch(import.meta.env.VITE_SERVER_HOST + `users` + `/${userId}`,receipt )
    },
    setAvatar:async function(userId,avatar){
        return await axios.patch(import.meta.env.VITE_SERVER_HOST + `users` + `/${userId}`,avatar )
    }
}