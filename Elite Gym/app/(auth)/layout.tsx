import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          &larr; Back to Home
        </Link>
      </div>
      {children}
    </div>
  );
}
