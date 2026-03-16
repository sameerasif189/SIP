import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Minus, Plus, Heart } from "lucide-react";
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
  const [liked, setLiked] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Item not found.</p>
      </div>
    );
  }

  const totalPrice = item.price * quantity;

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
        id: selectedOption ? `${item.id}-${selectedOption}` : item.id,
        name: selectedOption ? `${item.name} (${selectedOption})` : item.name,
      });
    }
    navigate("/menu");
  };

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          >
            <ArrowLeft size={18} className="text-dark" />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => setLiked(!liked)}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          >
            <Heart
              size={18}
              className={liked ? "text-red-500 fill-red-500" : "text-dark"}
            />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="max-w-5xl mx-auto px-5 pt-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-dark">{item.name}</h1>
            <p className="text-muted text-[15px] mt-2 leading-relaxed">
              {item.description}
            </p>
          </div>
          <p className="text-xl lg:text-2xl font-black text-dark shrink-0">
            Rs.{item.price}/-
          </p>
        </div>

        {/* Options */}
        <AnimatePresence>
          {item.options && item.options.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <p className="font-semibold text-dark text-sm mb-3">
                Choose your style
              </p>
              <div className="flex gap-2 flex-wrap">
                {item.options.map((opt) => (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedOption(opt)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      selectedOption === opt
                        ? "bg-sip text-white shadow-md shadow-sip/20"
                        : "bg-bg text-dark hover:bg-border"
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quantity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex items-center justify-between"
        >
          <p className="font-semibold text-dark text-sm">Quantity</p>
          <div className="inline-flex items-center bg-bg rounded-xl overflow-hidden">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-11 h-11 flex items-center justify-center text-dark cursor-pointer hover:bg-border transition-colors"
            >
              <Minus size={16} />
            </motion.button>
            <span className="w-10 text-center font-bold text-dark text-lg">
              {quantity}
            </span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setQuantity(quantity + 1)}
              className="w-11 h-11 flex items-center justify-center text-dark cursor-pointer hover:bg-border transition-colors"
            >
              <Plus size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Frequently bought together */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-10 border-t border-border pt-6"
          >
            <h3 className="font-display font-bold italic text-dark text-lg lg:text-xl mb-4">
              You might also like
            </h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {related.map((r, i) => (
                <div key={r.id} className="w-[180px] shrink-0">
                  <MenuCard item={r} index={i} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Sticky add to order */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-md border-t border-border/60 sm:px-6"
      >
        <div className="max-w-5xl mx-auto">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAdd}
            className="w-full bg-sip text-white py-4 rounded-2xl font-semibold text-[15px] cursor-pointer shadow-lg shadow-sip/30 hover:shadow-xl hover:shadow-sip/40 transition-shadow"
          >
            Add {quantity} to order · Rs.{totalPrice}/-
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
