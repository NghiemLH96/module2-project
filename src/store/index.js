import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/userList.reducer";
import { productReducer } from "./slices/productList.reducer";


export const store = configureStore({
    reducer:{
        usersStore:usersReducer,
        productsStore:productReducer
    }
})