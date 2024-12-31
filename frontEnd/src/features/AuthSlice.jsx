import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userId: localStorage.getItem("user_id") || false,
  isLoggedIn: localStorage.getItem("user_id") ? true : false,
  accessToken: localStorage.getItem("access_token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
      state.userId = localStorage.getItem("user_id");
      state.accessToken = localStorage.getItem("access_token");
    },
    logoutUser: (state) => {
      if (state.isLoggedIn) {
        state.isLoggedIn = false;
        state.userId = false;
        state.accessToken = null;
        localStorage.clear();
        window.location.href = "/";
        toast.success("You have successfully logout");
      }
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
