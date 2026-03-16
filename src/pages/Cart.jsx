import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const [tip, setTip] = useState(0);
  const [orderNotes, setOrderNotes] = useState("");

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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <button onClick={() => navigate("/")} className="cursor-pointer">
            <X size={20} className="text-dark" />
          </button>
          <p className="font-bold text-dark">SIP</p>
          <div className="w-5" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted text-sm mb-4">Your order is empty</p>
            <Link
              to="/"
              className="text-dark font-semibold text-sm underline"
            >
              Browse menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <button onClick={() => navigate("/")} className="cursor-pointer">
          <X size={20} className="text-dark" />
        </button>
        <p className="font-bold text-dark">SIP</p>
        <div className="w-5" />
      </div>

      <div className="max-w-3xl mx-auto px-5 pt-6">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-dark">SIP</h1>
          <p className="text-muted text-sm mt-0.5">Table 1</p>
        </div>

        {/* Items */}
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-dark text-sm leading-tight">
                  {item.name}
                </h3>
                <p className="text-muted text-xs mt-0.5">
                  Rs.{item.price}/-
                </p>
                <p className="text-muted text-xs mt-0.5 line-clamp-1">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center shrink-0">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-dark cursor-pointer hover:bg-bg transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-7 text-center text-sm font-semibold text-dark">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-dark cursor-pointer hover:bg-bg transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tip + Notes */}
        <div className="mt-8 border border-border rounded-2xl p-5">
          <p className="font-semibold text-dark text-sm mb-3">Add a tip</p>
          <div className="flex gap-2">
            {tipOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTip(opt.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  tip === opt.value
                    ? "bg-dark text-white"
                    : "bg-white text-dark border border-border hover:border-dark/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="font-semibold text-dark text-sm mt-5 mb-2">
            Order notes
          </p>
          <textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="Add any notes for your order"
            rows={2}
            className="w-full px-4 py-3 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10 resize-none"
          />
        </div>

        {/* Totals */}
        <div className="mt-6 space-y-2 text-sm">
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
      </div>

      {/* Go to checkout */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-border">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/checkout"
            state={{ tip, tipAmount, serviceFee, gst, grandTotal, orderNotes }}
            className="block w-full bg-dark text-white text-center py-4 rounded-full font-semibold text-[15px] hover:bg-dark/90 transition-colors"
          >
            Go to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
