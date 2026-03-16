import { useState } from "react";
import { Plus, Minus, ImageOff } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function MenuCard({ item }) {
  const { items, addItem, updateQuantity } = useCart();
  const inCart = items.find((i) => i.id === item.id);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group glass-card rounded-2xl hover:shadow-2xl hover:shadow-sip/10 dark:hover:shadow-sip/5 transition-all duration-300 overflow-hidden hover:scale-[1.02]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sip-bg dark:bg-dark-soft">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff size={24} className="text-sip/30" />
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Price Badge — frosted glass */}
        <div className="absolute bottom-2.5 left-2.5 glass-white text-white text-xs font-[var(--font-heading)] font-bold px-3 py-1.5 rounded-lg">
          Rs. {item.price}
        </div>

        {/* Quick add on hover */}
        {!inCart && (
          <button
            onClick={() => addItem(item)}
            className="absolute top-2.5 right-2.5 w-9 h-9 glass-white hover:bg-sip hover:border-sip/50 text-white hover:text-dark rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer scale-90 group-hover:scale-100"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        )}

        {/* Cart quantity badge */}
        {inCart && (
          <div className="absolute top-2.5 right-2.5 bg-sip text-dark text-xs font-bold w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-sip/30">
            {inCart.quantity}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4">
        <h3 className="font-[var(--font-heading)] font-bold text-dark dark:text-white text-[13px] sm:text-sm leading-tight line-clamp-1">
          {item.name}
        </h3>
        <p className="text-dark-muted dark:text-white/40 text-[11px] sm:text-xs mt-1.5 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Add / Quantity */}
        <div className="mt-3">
          {inCart ? (
            <div className="flex items-center justify-between glass-card dark:!bg-white/5 rounded-xl px-1.5 py-1.5">
              <button
                onClick={() => updateQuantity(item.id, inCart.quantity - 1)}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white dark:bg-dark text-dark dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-dark-soft transition-colors cursor-pointer"
              >
                <Minus size={13} />
              </button>
              <span className="text-sm font-[var(--font-heading)] font-bold text-sip-dark dark:text-sip-light">
                {inCart.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, inCart.quantity + 1)}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-sip text-dark shadow-sm hover:bg-sip-dark transition-colors cursor-pointer"
              >
                <Plus size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(item)}
              className="w-full flex items-center justify-center gap-1.5 bg-dark dark:bg-white/10 hover:bg-sip-dark dark:hover:bg-sip hover:text-dark text-white py-2.5 rounded-xl text-xs font-[var(--font-heading)] font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Plus size={13} />
              Add to Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
