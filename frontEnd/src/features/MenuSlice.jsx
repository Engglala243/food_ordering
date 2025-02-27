import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  menuLoaded: false,
  menuData: Cookies.get("menu_data") || [],
};

export const fetchMenu = createAsyncThunk("fetchMenu", async (access_token) => {
  return axios
    .get(`http://18.205.28.19/menu`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((resp) => {
      return resp.data.data;
    })
    .catch((err) => {
      console.log(`Axios Error: ${err}`);
      toast.error(`failed to fetch menu data`);
    });
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.pending, (state) => {
      state.menuLoaded = false;
    });
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      Cookies.set("menu_data", JSON.stringify(action.payload));
      state.menuData = JSON.stringify(action.payload);
      state.menuLoaded = true;
    });
    builder.addCase(fetchMenu.rejected, (state) => {
      state.menuLoaded = false;
    });
  },
});

export default menuSlice.reducer;
