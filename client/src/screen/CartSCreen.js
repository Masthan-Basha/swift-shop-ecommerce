import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartScreen = () => {
  const { cartItems, updateQty, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tighter">Your Shopping Bag</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looking for the latest 2026 tech arrivals?</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
          >
            Continue Shopping New Arrivals
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart List */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {cartItems.map(item => (
              <CartItem 
                key={item._id} 
                item={item} 
                updateQty={updateQty} 
                removeItem={removeItem} 
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 text-white rounded-3xl p-8 sticky top-24 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 border-b border-gray-700 pb-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Items ({cartItems.length})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400 font-bold uppercase text-xs pt-1">Free</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold mb-8">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-blue-600 py-4 rounded-2xl font-black text-lg hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/20">
                Proceed to Checkout
              </button>
              <button 
                onClick={() => navigate('/')}
                className="w-full mt-4 text-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;