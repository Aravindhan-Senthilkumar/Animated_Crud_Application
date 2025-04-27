import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/authSlice";

const store = configureStore({
    reducer:AuthSlice.reducer
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch