import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag size={64} className="mx-auto text-brand-light/30 mb-6" />
          <h2 className="font-[var(--font-display)] text-3xl font-bold mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-brand-light/60 mb-8">
            Looks like you haven't added anything yet. Explore our menu!
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-xl font-semibold transition-all"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-brand-light/60 hover:text-accent mb-6 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>

        <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold mb-8">
          Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex gap-4 items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-brand truncate">
                  {item.name}
                </h3>
                <p className="text-accent font-bold text-sm mt-1">
                  Rs. {item.price}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-cream hover:bg-cream-dark transition-colors cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-semibold text-sm w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-cream hover:bg-cream-dark transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-brand">
                  Rs. {item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-3 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-light/60">Subtotal</span>
              <span className="font-medium">Rs. {totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-light/60">Delivery Fee</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="border-t border-cream-dark pt-3 flex justify-between text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold text-accent">Rs. {totalPrice}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="block w-full mt-6 bg-accent hover:bg-accent-dark text-white text-center py-3.5 rounded-xl font-semibold transition-all text-sm"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
