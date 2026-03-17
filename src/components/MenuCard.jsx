import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MenuCard({ item, index = 0 }) {
  if (item.price === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
    >
      <Link
        to={`/item/${item.id}`}
        className="block shrink-0 w-56 sm:w-auto bg-white rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-32 object-cover rounded-t-lg"
          loading="lazy"
        />
        <div className="p-3">
          <div className="font-bold text-xs mb-1 text-dark">{item.name}</div>
          <div className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</div>
          <div className="font-bold text-sm text-dark">Rs.{item.price}/-</div>
        </div>
      </Link>
    </motion.div>
  );
}
