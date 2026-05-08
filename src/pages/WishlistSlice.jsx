import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.find(item => item._id === action.payload._id);
      if (!exists) state.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      return state.filter(item => item._id !== action.payload);
    }
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;