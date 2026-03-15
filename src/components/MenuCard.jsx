import { Plus, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function MenuCard({ item }) {
  const { items, addItem } = useCart();
  const inCart = items.find((i) => i.id === item.id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand font-bold text-sm px-3 py-1 rounded-full">
          Rs. {item.price}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-brand text-lg">{item.name}</h3>
        <p className="text-brand-light/60 text-sm mt-1 line-clamp-2">
          {item.description}
        </p>
        <button
          onClick={() => addItem(item)}
          className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
            inCart
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-accent text-white hover:bg-accent-dark"
          }`}
        >
          {inCart ? (
            <>
              <Check size={16} />
              Add More ({inCart.quantity})
            </>
          ) : (
            <>
              <Plus size={16} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
