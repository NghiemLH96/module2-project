import { createSlice } from "@reduxjs/toolkit";
import { useEffect , useState } from "react";



const usersSlice = createSlice({
    name:"user",
    initialState:[],
    reducers:{}
})

export const usersReducer = usersSlice.reducer;
export const userAction = usersSlice.actions;