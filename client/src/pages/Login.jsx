import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/authSlice'; 
import { setCart, clearCartItems } from '../store/cartSlice'; 
import Loader from '../components/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLocalError(null);
    
    // Clear current UI cart before authenticating new user
    dispatch(clearCartItems());

    setTimeout(() => {
      const lowerEmail = email.toLowerCase();
      
      // 1. Check for Admin first
      const isAdmin = lowerEmail === 'admin@example.com' && password === 'admin123';
      
      // 2. 🚀 Check the "Mock Database" for registered users
      const registeredUsers = JSON.parse(localStorage.getItem('users_list') || '[]');
      const foundUser = registeredUsers.find(
        (u) => u.email === lowerEmail && u.password === password
      );

      if (isAdmin || foundUser) {
        const userData = isAdmin 
          ? { _id: '1', name: 'Admin', email: lowerEmail, isAdmin: true }
          : foundUser;

        // Set the User in Redux
        dispatch(setCredentials(userData));

        // 3. Load user-specific cart (Interest)
        const userSpecificCart = localStorage.getItem(`cart_${lowerEmail}`);
        if (userSpecificCart) {
          dispatch(setCart(JSON.parse(userSpecificCart)));
        }

        setIsLoggingIn(false);
      } else {
        // ❌ Specific Error Message
        setLocalError('Invalid email or password. Please check your credentials or create a new account.');
        setIsLoggingIn(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-10">
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Login</h2>
          <p className="text-gray-400 mt-3 font-medium uppercase tracking-widest text-[10px]">Access your account</p>
        </div>

        {localError && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-2">
            <span className="bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px]">!</span>
            {localError}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300"
              placeholder="e.g. yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95 flex justify-center items-center gap-3 disabled:bg-gray-400"
          >
            {isLoggingIn ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-400 text-sm font-medium">
            New to the shop?{' '}
            <Link 
              to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'} 
              className="text-black font-black hover:text-blue-600 transition-colors ml-1 underline underline-offset-4"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;