import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../store/cartSlice';
import { FiSmartphone, FiTruck, FiCheckCircle, FiChevronRight } from 'react-icons/fi';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, totalPrice } = cart;

  // Redirect if no shipping address
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [method, setMethod] = useState('UPI');

  // 🚀 UPI Logic
  const upiId = "swiftshop@upi"; // Replace with your real UPI ID
  const upiLink = `upi://pay?pa=${upiId}&pn=SwiftShop&am=${totalPrice}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(method));
    navigate('/placeorder');
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Progress Header */}
      <div className="flex items-center gap-2 mb-10 text-xs font-black uppercase tracking-[0.2em] text-gray-400">
        <span>Shipping</span>
        <FiChevronRight />
        <span className="text-blue-600">Payment</span>
        <FiChevronRight />
        <span>Order</span>
      </div>

      <h1 className="text-5xl font-black mb-2 tracking-tighter italic text-gray-900">Checkout.</h1>
      <p className="text-gray-500 font-medium mb-10">Select your preferred method of payment.</p>

      <form onSubmit={submitHandler} className="space-y-4">
        
        {/* UPI / QR CARD */}
        <div 
          onClick={() => setMethod('UPI')}
          className={`group p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer flex items-center justify-between ${
            method === 'UPI' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 bg-white hover:border-gray-200'
          }`}
        >
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              method === 'UPI' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400'
            }`}>
              <FiSmartphone size={24} />
            </div>
            <div>
              <p className="font-black text-xl text-gray-900">UPI / QR Scan</p>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Instant Activation</p>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'UPI' ? 'border-blue-600 bg-blue-600' : 'border-gray-200'}`}>
            {method === 'UPI' && <FiCheckCircle className="text-white" size={14} />}
          </div>
        </div>

        {/* COD CARD */}
        <div 
          onClick={() => setMethod('COD')}
          className={`group p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer flex items-center justify-between ${
            method === 'COD' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 bg-white hover:border-gray-200'
          }`}
        >
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              method === 'COD' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400'
            }`}>
              <FiTruck size={24} />
            </div>
            <div>
              <p className="font-black text-xl text-gray-900">Cash on Delivery</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pay at Doorstep</p>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'COD' ? 'border-blue-600 bg-blue-600' : 'border-gray-200'}`}>
            {method === 'COD' && <FiCheckCircle className="text-white" size={14} />}
          </div>
        </div>

        {/* DYNAMIC QR SECTION */}
        <div className="pt-6">
          {method === 'UPI' ? (
            <div className="bg-white border border-gray-100 p-8 rounded-[3rem] text-center shadow-2xl shadow-gray-200/50 animate-in zoom-in-95 duration-500">
               <div className="mb-6">
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                    Scan with any UPI App
                  </span>
               </div>
               <div className="inline-block p-4 bg-white rounded-3xl border-4 border-gray-50 mb-6">
                  <img src={qrCodeUrl} alt="UPI QR" className="w-44 h-44" />
               </div>
               <div className="space-y-3">
                  <p className="text-2xl font-black text-gray-900">${totalPrice}</p>
                  <a href={upiLink} className="text-blue-600 text-sm font-bold underline hover:text-blue-700">
                    Pay via Mobile App Directly
                  </a>
               </div>
            </div>
          ) : (
            <div className="bg-gray-900 p-8 rounded-[3rem] text-white shadow-2xl">
               <h4 className="text-blue-400 text-xs font-black uppercase tracking-widest mb-3">COD Policy</h4>
               <p className="text-lg font-bold leading-tight">
                 Please ensure you have <span className="text-blue-400 underline">${totalPrice}</span> ready in cash. Our agent will verify the amount upon delivery.
               </p>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-black transition-all shadow-xl shadow-blue-200 active:scale-95 mt-8"
        >
          Finalize Order
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;