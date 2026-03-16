import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Clock, Bell, ShoppingBag, ChevronRight } from "lucide-react";
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
  const [serviceMode, setServiceMode] = useState("dine-in");
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
      {/* Hero — full bleed with gradient overlay */}
      <div className="relative h-[220px] sm:h-[280px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
          alt="SIP Coffee"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
      </div>

      {/* Floating identity card — overlaps the hero */}
      <div className="max-w-3xl mx-auto px-5 -mt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-xl shadow-dark/[0.06] p-6 border border-border"
        >
          <div className="flex items-start gap-4">
            <SipLogo size={56} className="shadow-lg shadow-sip/30" />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-black text-dark tracking-tight leading-tight">
                SIP
              </h1>
              <p className="text-muted text-xs mt-0.5">Coffee & Kitchen</p>
              <div className="flex items-center gap-2 flex-wrap mt-2 text-[11px] text-muted">
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  F-8/3, Islamabad
                </span>
                <span className="text-border">|</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  8 AM – 1 AM
                </span>
              </div>
            </div>
          </div>

          {/* Service mode + table row */}
          <div className="flex items-center gap-3 mt-5">
            <div className="flex bg-bg rounded-full p-0.5 flex-1">
              <button
                onClick={() => setServiceMode("dine-in")}
                className={`flex-1 py-2.5 rounded-full text-xs font-semibold text-center transition-all cursor-pointer ${
                  serviceMode === "dine-in"
                    ? "bg-sip text-white shadow-md shadow-sip/30"
                    : "text-muted"
                }`}
              >
                Dine-in
              </button>
              <button
                onClick={() => setServiceMode("takeaway")}
                className={`flex-1 py-2.5 rounded-full text-xs font-semibold text-center transition-all cursor-pointer ${
                  serviceMode === "takeaway"
                    ? "bg-sip text-white shadow-md shadow-sip/30"
                    : "text-muted"
                }`}
              >
                Take-away
              </button>
            </div>
            <div className="bg-sip-light text-sip rounded-full px-4 py-2.5 text-xs font-bold shrink-0">
              Table #1
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search bar */}
      <div className="max-w-3xl mx-auto px-5 mt-6 mb-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative"
        >
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-sip/20"
          />
        </motion.div>
      </div>

      {/* Category pills — sticky */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-border/60" ref={tabsRef}>
        <div className="max-w-3xl mx-auto px-5">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
            {menuData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => scrollToCategory(cat.category)}
                className={`text-[13px] whitespace-nowrap px-4 py-2 rounded-full transition-all cursor-pointer font-medium ${
                  activeCategory === cat.category
                    ? "bg-sip text-white shadow-sm shadow-sip/20"
                    : "bg-bg text-muted hover:text-dark"
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
                {searchResults.map((item, i) => (
                  <MenuCard key={item.id} item={item} index={i} />
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
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 mb-5"
                >
                  <div className="w-1 h-6 bg-sip rounded-full" />
                  <h2 className="text-[15px] font-black uppercase tracking-wide text-dark">
                    {category.category}
                  </h2>
                  <span className="text-[11px] text-muted font-medium">
                    {category.items.length} items
                  </span>
                </motion.div>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-x-4 sm:gap-y-6 pb-2 sm:pb-0">
                  {category.items.map((item, i) => (
                    <MenuCard key={item.id} item={item} index={i} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Order status bar */}
      <AnimatePresence>
        {activeOrder && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-20 left-4 right-4 z-40 max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl border border-border shadow-xl shadow-dark/10 p-4">
              <div className="flex gap-1.5 mb-3">
                {ORDER_STEPS.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 flex-1 rounded-full"
                    initial={{ backgroundColor: "#EFEFEF" }}
                    animate={{
                      backgroundColor: i <= activeOrder.step ? "#4B7BE5" : "#EFEFEF",
                    }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                ))}
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-dark text-sm">
                    {STATUS_LABELS[activeOrder.step]}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    Order #{activeOrder.id} · Table {activeOrder.table}
                  </p>
                </div>
                <button
                  onClick={dismissOrder}
                  className="text-xs text-sip font-semibold hover:text-sip/80 transition-colors cursor-pointer shrink-0 pt-0.5"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating cart bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-5 left-4 right-4 z-50 max-w-3xl mx-auto"
          >
            <Link
              to="/cart"
              className="flex items-center justify-between bg-sip text-white rounded-2xl px-6 py-4 shadow-xl shadow-sip/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <ShoppingBag size={16} />
                </div>
                <span className="font-semibold text-sm">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">Rs.{totalPrice}/-</span>
                <ChevronRight size={16} />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call waiter FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 20 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-5 right-4 z-40 w-12 h-12 bg-dark text-white rounded-full shadow-xl shadow-dark/20 flex items-center justify-center cursor-pointer"
        style={{ bottom: totalItems > 0 ? "5.5rem" : "1.25rem" }}
      >
        <Bell size={18} />
      </motion.button>
    </div>
  );
}
