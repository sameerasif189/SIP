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
      clearCart();
      navigate("/order-confirmed", {
        state: {
          orderNumber: order.id,
          grandTotal,
          yourTotal: splitMode !== "full" ? yourTotal : grandTotal,
          splitMode,
          splitCount,
          paymentMethod,
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
        <h1 className="text-lg font-bold text-dark">Your order</h1>
      </motion.div>

      <div className="max-w-lg mx-auto px-5 pt-6">
        {/* Pay securely header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold text-dark">Pay securely</h2>
          <p className="text-muted text-sm mt-1">All transactions are private and encrypted.</p>
        </motion.div>

        {/* Payment Methods - Sunday style radio cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3 mb-6"
        >
          {/* Apple Pay */}
          <PaymentOption
            selected={paymentMethod === "applepay"}
            onClick={() => setPaymentMethod("applepay")}
            label="Apple Pay"
            icon={
              <span className="text-xs font-bold bg-dark text-white px-2 py-0.5 rounded">Pay</span>
            }
          />

          {/* Google Pay */}
          <PaymentOption
            selected={paymentMethod === "googlepay"}
            onClick={() => setPaymentMethod("googlepay")}
            label="Google Pay"
            icon={
              <span className="text-xs font-bold bg-white text-dark border border-border px-2 py-0.5 rounded">G Pay</span>
            }
          />

          {/* Credit Card */}
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

          {/* Cash */}
          <PaymentOption
            selected={paymentMethod === "cash"}
            onClick={() => setPaymentMethod("cash")}
            label="Cash"
            icon={<Banknote size={18} className="text-muted" />}
          />

          {/* JazzCash */}
          <PaymentOption
            selected={paymentMethod === "jazzcash"}
            onClick={() => setPaymentMethod("jazzcash")}
            label="JazzCash"
            icon={<Smartphone size={18} className="text-red-500" />}
          />

          {/* Easypaisa */}
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
              className="mb-6 space-y-3 overflow-hidden"
            >
              <input
                type="text"
                placeholder="Cardholder name"
                className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
              />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Promo code + Split bill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 mb-6"
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
            <span className="text-sm font-medium text-dark">
              {splitMode === "full" ? "Split the bill" :
               splitMode === "even" ? `Split ${splitCount} ways` : "Paying for your items"}
            </span>
            <ChevronRight size={16} className="text-muted ml-auto" />
          </button>
        </motion.div>

        {/* Price breakdown - Sunday style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="border-t border-border pt-5 space-y-3 text-sm"
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
          <div className="flex justify-between text-dark text-lg font-bold pt-3 border-t border-border">
            <span>Total</span>
            <span>Rs.{splitMode === "full" ? grandTotal : yourTotal}/-</span>
          </div>
        </motion.div>
      </div>

      {/* Pay button - Sunday style big black pill */}
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
            splitMode={splitMode}
            setSplitMode={setSplitMode}
            splitCount={splitCount}
            setSplitCount={setSplitCount}
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

function SplitBillModal({
  items,
  grandTotal,
  splitMode,
  setSplitMode,
  splitCount,
  setSplitCount,
  selectedItems,
  setSelectedItems,
  onClose,
}) {
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
        className="bg-white rounded-t-3xl w-full max-w-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <button onClick={onClose} className="cursor-pointer">
            <ChevronLeft size={20} className="text-dark" />
          </button>
          <h3 className="font-bold text-dark text-lg">Split the bill</h3>
          <button onClick={onClose} className="cursor-pointer">
            <X size={20} className="text-dark" />
          </button>
        </div>

        <div className="p-5 space-y-3 pb-8">
          {/* Pay for your items */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSplitMode("item");
              onClose();
            }}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all ${
              splitMode === "item" ? "bg-dark text-white" : "bg-dark text-white"
            }`}
          >
            <ListOrdered size={20} />
            <span className="font-semibold text-[15px]">Pay for your items</span>
          </motion.button>

          {/* Divide equally */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSplitMode("even");
              onClose();
            }}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all ${
              splitMode === "even" ? "bg-dark text-white" : "bg-dark text-white"
            }`}
          >
            <Clock size={20} />
            <span className="font-semibold text-[15px]">Divide the bill equally</span>
          </motion.button>

          {/* Custom amount */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSplitMode("custom");
              onClose();
            }}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all ${
              splitMode === "custom" ? "bg-dark text-white" : "bg-dark text-white"
            }`}
          >
            <PenLine size={20} />
            <span className="font-semibold text-[15px]">Pay a custom amount</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
