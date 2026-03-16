import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Banknote, Smartphone, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
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

  if (items.length === 0 && !confirmed) {
    navigate("/cart");
    return null;
  }

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
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-dark mb-2">Order Confirmed!</h2>
          <p className="text-muted text-sm mb-1">Your order is being prepared.</p>
          <p className="text-muted text-xs mb-8">
            Table 1 · Order #{Math.floor(1000 + Math.random() * 9000)}
          </p>
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
    { id: "cash", icon: Banknote, label: "Cash", desc: "Pay at counter" },
    { id: "jazzcash", icon: Smartphone, label: "JazzCash", desc: "Mobile wallet" },
    { id: "easypaisa", icon: Smartphone, label: "Easypaisa", desc: "Mobile wallet" },
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
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <p className="font-semibold text-dark text-sm mb-3">
            How would you like to pay?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {paymentOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPaymentMethod(opt.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-colors cursor-pointer ${
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
                <div>
                  <p className="font-semibold text-dark text-sm">{opt.label}</p>
                  <p className="text-[11px] text-muted">{opt.desc}</p>
                </div>
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
            {processing ? "Processing..." : `Pay Rs.${grandTotal}/-`}
          </button>
        </div>
      </div>
    </div>
  );
}
