import { Metadata } from 'next';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import ClassesClient from './ClassesClient';
import { getBookings, getClasses } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Class Scheduling & Booking',
};

export default async function ClassesPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const classes = await getClasses();
  const bookings = await getBookings();
  
  // Booked classes for this member
  const bookedClasses = bookings
    .filter(b => b.userId === session.userId)
    .map(b => ({
      bookingId: b.id,
      classId: b.classId
    }));

  // Count active bookings for all classes to determine capacity status
  const bookingsCount: { [classId: string]: number } = {};
  bookings.forEach((b) => {
    bookingsCount[b.classId] = (bookingsCount[b.classId] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-space tracking-tight">Class Scheduling & Booking</h1>
        <p className="text-slate-500 text-sm">Browse our premium Yoga, Zumba, HIIT, CrossFit sessions and book your spot.</p>
      </div>
      
      <ClassesClient 
        classes={classes} 
        bookedClasses={bookedClasses} 
        bookingsCount={bookingsCount} 
      />
    </div>
  );
}
