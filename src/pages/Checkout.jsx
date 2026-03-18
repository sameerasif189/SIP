import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  CreditCard,
  Wallet,
  Smartphone,
  Banknote,
  Tag,
  Info,
  X,
  Minus,
  Plus,
  ListOrdered,
  Clock,
  PenLine,
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

  const [paymentMethod, setPaymentMethod] = useState("applepay");
  const [processing, setProcessing] = useState(false);
  const [showSplitBill, setShowSplitBill] = useState(false);

  // Split bill state
  const [splitMode, setSplitMode] = useState("full");
  const [splitCount, setSplitCount] = useState(2);
  const [totalPeople, setTotalPeople] = useState(2);
  const [payingFor, setPayingFor] = useState(1);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedItems, setSelectedItems] = useState(() => {
    const all = {};
    items.forEach((item) => {
      all[item.id] = true;
    });
    return all;
  });

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const getYourTotal = () => {
    if (splitMode === "full") return grandTotal;
    if (splitMode === "even") return Math.ceil((grandTotal * payingFor) / totalPeople);
    if (splitMode === "custom") {
      const parsed = parseFloat(customAmount);
      return parsed > 0 ? Math.min(parsed, grandTotal) : 0;
    }
    // item mode
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
      clearCart();
      navigate("/order-confirmed", {
        state: {
          orderNumber: order.id,
          grandTotal,
          yourTotal: splitMode !== "full" ? yourTotal : grandTotal,
          splitMode,
          splitCount: totalPeople,
          paymentMethod,
          items: [...items],
        },
        replace: true,
      });
    }, 1500);
  };

  const paymentMethodLabel = () => {
    switch (paymentMethod) {
      case "applepay": return "Apple Pay";
      case "googlepay": return "Google Pay";
      case "card": return "Credit Card";
      case "cash": return "Cash";
      case "jazzcash": return "JazzCash";
      case "easypaisa": return "Easypaisa";
      default: return "Pay";
    }
  };

  const splitModeLabel = () => {
    if (splitMode === "full") return "Split the bill";
    if (splitMode === "even") return `Split ${totalPeople} ways (${payingFor} paying)`;
    if (splitMode === "item") return "Paying for your items";
    if (splitMode === "custom") return `Custom: Rs.${customAmount || 0}/-`;
    return "Split the bill";
  };

  return (
    <div className="min-h-screen bg-white pb-36">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 px-5 py-4 border-b border-border"
      >
        <button
          onClick={() => navigate("/cart")}
          className="cursor-pointer"
        >
          <ChevronLeft size={24} className="text-dark" />
        </button>
        <h1 className="text-lg text-dark heading-font">Your order</h1>
      </motion.div>

      <div className="max-w-lg mx-auto px-5 pt-5">
        {/* Pay securely header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <h2 className="text-xl text-dark heading-font">Pay securely</h2>
          <p className="text-muted text-sm mt-0.5">All transactions are private and encrypted.</p>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2.5 mb-5"
        >
          <PaymentOption
            selected={paymentMethod === "applepay"}
            onClick={() => setPaymentMethod("applepay")}
            label="Apple Pay"
            icon={<span className="text-xs font-bold bg-dark text-white px-2 py-0.5 rounded">Pay</span>}
          />
          <PaymentOption
            selected={paymentMethod === "googlepay"}
            onClick={() => setPaymentMethod("googlepay")}
            label="Google Pay"
            icon={<span className="text-xs font-bold bg-white text-dark border border-border px-2 py-0.5 rounded">G Pay</span>}
          />
          <PaymentOption
            selected={paymentMethod === "card"}
            onClick={() => setPaymentMethod("card")}
            label="Credit Card"
            icon={
              <div className="flex gap-1">
                <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded">VISA</span>
                <span className="text-[10px] font-bold bg-dark text-white px-1.5 py-0.5 rounded">MC</span>
              </div>
            }
          />
          <PaymentOption
            selected={paymentMethod === "cash"}
            onClick={() => setPaymentMethod("cash")}
            label="Cash"
            icon={<Banknote size={18} className="text-muted" />}
          />
          <PaymentOption
            selected={paymentMethod === "jazzcash"}
            onClick={() => setPaymentMethod("jazzcash")}
            label="JazzCash"
            icon={<Smartphone size={18} className="text-red-500" />}
          />
          <PaymentOption
            selected={paymentMethod === "easypaisa"}
            onClick={() => setPaymentMethod("easypaisa")}
            label="Easypaisa"
            icon={<Smartphone size={18} className="text-green-500" />}
          />
        </motion.div>

        {/* Card Details */}
        <AnimatePresence>
          {paymentMethod === "card" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-5 space-y-3 overflow-hidden"
            >
              <input type="text" placeholder="Cardholder name" className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10" />
              <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="MM / YY" className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10" />
                <input type="text" placeholder="CVV" className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Promo code + Split bill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2 mb-5"
        >
          <button className="flex items-center gap-3 w-full py-3 cursor-pointer group">
            <Tag size={18} className="text-muted" />
            <span className="text-sm font-medium text-dark">Add a promo code</span>
            <ChevronRight size={16} className="text-muted ml-auto" />
          </button>

          <button
            onClick={() => setShowSplitBill(true)}
            className="flex items-center gap-3 w-full py-3 cursor-pointer group"
          >
            <ListOrdered size={18} className="text-muted" />
            <span className="text-sm font-medium text-dark">{splitModeLabel()}</span>
            <ChevronRight size={16} className="text-muted ml-auto" />
          </button>
        </motion.div>

        {/* Price breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="border-t border-border pt-4 space-y-2.5 text-sm"
        >
          <div className="flex justify-between text-dark">
            <span>Subtotal</span>
            <span className="font-medium">Rs.{totalPrice}/-</span>
          </div>
          {tip > 0 && (
            <div className="flex justify-between text-dark">
              <span>Tips ({tip}%)</span>
              <span className="font-medium">Rs.{tipAmount}/-</span>
            </div>
          )}
          <div className="flex justify-between text-dark">
            <span className="flex items-center gap-1">
              Service fee
              <Info size={14} className="text-muted" />
            </span>
            <span className="font-medium">Rs.{serviceFee}/-</span>
          </div>
          <div className="flex justify-between text-dark">
            <span>GST (5%)</span>
            <span className="font-medium">Rs.{gst}/-</span>
          </div>
          <div className="flex justify-between text-dark text-lg pt-3 border-t border-border price-font">
            <span>Total</span>
            <span>Rs.{splitMode === "full" ? grandTotal : yourTotal}/-</span>
          </div>
        </motion.div>
      </div>

      {/* Pay button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-border/60"
      >
        <div className="max-w-lg mx-auto">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handlePay}
            disabled={!paymentMethod || processing}
            className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              `Pay with ${paymentMethodLabel()}`
            )}
          </motion.button>
          <p className="text-center text-[11px] text-muted mt-3">
            By continuing, I agree to the <span className="underline">User Terms</span> and <span className="underline">Privacy Policy</span>.
          </p>
          <p className="text-center text-[11px] text-muted mt-1 flex items-center justify-center gap-1">
            <span>🔒</span> secure payments with <span className="font-bold text-dark">SiP</span>
          </p>
        </div>
      </motion.div>

      {/* Split the Bill Modal */}
      <AnimatePresence>
        {showSplitBill && (
          <SplitBillModal
            items={items}
            grandTotal={grandTotal}
            totalPrice={totalPrice}
            splitMode={splitMode}
            setSplitMode={setSplitMode}
            splitCount={splitCount}
            setSplitCount={setSplitCount}
            totalPeople={totalPeople}
            setTotalPeople={setTotalPeople}
            payingFor={payingFor}
            setPayingFor={setPayingFor}
            customAmount={customAmount}
            setCustomAmount={setCustomAmount}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            onClose={() => setShowSplitBill(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PaymentOption({ selected, onClick, label, icon }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
        selected
          ? "border-dark bg-white"
          : "border-border bg-white hover:border-dark/20"
      }`}
    >
      <span className="font-medium text-dark text-[15px]">{label}</span>
      <div className="flex items-center gap-3">
        {icon}
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            selected ? "border-dark bg-dark" : "border-border"
          }`}
        >
          {selected && <Check size={14} className="text-white" />}
        </div>
      </div>
    </motion.button>
  );
}

/* ─── Circular progress ring for divide equally ─── */
function CircleProgress({ fraction }) {
  const size = 160;
  const center = size / 2;
  const r = 64;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - fraction);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={center} cy={center} r={r} fill="none" stroke="#E5E5E5" strokeWidth="8" />
      <circle
        cx={center} cy={center} r={r} fill="none" stroke="#1A1A1A" strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: "stroke-dashoffset 0.4s ease" }}
      />
    </svg>
  );
}

