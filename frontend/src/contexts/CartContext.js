// CartContext.js
import React, {createContext, useContext, useState} from 'react';

export const CartContext = createContext([]);

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);

  // Function to calculate total item count
  const getItemCount = () => cart.reduce((count, item) => count + item.count, 0);

  const addToCart = (product) => {// todo not used yet
    let newCart;
    const existingItem = cart.find(item => item.product._id === product._id);
    if (existingItem) {
      newCart = cart.map(item => {
        if (item.product._id === product._id) {
          return {
            ...item,
            count: item.count + 1
          };
        }
        return item;
      });
    } else {
      newCart = [
        ...cart,
        {
          product: product,
          count: 1
        }
      ];
    }
    setCart(newCart);

  }

  return (
    <CartContext.Provider value={{cart, setCart, getItemCount, addToCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
