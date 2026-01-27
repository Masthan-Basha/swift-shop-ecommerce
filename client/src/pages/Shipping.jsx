import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/cartSlice';

const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode }));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-black mb-8 tracking-tighter">Shipping Address</h1>
      <form onSubmit={submitHandler} className="space-y-6 bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Street Address</label>
          <input 
            type="text" value={address} required
            className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-medium"
            onChange={(e) => setAddress(e.target.value)} 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">City</label>
            <input 
              type="text" value={city} required
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-medium"
              onChange={(e) => setCity(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Postal Code</label>
            <input 
              type="text" value={postalCode} required
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-medium"
              onChange={(e) => setPostalCode(e.target.value)} 
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black hover:bg-black transition-all shadow-lg shadow-blue-100">
          Continue to Summary
        </button>
      </form>
    </div>
  );
};

export default Shipping;