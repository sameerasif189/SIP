import { Coffee, Heart, Award, MapPin, Clock, Utensils, Armchair, Sparkles, Users, Leaf } from "lucide-react";
import SipLogo from "../components/SipLogo";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "../components/Motion";

export default function About() {
  return (
    <PageTransition className="min-h-screen bg-warm dark:bg-dark">
      {/* ===== MASSIVE HERO — matching reference ===== */}
      <div className="relative min-h-[400px] sm:min-h-[520px] lg:min-h-[600px] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80"
            alt="SIP Coffee interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-dark/30" />
        </div>
        <div className="relative z-10 w-full text-center px-4 sm:px-6 py-16">
          <FadeIn>
            <h1 className="heading-xl text-6xl sm:text-7xl lg:text-9xl text-white mb-6">
              Our <span className="heading-accent text-6xl sm:text-7xl lg:text-9xl">Story</span>
            </h1>
            <p className="text-white/55 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light font-[var(--font-display)] italic">
              Founded with a passion for excellence, SIP Coffee is more than just a cafe — it's a journey into the heart of coffee culture.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Info card — overlapping hero */}
        <FadeIn>
          <div className="glass-card rounded-3xl p-6 sm:p-8 -mt-16 sm:-mt-20 relative z-10 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <SipLogo size={48} />
              <div>
                <h2 className="font-[var(--font-heading)] text-lg sm:text-xl font-bold dark:text-white">
                  SIP Coffee & Kitchen
                </h2>
                <p className="text-dark-muted dark:text-white/40 text-xs">Est. 2019 · Islamabad, Pakistan</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5 mb-5">
              {[
                { icon: MapPin, text: "F-8/3, Islamabad" },
                { icon: Clock, text: "8 AM – 1 AM daily" },
                { icon: Utensils, text: "Dine-in & Takeaway" },
                { icon: Armchair, text: "Table Service" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="glass-btn flex items-center gap-1.5 text-dark dark:text-white/70 text-xs px-3.5 py-2 rounded-xl font-medium">
                  <Icon size={13} className="text-sip-dark dark:text-sip" />
                  {text}
                </span>
              ))}
            </div>
            <p className="text-dark-muted dark:text-white/50 text-sm leading-relaxed">
              Born from a passion for exceptional coffee and a love for bringing
              people together, SIP is more than just a café — it's a community in
              the heart of Islamabad.
            </p>
          </div>
        </FadeIn>

        {/* Story Section */}
        <FadeIn delay={0.1}>
          <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sip/10 dark:bg-sip/15 flex items-center justify-center">
                <Sparkles size={18} className="text-sip-dark dark:text-sip" />
              </div>
              <h3 className="font-[var(--font-heading)] font-bold text-lg dark:text-white">
                Crafted with Passion
              </h3>
            </div>
            <p className="text-dark-muted dark:text-white/50 text-sm leading-relaxed mb-4">
              At SIP, every cup of coffee is a labor of love. We source the finest
              beans and roast them to perfection. Our skilled baristas craft each
              drink with precision and care.
            </p>
            <p className="text-dark-muted dark:text-white/50 text-sm leading-relaxed">
              Our kitchen creates delicious food that perfectly complements our
              beverages — from hearty breakfast bowls to fresh salads and
              sandwiches, every dish is made fresh to order.
            </p>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { num: "2,729+", label: "Happy Reviews", icon: Heart },
              { num: "50+", label: "Menu Items", icon: Utensils },
              { num: "6+", label: "Years Serving", icon: Coffee },
              { num: "16", label: "Cozy Tables", icon: Armchair },
            ].map(({ num, label, icon: Icon }) => (
              <div key={label} className="glass-card rounded-2xl p-4 sm:p-5 text-center">
                <Icon size={20} className="text-sip-dark dark:text-sip mx-auto mb-2" />
                <p className="font-[var(--font-heading)] font-black text-xl sm:text-2xl dark:text-white">{num}</p>
                <p className="text-dark-muted dark:text-white/40 text-[10px] sm:text-xs font-medium uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
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
              icon: Users,
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
              <div className="glass-card rounded-2xl p-5 sm:p-6 text-center sm:text-left hover:shadow-xl hover:shadow-sip/5 transition-all">
                <div className="w-12 h-12 bg-sip/10 dark:bg-sip/15 rounded-xl flex items-center justify-center mb-3 mx-auto sm:mx-0">
                  <value.icon size={20} className="text-sip-dark dark:text-sip" />
                </div>
                <h3 className="font-[var(--font-heading)] font-bold text-sm dark:text-white mb-1.5">{value.title}</h3>
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
