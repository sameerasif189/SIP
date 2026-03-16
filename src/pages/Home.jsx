import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Star, MapPin, Clock, Bell, ShoppingBag } from "lucide-react";
import { menuData } from "../data/menu";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import MenuCard from "../components/MenuCard";
import SipLogo from "../components/SipLogo";

const STATUS_LABELS = [
  "Your order has been placed",
  "Your order is being prepared",
  "Your order is ready to serve",
  "Your order has been served",
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].category);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, totalPrice } = useCart();
  const { activeOrder, dismissOrder, ORDER_STEPS } = useOrder();
  const sectionRefs = useRef({});
  const tabsRef = useRef(null);

  const scrollToCategory = (cat) => {
    setActiveCategory(cat);
    sectionRefs.current[cat]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Track scroll to update active category
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.dataset.category);
          }
        });
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero banner */}
      <div className="relative h-[200px] sm:h-[260px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
          alt="SIP Coffee"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo overlapping hero */}
      <div className="max-w-3xl mx-auto px-5 relative">
        <div className="flex justify-center -mt-10 mb-4">
          <SipLogo size={80} className="border-4 border-white" />
        </div>

        {/* Info */}
        <div className="text-center mb-6">
          <p className="text-[11px] text-muted uppercase tracking-[0.2em] font-medium mb-1">
            Table Tap
          </p>
          <h1 className="text-3xl font-black text-dark tracking-tight">SIP</h1>
          <div className="flex items-center justify-center gap-1.5 flex-wrap mt-3 text-[13px] text-muted">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span>4.8 · 2,729+ guests</span>
            <span className="text-border">·</span>
            <MapPin size={13} />
            <span>F-8/3, Islamabad</span>
            <span className="text-border">·</span>
            <Clock size={13} />
            <span>8 AM - 1 AM</span>
          </div>
        </div>

        {/* Service toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-bg rounded-full p-1">
            <button className="px-5 py-2 rounded-full bg-white text-dark text-sm font-semibold shadow-sm cursor-pointer">
              Table service
            </button>
            <button className="px-5 py-2 rounded-full text-muted text-sm font-medium cursor-pointer">
              Take-away
            </button>
          </div>
        </div>

        {/* Table + service time */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="border border-border rounded-xl py-4 text-center">
            <p className="text-lg font-bold text-dark">#1</p>
            <p className="text-xs text-muted mt-0.5">Current table</p>
          </div>
          <div className="border border-border rounded-xl py-4 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Clock size={14} className="text-muted" />
              <p className="text-lg font-bold text-dark">15 - 20 min</p>
            </div>
            <p className="text-xs text-muted mt-0.5">Average service time</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto px-5 mb-2">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search menu"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
          />
        </div>
      </div>

      {/* Category tabs — sticky */}
      <div className="sticky top-0 z-30 bg-white border-b border-border" ref={tabsRef}>
        <div className="max-w-3xl mx-auto px-5">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide py-3">
            {menuData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => scrollToCategory(cat.category)}
                className={`text-sm whitespace-nowrap pb-1 border-b-2 transition-colors cursor-pointer font-medium ${
                  activeCategory === cat.category
                    ? "border-dark text-dark"
                    : "border-transparent text-muted hover:text-dark"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu sections */}
      <div className="max-w-3xl mx-auto px-5 pt-6">
        {isSearching ? (
          <div>
            <p className="text-sm text-muted mb-4">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
            {searchResults.length === 0 ? (
              <p className="text-muted text-sm py-16 text-center">Nothing found.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
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
                ref={(el) => (sectionRefs.current[category.category] = el)}
                data-category={category.category}
                className="scroll-mt-14"
              >
                <h2 className="text-[15px] font-black uppercase tracking-wide text-dark mb-5">
                  {category.category} at SIP.
                </h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-x-4 sm:gap-y-6 pb-2 sm:pb-0">
                  {category.items.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Order status bar */}
      {activeOrder && (
        <div className="fixed bottom-20 left-4 right-4 z-40 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-border shadow-xl shadow-dark/10 p-4">
            {/* Progress segments */}
            <div className="flex gap-1.5 mb-3">
              {ORDER_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i <= activeOrder.step ? "bg-dark" : "bg-border"
                  }`}
                />
              ))}
            </div>
            {/* Status text + dismiss */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-dark text-sm">
                  {STATUS_LABELS[activeOrder.step]}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  Order #{activeOrder.id} will be served to Table {activeOrder.table}.
                </p>
              </div>
              <button
                onClick={dismissOrder}
                className="text-xs text-muted font-medium hover:text-dark transition-colors cursor-pointer shrink-0 pt-0.5"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating cart bar */}
      {totalItems > 0 && !activeOrder && (
        <div className="fixed bottom-5 left-4 right-4 z-50 max-w-3xl mx-auto">
          <Link
            to="/cart"
            className="flex items-center justify-between bg-dark text-white rounded-full px-6 py-4 shadow-xl shadow-dark/20"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={18} />
              <span className="font-semibold text-sm">
                View order · {totalItems} item{totalItems !== 1 ? "s" : ""}
              </span>
            </div>
            <span className="font-bold text-sm">Rs.{totalPrice}/-</span>
          </Link>
        </div>
      )}

      {/* Cart bar when order is active (smaller) */}
      {totalItems > 0 && activeOrder && (
        <div className="fixed bottom-5 left-4 right-4 z-50 max-w-3xl mx-auto">
          <Link
            to="/cart"
            className="flex items-center justify-between bg-dark text-white rounded-full px-6 py-4 shadow-xl shadow-dark/20"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={18} />
              <span className="font-semibold text-sm">
                View order · {totalItems} item{totalItems !== 1 ? "s" : ""}
              </span>
            </div>
            <span className="font-bold text-sm">Rs.{totalPrice}/-</span>
          </Link>
        </div>
      )}

      {/* Call waiter FAB */}
      {!activeOrder && (
        <button className="fixed bottom-5 right-4 z-40 flex items-center gap-2 bg-dark text-white px-5 py-3 rounded-full shadow-xl shadow-dark/20 text-sm font-semibold cursor-pointer hover:bg-dark/90 transition-colors">
          <Bell size={16} />
          Call waiter
        </button>
      )}
    </div>
  );
}
