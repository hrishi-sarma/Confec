import '@/app/ui/global.css';
import Navbar from '@/app/nav/navBar'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <Navbar></Navbar>
        {children}
        
      </body>
    </html>
  );
}
