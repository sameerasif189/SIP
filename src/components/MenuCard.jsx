import { Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function MenuCard({ item, variant = "card" }) {
  const { items, addItem, updateQuantity } = useCart();
  const inCart = items.find((i) => i.id === item.id);

  if (variant === "list") {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-brand text-sm">{item.name}</h3>
          <p className="text-muted text-xs mt-1 line-clamp-2">
            {item.description}
          </p>
          <p className="text-brand font-semibold text-sm mt-2">
            Rs.{item.price}/-
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {inCart ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, inCart.quantity - 1)}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Minus size={12} />
              </button>
              <span className="text-sm font-semibold w-5 text-center">
                {inCart.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, inCart.quantity + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(item)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-olive/10 text-olive hover:bg-olive/20 transition-colors cursor-pointer"
            >
              <Plus size={14} />
            </button>
          )}
        </div>
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 rounded-lg object-cover shrink-0"
            loading="lazy"
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-3.5">
        <h3 className="font-semibold text-brand text-sm">{item.name}</h3>
        <p className="text-muted text-xs mt-1 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-brand text-sm">
            Rs.{item.price}/-
          </span>
          {inCart ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, inCart.quantity - 1)}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Minus size={12} />
              </button>
              <span className="text-xs font-semibold w-4 text-center">
                {inCart.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, inCart.quantity + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(item)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-olive/10 text-olive hover:bg-olive/20 transition-colors cursor-pointer"
            >
              <Plus size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
