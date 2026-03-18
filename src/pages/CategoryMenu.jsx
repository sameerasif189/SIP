import { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { menuData } from "../data/menu";
import { useCart } from "../context/CartContext";
import MenuCard from "../components/MenuCard";
import SipLogo from "../components/SipLogo";

export default function CategoryMenu() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { totalItems, totalPrice } = useCart();
  const [activeCategory, setActiveCategory] = useState(name);
  const [activeSubcategories, setActiveSubcategories] = useState({});
  const sectionRefs = useRef({});
  const isScrollingRef = useRef(false);

  const toggleSubcategory = (category, sub) => {
    setActiveSubcategories((prev) => ({
      ...prev,
      [category]: prev[category] === sub ? null : sub,
    }));
  };

  const currentIndex = menuData.findIndex(
    (c) => c.category.toLowerCase() === name?.toLowerCase()
  );

  // Scroll to the correct category on mount
  useEffect(() => {
    if (name && sectionRefs.current[name]) {
      // Small delay so DOM is laid out
      setTimeout(() => {
        sectionRefs.current[name]?.scrollIntoView({ behavior: "instant", block: "start" });
      }, 50);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (name) setActiveCategory(name);
  }, [name]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.dataset.category);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (cat) => {
    isScrollingRef.current = true;
    setActiveCategory(cat);
    sectionRefs.current[cat]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    // Re-enable observer after scroll settles
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  if (currentIndex === -1) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Category not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={20} className="text-dark" />
          </button>
          <h1 className="flex-1 text-center text-dark text-[17px] heading-font normal-case">
            {activeCategory || menuData[currentIndex].category}
          </h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>

        {/* Category tabs */}
        <div className="max-w-lg mx-auto px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {menuData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => scrollToCategory(cat.category)}
                className={`text-xs whitespace-nowrap px-3 py-1.5 rounded-full transition-all cursor-pointer font-semibold ${
                  activeCategory?.toLowerCase() === cat.category.toLowerCase()
                    ? "bg-dark text-white"
                    : "text-muted hover:text-dark"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="max-w-lg mx-auto px-5 pt-2">
        {menuData.map((category, catIdx) => (
          <div key={category.category}>
            <section
              ref={(el) => (sectionRefs.current[category.category] = el)}
              data-category={category.category}
              className="scroll-mt-28 pt-6"
            >
              {/* Logo + Category heading */}
              <div className="flex items-center gap-2.5 mb-1">
                <SipLogo size={32} />
                <h2 className="text-xl text-gray-900 heading-font normal-case">
                  {category.category}
                </h2>
              </div>

              {/* Subcategory filter pills */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div className="flex gap-2 mt-2 mb-3 overflow-x-auto scrollbar-hide">
                  <button
                    onClick={() => setActiveSubcategories((prev) => ({ ...prev, [category.category]: null }))}
                    className={`text-xs whitespace-nowrap px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium border ${
                      !activeSubcategories[category.category]
                        ? "bg-dark text-white border-dark"
                        : "text-muted border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    All
                  </button>
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => toggleSubcategory(category.category, sub)}
                      className={`text-xs whitespace-nowrap px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium border ${
                        activeSubcategories[category.category] === sub
                          ? "bg-dark text-white border-dark"
                          : "text-muted border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}

              <div>
                {category.items
                  .filter((item) =>
                    !activeSubcategories[category.category] || item.subcategory === activeSubcategories[category.category]
                  )
                  .map((item, i) => (
                    <MenuCard key={item.id} item={item} index={i} />
                  ))}
              </div>
            </section>

            {/* Event banner after every 3rd category */}
            {(catIdx === 2 || catIdx === 5) && catIdx < menuData.length - 1 && (
              <div className="my-6 rounded-2xl overflow-hidden relative">
                <img
                  src={catIdx === 2
                    ? "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                    : "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
                  }
                  alt="Event"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-0.5">
                    {catIdx === 2 ? "This Weekend" : "Every Sunday"}
                  </p>
                  <h3 className="text-white text-base font-bold heading-font leading-snug">
                    {catIdx === 2 ? "Live Jazz Night at SiP" : "Brunch Specials at SiP"}
                  </h3>
                  <p className="text-white/60 text-xs mt-0.5">
                    {catIdx === 2 ? "Friday 8 PM — Enjoy live music with your dinner" : "11 AM – 3 PM — Unlimited brunch for Rs.2,500/-"}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

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
