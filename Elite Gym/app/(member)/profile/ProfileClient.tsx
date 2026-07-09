'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { updateProfile, changePassword } from '@/lib/actions';
import { User, Mail, Phone, Lock, Eye, EyeOff, Check, X, ShieldCheck } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  phone?: string;
  profilePic?: string;
}

export default function ProfileClient({ initialUser }: { initialUser: UserData }) {
  // Profile info state
  const [name, setName] = useState(initialUser.name);
  const [email, setEmail] = useState(initialUser.email);
  const [phone, setPhone] = useState(initialUser.phone || '');
  const [profilePic, setProfilePic] = useState(initialUser.profilePic || '');
  
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  // Change password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState('');
  const [passLoading, setPassLoading] = useState(false);

  // Password strength checks
  const [criteria, setCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  });

  useEffect(() => {
    setCriteria({
      length: newPassword.length >= 8,
      upper: /[A-Z]/.test(newPassword),
      lower: /[a-z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    });
  }, [newPassword]);

  const isPasswordValid = Object.values(criteria).every(Boolean);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(false);
    setProfileError('');

    const phoneRegex = /^\d{10}$/;
    if (phone && !phoneRegex.test(phone.trim())) {
      setProfileError('Please enter a valid 10-digit phone number (e.g. 0771234567).');
      return;
    }

    setProfileLoading(true);

    try {
      const res = await updateProfile({ name, email, phone, profilePic });
      if (res.success) {
        setProfileSuccess(true);
      } else {
        setProfileError(res.error || 'Failed to update profile.');
      }
    } catch (err) {
      setProfileError('An error occurred. Please try again.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassSuccess(false);
    setPassError('');

    if (!isPasswordValid) {
      setPassError('New password does not meet criteria.');
      return;
    }

    setPassLoading(true);

    try {
      const res = await changePassword({ currentPassword, newPassword });
      if (res.success) {
        setPassSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
      } else {
        setPassError(res.error || 'Failed to change password.');
      }
    } catch (err) {
      setPassError('An error occurred. Please try again.');
    } finally {
      setPassLoading(false);
    }
  };

  const avatarOptions = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
      
      {/* Edit Profile Info Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-space text-xl font-bold mb-6 text-slate-900">Edit Profile Details</h3>
          
          {profileSuccess && (
            <div className="bg-emerald-50 border border-emerald-250 text-emerald-700 px-4 py-2.5 rounded-xl text-xs font-semibold mb-6">
              ✓ Profile information updated successfully!
            </div>
          )}

          {profileError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl text-xs font-semibold mb-6">
              {profileError}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            
            {/* Avatar Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Choose Profile Picture</label>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {avatarOptions.map((avatarUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setProfilePic(avatarUrl)}
                    className={`w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 cursor-pointer transition-all relative ${profilePic === avatarUrl ? 'border-indigo-600 ring-4 ring-indigo-500/10' : 'border-transparent hover:border-slate-300'}`}
                  >
                    <Image src={avatarUrl} alt={`Avatar ${i+1}`} width={48} height={48} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="profile-name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="profile-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label htmlFor="profile-email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="profile-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label htmlFor="profile-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="profile-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="e.g. 0771234567"
                  pattern="\d{10}"
                  maxLength={10}
                  title="Phone number must be exactly 10 digits"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={profileLoading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-md text-sm cursor-pointer"
            >
              {profileLoading ? 'Saving...' : 'Save Profile Details'}
            </button>
          </form>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-space text-xl font-bold mb-6 text-slate-900">Change Secure Password</h3>
          
          {passSuccess && (
            <div className="bg-emerald-50 border border-emerald-250 text-emerald-700 px-4 py-2.5 rounded-xl text-xs font-semibold mb-6">
              ✓ Password changed successfully!
            </div>
          )}

          {passError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl text-xs font-semibold mb-6">
              {passError}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <label htmlFor="pass-current" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Current Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="pass-current"
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pass-new" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">New Secure Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="pass-new"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-11 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength checklist */}
              {newPassword.length > 0 && (
                <div className="mt-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-[10px] space-y-2">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Standard Strength Requirements:</span>
                  
                  <div className="flex items-center gap-2">
                    {criteria.length ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <X className="w-3.5 h-3.5 text-slate-350 shrink-0" />}
                    <span className={criteria.length ? 'text-emerald-700 font-medium' : 'text-slate-500'}>Min 8 characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {criteria.upper ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <X className="w-3.5 h-3.5 text-slate-350 shrink-0" />}
                    <span className={criteria.upper ? 'text-emerald-700 font-medium' : 'text-slate-500'}>At least 1 uppercase letter (A-Z)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {criteria.lower ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <X className="w-3.5 h-3.5 text-slate-350 shrink-0" />}
                    <span className={criteria.lower ? 'text-emerald-700 font-medium' : 'text-slate-500'}>At least 1 lowercase letter (a-z)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {criteria.number ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <X className="w-3.5 h-3.5 text-slate-350 shrink-0" />}
                    <span className={criteria.number ? 'text-emerald-700 font-medium' : 'text-slate-500'}>At least 1 digit (0-9)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {criteria.special ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <X className="w-3.5 h-3.5 text-slate-350 shrink-0" />}
                    <span className={criteria.special ? 'text-emerald-700 font-medium' : 'text-slate-500'}>At least 1 special character (!@#$)</span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={passLoading || !isPasswordValid}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl disabled:bg-slate-200 transition-colors shadow-md text-sm cursor-pointer"
            >
              {passLoading ? 'Updating Password...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
