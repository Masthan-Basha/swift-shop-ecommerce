import React from 'react';
import { useDispatch } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { removeFromCart, addToCart } from '../store/cartSlice'; // We use addToCart for qty updates too

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const qtyHandler = (newQty) => {
    // We dispatch the whole item with the updated quantity
    dispatch(addToCart({ ...item, qty: Number(newQty) }));
  };

  const removeHandler = () => {
    dispatch(removeFromCart(item._id));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-contain mix-blend-multiply" 
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900 truncate uppercase tracking-tight">
              {item.name}
            </h3>
            <p className="text-xs font-semibold text-blue-600 mb-2">{item.brand}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
            <button 
              onClick={() => qtyHandler(item.qty - 1)}
              disabled={item.qty <= 1}
              className="p-2 hover:bg-gray-100 text-gray-600 disabled:opacity-25 transition-colors"
            >
              <Minus size={14} strokeWidth={3} />
            </button>
            
            <span className="w-10 text-center text-sm font-black text-gray-800">
              {item.qty}
            </span>

            <button 
              onClick={() => qtyHandler(item.qty + 1)}
              disabled={item.qty >= item.countInStock}
              className="p-2 hover:bg-gray-100 text-gray-600 disabled:opacity-25 transition-colors"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>

          <button 
            onClick={removeHandler}
            className="group flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={14} className="group-hover:animate-bounce" />
            <span>REMOVE</span>
          </button>
        </div>
      </div>

      {/* Price Section */}
      <div className="text-right min-w-[100px]">
        <p className="text-xl font-black text-gray-900">
          ${(item.price * item.qty).toFixed(2)}
        </p>
        {item.qty > 1 && (
          <p className="text-[10px] text-gray-400 font-bold tracking-widest">
            ${item.price.toFixed(2)} EACH
          </p>
        )}
      </div>
    </div>
  );
};

export default CartItem;