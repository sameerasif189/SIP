import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-olive/10 rounded-lg flex items-center justify-center">
              <span className="font-[var(--font-display)] text-lg font-bold text-olive">
                SiP
              </span>
            </div>
            <span className="font-semibold text-brand text-sm hidden sm:block">
              SIP
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors duration-200 ${
                  isActive(link.to)
                    ? "text-brand font-medium"
                    : "text-muted hover:text-brand"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative p-2 text-brand-light hover:text-brand transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand text-white text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-brand-light"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-3 text-sm transition-colors ${
                isActive(link.to)
                  ? "text-brand font-medium bg-gray-50"
                  : "text-muted hover:text-brand hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
