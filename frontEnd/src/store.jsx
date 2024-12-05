import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/Counter";
import authSlice from "./features/AuthSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
  },
});
