import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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

  // Bill splitting
  const [splitMode, setSplitMode] = useState("full"); // full | even | item
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
    // per-item: calculate ratio of selected items
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
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-dark mb-2">Order Confirmed!</h2>
          <p className="text-muted text-sm mb-1">Your order is being prepared.</p>
          <p className="text-muted text-xs mb-2">
            Table 1 · Order #{orderNumber}
          </p>
          {splitMode !== "full" && (
            <p className="text-muted text-xs mb-6">
              You paid Rs.{yourTotal}/-
              {splitMode === "even" && ` (split ${splitCount} ways)`}
              {splitMode === "item" && " (your items)"}
            </p>
          )}
          <Link
            to="/"
            className="block w-full bg-dark text-white text-center py-4 rounded-full font-semibold text-[15px] hover:bg-dark/90 transition-colors"
          >
            Back to menu
          </Link>
        </div>
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

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-4 border-b border-border">
        <button
          onClick={() => navigate("/cart")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} className="text-dark" />
        </button>
        <h1 className="text-lg font-bold text-dark">Payment</h1>
      </div>

      <div className="max-w-3xl mx-auto px-5 pt-6">
        {/* Bill Splitting */}
        <div className="mb-6">
          <p className="font-semibold text-dark text-sm mb-3">Who's paying?</p>
          <div className="grid grid-cols-3 gap-2">
            {splitOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSplitMode(opt.id)}
                className={`relative p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                  splitMode === opt.id
                    ? "border-dark bg-dark/[0.03]"
                    : "border-border hover:border-dark/30"
                }`}
              >
                <opt.icon
                  size={18}
                  className={`mx-auto ${
                    splitMode === opt.id ? "text-dark" : "text-muted"
                  }`}
                />
                <p className="font-semibold text-dark text-xs mt-2">{opt.label}</p>
                <p className="text-[10px] text-muted mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Even split controls */}
        {splitMode === "even" && (
          <div className="mb-6 p-4 border border-border rounded-xl">
            <p className="text-sm text-muted mb-3">How many people?</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setSplitCount(Math.max(2, splitCount - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-bg text-dark cursor-pointer hover:bg-border transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-2xl font-bold text-dark w-8 text-center">
                {splitCount}
              </span>
              <button
                onClick={() => setSplitCount(Math.min(10, splitCount + 1))}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-dark text-white cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>
            <p className="text-center text-xs text-muted mt-3">
              Rs.{Math.ceil(grandTotal / splitCount)}/- per person
            </p>
          </div>
        )}

        {/* Per-item selection */}
        {splitMode === "item" && (
          <div className="mb-6 p-4 border border-border rounded-xl">
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
                    className="w-5 h-5 rounded accent-[#1A1D1F]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark truncate">
                      {item.name}
                      <span className="text-muted font-normal"> × {item.quantity}</span>
                    </p>
                  </div>
                  <span className="text-sm text-dark font-medium shrink-0">
                    Rs.{item.price * item.quantity}/-
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="mb-6">
          <p className="font-semibold text-dark text-sm mb-3">Order summary</p>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted">
                  {item.name} × {item.quantity}
                </span>
                <span className="text-dark font-medium">
                  Rs.{item.price * item.quantity}/-
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order notes */}
        {orderNotes && (
          <div className="mb-6 p-4 bg-bg rounded-xl">
            <p className="text-xs text-muted mb-1">Order notes</p>
            <p className="text-sm text-dark">{orderNotes}</p>
          </div>
        )}

        {/* Totals */}
        <div className="mb-8 space-y-2 text-sm">
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
          <div className="flex justify-between font-bold text-dark text-base pt-2 border-t border-border">
            <span>Total</span>
            <span>Rs.{grandTotal}/-</span>
          </div>
          {splitMode !== "full" && (
            <div className="flex justify-between font-bold text-dark text-base">
              <span>
                {splitMode === "even"
                  ? `Your share (1/${splitCount})`
                  : "Your items"}
              </span>
              <span>Rs.{yourTotal}/-</span>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <p className="font-semibold text-dark text-sm mb-3">
            How would you like to pay?
          </p>
          <div className="grid grid-cols-3 gap-2">
            {paymentOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPaymentMethod(opt.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                  paymentMethod === opt.id
                    ? "border-dark bg-dark/[0.03]"
                    : "border-border hover:border-dark/30"
                }`}
              >
                <opt.icon
                  size={20}
                  className={
                    paymentMethod === opt.id ? "text-dark" : "text-muted"
                  }
                />
                <p className="font-semibold text-dark text-xs">{opt.label}</p>
                <p className="text-[10px] text-muted leading-tight">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Card Details */}
        {paymentMethod === "card" && (
          <div className="mb-6 space-y-3">
            <p className="font-semibold text-dark text-sm mb-3">Card details</p>
            <input
              type="text"
              placeholder="Cardholder name"
              className="w-full px-4 py-3 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
            />
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM / YY"
                className="w-full px-4 py-3 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full px-4 py-3 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
              />
            </div>
          </div>
        )}
      </div>

      {/* Pay button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-border">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handlePay}
            disabled={!paymentMethod || processing}
            className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] hover:bg-dark/90 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {processing
              ? "Processing..."
              : `Pay Rs.${splitMode === "full" ? grandTotal : yourTotal}/-`}
          </button>
        </div>
      </div>
    </div>
  );
}
