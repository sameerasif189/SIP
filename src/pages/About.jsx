import { Coffee, Heart, Award, MapPin, Clock, Utensils, Armchair, Sparkles } from "lucide-react";
import SipLogo from "../components/SipLogo";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "../components/Motion";

export default function About() {
  return (
    <PageTransition className="min-h-screen bg-warm dark:bg-dark">
      {/* Hero */}
      <div className="relative h-56 sm:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
          alt="Coffee shop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <SipLogo size={64} glow className="mx-auto mb-5" />
            <h1 className="font-[var(--font-display)] text-3xl sm:text-5xl font-bold text-white">
              Our Story
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Info card */}
        <FadeIn>
          <div className="glass-card rounded-2xl p-5 sm:p-7 -mt-12 sm:-mt-14 relative z-10 mb-6">
            <h2 className="font-[var(--font-display)] text-lg sm:text-xl font-bold mb-3 dark:text-white">
              SIP Coffee & Kitchen
            </h2>
            <div className="flex flex-wrap gap-3 text-sm text-dark-muted dark:text-white/50 mb-4">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-sip-dark dark:text-sip" />
                F-8/3, Islamabad
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-sip-dark dark:text-sip" />
                8 AM – 1 AM daily
              </span>
              <span className="flex items-center gap-1.5">
                <Utensils size={13} className="text-sip-dark dark:text-sip" />
                Dine-in & Takeaway
              </span>
              <span className="flex items-center gap-1.5">
                <Armchair size={13} className="text-sip-dark dark:text-sip" />
                Table Service
              </span>
            </div>
            <p className="text-sm text-dark-muted dark:text-white/50 leading-relaxed">
              Born from a passion for exceptional coffee and a love for bringing
              people together, SIP is more than just a café — it's a community in
              the heart of Islamabad.
            </p>
          </div>
        </FadeIn>

        {/* Story */}
        <FadeIn delay={0.1}>
          <div className="glass-card rounded-2xl p-5 sm:p-7 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-sip-dark dark:text-sip" />
              <h3 className="font-semibold dark:text-white">Crafted with Passion</h3>
            </div>
            <p className="text-sm text-dark-muted dark:text-white/50 leading-relaxed mb-3">
              At SIP, every cup of coffee is a labor of love. We source the finest
              beans and roast them to perfection. Our skilled baristas craft each
              drink with precision and care.
            </p>
            <p className="text-sm text-dark-muted dark:text-white/50 leading-relaxed">
              Our kitchen creates delicious food that perfectly complements our
              beverages — from hearty breakfast bowls to fresh salads and
              sandwiches, every dish is made fresh to order.
            </p>
          </div>
        </FadeIn>

        {/* Values */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              icon: Coffee,
              title: "Quality First",
              desc: "We never compromise on ingredients. Every bean, every bite.",
            },
            {
              icon: Heart,
              title: "Community",
              desc: "Where friends meet, ideas are born, and memories are made.",
            },
            {
              icon: Award,
              title: "Excellence",
              desc: "From service to flavors, excellence in everything we do.",
            },
          ].map((value) => (
            <StaggerItem key={value.title}>
              <div className="glass-card rounded-2xl p-5 text-center sm:text-left">
                <div className="w-11 h-11 bg-sip/10 dark:bg-sip/15 rounded-xl flex items-center justify-center mb-3 mx-auto sm:mx-0">
                  <value.icon size={19} className="text-sip-dark dark:text-sip" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5 dark:text-white">{value.title}</h3>
                <p className="text-dark-muted dark:text-white/40 text-xs leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
