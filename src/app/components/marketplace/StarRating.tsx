import { Star } from "lucide-react";
import { TEAL } from "../../constants/brand";

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5`}
          style={{ fill: s <= Math.round(rating) ? TEAL : "#e5e7eb", color: s <= Math.round(rating) ? TEAL : "#e5e7eb" }}
        />
      ))}
    </div>
  );
}
