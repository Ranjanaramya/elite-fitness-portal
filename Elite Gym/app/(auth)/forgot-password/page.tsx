'use client';

import Link from 'next/link';
import { useState } from 'react';
import { simulateForgotPassword } from '@/lib/actions';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await simulateForgotPassword(email);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || 'Failed to request reset link.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
      {/* Identity Banner */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </Link>
        <h2 className="font-space text-3xl font-extrabold text-slate-900 tracking-tight">Reset Password</h2>
        <p className="text-sm text-slate-500 mt-2 font-medium">We will simulate sending recovery links.</p>
      </div>

      <div className="bg-white py-10 px-8 shadow-xl sm:rounded-3xl border border-slate-100">
        {success ? (
          <div className="space-y-6 text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-space text-xl font-bold text-slate-900">Recovery Simulated!</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                A simulated password reset email has been logged to the server console. Click the link below to return to login.
              </p>
            </div>
            <Link 
              href="/login" 
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors block text-sm"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-semibold mb-6">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 transition-all hover:scale-[1.01] active:scale-95 shadow shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? 'Sending Request...' : 'Send Recovery Instructions'}
            </button>

            <div className="text-center">
              <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
