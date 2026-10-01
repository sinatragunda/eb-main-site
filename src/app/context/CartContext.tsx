import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { CartItem, PricingTier } from "../types/marketplace";
import { SERVICES } from "@/app/data/services.tsx";
import { authService } from "../services/http";

export const CORE_BANKING_SERVICE_ID = "core-banking";

type CartContextValue = {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  resetCartItems: () => void;
  removeCartItem: (index: number) => void;
  addCartItem: (serviceId: string, tier: PricingTier) => void;
  isLoggedIn: () => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

function getDefaultCartItems(): CartItem[] {
  return SERVICES.filter((s) => s.id === CORE_BANKING_SERVICE_ID).map((s) => {
    const tier: PricingTier = s.tiers[0];
    return {
      serviceId: s.id,
      serviceName: s.name,
      tierName: tier.name,
      price: tier.price,
      period: tier.period,
    };
  });
}

function ensureCoreBanking(items: CartItem[]): CartItem[] {
  if (items.some((item) => item.serviceId === CORE_BANKING_SERVICE_ID)) {
    return items.length === 0 ? getDefaultCartItems() : items;
  }
  return [...getDefaultCartItems(), ...items];
}

function toCartItem(serviceId: string, tier: PricingTier): CartItem | null {
  const service = SERVICES.find((s) => s.id === serviceId);
  if (!service) return null;
  return {
    serviceId: service.id,
    serviceName: service.name,
    tierName: tier.name,
    price: tier.price,
    period: tier.period,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(getDefaultCartItems);

  const resetCartItems = useCallback(() => {
    setCartItems(getDefaultCartItems());
  }, []);

  const removeCartItem = useCallback((index: number) => {
    setCartItems((prev) => {
      const target = prev[index];
      if (!target || target.serviceId === CORE_BANKING_SERVICE_ID) {
        return ensureCoreBanking(prev);
      }
      return ensureCoreBanking(prev.filter((_, i) => i !== index));
    });
  }, []);

  const isLoggedIn = useCallback(() => authService.isAuthenticated(), []);

  const addCartItem = useCallback((serviceId: string, tier: PricingTier) => {
    const next = toCartItem(serviceId, tier);
    if (!next) return;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((c) => c.serviceId === serviceId);
      if (existingIndex === -1) {
        return ensureCoreBanking([...prev, next]);
      }

      if (prev[existingIndex].tierName === tier.name) {
        return prev;
      }

      const updated = [...prev];
      updated[existingIndex] = next;
      return ensureCoreBanking(updated);
    });
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, resetCartItems, removeCartItem, addCartItem, isLoggedIn }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
