import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../store/cartSlice';
import { toast } from 'react-toastify';
import { FiMapPin, FiPackage, FiCreditCard, FiChevronRight, FiHome } from 'react-icons/fi';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const placeOrderHandler = () => {
    // 1. Dispatch the order creation
    dispatch(createOrder({ userEmail: userInfo?.email || 'Guest' }));
    
    // 2. Notify and redirect to Home
    toast.success('Order Placed Successfully!');
    navigate('/'); // 🚀 Navigates Home after placing order
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl animate-in fade-in duration-700">
      
      {/* 🚀 Header Navigation: Return Home Shortcut */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          <span className="cursor-pointer hover:text-black" onClick={() => navigate('/shipping')}>Shipping</span>
          <FiChevronRight />
          <span className="cursor-pointer hover:text-black" onClick={() => navigate('/payment')}>Payment</span>
          <FiChevronRight />
          <span className="text-blue-600">Review & Order</span>
        </div>
        
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 transition-colors"
        >
          <FiHome size={14} /> Return to Shop
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* LEFT COLUMN: DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex gap-6">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
              <FiMapPin size={20} />
            </div>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Shipping Destination</h2>
              <p className="font-black text-xl text-gray-900">{cart.shippingAddress.address}</p>
              <p className="text-gray-500 font-medium">{cart.shippingAddress.city}, {cart.shippingAddress.postalCode}</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex gap-6">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
              <FiCreditCard size={20} />
            </div>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Payment Method</h2>
              <div className="flex items-center gap-3">
                <p className="font-black text-xl text-gray-900">{cart.paymentMethod}</p>
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  {cart.paymentMethod === 'UPI' ? 'Digital Instant' : 'Pay on Arrival'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <FiPackage className="text-gray-400" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Order Contents</h2>
            </div>
            
            <div className="space-y-4">
              {cart.cartItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt="" className="w-16 h-16 rounded-xl object-cover bg-gray-100" />
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-400 font-bold">{item.qty} × ${item.price}</p>
                    </div>
                  </div>
                  <span className="font-black text-gray-900">${(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SUMMARY */}
        <div className="bg-gray-900 text-white p-10 rounded-[3.5rem] h-fit sticky top-24 shadow-2xl shadow-blue-900/20">
          <h2 className="text-3xl font-black mb-8 tracking-tighter italic text-blue-400">Summary.</h2>
          
          <div className="space-y-4 mb-10">
            <div className="flex justify-between text-gray-400 font-bold text-sm">
              <span>Subtotal</span>
              <span className="text-white">${cart.itemsPrice}</span>
            </div>
            <div className="flex justify-between text-gray-400 font-bold text-sm">
              <span>Shipping</span>
              <span className="text-white">${cart.shippingPrice}</span>
            </div>
            <div className="flex justify-between text-gray-400 font-bold text-sm">
              <span>Estimated Tax (15%)</span>
              <span className="text-white">${cart.taxPrice}</span>
            </div>
            
            <div className="pt-6 mt-6 border-t border-white/10">
              <div className="flex justify-between items-end">
                <span className="text-gray-400 font-black text-xs uppercase tracking-widest">Grand Total</span>
                <span className="text-4xl font-black text-white leading-none">${cart.totalPrice}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0}
              className="w-full bg-blue-600 py-6 rounded-3xl font-black text-xl hover:bg-white hover:text-black transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-500/20"
            >
              {cart.paymentMethod === 'UPI' ? 'Pay & Confirm' : 'Confirm Order'}
            </button>

            {/* 🚀 Second Action: Cancel and Home */}
            <button 
              onClick={() => navigate('/')}
              className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
            >
              Cancel & Return Home
            </button>
          </div>
          
          <p className="text-center text-[10px] font-bold text-gray-500 mt-6 uppercase tracking-widest">
            Secure Encrypted Checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;