import { Link } from "react-router-dom";

export default function MenuCard({ item }) {
  return (
    <Link
      to={`/item/${item.id}`}
      className="block shrink-0 w-[220px] sm:w-auto"
    >
      <div className="rounded-xl overflow-hidden bg-bg">
        <img
          src={item.image}
          alt={item.name}
          className="w-full aspect-[4/3] object-cover"
          loading="lazy"
        />
      </div>
      <div className="pt-3 pb-1">
        <h3 className="font-semibold text-[15px] text-dark leading-tight">
          {item.name}
        </h3>
        <p className="text-muted text-[13px] mt-1 leading-relaxed line-clamp-3">
          {item.description}
        </p>
        <p className="font-bold text-dark text-[15px] mt-2">
          Rs.{item.price}/-
        </p>
      </div>
    </Link>
  );
}
