import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type authState = {
    isLoggedIn:boolean
}

const AuthSlice = createSlice({
    name:'auth',
    initialState:{
        isLoggedIn:false
    } as authState,
    reducers:{
        handleLogin:(state,action:PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        }
    }
})

export const { handleLogin } = AuthSlice.actions

export default AuthSlice