import Link from 'next/link';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Blogs', href: '/dashboard/blogs', icon: UserIcon },
  { name: 'About', href: '/dashboard/about', icon: ShoppingCartIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-full bg-black text-white p-3 text-sm font-medium hover:text-amber-200 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
           
          </Link>
        );
      })}
    </>
  );
}
