import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice'; // 👈 Make sure this is imported

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, // 👈 This MUST be 'auth' to match your components
  },
});

export default store;