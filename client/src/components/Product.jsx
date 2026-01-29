import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Added useSelector
import { FiShoppingCart, FiCheck } from 'react-icons/fi'; // Added Check icon
import { addToCart } from '../store/cartSlice';
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  // Check if item is already in cart to show a badge
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isInCart = cartItems.find((x) => x._id === product._id);

  const addToCartHandler = (e) => {
    e.preventDefault(); 
    dispatch(addToCart({ ...product, qty: 1 }));
    
    // Simple visual feedback
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Product Image Link */}
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          
          {/* Status Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.countInStock === 0 ? (
              <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold">
                Out of Stock
              </span>
            ) : isInCart && (
              <span className="bg-green-500 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold">
                In Cart
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-4">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{product.brand}</p>
        
        <Link to={`/product/${product._id}`}>
          <h3 className="mt-1 font-semibold text-gray-900 group-hover:text-blue-600 truncate">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          
          <button 
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className={`p-2 rounded-lg transition-all transform active:scale-95 ${
              product.countInStock === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : added 
                  ? 'bg-green-500 text-white' 
                  : 'bg-black text-white hover:bg-blue-600 shadow-md hover:shadow-blue-200'
            }`}
          >
            {added ? <FiCheck size={18} /> : <FiShoppingCart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;