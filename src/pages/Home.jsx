import { Link } from "react-router-dom";
import {
  ChevronRight,
  Sunrise,
  Leaf,
  Sandwich,
  Coffee,
  Timer,
  GlassWater,
  Bean,
  Plus,
  MapPin,
  Clock,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "framer-motion";
import { menuData } from "../data/menu";
import MenuCard from "../components/MenuCard";
import SipLogo from "../components/SipLogo";
import { useTable } from "../context/TableContext";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "../components/Motion";

const categoryIcons = {
  Breakfast: Sunrise,
  Salads: Leaf,
  Sandwiches: Sandwich,
  Coffee: Coffee,
  "Slow Bar": Timer,
  "Not Coffee": GlassWater,
  Matcha: Bean,
  Extras: Plus,
};

export default function Home() {
  const { tableNumber } = useTable();

  const featuredItems = [
    menuData[0].items[0],
    menuData[0].items[2],
    menuData[3].items[5],
    menuData[5].items[0],
  ];

  return (
    <PageTransition className="bg-warm min-h-screen">
      {/* Big Hero */}
      <div className="bg-dark relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-sip/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
            {/* Left content */}
            <div className="flex-1">
              <FadeIn>
                <p className="text-sip text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-2">
                  SIP Islamabad
                </p>
                <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  Dine-in Menu
                </h1>
                <p className="text-white/40 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
                  Order at your table. Track it here. Premium coffee and artisan food crafted with care.
                </p>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {tableNumber && (
                    <span className="flex items-center gap-1.5 bg-sip/15 text-sip-light text-xs sm:text-sm px-3.5 py-1.5 rounded-full font-medium border border-sip/20">
                      Table {tableNumber}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 bg-white/8 text-white/60 text-xs px-3 py-1.5 rounded-full border border-white/5">
                    <Clock size={12} />
                    8 AM – 1 AM
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/8 text-white/60 text-xs px-3 py-1.5 rounded-full border border-white/5">
                    <MapPin size={12} />
                    F-8/3, Islamabad
                  </span>
                  <span className="flex items-center gap-1.5 bg-sip/15 text-sip-light text-xs px-3 py-1.5 rounded-full border border-sip/20 hidden sm:flex">
                    <Star size={12} />
                    4.8 · 2,729 reviews
                  </span>
                </div>
                <div className="mt-6 flex gap-3">
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-2 bg-sip hover:bg-sip-dark text-dark px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-sip/20"
                  >
                    <UtensilsCrossed size={15} />
                    Full Menu
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right — logo with rings */}
            <FadeIn delay={0.15}>
              <div className="hidden sm:flex items-center justify-center relative">
                <motion.div
                  className="absolute w-[220px] h-[220px] lg:w-[280px] lg:h-[280px] rounded-[48px] lg:rounded-[60px] border border-sip/8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-[160px] h-[160px] lg:w-[200px] lg:h-[200px] rounded-[36px] lg:rounded-[44px] border border-sip/14"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                />
                <SipLogo size={100} glow className="lg:hidden" />
                <SipLogo size={130} glow className="hidden lg:flex" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Categories */}
      <FadeIn>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <p className="text-xs font-semibold text-dark-muted uppercase tracking-wider mb-3">
            Browse by category
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {menuData.map((cat) => {
              const Icon = categoryIcons[cat.category];
              return (
                <Link
                  key={cat.category}
                  to={`/menu?category=${encodeURIComponent(cat.category)}`}
                  className="group flex items-center gap-2.5 bg-white rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-black/5 hover:border-sip/30 hover:shadow-md transition-all shrink-0"
                >
                  {Icon && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sip/10 flex items-center justify-center group-hover:bg-sip/20 transition-colors">
                      <Icon size={14} className="text-sip-dark sm:hidden" />
                      <Icon size={15} className="text-sip-dark hidden sm:block" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-xs text-dark group-hover:text-sip-dark transition-colors whitespace-nowrap">
                      {cat.category}
                    </p>
                    <p className="text-[10px] text-dark-muted">
                      {cat.items.length} items
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </FadeIn>

      {/* Popular Picks */}
      <FadeIn>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-sip-dark text-xs font-bold uppercase tracking-[0.15em]">
                Popular
              </span>
              <h2 className="font-[var(--font-display)] text-lg sm:text-xl font-bold mt-0.5">
                Must Try
              </h2>
            </div>
            <Link
              to="/menu"
              className="text-xs text-sip-dark hover:text-sip font-semibold flex items-center gap-0.5 transition-colors"
            >
              See all
              <ChevronRight size={14} />
            </Link>
          </div>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {featuredItems.map((item) => (
              <StaggerItem key={item.id}>
                <MenuCard item={item} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </FadeIn>

      {/* Category sections */}
      {menuData.slice(0, 4).map((cat, catIdx) => (
        <FadeIn key={cat.category} delay={catIdx * 0.05}>
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
            <div className="flex items-end justify-between mb-4">
              <h2 className="font-[var(--font-display)] text-lg sm:text-xl font-bold">
                {cat.category}
              </h2>
              <Link
                to={`/menu?category=${encodeURIComponent(cat.category)}`}
                className="text-xs text-sip-dark hover:text-sip font-semibold flex items-center gap-0.5 transition-colors"
              >
                View all {cat.items.length}
                <ChevronRight size={14} />
              </Link>
            </div>
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {cat.items.slice(0, 3).map((item) => (
                <StaggerItem key={item.id}>
                  <MenuCard item={item} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </FadeIn>
      ))}
    </PageTransition>
  );
}
