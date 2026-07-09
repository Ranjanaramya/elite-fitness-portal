'use client';

import { useState } from 'react';

export default function BmiCalculator() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState('');
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [calories, setCalories] = useState<number | null>(null);
  const [idealWeight, setIdealWeight] = useState<number | null>(null);

  const calculateBmi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!height || !weight || !age) return;

    const heightInCm = parseFloat(height);
    const heightInMeters = heightInCm / 100;
    const weightInKg = parseFloat(weight);
    const ageVal = parseInt(age);

    if (isNaN(heightInCm) || heightInCm <= 0 || isNaN(weightInKg) || weightInKg <= 0 || isNaN(ageVal) || ageVal <= 0) {
      return;
    }

    const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi);

    // Standard BMI classifications (gender specific ranges)
    let bmiStatus = '';
    if (gender === 'male') {
      if (calculatedBmi < 20) bmiStatus = 'Underweight';
      else if (calculatedBmi >= 20 && calculatedBmi < 25) bmiStatus = 'Normal weight';
      else if (calculatedBmi >= 25 && calculatedBmi < 30) bmiStatus = 'Overweight';
      else bmiStatus = 'Obesity';
    } else {
      if (calculatedBmi < 19) bmiStatus = 'Underweight';
      else if (calculatedBmi >= 19 && calculatedBmi < 24) bmiStatus = 'Normal weight';
      else if (calculatedBmi >= 24 && calculatedBmi < 30) bmiStatus = 'Overweight';
      else bmiStatus = 'Obesity';
    }
    setStatus(bmiStatus);

    // Body Fat Percentage (BFP) Formula (Adults)
    // BFP = 1.20 * BMI + 0.23 * Age - 10.8 * sex - 5.4 (sex = 1 for male, 0 for female)
    const sexValue = gender === 'male' ? 1 : 0;
    const calculatedBodyFat = 1.20 * calculatedBmi + 0.23 * ageVal - 10.8 * sexValue - 5.4;
    setBodyFat(calculatedBodyFat > 0 ? calculatedBodyFat : null);

    // Basal Metabolic Rate (BMR) - Mifflin-St Jeor Equation
    // Men: BMR = 10W + 6.25H - 5A + 5
    // Women: BMR = 10W + 6.25H - 5A - 161
    let calculatedBmr = 0;
    if (gender === 'male') {
      calculatedBmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageVal + 5;
    } else {
      calculatedBmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageVal - 161;
    }
    setBmr(calculatedBmr);

    // Daily Maintenance Calories (Moderate Activity multiplier BMR * 1.375)
    setCalories(calculatedBmr * 1.375);

    // Ideal Body Weight (IBW) - Devine Formula
    // Men: 50.0 + 2.3 * ((Height in cm / 2.54) - 60)
    // Women: 45.5 + 2.3 * ((Height in cm / 2.54) - 60)
    const heightInInches = heightInCm / 2.54;
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
  };

  return (
    <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-4xl mx-auto shadow-sm">
      <form onSubmit={calculateBmi} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label htmlFor="gender" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-semibold"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="age" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Age</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g. 25"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-semibold"
            required
            min="1"
            max="120"
          />
        </div>
        <div>
          <label htmlFor="height" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Height (cm)</label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 175"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-semibold"
            required
            min="50"
            max="250"
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Weight (kg)</label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 70"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-semibold"
            required
            min="20"
            max="300"
            step="0.1"
          />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-md cursor-pointer text-sm tracking-wider">
            CALCULATE HEALTH METRICS
          </button>
        </div>
      </form>

      {bmi !== null && (
        <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300 border-t border-slate-100 pt-8">
          <div className="text-center p-8 bg-gradient-to-tr from-indigo-50/50 to-violet-50/50 rounded-3xl border border-indigo-100/50">
            <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-500 mb-2">Your BMI Score</div>
            <div className="text-6xl font-space font-black text-slate-900 mb-3">{bmi.toFixed(1)}</div>
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
              status === 'Normal weight' 
                ? 'text-emerald-700 bg-emerald-100/70 border border-emerald-200' 
                : status === 'Underweight'
                ? 'text-orange-700 bg-orange-100/70 border border-orange-200'
                : 'text-rose-700 bg-rose-100/70 border border-rose-200'
            }`}>
              {status}
            </span>
            <p className="text-xs text-slate-400 mt-4 leading-relaxed font-semibold">
              {gender === 'male' 
                ? 'Male healthy BMI standard range: 20.0 – 25.0' 
                : 'Female healthy BMI standard range: 19.0 – 24.0'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bodyFat !== null && (
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-100 hover:bg-white transition-all shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Estimated Body Fat</span>
                <div>
                  <div className="text-3xl font-space font-extrabold text-slate-900 leading-none">{bodyFat.toFixed(1)}%</div>
                  <span className="text-[10px] font-medium text-slate-500 mt-1 block">Adjusted for age & gender factors</span>
                </div>
              </div>
            )}

            {idealWeight !== null && (
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-100 hover:bg-white transition-all shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Ideal Body Weight</span>
                <div>
                  <div className="text-3xl font-space font-extrabold text-slate-900 leading-none">{idealWeight.toFixed(1)} kg</div>
                  <span className="text-[10px] font-medium text-slate-500 mt-1 block">Based on Devine Equation (1974)</span>
                </div>
              </div>
            )}

            {bmr !== null && (
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-100 hover:bg-white transition-all shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Basal Metabolic Rate (BMR)</span>
                <div>
                  <div className="text-3xl font-space font-extrabold text-slate-900 leading-none">{Math.round(bmr).toLocaleString()} kcal</div>
                  <span className="text-[10px] font-medium text-slate-500 mt-1 block">Mifflin-St Jeor daily energy baseline</span>
                </div>
              </div>
            )}

            {calories !== null && (
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-100 hover:bg-white transition-all shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Daily Caloric Intake Goal</span>
                <div>
                  <div className="text-3xl font-space font-extrabold text-slate-900 leading-none">{Math.round(calories).toLocaleString()} kcal</div>
                  <span className="text-[10px] font-medium text-slate-500 mt-1 block">Estimated active maintenance target</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
