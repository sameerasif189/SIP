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
} from "lucide-react";
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
      {/* Hero header */}
      <div className="bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <FadeIn>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-sip text-[10px] font-bold uppercase tracking-[0.15em] mb-1">
                  SIP Islamabad
                </p>
                <h1 className="font-[var(--font-display)] text-xl sm:text-2xl font-bold text-white">
                  Good to see you!
                </h1>
              </div>
              <SipLogo size={44} className="mt-0.5" />
            </div>
            <div className="flex items-center gap-3 text-xs text-white/40 flex-wrap">
              {tableNumber && (
                <span className="flex items-center gap-1.5 bg-sip/15 text-sip-light px-2.5 py-1 rounded-full">
                  Table {tableNumber}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-sip" />
                8 AM – 1 AM
              </span>
              <span className="items-center gap-1 hidden sm:flex">
                <MapPin size={11} className="text-sip" />
                F-8/3, Islamabad
              </span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Categories */}
      <FadeIn>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
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
