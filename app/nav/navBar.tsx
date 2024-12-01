import Link from 'next/link';
import NavLinks from '@/app/nav/navLinks';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function TopNav() {
  return (
    <div className="sticky top-0 z-50 flex h-20 min-h-20 items-center justify-between px-4 bg-amber-200 md:px-6 border-b border-black-1000 shadow-lg">
      {/* Logo Section */}
      <Link href="/" className="flex items-center">
        <div className="w-32 text-black md:w-40">
          <AcmeLogo />
        </div>
      </Link>

      {/* Navigation and Actions */}
      <div className="flex items-center space-x-4">
        {/* Navigation Links */}
        <NavLinks />
      </div>
    </div>
  );
}
