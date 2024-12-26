import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

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
      toast.error("Product removed from the cart!");
    },
    updateCartQuantity: (state, action) => {
      const { dish_id, quantity } = action.payload;
      const user_id = localStorage.getItem("user_id");
      const access_token = localStorage.getItem("access_token");

      axios
        .post(
          "http://localhost:5000/cart/update",
          {
            user_id,
            dish_id,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        )
        .then((resp) => {
          toast.success("Cart quantity updated!");
          console.log(`Cart quantity updated!:`, resp.data);
        })
        .catch((err) => {
          console.log(`Error updating quantity: ${err}`);
          toast.error("Cart updation failed!");
        });

      const cartItem = state.cartItems.find(
        (item) => item.dish_id === action.payload.dish_id,
      );

      cartItem.quantity += Number(action.payload.quantity);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    addToCart: (state, action) => {
      console.log(action.payload, "<===Add To Cart action.payload");
      const access_token = localStorage.getItem("access_token");
      axios
        .post("http://localhost:5000/cart/insert", action.payload, {
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
      toast.success("Product added to the cart!");
      const localCart = JSON.stringify(state.cartItems);
      localStorage.setItem("cart", localCart);
    },
  },
});

export const {
  clearCart,
  removeItem,
  updateCartQuantity,
  decrease,
  addToCart,
} = cartSlice.actions;
export default cartSlice.reducer;
