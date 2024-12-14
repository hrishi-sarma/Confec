'use client';

import { createContext, useContext, useState } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: string; // Assuming price is a string, consider changing to number for easier calculations
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  incrementQuantity: (item: CartItem) => void;
  decrementQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  calculateTotal: () => number;
  taxRate: number;
  deliveryCharge: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const taxRate = 0.05; // 5% tax
  const deliveryCharge = 60; // Default delivery charge

  const incrementQuantity = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const decrementQuantity = (id: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevCart.filter((cartItem) => cartItem.id !== id);
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
    const tax = subtotal * taxRate;
    return subtotal + tax + deliveryCharge;
  };

  return (
    <CartContext.Provider
      value={{ cart, incrementQuantity, decrementQuantity, removeFromCart, calculateTotal, taxRate, deliveryCharge }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};