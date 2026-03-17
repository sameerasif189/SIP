import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function DrinkRow({ item, index = 0 }) {
  if (item.price === null) {
    // Non-orderable item (like Tier 1 - ask barista)
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.3, delay: index * 0.04 }}
        className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-border bg-bg/50"
      >
        <div className="flex flex-col flex-1 gap-1 min-w-0">
          <h3 className="text-base lg:text-lg text-dark line-clamp-2 item-name-font">
            {item.name}
          </h3>
          <p className="text-sm text-muted line-clamp-2 subtext-font">
            {item.description}
          </p>
        </div>
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-xl shrink-0"
          loading="lazy"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link
        to={`/item/${item.id}`}
        className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-border bg-white hover:shadow-md transition-shadow group"
      >
        <div className="flex flex-col flex-1 gap-1 min-w-0">
          <h3 className="text-base lg:text-lg text-dark line-clamp-2 group-hover:text-dark/70 transition-colors item-name-font">
            {item.name}
          </h3>
          <p className="text-sm text-muted line-clamp-1 subtext-font">
            {item.description}
          </p>
          <p className="mt-auto text-base text-dark pt-1 price-font">
            Rs.{item.price}/-
          </p>
        </div>
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-xl shrink-0"
          loading="lazy"
        />
      </Link>
    </motion.div>
  );
}
