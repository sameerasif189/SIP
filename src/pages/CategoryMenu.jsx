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
  const sectionRefs = useRef({});
  const isScrollingRef = useRef(false);

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

              <div>
                {category.subcategories ? (
                  category.subcategories.map((sub) => {
                    const subItems = category.items.filter((item) => item.subcategory === sub);
                    if (subItems.length === 0) return null;
                    return (
                      <div key={sub} className="mt-4 first:mt-0">
                        <p className="text-xs text-dark font-bold uppercase tracking-widest mb-3 mt-2 border-b border-gray-200 pb-2">{sub}</p>
                        {subItems.map((item, i) => (
                          <MenuCard key={item.id} item={item} index={i} />
                        ))}
                      </div>
                    );
                  })
                ) : (
                  category.items.map((item, i) => (
                    <MenuCard key={item.id} item={item} index={i} />
                  ))
                )}
              </div>
            </section>

            {/* Bangle Stalls banner */}
            {catIdx === 4 && (
              <div className="my-8 rounded-2xl overflow-hidden bg-[#1C3557]">
                <div className="flex min-h-[300px]">
                  {/* Text left */}
                  <div className="flex-1 p-7 flex flex-col justify-center">
                    <p className="text-[#7EB8F7] text-[11px] font-semibold uppercase tracking-widest mb-2">
                      Upcoming Event
                    </p>
                    <h3 className="text-white text-[22px] font-bold heading-font leading-tight mb-2">
                      Bangle Stalls Are Coming To SiP
                    </h3>
                    <p className="text-white/55 text-[15px] leading-relaxed mb-5">
                      Beautiful bangle stalls at SiP — this Thursday, 7 PM to 12 AM
                    </p>
                    <button className="bg-white/15 hover:bg-white/25 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-full cursor-pointer self-start">
                      Learn more
                    </button>
                  </div>
                  {/* Image right — zoomed & cropped to show only bangles */}
                  <div className="w-[45%] relative overflow-hidden">
                    <img
                      src={banglesImg}
                      alt="Bangle stalls"
                      className="absolute inset-0 w-full h-full object-cover object-[25%_90%] scale-[5]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1C3557] via-[#1C3557]/40 to-transparent" />
                  </div>
                </div>
              </div>
            )}

            {/* Alaaya Chand Raat banner */}
            {(catIdx === 2 || catIdx === 5) && catIdx < menuData.length - 1 && (
              <div className="my-8 rounded-2xl overflow-hidden bg-[#1C3557]">
                <div className="flex min-h-[220px]">
                  {/* Text left */}
                  <div className="flex-1 p-6 flex flex-col justify-center relative">
                    {/* SVG Eid decorations */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <svg className="absolute top-3 left-4 opacity-30" width="20" height="20" viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="white"/></svg>
                      <svg className="absolute bottom-4 left-8 opacity-20" width="14" height="14" viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="white"/></svg>
                    </div>
                    <div className="relative z-10">
                      <p className="text-[#7EB8F7] text-[11px] font-semibold uppercase tracking-widest mb-2">
                        {catIdx === 2 ? "Chand Raat Special" : "Eid Celebration"}
                      </p>
                      <h3 className="text-white text-[20px] font-bold heading-font leading-tight mb-1.5">
                        {catIdx === 2 ? "Alaaya Chand Raat Is Coming To SiP" : "Eid Brunch Is Coming To SiP"}
                      </h3>
                      <p className="text-white/55 text-sm leading-relaxed mb-4">
                        {catIdx === 2
                          ? "Celebrate Eid with live music, mehndi & our special festive menu — tonight only"
                          : "Join us for a festive brunch this Eid — 11 AM to 3 PM for Rs.2,500/-"}
                      </p>
                      <button className="bg-white/15 hover:bg-white/25 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-full cursor-pointer">
                        Learn more
                      </button>
                    </div>
                  </div>
                  {/* Image right */}
                  <div className="w-[40%] relative overflow-hidden">
                    <img
                      src={eidImg}
                      alt="Eid Mubarak"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1C3557] via-[#1C3557]/40 to-transparent" />
                  </div>
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
