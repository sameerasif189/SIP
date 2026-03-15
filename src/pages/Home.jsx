import { Link } from "react-router-dom";
import { ArrowRight, Star, MapPin, Clock, Coffee, Utensils } from "lucide-react";
import { menuData } from "../data/menu";
import MenuCard from "../components/MenuCard";

export default function Home() {
  const featuredItems = [
    menuData[0].items[0], // Turkish Eggs
    menuData[0].items[2], // Avocado Toast
    menuData[3].items[4], // Café Latte
    menuData[4].items[4], // Affogato
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-brand min-h-[70vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200"
          alt="SIP Coffee"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/60 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-16 pt-32 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-olive rounded-xl flex items-center justify-center">
              <span className="font-[var(--font-display)] text-xl font-bold text-white">
                SiP
              </span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <span className="text-white/50 text-xs tracking-[0.3em] uppercase">
              Coffee & Kitchen
            </span>
          </div>

          <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Every sip,<br />a story.
          </h1>
          <p className="text-white/50 text-base sm:text-lg mt-4 max-w-md">
            Premium coffee and artisan food in the heart of Islamabad.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-olive hover:bg-olive-dark text-white px-7 py-3 rounded-full text-sm font-medium transition-colors"
            >
              Explore Menu
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-7 py-3 rounded-full text-sm font-medium transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-4 overflow-x-auto gap-6 scrollbar-hide text-sm">
            <span className="flex items-center gap-2 text-muted whitespace-nowrap">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              4.8 · 2,729+ guests
            </span>
            <span className="flex items-center gap-2 text-muted whitespace-nowrap">
              <MapPin size={14} className="text-olive" />
              F-8/3, Islamabad
            </span>
            <span className="flex items-center gap-2 text-muted whitespace-nowrap">
              <Clock size={14} className="text-olive" />
              8 AM – 1 AM
            </span>
            <span className="flex items-center gap-2 text-muted whitespace-nowrap">
              <Coffee size={14} className="text-olive" />
              Specialty Coffee
            </span>
          </div>
        </div>
      </section>

      {/* Ordering Options */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/menu"
            className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-olive/30 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 bg-olive/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-olive/20 transition-colors">
              <Utensils size={18} className="text-olive" />
            </div>
            <h3 className="font-semibold text-base mb-1">Table Service</h3>
            <p className="text-sm text-muted">
              Browse menu, order from your table. Average service time 15–20 min.
            </p>
          </Link>
          <Link
            to="/menu"
            className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-olive/30 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 bg-olive/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-olive/20 transition-colors">
              <Coffee size={18} className="text-olive" />
            </div>
            <h3 className="font-semibold text-base mb-1">Take-away</h3>
            <p className="text-sm text-muted">
              Order ahead and pick up when ready. Quick and convenient.
            </p>
          </Link>
        </div>
      </section>

      {/* Featured Items */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-olive font-medium tracking-widest uppercase mb-1">
              Popular
            </p>
            <h2 className="font-[var(--font-display)] text-xl font-bold">
              Crowd Favorites
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-sm text-olive hover:text-olive-dark font-medium flex items-center gap-1 transition-colors"
          >
            See all
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {featuredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs text-olive font-medium tracking-widest uppercase mb-1">
            Explore
          </p>
          <h2 className="font-[var(--font-display)] text-xl font-bold mb-6">
            Our Menu
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {menuData.map((cat) => (
              <Link
                key={cat.category}
                to={`/menu?category=${encodeURIComponent(cat.category)}`}
                className="group bg-gray-50 rounded-xl p-4 text-center hover:bg-olive/5 hover:ring-1 hover:ring-olive/20 transition-all"
              >
                <p className="font-medium text-sm text-brand group-hover:text-olive transition-colors">
                  {cat.category}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {cat.items.length} items
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="font-[var(--font-display)] text-3xl font-bold text-white mb-3">
            Ready to order?
          </h2>
          <p className="text-white/40 text-sm mb-8">
            Browse our full menu and place your order in seconds.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-olive hover:bg-olive-dark text-white px-8 py-3 rounded-full text-sm font-medium transition-colors"
          >
            Order Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
