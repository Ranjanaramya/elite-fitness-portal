import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/94112345678?text=Hello%20Elite%20Fitness!%20I%20would%20like%20to%20inquire%20about%20gym%20membership%20packages%20and%20classes."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.5)] cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-white z-50 group"
      aria-label="Contact us on WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none"></span>
      
      <svg className="w-8 h-8 text-white relative z-10 drop-shadow" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-1.074-.341-1.849-1.045-1.161-1.056-1.503-2.148-1.611-2.483-.108-.335-.405-.783-.405-1.232s.234-.674.318-.763c.084-.09.183-.112.243-.112.06 0 .121.001.174.004.054.002.124-.021.19-.18.066-.159.227-.554.275-.65.048-.096.08-.207.016-.335-.064-.128-.285-.31-.41-.462-.125-.152-.26-.319-.37-.435-.113-.119-.23-.099-.317-.1l-.271-.002c-.108 0-.285.041-.433.203-.148.162-.564.551-.564 1.344 0 .794.577 1.56.658 1.669.081.109 1.136 1.734 2.752 2.43.385.165.684.263.918.337.387.123.739.106 1.017.064.31-.047.954-.39 1.088-.767.135-.378.135-.702.095-.767-.04-.065-.147-.104-.31-.187z"/>
      </svg>
    </a>
  );
}
