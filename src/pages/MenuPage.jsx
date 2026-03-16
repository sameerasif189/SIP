import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  X,
  ChevronRight,
  Sunrise,
  Leaf,
  Sandwich,
  Coffee,
  Timer,
  GlassWater,
  Bean,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { menuData } from "../data/menu";
import { useCart } from "../context/CartContext";
import MenuCard from "../components/MenuCard";
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

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || null;
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, totalPrice } = useCart();
  const sectionRefs = useRef({});

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
      setTimeout(() => {
        sectionRefs.current[cat]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [searchParams]);

  const isSearching = searchQuery.length > 0;

  const searchResults = isSearching
    ? menuData.flatMap((c) =>
        c.items
          .filter(
            (item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item) => ({ ...item, category: c.category }))
      )
    : [];

  const scrollToCategory = (cat) => {
    setActiveCategory(cat);
    sectionRefs.current[cat]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <PageTransition className="min-h-screen bg-warm dark:bg-dark relative">
      {/* Mini hero banner */}
      <div className="bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sip/5 via-transparent to-sip/3" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 relative">
          <FadeIn>
            <p className="text-sip text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] font-[var(--font-heading)] mb-2">
              Our Menu
            </p>
            <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-white mb-2">
              What's <span className="heading-accent text-3xl sm:text-4xl lg:text-5xl">Cooking?</span>
            </h1>
            <p className="text-white/40 text-sm max-w-md">
              Explore our full selection of specialty coffee, artisan food, and fresh bites.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Search Header — sticky */}
      <div className="bg-white/80 dark:bg-dark-soft/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 sticky top-[68px] sm:top-[76px] z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted dark:text-white/35" />
            <input
              type="text"
              placeholder="Search our menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 text-sm text-dark dark:text-white placeholder:text-dark-muted dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sip/30 focus:border-sip/30 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-muted dark:text-white/35 hover:text-dark dark:hover:text-white cursor-pointer"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex gap-6 pt-5 pb-28 sm:pb-24">
          {/* Sidebar — desktop */}
          {!isSearching && (
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-44">
                <p className="text-[10px] font-bold text-dark-muted dark:text-white/30 uppercase tracking-[0.2em] font-[var(--font-heading)] mb-3 px-2">
                  Categories
                </p>
                <nav className="space-y-1">
                  {menuData.map((cat) => {
                    const Icon = categoryIcons[cat.category];
                    return (
                      <button
                        key={cat.category}
                        onClick={() => scrollToCategory(cat.category)}
                        className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all cursor-pointer font-[var(--font-heading)] font-semibold ${
                          activeCategory === cat.category
                            ? "bg-sip text-dark shadow-lg shadow-sip/20"
                            : "text-dark-muted dark:text-white/50 hover:bg-sip-bg dark:hover:bg-white/5 hover:text-dark dark:hover:text-white"
                        }`}
                      >
                        {Icon && (
                          <Icon
                            size={16}
                            className={
                              activeCategory === cat.category
                                ? "text-dark/60"
                                : "text-sip-dark dark:text-sip"
                            }
                          />
                        )}
                        <span className="flex-1">{cat.category}</span>
                        <span
                          className={`text-[10px] font-bold ${
                            activeCategory === cat.category
                              ? "text-dark/40"
                              : "text-dark-muted/50 dark:text-white/20"
                          }`}
                        >
                          {cat.items.length}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>
          )}

          {/* Mobile Category Pills */}
          {!isSearching && (
            <div className="lg:hidden fixed bottom-20 left-0 right-0 z-30 px-3 sm:px-4">
              <div className="bg-dark/90 backdrop-blur-2xl rounded-2xl p-1.5 flex gap-1 overflow-x-auto scrollbar-hide shadow-2xl shadow-black/30 border border-white/[0.06]">
                {menuData.map((cat) => {
                  const Icon = categoryIcons[cat.category];
                  return (
                    <button
                      key={cat.category}
                      onClick={() => scrollToCategory(cat.category)}
                      className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] sm:text-xs font-[var(--font-heading)] font-bold whitespace-nowrap transition-all cursor-pointer uppercase tracking-wider ${
                        activeCategory === cat.category
                          ? "bg-sip text-dark shadow-lg shadow-sip/20"
                          : "text-white/50 hover:text-white/80"
                      }`}
                    >
                      {Icon && (
                        <Icon
                          size={12}
                          className={
                            activeCategory === cat.category
                              ? "text-dark/60"
                              : "text-white/40"
                          }
                        />
                      )}
                      {cat.category}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {isSearching ? (
              <div>
                <p className="text-xs text-dark-muted dark:text-white/40 mb-5 pt-2 font-medium">
                  {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
                </p>
                {searchResults.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-dark-muted dark:text-white/40 text-sm">
                      Nothing found. Try something else.
                    </p>
                  </div>
                ) : (
                  <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {searchResults.map((item) => (
                      <StaggerItem key={item.id}>
                        <MenuCard item={item} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}
              </div>
            ) : (
              <div className="space-y-10 sm:space-y-12">
                {menuData.map((category) => {
                  const Icon = categoryIcons[category.category];
                  return (
                    <section
                      key={category.category}
                      ref={(el) =>
                        (sectionRefs.current[category.category] = el)
                      }
                      className="scroll-mt-40"
                    >
                      <FadeIn>
                        <div className="flex items-center gap-3 mb-5 sm:mb-6">
                          {Icon && (
                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sip/10 dark:bg-sip/15 flex items-center justify-center">
                              <Icon size={20} className="text-sip-dark dark:text-sip-light" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h2 className="heading-xl text-xl sm:text-2xl dark:text-white">
                              {category.category}
                            </h2>
                            <p className="text-[11px] text-dark-muted dark:text-white/35 font-medium">
                              {category.items.length} items available
                            </p>
                          </div>
                          <div className="w-12 h-px bg-sip/20 hidden sm:block flex-shrink-0" />
                        </div>
                      </FadeIn>
                      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                        {category.items.map((item) => (
                          <StaggerItem key={item.id}>
                            <MenuCard item={item} />
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </section>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Cart */}
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 z-50 lg:bottom-6 lg:left-auto lg:right-6 lg:w-80"
        >
          <Link
            to="/cart"
            className="flex items-center justify-between bg-dark dark:bg-dark-soft hover:bg-dark-soft text-white rounded-2xl pl-5 pr-4 py-4 shadow-2xl shadow-black/30 transition-colors border border-white/[0.06]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sip/20 rounded-xl flex items-center justify-center">
                <ShoppingBag size={17} className="text-sip-light" />
              </div>
              <div>
                <p className="text-sm font-[var(--font-heading)] font-bold">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </p>
                <p className="text-[10px] text-white/40">View your order</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-[var(--font-heading)] font-bold text-sm text-sip-light">Rs.{totalPrice}</span>
              <ChevronRight size={14} className="text-white/35" />
            </div>
          </Link>
        </motion.div>
      )}
    </PageTransition>
  );
}
