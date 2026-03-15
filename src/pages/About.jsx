import { Coffee, Heart, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative bg-brand text-white py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200"
            alt="Coffee shop"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-2">
            Our Story
          </p>
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold mb-6">
            About SIP
          </h1>
          <p className="text-cream-dark/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Born from a passion for exceptional coffee and a love for bringing
            people together, SIP is more than just a café — it's a community.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl font-bold mb-4">
              Crafted with Passion
            </h2>
            <p className="text-brand-light/60 leading-relaxed mb-4">
              At SIP, every cup of coffee is a labor of love. We source the
              finest beans from around the world and roast them to perfection
              right here in Islamabad. Our skilled baristas craft each drink
              with precision and care.
            </p>
            <p className="text-brand-light/60 leading-relaxed">
              But we're more than just coffee. Our kitchen creates delicious
              food that perfectly complements our beverages — from hearty
              burgers to delicate pastries, every dish is made fresh to order.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600"
              alt="Coffee making"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              icon: Coffee,
              title: "Quality First",
              desc: "We never compromise on the quality of our ingredients. Every bean, every bite — perfection.",
            },
            {
              icon: Heart,
              title: "Community",
              desc: "SIP is a place where friends meet, ideas are born, and memories are made over great coffee.",
            },
            {
              icon: Award,
              title: "Excellence",
              desc: "From our service to our flavors, we strive for excellence in everything we do.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="text-center bg-white p-8 rounded-2xl shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-xl mb-4">
                <value.icon className="text-accent" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
              <p className="text-brand-light/60 text-sm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
