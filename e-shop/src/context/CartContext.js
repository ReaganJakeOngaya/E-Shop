// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { token } = useContext(AuthContext);

  const addToCart = async (product) => {
    if (!token) return;

    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1
      })
    });

    if (response.ok) {
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = async (productId) => {
    if (!token) return;

    const response = await fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        product_id: productId
      })
    });

    if (response.ok) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}