import { createSlice } from '@reduxjs/toolkit';

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// 🚀 Helper to calculate all totals
const updatePrices = (state) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => {
      const price = item?.price ? Number(item.price) : 0;
      const qty = item?.qty ? Number(item.qty) : 1;
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
  cartItems: [],
  manualProducts: localStorage.getItem('manualProducts') 
    ? JSON.parse(localStorage.getItem('manualProducts')) 
    : [],
  orders: localStorage.getItem('all_orders') 
    ? JSON.parse(localStorage.getItem('all_orders')) 
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  paymentMethod: 'PayPal',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 🚀 Added back: Required for Login/Header
    setCart: (state, action) => {
      state.cartItems = Array.isArray(action.payload) ? action.payload : [];
      updatePrices(state);
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
      if (userEmail) localStorage.setItem(`cart_${userEmail}`, JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const id = action.payload.id || action.payload;
      const userEmail = action.payload.userEmail;
      state.cartItems = state.cartItems.filter((x) => x._id !== id);
      updatePrices(state);
      if (userEmail) localStorage.setItem(`cart_${userEmail}`, JSON.stringify(state.cartItems));
    },

    // 🚀 Added back: Required for AdminAddProduct
    addManualProduct: (state, action) => {
      state.manualProducts = [action.payload, ...state.manualProducts];
      localStorage.setItem('manualProducts', JSON.stringify(state.manualProducts));
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
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
        isPaid: true,
        paidAt: new Date().toISOString(),
        isDelivered: false,
        status: 'Processing',
        trackingHistory: [{ status: 'Order Placed', time: new Date().toISOString() }]
      };

      state.orders.push(newOrder);
      localStorage.setItem('all_orders', JSON.stringify(state.orders));
      
      state.cartItems = [];
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
        }
        order.trackingHistory.push({ status: newStatus, time: new Date().toISOString() });
        localStorage.setItem('all_orders', JSON.stringify(state.orders));
      }
    },

    requestReturn: (state, action) => {
      const orderId = action.payload;
      const order = state.orders.find((o) => o._id === orderId);
      if (order) {
        order.status = 'Return Requested';
        localStorage.setItem('all_orders', JSON.stringify(state.orders));
      }
    },

    processReturn: (state, action) => {
      const { orderId, decision } = action.payload; 
      const order = state.orders.find((o) => o._id === orderId);
      if (order) {
        order.status = decision;
        localStorage.setItem('all_orders', JSON.stringify(state.orders));
      }
    },

    // 🚀 Added back: Required for Login/Logout
    clearCartItems: (state) => {
      state.cartItems = [];
      updatePrices(state);
    },
  },
});

// 🚀 ESSENTIAL: Exporting all actions used in Header, Login, and Admin pages
export const { 
  setCart,
  addToCart, 
  removeFromCart, 
  addManualProduct,
  saveShippingAddress, 
  createOrder, 
  requestReturn,
  updateOrderStatus, 
  processReturn,
  clearCartItems 
} = cartSlice.actions;

export default cartSlice.reducer;