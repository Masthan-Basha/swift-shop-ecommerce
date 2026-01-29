import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/authSlice'; 
import { setCart, clearCartItems } from '../store/cartSlice'; 
import { toast } from 'react-toastify'; // Added for better feedback

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
    
    // Clear current UI cart state before authenticating new user
    dispatch(clearCartItems());

    setTimeout(() => {
      try {
        const lowerEmail = email.toLowerCase();
        
        // 1. Check for Admin first
        const isAdmin = lowerEmail === 'admin@example.com' && password === 'admin123';
        
        // 2. Check the "Mock Database" for registered users
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

          // 3. 🛡️ SAFE STORAGE HANDLING: Load user-specific cart
          const userSpecificCartKey = `cart_${lowerEmail}`;
          const userSpecificCart = localStorage.getItem(userSpecificCartKey);
          
          if (userSpecificCart) {
            const parsedCart = JSON.parse(userSpecificCart);
            // Limit the cart size if it's too large to prevent future quota errors
            if (parsedCart.length > 50) {
                console.warn('Cart is unusually large, trimming to preserve storage quota.');
                dispatch(setCart(parsedCart.slice(0, 50)));
            } else {
                dispatch(setCart(parsedCart));
            }
          }

          setIsLoggingIn(false);
        } else {
          setLocalError('Invalid email or password. Please check your credentials.');
          setIsLoggingIn(false);
        }
      } catch (error) {
        // 🚨 CATCH QUOTA ERRORS
        console.error("Storage Error:", error);
        if (error.name === 'QuotaExceededError') {
          setLocalError('Browser storage is full. Please clear your site data/cache and try again.');
        } else {
          setLocalError('An unexpected error occurred. Please try again.');
        }
        setIsLoggingIn(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
        {/* Decorative Background Blur */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-10">
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter italic">Login.</h2>
          <p className="text-gray-400 mt-3 font-black uppercase tracking-[0.3em] text-[9px]">Swift Shop Authentication</p>
        </div>

        {localError && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-2xl flex items-center gap-3">
            <span className="bg-red-500 text-white w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full text-[10px]">!</span>
            {localError}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1 transition-colors group-focus-within:text-blue-600">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-6 py-5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-300 font-bold"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1 transition-colors group-focus-within:text-blue-600">Password</label>
            <input
              type="password"
              required
              className="w-full px-6 py-5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-300 font-bold"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95 flex justify-center items-center gap-3 disabled:bg-gray-400 disabled:scale-100"
          >
            {isLoggingIn ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-400 text-sm font-medium">
            New to the shop?{' '}
            <Link 
              to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'} 
              className="text-black font-black hover:text-blue-600 transition-colors ml-1 underline decoration-blue-200 underline-offset-8"
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