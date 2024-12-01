import Image from 'next/image';

export default function Page() {
  const products = [
    { id: 1, image: '/p1.jpg', title: 'Product 1', price: '$10.00' },
    { id: 2, image: '/p2.jpg', title: 'Product 2', price: '$15.00' },
    { id: 3, image: '/p3.jpg', title: 'Product 3', price: '$20.00' },
    { id: 4, image: '/p4.jpg', title: 'Product 4', price: '$25.00' },
  ];

  return (
    <main className="flex min-h-screen flex-col p-6 space-y-6">
      {/* Best Sellers Section */}
      <section className="w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Best Sellers</h2>
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center border border-gray-300 rounded-md p-4"
            >
              {/* Product Image */}
              <div className="w-40 h-40 relative">
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
                  <button className="px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Choose Location</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Map Placeholder */}
          <div className="h-40 border border-gray-300 rounded-md flex items-center justify-center">
            <span className="text-gray-500">Map</span>
          </div>
        </div>
      </section>
    </main>
  );
}
