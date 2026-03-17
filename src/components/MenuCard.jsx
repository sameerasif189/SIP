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
        className="block shrink-0 w-[180px] sm:w-auto group"
      >
        <div className="rounded-xl overflow-hidden bg-bg">
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full aspect-[4/3] object-cover"
            loading="lazy"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="pt-2.5 pb-1">
          <h3 className="font-semibold text-[13px] text-dark leading-snug">
            {item.name}
          </h3>
          <p className="text-muted text-[11px] mt-1 leading-snug line-clamp-2">
            {item.description}
          </p>
          <p className="font-bold text-dark text-sm mt-2">
            Rs.{item.price}/-
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
