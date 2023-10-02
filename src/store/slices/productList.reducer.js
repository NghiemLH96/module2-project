import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name:"products",
    initialState:{
        data:[]
    },
    reducers:{
        setProducts:(state , action)=>{
            return {
                ...state,
                data:action.payload
            }
        }
    }
})

export const productReducer = productsSlice.reducer
export const productAction = productsSlice.actions