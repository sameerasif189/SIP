import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { menuData } from "../data/menu";
import { useCart } from "../context/CartContext";
import MenuCard from "../components/MenuCard";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const allItems = menuData.flatMap((c) => c.items);
  const item = allItems.find((i) => i.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(
    item?.options?.[0] || null
  );

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Item not found.</p>
      </div>
    );
  }

  const totalPrice = item.price * quantity;

  // Get "frequently bought together" — other items from same category
  const category = menuData.find((c) =>
    c.items.some((i) => i.id === item.id)
  );
  const related = category
    ? category.items.filter((i) => i.id !== item.id).slice(0, 4)
    : [];

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        ...item,
        selectedOption,
        // Use a unique id if option selected so different options are separate cart items
        id: selectedOption ? `${item.id}-${selectedOption}` : item.id,
        name: selectedOption ? `${item.name} (${selectedOption})` : item.name,
      });
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Image */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-[280px] sm:h-[380px] object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-bg transition-colors"
        >
          <ArrowLeft size={18} className="text-dark" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 pt-6">
        <h1 className="text-2xl font-bold text-dark">{item.name}</h1>
        <p className="text-lg font-bold text-dark/70 mt-1">
          Rs.{item.price}/-
        </p>
        <p className="text-muted text-[15px] mt-3 leading-relaxed">
          {item.description}
        </p>

        {/* Options */}
        {item.options && item.options.length > 0 && (
          <div className="mt-6">
            <p className="font-semibold text-dark text-sm mb-3">
              Type of eggs
            </p>
            <div className="flex gap-2 flex-wrap">
              {item.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedOption(opt)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    selectedOption === opt
                      ? "bg-dark text-white"
                      : "bg-white text-dark border border-border hover:border-dark/30"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mt-6">
          <div className="inline-flex items-center bg-bg rounded-full">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center text-dark cursor-pointer hover:bg-border rounded-full transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center font-semibold text-dark">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center text-dark cursor-pointer hover:bg-border rounded-full transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Frequently bought together */}
        {related.length > 0 && (
          <div className="mt-10 border-t border-border pt-6">
            <h3 className="font-bold text-dark text-lg mb-4">
              Frequently bought together
            </h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {related.map((r) => (
                <div key={r.id} className="w-[180px] shrink-0">
                  <MenuCard item={r} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky add to order button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-border sm:px-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleAdd}
            className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer hover:bg-dark/90 transition-colors"
          >
            Add {quantity} to order · Rs.{totalPrice}/-
          </button>
        </div>
      </div>
    </div>
  );
}
