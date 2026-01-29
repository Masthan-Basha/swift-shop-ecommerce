import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveShippingAddress } from '../store/cartSlice';
import { toast } from 'react-toastify';
import { FiMapPin, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Shipping = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🛡️ Helper to validate and save data
  const performSave = () => {
    if (!address || !city || !postalCode) {
      toast.error('Please fill in all fields');
      return false;
    }
    dispatch(saveShippingAddress({ address, city, postalCode }));
    return true;
  };

  // 🚀 PATH: Standard Submit (Proceed to Place Order)
  const submitHandler = (e) => {
    e.preventDefault();
    if (performSave()) {
      navigate('/placeorder');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      
      {/* 🚀 Navigation Link: Back to Cart */}
      <button 
        onClick={() => navigate('/cart')}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black mb-8 transition-colors"
      >
        <FiArrowLeft /> Back to Cart
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <FiMapPin size={24} />
        </div>
        <h1 className="text-4xl font-black tracking-tighter italic">Shipping.</h1>
      </div>

      <form onSubmit={submitHandler} className="space-y-6 bg-white p-10 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Street Address</label>
            <input 
              type="text" 
              value={address} 
              required
              placeholder="e.g. 123 Main St"
              className="w-full p-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-900 transition-all outline-none"
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">City</label>
              <input 
                type="text" 
                value={city} 
                required
                placeholder="Your City"
                className="w-full p-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-900 transition-all outline-none"
                onChange={(e) => setCity(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Postal Code</label>
              <input 
                type="text" 
                value={postalCode} 
                required
                placeholder="Zip Code"
                className="w-full p-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-900 transition-all outline-none"
                onChange={(e) => setPostalCode(e.target.value)} 
              />
            </div>
          </div>
        </div>

        <div className="pt-6">
          {/* Main Primary Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            Review & Place Order <FiArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;