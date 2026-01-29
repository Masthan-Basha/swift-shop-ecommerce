import { createSlice } from '@reduxjs/toolkit';

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// 🛡️ Helper for safe LocalStorage writing
const safeSave = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Storage limit reached for key: ${key}`, e);
    if (e.name === 'QuotaExceededError') {
      // Alert the user only once or log it
      console.warn("Storage is full. Some data might not persist offline.");
    }
  }
};

const updatePrices = (state) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => {
      const price = Number(item?.price) || 0;
      const qty = Number(item?.qty) || 1;
      return acc + price * qty;
    }, 0)
  );

  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
};

const initialState = {
  cartItems: localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [],
  manualProducts: localStorage.getItem('manualProducts') 
    ? JSON.parse(localStorage.getItem('manualProducts')) 
    : [],
  orders: localStorage.getItem('all_orders') 
    ? JSON.parse(localStorage.getItem('all_orders')) 
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  paymentMethod: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : 'UPI', 
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = Array.isArray(action.payload) ? action.payload : [];
      updatePrices(state);
      safeSave('cartItems', state.cartItems);
    },

    addToCart: (state, action) => {
      const item = action.payload.item || action.payload;
      const userEmail = action.payload.userEmail;
      if (!item || !item._id) return;

      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      updatePrices(state);
      
      // ✅ Using safeSave to prevent crashes
      safeSave('cartItems', state.cartItems);
      if (userEmail) safeSave(`cart_${userEmail}`, state.cartItems);
    },

    removeFromCart: (state, action) => {
      const id = action.payload.id || action.payload;
      const userEmail = action.payload.userEmail;
      state.cartItems = state.cartItems.filter((x) => x._id !== id);
      updatePrices(state);
      
      safeSave('cartItems', state.cartItems);
      if (userEmail) safeSave(`cart_${userEmail}`, state.cartItems);
    },

    addManualProduct: (state, action) => {
      const exists = state.manualProducts.find(p => p._id === action.payload._id);
      if (!exists) {
        state.manualProducts = [action.payload, ...state.manualProducts];
        safeSave('manualProducts', state.manualProducts);
      }
    },

    deleteProduct: (state, action) => {
      const id = action.payload;
      state.manualProducts = state.manualProducts.filter((p) => p._id !== id);
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
      
      safeSave('manualProducts', state.manualProducts);
      safeSave('cartItems', state.cartItems);
      updatePrices(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      safeSave('shippingAddress', action.payload);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      safeSave('paymentMethod', action.payload);
    },

    createOrder: (state, action) => {
      const { userEmail } = action.payload;
      const newOrder = {
        _id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        user: userEmail,
        orderItems: [...state.cartItems],
        shippingAddress: state.shippingAddress,
        paymentMethod: state.paymentMethod,
        itemsPrice: state.itemsPrice,
        taxPrice: state.taxPrice,
        shippingPrice: state.shippingPrice,
        totalPrice: state.totalPrice,
        isPaid: state.paymentMethod === 'UPI', 
        paidAt: state.paymentMethod === 'UPI' ? new Date().toISOString() : null,
        isDelivered: false,
        status: 'Processing',
        trackingHistory: [{ status: 'Order Placed', time: new Date().toISOString() }]
      };

      state.orders = [newOrder, ...state.orders];
      safeSave('all_orders', state.orders);
      
      state.cartItems = [];
      localStorage.removeItem('cartItems');
      if (userEmail) localStorage.removeItem(`cart_${userEmail}`);
      updatePrices(state);
    },

    updateOrderStatus: (state, action) => {
      const { orderId, newStatus } = action.payload;
      const order = state.orders.find((o) => o._id === orderId);
      if (order) {
        order.status = newStatus;
        if (newStatus === 'Delivered') {
          order.isDelivered = true;
          order.deliveredAt = new Date().toISOString();
          if (order.paymentMethod === 'COD') {
            order.isPaid = true;
            order.paidAt = new Date().toISOString();
          }
        }
        order.trackingHistory.push({ status: newStatus, time: new Date().toISOString() });
        safeSave('all_orders', state.orders);
      }
    },

    requestReturn: (state, action) => {
      const order = state.orders.find((o) => o._id === action.payload);
      if (order) {
        order.status = 'Return Requested';
        safeSave('all_orders', state.orders);
      }
    },

    processReturn: (state, action) => {
      const { orderId, decision } = action.payload; 
      const order = state.orders.find((o) => o._id === orderId);
      if (order) {
        order.status = decision;
        safeSave('all_orders', state.orders);
      }
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      updatePrices(state);
      localStorage.removeItem('cartItems');
    },
  },
});

export const { 
  setCart,
  addToCart, 
  removeFromCart, 
  addManualProduct,
  deleteProduct,
  saveShippingAddress, 
  savePaymentMethod, 
  createOrder, 
  requestReturn,
  updateOrderStatus, 
  processReturn,
  clearCartItems 
} = cartSlice.actions;

export default cartSlice.reducer;