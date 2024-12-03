import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userId: localStorage.getItem("user_id") || false,
  isLoggedIn: localStorage.getItem("user_id") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
      state.userId = localStorage.getItem("user_id");
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userId = false;
      toast.success("You have successfully logout");
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
