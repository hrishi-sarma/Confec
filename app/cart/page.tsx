'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

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
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </main>
  );
}