/* ─── Counter row (e.g. "Paying for  — 1 +  people") ─── */
function CounterRow({ label, value, onChange, min = 1, max = 20, suffix }) {
  return (
    <div className="flex items-center gap-3 text-sm text-dark">
      <span className="text-muted w-20 text-right shrink-0">{label}</span>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-full border border-border flex items-center justify-center cursor-pointer hover:bg-bg transition-colors"
      >
        <Minus size={14} />
      </button>
      <span className="w-6 text-center font-semibold text-lg">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 rounded-full border border-border flex items-center justify-center cursor-pointer hover:bg-bg transition-colors"
      >
        <Plus size={14} />
      </button>
      <span className="text-muted">{suffix}</span>
    </div>
  );
}

function SplitBillModal({
  items,
  grandTotal,
  totalPrice,
  splitMode,
  setSplitMode,
  splitCount,
  setSplitCount,
  totalPeople,
  setTotalPeople,
  payingFor,
  setPayingFor,
  customAmount,
  setCustomAmount,
  selectedItems,
  setSelectedItems,
  onClose,
}) {
  // Sub-views: "main" | "even" | "item" | "custom"
  const [view, setView] = useState("main");

  // Guest assignments for item-based split (multi-guest)
  const [guestCount, setGuestCount] = useState(2);
  const [guestItems, setGuestItems] = useState(() => {
    // guest 1 gets all items by default
    const g = { 1: {} };
    items.forEach((item) => { g[1][item.id] = true; });
    for (let i = 2; i <= 4; i++) {
      g[i] = {};
    }
    return g;
  });

  const toggleGuestItem = (guest, itemId) => {
    setGuestItems((prev) => ({
      ...prev,
      [guest]: { ...prev[guest], [itemId]: !prev[guest][itemId] },
    }));
  };

  const selectAllForGuest = (guest) => {
    const allSelected = items.every((item) => guestItems[guest]?.[item.id]);
    const updated = { ...guestItems[guest] };
    items.forEach((item) => { updated[item.id] = !allSelected; });
    setGuestItems((prev) => ({ ...prev, [guest]: updated }));
  };

  const confirmItemSplit = () => {
    // Use guest 1's items as the selected items for payment
    setSelectedItems(guestItems[1] || {});
    setSplitMode("item");
    onClose();
  };

  const confirmEvenSplit = () => {
    setSplitMode("even");
    onClose();
  };

  const confirmCustom = () => {
    setSplitMode("custom");
    onClose();
  };

  const evenTotal = Math.ceil((grandTotal * payingFor) / totalPeople);
  const fraction = totalPeople > 0 ? payingFor / totalPeople : 0;

  const guestTotal = (guestNum) => {
    return items
      .filter((item) => guestItems[guestNum]?.[item.id])
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Proportion-based guest total (includes fees etc.)
  const guestGrandTotal = (guestNum) => {
    const sub = guestTotal(guestNum);
    if (totalPrice === 0) return 0;
    return Math.ceil(grandTotal * (sub / totalPrice));
  };

  const viewTitle = () => {
    if (view === "main") return "Split the bill";
    if (view === "even") return "Divide the bill equally";
    if (view === "item") return "Edit split";
    if (view === "custom") return "Pay a custom amount";
    return "Split the bill";
  };

  const goBack = () => {
    if (view === "main") onClose();
    else setView("main");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-3xl w-full max-w-lg max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <button onClick={goBack} className="cursor-pointer">
            <ChevronLeft size={20} className="text-dark" />
          </button>
          <h3 className="text-dark text-base heading-font">{viewTitle()}</h3>
          <button onClick={onClose} className="cursor-pointer">
            <X size={20} className="text-dark" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {/* ── Main menu ── */}
            {view === "main" && (
              <motion.div
                key="main"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-5 space-y-3 pb-8"
              >
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setView("item")}
                  className="w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-dark text-white"
                >
                  <ListOrdered size={20} />
                  <span className="font-semibold text-[15px]">Pay for your items</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setView("even")}
                  className="w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-dark text-white"
                >
                  <Clock size={20} />
                  <span className="font-semibold text-[15px]">Divide the bill equally</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setView("custom")}
                  className="w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-dark text-white"
                >
                  <PenLine size={20} />
                  <span className="font-semibold text-[15px]">Pay a custom amount</span>
                </motion.button>
              </motion.div>
            )}

            {/* ── Divide equally ── */}
            {view === "even" && (
              <motion.div
                key="even"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-5 pb-8"
              >
                {/* Circular progress */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative w-[160px] h-[160px]">
                    <CircleProgress fraction={fraction} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl text-dark font-bold tracking-tight leading-none">Rs.{grandTotal}/-</span>
                      <span className="text-xs text-muted mt-1">Amount to share</span>
                    </div>
                  </div>
                </div>

                {/* Counters */}
                <div className="space-y-5 mb-8 flex flex-col items-center">
                  <CounterRow
                    label="Paying for"
                    value={payingFor}
                    onChange={(v) => setPayingFor(Math.min(v, totalPeople))}
                    min={1}
                    max={totalPeople}
                    suffix="people"
                  />
                  <CounterRow
                    label="Out of"
                    value={totalPeople}
                    onChange={(v) => {
                      setTotalPeople(v);
                      if (payingFor > v) setPayingFor(v);
                    }}
                    min={2}
                    max={20}
                    suffix="at the table"
                  />
                </div>

                {/* Total */}
                <div className="flex justify-between items-center border-t border-border pt-4 mb-6">
                  <span className="text-dark font-medium">Total</span>
                  <span className="text-dark font-bold text-lg">Rs.{evenTotal}/-</span>
                </div>

                {/* Confirm */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmEvenSplit}
                  className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer"
                >
                  Confirm
                </motion.button>
              </motion.div>
            )}

            {/* ── Pay for your items (multi-guest) ── */}
            {view === "item" && (
              <motion.div
                key="item"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-5 pb-8"
              >
                {Array.from({ length: guestCount }, (_, i) => i + 1).map((guest) => (
                  <div key={guest} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-dark font-bold text-lg heading-font">Guest {guest}</h4>
                      <button
                        onClick={() => selectAllForGuest(guest)}
                        className="text-sm text-dark font-medium cursor-pointer hover:underline"
                      >
                        Select all
                      </button>
                    </div>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const checked = !!guestItems[guest]?.[item.id];
                        return (
                          <button
                            key={item.id}
                            onClick={() => toggleGuestItem(guest, item.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                              checked ? "border-dark bg-bg" : "border-border bg-white"
                            }`}
                          >
                            <span className="text-dark text-sm font-medium">{item.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-dark text-sm font-medium">
                                Rs.{(item.price * item.quantity).toFixed(0)}/-
                              </span>
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                                  checked ? "bg-dark" : "border-2 border-border"
                                }`}
                              >
                                {checked && <Check size={12} className="text-white" />}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Add / remove guest buttons */}
                <div className="flex gap-3 mb-6">
                  {guestCount < 6 && (
                    <button
                      onClick={() => {
                        const next = guestCount + 1;
                        setGuestCount(next);
                        setGuestItems((prev) => ({ ...prev, [next]: {} }));
                      }}
                      className="flex-1 py-3 rounded-full border border-border text-sm font-medium text-dark cursor-pointer hover:bg-bg transition-colors"
                    >
                      + Add guest
                    </button>
                  )}
                  {guestCount > 2 && (
                    <button
                      onClick={() => {
                        const updated = { ...guestItems };
                        delete updated[guestCount];
                        setGuestItems(updated);
                        setGuestCount(guestCount - 1);
                      }}
                      className="flex-1 py-3 rounded-full border border-border text-sm font-medium text-muted cursor-pointer hover:bg-bg transition-colors"
                    >
                      Remove guest
                    </button>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center border-t border-border pt-4 mb-6">
                  <span className="text-dark font-medium">Total</span>
                  <span className="text-dark font-bold text-lg">Rs.{guestGrandTotal(1)}/-</span>
                </div>

                {/* Confirm */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmItemSplit}
                  className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer"
                >
                  Confirm
                </motion.button>
              </motion.div>
            )}

            {/* ── Custom amount ── */}
            {view === "custom" && (
              <motion.div
                key="custom"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-5 pb-8"
              >
                <div className="flex flex-col items-center mb-8">
                  <p className="text-muted text-sm mb-2">Total bill: Rs.{grandTotal}/-</p>
                  <div className="relative w-full max-w-xs">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-dark">Rs.</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "" || parseFloat(v) <= grandTotal) {
                          setCustomAmount(v);
                        }
                      }}
                      placeholder="0"
                      className="w-full text-center text-3xl font-bold text-dark py-6 bg-bg rounded-2xl focus:outline-none focus:ring-2 focus:ring-dark/10 pl-14 pr-6"
                    />
                  </div>
                  <p className="text-muted text-xs mt-3">Enter the amount you want to pay</p>
                </div>

                {/* Quick amounts */}
                <div className="flex gap-2 justify-center mb-8">
                  {[
                    Math.ceil(grandTotal / 4),
                    Math.ceil(grandTotal / 3),
                    Math.ceil(grandTotal / 2),
                    grandTotal,
                  ].map((amount, i) => (
                    <button
                      key={i}
                      onClick={() => setCustomAmount(String(amount))}
                      className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${
                        customAmount === String(amount)
                          ? "bg-dark text-white"
                          : "bg-bg text-dark hover:bg-border"
                      }`}
                    >
                      Rs.{amount}/-
                    </button>
                  ))}
                </div>

                {/* Remaining */}
                {customAmount && parseFloat(customAmount) > 0 && (
                  <div className="text-center text-sm text-muted mb-6">
                    Remaining: Rs.{grandTotal - parseFloat(customAmount)}/-
                  </div>
                )}

                {/* Confirm */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmCustom}
                  disabled={!customAmount || parseFloat(customAmount) <= 0}
                  className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirm
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
