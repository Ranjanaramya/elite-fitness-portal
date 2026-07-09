import { Metadata } from 'next';
import Image from 'next/image';
import { getTrainers } from '@/lib/sanity-service';
import { ShieldCheck, Award, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Coaches',
  description: 'Meet the team of internationally certified personal trainers and fitness coaches at Elite Fitness Sri Lanka.',
  keywords: ['Gym trainers Colombo', 'Personal trainer Sri Lanka', 'Fitness coaches Colombo'],
  alternates: {
    canonical: '/coaches'
  }
};

export default async function CoachesPage() {
  const trainers = await getTrainers();

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Banner */}
      <section className="bg-slate-950 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1200&auto=format&fit=crop"
            alt="Team Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-space font-extrabold mb-4 tracking-tight">Our Coaches</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Learn from international coaches and athletic champions dedicated to optimizing your training.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {trainers.map((trainer, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col group hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square w-full bg-slate-200 overflow-hidden">
                  <Image
                    src={trainer.imageUrl}
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow">
                    ★ Certified
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-indigo-600 font-extrabold uppercase tracking-widest block mb-2">{trainer.position}</span>
                    <h2 className="font-space font-bold text-2xl text-slate-900 mb-1 leading-tight">{trainer.name}</h2>
                    <span className="text-xs text-slate-400 font-bold block mb-6">{trainer.experience} Years Active Coaching</span>
                    
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      Specialized in helping members break plateaus and build sustainable dietary and athletic habits.
                    </p>
                  </div>
                  
                  <div>
                    <hr className="border-slate-200 mb-6" />
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Specializations</span>
                        <span className="text-xs font-bold text-slate-800">{trainer.specialization}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Certifications</span>
                        <span className="text-xs font-semibold text-slate-600">ISSA, Certified Strength Specialist, First Aid Certified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
