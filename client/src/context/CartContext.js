import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage on startup so data isn't lost on refresh
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  );

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART logic
  const addToCart = (product) => {
    const existItem = cartItems.find((x) => x._id === product._id);

    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...existItem, qty: existItem.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  // REMOVE FROM CART logic
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  // UPDATE QUANTITY logic
  const updateQty = (id, qty) => {
    setCartItems(
      cartItems.map((x) => (x._id === id ? { ...x, qty: Number(qty) } : x))
    );
  };

  // CLEAR CART logic
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQty, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};