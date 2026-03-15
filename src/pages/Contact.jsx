import { MapPin, Phone, Mail, Clock, Instagram, ArrowUpRight } from "lucide-react";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "../components/Motion";

export default function Contact() {
  return (
    <PageTransition className="min-h-screen bg-warm">
      <div className="bg-dark py-8 sm:py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-white">
            Get in Touch
          </h1>
          <p className="text-sm text-white/40 mt-1">
            We'd love to hear from you
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Info Cards */}
          <StaggerContainer className="space-y-3">
            {[
              { icon: MapPin, label: "Location", value: "F-8/3, Islamabad" },
              { icon: Phone, label: "Phone", value: "+92 XXX XXXXXXX" },
              { icon: Mail, label: "Email", value: "hello@sipcoffee.pk" },
              { icon: Clock, label: "Hours", value: "Daily: 8 AM – 1 AM" },
            ].map((info) => (
              <StaggerItem key={info.label}>
                <div className="bg-white rounded-2xl border border-black/5 p-4 flex gap-3">
                  <div className="w-9 h-9 bg-sip-bg rounded-xl flex items-center justify-center shrink-0">
                    <info.icon size={15} className="text-sip" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-dark-muted uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p className="text-sm font-medium truncate">{info.value}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}

            <StaggerItem>
              <a
                href="https://www.instagram.com/sipcoffee.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-dark rounded-2xl p-4 text-white hover:bg-dark-soft transition-colors"
              >
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Instagram size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">@sipcoffee.pk</p>
                  <p className="text-[10px] text-white/40">Follow on Instagram</p>
                </div>
                <ArrowUpRight size={14} className="text-white/40 shrink-0" />
              </a>
            </StaggerItem>
          </StaggerContainer>

          {/* Contact Form */}
          <FadeIn delay={0.15}>
            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <p className="text-xs font-semibold text-dark-muted uppercase tracking-wider mb-4">
                Send a Message
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message sent! We'll get back to you soon.");
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-warm border border-black/5 text-sm focus:outline-none focus:ring-2 focus:ring-sip/30"
                  required
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-warm border border-black/5 text-sm focus:outline-none focus:ring-2 focus:ring-sip/30"
                  required
                />
                <textarea
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-warm border border-black/5 text-sm focus:outline-none focus:ring-2 focus:ring-sip/30 resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-sip hover:bg-sip-dark text-white py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
