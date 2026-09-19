import { X, Package, Trash2, ArrowRight, Tag, Lock } from "lucide-react";
import { NAVY, TEAL } from "../../constants/brand";
import type { CartItem } from "../../types/marketplace";

export function CartPanel({
  isOpen,
  onClose,
  cartItems,
  onRemove,
  onQuantityChange,
  onCheckout,
}: {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (index: number) => void;
  onQuantityChange: (index: number, delta: number) => void;
  onCheckout: () => void;
}) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-card shadow-2xl z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="text-white px-5 py-4 flex items-center justify-between" style={{ backgroundColor: NAVY }}>
          <h2 className="text-lg font-bold">Your Cart ({cartItems.length})</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8">
            <Package className="w-12 h-12 text-muted-foreground/40" />
            <p className="font-semibold text-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add services from the catalog to get started.</p>
            <button onClick={onClose} className="mt-2 flex items-center gap-1.5 text-sm font-semibold hover:underline" style={{ color: TEAL }}>
              Browse services <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-3 space-y-px">
              {cartItems.map((item, i) => (
                <div key={i} className="px-5 py-3 hover:bg-muted/40 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground leading-tight">{item.serviceName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.tierName} plan</p>
                      <p className="text-sm font-bold text-foreground mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {item.price === 0 ? "Free" : `$${item.price.toFixed(2)}${item.period}`}
                      </p>
                    </div>
                    <button onClick={() => onRemove(i)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-5 space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})</span>
                  <span className="font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>${total.toFixed(2)}/mo</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> First month discount
                  </span>
                  <span className="text-green-600 font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>-$0.00</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline border-t border-border pt-3">
                <span className="font-bold text-foreground">Monthly Total</span>
                <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => { onClose(); onCheckout(); }}
                className="w-full py-3 rounded text-white font-bold text-sm transition-colors hover:opacity-90 active:scale-[0.99] flex items-center justify-center gap-2"
                style={{ backgroundColor: TEAL }}
              >
                <Lock className="w-4 h-4" /> Proceed to Checkout
              </button>
              <button className="w-full py-2 rounded border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
