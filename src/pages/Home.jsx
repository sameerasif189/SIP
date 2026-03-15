import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, ChevronRight } from "lucide-react";
import { menuData } from "../data/menu";
import MenuCard from "../components/MenuCard";

const categoryEmojis = {
  Breakfast: "🍳",
  Salads: "🥗",
  Sandwiches: "🥪",
  Coffee: "☕",
  "Slow Bar": "🫖",
  "Not Coffee": "🧃",
  Matcha: "🍵",
};

export default function Home() {
  const featuredItems = [
    menuData[0].items[0],
    menuData[0].items[2],
    menuData[3].items[5],
    menuData[4].items[4],
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200"
            alt="Coffee"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="inline-flex items-center gap-2 bg-sip/20 border border-sip/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 bg-sip rounded-full animate-pulse" />
            <span className="text-sip-light text-xs font-medium">
              Now open · F-8/3, Islamabad
            </span>
          </div>

          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] text-balance max-w-2xl">
            Where every cup is{" "}
            <span className="text-sip italic">crafted</span> with care
          </h1>

          <p className="text-white/40 text-sm sm:text-base mt-5 max-w-md leading-relaxed">
            Specialty coffee, artisan breakfast, and fresh bites.
            From our hands to your table.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 bg-sip hover:bg-sip-dark text-white pl-6 pr-5 py-3 rounded-full text-sm font-semibold transition-all"
            >
              Order Now
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/15 text-white px-6 py-3 rounded-full text-sm font-medium transition-all"
            >
              View Full Menu
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-5 mt-10 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-sip" />
              8 AM – 1 AM daily
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-sip" />
              F-8/3, Islamabad
            </span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
          {menuData.map((cat) => (
            <Link
              key={cat.category}
              to={`/menu?category=${encodeURIComponent(cat.category)}`}
              className="group bg-white rounded-2xl p-3 sm:p-4 text-center border border-black/5 hover:border-sip/30 hover:shadow-md transition-all"
            >
              <span className="text-xl sm:text-2xl block mb-1">
                {categoryEmojis[cat.category] || "🍽️"}
              </span>
              <p className="font-semibold text-[11px] sm:text-xs text-dark group-hover:text-sip transition-colors leading-tight">
                {cat.category}
              </p>
              <p className="text-[10px] text-dark-muted mt-0.5">
                {cat.items.length}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Items */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-sip text-xs font-bold uppercase tracking-[0.2em]">
              Popular
            </span>
            <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold mt-1">
              Must Try
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-xs text-sip hover:text-sip-dark font-semibold flex items-center gap-0.5 transition-colors"
          >
            All items
            <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {featuredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-dark rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative px-6 sm:px-10 py-10 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-white">
                Hungry? Let's go.
              </h3>
              <p className="text-white/40 text-sm mt-2">
                Browse our full menu and order in seconds.
              </p>
            </div>
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 bg-sip hover:bg-sip-dark text-white px-7 py-3 rounded-full text-sm font-semibold transition-all shrink-0"
            >
              Start Ordering
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
