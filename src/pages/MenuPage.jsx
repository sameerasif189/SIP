import { useState } from "react";
import { Search } from "lucide-react";
import { menuData } from "../data/menu";
import MenuCard from "../components/MenuCard";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...menuData.map((c) => c.category)];

  const filteredItems = menuData
    .filter((c) => activeCategory === "All" || c.category === activeCategory)
    .flatMap((c) =>
      c.items
        .filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((item) => ({ ...item, categoryName: c.category }))
    );

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-brand text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-2">
            Explore
          </p>
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold mb-6">
            Our Menu
          </h1>
          {/* Search */}
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-light/40"
            />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent focus:bg-white/15 transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-16 z-40 bg-cream/95 backdrop-blur-md border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-accent text-white shadow-md"
                    : "bg-white text-brand-light hover:bg-cream-dark"
                }`}
              >
                {cat !== "All" &&
                  menuData.find((c) => c.category === cat)?.icon + " "}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-brand-light/50 text-lg">
              No items found. Try a different search.
            </p>
          </div>
        ) : (
          <>
            {activeCategory === "All" ? (
              menuData
                .filter((c) =>
                  c.items.some(
                    (item) =>
                      item.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      item.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                )
                .map((category) => (
                  <div key={category.category} className="mb-10">
                    <h2 className="font-[var(--font-display)] text-2xl font-bold mb-5 flex items-center gap-3">
                      <span className="text-3xl">{category.icon}</span>
                      {category.category}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {category.items
                        .filter(
                          (item) =>
                            item.name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            item.description
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                        )
                        .map((item) => (
                          <MenuCard key={item.id} item={item} />
                        ))}
                    </div>
                  </div>
                ))
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
