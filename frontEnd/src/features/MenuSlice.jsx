import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuLoaded: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    loadMenu: (state, action) => {
      state.menuLoaded = !state.menuLoaded;
    },
  },
});

export const { loadMenu } = menuSlice.actions;
export default menuSlice.reducer;
