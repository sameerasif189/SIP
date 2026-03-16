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
      <nav className="bg-dark/80 dark:bg-dark/90 backdrop-blur-2xl text-white sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-3 group">
              <SipLogo size={42} />
              <div>
                <p className="text-base font-bold leading-none tracking-wide group-hover:text-sip-light transition-colors">
                  SiP
                </p>
                <p className="text-[10px] text-white/35 leading-none mt-1 tracking-[0.15em] uppercase">
                  Specialty Coffee
                </p>
              </div>
            </Link>

            {/* Desktop Nav — glassmorphism pill bar */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-1 bg-white/[0.06] backdrop-blur-xl rounded-2xl p-1.5 border border-white/[0.08] shadow-lg shadow-black/10">
                {links.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        active
                          ? "text-dark"
                          : "text-white/55 hover:text-white/90"
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute inset-0 bg-sip rounded-xl shadow-lg shadow-sip/25"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon size={15} strokeWidth={active ? 2.5 : 2} />
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Theme toggle — glassmorphism pill */}
              <button
                onClick={toggleTheme}
                className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.12] transition-all cursor-pointer group"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
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

              {/* Cart — glassmorphism */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.12] px-4 py-2.5 rounded-xl transition-all"
              >
                <div className="relative">
                  <ShoppingBag size={17} className="text-sip-light" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-sip text-dark text-[9px] font-bold flex items-center justify-center rounded-full">
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
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.12] transition-all cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu — full screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-16 z-40 bg-dark/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center justify-center h-full gap-3 -mt-16 px-8">
              {/* Decorative sparkle */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <Sparkles size={20} className="text-sip/40" />
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
                          ? "bg-sip/15 border border-sip/20"
                          : "bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08]"
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
                        className={`text-lg font-[var(--font-display)] ${
                          active
                            ? "text-sip-light font-semibold"
                            : "text-white/60"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile theme toggle */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-4"
              >
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.06] px-6 py-3 rounded-2xl cursor-pointer hover:bg-white/[0.08] transition-all"
                >
                  {isDark ? (
                    <Sun size={16} className="text-amber-400" />
                  ) : (
                    <Moon size={16} className="text-blue-300" />
                  )}
                  <span className="text-white/50 text-sm">
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
