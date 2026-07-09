'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CalendarDays, User, CreditCard, HeartPulse, Star } from 'lucide-react';

export default function MemberSidebarNav() {
  const pathname = usePathname();

  const links = [
    { href: '/member-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/classes', label: 'Class Bookings', icon: CalendarDays },
    { href: '/membership', label: 'Billing & Slip Upload', icon: CreditCard },
    { href: '/bmi-history', label: 'BMI Health History', icon: HeartPulse },
    { href: '/reviews', label: 'Submit Review', icon: Star },
    { href: '/profile', label: 'Profile Settings', icon: User },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="flex-1 px-4 space-y-1">
      {links.map((link) => {
        const Icon = link.icon;
        const active = isActive(link.href);
        return (
          <Link 
            key={link.href}
            href={link.href} 
            className={`flex items-center gap-3 py-3.5 transition-all text-sm font-semibold rounded-xl ${
              active 
                ? 'text-indigo-600 bg-indigo-50/70 border-l-4 border-indigo-600 pl-3' 
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-4'
            }`}
          >
            <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'}`} />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
