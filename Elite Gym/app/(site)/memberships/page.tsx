import { Metadata } from 'next';
import Link from 'next/link';
import { getPackages } from '@/lib/sanity-service';
import { Check, Info, Dumbbell, Award, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: {
    absolute: "Gym Membership Plans in Colombo | Elite Fitness Sri Lanka"
  },

  description:
    "Compare affordable gym membership packages in Colombo. Choose Basic, Standard, or Premium plans with certified trainers, modern facilities, group fitness classes, and flexible pricing.",

  keywords: [
    "gym membership Colombo",
    "fitness membership Sri Lanka",
    "best gym Colombo",
    "gym packages",
    "premium gym Sri Lanka",
    "personal trainer Colombo",
    "Elite Fitness Sri Lanka"
  ],

  alternates: {
    canonical: "/memberships",
  },

  openGraph: {
    title: "Gym Membership Plans | Elite Fitness Sri Lanka",
    description:
      "Explore our affordable membership packages designed for beginners, fitness enthusiasts, and professional athletes.",
    url: "/memberships",
    type: "website",
  },
};

export default async function MembershipsPage() {
  const packages = await getPackages();

  // Structured data (JSON-LD) for FitnessCenter, OfferCatalog, and Offer
  const fitnessCenterSchema = {
    "@context": "https://schema.org",
    "@type": "FitnessCenter",
    "name": "Elite Fitness Sri Lanka",
    "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Colombo 03",
      "addressLocality": "Colombo",
      "addressRegion": "Western Province",
      "addressCountry": "LK"
    },
    "telephone": "+94771234567",
    "url": "https://elite-gym-srilanka.netlify.app/memberships",
    "priceRange": "$$$",
    "makesOffer": {
      "@type": "OfferCatalog",
      "name": "Gym Membership Plans",
      "description": "Affordable gym membership packages in Colombo, Sri Lanka",
      "itemListElement": packages.map((pkg, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "price": pkg.price,
        "priceCurrency": "LKR",
        "itemOffered": {
          "@type": "Service",
          "name": pkg.name,
          "description": pkg.benefits?.join(', ') || `Access to ${pkg.name}`
        }
      }))
    }
  };

  // Structured data (JSON-LD) for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which gym membership is best for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Basic Membership is ideal for beginners, offering unlimited gym access and a free fitness assessment."
        }
      },
      {
        "@type": "Question",
        "name": "Can I cancel my membership anytime?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, members can cancel according to our membership terms and conditions."
        }
      },
      {
        "@type": "Question",
        "name": "Do memberships include group classes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard and Premium memberships include access to selected group fitness classes."
        }
      }
    ]
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fitnessCenterSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Banner */}
      <section className="bg-slate-950 text-white py-24 text-center relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-space font-extrabold mb-4 tracking-tight">Memberships</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Find the perfect training tier for your goals and schedule.
          </p>
        </div>
      </section>

      {/* Why Choose Our Memberships */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs text-indigo-600 font-extrabold uppercase tracking-widest block mb-2">Benefits</span>
            <h2 className="font-space text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Choose Our Memberships?
            </h2>
            <p className="text-slate-650 mt-4 max-w-2xl mx-auto text-base md:text-lg font-medium">
              Elite Fitness Sri Lanka offers flexible gym memberships designed for beginners, athletes, and fitness enthusiasts. Every membership includes access to premium equipment, certified trainers, changing facilities, and a supportive fitness community in Colombo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <Dumbbell className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-space font-bold text-slate-800 text-lg mb-2">Premium Equipment</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Train with state-of-the-art European gym rigs and modern bio-mechanical machinery.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-space font-bold text-slate-800 text-lg mb-2">Certified Trainers</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Get guided support and personalized routines from professional physical coaches.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-space font-bold text-slate-800 text-lg mb-2">Modern Facilities</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Enjoy pristine changing facilities, safe locker systems, and clean recovery spaces.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-space font-bold text-slate-800 text-lg mb-2">Supportive Community</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Join a motivating fitness family in Colombo that keeps you accountable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`p-8 rounded-3xl border flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative ${pkg.popular ? 'border-2 border-indigo-600 bg-white ring-8 ring-indigo-500/5' : 'border-slate-200 bg-slate-50'}`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 right-6 bg-indigo-600 text-white text-xs font-bold uppercase px-3.5 py-1 rounded-full tracking-wider shadow">
                    Most Popular
                  </span>
                )}
                
                <div>
                  <span className="text-xs text-slate-400 font-extrabold uppercase tracking-widest block mb-1">Package Option</span>
                  <h2 className="font-space font-bold text-2xl text-slate-900 mb-4">{pkg.name}</h2>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-extrabold text-slate-900 font-space">Rs {pkg.price.toLocaleString()}</span>
                    <span className="text-slate-500 font-bold text-sm"> / {pkg.duration} {pkg.duration === 1 ? 'Month' : 'Months'}</span>
                  </div>
                  
                  <hr className="border-slate-200/60 mb-6" />
                  
                  <ul className="space-y-4 mb-8">
                    {pkg.benefits?.map((benefit: string, bi: number) => (
                      <li key={bi} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                           <Check className="w-3 h-3 text-indigo-600" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 leading-tight">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Link 
                    href={`/register?packageId=${pkg.id}`} 
                    className={`w-full py-3.5 font-bold text-center block rounded-xl hover:scale-[1.01] active:scale-95 transition-all text-sm ${pkg.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow shadow-indigo-500/15' : 'bg-indigo-50/50 text-indigo-700 border border-indigo-100 hover:bg-indigo-50'}`}
                  >
                    Book Membership
                  </Link>
                  <a 
                    href={`https://wa.me/94771234567?text=Hello%20Elite%20Fitness,%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package%20and%20would%20like%20more%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 text-xs font-bold text-center block rounded-xl text-emerald-650 border border-emerald-100 hover:bg-emerald-50 bg-emerald-50/20 transition-all font-semibold"
                  >
                    WhatsApp Inquiry
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Refund Notice */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl max-w-3xl mx-auto flex items-start gap-4 shadow-sm mb-16">
            <Info className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1 font-space">Important Billing Info</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                All packages are subject to approval if paid via manual bank transfer. Online payments through integrated gateways reflect immediately. Subscriptions do not auto-renew without manual consent. All package amounts are inclusive of local taxes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <span className="text-xs text-indigo-600 font-extrabold uppercase tracking-widest block mb-2">Got Questions?</span>
            <h2 className="font-space text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 mt-2">Find quick answers about our gym memberships in Colombo.</p>
          </div>

          <div className="space-y-4">
            <details className="group bg-white rounded-2xl border border-slate-200/60 p-6 [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <h3 className="font-space font-bold text-slate-900 text-base md:text-lg">
                  Which gym membership is best for beginners?
                </h3>
                <span className="relative ml-1.5 h-5 w-5 shrink-0">
                  <svg
                    className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0 text-slate-500 transition-opacity duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <svg
                    className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 text-indigo-600 transition-opacity duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                The Basic Membership is ideal for beginners, offering unlimited gym access and a free fitness assessment.
              </p>
            </details>

            <details className="group bg-white rounded-2xl border border-slate-200/60 p-6 [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <h3 className="font-space font-bold text-slate-900 text-base md:text-lg">
                  Can I cancel my membership anytime?
                </h3>
                <span className="relative ml-1.5 h-5 w-5 shrink-0">
                  <svg
                    className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0 text-slate-500 transition-opacity duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <svg
                    className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 text-indigo-600 transition-opacity duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                Yes, members can cancel according to our membership terms and conditions.
              </p>
            </details>

            <details className="group bg-white rounded-2xl border border-slate-200/60 p-6 [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <h3 className="font-space font-bold text-slate-900 text-base md:text-lg">
                  Do memberships include group classes?
                </h3>
                <span className="relative ml-1.5 h-5 w-5 shrink-0">
                  <svg
                    className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0 text-slate-500 transition-opacity duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <svg
                    className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 text-indigo-600 transition-opacity duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-sm md:text-base text-slate-605 leading-relaxed font-medium">
                Standard and Premium memberships include access to selected group fitness classes.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
