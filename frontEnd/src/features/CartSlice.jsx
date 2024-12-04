import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id != itemId);
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Product removed from the cart!");
    },
    updateCartAmount: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );
      cartItem.amount = Number(action.payload.amount);
      cartSlice.caseReducers.calculateTotals(state);
    },
    calculateTotals: (state) => {
      let quantity = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        quantity += item.quantity;
        total += item.quantity * item.price;
      });
      state.quantity = quantity;
      state.total = total;
    },
    addToCart: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );
      if (!cartItem) {
        state.cartItems.push(action.payload);
      } else {
        cartItem.amount += action.payload.amount;
      }
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Product added to the cart!");
    },
  },
});

export const {
  clearCart,
  removeItem,
  updateCartAmount,
  decrease,
  calculateTotals,
  addToCart,
} = cartSlice.actions;
export default cartSlice.reducer;
