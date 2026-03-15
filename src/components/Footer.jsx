import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand text-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-[var(--font-display)] text-2xl font-bold text-accent mb-4">
              SIP
            </h3>
            <p className="text-sm leading-relaxed text-cream-dark/70">
              Premium coffee and dining experience in the heart of Islamabad.
              Crafted with passion, served with love.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-accent shrink-0" />
                <span>Pakistan Town Phase 1, PWD, Islamabad</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent shrink-0" />
                <span>+92 XXX XXXXXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent shrink-0" />
                <span>hello@sipcoffee.pk</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Hours</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-accent shrink-0" />
                <div>
                  <p>Mon - Thu: 10:00 AM - 11:00 PM</p>
                  <p>Fri - Sun: 10:00 AM - 12:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://www.instagram.com/sipcoffee.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:text-accent-light transition-colors"
                >
                  <Instagram size={18} />
                  <span>@sipcoffee.pk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-cream-dark/50">
          <p>&copy; {new Date().getFullYear()} SIP Coffee & Dining. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
