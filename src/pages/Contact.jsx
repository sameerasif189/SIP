import { MapPin, Phone, Mail, Clock, Instagram, ArrowUpRight, Send } from "lucide-react";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "../components/Motion";

export default function Contact() {
  return (
    <PageTransition className="min-h-screen bg-warm dark:bg-dark">
      {/* Hero banner */}
      <div className="bg-dark relative overflow-hidden min-h-[200px] sm:min-h-[260px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-sip/5 via-transparent to-sip/3" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center relative w-full">
          <FadeIn>
            <p className="text-sip text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] font-[var(--font-heading)] mb-2">
              Reach Out
            </p>
            <h1 className="heading-xl text-4xl sm:text-5xl text-white mb-3">
              Get in <span className="heading-accent text-4xl sm:text-5xl">Touch</span>
            </h1>
            <p className="text-white/40 text-sm">
              We'd love to hear from you
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
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
                <div className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:shadow-xl hover:shadow-sip/5 transition-all">
                  <div className="w-11 h-11 bg-sip/10 dark:bg-sip/15 rounded-xl flex items-center justify-center shrink-0">
                    <info.icon size={17} className="text-sip-dark dark:text-sip" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-dark-muted dark:text-white/35 uppercase tracking-wider font-[var(--font-heading)] font-bold">
                      {info.label}
                    </p>
                    <p className="text-sm font-semibold truncate dark:text-white">{info.value}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}

            <StaggerItem>
              <a
                href="https://www.instagram.com/sipcoffee.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-dark dark:bg-dark-soft rounded-2xl p-4 sm:p-5 text-white hover:bg-dark-soft dark:hover:bg-surface transition-colors border border-white/5"
              >
                <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Instagram size={17} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-[var(--font-heading)] font-bold">@sipcoffee.pk</p>
                  <p className="text-[10px] text-white/40">Follow on Instagram</p>
                </div>
                <ArrowUpRight size={14} className="text-white/40 shrink-0" />
              </a>
            </StaggerItem>
          </StaggerContainer>

          {/* Contact Form */}
          <FadeIn delay={0.15}>
            <div className="glass-card rounded-2xl p-5 sm:p-7">
              <p className="text-xs font-bold text-dark-muted dark:text-white/35 uppercase tracking-wider font-[var(--font-heading)] mb-5">
                Send a Message
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message sent! We'll get back to you soon.");
                }}
                className="space-y-3.5"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3.5 rounded-xl bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 text-sm font-medium dark:text-white dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sip/30"
                  required
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3.5 rounded-xl bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 text-sm font-medium dark:text-white dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sip/30"
                  required
                />
                <textarea
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-xl bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 text-sm font-medium dark:text-white dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sip/30 resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-sip hover:bg-sip-dark text-dark font-[var(--font-heading)] font-bold uppercase tracking-wider py-3.5 rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-sip/15"
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
