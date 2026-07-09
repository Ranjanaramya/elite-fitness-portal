import { Metadata } from 'next';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import ProfileClient from './ProfileClient';
import { getUsers } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Profile Settings',
};

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const users = await getUsers();
  const user = users.find(u => u.id === session.userId);
  if (!user) redirect('/login');

  const initialUser = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    profilePic: user.profilePic
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-space tracking-tight">Profile Settings</h1>
        <p className="text-slate-500 text-sm">Update your public details and manage account credentials.</p>
      </div>
      <ProfileClient initialUser={initialUser} />
    </div>
  );
}
