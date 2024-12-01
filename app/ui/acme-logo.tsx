import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image'; // Import the Image component
import logo from '@/public/logo.png'; // Import the logo as a static file

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-black`}
    >
      <Image src={logo} alt="Acme Logo" width={75} height={75} /> {/* Adjust width/height as needed */}
      <p className="ml-2 text-[25px] whitespace-nowrap">Cupcake & paradise</p> {/* Prevent truncation */}
    </div>
  );
}