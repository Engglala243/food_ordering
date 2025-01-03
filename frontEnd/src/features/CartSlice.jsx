import { toast } from "react-toastify";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) ?? [],
  quantity: 0,
  total: 0,
  isLoading: false,
  isError: false,
};

export const fetchCart = createAsyncThunk("fetchCart", async (access_token) => {
  return axios
    .get(`http://localhost:5000/cart/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((resp) => {
      const cartData = JSON.stringify(resp.data.data);
      localStorage.setItem("cart", cartData);
      return resp.data.data;
    });
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state) => {
      state.isError = true;
    });
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const access_token = localStorage.getItem("access_token");
      const user_id = localStorage.getItem("user_id");
      const updatedCart = state.cartItems.filter(
        (item) => item.dish_id !== itemId,
      );
      console.log(updatedCart, "<<-------- Remove item --------");
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      state.cartItems = updatedCart;
      axios
        .post(
          "http://localhost:5000/cart/delete",
          { user_id, dish_id: itemId },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        )
        .then(() => {
          toast.success("Product removed from the cart!");
        })
        .catch((err) => {
          console.error("Error removing item from cart:", err);
          toast.error("Failed to remove product. Please try again.");
        });
    },

    updateCartQuantity: (state, action) => {
      const { dish_id, change } = action.payload;
      const user_id = localStorage.getItem("user_id");
      const access_token = localStorage.getItem("access_token");
      const cartData = JSON.parse(localStorage.getItem("cart"));

      axios
        .post(
          "http://localhost:5000/cart/update",
          { user_id, dish_id, quantity: change },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        )
        .then(() => {
          const cartItem = cartData.find((item) => item.dish_id === dish_id);
          console.log(cartData, "<== This is the updated cart data");
          console.log(cartItem, "<== Updated Cart Item");

          if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity <= 0) cartItem.quantity = 1;
            localStorage.setItem("cart", JSON.stringify(cartData));
            toast.success("Cart quantity updated!");
          }
        })
        .catch((err) => {
          console.error("Error updating cart quantity:", err);
          toast.error("Failed to update cart. Please try again.");
        });
    },

    addToCart: (state, action) => {
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
