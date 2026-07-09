import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ContactClient = dynamic(() => import('./ContactClient'), {
  loading: () => (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex items-center justify-center">
      <div className="text-slate-400 font-bold text-sm tracking-wide animate-pulse">Loading Enquiry Form...</div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Connect',
  description: 'Get in touch with Elite Fitness Sri Lanka in Colombo 03. Contact our customer support team for gym pricing plans and personal training packages.',
  keywords: ['Contact gym Colombo', 'Elite Fitness phone number', 'Gym address Colombo'],
  alternates: {
    canonical: '/connect'
  }
};

export default function ConnectPage() {
  return <ContactClient />;
}
