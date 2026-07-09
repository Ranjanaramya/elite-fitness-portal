import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import FloatingWhatsApp from '@/components/global/FloatingWhatsApp';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 bg-slate-50">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
