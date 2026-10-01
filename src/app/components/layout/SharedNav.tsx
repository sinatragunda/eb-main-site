import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Search, Building2 } from "lucide-react";
import { NAVY, TEAL } from "../../constants/brand";
import { LoginPanel } from "../account/LoginPanel";
import {authService} from "@/app/services/http";
import {AccountPanel} from "@/app/components/account/AccountPanel.tsx";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Single-Family Banking", to: "/single-family" },
  { label: "Multifamily Business", to: "/" },
  { label: "Capital Markets", to: undefined },
  { label: "Individual & Families", to: undefined },
] as const;

export function SharedNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [accountOpen, setAccountOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const onLoginSuccess = () => {
      authService.me().then((userDetails) => {
          localStorage.setItem('eb_user_details', JSON.stringify(userDetails));
          setLoginOpen(false);
          setAccountOpen(true);
          navigate("/marketplace");
      } ,(error) => {
          console.log(error);
          setLoginOpen(true);
      });
  }

  const activePage =
    location.pathname === "/single-family"
      ? "Single-Family Banking"
      : location.pathname === "/"
        ? "Multifamily Business"
        : "";

  return (
    <>
      <div style={{ backgroundColor: NAVY }} className="text-white/75 text-xs hidden md:block">
        <div className="max-w-screen-xl mx-auto px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => item.to && navigate(item.to)}
                className={`hover:text-white transition-colors ${activePage === item.label ? "text-white font-semibold border-b border-white pb-0.5" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6">
            {["About Us", "Data and Insights", "Newsroom", "Careers", "Contact Us"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-screen-xl mx-auto px-8 py-3.5 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: NAVY }}>
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm leading-tight block" style={{ color: NAVY }}>BFSI Vainona</span>
              <span className="text-[10px] text-muted-foreground leading-none">BFSI Company of Vainona</span>
            </div>
          </button>
          <div className="hidden md:flex items-center gap-6">
            {["Financing Options", "Our Services", "News & Insights", "Learning Center"].map((item) => (
              <a key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
            ))}
            <Search className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            <button
              onClick={() => setLoginOpen(true)}
              className="px-5 py-2 text-sm font-semibold rounded-full border-2 transition-colors hover:opacity-80"
              style={{ borderColor: TEAL, color: TEAL }}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/marketplace")}
              className="px-5 py-2 text-white text-sm font-semibold rounded-full transition-colors hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              Client Portal
            </button>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setLoginOpen(true)} className="px-3 py-1.5 text-sm font-semibold rounded-full border-2" style={{ borderColor: TEAL, color: TEAL }}>
              Login
            </button>
            <button onClick={() => navigate("/marketplace")} className="px-3 py-1.5 text-white text-sm font-semibold rounded-full" style={{ backgroundColor: TEAL }}>
              Portal
            </button>
          </div>
        </div>
      </nav>

      <AccountPanel isOpen={accountOpen} onClose={()=>{}}/>

      <LoginPanel
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => onLoginSuccess()}
      />
    </>
  );
}
