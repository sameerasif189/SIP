import { useState } from "react";
import { Plus, Minus, ImageOff } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function MenuCard({ item }) {
  const { items, addItem, updateQuantity } = useCart();
  const inCart = items.find((i) => i.id === item.id);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-black/5 hover:border-sip/30 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sip-bg">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center bg-sip-bg">
            <ImageOff size={24} className="text-sip/30" />
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        {/* Price Badge */}
        <div className="absolute bottom-2 left-2 bg-dark/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          Rs.{item.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-dark text-sm leading-tight">
          {item.name}
        </h3>
        <p className="text-dark-muted text-xs mt-1 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Add / Quantity */}
        <div className="mt-3">
          {inCart ? (
            <div className="flex items-center justify-between bg-sip/10 rounded-xl px-1 py-1">
              <button
                onClick={() => updateQuantity(item.id, inCart.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-dark shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Minus size={13} />
              </button>
              <span className="text-sm font-bold text-sip-dark">
                {inCart.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, inCart.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-sip text-dark shadow-sm hover:bg-sip-dark transition-colors cursor-pointer"
              >
                <Plus size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(item)}
              className="w-full flex items-center justify-center gap-1.5 bg-sip/15 hover:bg-sip/25 text-sip-dark py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Plus size={13} />
              Add to order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
