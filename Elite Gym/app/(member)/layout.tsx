import { Metadata } from 'next';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut, ArrowLeft } from 'lucide-react';
import MemberSidebarNav from '@/components/global/MemberSidebarNav';
import { getUsers, getPayments } from '@/lib/data-service';
import { getPackages } from '@/lib/sanity-service';

export const metadata: Metadata = {
  title: 'Member Portal',
  description: 'Elite Fitness member portal for class scheduling, BMI tracking, and membership billing.',
};

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.role !== 'member') {
    redirect('/login');
  }

  const users = await getUsers();
  const user = users.find(u => u.id === session.userId);
  if (!user || user.status === 'suspended') {
    redirect('/login');
  }

  const packages = await getPackages();
  const activePackage = packages.find(p => p.id === user.packageId);
  const payments = await getPayments();
  const userPayments = payments.filter(p => p.userId === user.id);
  const hasApprovedPayment = userPayments.some(p => p.status === 'approved');
  const derivedStatus = hasApprovedPayment ? 'active' : (user.packageStatus || 'none');
  const packageStatusLabel = derivedStatus === 'active' ? 'Active Member' : derivedStatus === 'pending' ? 'Pending Approval' : 'No Active Package';

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-200 flex flex-col bg-white shrink-0 shadow-sm">
        {/* Identity */}
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow shadow-indigo-150">
            <svg className="w-5.5 h-5.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight uppercase leading-none text-slate-900">Elite Fitness</span>
            <span className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">Member Portal</span>
          </div>
        </div>

        {/* User Card */}
        <div className="px-6 pb-6">
          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-slate-200 overflow-hidden shrink-0 relative">
              <Image
                src={user.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-sm text-slate-900 truncate leading-snug">{user.name}</h4>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <MemberSidebarNav />

        {/* Footer actions */}
        <div className="p-6 border-t border-slate-200">
          <form action="/api/auth/logout" method="POST" className="w-full mb-3">
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 font-bold rounded-xl transition-colors text-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </form>
          <Link 
            href="/" 
            className="flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-indigo-600 transition-colors font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Marketing Site
          </Link>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-24 border-b border-slate-200 flex items-center justify-between px-10 shrink-0 bg-white shadow-sm z-10">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-slate-400 text-xs mt-0.5">Elite Fitness Colombo • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 shadow-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${derivedStatus === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : derivedStatus === 'pending' ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-slate-300'}`}></span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">{packageStatusLabel}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-10 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
