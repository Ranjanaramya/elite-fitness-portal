import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
          alt="Gym Hero"
          fill
          priority
          fetchPriority="high"
          className="object-cover brightness-[0.35]"
          sizes="100vw"
        />
        {/* Neon overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <span className="inline-block py-1 px-4 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 backdrop-blur-md text-xs font-bold mb-6 uppercase tracking-widest shadow-inner">
          Elite Fitness • Sri Lanka
        </span>
        <h1 className="font-space text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1] drop-shadow-md">
          Transform Your Body <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Elevate Your Life
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 drop-shadow">
          Experience Sri Lanka's ultimate health and fitness sanctuary. Offering world-class Technogym equipment, premier trainers, and a powerful community dedicated to physical greatness.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25">
            Start Your Journey <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/memberships" className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-md transition-colors rounded-xl font-bold text-lg flex items-center justify-center">
            View Memberships
          </Link>
        </div>
      </div>
    </section>
  );
}
