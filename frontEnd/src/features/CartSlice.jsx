import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
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
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id != itemId);
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Product removed from the cart!");
    },
    updateCartAmount: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );
      cartItem.quantity = Number(action.payload.quantity);
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
      const access_token = localStorage.getItem("access_token");
      axios
        .post("http://localhost:5000/item/cart", action.payload, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .catch((err) => {
          console.log("POST request error: ", err);
        });

      const cartItem = state.cartItems.find(
        (item) => item.dish_id === action.payload.dish_id,
      );

      console.log(cartItem, "<===Boolean value");
      const cartData = state.cartItems;
      if (!cartItem) {
        console.log(state.cartItems, "<===State of Cart before push");
        state.cartItems = [...cartData, action.payload];
      } else {
        cartItem.quantity += action.payload.quantity;
      }
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Product added to the cart!");
      const localCart = JSON.stringify(state.cartItems);
      localStorage.setItem("cart", localCart);
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
