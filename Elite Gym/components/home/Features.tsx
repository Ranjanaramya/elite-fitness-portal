import { ShieldCheck, Award, HeartPulse, Users } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-space text-4xl font-bold text-slate-900 mb-4 tracking-tight">Why Choose Elite Fitness?</h2>
          <p className="text-slate-500 text-lg">We deliver a premium experience tailored to your unique biological and wellness goals.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />, title: 'Premium Safe Facility', desc: 'Secure entry systems, strict cleanliness protocols, and full-time floor monitoring.' },
            { icon: <Award className="w-8 h-8 text-indigo-600" />, title: 'Certified Experts', desc: 'International coaching certificates, sports-science degrees, and personalized guidance.' },
            { icon: <HeartPulse className="w-8 h-8 text-indigo-600" />, title: 'Holistic Approach', desc: 'Complimentary BMI tracking, customized diet charts, and regular checkups.' },
            { icon: <Users className="w-8 h-8 text-indigo-600" />, title: 'Elite Community', desc: 'Surround yourself with driven individuals working together to elevate their standards.' }
          ].map((feat, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-white p-3 rounded-xl w-fit shadow-sm border border-slate-100 mb-6">{feat.icon}</div>
              <h3 className="font-space font-bold text-lg text-slate-900 mb-3">{feat.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center border-t border-slate-100 pt-16">
          <div>
            <div className="text-4xl md:text-5xl font-extrabold text-indigo-600 font-space">100+</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-2">Active Members</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold text-indigo-600 font-space">5+</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-2">Certified Trainers</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold text-indigo-600 font-space">10+</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-2">Group Classes Weekly</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold text-indigo-600 font-space">5★</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-2">Customer Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
