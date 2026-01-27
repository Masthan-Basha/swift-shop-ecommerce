import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import cartReducer from './store/cartSlice';
import authReducer from './store/authSlice'; // 🚀 Import the authSlice you created

import App from './App';
import './index.css';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, // 🚀 Changed 'user' to 'auth' to match your components
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);