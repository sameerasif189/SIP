import { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { menuData } from "../data/menu";
import { useCart } from "../context/CartContext";
import MenuCard from "../components/MenuCard";

export default function CategoryMenu() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { totalItems, totalPrice } = useCart();
  const [activeCategory, setActiveCategory] = useState(name);
  const sectionRefs = useRef({});
  const isScrollingRef = useRef(false);

  const currentIndex = menuData.findIndex(
    (c) => c.category.toLowerCase() === name?.toLowerCase()
  );

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
        {menuData.map((category) => (
          <section
            key={category.category}
            ref={(el) => (sectionRefs.current[category.category] = el)}
            data-category={category.category}
            className="scroll-mt-28 pt-6"
          >
            <h2 className="text-xl text-gray-900 heading-font normal-case mb-1">
              {category.category}
            </h2>

            <div>
              {category.items.map((item, i) => (
                <MenuCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </section>
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
