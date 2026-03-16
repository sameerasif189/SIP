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
  Armchair,
  Wifi,
  Music,
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
    <PageTransition className="bg-warm dark:bg-dark min-h-screen">
      {/* Big Hero */}
      <div className="bg-dark relative overflow-hidden">
        {/* Glows */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-sip/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-sip/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-20 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            {/* Left */}
            <div className="flex-1">
              <FadeIn>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-sip animate-pulse" />
                  <p className="text-sip text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em]">
                    SIP Islamabad · Open Now
                  </p>
                </div>
                <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
                  Dine-in<br className="sm:hidden" /> Menu
                </h1>
                <p className="text-white/40 text-sm sm:text-base max-w-md mb-7 leading-relaxed">
                  Order at your table. Track it here. Premium specialty coffee and artisan food crafted with care.
                </p>

                {/* Info pills */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-7">
                  {tableNumber && (
                    <span className="glass flex items-center gap-1.5 text-sip-light text-xs sm:text-sm px-4 py-2 rounded-xl font-medium">
                      <Armchair size={13} />
                      Table {tableNumber}
                    </span>
                  )}
                  <span className="glass flex items-center gap-1.5 text-white/60 text-xs px-3.5 py-2 rounded-xl">
                    <Clock size={12} />
                    8 AM – 1 AM
                  </span>
                  <span className="glass flex items-center gap-1.5 text-white/60 text-xs px-3.5 py-2 rounded-xl">
                    <MapPin size={12} />
                    F-8/3, Islamabad
                  </span>
                  <span className="glass flex items-center gap-1.5 text-sip-light text-xs px-3.5 py-2 rounded-xl hidden sm:flex">
                    <Star size={12} />
                    4.8 · 2,729 reviews
                  </span>
                </div>

                {/* CTA */}
                <div className="flex gap-3 flex-wrap">
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-2 bg-sip hover:bg-sip-dark text-dark px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-sip/20 hover:shadow-sip/30"
                  >
                    <UtensilsCrossed size={16} />
                    Full Menu
                  </Link>
                  <div className="flex items-center gap-3 ml-2">
                    <span className="glass flex items-center gap-1.5 text-white/40 text-[11px] px-3 py-2 rounded-xl">
                      <Wifi size={11} />
                      Free WiFi
                    </span>
                    <span className="glass flex items-center gap-1.5 text-white/40 text-[11px] px-3 py-2 rounded-xl hidden sm:flex">
                      <Music size={11} />
                      Live Music
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right — logo with rings */}
            <FadeIn delay={0.15}>
              <div className="hidden sm:flex items-center justify-center relative">
                <motion.div
                  className="absolute w-[240px] h-[240px] lg:w-[300px] lg:h-[300px] rounded-[52px] lg:rounded-[64px] border border-sip/8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-[170px] h-[170px] lg:w-[220px] lg:h-[220px] rounded-[38px] lg:rounded-[48px] border border-sip/14"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-[110px] h-[110px] lg:w-[150px] lg:h-[150px] rounded-[28px] lg:rounded-[36px] border border-sip/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
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
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <p className="text-xs font-semibold text-dark-muted dark:text-white/40 uppercase tracking-wider mb-4">
            Browse by category
          </p>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
            {menuData.map((cat) => {
              const Icon = categoryIcons[cat.category];
              return (
                <Link
                  key={cat.category}
                  to={`/menu?category=${encodeURIComponent(cat.category)}`}
                  className="group flex items-center gap-3 glass-card rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 hover:shadow-lg hover:shadow-sip/5 transition-all shrink-0"
                >
                  {Icon && (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-sip/10 dark:bg-sip/15 flex items-center justify-center group-hover:bg-sip/20 transition-colors">
                      <Icon size={16} className="text-sip-dark dark:text-sip-light" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-dark dark:text-white group-hover:text-sip-dark dark:group-hover:text-sip-light transition-colors whitespace-nowrap">
                      {cat.category}
                    </p>
                    <p className="text-[10px] text-dark-muted dark:text-white/35">
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
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
          <div className="flex items-end justify-between mb-5">
            <div>
              <span className="text-sip-dark dark:text-sip text-xs font-bold uppercase tracking-[0.15em]">
                Popular
              </span>
              <h2 className="font-[var(--font-display)] text-xl sm:text-2xl font-bold mt-0.5 dark:text-white">
                Must Try
              </h2>
            </div>
            <Link
              to="/menu"
              className="text-xs text-sip-dark dark:text-sip hover:text-sip font-semibold flex items-center gap-0.5 transition-colors"
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
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
            <div className="flex items-end justify-between mb-5">
              <h2 className="font-[var(--font-display)] text-lg sm:text-xl font-bold dark:text-white">
                {cat.category}
              </h2>
              <Link
                to={`/menu?category=${encodeURIComponent(cat.category)}`}
                className="text-xs text-sip-dark dark:text-sip hover:text-sip font-semibold flex items-center gap-0.5 transition-colors"
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
