'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavbarLinksClient() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Discover' },
    { href: '/our-story', label: 'Our Story' },
    { href: '/facilities', label: 'Facilities' },
    { href: '/memberships', label: 'Memberships' },
    { href: '/coaches', label: 'Coaches' },
    { href: '/insights', label: 'Insights' },
    { href: '/connect', label: 'Connect' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`transition-colors hover:text-indigo-600 ${
            isActive(link.href)
              ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600 pb-0.5'
              : 'text-slate-650 font-semibold'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
