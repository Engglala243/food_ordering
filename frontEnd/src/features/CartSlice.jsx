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
    .get(`http://54.211.165.0/api/cart/`, {
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

export const updateCartQuantity = createAsyncThunk(
  "updateCart",
  async (req) => {
    return axios
      .post(
        "http://54.211.165.0/api/cart/update",
        { dish_id: req.dish_id, quantity: req.change },
        {
          headers: {
            Authorization: `Bearer ${req.access_token}`,
          },
        },
      )
      .then(() => {
        const cartData = JSON.parse(localStorage.getItem("cart"));
        const cartItem = cartData.find((item) => item.dish_id === req.dish_id);
        console.log(cartData, "<== This is the updated cart data");
        console.log(cartItem, "<== Updated Cart Item");

        if (cartItem) {
          cartItem.quantity += req.change;
          if (cartItem.quantity <= 0) cartItem.quantity = 1;
          localStorage.setItem("cart", JSON.stringify(cartData));
          return cartData;
        }
      })
      .catch((err) => {
        console.error("Error updating cart quantity:", err);
        toast.error("Failed to update cart. Please try again.");
      });
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    // fetching cart data
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload ?? [];
    });
    builder.addCase(fetchCart.rejected, (state) => {
      state.isError = true;
    });
    // updateCartQuantity
    builder.addCase(updateCartQuantity.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(updateCartQuantity.rejected, (state) => {
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
          "http://54.211.165.0/api/cart/delete",
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

    addToCart: (state, action) => {
      const access_token = localStorage.getItem("access_token");
      axios
        .post("http://54.211.165.0/api/cart/insert", action.payload, {
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

export const { clearCart, removeItem, decrease, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
