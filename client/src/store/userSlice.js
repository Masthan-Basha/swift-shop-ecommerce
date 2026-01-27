import { createSlice } from '@reduxjs/toolkit';

// 1. Check if user is already logged in (saved in local storage)
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user info when they log in or register
    login: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // Action to clear user info on logout
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    // Optional: useful for showing a spinner during login
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Optional: helpful for catching errors
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { login, logout, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;