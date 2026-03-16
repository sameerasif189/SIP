import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  X,
  Home,
  UtensilsCrossed,
  Info,
  MessageCircle,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import SipLogo from "./SipLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems, totalPrice } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const links = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/menu", label: "Menu", icon: UtensilsCrossed },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: MessageCircle },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-dark/70 backdrop-blur-2xl text-white sticky top-0 z-50 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[68px] sm:h-[76px]">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-3 group">
              <SipLogo size={44} />
              <div>
                <p className="font-[var(--font-heading)] text-[15px] font-black leading-none tracking-wide uppercase">
                  <span className="text-white group-hover:text-sip-light transition-colors">SIP</span>{" "}
                  <span className="text-sip font-bold">COFFEE</span>
                </p>
                <p className="text-[9px] text-white/30 leading-none mt-1 tracking-[0.2em] uppercase font-medium">
                  Specialty · Islamabad
                </p>
              </div>
            </Link>

            {/* Desktop Nav — uppercase links + Order Now button */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                      active
                        ? "text-sip"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-sip rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Order Now button — frosted glass pill */}
              <Link
                to="/menu"
                className="ml-4 glass-btn px-6 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-[0.12em] text-white hover:text-dark hover:bg-sip hover:border-sip/50 transition-all duration-300 hover:shadow-lg hover:shadow-sip/20"
              >
                Order Now
              </Link>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="glass-btn w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl cursor-pointer"
                title={isDark ? "Light mode" : "Dark mode"}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: 90, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={17} className="text-amber-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: -90, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={17} className="text-blue-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="glass-btn relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
              >
                <div className="relative">
                  <ShoppingBag size={17} className="text-sip-light" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-[18px] h-[18px] bg-sip text-dark text-[9px] font-bold flex items-center justify-center rounded-full shadow-lg shadow-sip/30">
                      {totalItems}
                    </span>
                  )}
                </div>
                {totalItems > 0 && (
                  <span className="text-xs font-semibold text-white/70 hidden sm:inline">
                    Rs.{totalPrice}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                className="md:hidden glass-btn w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu — full screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-[68px] z-40 bg-dark/95 backdrop-blur-3xl"
          >
            <div className="flex flex-col items-center justify-center h-full gap-3 -mt-[68px] px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <SipLogo size={56} glow />
              </motion.div>

              {links.map((link, i) => {
                const Icon = link.icon;
                const active = isActive(link.to);
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.07, duration: 0.25 }}
                    className="w-full max-w-xs"
                  >
                    <Link
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                        active
                          ? "glass-white"
                          : "glass hover:bg-white/[0.08]"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          active
                            ? "bg-sip text-dark"
                            : "bg-white/[0.06] text-white/50"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        className={`text-lg font-[var(--font-heading)] font-bold uppercase tracking-wider ${
                          active
                            ? "text-sip"
                            : "text-white/60"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile Order Now */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="w-full max-w-xs mt-3"
              >
                <Link
                  to="/menu"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-sip hover:bg-sip-dark text-dark text-center py-4 rounded-2xl font-[var(--font-heading)] font-bold uppercase tracking-wider text-sm transition-all shadow-xl shadow-sip/20"
                >
                  Order Now
                </Link>
              </motion.div>

              {/* Mobile theme toggle */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-2"
              >
                <button
                  onClick={toggleTheme}
                  className="glass-btn flex items-center gap-3 px-6 py-3 rounded-2xl cursor-pointer"
                >
                  {isDark ? (
                    <Sun size={16} className="text-amber-400" />
                  ) : (
                    <Moon size={16} className="text-blue-300" />
                  )}
                  <span className="text-white/50 text-sm font-medium">
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
