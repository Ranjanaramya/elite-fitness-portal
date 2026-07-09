import { Metadata } from 'next';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import NotificationList from '@/components/dashboard/NotificationList';
import { Calendar, HeartPulse, CreditCard, ChevronRight, User, Dumbbell, Sparkles } from 'lucide-react';
import { getPackages } from '@/lib/sanity-service';
import { getUsers, getBookings, getClasses, getNotifications, getBmiHistory, getPayments } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Member Dashboard',
};

export default async function MemberDashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const users = await getUsers();
  const user = users.find(u => u.id === session.userId);
  if (!user) redirect('/login');

  const packages = await getPackages();
  const activePackage = packages.find(p => p.id === user.packageId);

  // User bookings
  const bookings = await getBookings();
  const classes = await getClasses();
  const userBookings = bookings
    .filter(b => b.userId === user.id)
    .map(b => {
      const cls = classes.find(c => c.id === b.classId);
      return {
        bookingId: b.id,
        className: cls?.name || 'Power Workout',
        time: cls?.time || '06:00 PM',
        day: cls?.day || 'Today',
        trainer: cls?.trainer || 'Coach'
      };
    });

  // Notifications
  const notifications = await getNotifications();
  const userNotifs = notifications
    .filter(n => n.userId === user.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // BMI log
  const bmiHistory = await getBmiHistory();
  const bmiLogs = bmiHistory.filter(b => b.userId === user.id);
  const latestBmi = bmiLogs.length > 0 ? bmiLogs[bmiLogs.length - 1] : null;

  // Last payment slip
  const payments = await getPayments();
  const userPayments = payments.filter(p => p.userId === user.id);
  const lastPayment = userPayments.length > 0 ? userPayments[userPayments.length - 1] : null;

  const hasApprovedPayment = userPayments.some(p => p.status === 'approved');
  const derivedStatus = hasApprovedPayment ? 'active' : (user.packageStatus || 'none');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Overview stats cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Package Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-3xl border border-indigo-900/50 p-8 flex flex-col justify-between shadow-lg text-white">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-widest block mb-1">Current Membership Plan</span>
              <h2 className="text-4xl font-extrabold font-space tracking-tight">{activePackage ? activePackage.name : 'No Active Membership'}</h2>
              <p className="text-indigo-200/80 text-sm mt-3.5 max-w-md">
                {activePackage ? `Enjoy full access to Colombo 03 amenities & steam rooms.` : 'Unlock gym access, book classes, and train with experts today!'}
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${derivedStatus === 'active' ? 'bg-emerald-500/25 border border-emerald-500/35 text-emerald-400' : derivedStatus === 'pending' ? 'bg-amber-500/25 border border-amber-500/35 text-amber-400' : 'bg-red-500/25 border border-red-500/35 text-red-400'}`}>
                {derivedStatus === 'active' ? 'Active' : derivedStatus === 'pending' ? 'Pending Approval' : 'Inactive'}
              </span>
              
              {derivedStatus === 'active' && user.packageExpiry && (
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                  Expires: {new Date(user.packageExpiry).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link 
              href="/membership" 
              className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.01] active:scale-95 shadow shadow-indigo-500/10 text-sm"
            >
              {user.packageStatus === 'active' ? 'UPGRADE OR RENEW PLAN' : 'BUY A PLAN'}
            </Link>
            <Link 
              href="/membership" 
              className="flex-1 text-center border border-slate-700 bg-slate-900/50 hover:bg-slate-900 text-slate-300 font-bold py-4 rounded-2xl transition-colors text-sm"
            >
              VIEW BILLING DETAILS
            </Link>
          </div>
        </div>

        {/* Bookings Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Booked Classes</h3>
              <Link href="/classes" className="text-xs font-bold text-indigo-600 hover:text-indigo-850 flex items-center gap-0.5">
                Schedule <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            
            {userBookings.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm flex flex-col items-center">
                <Dumbbell className="w-8 h-8 text-slate-300 mb-3" />
                <p>No booked classes.</p>
                <Link href="/classes" className="text-xs font-bold text-indigo-600 underline mt-2">Book a class</Link>
              </div>
            ) : (
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                {userBookings.map((b) => (
                  <div key={b.bookingId} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{b.className}</span>
                      <span className="text-xs text-slate-500 mt-0.5">{b.day} • {b.time}</span>
                    </div>
                    <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg font-mono font-extrabold">
                      BOOKED
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Second row stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Membership Booking Status Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="flex-1 text-center sm:text-left space-y-2">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Membership Request Status</h3>
            {derivedStatus === 'pending' && activePackage ? (
              <div>
                <p className="text-lg font-bold leading-tight text-slate-950">Awaiting WhatsApp Activation</p>
                <p className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
                  Your request for <strong className="text-indigo-600 font-bold">{activePackage.name}</strong> is logged. Please contact us on WhatsApp to finalize your active membership details.
                </p>
              </div>
            ) : derivedStatus === 'active' && activePackage ? (
              <div>
                <p className="text-lg font-bold leading-tight text-slate-950">Active Subscription</p>
                <p className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
                  You are registered on the <strong className="text-emerald-600 font-bold">{activePackage.name}</strong>. You have full access to all booked training slots and facilities.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-bold text-slate-950">No Package Booked</p>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-semibold">
                  You do not have any active or pending memberships. Select a fitness plan to start your training journey.
                </p>
              </div>
            )}
          </div>
          
          <div className="shrink-0 flex items-center gap-4">
            <Link 
              href="/membership" 
              className="px-5 py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-650 font-bold transition-colors w-36 h-32 shadow-sm text-center"
            >
              <CreditCard className="w-5 h-5 mb-2.5 text-indigo-650" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Billing details</span>
            </Link>
            
            <div className="flex flex-col">
              <span className={`px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider w-fit mb-2 ${derivedStatus === 'pending' ? 'bg-orange-500/15 text-orange-700' : derivedStatus === 'active' ? 'bg-emerald-500/15 text-emerald-700' : 'bg-slate-150 text-slate-600'}`}>
                {derivedStatus ? derivedStatus.toUpperCase() : 'INACTIVE'}
              </span>
              <span className="text-[10px] text-slate-400 max-w-[150px] leading-relaxed font-semibold">
                {derivedStatus === 'pending' ? 'Verification via WhatsApp required.' : derivedStatus === 'active' ? 'Enjoy full training slots & group classes.' : 'Select a membership package to begin.'}
              </span>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <NotificationList initialNotifs={userNotifs} />

      </div>

      {/* Third row - BMI Tracking Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Health BMI Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between lg:col-span-1">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">BMI Status</h3>
              <Link href="/bmi-history" className="text-xs font-bold text-indigo-600 hover:text-indigo-850 flex items-center gap-0.5">
                History <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            
            {latestBmi ? (
              <div className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold font-space text-slate-900 tracking-tight">{latestBmi.bmi}</span>
                  <span className="text-xs font-bold text-indigo-600 font-mono">BMI SCORE</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3.5 border border-slate-200/50 rounded-2xl">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Weight</span>
                    <span className="font-bold text-sm text-slate-900">{latestBmi.weight} kg</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 border border-slate-200/50 rounded-2xl">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Height</span>
                    <span className="font-bold text-sm text-slate-900">{latestBmi.height} m</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 text-emerald-800 text-xs font-bold">
                  {latestBmi.bmi < 18.5 ? 'UNDERWEIGHT' : latestBmi.bmi < 24.9 ? 'NORMAL WEIGHT RANGE ✓' : latestBmi.bmi < 29.9 ? 'OVERWEIGHT' : 'OBESE RANGE'}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400 text-sm flex flex-col items-center">
                <HeartPulse className="w-8 h-8 text-slate-350 mb-3" />
                <p>No health logs saved.</p>
                <Link href="/bmi-history" className="text-xs font-bold text-indigo-600 underline mt-2">Log BMI score</Link>
              </div>
            )}
          </div>
        </div>

        {/* Motivation Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl border border-indigo-100/60 p-8 shadow-sm flex items-center justify-between">
          <div className="space-y-4 max-w-md">
            <div className="bg-indigo-600 text-white rounded-lg p-2.5 w-fit shadow-md shadow-indigo-200/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-space font-bold text-2xl text-indigo-950">Daily Fitness Goal Checklist</h3>
            <p className="text-slate-650 text-sm leading-relaxed">
              Consistently tracking weight, booking training classes early, and executing daily strength routines increases muscle protein synthesis and reinforces habits. Set high standards!
            </p>
          </div>
          
          <div className="hidden sm:block text-indigo-200">
            <svg className="w-32 h-32 opacity-25" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.03 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-1.03 14.5l-3.5-3.5 1.41-1.41 2.09 2.08 5.58-5.59 1.41 1.41-7 7z" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
