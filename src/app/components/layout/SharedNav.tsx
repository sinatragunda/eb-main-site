import { useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { Building2, Search, ShoppingCart } from "lucide-react";
import { NAVY, TEAL } from "../../constants/brand";
import { LoginPanel } from "../account/LoginPanel";
import { AuthService } from "@/app/services/http";
import { AccountPanel } from "@/app/components/account/AccountPanel.tsx";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "First Steps", to: "/first-steps" },
  { label: "Single-Family Banking", to: "/single-family" },
  { label: "Multifamily Business", to: "/" },
  { label: "Capital Markets", to: undefined },
  { label: "Marketplace", to: "/marketplace" },
] as const;

export type SharedNavMarketplace = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  cartCount: number;
  onCartOpen: () => void;
  onAccountOpen: () => void;
  categoryBar?: ReactNode;
};

type SharedNavProps = {
  marketplace?: SharedNavMarketplace;
};

export function SharedNav({ marketplace }: SharedNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [accountOpen, setAccountOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const onLoginSuccess = () => {
    AuthService.me().then(
      (userDetails) => {
        localStorage.setItem("eb_user_details", JSON.stringify(userDetails));
        setLoginOpen(false);
        setAccountOpen(true);
        navigate("/marketplace");
      },
      (error) => {
        console.log(error);
        setLoginOpen(true);
      },
    );
  };

  const activePage =
    location.pathname === "/single-family"
      ? "Single-Family Banking"
      : location.pathname === "/first-steps"
        ? "First Steps"
        : location.pathname === "/marketplace"
          ? "Marketplace"
          : location.pathname === "/"
            ? "Multifamily Business"
            : "";

  return (
    <>
      <nav className="sticky top-0 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-2.5 flex items-center gap-3 md:gap-5">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: NAVY }}>
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm leading-tight block" style={{ color: NAVY }}>
                BFSI Vainona
              </span>
              <span className="text-[10px] text-muted-foreground leading-none">BFSI Company of Vainona</span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => item.to && navigate(item.to)}
                className={`text-xs font-medium transition-colors whitespace-nowrap ${
                  activePage === item.label
                    ? "font-semibold border-b-2 pb-0.5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={
                  activePage === item.label
                    ? { color: NAVY, borderColor: TEAL }
                    : undefined
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          {marketplace ? (
            <div className="flex-1 min-w-0 max-w-md">
              <div className="flex rounded border border-border overflow-hidden bg-white">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={marketplace.searchQuery}
                  onChange={(e) => marketplace.onSearchChange(e.target.value)}
                  className="flex-1 min-w-0 px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  className="bg-muted px-3 flex items-center justify-center hover:bg-border transition-colors border-l border-border"
                >
                  <Search className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1" />
          )}

          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            {marketplace && (
              <>
                <button
                  onClick={marketplace.onAccountOpen}
                  className="hidden sm:inline-flex px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Account
                </button>
                <button
                  onClick={marketplace.onCartOpen}
                  className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Cart</span>
                  {marketplace.cartCount > 0 && (
                    <span
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                      style={{ backgroundColor: TEAL }}
                    >
                      {marketplace.cartCount}
                    </span>
                  )}
                </button>
              </>
            )}
            <button
              onClick={() => setLoginOpen(true)}
              className="px-4 py-1.5 text-sm font-semibold rounded-full border-2 transition-colors hover:opacity-80"
              style={{ borderColor: TEAL, color: TEAL }}
            >
              Login
            </button>
            {!marketplace && (
              <button
                onClick={() => navigate("/marketplace")}
                className="px-4 py-1.5 text-white text-sm font-semibold rounded-full transition-colors hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Client Portal
              </button>
            )}
          </div>
        </div>

        {marketplace?.categoryBar}
      </nav>

      <AccountPanel isOpen={accountOpen} onClose={() => {}} />

      <LoginPanel
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => onLoginSuccess()}
      />
    </>
  );
}
