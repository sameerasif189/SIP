import { Coffee, Heart, Award, Star, MapPin, Clock } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero */}
      <div className="relative h-56 sm:h-72">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200"
          alt="Coffee shop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-[var(--font-display)] text-4xl font-bold mb-2">
              About SIP
            </h1>
            <p className="text-white/70 text-sm">Our story, our passion</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Info Card */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 -mt-16 relative z-10 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-olive/10 rounded-xl flex items-center justify-center">
              <span className="font-[var(--font-display)] text-xl font-bold text-olive">
                SiP
              </span>
            </div>
            <div>
              <h2 className="font-semibold text-lg">SIP Coffee</h2>
              <div className="flex items-center gap-3 text-sm text-muted">
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-500 fill-yellow-500" />
                  4.8
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  F-8/3, Islamabad
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  8 AM – 1 AM
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            Born from a passion for exceptional coffee and a love for bringing
            people together, SIP is more than just a café — it's a community in
            the heart of Islamabad.
          </p>
        </div>

        {/* Story */}
        <div className="space-y-6 mb-10">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold mb-3">Our Story</h3>
            <p className="text-sm text-muted leading-relaxed">
              At SIP, every cup of coffee is a labor of love. We source the
              finest beans and roast them to perfection. Our skilled baristas
              craft each drink with precision and care, creating an experience
              that goes beyond just a cup of coffee.
            </p>
            <p className="text-sm text-muted leading-relaxed mt-3">
              But we're more than just coffee. Our kitchen creates delicious food
              that perfectly complements our beverages — from hearty breakfast
              bowls to fresh salads and sandwiches, every dish is made fresh to
              order.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Coffee,
              title: "Quality First",
              desc: "We never compromise on ingredients. Every bean, every bite — perfection.",
            },
            {
              icon: Heart,
              title: "Community",
              desc: "A place where friends meet, ideas are born, and memories are made.",
            },
            {
              icon: Award,
              title: "Excellence",
              desc: "From service to flavors, we strive for excellence in everything.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="bg-white rounded-xl border border-gray-100 p-5"
            >
              <div className="w-9 h-9 bg-olive/10 rounded-lg flex items-center justify-center mb-3">
                <value.icon size={18} className="text-olive" />
              </div>
              <h3 className="font-semibold text-sm mb-1.5">{value.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
