import { GymSettings } from '@/lib/sanity-service';

export default function Contact({ settings }: { settings: GymSettings }) {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-2 block">Visit Our Gym</span>
            <h2 className="font-space text-4xl font-bold mb-6 tracking-tight">Opening Hours & Location</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Elite Fitness is located in the central commercial district of Colombo. Our facility features premium air filtration, temperature controls, and free dedicated customer parking.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Gym Operating Hours</h4>
                <p className="font-bold text-lg">
                  <span className="text-sm font-semibold text-slate-400 mr-2">Mon-Fri:</span>
                  {settings?.openingHours?.weekdays ? (
                    settings.openingHours.weekdays.replace(/^(mon-fri|weekdays?)\s*:\s*/i, '')
                  ) : (
                    '5:00 AM - 10:00 PM'
                  )}
                </p>
                <p className="font-bold text-lg">
                  <span className="text-sm font-semibold text-slate-400 mr-2">Sat-Sun:</span>
                  {settings?.openingHours?.weekends ? (
                    settings.openingHours.weekends.replace(/^(sat-sun|weekends?)\s*:\s*/i, '')
                  ) : (
                    '6:00 AM - 8:00 PM'
                  )}
                </p>
              </div>
              <div>
                <h4 className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Colombo Center Address</h4>
                <p className="text-slate-300 font-medium">{settings?.address || '123 Fitness Avenue, Colombo 03, Sri Lanka'}</p>
              </div>
              <div>
                <h4 className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Quick Contact Info</h4>
                <p className="text-slate-300 font-medium">Phone: {settings?.phone || '+94 11 234 5678'}</p>
                <p className="text-slate-300 font-medium">Email: {settings?.email || 'hello@elitefitness.lk'}</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-96 w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-zinc-900 flex items-center justify-center">
            {/* Dummy Map Visualizer */}
            <div className="absolute inset-0 bg-slate-900 flex flex-col justify-center items-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold mb-2">Colombo 03 Branch Map</h3>
              <p className="text-xs text-slate-500 max-w-sm mb-4">Elite Fitness Center, 123 Fitness Avenue, Colombo 03, Sri Lanka</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
