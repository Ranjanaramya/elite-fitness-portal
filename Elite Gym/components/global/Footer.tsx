import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight uppercase leading-none text-white">Elite Fitness</span>
              <span className="text-[10px] text-slate-500 tracking-widest uppercase">Sri Lanka</span>
            </div>
          </Link>
          <p className="text-sm text-slate-400">
            Premium gym and fitness center in Sri Lanka offering personal training, group classes, and state-of-the-art amenities.
          </p>
        </div>

        <div>
          <h3 className="font-space font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/our-story" className="hover:text-indigo-400 transition-colors">Our Story</Link></li>
            <li><Link href="/memberships" className="hover:text-indigo-400 transition-colors">Memberships</Link></li>
            <li><Link href="/facilities" className="hover:text-indigo-400 transition-colors">Facilities</Link></li>
            <li><Link href="/insights" className="hover:text-indigo-400 transition-colors">Insights</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-space font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 text-indigo-400" />
              <span>123 Fitness Avenue, Colombo 03, Sri Lanka</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 shrink-0 text-indigo-400" />
              <span>+94 11 234 5678</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 shrink-0 text-indigo-400" />
              <span>hello@elitefitness.lk</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-space font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Instagram" className="p-2 bg-slate-800 border border-slate-700 rounded-full hover:bg-slate-700 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="/" aria-label="Facebook" className="p-2 bg-slate-800 border border-slate-700 rounded-full hover:bg-slate-700 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="/" aria-label="Twitter" className="p-2 bg-slate-800 border border-slate-700 rounded-full hover:bg-slate-700 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
        &copy; 2026 Elite Fitness Sri Lanka. All rights reserved.
      </div>
    </footer>
  );
}
