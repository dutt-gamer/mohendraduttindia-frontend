import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // { productId, name, price, quantity }
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1; // increase quantity if product exists
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const existing = state.items.find((item) => item.id === productId);
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== productId);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
