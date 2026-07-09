'use client';

import { useState } from 'react';
import { saveBmiRecord, deleteBmiRecord } from '@/lib/actions';
import { BmiRecord } from '@/lib/types';
import { HeartPulse, Plus, Trash2, ArrowUpRight, Scale, Activity, Star } from 'lucide-react';

export default function BmiHistoryClient({
  initialHistory
}: {
  initialHistory: BmiRecord[];
}) {
  const [history, setHistory] = useState<BmiRecord[]>(initialHistory);
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // Computed metrics states
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState('');
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [calories, setCalories] = useState<number | null>(null);
  const [idealWeight, setIdealWeight] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const numWeight = parseFloat(weight);
    const numHeight = parseFloat(height); // in cm
    const ageVal = parseInt(age);

    if (isNaN(numWeight) || numWeight <= 0 || isNaN(numHeight) || numHeight <= 0 || isNaN(ageVal) || ageVal <= 0) {
      setError('Please enter valid positive values.');
      return;
    }

    setLoading(true);

    try {
      const heightInMeters = numHeight / 100;
      const res = await saveBmiRecord({ weight: numWeight, height: heightInMeters });
      
      if (res.success && res.bmi) {
        setBmi(res.bmi);

        // Classification
        let bmiStatus = '';
        if (gender === 'male') {
          if (res.bmi < 20) bmiStatus = 'Underweight';
          else if (res.bmi >= 20 && res.bmi < 25) bmiStatus = 'Normal weight';
          else if (res.bmi >= 25 && res.bmi < 30) bmiStatus = 'Overweight';
          else bmiStatus = 'Obesity';
        } else {
          if (res.bmi < 19) bmiStatus = 'Underweight';
          else if (res.bmi >= 19 && res.bmi < 24) bmiStatus = 'Normal weight';
          else if (res.bmi >= 24 && res.bmi < 30) bmiStatus = 'Overweight';
          else bmiStatus = 'Obesity';
        }
        setStatus(bmiStatus);

        // Body Fat Percentage (BFP)
        const sexValue = gender === 'male' ? 1 : 0;
        const calculatedBodyFat = 1.20 * res.bmi + 0.23 * ageVal - 10.8 * sexValue - 5.4;
        setBodyFat(calculatedBodyFat > 0 ? calculatedBodyFat : null);

        // Basal Metabolic Rate (BMR)
        let calculatedBmr = 0;
        if (gender === 'male') {
          calculatedBmr = 10 * numWeight + 6.25 * numHeight - 5 * ageVal + 5;
        } else {
          calculatedBmr = 10 * numWeight + 6.25 * numHeight - 5 * ageVal - 161;
        }
        setBmr(calculatedBmr);

        // Daily maintenance calories goal
        setCalories(calculatedBmr * 1.375);

        // Ideal body weight (IBW)
        const heightInInches = numHeight / 2.54;
        let calculatedIbw = 0;
        if (heightInInches >= 60) {
          if (gender === 'male') {
            calculatedIbw = 50.0 + 2.3 * (heightInInches - 60);
          } else {
            calculatedIbw = 45.5 + 2.3 * (heightInInches - 60);
          }
        } else {
          if (gender === 'male') {
            calculatedIbw = 50.0 - 2.3 * (60 - heightInInches);
          } else {
            calculatedIbw = 45.5 - 2.3 * (60 - heightInInches);
          }
        }
        setIdealWeight(calculatedIbw > 0 ? calculatedIbw : null);

        setSuccess(`BMI calculated: ${res.bmi.toFixed(1)}. Log saved successfully!`);
        
        // Add locally to history list
        const newRec: BmiRecord = (res as any).record || {
          id: 'bmi_' + Math.random().toString(36).substr(2, 9),
          userId: 'user',
          weight: numWeight,
          height: heightInMeters,
          bmi: res.bmi,
          createdAt: new Date().toISOString()
        };
        setHistory(prev => [newRec, ...prev]);
        setWeight('');
        setHeight('');
        setAge('');
      } else {
        setError(res.error || 'Failed to save BMI log.');
      }
    } catch (e) {
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (deletingId) return;
    setDeletingId(id);
    setError('');
    setSuccess('');

    // Keep a copy of history for rollback on failure
    const originalHistory = history;

    // Optimistically remove record from UI list immediately
    setHistory(prev => prev.filter(r => r.id !== id));

    try {
      const res = await deleteBmiRecord(id);
      if (res.success) {
        setSuccess('BMI record deleted.');
        setError('');
      } else {
        // Rollback on failure
        setHistory(originalHistory);
        setError(res.error || 'Failed to delete record.');
        setSuccess('');
      }
    } catch (e) {
      // Rollback on error
      setHistory(originalHistory);
      setError('An error occurred.');
      setSuccess('');
    } finally {
      setDeletingId(null);
    }
  };

  const getBmiStatus = (score: number) => {
    if (score < 18.5) return { label: 'Underweight', color: 'text-orange-500 bg-orange-50 border-orange-100' };
    if (score < 24.9) return { label: 'Normal weight', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' };
    if (score < 29.9) return { label: 'Overweight', color: 'text-amber-600 bg-amber-50 border-amber-100' };
    return { label: 'Obese', color: 'text-red-600 bg-red-50 border-red-100' };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
      
      {/* Input Calculator Column */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="font-space text-xl font-bold mb-6 text-slate-900">Calculate & Save BMI</h3>
          
          {success && (
            <div className="bg-emerald-50 border border-emerald-250 text-emerald-700 p-4 rounded-xl text-xs font-semibold mb-6">
              ✓ {success}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-xs font-semibold mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label htmlFor="bmi-gender" className="block text-xs font-bold uppercase tracking-wider text-slate-505 mb-2">Gender</label>
              <select
                id="bmi-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-xs font-semibold cursor-pointer"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label htmlFor="bmi-age" className="block text-xs font-bold uppercase tracking-wider text-slate-505 mb-2">Age</label>
              <input
                id="bmi-age"
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 25"
                min="1"
                max="120"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-xs font-semibold"
              />
            </div>

            <div>
              <label htmlFor="bmi-height" className="block text-xs font-bold uppercase tracking-wider text-slate-505 mb-2">Height (cm)</label>
              <input
                id="bmi-height"
                type="number"
                required
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
                min="50"
                max="250"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-xs font-semibold"
              />
            </div>

            <div>
              <label htmlFor="bmi-weight" className="block text-xs font-bold uppercase tracking-wider text-slate-505 mb-2">Weight (kg)</label>
              <input
                id="bmi-weight"
                type="number"
                step="0.1"
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 70"
                min="20"
                max="300"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-xs font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-md text-xs cursor-pointer tracking-wider"
            >
              {loading ? 'Saving to history...' : 'LOG & COMPUTE BMI'}
            </button>
          </form>
        </div>
      </div>

      {/* Metrics Results and History Column */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Advanced Calculated metrics */}
        {bmi !== null && (
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="text-center p-6 bg-gradient-to-tr from-indigo-50/30 to-violet-50/30 rounded-2xl border border-indigo-100/50">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-500 mb-1">Your BMI Score</div>
              <div className="text-5xl font-space font-black text-slate-900 mb-2">{bmi.toFixed(1)}</div>
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border tracking-wider ${
                status === 'Normal weight' 
                  ? 'text-emerald-700 bg-emerald-100/70 border-emerald-250' 
                  : status === 'Underweight'
                  ? 'text-orange-700 bg-orange-100/70 border-orange-250'
                  : 'text-rose-700 bg-rose-100/70 border-rose-250'
              }`}>
                {status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {bodyFat !== null && (
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between hover:border-indigo-100 hover:bg-white transition-all shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Estimated Body Fat</span>
                  <div>
                    <div className="text-2xl font-space font-extrabold text-slate-900 leading-none">{bodyFat.toFixed(1)}%</div>
                    <span className="text-[9px] font-medium text-slate-500 mt-1 block">Adjusted for age & gender factors</span>
                  </div>
                </div>
              )}

              {idealWeight !== null && (
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between hover:border-indigo-100 hover:bg-white transition-all shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Ideal Body Weight</span>
                  <div>
                    <div className="text-2xl font-space font-extrabold text-slate-900 leading-none">{idealWeight.toFixed(1)} kg</div>
                    <span className="text-[9px] font-medium text-slate-500 mt-1 block">Based on Devine Equation (1974)</span>
                  </div>
                </div>
              )}

              {bmr !== null && (
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between hover:border-indigo-100 hover:bg-white transition-all shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Basal Metabolic Rate (BMR)</span>
                  <div>
                    <div className="text-2xl font-space font-extrabold text-slate-900 leading-none">{Math.round(bmr).toLocaleString()} kcal</div>
                    <span className="text-[9px] font-medium text-slate-500 mt-1 block">Mifflin-St Jeor daily energy baseline</span>
                  </div>
                </div>
              )}

              {calories !== null && (
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between hover:border-indigo-100 hover:bg-white transition-all shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Daily Maintenance Calories</span>
                  <div>
                    <div className="text-2xl font-space font-extrabold text-slate-900 leading-none">{Math.round(calories).toLocaleString()} kcal</div>
                    <span className="text-[9px] font-medium text-slate-500 mt-1 block">Estimated active maintenance target</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* History Records List */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="font-space text-xl font-bold mb-6 text-slate-900 font-space tracking-tight">BMI Records History</h3>
          
          {history.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm flex flex-col items-center">
              <Scale className="w-10 h-10 text-slate-300 mb-4 animate-bounce" />
              <p className="font-semibold">No logged records yet.</p>
              <p className="text-xs text-slate-400 mt-1">Enter your weight and height to start tracking progress.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {history.map((record) => {
                const statusInfo = getBmiStatus(record.bmi);
                return (
                  <div 
                    key={record.id} 
                    className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex justify-between items-center text-xs hover:bg-slate-100/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-extrabold text-slate-900 font-space text-lg">{record.bmi}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">BMI</span>
                        </div>
                        <p className="text-slate-500 mt-1 font-semibold">Weight: {record.weight}kg • Height: {record.height}m</p>
                        <span className="text-[9px] text-slate-400 mt-0.5 block">Logged on {new Date(record.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase border tracking-wider ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                      <button
                        onClick={() => handleDelete(record.id)}
                        disabled={deletingId !== null}
                        className={`p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer ${
                          deletingId !== null ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
