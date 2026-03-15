import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ShoppingBag, X, ChevronRight } from "lucide-react";
import { menuData } from "../data/menu";
import { useCart } from "../context/CartContext";
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
    <div className="min-h-screen bg-warm relative">
      {/* Search Header */}
      <div className="bg-white border-b border-black/5 sticky top-14 sm:top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-warm border border-black/5 text-sm focus:outline-none focus:ring-2 focus:ring-sip/30 focus:border-sip/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark cursor-pointer"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex gap-6 pt-4 pb-20">
          {/* Sidebar Categories — desktop */}
          {!isSearching && (
            <aside className="hidden lg:block w-52 shrink-0">
              <div className="sticky top-36">
                <p className="text-[10px] font-bold text-dark-muted uppercase tracking-[0.15em] mb-3 px-2">
                  Categories
                </p>
                <nav className="space-y-0.5">
                  {menuData.map((cat) => (
                    <button
                      key={cat.category}
                      onClick={() => scrollToCategory(cat.category)}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                        activeCategory === cat.category
                          ? "bg-sip text-white font-semibold shadow-sm"
                          : "text-dark-muted hover:bg-sip-bg hover:text-dark"
                      }`}
                    >
                      <span className="text-base">
                        {categoryEmojis[cat.category]}
                      </span>
                      <span className="flex-1">{cat.category}</span>
                      <span
                        className={`text-[10px] ${
                          activeCategory === cat.category
                            ? "text-white/60"
                            : "text-dark-muted/50"
                        }`}
                      >
                        {cat.items.length}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Mobile Category Pills */}
          {!isSearching && (
            <div className="lg:hidden fixed bottom-20 left-0 right-0 z-30 px-4">
              <div className="bg-dark/90 backdrop-blur-lg rounded-2xl p-1.5 flex gap-1 overflow-x-auto scrollbar-hide shadow-xl">
                {menuData.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => scrollToCategory(cat.category)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat.category
                        ? "bg-sip text-white"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    <span>{categoryEmojis[cat.category]}</span>
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {isSearching ? (
              <div>
                <p className="text-xs text-dark-muted mb-4 pt-2">
                  {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
                </p>
                {searchResults.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-dark-muted text-sm">
                      Nothing found. Try something else.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {searchResults.map((item) => (
                      <MenuCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-10">
                {menuData.map((category) => (
                  <section
                    key={category.category}
                    ref={(el) =>
                      (sectionRefs.current[category.category] = el)
                    }
                    className="scroll-mt-32"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">
                        {categoryEmojis[category.category]}
                      </span>
                      <h2 className="font-[var(--font-display)] text-lg sm:text-xl font-bold uppercase tracking-wide">
                        {category.category}
                      </h2>
                      <span className="text-[10px] text-dark-muted bg-black/5 px-2 py-0.5 rounded-full">
                        {category.items.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {category.items.map((item) => (
                        <MenuCard key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Cart */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50 lg:bottom-6 lg:left-auto lg:right-6 lg:w-80">
          <Link
            to="/cart"
            className="flex items-center justify-between bg-sip hover:bg-sip-dark text-white rounded-2xl pl-5 pr-4 py-3.5 shadow-xl shadow-sip/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <ShoppingBag size={15} />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </p>
                <p className="text-[10px] text-white/60">View your order</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm">Rs.{totalPrice}</span>
              <ChevronRight size={14} className="text-white/60" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
