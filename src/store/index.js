import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/userList.reducer";
import { productReducer } from "./slices/productList.reducer";
import { loginUserReducer } from "./slices/loginUserDetail.reducer";


export const store = configureStore({
    reducer:{
        usersStore:usersReducer,
        productsStore:productReducer,
        loginUserStore:loginUserReducer,
    }
})