import { Metadata } from 'next';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import MembershipClient from './MembershipClient';
import { getPackages } from '@/lib/sanity-service';
import { getUsers, getPayments } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Membership & Billing',
};

export default async function MembershipPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const users = await getUsers();
  const user = users.find(u => u.id === session.userId);
  if (!user) redirect('/login');

  const packages = await getPackages();
  const currentPackage = packages.find(p => p.id === user.packageId) || null;
  
  const payments = await getPayments();
  const paymentsHistory = payments
    .filter(p => p.userId === user.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const hasApprovedPayment = paymentsHistory.some(p => p.status === 'approved');
  const derivedStatus = hasApprovedPayment ? 'active' : (user.packageStatus || 'none');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-space tracking-tight">Membership & Payments Billing</h1>
        <p className="text-slate-500 text-sm">Select your membership plan, submit a booking request, and activate via WhatsApp.</p>
      </div>
      
      <MembershipClient
        packages={packages}
        currentPackage={currentPackage}
        packageStatus={derivedStatus}
        packageExpiry={user.packageExpiry}
        paymentsHistory={paymentsHistory}
        userEmail={user.email}
        userPhone={user.phone || ''}
      />
    </div>
  );
}
