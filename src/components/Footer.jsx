import { MapPin, Phone, Instagram, ArrowUpRight, Armchair, Coffee as CoffeeIcon, Heart } from "lucide-react";
import SipLogo from "./SipLogo";

export default function Footer() {
  return (
    <footer className="bg-dark text-white/60 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <SipLogo size={40} />
              <div>
                <p className="font-[var(--font-heading)] text-sm font-black uppercase tracking-wide">
                  <span className="text-white">SIP</span>{" "}
                  <span className="text-sip font-bold">COFFEE</span>
                </p>
                <p className="text-[9px] text-white/25 tracking-[0.15em] uppercase">& Kitchen · Islamabad</p>
              </div>
            </div>
            <p className="text-xs max-w-xs leading-relaxed mb-5 font-light">
              Premium coffee and artisan food in the heart of Islamabad.
              Every sip, a story.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="glass-btn flex items-center gap-1.5 text-white/40 text-[10px] px-3 py-1.5 rounded-lg font-medium">
                <Armchair size={10} />
                Dine-in Ordering
              </span>
              <span className="glass-btn flex items-center gap-1.5 text-white/40 text-[10px] px-3 py-1.5 rounded-lg font-medium">
                <CoffeeIcon size={10} />
                Specialty Brews
              </span>
            </div>
          </div>

          <div className="flex gap-8 sm:gap-12 text-sm">
            <div className="space-y-3">
              <p className="text-white text-[10px] font-[var(--font-heading)] font-bold uppercase tracking-[0.2em] mb-3">
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
            <div className="space-y-3">
              <p className="text-white text-[10px] font-[var(--font-heading)] font-bold uppercase tracking-[0.2em] mb-3">
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

        <div className="border-t border-white/[0.06] mt-8 pt-6 flex items-center justify-between text-[11px] text-white/25">
          <span>&copy; {new Date().getFullYear()} SIP Coffee. Islamabad.</span>
          <span className="flex items-center gap-1">
            Made with <Heart size={9} className="text-sip fill-sip" /> in Pakistan
          </span>
        </div>
      </div>
    </footer>
  );
}
