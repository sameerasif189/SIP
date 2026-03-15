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
import { useTable } from "../context/TableContext";

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
    <div className="bg-warm min-h-screen">
      {/* Compact header with table info */}
      <div className="bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-[var(--font-display)] text-xl sm:text-2xl font-bold text-white">
                Good to see you!
              </h1>
              <div className="flex items-center gap-4 mt-1.5 text-xs text-white/40">
                {tableNumber && (
                  <span className="flex items-center gap-1.5 bg-sip/20 text-sip-light px-2.5 py-1 rounded-full">
                    Table {tableNumber}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock size={11} className="text-sip" />
                  8 AM – 1 AM
                </span>
                <span className="flex items-center gap-1 hidden sm:flex">
                  <MapPin size={11} className="text-sip" />
                  F-8/3, Islamabad
                </span>
              </div>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 bg-sip hover:bg-sip-dark text-white px-4 py-2 rounded-full text-xs font-semibold transition-all"
            >
              Full Menu
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Categories — horizontal scroll */}
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
                className="group flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 border border-black/5 hover:border-sip/30 hover:shadow-md transition-all shrink-0"
              >
                {Icon && (
                  <div className="w-8 h-8 rounded-lg bg-sip/10 flex items-center justify-center group-hover:bg-sip/20 transition-colors">
                    <Icon size={15} className="text-sip" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-xs text-dark group-hover:text-sip transition-colors whitespace-nowrap">
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

      {/* Popular Picks */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-sip text-xs font-bold uppercase tracking-[0.15em]">
              Popular
            </span>
            <h2 className="font-[var(--font-display)] text-lg sm:text-xl font-bold mt-0.5">
              Must Try
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-xs text-sip hover:text-sip-dark font-semibold flex items-center gap-0.5 transition-colors"
          >
            See all
            <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {featuredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Quick category sections with first 3 items each */}
      {menuData.slice(0, 4).map((cat) => (
        <section key={cat.category} className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-[var(--font-display)] text-lg sm:text-xl font-bold">
              {cat.category}
            </h2>
            <Link
              to={`/menu?category=${encodeURIComponent(cat.category)}`}
              className="text-xs text-sip hover:text-sip-dark font-semibold flex items-center gap-0.5 transition-colors"
            >
              View all {cat.items.length}
              <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {cat.items.slice(0, 3).map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
