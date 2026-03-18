import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, totalPrice } = useCart();
  const { activeOrder, dismissOrder, ORDER_STEPS } = useOrder();
  const navigate = useNavigate();

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

  // Get first item image from each category for the category grid
  const categoryImages = menuData.reduce((acc, cat) => {
    const imgs = cat.items
      .filter((i) => i.image)
      .slice(0, 2)
      .map((i) => i.image);
    acc[cat.category] = imgs;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero image collage */}
      <div className="relative h-[240px] overflow-hidden">
        <div className="grid grid-cols-3 h-full gap-0.5">
          <img
            src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=400&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </div>

      {/* Centered logo overlapping hero */}
      <div className="flex justify-center -mt-10 relative z-10">
        <SipLogo size={80} />
      </div>

      {/* Welcome text */}
      <div className="text-center px-6 mt-4 mb-6">
        <h1 className="text-2xl text-dark heading-font">Welcome to SiP</h1>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-xs mx-auto subtext-font">
          SiP, in the heart of Islamabad, offers specialty coffee and fresh kitchen dishes in a warm, modern setting.
        </p>
      </div>

      {/* Search bar */}
      <div className="px-5 mb-6 max-w-lg mx-auto">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-bg border-none text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dark/10"
          />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5">
        {isSearching ? (
          /* Search results */
          <div>
            <p className="text-sm text-gray-500 mb-2">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
            </p>
            {searchResults.length === 0 ? (
              <p className="text-gray-500 text-sm py-16 text-center">Nothing found.</p>
            ) : (
              <div>
                {searchResults.map((item, i) => (
                  <MenuCard key={item.id} item={item} index={i} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Category grid */
          <div>
            <h2 className="text-lg tracking-tight mb-4 text-dark heading-font">
              Menu
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {menuData.map((cat) => {
                const imgs = categoryImages[cat.category] || [];
                return (
                  <Link
                    key={cat.category}
                    to={`/category/${encodeURIComponent(cat.category)}`}
                    className="text-left group"
                  >
                    <div className="grid grid-cols-2 gap-0.5 rounded-xl overflow-hidden">
                      {imgs.length >= 2 ? (
                        <>
                          <img
                            src={imgs[0]}
                            alt=""
                            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <img
                            src={imgs[1]}
                            alt=""
                            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </>
                      ) : (
                        <img
                          src={imgs[0]}
                          alt=""
                          className="w-full aspect-[2/1] object-cover col-span-2 group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <p className="text-dark text-sm mt-2 item-name-font">{cat.category}</p>
                  </Link>
                );
              })}
            </div>
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
            className="fixed bottom-24 left-4 right-4 z-40 max-w-lg mx-auto"
          >
            <div className="bg-white rounded-2xl border border-border shadow-xl shadow-dark/10 p-4">
              <div className="flex gap-1.5 mb-3">
                {ORDER_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      i <= activeOrder.step
                        ? i === activeOrder.step && (activeOrder.step === 1 || activeOrder.step === 2)
                          ? "animate-shimmer"
                          : "bg-dark"
                        : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-dark text-sm">
                    {STATUS_LABELS[activeOrder.step]}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Order #{activeOrder.id}
                  </p>
                </div>
                <button
                  onClick={dismissOrder}
                  className="text-xs text-dark font-semibold hover:text-dark/60 transition-colors cursor-pointer shrink-0"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating "View your order" bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-5 left-4 right-4 z-50 max-w-lg mx-auto"
          >
            <Link
              to="/cart"
              className="flex items-center justify-between bg-dark text-white rounded-2xl px-6 py-4 shadow-xl shadow-dark/20"
            >
              <span className="font-semibold text-[15px]">View your order</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/70">Rs.{totalPrice}/-</span>
                <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
