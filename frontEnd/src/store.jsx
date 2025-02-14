import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/Counter";
import authSlice from "./features/AuthSlice";
import cartReducer from "./features/CartSlice";
import menuReducer from "./features/MenuSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    cart: cartReducer,
    menu: menuReducer,
  },
});
