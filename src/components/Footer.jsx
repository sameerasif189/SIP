import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-olive/10 rounded-lg flex items-center justify-center">
                <span className="font-[var(--font-display)] text-lg font-bold text-olive">
                  SiP
                </span>
              </div>
              <span className="font-semibold text-brand">SIP</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Premium coffee and dining experience in the heart of Islamabad.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Contact</h4>
            <div className="space-y-2.5 text-sm text-muted">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-olive mt-0.5 shrink-0" />
                <span>F-8/3, Islamabad</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-olive shrink-0" />
                <span>+92 XXX XXXXXXX</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-olive shrink-0" />
                <span>hello@sipcoffee.pk</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Hours</h4>
            <div className="space-y-2.5 text-sm text-muted">
              <div className="flex items-center gap-2.5">
                <Clock size={14} className="text-olive shrink-0" />
                <span>Daily: 8:00 AM - 1:00 AM</span>
              </div>
              <a
                href="https://www.instagram.com/sipcoffee.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-olive hover:text-olive-dark transition-colors mt-3"
              >
                <Instagram size={14} />
                <span>@sipcoffee.pk</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 text-center text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} SIP Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
