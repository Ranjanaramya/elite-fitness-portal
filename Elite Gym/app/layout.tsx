import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: {
    default: 'Elite Fitness Sri Lanka | Achieve Your Fitness Goals',
    template: '%s | Elite Fitness Sri Lanka'
  },
  description: 'Premium gym and fitness center in Colombo, Sri Lanka. Offering professional coaches, group fitness classes, top-tier facilities, and personalized workout programs.',
  keywords: ['Gym in Sri Lanka', 'Fitness Center Colombo', 'Personal Training Sri Lanka', 'Group Classes Colombo', 'Cardio Gym Colombo', 'Bodybuilding Colombo', 'Elite Fitness Sri Lanka'],
  authors: [{ name: 'Elite Fitness' }],
  creator: 'Elite Fitness Dev Team',
  metadataBase: new URL('https://elite-gym-srilanka.netlify.app'),
  openGraph: {
    title: 'Elite Fitness Sri Lanka',
    description: 'Achieve your strength, conditioning, and lifestyle transformation goals at Colombo\'s premier training center.',
    url: 'https://elite-gym-srilanka.netlify.app',
    siteName: 'Elite Fitness Sri Lanka',
    locale: 'en_LK',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
