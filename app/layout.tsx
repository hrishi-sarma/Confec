import '@/app/ui/global.css'; 
import Navbar from '@/app/nav/navBar'; 
import { CartProvider } from '@/app/context/CartContext'; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
