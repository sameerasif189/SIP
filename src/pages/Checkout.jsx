import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone,
  Wallet,
  CheckCircle2,
  User,
  Users,
  Split,
  Minus,
  Plus,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    tip = 0,
    tipAmount = 0,
    serviceFee = 0,
    gst = 0,
    grandTotal = totalPrice,
    orderNotes = "",
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const [splitMode, setSplitMode] = useState("full");
  const [splitCount, setSplitCount] = useState(2);
  const [selectedItems, setSelectedItems] = useState(() => {
    const all = {};
    items.forEach((item) => {
      all[item.id] = true;
    });
    return all;
  });

  if (items.length === 0 && !confirmed) {
    navigate("/cart");
    return null;
  }

  const getYourTotal = () => {
    if (splitMode === "full") return grandTotal;
    if (splitMode === "even") return Math.ceil(grandTotal / splitCount);
    const selectedSubtotal = items
      .filter((item) => selectedItems[item.id])
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (totalPrice === 0) return 0;
    return Math.ceil(grandTotal * (selectedSubtotal / totalPrice));
  };

  const yourTotal = getYourTotal();

  const handlePay = () => {
    if (!paymentMethod) return;
    setProcessing(true);
    setTimeout(() => {
      const order = placeOrder({ items: [...items], grandTotal });
      setOrderNumber(order.id);
      setConfirmed(true);
      setProcessing(false);
      clearCart();
    }, 1500);
  };

  // Success screen
  if (confirmed) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center max-w-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
            className="w-20 h-20 bg-sip-light rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle2 size={40} className="text-sip" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-dark mb-2"
          >
            Order Confirmed!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted text-sm mb-1"
          >
            Your order is being prepared.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-muted text-xs mb-2"
          >
            Table 1 · Order #{orderNumber}
          </motion.p>
          {splitMode !== "full" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted text-xs mb-6"
            >
              You paid Rs.{yourTotal}/-
              {splitMode === "even" && ` (split ${splitCount} ways)`}
              {splitMode === "item" && " (your items)"}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/"
              className="block w-full bg-sip text-white text-center py-4 rounded-2xl font-semibold text-[15px] shadow-lg shadow-sip/30"
            >
              Back to menu
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const paymentOptions = [
    { id: "card", icon: CreditCard, label: "Card", desc: "Visa, Mastercard" },
    { id: "applepay", icon: Wallet, label: "Apple Pay", desc: "Tap to pay" },
    { id: "googlepay", icon: Wallet, label: "Google Pay", desc: "Tap to pay" },
    { id: "cash", icon: Banknote, label: "Cash", desc: "Pay at counter" },
    { id: "jazzcash", icon: Smartphone, label: "JazzCash", desc: "Mobile wallet" },
    { id: "easypaisa", icon: Smartphone, label: "Easypaisa", desc: "Mobile wallet" },
  ];

  const splitOptions = [
    { id: "full", icon: User, label: "I'm paying", desc: "Full bill" },
    { id: "even", icon: Users, label: "Split evenly", desc: "Divide equally" },
    { id: "item", icon: Split, label: "By item", desc: "Pick your items" },
  ];

  const stagger = (i) => ({ delay: 0.05 + i * 0.05 });

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 px-5 py-4 border-b border-border"
      >
        <button
          onClick={() => navigate("/cart")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} className="text-dark" />
        </button>
        <h1 className="text-lg font-bold text-dark">Payment</h1>
      </motion.div>

      <div className="max-w-3xl mx-auto px-5 pt-6">
        {/* Bill Splitting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(0)}
          className="mb-6"
        >
          <p className="font-semibold text-dark text-sm mb-3">Who's paying?</p>
          <div className="grid grid-cols-3 gap-2">
            {splitOptions.map((opt) => (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSplitMode(opt.id)}
                className={`relative p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  splitMode === opt.id
                    ? "border-sip bg-sip-light"
                    : "border-border hover:border-sip/30"
                }`}
              >
                <opt.icon
                  size={18}
                  className={`mx-auto ${
                    splitMode === opt.id ? "text-sip" : "text-muted"
                  }`}
                />
                <p className={`font-semibold text-xs mt-2 ${splitMode === opt.id ? "text-sip" : "text-dark"}`}>
                  {opt.label}
                </p>
                <p className="text-[10px] text-muted mt-0.5">{opt.desc}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Even split */}
        <AnimatePresence>
          {splitMode === "even" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="p-4 border border-border rounded-2xl">
                <p className="text-sm text-muted mb-3">How many people?</p>
                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setSplitCount(Math.max(2, splitCount - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg text-dark cursor-pointer hover:bg-border transition-colors"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <span className="text-3xl font-black text-dark w-10 text-center">
                    {splitCount}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setSplitCount(Math.min(10, splitCount + 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-sip text-white cursor-pointer"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
                <p className="text-center text-xs text-muted mt-3">
                  Rs.{Math.ceil(grandTotal / splitCount)}/- per person
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Per-item */}
        <AnimatePresence>
          {splitMode === "item" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="p-4 border border-border rounded-2xl">
                <p className="text-sm text-muted mb-3">Select your items</p>
                <div className="space-y-3">
                  {items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={!!selectedItems[item.id]}
                        onChange={() =>
                          setSelectedItems((prev) => ({
                            ...prev,
                            [item.id]: !prev[item.id],
                          }))
                        }
                        className="w-5 h-5 rounded accent-[#4B7BE5]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-dark truncate">
                          {item.name}
                          <span className="text-muted font-normal"> x {item.quantity}</span>
                        </p>
                      </div>
                      <span className="text-sm text-sip font-bold shrink-0">
                        Rs.{item.price * item.quantity}/-
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(1)}
          className="mb-6"
        >
          <p className="font-semibold text-dark text-sm mb-3">Order summary</p>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted">
                  {item.name} x {item.quantity}
                </span>
                <span className="text-dark font-medium">
                  Rs.{item.price * item.quantity}/-
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {orderNotes && (
          <div className="mb-6 p-4 bg-sip-light rounded-2xl">
            <p className="text-xs text-sip font-medium mb-1">Order notes</p>
            <p className="text-sm text-dark">{orderNotes}</p>
          </div>
        )}

        {/* Totals */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(2)}
          className="mb-8 space-y-2.5 text-sm"
        >
          <div className="flex justify-between text-muted">
            <span>Subtotal</span>
            <span>Rs.{totalPrice}/-</span>
          </div>
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
          {splitMode !== "full" && (
            <div className="flex justify-between font-bold text-sip text-base pt-1">
              <span>
                {splitMode === "even"
                  ? `Your share (1/${splitCount})`
                  : "Your items"}
              </span>
              <span>Rs.{yourTotal}/-</span>
            </div>
          )}
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(3)}
          className="mb-6"
        >
          <p className="font-semibold text-dark text-sm mb-3">
            How would you like to pay?
          </p>
          <div className="grid grid-cols-3 gap-2">
            {paymentOptions.map((opt) => (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.93 }}
                onClick={() => setPaymentMethod(opt.id)}
                className={`flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  paymentMethod === opt.id
                    ? "border-sip bg-sip-light"
                    : "border-border hover:border-sip/30"
                }`}
              >
                <opt.icon
                  size={20}
                  className={
                    paymentMethod === opt.id ? "text-sip" : "text-muted"
                  }
                />
                <p className={`font-semibold text-xs ${paymentMethod === opt.id ? "text-sip" : "text-dark"}`}>
                  {opt.label}
                </p>
                <p className="text-[10px] text-muted leading-tight">{opt.desc}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Card Details */}
        <AnimatePresence>
          {paymentMethod === "card" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 space-y-3 overflow-hidden"
            >
              <p className="font-semibold text-dark text-sm mb-3">Card details</p>
              <input
                type="text"
                placeholder="Cardholder name"
                className="w-full px-4 py-3.5 rounded-2xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-sip/20"
              />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3.5 rounded-2xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-sip/20"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full px-4 py-3.5 rounded-2xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-sip/20"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full px-4 py-3.5 rounded-2xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-sip/20"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pay button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-md border-t border-border/60"
      >
        <div className="max-w-3xl mx-auto">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handlePay}
            disabled={!paymentMethod || processing}
            className="w-full bg-sip text-white py-4 rounded-2xl font-semibold text-[15px] shadow-lg shadow-sip/30 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-shadow hover:shadow-xl hover:shadow-sip/40"
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              `Pay Rs.${splitMode === "full" ? grandTotal : yourTotal}/-`
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
