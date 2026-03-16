import { MapPin, Phone, Mail, Clock, Instagram, ArrowUpRight, Send } from "lucide-react";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "../components/Motion";

export default function Contact() {
  return (
    <PageTransition className="min-h-screen bg-warm dark:bg-dark">
      <div className="bg-dark py-10 sm:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white">
            Get in Touch
          </h1>
          <p className="text-sm text-white/40 mt-2">
            We'd love to hear from you
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid md:grid-cols-2 gap-4 items-start">
          {/* Info Cards */}
          <StaggerContainer className="space-y-3">
            {[
              { icon: MapPin, label: "Location", value: "F-8/3, Islamabad" },
              { icon: Phone, label: "Phone", value: "+92 XXX XXXXXXX" },
              { icon: Mail, label: "Email", value: "hello@sipcoffee.pk" },
              { icon: Clock, label: "Hours", value: "Daily: 8 AM – 1 AM" },
            ].map((info) => (
              <StaggerItem key={info.label}>
                <div className="glass-card rounded-2xl p-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-sip/10 dark:bg-sip/15 rounded-xl flex items-center justify-center shrink-0">
                    <info.icon size={16} className="text-sip-dark dark:text-sip" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-dark-muted dark:text-white/35 uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p className="text-sm font-medium truncate dark:text-white">{info.value}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}

            <StaggerItem>
              <a
                href="https://www.instagram.com/sipcoffee.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 bg-dark dark:bg-dark-soft rounded-2xl p-4 text-white hover:bg-dark-soft dark:hover:bg-surface transition-colors border border-white/5"
              >
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Instagram size={16} />
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
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <p className="text-xs font-semibold text-dark-muted dark:text-white/35 uppercase tracking-wider mb-4">
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
                  className="w-full px-4 py-3 rounded-xl bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 text-sm dark:text-white dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sip/30"
                  required
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-xl bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 text-sm dark:text-white dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sip/30"
                  required
                />
                <textarea
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 text-sm dark:text-white dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sip/30 resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-sip hover:bg-sip-dark text-dark font-semibold py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-lg shadow-sip/15"
                >
                  <Send size={14} />
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
