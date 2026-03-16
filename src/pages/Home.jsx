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
  ArrowRight,
  Flame,
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
      {/* ===== MASSIVE HERO ===== */}
      <div className="relative overflow-hidden bg-dark min-h-[420px] sm:min-h-[500px] lg:min-h-[560px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80"
            alt="SIP Coffee interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
        </div>

        {/* Floating glass elements */}
        <div className="absolute top-20 right-[15%] hidden lg:block">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-white rounded-2xl px-5 py-3"
          >
            <div className="flex items-center gap-2">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-white/90 text-sm font-semibold">4.8 Rating</span>
            </div>
            <p className="text-white/40 text-[10px] mt-0.5">2,729 reviews</p>
          </motion.div>
        </div>
        <div className="absolute bottom-32 right-[10%] hidden lg:block">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass-white rounded-2xl px-4 py-2.5"
          >
            <div className="flex items-center gap-2">
              <Flame size={13} className="text-orange-400" />
              <span className="text-white/80 text-xs font-medium">Popular right now</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-14 sm:pb-20">
          <FadeIn>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-sip animate-pulse" />
              <p className="text-sip text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] font-[var(--font-heading)]">
                Now Open · F-8/3, Islamabad
              </p>
            </div>

            <h1 className="heading-xl text-5xl sm:text-6xl lg:text-8xl text-white mb-6">
              Dine In,<br />
              <span className="heading-accent text-5xl sm:text-6xl lg:text-8xl">Sip Away.</span>
            </h1>

            <p className="text-white/45 text-base sm:text-lg max-w-lg mb-8 leading-relaxed font-light">
              Premium specialty coffee and artisan food, crafted with care. Order directly from your table.
            </p>

            {/* Info pills — glassmorphism */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap mb-8">
              {tableNumber && (
                <span className="glass-white flex items-center gap-2 text-white text-xs sm:text-sm px-4 py-2.5 rounded-full font-semibold">
                  <Armchair size={14} className="text-sip" />
                  Table {tableNumber}
                </span>
              )}
              <span className="glass-btn flex items-center gap-2 text-white/70 text-xs px-4 py-2.5 rounded-full">
                <Clock size={12} className="text-sip" />
                8 AM – 1 AM
              </span>
              <span className="glass-btn flex items-center gap-2 text-white/70 text-xs px-4 py-2.5 rounded-full">
                <MapPin size={12} className="text-sip" />
                F-8/3, Islamabad
              </span>
              <span className="glass-btn flex items-center gap-2 text-white/70 text-xs px-4 py-2.5 rounded-full hidden sm:flex">
                <Wifi size={12} className="text-sip" />
                Free WiFi
              </span>
              <span className="glass-btn flex items-center gap-2 text-white/70 text-xs px-4 py-2.5 rounded-full hidden md:flex">
                <Music size={12} className="text-sip" />
                Live Ambiance
              </span>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2.5 bg-sip hover:bg-sip-dark text-dark px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-bold transition-all shadow-xl shadow-sip/25 hover:shadow-sip/40 font-[var(--font-heading)] uppercase tracking-wider"
              >
                <UtensilsCrossed size={17} />
                Full Menu
              </Link>
              <Link
                to="/about"
                className="glass-btn inline-flex items-center gap-2 text-white/80 hover:text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl text-sm font-semibold tracking-wider uppercase font-[var(--font-heading)]"
              >
                Our Story
                <ArrowRight size={15} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ===== CATEGORIES ===== */}
      <FadeIn>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-sip-dark dark:text-sip text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] font-[var(--font-heading)] mb-1">
                Explore
              </p>
              <h2 className="heading-xl text-2xl sm:text-3xl dark:text-white">
                Browse <span className="heading-accent text-2xl sm:text-3xl">Categories</span>
              </h2>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {menuData.map((cat) => {
              const Icon = categoryIcons[cat.category];
              return (
                <Link
                  key={cat.category}
                  to={`/menu?category=${encodeURIComponent(cat.category)}`}
                  className="group glass-card rounded-2xl px-5 sm:px-6 py-4 sm:py-5 hover:shadow-xl hover:shadow-sip/8 dark:hover:shadow-sip/5 transition-all shrink-0 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3.5">
                    {Icon && (
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sip/10 dark:bg-sip/15 flex items-center justify-center group-hover:bg-sip group-hover:shadow-lg group-hover:shadow-sip/20 transition-all">
                        <Icon size={18} className="text-sip-dark dark:text-sip-light group-hover:text-dark transition-colors" />
                      </div>
                    )}
                    <div>
                      <p className="font-[var(--font-heading)] font-bold text-sm sm:text-base text-dark dark:text-white group-hover:text-sip-dark dark:group-hover:text-sip-light transition-colors whitespace-nowrap">
                        {cat.category}
                      </p>
                      <p className="text-[10px] sm:text-xs text-dark-muted dark:text-white/35 font-medium">
                        {cat.items.length} items
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </FadeIn>

      {/* ===== POPULAR PICKS ===== */}
      <FadeIn>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sip-dark dark:text-sip text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] font-[var(--font-heading)] mb-1">
                Chef's Pick
              </p>
              <h2 className="heading-xl text-2xl sm:text-3xl dark:text-white">
                Must <span className="heading-accent text-2xl sm:text-3xl">Try</span>
              </h2>
            </div>
            <Link
              to="/menu"
              className="glass-btn px-4 py-2 rounded-xl text-xs text-dark dark:text-white font-[var(--font-heading)] font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-sip hover:text-dark hover:border-sip/50 transition-all"
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

      {/* ===== CATEGORY SECTIONS ===== */}
      {menuData.slice(0, 4).map((cat, catIdx) => {
        const Icon = categoryIcons[cat.category];
        return (
          <FadeIn key={cat.category} delay={catIdx * 0.05}>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {Icon && (
                    <div className="w-10 h-10 rounded-xl bg-sip/10 dark:bg-sip/15 flex items-center justify-center">
                      <Icon size={18} className="text-sip-dark dark:text-sip" />
                    </div>
                  )}
                  <h2 className="heading-xl text-xl sm:text-2xl dark:text-white">
                    {cat.category}
                  </h2>
                </div>
                <Link
                  to={`/menu?category=${encodeURIComponent(cat.category)}`}
                  className="text-xs text-sip-dark dark:text-sip hover:text-sip font-[var(--font-heading)] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
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
        );
      })}

      {/* ===== BOTTOM CTA BANNER ===== */}
      <FadeIn>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
              alt="Coffee brewing"
              className="w-full h-56 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div>
                <h3 className="heading-xl text-2xl sm:text-4xl text-white mb-2">
                  Explore the <span className="heading-accent text-2xl sm:text-4xl">Full Menu</span>
                </h3>
                <p className="text-white/50 text-sm mb-5 max-w-sm">
                  From specialty coffee to artisan food — discover everything we have to offer.
                </p>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 bg-sip hover:bg-sip-dark text-dark px-6 py-3 rounded-xl text-sm font-bold font-[var(--font-heading)] uppercase tracking-wider transition-all shadow-lg shadow-sip/25"
                >
                  <UtensilsCrossed size={15} />
                  View Menu
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </PageTransition>
  );
}
