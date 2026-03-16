import { Coffee, Heart, Award, MapPin, Clock, Utensils } from "lucide-react";
import SipLogo from "../components/SipLogo";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "../components/Motion";

export default function About() {
  return (
    <PageTransition className="min-h-screen bg-warm">
      {/* Hero */}
      <div className="relative h-52 sm:h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
          alt="Coffee shop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <SipLogo size={56} className="mx-auto mb-4" />
            <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white">
              Our Story
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Info card — overlapping hero */}
        <FadeIn>
          <div className="bg-white rounded-2xl border border-black/5 p-5 sm:p-6 -mt-10 sm:-mt-12 relative z-10 mb-6">
            <h2 className="font-[var(--font-display)] text-lg sm:text-xl font-bold mb-3">
              SIP Coffee & Kitchen
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-dark-muted mb-4">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-sip-dark" />
                F-8/3, Islamabad
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-sip-dark" />
                8 AM – 1 AM daily
              </span>
              <span className="flex items-center gap-1.5">
                <Utensils size={13} className="text-sip-dark" />
                Dine-in & Takeaway
              </span>
            </div>
            <p className="text-sm text-dark-muted leading-relaxed">
              Born from a passion for exceptional coffee and a love for bringing
              people together, SIP is more than just a café — it's a community in
              the heart of Islamabad.
            </p>
          </div>
        </FadeIn>

        {/* Story */}
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl border border-black/5 p-5 sm:p-6 mb-6">
            <h3 className="font-semibold mb-3">Crafted with Passion</h3>
            <p className="text-sm text-dark-muted leading-relaxed mb-3">
              At SIP, every cup of coffee is a labor of love. We source the finest
              beans and roast them to perfection. Our skilled baristas craft each
              drink with precision and care.
            </p>
            <p className="text-sm text-dark-muted leading-relaxed">
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
              <div className="bg-white rounded-2xl border border-black/5 p-5 text-center sm:text-left">
                <div className="w-10 h-10 bg-sip/10 rounded-xl flex items-center justify-center mb-3 mx-auto sm:mx-0">
                  <value.icon size={18} className="text-sip-dark" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{value.title}</h3>
                <p className="text-dark-muted text-xs leading-relaxed">
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
