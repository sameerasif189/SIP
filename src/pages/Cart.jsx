import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const [tip, setTip] = useState(5);
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
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="font-semibold text-xl mb-2">Your cart is empty</h2>
          <p className="text-muted text-sm mb-6">Add some items from our menu</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-light transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/menu" className="p-1 text-muted hover:text-brand transition-colors">
            <X size={20} />
          </Link>
          <h1 className="font-semibold">SIP</h1>
          <div className="w-5" />
        </div>

        <p className="text-sm text-muted mb-4">Table 1</p>

        {/* Cart Items */}
        <div className="space-y-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 border border-gray-100 flex gap-3 items-start"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-sm text-brand">
                      {item.name}
                    </h3>
                    <p className="text-sm text-olive font-medium">
                      Rs.{item.price}/-
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tip Section */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-sm mb-3">Add a tip</h3>
          <div className="flex gap-2">
            {tipOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTip(opt.value)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  tip === opt.value
                    ? "bg-brand text-white"
                    : "bg-gray-100 text-brand hover:bg-gray-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Order Notes */}
        <div className="mt-4 bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-sm mb-2">Order notes</h3>
          <textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="Add any notes for your order"
            rows={3}
            className="w-full text-sm border border-gray-100 rounded-lg p-3 bg-gray-50 focus:outline-none focus:border-gray-300 resize-none"
          />
        </div>

        {/* Add More Items */}
        <Link
          to="/menu"
          className="flex items-center gap-2 mt-4 text-sm text-brand font-medium hover:text-olive transition-colors"
        >
          <Plus size={14} />
          Add items
        </Link>

        {/* Summary */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-4 space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Service fee (1%)</span>
            <span className="text-olive">Rs.{serviceFee}/-</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">GST (5%)</span>
            <span className="text-olive">Rs.{gst}/-</span>
          </div>
          {tip > 0 && (
            <div className="flex justify-between">
              <span className="text-muted">Tips ({tip}%)</span>
              <span className="text-olive">Rs.{tipAmount}/-</span>
            </div>
          )}
          <div className="border-t border-gray-100 pt-2.5 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-olive">Rs.{grandTotal}/-</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Link
          to="/checkout"
          state={{ tip, tipAmount, serviceFee, gst, grandTotal, orderNotes }}
          className="block mt-6 bg-brand text-white text-center py-3.5 rounded-xl font-medium text-sm hover:bg-brand-light transition-colors"
        >
          Go to checkout
        </Link>
      </div>
    </div>
  );
}
