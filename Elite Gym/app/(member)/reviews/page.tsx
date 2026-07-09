import { Metadata } from 'next';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import ReviewsClient from './ReviewsClient';
import { getReviews } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Gym Reviews & Feedback',
};

export default async function ReviewsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const allReviews = await getReviews();
  
  // Reviews submitted by this user
  const reviews = allReviews
    .filter(r => r.userId === session.userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-space tracking-tight">Gym Reviews & Feedback</h1>
        <p className="text-slate-500 text-sm">Submit ratings and comment feedback to be featured on the Elite Gym homepage.</p>
      </div>
      
      <ReviewsClient initialReviews={reviews} />
    </div>
  );
}
