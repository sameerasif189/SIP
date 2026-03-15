import { MapPin, Phone, Instagram, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-sip rounded-lg flex items-center justify-center">
                <span className="font-[var(--font-display)] text-sm font-bold text-white">
                  SiP
                </span>
              </div>
              <span className="font-semibold text-white text-sm">
                SIP Coffee & Kitchen
              </span>
            </div>
            <p className="text-xs max-w-xs leading-relaxed">
              Premium coffee and artisan food in the heart of Islamabad.
              Every sip, a story.
            </p>
          </div>

          <div className="flex gap-8 sm:gap-12 text-sm">
            <div className="space-y-2">
              <p className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
                Visit
              </p>
              <p className="flex items-center gap-2 text-xs">
                <MapPin size={12} className="text-sip shrink-0" />
                F-8/3, Islamabad
              </p>
              <p className="flex items-center gap-2 text-xs">
                <Phone size={12} className="text-sip shrink-0" />
                +92 XXX XXXXXXX
              </p>
              <p className="text-xs">Daily: 8 AM – 1 AM</p>
            </div>
            <div className="space-y-2">
              <p className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
                Social
              </p>
              <a
                href="https://www.instagram.com/sipcoffee.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs hover:text-sip-light transition-colors"
              >
                <Instagram size={12} className="text-sip" />
                @sipcoffee.pk
                <ArrowUpRight size={10} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-5 sm:pt-6 text-[11px] text-white/30">
          &copy; {new Date().getFullYear()} SIP Coffee. Islamabad.
        </div>
      </div>
    </footer>
  );
}
