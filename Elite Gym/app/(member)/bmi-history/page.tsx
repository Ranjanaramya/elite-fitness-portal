import { Metadata } from 'next';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import BmiHistoryClient from './BmiHistoryClient';
import { getBmiHistory } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'BMI Health Tracker',
};

export default async function BmiHistoryPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const bmiHistory = await getBmiHistory();
  
  // BMI records for this member
  const history = bmiHistory
    .filter(b => b.userId === session.userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-space tracking-tight">BMI Health Tracker</h1>
        <p className="text-slate-500 text-sm">Calculate and monitor your Body Mass Index (BMI) logs over time.</p>
      </div>
      
      <BmiHistoryClient initialHistory={history} />
    </div>
  );
}
