import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { getSession } from '@/lib/session';
import NavbarLinksClient from './NavbarLinksClient';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const session = await getSession();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-space font-bold tracking-tight uppercase leading-none text-slate-900">Elite Fitness</span>
            <span className="text-[10px] text-slate-500 tracking-widest uppercase font-semibold">Sri Lanka</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <NavbarLinksClient />

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <Link href="/member-dashboard" className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-xl shadow shadow-indigo-100">
                Dashboard
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors cursor-pointer">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold hover:text-indigo-600 text-slate-600 transition-colors">
                Login
              </Link>
              <Link href="/register" className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 rounded-xl shadow shadow-indigo-100">
                Join Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <NavbarClient session={session} />
      </div>
    </nav>
  );
}
