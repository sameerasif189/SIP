import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function MenuCard({ item, index = 0 }) {
  if (item.price === null) return null;

  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
    >
      <Link
        to={`/item/${item.id}`}
        className="flex items-start gap-4 py-5 border-b border-gray-100 cursor-pointer group"
      >
        {/* Text content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] text-gray-900 item-name-font leading-snug">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 subtext-font mt-1 leading-relaxed line-clamp-2">
            {item.description}
          </p>
          <p className="text-sm text-dark mt-1 price-font">
            Rs.{item.price}/-
          </p>
        </div>

        {/* Image thumbnail */}
        <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(item);
            }}
            className="absolute bottom-1.5 right-1.5 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Plus size={16} className="text-dark" />
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
