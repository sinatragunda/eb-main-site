import { useState, memo } from "react";
import { Check } from "lucide-react";
import { MIST, NAVY, TEAL } from "../../constants/brand";
import type { Service, PricingTier, CartItem } from "../../types/marketplace";
import { StarRating } from "./StarRating";

export const ServiceCard = memo(function ServiceCard({
  service,
  onAddToCart,
  cartItems,
}: {
  service: Service;
  onAddToCart: (serviceId: string, tier: PricingTier) => void;
  cartItems: CartItem[];
}) {
  const [selectedTier, setSelectedTier] = useState(
    service.tiers.findIndex((t) => t.popular) >= 0 ? service.tiers.findIndex((t) => t.popular) : 0
  );

  const tier = service.tiers[selectedTier];
  const cartItemForService = cartItems.find((c) => c.serviceId === service.id);
  const isCurrentTierInCart = cartItemForService?.tierName === tier.name;
  const canSwitchPlan = Boolean(cartItemForService && !isCurrentTierInCart);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: MIST, color: TEAL }}>
              {service.icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm leading-tight">{service.name}</h3>
              <span className="text-xs text-muted-foreground">{service.category}</span>
            </div>
          </div>
          {service.badge && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
              service.badge === "New" ? "bg-blue-100 text-blue-700"
              : service.badge === "Best Seller" ? "text-white"
              : "bg-green-100 text-green-700"
            }`}
            style={service.badge === "Best Seller" ? { backgroundColor: NAVY } : undefined}
            >
              {service.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{service.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={service.rating} />
          <span className="text-xs font-medium" style={{ color: TEAL }}>{service.rating}</span>
          <span className="text-xs text-muted-foreground">({service.reviews.toLocaleString()})</span>
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="flex rounded-md border border-border overflow-hidden">
          {service.tiers.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setSelectedTier(i)}
              className={`flex-1 text-xs py-1.5 font-medium transition-colors relative ${i > 0 ? "border-l border-border" : ""}`}
              style={selectedTier === i
                ? { backgroundColor: NAVY, color: "white" }
                : { backgroundColor: "white", color: "#52708a" }}
            >
              {t.name}
              {t.popular && selectedTier !== i && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: TEAL }} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="flex items-baseline gap-1">
          {tier.price === 0 ? (
            <span className="text-2xl font-bold" style={{ color: TEAL }}>Free</span>
          ) : (
            <>
              <span className="text-2xl font-bold text-foreground">${tier.price.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground">{tier.period}</span>
            </>
          )}
          {tier.popular && (
            <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: MIST, color: TEAL }}>
              Most Popular
            </span>
          )}
        </div>
      </div>

      <div className="px-4 pt-2 pb-3 flex-1">
        <ul className="space-y-1">
          {tier.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="w-3 h-3 flex-shrink-0" style={{ color: TEAL }} />
              {f}
            </li>
          ))}
          {tier.features.length > 4 && (
            <li className="text-xs text-muted-foreground pl-4.5">+{tier.features.length - 4} more</li>
          )}
        </ul>
      </div>

      <div className="px-4 pb-4">
          {service.cartOption !== false && (
            <button
              onClick={() => onAddToCart(service.id, tier)}
              disabled={isCurrentTierInCart}
              className={`w-full py-2 rounded text-sm font-semibold transition-all active:scale-[0.98] ${
                isCurrentTierInCart ? "bg-muted text-muted-foreground cursor-default" : "text-white hover:opacity-90"
              }`}
              style={isCurrentTierInCart ? undefined : { backgroundColor: TEAL }}
            >
              {isCurrentTierInCart ? "✓ Added to cart" : canSwitchPlan ? "Switch Plan" : "Add to Cart"}
            </button>
          )}
      </div>
    </div>
  );
});
