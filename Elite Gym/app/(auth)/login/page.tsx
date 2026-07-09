'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginUser } from '@/lib/actions';
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      if (res.success && res.user) {
        router.push('/member-dashboard');
        router.refresh();
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
      {/* Visual Identity */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </Link>
        <h2 className="font-space text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
        <p className="text-sm text-slate-500 mt-2 font-medium">Train hard. Stay consistent.</p>
      </div>

      <div className="bg-white py-10 px-8 shadow-xl sm:rounded-3xl border border-slate-100">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-semibold mb-6">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
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
                placeholder="member@elitefitness.lk"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
              <Link href="/forgot-password" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-11 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 transition-all hover:scale-[1.01] active:scale-95 shadow shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          
          <div className="text-sm text-center mt-6 text-slate-500 font-semibold">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign up free
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
