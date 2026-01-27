import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { addToCart, removeFromCart } from '../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart || { cartItems: [] });

  // Calculate Subtotal with number safety
  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.qty || 0) * Number(item.price || 0), 0).toFixed(2);
  const totalItems = cartItems.reduce((a, c) => a + Number(c.qty || 0), 0);

  const updateQtyHandler = (item, newQty) => {
    if (newQty > 0 && newQty <= (item.countInStock || 10)) {
      dispatch(addToCart({ ...item, qty: newQty }));
    }
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="container mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
          <FiShoppingBag className="text-white" size={24} />
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Your Bag</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-16 text-center border border-gray-100 shadow-xl shadow-gray-100/50">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag size={40} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your bag is empty</h2>
          <p className="text-gray-500 mb-10 max-w-xs mx-auto">Looks like you haven't added any essentials to your collection yet.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95"
          >
            Start Shopping <FiArrowRight />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="group flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mb-1">{item.brand}</p>
                  <h3 className="font-bold text-xl text-gray-900 leading-tight mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm font-medium">Unit Price: ${item.price}</p>
                </div>
                
                {/* Quantity Control */}
                <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                  <button 
                    onClick={() => updateQtyHandler(item, item.qty - 1)} 
                    className="p-3 text-gray-500 hover:text-blue-600 hover:bg-white rounded-xl transition-all"
                  >
                    <FiMinus size={16}/>
                  </button>
                  <span className="px-5 font-black text-lg min-w-[3rem] text-center">{item.qty}</span>
                  <button 
                    onClick={() => updateQtyHandler(item, item.qty + 1)} 
                    className="p-3 text-gray-500 hover:text-blue-600 hover:bg-white rounded-xl transition-all"
                  >
                    <FiPlus size={16}/>
                  </button>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-xl font-black text-gray-900">${(item.qty * item.price).toFixed(2)}</p>
                  <button 
                    onClick={() => dispatch(removeFromCart(item._id))} 
                    className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Card */}
          <div className="sticky top-24 bg-gray-900 text-white p-10 rounded-[2.5rem] shadow-2xl h-fit space-y-8">
            <h2 className="text-2xl font-black tracking-tight">Summary</h2>
            
            <div className="space-y-5 border-b border-white/10 pb-8">
              <div className="flex justify-between text-gray-400 font-medium">
                <span>Items ({totalItems})</span>
                <span className="text-white">${subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-medium">
                <span>Shipping</span>
                <span className="text-green-400 uppercase text-xs font-bold tracking-widest mt-1">Free</span>
              </div>
              <div className="flex justify-between text-gray-400 font-medium">
                <span>Tax</span>
                <span className="text-white">$0.00</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Estimated Total</span>
              <span className="text-4xl font-black">${subtotal}</span>
            </div>

            <button 
              onClick={checkoutHandler}
              className="group w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all shadow-xl active:scale-95"
            >
              Checkout Now
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest font-bold">
              Secure Checkout Powered by SwiftPay
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;