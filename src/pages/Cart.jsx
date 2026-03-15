import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useTable } from "../context/TableContext";
import { PageTransition, FadeIn } from "../components/Motion";

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const { tableNumber } = useTable();
  const [tip, setTip] = useState(5);
  const [orderNotes, setOrderNotes] = useState("");

  const tipOptions = [
    { label: "No tip", value: 0 },
    { label: "5%", value: 5 },
    { label: "10%", value: 10 },
    { label: "15%", value: 15 },
  ];

  const tipAmount = Math.round(totalPrice * (tip / 100));
  const serviceFee = Math.round(totalPrice * 0.01);
  const gst = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + tipAmount + serviceFee + gst;

  if (items.length === 0) {
    return (
      <PageTransition className="min-h-screen min-h-[100dvh] bg-warm flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-16 h-16 bg-sip-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={28} className="text-sip" />
            </div>
            <h2 className="font-[var(--font-display)] text-xl font-bold mb-2">
              Nothing here yet
            </h2>
            <p className="text-dark-muted text-sm mb-6">
              Add some delicious items from our menu
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-sip hover:bg-sip-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
            >
              Browse Menu
            </Link>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-warm">
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/menu"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-black/5 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="font-[var(--font-display)] text-xl font-bold">
              Your Order
            </h1>
            <p className="text-xs text-dark-muted">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
              {tableNumber ? ` · Table ${tableNumber}` : ""}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-2">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl border border-black/5 p-3 sm:p-4"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm text-dark leading-tight truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-dark-muted mt-0.5">
                          Rs.{item.price} each
                        </p>
                      </div>
                      <p className="font-bold text-sm text-dark shrink-0">
                        Rs.{item.price * item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center gap-0.5 bg-sip-bg rounded-lg p-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-dark shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold w-7 text-center text-sip-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-md bg-sip text-white shadow-sm hover:bg-sip-dark transition-colors cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-dark-muted hover:text-red-500 p-1 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add More */}
        <Link
          to="/menu"
          className="flex items-center gap-2 mt-3 text-xs text-sip font-semibold hover:text-sip-dark transition-colors"
        >
          <Plus size={13} />
          Add more items
        </Link>

        {/* Tip */}
        <FadeIn>
          <div className="bg-white rounded-2xl border border-black/5 p-4 mt-5">
            <p className="text-xs font-semibold text-dark-muted uppercase tracking-wider mb-3">
              Add a Tip
            </p>
            <div className="flex gap-2">
              {tipOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTip(opt.value)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    tip === opt.value
                      ? "bg-dark text-white"
                      : "bg-warm text-dark-muted hover:bg-sip-bg hover:text-dark"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Notes */}
        <FadeIn delay={0.05}>
          <div className="bg-white rounded-2xl border border-black/5 p-4 mt-3">
            <p className="text-xs font-semibold text-dark-muted uppercase tracking-wider mb-2">
              Special Requests
            </p>
            <textarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Allergies, preferences, or any notes for the kitchen..."
              rows={2}
              className="w-full text-sm bg-warm border border-black/5 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sip/30 resize-none"
            />
          </div>
        </FadeIn>

        {/* Totals */}
        <FadeIn delay={0.1}>
          <div className="bg-dark rounded-2xl p-4 sm:p-5 mt-5 text-white">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/50">
                <span>Subtotal</span>
                <span>Rs.{totalPrice}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>Service fee (1%)</span>
                <span>Rs.{serviceFee}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>GST (5%)</span>
                <span>Rs.{gst}</span>
              </div>
              {tip > 0 && (
                <div className="flex justify-between text-white/50">
                  <span>Tip ({tip}%)</span>
                  <span>Rs.{tipAmount}</span>
                </div>
              )}
              <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-sip-light">Rs.{grandTotal}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              state={{ tip, tipAmount, serviceFee, gst, grandTotal, orderNotes }}
              className="block w-full mt-5 bg-sip hover:bg-sip-dark text-white text-center py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              Proceed to Payment · Rs.{grandTotal}
            </Link>
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  );
}
