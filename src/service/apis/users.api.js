import axios from "axios";

export default {
    findByUsername: async function(username){
        return await axios.get(import.meta.env.VITE_SERVER_HOST + `users` +`?username=${username}`)
    },
    findByEmail: async function(email){
        return await axios.get(import.meta.env.VITE_SERVER_HOST + `users` + `?email=${email}`)
    },
    register: async function(newUser){
        return await axios.post(import.meta.env.VITE_SERVER_HOST + `users` , newUser)
    }
}