'use client';

import { useState, useEffect } from 'react';
import { bookMembership, simulateWhatsAppBookingApproval } from '@/lib/actions';
import { GymPackage, Payment } from '@/lib/types';
import { CreditCard, FileText, CheckCircle2, ChevronRight, AlertCircle, Calendar, MessageSquare, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MembershipClient({
  packages,
  currentPackage,
  packageStatus,
  packageExpiry,
  paymentsHistory,
  userEmail,
  userPhone
}: {
  packages: GymPackage[];
  currentPackage: GymPackage | null;
  packageStatus: 'active' | 'pending' | 'expired' | 'none';
  packageExpiry?: string;
  paymentsHistory: Payment[];
  userEmail: string;
  userPhone: string;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [selectedPkgId, setSelectedPkgId] = useState(packages[0]?.id || '');
  const [loading, setLoading] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const activePkg = packages.find(p => p.id === selectedPkgId);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedPkgId) {
      setError('Please select a membership package.');
      return;
    }

    setLoading(true);

    try {
      const res = await bookMembership(selectedPkgId);

      if (res.success) {
        setSuccess('Membership booking request submitted successfully! Please contact us on WhatsApp to activate.');
        router.refresh();
      } else {
        setError(res.error || 'Failed to submit booking request.');
      }
    } catch (e) {
      setError('An error occurred during booking submission.');
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateApproval = async () => {
    setError('');
    setSuccess('');
    setSimulating(true);

    try {
      const res = await simulateWhatsAppBookingApproval();
      if (res.success) {
        setSuccess('Simulated Owner Approval successful! Your membership is now active.');
        router.refresh();
      } else {
        setError(res.error || 'Failed to simulate approval.');
      }
    } catch (e) {
      setError('An error occurred during simulation.');
    } finally {
      setSimulating(false);
    }
  };

  // WhatsApp link template
  const getWhatsAppLink = () => {
    const pkgName = currentPackage ? currentPackage.name : (activePkg ? activePkg.name : 'Premium Package');
    const text = `Hello Elite Fitness,\n\nI've submitted a booking request for the *${pkgName}* package. Please complete my membership activation.\n\nMy details:\n- Email: ${userEmail}\n- Phone: ${userPhone || 'Not Provided'}`;
    return `https://wa.me/94771234567?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto text-slate-900">
      
      {/* Current plan status & Billing details */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Active Package Banner */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">My Current Package</span>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 font-space">{currentPackage ? currentPackage.name : 'No Active Membership'}</h2>
              {currentPackage && (
                <p className="text-sm text-slate-500 mt-2">
                  Rs {currentPackage.price.toLocaleString()} for {currentPackage.duration} {currentPackage.duration === 1 ? 'Month' : 'Months'}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${packageStatus === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : packageStatus === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                {packageStatus === 'active' ? 'Active Membership' : packageStatus === 'pending' ? 'Pending Activation' : 'No Active Plan'}
              </span>
              
              {packageStatus === 'active' && packageExpiry && (
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Next renewal date: {mounted ? new Date(packageExpiry).toLocaleDateString() : ''}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* WhatsApp Activation banner & Test Tool */}
        {packageStatus === 'pending' && (
          <div className="space-y-6">
            {/* WhatsApp Contact Action */}
            <div className="bg-gradient-to-br from-emerald-50 via-emerald-100/30 to-slate-50 border border-emerald-200 p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow shadow-emerald-250">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-space text-lg font-bold text-slate-900">Activate via WhatsApp</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1 font-medium">
                    Your booking request is logged. In Sri Lanka, we finalize memberships through direct WhatsApp confirmation to assign your digital access card and locker details.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/80 border border-emerald-100 rounded-2xl text-xs space-y-2">
                <p className="font-bold text-slate-700">Selected Package: <span className="text-emerald-700">{currentPackage?.name}</span></p>
                <p className="text-slate-500 font-semibold">Registered Phone: {userPhone || 'None'}</p>
                <p className="text-slate-500 font-semibold">Registered Email: {userEmail}</p>
              </div>

              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md text-sm transition-all hover:scale-[1.01] active:scale-95 text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" /> Complete Activation on WhatsApp
              </a>
            </div>

            {/* Test Simulation Tool */}
            <div className="bg-amber-50 border border-amber-200 p-8 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-amber-800">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <h4 className="font-space font-bold text-sm">Reviewer Testing Utility</h4>
              </div>
              <p className="text-[11px] text-amber-700/90 leading-relaxed font-semibold">
                To test the active member privileges (such as booking fitness classes or logging BMI records) without needing an admin module or editing database files, click the button below to simulate the gym owner approving this WhatsApp booking request.
              </p>
              <button
                type="button"
                disabled={simulating}
                onClick={handleSimulateApproval}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow shadow-amber-200 disabled:bg-slate-300"
              >
                {simulating ? 'Approving...' : 'Simulate Owner Approval (Test tool)'}
              </button>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="font-space text-xl font-bold mb-6 text-slate-900">Book a Membership Package</h3>
          
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-xs font-semibold mb-6">
              ✓ {success}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-xs font-semibold mb-6 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleBook} className="space-y-6">
            <div>
              <label htmlFor="membership-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Select Plan Tier</label>
              <select
                id="membership-select"
                value={selectedPkgId}
                onChange={(e) => setSelectedPkgId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-semibold"
              >
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} (Rs {pkg.price.toLocaleString()} for {pkg.duration} {pkg.duration === 1 ? 'Month' : 'Months'})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl text-[11px] text-slate-500 font-semibold leading-relaxed">
              ℹ After submitting this booking request, your membership status will be set to **Pending Activation**. You will need to contact our team via WhatsApp to coordinate your payment method (cash, bank transfer, or standing order) and claim your physical locker access card.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md text-sm transition-colors cursor-pointer"
            >
              {loading ? 'Submitting Booking...' : 'Submit Booking Request & Next'}
            </button>
          </form>
        </div>

        {/* Payments History List */}
        {paymentsHistory.length > 0 && (
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
            <h3 className="font-space text-lg font-bold mb-6 text-slate-900">Membership Bookings History</h3>
            
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {paymentsHistory.map((p) => (
                <div key={p.id} className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">{p.packageName}</h4>
                    <p className="text-slate-400 font-mono font-semibold">Booking ID: #{p.id.substring(4, 9).toUpperCase()}</p>
                    <p className="text-slate-500 mt-1">Rs {p.amount.toLocaleString()} • {new Date(p.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${p.status === 'approved' ? 'bg-emerald-150 text-emerald-700' : p.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {p.status === 'approved' ? 'Active' : p.status === 'rejected' ? 'Declined' : 'Pending Activation'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Account Info Details & Bank coordinates */}
      <div className="space-y-6">
        <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-md">
          <h3 className="font-space text-xl font-bold mb-6">Elite Bank Details</h3>
          <p className="text-xs text-indigo-100 leading-relaxed mb-6">
            If you wish to pay via manual bank transfer or online standing order, make payments to the following account and show proof of transfer when contacting us on WhatsApp.
          </p>

          <div className="space-y-4 text-xs font-semibold">
            <div>
              <span className="text-indigo-300 uppercase tracking-widest text-[9px] block">Bank Name</span>
              <span className="text-sm font-bold">Commercial Bank of Ceylon</span>
            </div>
            <div>
              <span className="text-indigo-300 uppercase tracking-widest text-[9px] block">Branch Code</span>
              <span className="text-sm font-bold">Colombo 03 Branch (Code: 104)</span>
            </div>
            <div>
              <span className="text-indigo-300 uppercase tracking-widest text-[9px] block">Account Number</span>
              <span className="text-sm font-bold font-mono">8011234567</span>
            </div>
            <div>
              <span className="text-indigo-300 uppercase tracking-widest text-[9px] block">Account Holder Name</span>
              <span className="text-sm font-bold">Elite Fitness Pvt Ltd</span>
            </div>
          </div>
        </div>

        {selectedPkgId && activePkg && (
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
            <h4 className="font-space font-bold text-slate-900 mb-4">Selected Package Details</h4>
            <div className="mb-4">
              <span className="text-xs font-bold text-indigo-600 block mb-1">{activePkg.name}</span>
              <span className="text-2xl font-extrabold text-slate-900 font-space">Rs {activePkg.price.toLocaleString()}</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-600 font-semibold">
              {activePkg.benefits.map((b, bi) => (
                <li key={bi} className="flex gap-2">
                  <span className="text-indigo-600 shrink-0">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}
