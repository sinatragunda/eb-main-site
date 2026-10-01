import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ShoppingCart,
  Search,
  Check,
  ChevronDown,
  Bell,
  UserCircle,
  KeyRound,
  LayoutGrid,
} from "lucide-react";
import { GOLD, NAVY, TEAL } from "../constants/brand";
import type { PricingTier } from "../types/marketplace";
import { SERVICES } from "../data/services";
import { CATEGORIES, SORT_OPTIONS } from "../data/categories";
import { ServiceCard } from "../components/marketplace/ServiceCard";
import { CartPanel } from "../components/marketplace/CartPanel";
import { AccountPanel } from "../components/account/AccountPanel";
import { LoginPanel } from "../components/account/LoginPanel";
import { useCart } from "@/app/context/CartContext.tsx";

type MarketplaceLocationState = {
  openAccount?: boolean;
};

export function MarketplacePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, addCartItem, removeCartItem, resetCartItems } = useCart();
  const locationState = (location.state as MarketplaceLocationState | null) ?? null;

  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(Boolean(locationState?.openAccount));
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    if (locationState?.openAccount) {
      setAccountOpen(true);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [locationState, location.pathname, navigate]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const handleAddToCart = useCallback((serviceId: string, tier: PricingTier) => {
    addCartItem(serviceId, tier);
    setCartOpen(true);
  }, [addCartItem]);

  const handleRemove = useCallback((index: number) => {
    removeCartItem(index);
  }, [removeCartItem]);

  const handleCheckout = useCallback(() => {
    setCartOpen(false);
    navigate("/checkout");
  }, [navigate]);

  const filteredServices = useMemo(() => {
    let list = SERVICES.filter((s) => {
      const matchCat = selectedCategory === "All" || s.category === selectedCategory;
      const matchSearch =
        debouncedSearch === "" ||
        s.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        s.category.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        s.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sortBy === "Price: Low to High") list = [...list].sort((a, b) => a.tiers[0].price - b.tiers[0].price);
    else if (sortBy === "Price: High to Low") list = [...list].sort((a, b) => b.tiers[2].price - a.tiers[2].price);
    else if (sortBy === "Highest Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [selectedCategory, sortBy, debouncedSearch]);

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Secondary utility bar */}
      <div style={{ backgroundColor: NAVY }} className="text-white/70 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button onClick={() => navigate("/")} className="hover:text-white transition-colors">Home</button>
            {["Financial Services", "Insurance", "Capital Markets"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-5">
            {["About Us", "Newsroom", "Contact Us"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-white border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 mr-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: NAVY }}>
              <span className="text-white font-bold text-xs">EE</span>
            </div>
            <span className="font-bold text-base hidden sm:block" style={{ color: NAVY }}>BFSI Vainona</span>
          </button>

          <div className="flex-1 max-w-xl">
            <div className="flex rounded border border-border overflow-hidden bg-white">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button className="bg-muted px-3 flex items-center justify-center hover:bg-border transition-colors border-l border-border">
                <Search className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: NAVY }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TEAL }} />
            Live Environment
          </div>

          <div className="flex items-center gap-1 ml-auto">
            <button onClick={() => setSelectedCategory("All")} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded hover:bg-muted">
              <LayoutGrid className="w-5 h-5" />
              <span className="text-sm hidden sm:block">Services</span>
            </button>
            <button onClick={() => setLoginOpen(true)} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded hover:bg-muted">
              <KeyRound className="w-5 h-5" />
              <span className="text-sm hidden sm:block">Login</span>
            </button>
            <button onClick={() => setAccountOpen(true)} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded hover:bg-muted">
              <UserCircle className="w-5 h-5" />
              <span className="text-sm hidden sm:block">Account</span>
            </button>
            <button onClick={() => setCartOpen(true)} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors relative px-2.5 py-1.5 rounded hover:bg-muted">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-white text-[10px] font-bold rounded-full flex items-center justify-center" style={{ backgroundColor: TEAL }}>
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span className="text-sm hidden sm:block">Cart</span>
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category bar */}
        <div className="border-t border-border bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none py-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap transition-colors ${
                    selectedCategory === cat ? "font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  style={selectedCategory === cat ? { backgroundColor: "#ddf0f4", color: TEAL } : undefined}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero banner */}
        <div className="rounded-lg bg-white border border-border p-5 mb-6 flex items-center justify-between gap-4 shadow-sm overflow-hidden relative">
          {/* Gold accent bar on left edge */}
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" style={{ backgroundColor: GOLD }} />
          <div className="pl-3">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Marketplace · All-in-one platform
            </p>
            <h1 className="text-xl font-bold text-foreground mb-1">Frequently Used Services</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-xs">
              {["No contracts", "Cancel anytime", "Free tier available", "24/7 support"].map((p) => (
                <span key={p} className="flex items-center gap-1.5 text-muted-foreground">
                  <Check className="w-3.5 h-3.5" style={{ color: TEAL }} /> {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredServices.length}</span> service{filteredServices.length !== 1 ? "s" : ""}
            {selectedCategory !== "All" && <span> in <span className="font-semibold text-foreground">{selectedCategory}</span></span>}
          </p>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Sort: {sortBy}
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {showSortDropdown && (
              <>
                {/* Backdrop — closes dropdown on any outside click */}
                <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setShowSortDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors ${sortBy === opt ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="font-semibold text-foreground mb-1">No services found</p>
            <p className="text-sm text-muted-foreground">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} onAddToCart={handleAddToCart} cartItems={cartItems} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {[
              { title: "Platform", links: ["Pricing", "Documentation", "Changelog", "Status"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"] },
              { title: "Support", links: ["Help Center", "Community", "Contact Us", "Service SLAs"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="font-bold text-foreground mb-3">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>©2026 Everyday Banking Company | Vainona Research Company. All Rights Reserved.</span>
            <span className="hover:text-foreground cursor-pointer">Contact Us | Report a Problem?</span>
          </div>
        </div>
      </footer>

      <AccountPanel isOpen={accountOpen} onClose={() => setAccountOpen(false)} />
      <CartPanel
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        resetCartItems={resetCartItems}
        onRemove={handleRemove}
        onQuantityChange={() => {}}
        onCheckout={handleCheckout}
      />
      <LoginPanel
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => setLoginOpen(false)}
      />
    </div>
  );
}
