import { Metadata } from 'next';
import Image from 'next/image';
import { Target, Eye, ShieldAlert, Award, Calendar, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Discover the history, mission, and vision behind Elite Fitness Sri Lanka, Colombo\'s premier strength and conditioning center.',
  keywords: ['About Elite Fitness', 'Gym History Colombo', 'Strength Conditioning Sri Lanka'],
  alternates: {
    canonical: '/our-story'
  }
};

export default function OurStoryPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop"
            alt="About Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-space font-extrabold mb-4 tracking-tight">Our Story</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Building Sri Lanka's premium fitness legacy, one member at a time.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs text-indigo-600 font-extrabold uppercase tracking-wider block mb-2">Our History</span>
              <h2 className="font-space text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-900">How Elite Fitness Began</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Founded in 2018 in Colombo, Elite Fitness set out with a clear purpose: to bridge the gap between commercial gym operations and high-end sports-science training.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                What began as a single strength clinic with 3 coaches has expanded into a premier multi-location training facility. We have invested heavily in importing state-of-the-art European gym rigs and training systems, ensuring our members train on the safest and most bio-mechanically sound equipment.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Today, Elite Fitness stands as the gold standard of strength, rehabilitation, and lifestyle transformation in Sri Lanka.
              </p>
            </div>
            <div className="relative aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop"
                alt="Gym Session"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-space text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  To provide a scientifically-backed, customer-first environment that empowers people of all ages and abilities to permanently optimize their physical health, confidence, and quality of life.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-space text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  To remain Sri Lanka's leading fitness innovator by continuously integrating health technology, bio-mechanically premium machinery, and world-class physical therapy systems to revolutionize training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements / Numbers */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-space text-3xl font-bold tracking-tight text-slate-900">Key Achievements</h2>
            <p className="text-slate-500 mt-2">A testament to our dedication and standards.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 border border-slate-100 rounded-2xl bg-slate-50">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-space font-bold text-lg text-slate-900 mb-2">#1 Fitness Gym</h4>
              <p className="text-xs text-slate-500">Voted best local premium fitness experience for 3 consecutive years.</p>
            </div>
            
            <div className="p-8 border border-slate-100 rounded-2xl bg-slate-50">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-space font-bold text-lg text-slate-900 mb-2">12,000+ Transformed</h4>
              <p className="text-xs text-slate-500">Over 12,000 members have successfully reached weight and strength targets.</p>
            </div>
            
            <div className="p-8 border border-slate-100 rounded-2xl bg-slate-50">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-space font-bold text-lg text-slate-900 mb-2">Community Giveback</h4>
              <p className="text-xs text-slate-500">Supporting school athletes with complimentary coaching and dietary grants.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-space text-3xl font-bold tracking-tight text-slate-900">Explore Our Facility</h2>
            <p className="text-slate-500 mt-2">Take a tour of our Colombo 03 gym layout.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=500&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=500&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=500&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop',
            ].map((imgUrl, idx) => (
              <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
                <Image
                  src={imgUrl}
                  alt={`Gallery Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
