import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiSearch, FiLogOut, FiSettings, FiPackage, FiActivity } from 'react-icons/fi';
import { logout } from '../store/authSlice'; 
import { clearCartItems } from '../store/cartSlice';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // 🚀 LIVE SEARCH LOGIC: 
  // This triggers navigation as the user types
  const handleSearch = (e) => {
    const value = e.target.value;
    setKeyword(value);
    
    if (value.trim()) {
      navigate(`/search/${value.trim()}`);
    } else {
      navigate('/'); // Return to home if search is cleared
    }
  };

  // Prevent form submission from reloading the page
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const logoutHandler = () => {
    if (userInfo && userInfo.email) {
      localStorage.setItem(`cart_${userInfo.email}`, JSON.stringify(cartItems));
    }
    dispatch(logout()); 
    dispatch(clearCartItems()); 
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <nav className="container mx-auto px-6 py-5 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-blue-600 flex items-center gap-1 group">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-black">SWIFT</span>SHOP
        </Link>
        
        {/* Search Bar - UPDATED for Live Search */}
        <form 
          onSubmit={submitHandler}
          className="hidden md:flex items-center bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-2xl w-1/3 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:bg-white transition-all"
        >
          <FiSearch className="text-gray-400" />
          <input 
            type="text" 
            value={keyword}
            onChange={handleSearch} // 🚀 Changed from setKeyword to handleSearch
            placeholder="Search unique essentials..." 
            className="bg-transparent border-none focus:ring-0 w-full ml-3 text-sm font-medium outline-none placeholder:text-gray-400" 
          />
        </form>

        {/* Actions Section */}
        <div className="flex items-center gap-2 md:gap-5">
          {userInfo && (
            <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-xl transition-colors group">
              <FiPackage size={22} className="text-gray-700 group-hover:text-blue-600" />
              <span className="hidden lg:inline text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-blue-600">My Orders</span>
            </Link>
          )}

          <Link to="/cart" className="relative p-2 hover:bg-gray-50 rounded-xl transition-colors group">
            <FiShoppingCart size={22} className="text-gray-700 group-hover:text-blue-600" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-black">
                {cartCount}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Welcome</span>
                <span className="text-sm font-bold text-gray-900">{userInfo.name.split(' ')[0]}</span>
              </div>
              
              {userInfo.isAdmin && (
                <div className="flex gap-2">
                  <Link title="Manage Orders" to="/admin/orders" className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all">
                    <FiActivity size={18} />
                  </Link>
                  <Link title="Add Product" to="/admin/add" className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                    <FiSettings size={18} />
                  </Link>
                </div>
              )}
              
              <button onClick={logoutHandler} className="p-2.5 text-gray-400 hover:text-red-500 rounded-xl transition-all">
                <FiLogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all">
              <FiUser size={18} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;