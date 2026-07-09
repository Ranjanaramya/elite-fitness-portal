import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import { getGymSettings, getTrainers, getPackages } from '@/lib/sanity-service';
import { getReviews } from '@/lib/data-service';

const Features = dynamic(() => import('@/components/home/Features'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});
const Services = dynamic(() => import('@/components/home/Services'), {
  loading: () => <div className="h-96 bg-slate-50 animate-pulse" />
});
const Trainers = dynamic(() => import('@/components/home/Trainers'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});
const BmiCalculator = dynamic(() => import('@/components/forms/BmiCalculator'), {
  loading: () => (
    <div className="w-full bg-white border border-slate-200 p-8 rounded-3xl max-w-4xl mx-auto shadow-sm flex items-center justify-center min-h-[400px]">
      <div className="text-slate-400 font-bold text-sm tracking-wide animate-pulse">Loading Health Metrics Calculator...</div>
    </div>
  ),
});
const Memberships = dynamic(() => import('@/components/home/Memberships'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});
const Testimonials = dynamic(() => import('@/components/home/Testimonials'), {
  loading: () => <div className="h-96 bg-slate-50 animate-pulse" />
});
const Contact = dynamic(() => import('@/components/home/Contact'), {
  loading: () => <div className="h-96 bg-slate-950 animate-pulse" />
});

export const metadata: Metadata = {
  title: 'Discover | Elite Fitness Sri Lanka',
  description: 'Welcome to Elite Fitness Sri Lanka. Discover our premium membership plans, certified physical trainers, steam rooms, and group fitness classes.',
  keywords: ['Elite Fitness Sri Lanka', 'Gym Colombo 03', 'Best gym in Colombo', 'Weight training Sri Lanka'],
  alternates: {
    canonical: '/'
  }
};

export default async function HomePage() {
  const [settings, trainers, allPackages, reviews] = await Promise.all([
    getGymSettings(),
    getTrainers(),
    getPackages(),
    getReviews()
  ]);

  const featuredPackages = allPackages.filter((p: any) => p.popular || p.price > 5000).slice(0, 3);
  const testimonials = reviews.filter((r: any) => r.status === 'approved').slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen text-slate-900 bg-slate-50">
      <Hero />
      <Features />
      <Services />
      <Trainers trainers={trainers} />

      {/* BMI Calculator Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-200/60 text-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs text-indigo-600 font-extrabold uppercase tracking-widest block mb-2">BMI Tools</span>
            <h2 className="font-space text-4xl font-bold mb-4 tracking-tight text-slate-900">Track Your Health Instantly</h2>
            <p className="text-slate-600 text-lg">
              Body Mass Index (BMI) evaluates your body composition in relation to your height. Calculate yours now, and save logs after signing up!
            </p>
          </div>
          <BmiCalculator />
        </div>
      </section>

      <Memberships featuredPackages={featuredPackages} />
      <Testimonials testimonials={testimonials} />
      <Contact settings={settings} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FitnessCenter",
            "name": "Elite Fitness Sri Lanka",
            "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
            "@id": "https://elite-gym-srilanka.netlify.app/#fitnesscenter",
            "url": "https://elite-gym-srilanka.netlify.app",
            "telephone": "+94112345678",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Fitness Avenue",
              "addressLocality": "Colombo 03",
              "postalCode": "00300",
              "addressCountry": "LK"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 6.915,
              "longitude": 79.85
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "05:00",
                "closes": "22:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday", "Sunday"],
                "opens": "06:00",
                "closes": "20:00"
              }
            ]
          })
        }}
      />
    </div>
  );
}
