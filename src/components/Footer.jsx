import { MapPin, Phone, Instagram, ArrowUpRight, Armchair, Coffee as CoffeeIcon } from "lucide-react";
import SipLogo from "./SipLogo";

export default function Footer() {
  return (
    <footer className="bg-dark text-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <SipLogo size={36} />
              <span className="font-semibold text-white text-sm">
                SIP Coffee & Kitchen
              </span>
            </div>
            <p className="text-xs max-w-xs leading-relaxed mb-4">
              Premium coffee and artisan food in the heart of Islamabad.
              Every sip, a story.
            </p>
            <div className="flex gap-2">
              <span className="glass flex items-center gap-1.5 text-white/40 text-[10px] px-3 py-1.5 rounded-lg">
                <Armchair size={10} />
                Dine-in ordering
              </span>
              <span className="glass flex items-center gap-1.5 text-white/40 text-[10px] px-3 py-1.5 rounded-lg">
                <CoffeeIcon size={10} />
                Specialty brews
              </span>
            </div>
          </div>

          <div className="flex gap-8 sm:gap-12 text-sm">
            <div className="space-y-2.5">
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
            <div className="space-y-2.5">
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

        <div className="border-t border-white/10 mt-8 pt-6 text-[11px] text-white/25">
          &copy; {new Date().getFullYear()} SIP Coffee. Islamabad.
        </div>
      </div>
    </footer>
  );
}
