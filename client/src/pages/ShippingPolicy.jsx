import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/cartSlice';

const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode }));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-[2.5rem] shadow-xl">
      <h1 className="text-3xl font-black mb-8 tracking-tighter">Shipping Destination</h1>
      <form onSubmit={submitHandler} className="space-y-6">
        <input 
          type="text" placeholder="Address" value={address}
          className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setAddress(e.target.value)} required 
        />
        <div className="flex gap-4">
          <input 
            type="text" placeholder="City" value={city}
            className="w-1/2 p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCity(e.target.value)} required 
          />
          <input 
            type="text" placeholder="Postal Code" value={postalCode}
            className="w-1/2 p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPostalCode(e.target.value)} required 
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all">
          Continue to Checkout
        </button>
      </form>
    </div>
  );
};

export default Shipping;