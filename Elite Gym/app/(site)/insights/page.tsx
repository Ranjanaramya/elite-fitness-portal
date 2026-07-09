import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogs } from '@/lib/sanity-service';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Read the latest training guides, bodybuilding strategies, and nutrition articles published by the coaches at Elite Fitness Sri Lanka.',
  keywords: ['Fitness blog Sri Lanka', 'Workout guides Colombo', 'Nutrition tips Colombo'],
  alternates: {
    canonical: '/insights'
  }
};

export default async function InsightsPage() {
  const blogs = await getBlogs();

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Banner */}
      <section className="bg-slate-950 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
            alt="Blog Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-space font-extrabold mb-4 tracking-tight">Insights</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Explore expert nutrition guidelines, physical training workouts, and local fitness news.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col group hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 border border-slate-100 backdrop-blur-sm text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm">
                    {blog.category}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    <h2 className="font-space font-bold text-2xl text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div>
                    <hr className="border-slate-200 mb-6" />
                    
                    <details className="group/detail cursor-pointer">
                      <summary className="list-none flex items-center justify-between font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors">
                        <span className="flex items-center gap-1">Read Article <ArrowRight className="w-4 h-4 transition-transform group-open/detail:rotate-90" /></span>
                      </summary>
                      <div className="mt-4 text-sm text-slate-600 leading-relaxed bg-white border border-slate-100 rounded-2xl p-6 whitespace-pre-line">
                        {blog.content}
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Elite Fitness Sri Lanka Blog",
            "description": "Fitness articles, workout plans, and health tips from our certified coaches.",
            "publisher": {
              "@type": "Organization",
              "name": "Elite Fitness Sri Lanka",
              "logo": {
                "@type": "ImageObject",
                "url": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
              }
            },
            "blogPost": blogs.map(b => ({
              "@type": "BlogPosting",
              "headline": b.title,
              "image": b.imageUrl,
              "datePublished": b.date,
              "description": b.excerpt,
              "author": {
                "@type": "Person",
                "name": "Elite Fitness Coaches"
              }
            }))
          })
        }}
      />
    </div>
  );
}
