'use client';

import { useState } from 'react';
import { bookClass, cancelBooking } from '@/lib/actions';
import { GymClass } from '@/lib/types';
import { Calendar, User, Clock, Check, X, AlertCircle } from 'lucide-react';

interface BookedClass {
  bookingId: string;
  classId: string;
}

export default function ClassesClient({
  classes,
  bookedClasses,
  bookingsCount
}: {
  classes: GymClass[];
  bookedClasses: BookedClass[];
  bookingsCount: { [classId: string]: number };
}) {
  const [activeDay, setActiveDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>('Monday');
  const [loadingClassId, setLoadingClassId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const handleBook = async (classId: string) => {
    setLoadingClassId(classId);
    setError('');
    setSuccess('');
    try {
      const res = await bookClass(classId);
      if (res.success) {
        setSuccess('Class booked successfully! NOTE: Please ensure your membership fees are paid in person or through WhatsApp before you attend the class.');
        // Refresh page since Next.js server actions revalidate paths, wait, standard page updates happen on revalidate
      } else {
        setError(res.error || 'Failed to book class.');
      }
    } catch (e) {
      setError('An error occurred.');
    } finally {
      setLoadingClassId(null);
    }
  };

  const handleCancel = async (bookingId: string, classId: string) => {
    setLoadingClassId(classId);
    setError('');
    setSuccess('');
    try {
      const res = await cancelBooking(bookingId);
      if (res.success) {
        setSuccess('Booking cancelled successfully.');
      } else {
        setError(res.error || 'Failed to cancel booking.');
      }
    } catch (e) {
      setError('An error occurred.');
    } finally {
      setLoadingClassId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-5 rounded-2xl flex items-start gap-3.5 shadow-sm">
        <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
        <div>
          <h4 className="font-bold text-xs font-space tracking-tight">Pre-attendance Fee Notice</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">
            Classes are booked and reserved instantly. If your membership status is still pending approval, please ensure that you complete your payment in person at the gym reception or via WhatsApp before attending the class.
          </p>
        </div>
      </div>
      
      {/* Messages */}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-xs font-bold">
          ✓ {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Day Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {days.map((day) => {
          const hasClasses = classes.some(c => c.day === day);
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer transition-all border ${activeDay === day ? 'bg-indigo-600 border-indigo-600 text-white shadow shadow-indigo-500/10' : 'bg-white border-slate-200 hover:border-slate-300 text-slate-500'}`}
            >
              {day} {hasClasses && <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 ml-1"></span>}
            </button>
          );
        })}
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes
          .filter(c => c.day === activeDay)
          .map((c) => {
            const booking = bookedClasses.find(bc => bc.classId === c.id);
            const activeBookingsCount = bookingsCount[c.id] || 0;
            const spotsLeft = c.capacity - activeBookingsCount;
            const isFull = spotsLeft <= 0;

            return (
              <div 
                key={c.id} 
                className={`bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow relative ${booking ? 'border-indigo-500 ring-4 ring-indigo-500/5' : ''}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-indigo-600 font-extrabold uppercase tracking-widest">{c.trainer}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isFull ? 'bg-red-100 text-red-700' : 'bg-indigo-50 text-indigo-700'}`}>
                      {isFull ? 'FULLY BOOKED' : `${spotsLeft} / ${c.capacity} SPOTS LEFT`}
                    </span>
                  </div>

                  <h3 className="font-space font-bold text-xl text-slate-900 mb-4">{c.name}</h3>

                  <div className="flex gap-6 text-xs text-slate-500 font-semibold mb-6">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{c.time} ({c.duration})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{c.day} Weekly</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  {booking ? (
                    <>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold uppercase tracking-wider">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Booked ✓</span>
                      </div>
                      <button
                        onClick={() => handleCancel(booking.bookingId, c.id)}
                        disabled={loadingClassId === c.id}
                        className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        {loadingClassId === c.id ? 'Processing...' : 'Cancel Booking'}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleBook(c.id)}
                      disabled={isFull || loadingClassId === c.id}
                      className={`w-full py-3.5 rounded-xl font-bold text-center text-xs transition-all cursor-pointer ${isFull ? 'bg-slate-100 text-slate-400 border border-slate-200' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow shadow-indigo-500/10'}`}
                    >
                      {loadingClassId === c.id ? 'Processing...' : isFull ? 'Class Full' : 'Book Session'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

        {classes.filter(c => c.day === activeDay).length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400 text-sm bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
            No group classes scheduled for {activeDay}. Check other days!
          </div>
        )}
      </div>

    </div>
  );
}
