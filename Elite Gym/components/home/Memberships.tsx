import Link from 'next/link';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function Memberships({ featuredPackages }: { featuredPackages: any[] }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-space text-4xl font-bold text-slate-900 mb-4 tracking-tight">Flexible Membership Plans</h2>
          <p className="text-slate-500 text-lg">Invest in your longevity. Standard, premium, or family packages available.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featuredPackages.map((pkg, i) => (
            <div key={i} className={`p-8 rounded-3xl flex flex-col justify-between ${pkg.popular ? 'bg-white border-2 border-indigo-600 shadow-xl scale-105 relative z-10' : 'bg-slate-50 border border-slate-200 shadow-sm'}`}>
              {pkg.popular && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Package</h3>
                <h3 className="font-space text-3xl font-bold mb-2 text-slate-900">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900 font-space">Rs {pkg.price.toLocaleString()}</span>
                  <span className="text-slate-500"> / {pkg.duration} {pkg.duration === 1 ? 'Month' : 'Months'}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.benefits?.map((benefit: string, bi: number) => (
                    <li key={bi} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Link 
                  href={`/register?packageId=${pkg.id}`} 
                  className={`w-full py-3 rounded-xl font-bold text-center block transition-all text-sm ${pkg.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:scale-[1.02]' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'}`}
                >
                  Book Now
                </Link>
                <a 
                  href={`https://wa.me/94771234567?text=Hello%20Elite%20Fitness,%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package%20and%20would%20like%20more%20details.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 text-xs font-bold text-center block rounded-xl text-emerald-650 border border-emerald-100 hover:bg-emerald-50 bg-emerald-50/10 transition-all font-semibold"
                >
                  WhatsApp Inquiry
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/memberships" className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-2">
            View all package differences <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
