import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Building2,
  ChevronLeft,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  Shield,
} from "lucide-react";
import { CREAM, GOLD, MIST, NAVY, TEAL } from "../constants/brand";
import { AuthService } from "../services/http";
import { LoginPanel } from "../components/account/LoginPanel";
import { savePendingClientSetup } from "../utils/pendingClientSetup";
import { useCart } from "../context/CartContext";

export function ClientSetupPage() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [email, setEmail] = useState("");
  const [alias, setAlias] = useState("");
  const [clientName, setClientName] = useState("");
  const [rootPassword, setRootPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate("/checkout", { replace: true });
      return;
    }
    if (cartItems.length === 0) {
      navigate("/marketplace", { replace: true });
    }
  }, [cartItems.length, navigate]);

  const inputCls = (field: string) =>
    `w-full px-3 py-2.5 text-sm border rounded-lg outline-none bg-white text-foreground placeholder:text-muted-foreground transition-colors ${
      errors[field]
        ? "border-red-400 focus:ring-1 focus:ring-red-400"
        : "border-border focus:ring-1 focus:border-transparent"
    }`;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Enter a valid email";

    if (!clientName.trim()) e.clientName = "Client name is required";

    if (!alias.trim()) e.alias = "Tenant name (alias) is required";
    else if (!/^[a-z0-9]([a-z0-9-]{1,30}[a-z0-9])?$/.test(alias.trim())) {
      e.alias = "Use 3–32 lowercase letters, numbers, or hyphens";
    }

    if (!rootPassword) e.rootPassword = "Root password is required";
    else if (rootPassword.length < 8) e.rootPassword = "Password must be at least 8 characters";

    if (confirmPassword !== rootPassword) e.confirmPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    savePendingClientSetup({
      email: email.trim(),
      alias: alias.trim().toLowerCase(),
      clientName: clientName.trim(),
      rootPassword,
    });

    navigate("/checkout");
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", backgroundColor: CREAM }}>
      <div className="bg-white border-b border-border">
        <div className="max-w-xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/marketplace")}
            className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to cart
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ backgroundColor: NAVY }}>
              <Building2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: NAVY }}>Client Setup</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5" style={{ color: TEAL }} />
            Secure
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-border">
        <div className="max-w-xl mx-auto px-6 py-3 flex items-center gap-2 text-xs">
          {["Cart", "Client Details", "Payment"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              {i > 0 && <div className="w-8 h-px bg-border" />}
              <span className={i === 1 ? "font-semibold text-foreground" : "text-muted-foreground"}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
          <div style={{ width: 36, height: 4, backgroundColor: GOLD, borderRadius: 2, marginBottom: 14 }} />
          <h1 className="text-xl font-bold mb-1" style={{ color: NAVY }}>Set up your client</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Enter tenant details now. Your account is created only after payment succeeds.
          </p>

          <div className="flex items-center justify-between gap-3 mb-6 rounded-lg px-3 py-2.5" style={{ backgroundColor: MIST }}>
            <p className="text-xs" style={{ color: TEAL }}>
              Already registered? Sign in to skip this step.
            </p>
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border bg-white transition-colors hover:opacity-80"
              style={{ borderColor: TEAL, color: TEAL }}
            >
              <KeyRound className="w-3.5 h-3.5" />
              Log in
            </button>
          </div>

          <form onSubmit={handleContinue} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={`${inputCls("email")} pl-9`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Client name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Acme Financial Ltd"
                className={inputCls("clientName")}
              />
              {errors.clientName && <p className="text-xs text-red-500 mt-1">{errors.clientName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Tenant name (alias)
              </label>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                placeholder="acme-bank"
                className={inputCls("alias")}
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Used as your environment identifier. Lowercase letters, numbers, and hyphens only.
              </p>
              {errors.alias && <p className="text-xs text-red-500 mt-1">{errors.alias}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Root password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={rootPassword}
                  onChange={(e) => setRootPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className={`${inputCls("rootPassword")} pl-9 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.rootPassword && <p className="text-xs text-red-500 mt-1">{errors.rootPassword}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Confirm root password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={inputCls("confirmPassword")}
              />
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: TEAL }} />
              <span>
                These details are held securely for this checkout session and sent as account metadata only after your payment is confirmed.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              Continue to payment
            </button>
          </form>
        </div>
      </div>

      <LoginPanel
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => {
          setLoginOpen(false);
          navigate("/checkout");
        }}
      />
    </div>
  );
}
