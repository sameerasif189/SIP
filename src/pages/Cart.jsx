import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const [tip, setTip] = useState(0);
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
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <button onClick={() => navigate("/menu")} className="cursor-pointer">
            <X size={20} className="text-dark" />
          </button>
          <p className="font-bold text-dark text-lg">Your order</p>
          <div className="w-5" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="text-muted text-sm mb-4">Your order is empty</p>
            <Link
              to="/menu"
              className="text-sip font-semibold text-sm hover:underline"
            >
              Browse menu
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-5 py-4 border-b border-border"
      >
        <button onClick={() => navigate("/menu")} className="cursor-pointer">
          <X size={20} className="text-dark" />
        </button>
        <p className="font-bold text-dark text-lg">Your order</p>
        <div className="w-5" />
      </motion.div>

      <div className="max-w-5xl mx-auto px-5 pt-6">
        {/* Title bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl font-black text-dark">SIP</h1>
            <p className="text-muted text-sm mt-0.5">Table 1 · {totalItems} item{totalItems !== 1 ? "s" : ""}</p>
          </div>
          <div className="bg-sip-light text-sip text-xs font-bold px-3 py-1.5 rounded-full">
            Table #1
          </div>
        </motion.div>

        {/* Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex gap-4 p-3 rounded-2xl bg-bg/50"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-dark text-sm leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-sip text-sm font-bold mt-1">
                    Rs.{item.price * item.quantity}/-
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between shrink-0">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => removeItem(item.id)}
                    className="text-muted hover:text-red-500 transition-colors cursor-pointer p-1"
                  >
                    <Trash2 size={14} />
                  </motion.button>
                  <div className="flex items-center bg-white border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-dark cursor-pointer hover:bg-bg transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-dark">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-dark cursor-pointer hover:bg-bg transition-colors"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add more */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/menu"
            className="inline-flex items-center gap-1 text-sip text-sm font-semibold mt-4 hover:underline"
          >
            <Plus size={14} />
            Add more items
          </Link>
        </motion.div>

        {/* Tip + Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 border border-border rounded-2xl p-5"
        >
          <p className="font-semibold text-dark text-sm mb-3">Add a tip</p>
          <div className="flex gap-2">
            {tipOptions.map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.93 }}
                onClick={() => setTip(opt.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  tip === opt.value
                    ? "bg-sip text-white shadow-sm shadow-sip/20"
                    : "bg-bg text-dark hover:bg-border"
                }`}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>

          <p className="font-semibold text-dark text-sm mt-5 mb-2">
            Order notes
          </p>
          <textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="Allergies, special requests..."
            rows={2}
            className="w-full px-4 py-3 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-sip/20 resize-none"
          />
        </motion.div>

        {/* Totals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 space-y-2.5 text-sm"
        >
          {tip > 0 && (
            <div className="flex justify-between text-muted">
              <span>Tip ({tip}%)</span>
              <span>Rs.{tipAmount}/-</span>
            </div>
          )}
          <div className="flex justify-between text-muted">
            <span>Service fee (1%)</span>
            <span>Rs.{serviceFee}/-</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>GST (5%)</span>
            <span>Rs.{gst}/-</span>
          </div>
          <div className="flex justify-between font-bold text-dark text-lg pt-3 border-t border-border">
            <span>Total</span>
            <span className="text-sip">Rs.{grandTotal}/-</span>
          </div>
        </motion.div>
      </div>

      {/* Checkout button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-md border-t border-border/60"
      >
        <div className="max-w-5xl mx-auto">
          <Link
            to="/checkout"
            state={{ tip, tipAmount, serviceFee, gst, grandTotal, orderNotes }}
            className="block w-full bg-sip text-white text-center py-4 rounded-2xl font-semibold text-[15px] shadow-lg shadow-sip/30 hover:shadow-xl hover:shadow-sip/40 transition-shadow"
          >
            Go to checkout · Rs.{grandTotal}/-
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
