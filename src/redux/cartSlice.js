import { createSlice } from "@reduxjs/toolkit";

const getCartFromStorage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return [];

  return JSON.parse(localStorage.getItem(`cart_${user._id}`)) || [];
};

const saveCartToStorage = (cart) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return;

  localStorage.setItem(`cart_${user._id}`, JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromStorage(),

  reducers: {

    addToCart: (state, action) => {
      const exist = state.find(i => i._id === action.payload._id);

      if (exist) {
        exist.qty += 1;
      } else {
        state.push({ ...action.payload, qty: 1 });
      }

      saveCartToStorage(state);
    },

    increaseQty: (state, action) => {
      const item = state.find(i => i._id === action.payload._id);
      if (item) item.qty += 1;

      saveCartToStorage(state);
    },

    decreaseQty: (state, action) => {
      const item = state.find(i => i._id === action.payload._id);
      if (item && item.qty > 1) item.qty -= 1;

      saveCartToStorage(state);
    },

    removeFromCart: (state, action) => {
      const updated = state.filter(i => i._id !== action.payload._id);
      saveCartToStorage(updated);
      return updated;
    },

    clearCart: () => {
      saveCartToStorage([]);
      return [];
    },

    loadUserCart: () => {
      return getCartFromStorage();
    }

  }
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
  loadUserCart
} = cartSlice.actions;

export default cartSlice.reducer;