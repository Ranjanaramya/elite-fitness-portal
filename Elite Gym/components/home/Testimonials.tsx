import { Star } from 'lucide-react';

export default function Testimonials({ testimonials }: { testimonials: any[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200/60">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-space text-4xl font-bold text-slate-900 mb-4 tracking-tight">Our Member Testimonials</h2>
          <p className="text-slate-500 text-lg">Listen to what our community says about their physical transformation.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((test, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(test.rating)].map((_, si) => (
                    <Star key={si} className="w-5 h-5 fill-indigo-500 text-indigo-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm italic leading-relaxed mb-6">"{test.comment}"</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 font-space text-sm">{test.userName}</h4>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verified Member</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
