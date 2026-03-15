import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-brand text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-2">
            Get in Touch
          </p>
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold">
            Contact Us
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Visit Us</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    value:
                      "Sunrise Plaza, 2nd Floor, Street #63,\nMakki Masjid Road, Pakistan Town Phase 1,\nPWD, Islamabad",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+92 XXX XXXXXXX",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@sipcoffee.pk",
                  },
                  {
                    icon: Clock,
                    label: "Hours",
                    value:
                      "Mon-Thu: 10:00 AM - 11:00 PM\nFri-Sun: 10:00 AM - 12:00 AM",
                  },
                ].map((info) => (
                  <div key={info.label} className="flex gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <info.icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{info.label}</p>
                      <p className="text-brand-light/60 text-sm whitespace-pre-line">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://www.instagram.com/sipcoffee.pk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <Instagram size={24} />
              <div>
                <p className="font-semibold">Follow us on Instagram</p>
                <p className="text-sm text-white/80">@sipcoffee.pk</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Send us a Message</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent! We'll get back to you soon.");
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-brand-light/70 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:outline-none focus:border-accent text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-light/70 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:outline-none focus:border-accent text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-light/70 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:outline-none focus:border-accent text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-light/70 mb-1.5">
                  Message
                </label>
                <textarea
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:outline-none focus:border-accent text-sm resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-dark text-white py-3.5 rounded-xl font-semibold transition-all text-sm cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
