'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, calculateTotal, taxRate, deliveryCharge } = useCart();
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  const subtotal = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );
  const tax = subtotal * taxRate;
  const total = calculateTotal();

  return (
    <main className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-4xl font-bold">Your Shopping Cart</h1>
      {cart.length > 0 ? (
        <div className="w-full max-w-4xl">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border-b border-gray-300"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="object-cover rounded-md"
                    fill
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <button
                className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-400"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6">
            <button
              className="text-blue-500 underline"
              onClick={toggleDetails}
            >
              {showDetails ? 'Hide Details' : 'Show Total Details'}
            </button>
            <div className="mt-2">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              {showDetails && (
                <div className="mt-2 text-gray-700">
                  <p>Subtotal: ${subtotal.toFixed(2)}</p>
                  <p>Tax (5%): ${tax.toFixed(2)}</p>
                  <p>Delivery Charge: ${deliveryCharge.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </main>
  );
}
