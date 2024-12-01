'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Page() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [dropPoint, setDropPoint] = useState<[number, number] | null>(null);

  // Fetch filtered products from the API based on the search query
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products?search=${searchQuery}`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [searchQuery]); // Refetch data when search query changes

  // Get user's current location using Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      });
    }
  }, []);

  // Component to handle map events (clicking on the map to set drop point)
  function LocationSetter() {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setDropPoint([lat, lng]); // Set the drop point when user clicks on the map
      },
    });
    return null;
  }

  // Default map center if user's location is not yet available
  const defaultCenter = [51.505, -0.09]; // Default fallback location (London)
  const center = userLocation || defaultCenter;

  return (
    <main className="flex min-h-screen flex-col p-6 space-y-6">
      {/* What Are You Craving Section */}
      <section className="w-full text-center">
        <h2 className="text-5xl font-extrabold mt-3 mb-8 text-gradient">
          What are you craving today?
        </h2>

        {/* Search Bar with Icon */}
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

      {/* Best Sellers Section */}
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

                {/* Product Details */}
                <div className="mt-4 w-full text-center">
                  <h3 className="font-bold text-lg">{product.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-600">{product.price}</p>
                    {/* Add to Cart Button */}
                    <button className="px-4 py-1 bg-amber-300 text-black text-sm font-medium rounded-md hover:bg-amber-200">
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

      {/* Location Section with Interactive Map */}
      <section>
        <h2 className="text-3xl font-semibold mt-5 mb-7">Choose Location</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Map Container */}
          <div className="h-96 w-full border border-gray-300 rounded-md">
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              whenCreated={(map) => {
                // Optionally set a user location marker on load
                if (userLocation) {
                  map.setView(userLocation, 13);
                }
              }}
            >
              {/* Tile Layer */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Marker for User's Current Location */}
              {userLocation && (
                <Marker position={userLocation}>
                  <Popup>Your current location</Popup>
                </Marker>
              )}
              {/* Marker for Drop Point */}
              {dropPoint && (
                <Marker position={dropPoint}>
                  <Popup>Drop point selected</Popup>
                </Marker>
              )}
              {/* Handle Location Selection */}
              <LocationSetter />
            </MapContainer>
          </div>
        </div>
      </section>
    </main>
  );
}
