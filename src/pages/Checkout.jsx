import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: details, 2: payment, 3: confirmation
  const [orderType, setOrderType] = useState("dine-in");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  if (items.length === 0 && step !== 3) {
    navigate("/cart");
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setStep(3);
    clearCart();
  };

  const paymentMethods = [
    {
      id: "cash",
      label: "Cash on Delivery",
      desc: "Pay when you receive your order",
      icon: Banknote,
    },
    {
      id: "card",
      label: "Credit/Debit Card",
      desc: "Visa, Mastercard, UnionPay",
      icon: CreditCard,
    },
    {
      id: "jazzcash",
      label: "JazzCash",
      desc: "Pay via JazzCash mobile wallet",
      icon: Smartphone,
    },
    {
      id: "easypaisa",
      label: "Easypaisa",
      desc: "Pay via Easypaisa mobile wallet",
      icon: Smartphone,
    },
  ];

  // Confirmation screen
  if (step === 3) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="font-[var(--font-display)] text-3xl font-bold mb-3">
            Order Placed!
          </h2>
          <p className="text-brand-light/60 mb-2">
            Thank you, {formData.name || "Guest"}! Your order has been
            received.
          </p>
          <p className="text-brand-light/60 mb-8 text-sm">
            Order #{Math.floor(100000 + Math.random() * 900000)} &middot;{" "}
            {orderType === "dine-in"
              ? "Dine-in"
              : orderType === "takeaway"
              ? "Takeaway"
              : "Delivery"}
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-xl font-semibold transition-all"
          >
            Order More
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-brand-light/60 hover:text-accent mb-6 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </Link>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-8">
          {["Details", "Payment"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step > i + 1
                    ? "bg-green-600 text-white"
                    : step === i + 1
                    ? "bg-accent text-white"
                    : "bg-cream-dark text-brand-light/40"
                }`}
              >
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  step === i + 1 ? "text-brand" : "text-brand-light/40"
                }`}
              >
                {label}
              </span>
              {i < 1 && (
                <div className="w-12 h-0.5 bg-cream-dark mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Customer Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Order Type</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "dine-in", label: "Dine-in" },
                  { id: "takeaway", label: "Takeaway" },
                  { id: "delivery", label: "Delivery" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setOrderType(type.id)}
                    className={`py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      orderType === type.id
                        ? "bg-accent text-white"
                        : "bg-cream text-brand-light hover:bg-cream-dark"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Your Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-light/70 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:outline-none focus:border-accent text-sm transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-light/70 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 3XX XXXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:outline-none focus:border-accent text-sm transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-light/70 mb-1.5">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:outline-none focus:border-accent text-sm transition-colors"
                  />
                </div>
                {orderType === "delivery" && (
                  <div>
                    <label className="block text-sm font-medium text-brand-light/70 mb-1.5">
                      Delivery Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your full delivery address"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:outline-none focus:border-accent text-sm transition-colors resize-none"
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-brand-light/70 mb-1.5">
                    Special Instructions
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requests or notes..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:outline-none focus:border-accent text-sm transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.name || !formData.phone}
              className="w-full bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition-all text-sm cursor-pointer"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-brand-light/70">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      Rs. {item.price * item.quantity}
                    </span>
                  </div>
                ))}
                <div className="border-t border-cream-dark pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-accent">
                    Rs. {totalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left cursor-pointer ${
                      paymentMethod === method.id
                        ? "border-accent bg-accent/5"
                        : "border-cream-dark hover:border-accent/50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        paymentMethod === method.id
                          ? "bg-accent text-white"
                          : "bg-cream text-brand-light"
                      }`}
                    >
                      <method.icon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{method.label}</p>
                      <p className="text-brand-light/50 text-xs">
                        {method.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3.5 rounded-xl border-2 border-cream-dark text-brand-light font-semibold text-sm hover:border-accent hover:text-accent transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={!paymentMethod}
                className="flex-1 bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition-all text-sm cursor-pointer"
              >
                Place Order - Rs. {totalPrice}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
