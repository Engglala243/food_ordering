import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/Counter";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});
