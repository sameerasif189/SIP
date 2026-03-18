import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  MessageSquare,
  Star,
  Check,
  CreditCard,
  Smartphone,
  Banknote,
  Tag,
  Info,
  X,
  ListOrdered,
  Clock,
  PenLine,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { getAllItems } from "../data/menu";
import SipLogo from "../components/SipLogo";

const STATUS_MESSAGES = [
  "Your order has been placed. We're getting it ready for you!",
  "Your order is being prepared by our kitchen team.",
  "Your order is ready and on its way to your table!",
  "Your order has been delivered to your table. If you have any problem, do not hesitate to contact the staff.",
];

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const { activeOrder, ORDER_STEPS } = useOrder();
  const navigate = useNavigate();
  const [tip, setTip] = useState(0);
  const [orderNotes, setOrderNotes] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

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

  // Get popular/recommended items (not already in cart)
  const cartIds = new Set(items.map((i) => i.id));
  const allItems = getAllItems().filter((i) => !cartIds.has(i.id) && i.price);
  const popularItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 6);

  // If cart is empty but there's an active order, show order progress
  if (items.length === 0 && activeOrder) {
    const step = activeOrder.step;
    const headingText = step >= 3 ? "Enjoy your meal" : step >= 2 ? "Almost ready!" : "Getting ready";

    return (
      <div className="min-h-screen bg-bg">
        <div className="max-w-lg mx-auto">
          {/* Top bar with logo + Order more */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between px-5 pt-8 pb-4"
          >
            <SipLogo size={44} />
            <Link
              to="/menu"
              className="bg-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-dark/90 transition-colors"
            >
              Order more
            </Link>
          </motion.div>

          {/* White card */}
          <div className="bg-white rounded-t-3xl min-h-[calc(100vh-100px)] px-5 pt-8 pb-8">
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl text-dark mb-2 heading-font"
            >
              {headingText}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted text-sm mb-8"
            >
              Your order is #{activeOrder.id}
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-2 mb-8"
            >
              {ORDER_STEPS.map((_, i) => (
                <div key={i} className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: i <= step ? "100%" : "0%" }}
                    transition={{ delay: 0.4 + i * 0.2, duration: 0.5, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      i <= step ? "bg-dark" : ""
                    }`}
                  />
                </div>
              ))}
            </motion.div>

            {/* Status message bubble */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#EDE9F8] rounded-2xl p-5 mb-8 flex gap-3"
            >
              <div className="w-8 h-8 bg-[#6B5CE7]/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare size={16} className="text-[#6B5CE7]" />
              </div>
              <p className="text-dark text-sm leading-relaxed">
                {STATUS_MESSAGES[step] || STATUS_MESSAGES[0]}
              </p>
            </motion.div>

            <div className="border-t border-border my-6" />

            {/* Total */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-between items-center mb-4"
            >
              <span className="text-2xl text-dark price-font">Total</span>
              <span className="text-2xl text-dark price-font">
                Rs.{activeOrder.grandTotal}/-
              </span>
            </motion.div>

            {/* Order details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-between w-full py-3 cursor-pointer"
              >
                <span className="text-sm text-dark font-medium">Order details</span>
                <motion.div animate={{ rotate: showDetails ? 90 : 0 }}>
                  <ChevronRight size={16} className="text-muted" />
                </motion.div>
              </button>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 pb-4">
                      {activeOrder.items.map((item) => (
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
                )}
              </AnimatePresence>
            </motion.div>

            {/* Leave a review button */}
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="mt-6"
              >
                <button
                  onClick={() => navigate("/order-confirmed", {
                    state: {
                      orderNumber: activeOrder.id,
                      grandTotal: activeOrder.grandTotal,
                      yourTotal: activeOrder.grandTotal,
                      splitMode: "full",
                      splitCount: 2,
                      items: activeOrder.items,
                    },
                  })}
                  className="w-full bg-[#3D4F3D] text-white rounded-2xl p-6 cursor-pointer text-left"
                >
                  <div className="flex items-center justify-between mb-3">
                    <SipLogo size={36} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 heading-font">
                    Share your experience at SiP
                  </h3>
                  <p className="text-white/60 text-sm mb-3">Click on stars to leave a review.</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={28}
                        className="text-[#C5B97A]"
                        fill="#C5B97A"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Push notification toast */}
        {step >= 2 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 left-4 right-4 z-50"
          >
            <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl shadow-dark/10 flex items-start gap-3">
              <SipLogo size={40} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-dark">
                  {step >= 3 ? "Your order is ready, enjoy your meal!" : "Your order is almost ready!"}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {step >= 3
                    ? "Hey, your order is on its way, the waiter will bring to you."
                    : "We're putting the finishing touches on your order."}
                </p>
              </div>
              <span className="text-xs text-muted shrink-0">now</span>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // Empty cart, no active order
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex items-center gap-4 px-5 py-4 border-b border-border">
          <button onClick={() => navigate("/menu")} className="cursor-pointer">
            <ChevronLeft size={24} className="text-dark" />
          </button>
          <p className="text-dark text-lg heading-font">Your order</p>
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
              className="text-dark font-semibold text-sm hover:underline"
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
        className="flex items-center gap-4 px-5 py-4 border-b border-border"
      >
        <button onClick={() => navigate("/menu")} className="cursor-pointer">
          <ChevronLeft size={24} className="text-dark" />
        </button>
        <p className="text-dark text-lg heading-font">Your order</p>
      </motion.div>

      <div className="max-w-lg mx-auto px-5 pt-6">
        {/* Items - Sunday style */}
        <div className="space-y-5">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-4"
              >
                {/* Round item image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover shrink-0 border border-border"
                />
                {/* Name + price */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-dark text-[15px] leading-tight item-name-font">
                    {item.name}
                  </h3>
                  <p className="text-muted text-sm mt-0.5 price-font">
                    Rs.{item.price}/-
                  </p>
                </div>
                {/* Quantity controls - Sunday style */}
                <div className="flex items-center gap-3 shrink-0">
                  {item.quantity === 1 ? (
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-bg cursor-pointer hover:bg-border transition-colors"
                    >
                      <Trash2 size={14} className="text-muted" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-bg cursor-pointer hover:bg-border transition-colors"
                    >
                      <Minus size={14} className="text-dark" />
                    </motion.button>
                  )}
                  <span className="w-4 text-center text-[15px] font-semibold text-dark">
                    {item.quantity}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-dark text-white cursor-pointer"
                  >
                    <Plus size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add more items - Sunday style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 mb-8"
        >
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-dark text-sm font-semibold border border-border rounded-full px-5 py-2.5 hover:bg-bg transition-colors"
          >
            <Plus size={16} />
            Add more items
          </Link>
        </motion.div>

        {/* Popular with your order - Sunday style */}
        {popularItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-lg text-dark mb-1 heading-font">Popular with your order</h3>
            <p className="text-muted text-sm mb-4">Other customers also bought these</p>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5">
              {popularItems.map((item) => (
                <PopularCard key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Tip + Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 border-t border-border pt-6"
        >
          <p className="font-semibold text-dark text-sm mb-3">Add a tip</p>
          <div className="flex gap-2">
            {tipOptions.map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.93 }}
                onClick={() => setTip(opt.value)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  tip === opt.value
                    ? "bg-dark text-white"
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
            className="w-full px-4 py-3 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10 resize-none"
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
          <div className="flex justify-between text-dark text-lg pt-3 border-t border-border price-font">
            <span>Total</span>
            <span>Rs.{grandTotal}/-</span>
          </div>
        </motion.div>
      </div>

      {/* Order button - Sunday style big black pill */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-md border-t border-border/60"
      >
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => setShowCheckout(true)}
            className="block w-full bg-dark text-white text-center py-4 rounded-full font-semibold text-[15px] shadow-lg shadow-dark/20 hover:bg-dark/90 transition-colors cursor-pointer"
          >
            Order
          </button>
        </div>
      </motion.div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <CheckoutModal
            items={items}
            totalPrice={totalPrice}
            tip={tip}
            tipAmount={tipAmount}
            serviceFee={serviceFee}
            gst={gst}
            grandTotal={grandTotal}
            orderNotes={orderNotes}
            onClose={() => setShowCheckout(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PopularCard({ item }) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="shrink-0 w-36 cursor-pointer"
      onClick={() => navigate(`/item/${item.id}`)}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-36 h-28 rounded-2xl object-cover"
        />
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            addItem({ ...item, quantity: 1 });
          }}
          className="absolute top-2 right-2 w-7 h-7 bg-dark text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg"
        >
          <Plus size={14} />
        </motion.button>
      </div>
      <p className="text-dark text-sm mt-2 leading-tight item-name-font">{item.name}</p>
      <p className="text-muted text-sm mt-0.5 price-font">Rs.{item.price}/-</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Checkout Modal — payment, split bill, and pay — all inline
   ═══════════════════════════════════════════════════════════════ */

function CheckoutModal({ items, totalPrice, tip, tipAmount, serviceFee, gst, grandTotal, onClose }) {
  const { clearCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showSplitBill, setShowSplitBill] = useState(false);

  const [splitMode, setSplitMode] = useState("full");
  const [splitCount, setSplitCount] = useState(2);
  const [totalPeople, setTotalPeople] = useState(2);
  const [payingFor, setPayingFor] = useState(1);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedItems, setSelectedItems] = useState(() => {
    const all = {};
    items.forEach((item) => { all[item.id] = true; });
    return all;
  });

  const getYourTotal = () => {
    if (splitMode === "full") return grandTotal;
    if (splitMode === "even") return Math.ceil((grandTotal * payingFor) / totalPeople);
    if (splitMode === "custom") {
      const parsed = parseFloat(customAmount);
      return parsed > 0 ? Math.min(parsed, grandTotal) : 0;
    }
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
      case "saved": return "Saved Card";
      case "card": return "Credit Card";
      case "debit": return "Debit Card";
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
        className="bg-white rounded-t-3xl w-full max-w-lg max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <button onClick={onClose} className="cursor-pointer">
            <X size={20} className="text-dark" />
          </button>
          <h3 className="text-dark text-base heading-font">Pay securely</h3>
          <div className="w-5" />
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 pt-4 pb-6">
          <p className="text-muted text-sm mb-4">All transactions are private and encrypted.</p>

          {/* Saved card */}
          <p className="text-xs text-muted font-semibold uppercase tracking-wide mb-2">Saved card</p>
          <PaymentOption
            selected={paymentMethod === "saved"}
            onClick={() => setPaymentMethod("saved")}
            label="Visa ending in 4242"
            icon={<span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded">VISA</span>}
          />

          {/* Other methods */}
          <p className="text-xs text-muted font-semibold uppercase tracking-wide mt-4 mb-2">Other methods</p>
          <div className="space-y-2.5 mb-4">
            <PaymentOption selected={paymentMethod === "card"} onClick={() => setPaymentMethod("card")} label="Credit Card"
              icon={<div className="flex gap-1"><span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded">VISA</span><span className="text-[10px] font-bold bg-dark text-white px-1.5 py-0.5 rounded">MC</span></div>} />
            <PaymentOption selected={paymentMethod === "debit"} onClick={() => setPaymentMethod("debit")} label="Debit Card" icon={<CreditCard size={18} className="text-muted" />} />
            <PaymentOption selected={paymentMethod === "cash"} onClick={() => setPaymentMethod("cash")} label="Cash" icon={<Banknote size={18} className="text-muted" />} />
            <PaymentOption selected={paymentMethod === "jazzcash"} onClick={() => setPaymentMethod("jazzcash")} label="JazzCash" icon={<Smartphone size={18} className="text-red-500" />} />
            <PaymentOption selected={paymentMethod === "easypaisa"} onClick={() => setPaymentMethod("easypaisa")} label="Easypaisa" icon={<Smartphone size={18} className="text-green-500" />} />
          </div>

          {/* Card Details */}
          <AnimatePresence>
            {(paymentMethod === "card" || paymentMethod === "debit") && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-4 space-y-3 overflow-hidden">
                <input type="text" placeholder="Cardholder name" className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10" />
                <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM / YY" className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10" />
                  <input type="text" placeholder="CVV" className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add new card */}
          <button onClick={() => setShowNewCardForm(!showNewCardForm)} className="flex items-center gap-3 w-full py-3 cursor-pointer">
            <CreditCard size={18} className="text-muted" />
            <span className="text-sm font-medium text-dark">Add a new card</span>
            <ChevronRight size={16} className="text-muted ml-auto" />
          </button>
          <AnimatePresence>
            {showNewCardForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden pt-2 mb-4">
                <input type="text" placeholder="Cardholder name" className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10" />
                <input type="text" placeholder="Card number" className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM / YY" className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10" />
                  <input type="text" placeholder="CVV" className="w-full px-4 py-3.5 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10" />
                </div>
                <button className="w-full py-3 rounded-full border border-dark text-dark text-sm font-semibold cursor-pointer hover:bg-bg transition-colors">Save card</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Promo + Split */}
          <div className="border-t border-border mt-2 pt-2 space-y-1 mb-4">
            <button className="flex items-center gap-3 w-full py-3 cursor-pointer">
              <Tag size={18} className="text-muted" />
              <span className="text-sm font-medium text-dark">Add a promo code</span>
              <ChevronRight size={16} className="text-muted ml-auto" />
            </button>
            <button onClick={() => setShowSplitBill(true)} className="flex items-center gap-3 w-full py-3 cursor-pointer">
              <ListOrdered size={18} className="text-muted" />
              <span className="text-sm font-medium text-dark">{splitModeLabel()}</span>
              <ChevronRight size={16} className="text-muted ml-auto" />
            </button>
          </div>

          {/* Price breakdown */}
          <div className="border-t border-border pt-4 space-y-2.5 text-sm">
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
              <span className="flex items-center gap-1">Service fee <Info size={14} className="text-muted" /></span>
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
          </div>
        </div>

        {/* Pay button */}
        <div className="px-5 pb-5 pt-3 border-t border-border/60 shrink-0">
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
          <p className="text-center text-[11px] text-muted mt-2 flex items-center justify-center gap-1">
            <span>🔒</span> secure payments with <span className="font-bold text-dark">SiP</span>
          </p>
        </div>
      </motion.div>

      {/* Split Bill sub-modal */}
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
    </motion.div>
  );
}

function PaymentOption({ selected, onClick, label, icon }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
        selected ? "border-dark bg-white" : "border-border bg-white hover:border-dark/20"
      }`}
    >
      <span className="font-medium text-dark text-[15px]">{label}</span>
      <div className="flex items-center gap-3">
        {icon}
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          selected ? "border-dark bg-dark" : "border-border"
        }`}>
          {selected && <Check size={14} className="text-white" />}
        </div>
      </div>
    </motion.button>
  );
}

function CircleProgress({ fraction }) {
  const size = 160;
  const center = size / 2;
  const r = 64;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - fraction);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={center} cy={center} r={r} fill="none" stroke="#E5E5E5" strokeWidth="8" />
      <circle cx={center} cy={center} r={r} fill="none" stroke="#1A1A1A" strokeWidth="8"
        strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: "stroke-dashoffset 0.4s ease" }}
      />
    </svg>
  );
}

function CounterRow({ label, value, onChange, min = 1, max = 20, suffix }) {
  return (
    <div className="flex items-center gap-3 text-sm text-dark">
      <span className="text-muted w-20 text-right shrink-0">{label}</span>
      <button onClick={() => onChange(Math.max(min, value - 1))} className="w-8 h-8 rounded-full border border-border flex items-center justify-center cursor-pointer hover:bg-bg transition-colors">
        <Minus size={14} />
      </button>
      <span className="w-6 text-center font-semibold text-lg">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} className="w-8 h-8 rounded-full border border-border flex items-center justify-center cursor-pointer hover:bg-bg transition-colors">
        <Plus size={14} />
      </button>
      <span className="text-muted">{suffix}</span>
    </div>
  );
}

function SplitBillModal({
  items, grandTotal, totalPrice, splitMode, setSplitMode,
  splitCount, setSplitCount, totalPeople, setTotalPeople,
  payingFor, setPayingFor, customAmount, setCustomAmount,
  selectedItems, setSelectedItems, onClose,
}) {
  const [view, setView] = useState("main");
  const [guestCount, setGuestCount] = useState(2);
  const [guestItems, setGuestItems] = useState(() => {
    const g = { 1: {} };
    items.forEach((item) => { g[1][item.id] = true; });
    for (let i = 2; i <= 4; i++) g[i] = {};
    return g;
  });

  const toggleGuestItem = (guest, itemId) => {
    setGuestItems((prev) => ({ ...prev, [guest]: { ...prev[guest], [itemId]: !prev[guest][itemId] } }));
  };
  const selectAllForGuest = (guest) => {
    const allSelected = items.every((item) => guestItems[guest]?.[item.id]);
    const updated = { ...guestItems[guest] };
    items.forEach((item) => { updated[item.id] = !allSelected; });
    setGuestItems((prev) => ({ ...prev, [guest]: updated }));
  };
  const confirmItemSplit = () => { setSelectedItems(guestItems[1] || {}); setSplitMode("item"); onClose(); };
  const confirmEvenSplit = () => { setSplitMode("even"); onClose(); };
  const confirmCustom = () => { setSplitMode("custom"); onClose(); };

  const evenTotal = Math.ceil((grandTotal * payingFor) / totalPeople);
  const fraction = totalPeople > 0 ? payingFor / totalPeople : 0;
  const guestTotal = (gn) => items.filter((i) => guestItems[gn]?.[i.id]).reduce((s, i) => s + i.price * i.quantity, 0);
  const guestGrandTotal = (gn) => { const sub = guestTotal(gn); return totalPrice === 0 ? 0 : Math.ceil(grandTotal * (sub / totalPrice)); };

  const viewTitle = () => {
    if (view === "main") return "Split the bill";
    if (view === "even") return "Divide the bill equally";
    if (view === "item") return "Edit split";
    if (view === "custom") return "Pay a custom amount";
    return "Split the bill";
  };
  const goBack = () => { if (view === "main") onClose(); else setView("main"); };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-[60] flex items-end justify-center"
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
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <button onClick={goBack} className="cursor-pointer"><ChevronLeft size={20} className="text-dark" /></button>
          <h3 className="text-dark text-base heading-font">{viewTitle()}</h3>
          <button onClick={onClose} className="cursor-pointer"><X size={20} className="text-dark" /></button>
        </div>

        <div className="overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {view === "main" && (
              <motion.div key="main" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-5 space-y-3 pb-8">
                <motion.button whileTap={{ scale: 0.98 }} onClick={() => setView("item")} className="w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-dark text-white">
                  <ListOrdered size={20} /><span className="font-semibold text-[15px]">Pay for your items</span>
                </motion.button>
                <motion.button whileTap={{ scale: 0.98 }} onClick={() => setView("even")} className="w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-dark text-white">
                  <Clock size={20} /><span className="font-semibold text-[15px]">Divide the bill equally</span>
                </motion.button>
                <motion.button whileTap={{ scale: 0.98 }} onClick={() => setView("custom")} className="w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-dark text-white">
                  <PenLine size={20} /><span className="font-semibold text-[15px]">Pay a custom amount</span>
                </motion.button>
              </motion.div>
            )}

            {view === "even" && (
              <motion.div key="even" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-5 pb-8">
                <div className="flex flex-col items-center mb-8">
                  <div className="relative w-[160px] h-[160px]">
                    <CircleProgress fraction={fraction} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl text-dark font-bold tracking-tight leading-none">Rs.{grandTotal}/-</span>
                      <span className="text-xs text-muted mt-1">Amount to share</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-5 mb-8 flex flex-col items-center">
                  <CounterRow label="Paying for" value={payingFor} onChange={(v) => setPayingFor(Math.min(v, totalPeople))} min={1} max={totalPeople} suffix="people" />
                  <CounterRow label="Out of" value={totalPeople} onChange={(v) => { setTotalPeople(v); if (payingFor > v) setPayingFor(v); }} min={2} max={20} suffix="at the table" />
                </div>
                <div className="flex justify-between items-center border-t border-border pt-4 mb-6">
                  <span className="text-dark font-medium">Total</span>
                  <span className="text-dark font-bold text-lg">Rs.{evenTotal}/-</span>
                </div>
                <motion.button whileTap={{ scale: 0.98 }} onClick={confirmEvenSplit} className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer">Confirm</motion.button>
              </motion.div>
            )}

            {view === "item" && (
              <motion.div key="item" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-5 pb-8">
                {Array.from({ length: guestCount }, (_, i) => i + 1).map((guest) => (
                  <div key={guest} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-dark font-bold text-lg heading-font">Guest {guest}</h4>
                      <button onClick={() => selectAllForGuest(guest)} className="text-sm text-dark font-medium cursor-pointer hover:underline">Select all</button>
                    </div>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const checked = !!guestItems[guest]?.[item.id];
                        return (
                          <button key={item.id} onClick={() => toggleGuestItem(guest, item.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${checked ? "border-dark bg-bg" : "border-border bg-white"}`}>
                            <span className="text-dark text-sm font-medium">{item.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-dark text-sm font-medium">Rs.{(item.price * item.quantity).toFixed(0)}/-</span>
                              <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${checked ? "bg-dark" : "border-2 border-border"}`}>
                                {checked && <Check size={12} className="text-white" />}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 mb-6">
                  {guestCount < 6 && (
                    <button onClick={() => { const next = guestCount + 1; setGuestCount(next); setGuestItems((prev) => ({ ...prev, [next]: {} })); }}
                      className="flex-1 py-3 rounded-full border border-border text-sm font-medium text-dark cursor-pointer hover:bg-bg transition-colors">+ Add guest</button>
                  )}
                  {guestCount > 2 && (
                    <button onClick={() => { const updated = { ...guestItems }; delete updated[guestCount]; setGuestItems(updated); setGuestCount(guestCount - 1); }}
                      className="flex-1 py-3 rounded-full border border-border text-sm font-medium text-muted cursor-pointer hover:bg-bg transition-colors">Remove guest</button>
                  )}
                </div>
                <div className="flex justify-between items-center border-t border-border pt-4 mb-6">
                  <span className="text-dark font-medium">Total</span>
                  <span className="text-dark font-bold text-lg">Rs.{guestGrandTotal(1)}/-</span>
                </div>
                <motion.button whileTap={{ scale: 0.98 }} onClick={confirmItemSplit} className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer">Confirm</motion.button>
              </motion.div>
            )}

            {view === "custom" && (
              <motion.div key="custom" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-5 pb-8">
                <div className="flex flex-col items-center mb-8">
                  <p className="text-muted text-sm mb-2">Total bill: Rs.{grandTotal}/-</p>
                  <div className="relative w-full max-w-xs">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-dark">Rs.</span>
                    <input type="number" value={customAmount}
                      onChange={(e) => { const v = e.target.value; if (v === "" || parseFloat(v) <= grandTotal) setCustomAmount(v); }}
                      placeholder="0" className="w-full text-center text-3xl font-bold text-dark py-6 bg-bg rounded-2xl focus:outline-none focus:ring-2 focus:ring-dark/10 pl-14 pr-6" />
                  </div>
                  <p className="text-muted text-xs mt-3">Enter the amount you want to pay</p>
                </div>
                <div className="flex gap-2 justify-center mb-8">
                  {[Math.ceil(grandTotal / 4), Math.ceil(grandTotal / 3), Math.ceil(grandTotal / 2), grandTotal].map((amount, i) => (
                    <button key={i} onClick={() => setCustomAmount(String(amount))}
                      className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${customAmount === String(amount) ? "bg-dark text-white" : "bg-bg text-dark hover:bg-border"}`}>
                      Rs.{amount}/-
                    </button>
                  ))}
                </div>
                {customAmount && parseFloat(customAmount) > 0 && (
                  <div className="text-center text-sm text-muted mb-6">Remaining: Rs.{grandTotal - parseFloat(customAmount)}/-</div>
                )}
                <motion.button whileTap={{ scale: 0.98 }} onClick={confirmCustom}
                  disabled={!customAmount || parseFloat(customAmount) <= 0}
                  className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Confirm</motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
