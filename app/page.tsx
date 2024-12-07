'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useCart } from './context/CartContext';
import 'leaflet/dist/leaflet.css';

export default function Page() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products?search=${searchQuery}`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <main className="flex min-h-screen flex-col p-6 space-y-6">
      {/* Search Section */}
      <section className="w-full text-center">
        <h2 className="text-5xl font-extrabold mt-3 mb-8 text-gradient">
          What are you craving today?
        </h2>

        <div className="flex justify-center items-center mt-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="w-full">
        <div className="grid grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product: any) => (
              <div
                key={product.id}
                className="flex flex-col items-center border border-gray-300 rounded-md p-4 shadow-xl"
              >
                {/* Product Image */}
                <div className="relative w-full h-80">
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="object-cover rounded-md"
                    fill
                  />
                </div>

                {/* Product Info */}
                <div className="mt-4 w-full text-center">
                  <h3 className="font-bold text-lg">{product.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-600">${product.price}</p>

                    {/* Add to Cart Button */}
                    <button
                      className="px-4 py-1 bg-amber-300 text-black text-sm font-medium rounded-md hover:bg-amber-200"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4">No products found</p>
          )}
        </div>
      </section>
    </main>
  );
}
