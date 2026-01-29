import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../store/cartSlice';
import { FiSmartphone, FiTruck, FiCheckCircle, FiChevronRight, FiExternalLink } from 'react-icons/fi';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, totalPrice, cartItems } = cart;

  const [method, setMethod] = useState('UPI');

  // 🛡️ Redirect if cart is empty or no address
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    } else if (!shippingAddress || !shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, cartItems, navigate]);

  // 🚀 UPI Deep Link Construction
  const upiId = "masthan@upi"; // 👈 REPLACE THIS WITH YOUR REAL UPI ID
  const payeeName = "SwiftShop";
  // We use encodeURIComponent to ensure the URL is valid
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalPrice}&cu=INR`;
  
  // 📸 QR Code URL (Using a more reliable generator)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;

  const handlePaymentAppRedirect = () => {
    if (method === 'UPI') {
      window.location.href = upiLink; // This forces the phone to open GPay/PhonePe
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(method));
    navigate('/placeorder');
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl animate-in fade-in duration-700">
      
      <div className="flex items-center gap-2 mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
        <span>Shipping</span>
        <FiChevronRight />
        <span className="text-blue-600">Payment</span>
        <FiChevronRight />
        <span>Review</span>
      </div>

      <h1 className="text-4xl font-black mb-8 tracking-tighter italic">Payment Method.</h1>

      <div className="space-y-4">
        {/* UPI Option */}
        <div 
          onClick={() => setMethod('UPI')}
          className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer flex items-center justify-between ${
            method === 'UPI' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 bg-white'
          }`}
        >
          <div className="flex items-center gap-5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method === 'UPI' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
              <FiSmartphone size={22} />
            </div>
            <div>
              <p className="font-black text-lg text-gray-900">UPI / Google Pay / PhonePe</p>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Instant QR Pay</p>
            </div>
          </div>
          {method === 'UPI' && <FiCheckCircle className="text-blue-600" size={24} />}
        </div>

        {/* COD Option */}
        <div 
          onClick={() => setMethod('COD')}
          className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer flex items-center justify-between ${
            method === 'COD' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 bg-white'
          }`}
        >
          <div className="flex items-center gap-5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method === 'COD' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
              <FiTruck size={22} />
            </div>
            <div>
              <p className="font-black text-lg text-gray-900">Cash on Delivery</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pay at doorstep</p>
            </div>
          </div>
          {method === 'COD' && <FiCheckCircle className="text-blue-600" size={24} />}
        </div>

        {/* Dynamic Payment View */}
        <div className="mt-8">
          {method === 'UPI' ? (
            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-2xl text-center space-y-6">
              <span className="inline-block bg-blue-100 text-blue-600 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                Scan to Pay ${totalPrice}
              </span>
              
              <div className="flex justify-center">
                <img 
                  src={qrCodeUrl} 
                  alt="Payment QR" 
                  className="w-52 h-52 border-4 border-gray-50 rounded-3xl shadow-inner"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=QR+Loading..."; }}
                />
              </div>

              <button 
                type="button"
                onClick={handlePaymentAppRedirect}
                className="flex items-center justify-center gap-2 w-full text-blue-600 font-bold text-sm py-2 hover:underline"
              >
                Click to open UPI App <FiExternalLink />
              </button>
            </div>
          ) : (
            <div className="bg-gray-900 p-8 rounded-[3rem] text-white shadow-xl">
              <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">Policy</p>
              <p className="text-lg font-bold">Pay <span className="text-blue-400 font-black">${totalPrice}</span> in cash when the order is delivered to your address.</p>
            </div>
          )}
        </div>

        <button 
          onClick={submitHandler}
          className="w-full bg-blue-600 text-white py-6 rounded-[2.5rem] font-black text-xl hover:bg-black transition-all shadow-xl shadow-blue-100 mt-6 active:scale-95"
        >
          Confirm Payment Method
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;