'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SessionPayload } from '@/lib/session';

export default function NavbarClient({ session }: { session: SessionPayload | null }) {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="md:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 text-slate-600 focus:outline-none hover:bg-slate-50 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl flex flex-col p-6 space-y-2 z-40 animate-in fade-in slide-in-from-top-4 duration-200">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-semibold transition-colors ${
                isActive(link.href)
                  ? 'text-indigo-600 font-extrabold bg-indigo-50/50 px-3 py-2 rounded-xl border-l-4 border-indigo-600'
                  : 'text-slate-700 hover:text-indigo-600 px-3 py-2'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <hr className="border-slate-100" />
          
          <div className="flex flex-col gap-3 pt-2">
            {session ? (
              <>
                <Link 
                  href="/member-dashboard" 
                  onClick={() => setIsOpen(false)} 
                  className="w-full text-center py-3 font-bold text-white bg-indigo-600 rounded-xl"
                >
                  Dashboard
                </Link>
                
                <form action="/api/auth/logout" method="POST" className="w-full">
                  <button 
                    type="submit" 
                    onClick={() => setIsOpen(false)} 
                    className="w-full text-center py-3 font-bold text-red-600 border border-red-100 bg-red-50 rounded-xl"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)} 
                  className="w-full text-center py-3 font-semibold text-slate-700 border border-slate-200 rounded-xl"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setIsOpen(false)} 
                  className="w-full text-center py-3 font-bold text-white bg-indigo-600 rounded-xl"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
