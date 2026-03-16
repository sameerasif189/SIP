import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import SipLogo from "./SipLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems, totalPrice } = useCart();
  const location = useLocation();

  const links = [
    { to: "/home", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-dark text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/home" className="flex items-center gap-3">
              <SipLogo size={38} />
              <div>
                <p className="text-sm font-bold leading-none tracking-wide">SiP</p>
                <p className="text-[10px] text-white/40 leading-none mt-0.5 tracking-widest">
                  Specialty Coffee
                </p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                    isActive(link.to)
                      ? "bg-sip/20 text-sip-light font-medium"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/cart"
                className="relative flex items-center gap-2 bg-sip/15 hover:bg-sip/25 px-3 py-1.5 rounded-full transition-colors"
              >
                <ShoppingBag size={16} className="text-sip-light" />
                {totalItems > 0 && (
                  <>
                    <span className="text-xs font-semibold text-sip-light">
                      {totalItems}
                    </span>
                    <span className="text-[10px] text-white/40 hidden sm:inline">
                      · Rs.{totalPrice}
                    </span>
                  </>
                )}
              </Link>
              <button
                className="md:hidden p-2 text-white/60 hover:text-white cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-14 z-40 bg-dark/95 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 -mt-14">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-[var(--font-display)] py-3 transition-colors block ${
                      isActive(link.to) ? "text-sip" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
