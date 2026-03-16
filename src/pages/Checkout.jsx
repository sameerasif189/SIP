import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  Tag,
  Shield,
  Coffee,
  User,
  Users,
  SplitSquareHorizontal,
  Minus,
  Plus,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useTable } from "../context/TableContext";
import { PageTransition, FadeIn } from "../components/Motion";
import SipLogo from "../components/SipLogo";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { tableNumber } = useTable();
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
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [showPromo, setShowPromo] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [splitMode, setSplitMode] = useState("individual");
  const [splitCount, setSplitCount] = useState(2);
  const [itemAssignments, setItemAssignments] = useState(() => {
    const assignments = {};
    items.forEach((item) => {
      assignments[item.id] = "You";
    });
    return assignments;
  });
  const [people] = useState(["You", "Person 2", "Person 3", "Person 4", "Person 5"]);

  const discount = promoApplied ? Math.round(grandTotal * 0.1) : 0;
  const finalTotal = grandTotal - discount;

  const getYourShare = () => {
    if (splitMode === "individual") return finalTotal;
    if (splitMode === "even") return Math.ceil(finalTotal / splitCount);
    const yourItems = items.filter((item) => itemAssignments[item.id] === "You");
    const yourSubtotal = yourItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (totalPrice === 0) return 0;
    const ratio = yourSubtotal / totalPrice;
    return Math.ceil(finalTotal * ratio);
  };

  const yourShare = getYourShare();

  if (items.length === 0 && !confirmed) {
    navigate("/cart");
    return null;
  }

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SIP10") {
      setPromoApplied(true);
      setPromoError("");
      setShowPromo(false);
    } else {
      setPromoError("Invalid promo code. Try SIP10");
      setPromoApplied(false);
    }
  };

  const handlePay = () => {
    if (!paymentMethod) return;
    setProcessing(true);
    setTimeout(() => {
      setConfirmed(true);
      setProcessing(false);
      clearCart();
    }, 1500);
  };

  // Success screen
  if (confirmed) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-dark flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-sip/20 rounded-3xl flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={44} className="text-sip" />
          </motion.div>
          <h2 className="font-[var(--font-display)] text-3xl font-bold text-white mb-2">
            Order Confirmed!
          </h2>
          <p className="text-white/50 text-sm mb-1">
            Your order is being prepared.
          </p>
          <div className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 mt-3 mb-8">
            <Coffee size={14} className="text-sip" />
            <span className="text-white/70 text-sm">
              Table {tableNumber || "—"} · #{Math.floor(1000 + Math.random() * 9000)}
            </span>
          </div>
          {splitMode !== "individual" && (
            <p className="text-white/40 text-xs mb-6">
              You paid Rs.{yourShare}
              {splitMode === "even" && ` (split ${splitCount} ways)`}
              {splitMode === "per-item" && " (your items only)"}
            </p>
          )}
          <div className="flex flex-col gap-3">
            <Link
              to="/menu"
              className="bg-sip hover:bg-sip-dark text-dark px-8 py-3.5 rounded-2xl font-bold text-sm transition-colors shadow-lg shadow-sip/20"
            >
              Order More
            </Link>
            <Link
              to="/"
              className="text-white/40 hover:text-white/60 text-sm transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const paymentOptions = [
    { id: "card", icon: CreditCard, label: "Card Payment", desc: "Visa, Mastercard, UnionPay" },
    { id: "cash", icon: Banknote, label: "Cash", desc: "Pay at the counter" },
    { id: "jazzcash", icon: Smartphone, label: "JazzCash", desc: "Mobile wallet" },
    { id: "easypaisa", icon: Smartphone, label: "Easypaisa", desc: "Mobile wallet" },
  ];

  const splitOptions = [
    { id: "individual", icon: User, label: "I'm paying", desc: "Full bill, one person" },
    { id: "even", icon: Users, label: "Split evenly", desc: "Divide equally" },
    { id: "per-item", icon: SplitSquareHorizontal, label: "Per item", desc: "Each pays their own" },
  ];

  return (
    <PageTransition className="min-h-screen bg-warm dark:bg-dark">
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-7">
          <Link
            to="/cart"
            className="w-10 h-10 flex items-center justify-center rounded-xl glass-card hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={16} className="dark:text-white" />
          </Link>
          <div>
            <h1 className="font-[var(--font-display)] text-xl font-bold dark:text-white">
              Payment
            </h1>
            <p className="text-xs text-dark-muted dark:text-white/40">
              {tableNumber ? `Table ${tableNumber} · ` : ""}Secure checkout
            </p>
          </div>
        </div>

        {/* Bill Split */}
        <FadeIn>
          <div className="mb-4">
            <p className="text-xs font-semibold text-dark-muted dark:text-white/35 uppercase tracking-wider mb-3">
              Who's paying?
            </p>
            <div className="grid grid-cols-3 gap-2">
              {splitOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSplitMode(opt.id)}
                  className={`relative glass-card rounded-2xl border-2 p-3 sm:p-4 text-center transition-all cursor-pointer ${
                    splitMode === opt.id
                      ? "!border-sip !bg-sip-bg dark:!bg-sip/10"
                      : "!border-transparent hover:!border-black/5 dark:hover:!border-white/10"
                  }`}
                >
                  {splitMode === opt.id && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-sip rounded-full flex items-center justify-center">
                      <CheckCircle2 size={10} className="text-dark" />
                    </div>
                  )}
                  <opt.icon
                    size={18}
                    className={`mx-auto ${
                      splitMode === opt.id ? "text-sip-dark dark:text-sip" : "text-dark-muted dark:text-white/40"
                    }`}
                  />
                  <p className="font-semibold text-[11px] sm:text-xs mt-2 dark:text-white">{opt.label}</p>
                  <p className="text-[9px] sm:text-[10px] text-dark-muted dark:text-white/30 mt-0.5 hidden sm:block">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Even Split */}
        {splitMode === "even" && (
          <FadeIn>
            <div className="glass-card rounded-2xl p-4 mb-4">
              <p className="text-xs font-semibold text-dark-muted dark:text-white/35 uppercase tracking-wider mb-3">
                How many people?
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setSplitCount(Math.max(2, splitCount - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-warm dark:bg-white/5 text-dark dark:text-white hover:bg-sip-bg dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Minus size={16} />
                </button>
                <span className="text-2xl font-bold text-dark dark:text-white w-12 text-center">
                  {splitCount}
                </span>
                <button
                  onClick={() => setSplitCount(Math.min(10, splitCount + 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-sip text-dark hover:bg-sip-dark transition-colors cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-center text-xs text-dark-muted dark:text-white/40 mt-3">
                Rs.{Math.ceil(finalTotal / splitCount)} per person
              </p>
            </div>
          </FadeIn>
        )}

        {/* Per-Item */}
        {splitMode === "per-item" && (
          <FadeIn>
            <div className="glass-card rounded-2xl p-4 mb-4">
              <p className="text-xs font-semibold text-dark-muted dark:text-white/35 uppercase tracking-wider mb-3">
                Assign items to people
              </p>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-2 sm:gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-dark dark:text-white truncate">
                        {item.name}
                        <span className="text-dark-muted dark:text-white/30 font-normal"> x {item.quantity}</span>
                      </p>
                      <p className="text-xs text-dark-muted dark:text-white/40">
                        Rs.{item.price * item.quantity}
                      </p>
                    </div>
                    <select
                      value={itemAssignments[item.id] || "You"}
                      onChange={(e) =>
                        setItemAssignments((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }))
                      }
                      className="text-xs bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 rounded-lg px-2.5 py-2 font-medium dark:text-white focus:outline-none focus:ring-2 focus:ring-sip/30 cursor-pointer shrink-0"
                    >
                      {people.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/8">
                <p className="text-xs font-semibold text-sip-dark dark:text-sip">
                  Your share: Rs.{yourShare}
                </p>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Order Summary */}
        <FadeIn delay={0.05}>
          <div className="glass-card rounded-2xl p-4 mb-4">
            <p className="text-xs font-semibold text-dark-muted dark:text-white/35 uppercase tracking-wider mb-3">
              Order Summary
            </p>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm gap-2">
                  <span className="text-dark-muted dark:text-white/50 truncate">
                    {item.name}
                    <span className="text-dark-muted/50 dark:text-white/25"> x {item.quantity}</span>
                  </span>
                  <span className="font-medium shrink-0 dark:text-white">
                    Rs.{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Payment Methods */}
        <FadeIn delay={0.1}>
          <div className="mb-4">
            <p className="text-xs font-semibold text-dark-muted dark:text-white/35 uppercase tracking-wider mb-3">
              How would you like to pay?
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {paymentOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  className={`relative glass-card rounded-2xl border-2 p-3.5 sm:p-4 text-left transition-all cursor-pointer ${
                    paymentMethod === opt.id
                      ? "!border-sip !bg-sip-bg dark:!bg-sip/10"
                      : "!border-transparent hover:!border-black/5 dark:hover:!border-white/10"
                  }`}
                >
                  {paymentMethod === opt.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-sip rounded-full flex items-center justify-center">
                      <CheckCircle2 size={12} className="text-dark" />
                    </div>
                  )}
                  <opt.icon
                    size={20}
                    className={
                      paymentMethod === opt.id ? "text-sip-dark dark:text-sip" : "text-dark-muted dark:text-white/40"
                    }
                  />
                  <p className="font-semibold text-xs sm:text-sm mt-2 dark:text-white">{opt.label}</p>
                  <p className="text-[10px] text-dark-muted dark:text-white/30 mt-0.5 hidden sm:block">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Card Details */}
        {paymentMethod === "card" && (
          <FadeIn>
            <div className="glass-card rounded-2xl p-4 mb-4 space-y-3">
              <p className="text-xs font-semibold text-dark-muted dark:text-white/35 uppercase tracking-wider">
                Card Details
              </p>
              <input
                type="text"
                placeholder="Cardholder name"
                className="w-full px-4 py-3 rounded-xl bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 text-sm dark:text-white dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sip/30"
              />
              <input
                type="text"
                placeholder="1234  5678  9012  3456"
                className="w-full px-4 py-3 rounded-xl bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 text-sm dark:text-white dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sip/30"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full px-4 py-3 rounded-xl bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 text-sm dark:text-white dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sip/30"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full px-4 py-3 rounded-xl bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 text-sm dark:text-white dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sip/30"
                />
              </div>
            </div>
          </FadeIn>
        )}

        {/* Promo Code */}
        <button
          onClick={() => setShowPromo(!showPromo)}
          className={`w-full glass-card flex items-center gap-3 rounded-2xl p-4 mb-4 text-left transition-all cursor-pointer ${
            promoApplied
              ? "!border-sip/30 !bg-sip-bg dark:!bg-sip/10"
              : ""
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              promoApplied ? "bg-sip text-dark" : "bg-warm dark:bg-white/5 text-dark-muted dark:text-white/40"
            }`}
          >
            <Tag size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold dark:text-white">
              {promoApplied
                ? `${promoCode.toUpperCase()} applied!`
                : "Have a promo code?"}
            </p>
            <p className="text-[10px] text-dark-muted dark:text-white/35">
              {promoApplied ? "10% discount applied" : "Tap to enter code"}
            </p>
          </div>
          {promoApplied && (
            <span className="text-sip font-bold text-sm shrink-0">-Rs.{discount}</span>
          )}
        </button>

        {showPromo && !promoApplied && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.2 }}
            className="glass-card rounded-2xl p-4 mb-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoError("");
                }}
                placeholder="Enter code"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-warm dark:bg-white/5 border border-black/5 dark:border-white/8 text-sm dark:text-white dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sip/30 uppercase"
              />
              <button
                onClick={handleApplyPromo}
                className="px-5 py-2.5 bg-dark dark:bg-sip text-white dark:text-dark rounded-xl text-sm font-semibold hover:bg-dark-soft dark:hover:bg-sip-dark transition-colors cursor-pointer shrink-0"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-red-500 text-xs mt-2">{promoError}</p>
            )}
          </motion.div>
        )}

        {/* Bill */}
        <FadeIn delay={0.15}>
          <div className="bg-dark dark:bg-dark-soft rounded-2xl p-5 text-white border border-white/5">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">
              Bill Details
            </p>
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
              {promoApplied && (
                <div className="flex justify-between text-sip-light">
                  <span>Promo discount</span>
                  <span>-Rs.{discount}</span>
                </div>
              )}
              <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-sip-light">Rs.{finalTotal}</span>
              </div>
              {splitMode !== "individual" && (
                <div className="flex justify-between text-sip-light text-sm font-semibold pt-1">
                  <span>
                    {splitMode === "even"
                      ? `Your share (1/${splitCount})`
                      : "Your items"}
                  </span>
                  <span>Rs.{yourShare}</span>
                </div>
              )}
            </div>

            <button
              onClick={handlePay}
              disabled={!paymentMethod || processing}
              className="w-full mt-5 bg-sip hover:bg-sip-dark disabled:opacity-40 disabled:cursor-not-allowed text-dark py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-lg shadow-sip/20"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                `Pay Rs.${splitMode === "individual" ? finalTotal : yourShare}`
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-4 text-white/30 text-[10px]">
              <Shield size={10} />
              <span>Secure & encrypted payment</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  );
}
