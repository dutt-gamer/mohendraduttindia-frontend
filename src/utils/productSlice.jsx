import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    recentlyViewed: [],// global product list
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    addRecentlyViewed: (state,action)=>{
      const product = action.payload;
      state.recentlyViewed = state.recentlyViewed.filter(
        (p) => p.id !== product.id
      );

      // Add new product at the front
      state.recentlyViewed.unshift(product);

      // Keep max 9
      if (state.recentlyViewed.length > 9) {
        state.recentlyViewed.pop();
      }
    },
  },
});

export const { setProducts,addRecentlyViewed } = productSlice.actions;
export default productSlice.reducer;
