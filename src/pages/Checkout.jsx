import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  CheckCircle,
  Tag,
  ChevronRight,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    tip = 5,
    tipAmount = 0,
    serviceFee = 0,
    gst = 0,
    grandTotal = totalPrice,
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [showPromo, setShowPromo] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const discount = promoApplied ? Math.round(grandTotal * 0.1) : 0;
  const finalTotal = grandTotal - discount;

  if (items.length === 0 && !confirmed) {
    navigate("/cart");
    return null;
  }

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SIP10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  };

  const handlePay = () => {
    setConfirmed(true);
    clearCart();
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center px-4 max-w-sm">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="font-semibold text-xl mb-2">Order Placed!</h2>
          <p className="text-sm text-muted mb-1">
            Thank you for ordering at SIP.
          </p>
          <p className="text-sm text-muted mb-6">
            Order #{Math.floor(100000 + Math.random() * 900000)}
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-light transition-colors"
          >
            Order More
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/cart"
            className="p-1 text-muted hover:text-brand transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-semibold">Your order</h1>
          <div className="w-5" />
        </div>

        {/* Pay Securely */}
        <h2 className="font-bold text-lg mb-1">Pay securely</h2>
        <p className="text-sm text-muted mb-6">
          All transactions are private and encrypted.
        </p>

        {/* Payment Methods */}
        <div className="space-y-3">
          <button
            onClick={() => setPaymentMethod("card")}
            className={`w-full rounded-xl border-2 p-4 text-left transition-all cursor-pointer ${
              paymentMethod === "card"
                ? "border-brand bg-white"
                : "border-gray-100 bg-white hover:border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard size={18} className="text-brand" />
                <span className="font-medium text-sm">Pay by card</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted bg-gray-100 px-2 py-0.5 rounded">VISA</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "card"
                      ? "border-brand"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "card" && (
                    <div className="w-3 h-3 rounded-full bg-brand" />
                  )}
                </div>
              </div>
            </div>
            {paymentMethod === "card" && (
              <div className="mt-4 space-y-3">
                <p className="text-sm font-medium">Card details</p>
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand"
                  />
                </div>
              </div>
            )}
          </button>

          <button
            onClick={() => setPaymentMethod("cash")}
            className={`w-full rounded-xl border-2 p-4 text-left transition-all cursor-pointer ${
              paymentMethod === "cash"
                ? "border-brand bg-white"
                : "border-gray-100 bg-white hover:border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Banknote size={18} className="text-brand" />
                <span className="font-medium text-sm">Pay by cash</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "cash"
                    ? "border-brand"
                    : "border-gray-300"
                }`}
              >
                {paymentMethod === "cash" && (
                  <div className="w-3 h-3 rounded-full bg-brand" />
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Promo Code */}
        <button
          onClick={() => setShowPromo(!showPromo)}
          className="w-full mt-4 flex items-center justify-between bg-white rounded-xl border border-gray-100 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Tag size={18} className="text-olive" />
            <span className="text-sm font-medium">
              {promoApplied ? `Promo applied: ${promoCode.toUpperCase()}` : "Add a promo code"}
            </span>
          </div>
          <ChevronRight size={16} className="text-muted" />
        </button>

        {showPromo && !promoApplied && (
          <div className="mt-2 bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand"
              />
              <button
                onClick={handleApplyPromo}
                className="px-4 py-2.5 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-light transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-red-500 text-xs mt-2">{promoError}</p>
            )}
            <p className="text-xs text-muted mt-2">Try: SIP10 for 10% off</p>
          </div>
        )}

        {/* Order Summary */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-4 space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-olive">Subtotal</span>
            <span>Rs.{totalPrice}/-</span>
          </div>
          {tip > 0 && (
            <div className="flex justify-between">
              <span className="text-olive">Tips ({tip}%)</span>
              <span>Rs.{tipAmount}/-</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-olive">Service fee</span>
            <span>Rs.{serviceFee}/-</span>
          </div>
          <div className="flex justify-between">
            <span className="text-olive">GST</span>
            <span>Rs.{gst}/-</span>
          </div>
          {promoApplied && (
            <div className="flex justify-between text-green-600">
              <span>Discount (10%)</span>
              <span>-Rs.{discount}/-</span>
            </div>
          )}
          <div className="border-t border-gray-100 pt-2.5 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-olive">Rs.{finalTotal}/-</span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          className="w-full mt-6 bg-brand text-white py-3.5 rounded-xl font-medium text-sm hover:bg-brand-light transition-colors cursor-pointer"
        >
          Pay by {paymentMethod}
        </button>

        <p className="text-center text-xs text-muted mt-4">
          By continuing, I agree to the{" "}
          <span className="text-olive">User Terms</span> and{" "}
          <span className="text-olive">Privacy Policy</span>.
        </p>
        <p className="text-center text-xs text-muted mt-2">
          Secure payments with SIP
        </p>
      </div>
    </div>
  );
}
