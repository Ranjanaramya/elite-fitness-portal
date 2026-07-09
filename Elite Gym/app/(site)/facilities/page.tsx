import { Metadata } from 'next';
import Image from 'next/image';
import { getAmenities } from '@/lib/sanity-service';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Facilities',
  description: 'Explore the premium fitness zones, locker rooms, sauna, and cardio facilities at Elite Fitness Colombo.',
  keywords: ['Gym facilities Colombo', 'Sauna gym Sri Lanka', 'Cardio area Colombo'],
  alternates: {
    canonical: '/facilities'
  }
};

export default async function FacilitiesPage() {
  const amenities = await getAmenities();

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Banner */}
      <section className="bg-slate-950 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200&auto=format&fit=crop"
            alt="Amenities Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-space font-extrabold mb-4 tracking-tight">Our Premium Facilities</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Explore our state-of-the-art facilities, designed for ultimate performance and rehabilitation.
          </p>
        </div>
      </section>

      {/* Grid List */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-24">
            {amenities.map((amenity, idx) => (
              <div 
                key={amenity.id} 
                className={`flex flex-col md:flex-row gap-16 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Visual */}
                <div className="relative w-full md:w-1/2 aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
                  <Image
                    src={amenity.imageUrl}
                    alt={amenity.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="w-full md:w-1/2">
                  <span className="text-xs text-indigo-600 font-extrabold uppercase tracking-widest block mb-2">Zone {idx + 1}</span>
                  <h2 className="font-space text-3xl font-bold text-slate-900 mb-4 tracking-tight">{amenity.name}</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">{amenity.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {amenity.details.map((detail, di) => (
                      <div key={di} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-indigo-600" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 leading-tight">{detail}</span>
                      </div>
                    ))}
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
