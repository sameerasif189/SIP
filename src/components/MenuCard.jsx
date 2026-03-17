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
        className="block shrink-0 w-[200px] sm:w-auto group"
      >
        <div className="rounded-lg overflow-hidden bg-bg">
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
          <h3 className="font-bold text-[13px] lg:text-sm text-dark leading-snug tracking-tight">
            {item.name}
          </h3>
          <p className="text-muted text-[11px] lg:text-xs mt-1 leading-snug line-clamp-2 tracking-tight">
            {item.description}
          </p>
          <p className="font-bold text-dark text-sm lg:text-[15px] mt-2 tracking-tight">
            Rs.{item.price}/-
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
