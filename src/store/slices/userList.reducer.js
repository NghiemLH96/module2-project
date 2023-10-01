import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name:"user",
    initialState:{user:null},
    reducers:{
        setUser:function (state,action){
            return{
                ...state,
                user:action.payload
            }
        },
        removeUser:function (state,action){
            return {
                ...state,
                user:null
            }
        }
    }
})

export const usersReducer = usersSlice.reducer;
export const userAction = usersSlice.actions;