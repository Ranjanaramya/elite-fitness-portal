import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { TrainerContent } from '@/lib/sanity-service';

export default function Trainers({ trainers }: { trainers: TrainerContent[] }) {
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-space text-4xl font-bold text-slate-900 mb-4 tracking-tight">Our Master Trainers</h2>
          <p className="text-slate-500 text-lg">Push your boundaries under the supervision of Sri Lanka's top industry leaders.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trainers.map((trainer, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm flex flex-col group hover:shadow-md transition-shadow">
              <div className="relative aspect-square w-full bg-slate-200 overflow-hidden">
                <Image
                  src={trainer.imageUrl}
                  alt={trainer.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider block mb-2">{trainer.position}</span>
                  <h3 className="font-space font-bold text-xl text-slate-900 mb-1">{trainer.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{trainer.experience} Years Coaching Experience</p>
                  <hr className="border-slate-200/60 my-4" />
                  <p className="text-xs text-slate-600 leading-relaxed"><span className="font-bold text-slate-900 block mb-1">Specialization:</span> {trainer.specialization}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/coaches" className="inline-flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            Explore coach schedules <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
