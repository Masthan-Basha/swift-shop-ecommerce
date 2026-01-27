import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../store/cartSlice';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const placeOrderHandler = () => {
    dispatch(createOrder({ userEmail: userInfo.email }));
    
    // Retrieve the ID of the order we just pushed to localStorage
    const allOrders = JSON.parse(localStorage.getItem('all_orders'));
    const latestOrder = allOrders[allOrders.length - 1];
    
    toast.success('Order Placed Successfully!');
    navigate(`/order/${latestOrder._id}`);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Delivery To</h2>
            <p className="font-bold text-lg">{cart.shippingAddress.address}</p>
            <p className="text-gray-500">{cart.shippingAddress.city}, {cart.shippingAddress.postalCode}</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Review Items</h2>
            {cart.cartItems.map((item, index) => (
              <div key={index} className="flex justify-between py-4 border-b border-gray-50 last:border-0">
                <span className="font-bold text-gray-800">{item.name} <span className="text-gray-400 ml-2">x{item.qty}</span></span>
                <span className="font-black text-blue-600">${(item.qty * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black text-white p-10 rounded-[3rem] h-fit sticky top-24">
          <h2 className="text-2xl font-black mb-8">Checkout Summary</h2>
          <div className="space-y-4 mb-10">
            <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>${cart.itemsPrice}</span></div>
            <div className="flex justify-between text-gray-400"><span>Shipping</span><span>${cart.shippingPrice}</span></div>
            <div className="flex justify-between text-gray-400"><span>Estimated Tax</span><span>${cart.taxPrice}</span></div>
            <div className="flex justify-between text-2xl font-black pt-6 border-t border-white/10">
              <span>Total</span><span>${cart.totalPrice}</span>
            </div>
          </div>
          <button 
            onClick={placeOrderHandler}
            disabled={cart.cartItems.length === 0}
            className="w-full bg-blue-600 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-black transition-all disabled:opacity-50"
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;