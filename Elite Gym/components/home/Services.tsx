import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Services() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="font-space text-4xl font-bold text-slate-900 mb-4 tracking-tight">State-of-the-Art Services</h2>
            <p className="text-slate-500 text-lg max-w-xl">Take your workouts to the next level with our world-class gym amenities.</p>
          </div>
          <Link href="/facilities" className="inline-flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-800 transition-colors mt-4 md:mt-0">
            View all facilities <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Cardio Arena', desc: 'TechnoGym Skillruns and climbs integrated with interactive media screens.', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=500&auto=format&fit=crop' },
            { title: 'Weight Training', desc: 'Heavy weight racks, lifting blocks, and plate-loaded hammer strengths.', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop' },
            { title: 'Functional Zone', desc: 'TRX rigs, battle ropes, kettlebells, and premium plyo boxes.', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=500&auto=format&fit=crop' }
          ].map((service, i) => (
            <div key={i} className="group relative h-96 rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="font-space text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-200 text-sm leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
