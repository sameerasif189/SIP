import { Link } from "react-router-dom";
import { ArrowRight, Coffee, UtensilsCrossed, Star } from "lucide-react";
import { menuData } from "../data/menu";
import MenuCard from "../components/MenuCard";

export default function Home() {
  const featuredItems = [
    menuData[0].items[3], // Cappuccino
    menuData[2].items[5], // Lotus Biscoff Shake
    menuData[5].items[1], // Smash Burger
    menuData[8].items[0], // Chocolate Lava Cake
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-brand min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200"
            alt="Coffee"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-accent font-medium tracking-[0.3em] uppercase text-sm mb-4">
              Welcome to
            </p>
            <h1 className="font-[var(--font-display)] text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              SIP
            </h1>
            <p className="text-cream-dark/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              Experience premium coffee and exquisite dining in the heart of
              Islamabad. Every cup tells a story, every dish is a masterpiece.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 text-sm"
              >
                Explore Menu
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border-2 border-cream-dark/30 text-cream-dark hover:border-accent hover:text-accent px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 text-sm"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Coffee,
                title: "Premium Coffee",
                desc: "Sourced from the finest beans, roasted to perfection and brewed with expertise.",
              },
              {
                icon: UtensilsCrossed,
                title: "Delicious Food",
                desc: "From gourmet burgers to fresh pasta, our chef crafts every dish with passion.",
              },
              {
                icon: Star,
                title: "Cozy Ambiance",
                desc: "A warm, inviting space designed for conversations, work, or simply unwinding.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-xl mb-4">
                  <feature.icon className="text-accent" size={28} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-brand-light/60 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-cream-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-2">
              Our Favorites
            </p>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold">
              Must-Try Items
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-semibold transition-colors"
            >
              View Full Menu
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-cream-dark/70 text-lg mb-8">
            Browse our full menu and have your favorites ready for pickup or
            dine-in.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-xl font-semibold transition-all duration-200"
          >
            Order Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
