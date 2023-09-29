import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/userList.reducer";


export const store = configureStore({
    reducer:{
        usersStore:usersReducer
    }
})