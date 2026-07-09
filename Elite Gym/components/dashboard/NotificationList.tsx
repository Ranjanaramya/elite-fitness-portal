'use client';

import { useState } from 'react';
import { markNotificationRead } from '@/lib/actions';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Notification } from '@/lib/types';

export default function NotificationList({ initialNotifs }: { initialNotifs: Notification[] }) {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifs);

  const handleDismiss = async (id: string) => {
    try {
      await markNotificationRead(id);
      setNotifs(prev => prev.filter(n => n.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Inbox Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-indigo-600 text-white font-extrabold px-2.5 py-0.5 rounded-full text-[10px]">
              {unreadCount} UNREAD
            </span>
          )}
        </div>

        {notifs.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm flex flex-col items-center">
            <Bell className="w-8 h-8 text-slate-350 mb-3" />
            <p>Your inbox is clear.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
            {notifs.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-4 rounded-2xl border text-left flex justify-between gap-4 transition-colors ${!notif.read ? 'bg-indigo-50/40 border-indigo-100/50' : 'bg-slate-50/50 border-slate-100'}`}
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">{notif.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{notif.message}</p>
                  <span className="text-[9px] text-slate-400 font-medium block mt-2">
                    {new Date(notif.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <button
                  onClick={() => handleDismiss(notif.id)}
                  className="w-7 h-7 rounded-lg hover:bg-slate-200/50 flex items-center justify-center shrink-0 border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                  title="Dismiss notification"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
