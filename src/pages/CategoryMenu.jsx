import { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { menuData } from "../data/menu";
import { useCart } from "../context/CartContext";
import MenuCard from "../components/MenuCard";
import SipLogo from "../components/SipLogo";
import eidImg from "../assets/Eid.png";
import banglesImg from "../assets/bangles.png";

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
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={20} className="text-dark" />
          </button>
          <div className="flex-1 text-center">
            <p className="text-[#5C8A4D] text-sm font-bold uppercase tracking-widest">
              Table Tap!
            </p>
          </div>
          <SipLogo size={36} />
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
              <h2 className="text-xl text-gray-900 heading-font normal-case mb-1">
                {category.category}
              </h2>

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

            {/* Bangle Stalls banner */}
            {catIdx === 4 && (
              <div className="my-8 rounded-2xl overflow-hidden bg-[#4A5568]">
                <div className="px-6 pt-6 pb-5">
                  <h3 className="text-white text-[20px] font-bold heading-font leading-snug mb-2">
                    Bangle Stalls Are Coming To SiP
                  </h3>
                  <p className="text-white/60 text-[14px] leading-relaxed mb-4">
                    Beautiful bangle stalls at SiP — this Thursday, 7 PM to 12 AM
                  </p>
                  <button className="bg-[#2D3748] hover:bg-[#1A202C] transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-full cursor-pointer">
                    Learn more
                  </button>
                </div>
                <div className="relative h-[180px]">
                  <img
                    src={banglesImg}
                    alt="Bangle stalls"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#4A5568] via-transparent to-transparent h-[40px]" />
                </div>
              </div>
            )}

            {/* Alaaya Chand Raat banner */}
            {(catIdx === 2 || catIdx === 5) && catIdx < menuData.length - 1 && (
              <div className="my-8 rounded-2xl overflow-hidden bg-[#4A5568]">
                <div className="px-6 pt-6 pb-5">
                  <h3 className="text-white text-[20px] font-bold heading-font leading-snug mb-2">
                    {catIdx === 2 ? "Alaaya Chand Raat Is Coming To SiP" : "Eid Brunch Is Coming To SiP"}
                  </h3>
                  <p className="text-white/60 text-[14px] leading-relaxed mb-4">
                    {catIdx === 2
                      ? "Celebrate Eid with live music, mehndi & our special festive menu — tonight only"
                      : "Join us for a festive brunch this Eid — 11 AM to 3 PM for Rs.2,500/-"}
                  </p>
                  <button className="bg-[#2D3748] hover:bg-[#1A202C] transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-full cursor-pointer">
                    Learn more
                  </button>
                </div>
                <div className="relative h-[180px]">
                  <img
                    src={eidImg}
                    alt="Eid celebration"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#4A5568] via-transparent to-transparent h-[40px]" />
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
