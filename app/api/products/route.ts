// app/api/products/route.ts

export async function GET(request: Request) {
    const productsData = [
      { id: 1, image: '/p1.jpg', title: 'Product 1', price: '130.00' },
      { id: 2, image: '/p2.jpg', title: 'Product 2', price: '100.00' },
      { id: 3, image: '/p3.jpg', title: 'Product 3', price: '420.00' },
      { id: 4, image: '/p4.jpg', title: 'Product 4', price: '225.00' },
    ];
  
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('search') || '';
  
    const filteredProducts = productsData.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return new Response(JSON.stringify(filteredProducts), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  