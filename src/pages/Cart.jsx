import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, ArrowLeft, Trash2, Armchair } from "lucide-react";
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
      <PageTransition className="min-h-screen min-h-[100dvh] bg-warm dark:bg-dark flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-18 h-18 bg-sip-bg dark:bg-sip/10 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ width: 72, height: 72 }}>
              <ShoppingBag size={30} className="text-sip" />
            </div>
            <h2 className="font-[var(--font-display)] text-xl font-bold mb-2 dark:text-white">
              Nothing here yet
            </h2>
            <p className="text-dark-muted dark:text-white/40 text-sm mb-6">
              Add some delicious items from our menu
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-sip hover:bg-sip-dark text-dark px-6 py-3 rounded-2xl text-sm font-bold transition-colors shadow-lg shadow-sip/15"
            >
              Browse Menu
            </Link>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-warm dark:bg-dark">
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/menu"
            className="w-10 h-10 flex items-center justify-center rounded-xl glass-card hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={16} className="dark:text-white" />
          </Link>
          <div>
            <h1 className="font-[var(--font-display)] text-xl font-bold dark:text-white">
              Your Order
            </h1>
            <p className="text-xs text-dark-muted dark:text-white/40 flex items-center gap-1.5">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
              {tableNumber && (
                <>
                  <span className="text-dark-muted/30 dark:text-white/15">·</span>
                  <Armchair size={11} className="text-sip-dark dark:text-sip" />
                  Table {tableNumber}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-2.5">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25 }}
                className="glass-card rounded-2xl p-3.5 sm:p-4"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm text-dark dark:text-white leading-tight truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-dark-muted dark:text-white/40 mt-0.5">
                          Rs.{item.price} each
                        </p>
                      </div>
                      <p className="font-bold text-sm text-dark dark:text-sip-light shrink-0">
                        Rs.{item.price * item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-0.5 bg-sip/8 dark:bg-sip/15 rounded-lg p-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-white dark:bg-dark text-dark dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-dark-soft transition-colors cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold w-8 text-center text-sip-dark dark:text-sip-light">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-sip text-dark shadow-sm hover:bg-sip-dark transition-colors cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-dark-muted dark:text-white/30 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
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
          className="flex items-center gap-2 mt-3 text-xs text-sip-dark dark:text-sip font-semibold hover:text-sip transition-colors"
        >
          <Plus size={13} />
          Add more items
        </Link>

        {/* Tip */}
        <FadeIn>
          <div className="glass-card rounded-2xl p-4 mt-5">
            <p className="text-xs font-semibold text-dark-muted dark:text-white/35 uppercase tracking-wider mb-3">
              Add a Tip
            </p>
            <div className="flex gap-2">
              {tipOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTip(opt.value)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    tip === opt.value
                      ? "bg-dark dark:bg-sip text-white dark:text-dark shadow-md"
                      : "bg-warm dark:bg-white/5 text-dark-muted dark:text-white/40 hover:bg-sip-bg dark:hover:bg-white/10 hover:text-dark dark:hover:text-white"
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
          <div className="glass-card rounded-2xl p-4 mt-3">
            <p className="text-xs font-semibold text-dark-muted dark:text-white/35 uppercase tracking-wider mb-2">
              Special Requests
            </p>
            <textarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Allergies, preferences, or any notes for the kitchen..."
              rows={2}
              className="w-full text-sm bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 rounded-xl p-3 dark:text-white dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sip/30 resize-none"
            />
          </div>
        </FadeIn>

        {/* Totals */}
        <FadeIn delay={0.1}>
          <div className="bg-dark dark:bg-dark-soft rounded-2xl p-5 mt-5 text-white border border-white/5">
            <div className="space-y-2.5 text-sm">
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
              className="block w-full mt-5 bg-sip hover:bg-sip-dark text-dark text-center py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-sip/20"
            >
              Proceed to Payment · Rs.{grandTotal}
            </Link>
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  );
}
