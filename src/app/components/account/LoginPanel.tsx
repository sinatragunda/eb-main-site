import { useState, useEffect } from "react";
import {
  X,
  Eye,
  EyeOff,
  KeyRound,
  Building2,
  Mail,
  Lock,
  ArrowRight,
  Check,
  Shield,
  CheckCircle2,
  UserCircle,
  AlertCircle,
} from "lucide-react";
import { NAVY, TEAL, GOLD } from "../../constants/brand";
import { AuthService, HttpError } from "../../services/http";

export function LoginPanel({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "forgot" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");


  const login = async (e: React.FormEvent) => {

      e.preventDefault();
      setLoading(true);
      try {
          await AuthService.login({ email, password });
          onSuccess();
          onClose();
      } catch (err) {
          const message =
              err instanceof HttpError
                  ? err.message
                  : err instanceof Error
                      ? err.message
                      : "Unable to sign in. Please try again.";
          setError(message);
      } finally {
          setLoading(false);
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Please enter your email address."); return; }
    if (mode === "login" && !password) { setError("Please enter your password."); return; }

    if (mode !== "login") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (mode === "forgot") {
          setMode("login");
          setEmail("");
        } else {
          setMode("login");
        }
      }, 1200);
      return;
    }
  };

  // Reset state when panel closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setMode("login"); setEmail(""); setPassword(""); setError(""); setLoading(false); setGoogleLoading(false); }, 300);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-card shadow-2xl z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="px-6 py-5 text-white flex-shrink-0" style={{ backgroundColor: NAVY }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded flex items-center justify-center bg-white/10">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm leading-none">BFSI Vainona</p>
                <p className="text-white/50 text-[10px] mt-0.5">Secure Client Access</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode heading */}
          <div>
            <div style={{ width: 32, height: 3, backgroundColor: GOLD, borderRadius: 2, marginBottom: 10 }} />
            <h2 className="text-xl font-bold leading-tight">
              {mode === "login" && "Welcome back"}
              {mode === "forgot" && "Reset your password"}
              {mode === "register" && "Create an account"}
            </h2>
            <p className="text-white/60 text-xs mt-1">
              {mode === "login" && "Sign in to access your BFSI Vainona account"}
              {mode === "forgot" && "Enter your email and we'll send a reset link"}
              {mode === "register" && "Join 14,000+ clients on the platform"}
            </p>
          </div>
        </div>

        {/* Form body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* Google Sign In — shown for login and register, not forgot */}
          {mode !== "forgot" && (
            <>
              <button
                type="button"
                disabled={googleLoading}
                onClick={() => {
                  setGoogleLoading(true);
                  setTimeout(() => { setGoogleLoading(false); onSuccess(); onClose(); }, 1400);
                }}
                className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-border bg-white text-sm font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-60"
              >
                {googleLoading ? (
                  <span className="w-4 h-4 border-2 border-border border-t-[#4285F4] rounded-full animate-spin" />
                ) : (
                  /* Official Google "G" logo colours as inline SVG */
                  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                    <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.96l3.007 2.332C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                )}
                {googleLoading ? "Signing in with Google…" : "Continue with Google"}
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 border-t border-border" />
                <span className="text-xs text-muted-foreground">or continue with email</span>
                <div className="flex-1 border-t border-border" />
              </div>
            </>
          )}

          <form onSubmit={login} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-border rounded-lg outline-none focus:ring-2 focus:border-transparent bg-white text-foreground placeholder:text-muted-foreground"
                  style={{ "--tw-ring-color": TEAL } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Password — only in login / register modes */}
            {mode !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    {mode === "register" ? "Create password" : "Password"}
                  </label>
                  {mode === "login" && (
                    <button type="button" onClick={() => setMode("forgot")} className="text-xs font-medium hover:underline" style={{ color: TEAL }}>
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === "register" ? "Min. 8 characters" : "••••••••"}
                    className="w-full pl-9 pr-10 py-2.5 text-sm border border-border rounded-lg outline-none focus:ring-2 focus:border-transparent bg-white text-foreground placeholder:text-muted-foreground"
                    style={{ "--tw-ring-color": TEAL } as React.CSSProperties}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Register extra field */}
            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Full name</label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="James Okafor"
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-border rounded-lg outline-none focus:ring-2 focus:border-transparent bg-white text-foreground placeholder:text-muted-foreground"
                    style={{ "--tw-ring-color": TEAL } as React.CSSProperties}
                  />
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ backgroundColor: TEAL }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {mode === "login" ? "Signing in…" : mode === "forgot" ? "Sending link…" : "Creating account…"}
                </span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  {mode === "login" ? "Sign In" : mode === "forgot" ? "Send Reset Link" : "Create Account"}
                </>
              )}
            </button>
          </form>

          {/* Mode switcher */}
          {mode === "login" && (
            <p className="text-center text-sm text-muted-foreground">
              New to BFSI Vainona?{" "}
              <button onClick={() => setMode("register")} className="font-semibold hover:underline" style={{ color: TEAL }}>
                Create an account
              </button>
            </p>
          )}
          {mode === "register" && (
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="font-semibold hover:underline" style={{ color: TEAL }}>
                Sign in
              </button>
            </p>
          )}
          {mode === "forgot" && (
            <p className="text-center text-sm text-muted-foreground">
              <button onClick={() => setMode("login")} className="font-semibold hover:underline" style={{ color: TEAL }}>
                Back to sign in
              </button>
            </p>
          )}

          {/* Trust badges */}
          <div className="mt-8 pt-5 border-t border-border space-y-2">
            {[
              { icon: <Shield className="w-3.5 h-3.5" />, text: "256-bit SSL encryption" },
              { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: "FCA regulated — No. 782341" },
              { icon: <Lock className="w-3.5 h-3.5" />, text: "GDPR compliant data handling" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span style={{ color: TEAL }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
