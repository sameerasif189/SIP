import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { menuData } from "../data/menu";
import { useCart } from "../context/CartContext";
import MenuCard from "../components/MenuCard";

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "Breakfast";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, totalPrice } = useCart();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const categories = menuData.map((c) => c.category);

  const isSearching = searchQuery.length > 0;

  const searchResults = isSearching
    ? menuData.flatMap((c) =>
        c.items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  const activeItems = menuData.find(
    (c) => c.category === activeCategory
  )?.items || [];

  // Determine if category uses card or list layout
  const cardCategories = ["Breakfast", "Salads"];
  const useCardLayout = cardCategories.includes(activeCategory);

  return (
    <div className="min-h-screen bg-[#fafafa] relative pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-semibold text-lg">SIP</h1>
          </div>
          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder="Search menu"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:border-gray-300 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      {!isSearching && (
        <div className="sticky top-14 z-40 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`py-3 text-sm whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "border-brand text-brand font-medium"
                      : "border-transparent text-muted hover:text-brand"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Items */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {isSearching ? (
          <>
            <p className="text-sm text-muted mb-4">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
            {searchResults.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted">No items found. Try a different search.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {searchResults.map((item) => (
                  <MenuCard key={item.id} item={item} variant="list" />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="font-[var(--font-display)] text-lg font-bold uppercase tracking-wide mb-5">
              {activeCategory} at SIP.
            </h2>
            {useCardLayout ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {activeItems.map((item) => (
                  <MenuCard key={item.id} item={item} variant="card" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {activeItems.map((item) => (
                  <MenuCard key={item.id} item={item} variant="list" />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Sticky Cart Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-4">
            <Link
              to="/cart"
              className="flex items-center justify-between bg-brand text-white rounded-xl px-5 py-3.5 shadow-lg hover:bg-brand-light transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart size={18} />
                <div>
                  <p className="text-sm font-semibold">
                    View cart ({totalItems})
                  </p>
                  <p className="text-xs text-white/60">
                    Tap to review your order
                  </p>
                </div>
              </div>
              <span className="font-semibold text-sm">Rs.{totalPrice}/-</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
