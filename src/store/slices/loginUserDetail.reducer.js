import { createSlice } from "@reduxjs/toolkit";

const loginUserSlice = createSlice({
    name: "login_user",
    initialState: {
        user: null,
        cart: []
    },
    reducers: {
        setLoginUser: function (state, action) {
            return {
                ...state,
                user: action.payload
            }
        },
        removeLoginUser: function (state, action) {
            return { user: null }
        },
        setCart: function (state, action) {
            return {
                ...state,
                cart: action.payload
            }
        }
    }
})

export const loginUserReducer = loginUserSlice.reducer;
export const loginUserAction = loginUserSlice.actions;