import { configureStore, createReducer } from "@reduxjs/toolkit";
import counterSlice from "./features/Counter";
import authSlice from "./features/AuthSlice";
import cartReducer from "./features/CartSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    cart: cartReducer,
  },
});
