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
  X,
  Banknote,
  ListOrdered,
  Clock,
  PenLine,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { getAllItems } from "../data/menu";
import SipLogo from "../components/SipLogo";
import banglesImg from "../assets/bangles.png";

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
          {/* Top bar with Order more + logo + Review */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between px-5 pt-8 pb-4"
          >
            <Link
              to="/menu"
              className="bg-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-dark/90 transition-colors"
            >
              Order more
            </Link>
            <SipLogo size={48} />
            {step >= 3 ? (
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
                className="inline-flex items-center gap-1.5 bg-white border border-border text-dark px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-bg transition-colors cursor-pointer"
              >
                <Star size={14} />
                Review
              </button>
            ) : (
              <div className="w-[88px]" />
            )}
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

            {/* Bangle Stalls banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 rounded-2xl overflow-hidden bg-[#4A5568]"
            >
              <div className="px-6 pt-6 pb-4">
                <h3 className="text-white text-[18px] font-bold heading-font leading-snug mb-1.5">
                  Bangle Stalls Are Coming To SiP
                </h3>
                <p className="text-white/60 text-[13px] leading-relaxed mb-3">
                  Beautiful bangle stalls at SiP — this Thursday, 7 PM to 12 AM
                </p>
                <button className="bg-[#2D3748] hover:bg-[#1A202C] transition-colors text-white text-xs font-semibold px-5 py-2.5 rounded-full cursor-pointer">
                  Learn more
                </button>
              </div>
              <div className="relative h-[180px]">
                <img
                  src={banglesImg}
                  alt="Bangle stalls"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#4A5568] via-transparent to-transparent h-[40px]" />
              </div>
            </motion.div>
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

function CheckoutModal({ items, totalPrice, tip, tipAmount, serviceFee, gst, grandTotal, orderNotes, onClose }) {
  const navigate = useNavigate();

  // Split bill state
  const [splitMode, setSplitMode] = useState("full");
  const [splitView, setSplitView] = useState("main"); // main | even | item | custom
  const [splitCount, setSplitCount] = useState(2);
  const [totalPeople, setTotalPeople] = useState(2);
  const [payingFor, setPayingFor] = useState(1);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedItems, setSelectedItems] = useState(() => {
    const all = {};
    items.forEach((item) => { all[item.id] = true; });
    return all;
  });
  const [guestCount, setGuestCount] = useState(2);
  const [guestItems, setGuestItems] = useState(() => {
    const g = { 1: {} };
    items.forEach((item) => { g[1][item.id] = true; });
    for (let i = 2; i <= 4; i++) g[i] = {};
    return g;
  });

  // Split bill helpers
  const toggleGuestItem = (guest, itemId) => {
    setGuestItems((prev) => ({ ...prev, [guest]: { ...prev[guest], [itemId]: !prev[guest][itemId] } }));
  };
  const selectAllForGuest = (guest) => {
    const allSelected = items.every((item) => guestItems[guest]?.[item.id]);
    const updated = { ...guestItems[guest] };
    items.forEach((item) => { updated[item.id] = !allSelected; });
    setGuestItems((prev) => ({ ...prev, [guest]: updated }));
  };
  const confirmSplitAndProceed = (mode) => {
    setSplitMode(mode);
    if (mode === "item") setSelectedItems(guestItems[1] || {});
    onClose();
    navigate("/checkout", {
      state: {
        tip, tipAmount, serviceFee, gst, grandTotal, orderNotes,
        splitMode: mode,
        totalPeople,
        payingFor,
        customAmount,
        selectedItems: mode === "item" ? (guestItems[1] || {}) : selectedItems,
      },
    });
  };
  const evenTotal = Math.ceil((grandTotal * payingFor) / totalPeople);
  const fraction = totalPeople > 0 ? payingFor / totalPeople : 0;
  const guestTotal = (gn) => items.filter((i) => guestItems[gn]?.[i.id]).reduce((s, i) => s + i.price * i.quantity, 0);
  const guestGrandTotal = (gn) => { const sub = guestTotal(gn); return totalPrice === 0 ? 0 : Math.ceil(grandTotal * (sub / totalPrice)); };

  const handleBack = () => {
    if (splitView !== "main") {
      setSplitView("main");
    } else {
      onClose();
    }
  };

  const headerTitle = () => {
    if (splitView === "main") return "Split the bill";
    if (splitView === "even") return "Divide the bill equally";
    if (splitView === "item") return "Edit split";
    if (splitView === "custom") return "Pay a custom amount";
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
          <button onClick={handleBack} className="cursor-pointer">
            <ChevronLeft size={20} className="text-dark" />
          </button>
          <h3 className="text-dark text-base heading-font">{headerTitle()}</h3>
          <button onClick={onClose} className="cursor-pointer">
            <X size={20} className="text-dark" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
                {/* Main split options */}
                {splitView === "main" && (
                  <motion.div key="split-main" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-5 space-y-3 pb-8">
                    <p className="text-muted text-sm mb-4">How would you like to pay?</p>
                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => confirmSplitAndProceed("full")}
                      className="w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-dark text-white">
                      <Banknote size={20} /><span className="font-semibold text-[15px]">Pay the full bill</span>
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => setSplitView("item")}
                      className="w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-dark text-white">
                      <ListOrdered size={20} /><span className="font-semibold text-[15px]">Pay for your items</span>
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => setSplitView("even")}
                      className="w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-dark text-white">
                      <Clock size={20} /><span className="font-semibold text-[15px]">Divide the bill equally</span>
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => setSplitView("custom")}
                      className="w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer bg-dark text-white">
                      <PenLine size={20} /><span className="font-semibold text-[15px]">Pay a custom amount</span>
                    </motion.button>
                  </motion.div>
                )}

                {/* Even split */}
                {splitView === "even" && (
                  <motion.div key="split-even" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-5 pb-8">
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
                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => confirmSplitAndProceed("even")} className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer">Continue to payment</motion.button>
                  </motion.div>
                )}

                {/* Item-based split */}
                {splitView === "item" && (
                  <motion.div key="split-item" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-5 pb-8">
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
                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => confirmSplitAndProceed("item")} className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer">Continue to payment</motion.button>
                  </motion.div>
                )}

                {/* Custom amount */}
                {splitView === "custom" && (
                  <motion.div key="split-custom" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-5 pb-8">
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
                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => confirmSplitAndProceed("custom")}
                      disabled={!customAmount || parseFloat(customAmount) <= 0}
                      className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Continue to payment</motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
          </div>
      </motion.div>
    </motion.div>
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
