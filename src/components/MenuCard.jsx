import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MenuCard({ item, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link
        to={`/item/${item.id}`}
        className="block shrink-0 w-[200px] sm:w-auto group"
      >
        <div className="rounded-2xl overflow-hidden bg-bg">
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full aspect-[4/3] object-cover"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="pt-3 pb-2">
          <h3 className="font-semibold text-[15px] lg:text-base text-dark leading-tight group-hover:text-sip transition-colors">
            {item.name}
          </h3>
          <p className="text-muted text-[13px] lg:text-sm mt-1.5 leading-relaxed line-clamp-3">
            {item.description}
          </p>
          <p className="font-black text-dark text-[15px] lg:text-base mt-2.5">
            Rs.{item.price}/-
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
