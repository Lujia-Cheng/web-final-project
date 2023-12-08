// CartContext.js
import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to calculate total item count
  const getItemCount = () => cart.reduce((count, item) => count + item.count, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
