'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { registerUser } from '@/lib/actions';
import { Mail, Lock, User, Eye, EyeOff, Check, X, Phone } from 'lucide-react';

const PACKAGE_NAMES: Record<string, string> = {
  'basic-1': 'Basic Gym Plan (Rs 5,000)',
  'standard-1': 'Standard Fit Plan (Rs 8,000)',
  'premium-1': 'Elite Premium Plan (Rs 45,000)',
  'family-1': 'Family Pack (Rs 75,000)',
};

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get('packageId');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Password criteria checks
  const [criteria, setCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  });

  useEffect(() => {
    setCriteria({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  }, [password]);

  const isPasswordValid = Object.values(criteria).every(Boolean);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isPasswordValid) {
      setError('Password does not meet the required security standards.');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.trim())) {
      setError('Please enter a valid 10-digit phone number (e.g. 0771234567).');
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser({ name, email, password, phone, packageId });
      if (res.success) {
        router.push('/member-dashboard');
        router.refresh();
      } else {
        setError(res.error || 'Failed to register.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 py-8">
      {/* Identity Banner */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </Link>
        <h2 className="font-space text-3xl font-extrabold text-slate-900 tracking-tight">Create Your Account</h2>
        <p className="text-sm text-slate-500 mt-2 font-medium">Join Sri Lanka's premium gym network.</p>
      </div>

      <div className="bg-white py-10 px-8 shadow-xl sm:rounded-3xl border border-slate-100">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-semibold mb-6">
            {error}
          </div>
        )}

        {packageId && PACKAGE_NAMES[packageId] && (
          <div className="bg-indigo-50 border border-indigo-150 p-4 rounded-2xl text-xs font-semibold mb-6 text-indigo-950 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span>Booking Plan: <strong className="font-bold text-indigo-700">{PACKAGE_NAMES[packageId]}</strong></span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-semibold"
                placeholder="Kasun Perera"
              />
            </div>
          </div>

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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-semibold"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                pattern="\d{10}"
                maxLength={10}
                title="Phone number must be exactly 10 digits"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-semibold"
                placeholder="e.g. 0771234567"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Secure Password</label>
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

            {/* Password strength meter */}
            {password.length > 0 && (
              <div className="mt-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs space-y-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Security Standard Requirements:</span>
                
                <div className="flex items-center gap-2">
                  {criteria.length ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <X className="w-4 h-4 text-slate-300 shrink-0" />}
                  <span className={criteria.length ? 'text-emerald-700 font-medium' : 'text-slate-500'}>Minimum 8 characters</span>
                </div>
                <div className="flex items-center gap-2">
                  {criteria.upper ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <X className="w-4 h-4 text-slate-300 shrink-0" />}
                  <span className={criteria.upper ? 'text-emerald-700 font-medium' : 'text-slate-500'}>At least 1 uppercase letter (A-Z)</span>
                </div>
                <div className="flex items-center gap-2">
                  {criteria.lower ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <X className="w-4 h-4 text-slate-300 shrink-0" />}
                  <span className={criteria.lower ? 'text-emerald-700 font-medium' : 'text-slate-500'}>At least 1 lowercase letter (a-z)</span>
                </div>
                <div className="flex items-center gap-2">
                  {criteria.number ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <X className="w-4 h-4 text-slate-300 shrink-0" />}
                  <span className={criteria.number ? 'text-emerald-700 font-medium' : 'text-slate-500'}>At least 1 digit (0-9)</span>
                </div>
                <div className="flex items-center gap-2">
                  {criteria.special ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <X className="w-4 h-4 text-slate-300 shrink-0" />}
                  <span className={criteria.special ? 'text-emerald-700 font-medium' : 'text-slate-500'}>At least 1 special character (e.g. !@#$)</span>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !isPasswordValid}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 transition-all hover:scale-[1.01] active:scale-95 shadow shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? 'Creating Account...' : 'Sign up & Book Plan'}
          </button>
          
          <div className="text-sm text-center mt-6 text-slate-500 font-semibold">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-500 font-semibold">Loading registration form...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
