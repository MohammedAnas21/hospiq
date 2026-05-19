import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Loader2, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import logo from "@/assets/hospiq-logo.svg";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-5 w-5 animate-spin text-primary" />
    </div>
  );

  if (user) { navigate({ to: "/admin" }); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const err = await signIn(email, password);
    setSubmitting(false);
    if (err) setError(err);
    else navigate({ to: "/admin" });
  };

  const inp: React.CSSProperties = {
    background: "oklch(0.12 0.03 285)",
    border: "1px solid oklch(1 0 0 / 0.10)",
    borderRadius: 10,
    color: "oklch(0.88 0.015 285)",
    fontSize: 14,
    width: "100%",
    padding: "10px 14px",
    outline: "none",
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4" style={{ background: "oklch(0.07 0.025 285)" }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(60% 50% at 50% 0%, oklch(0.66 0.22 295 / 0.12), transparent 70%)",
      }} />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Hospiq" className="h-8 w-auto mb-5" />
          <h1 className="text-xl font-semibold" style={{ color: "oklch(0.93 0.012 285)" }}>Admin Portal</h1>
          <p className="text-sm mt-1.5" style={{ color: "oklch(0.52 0.015 285)" }}>Sign in to manage your business</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4"
          style={{ background: "oklch(0.10 0.03 285)", border: "1px solid oklch(1 0 0 / 0.10)" }}>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "oklch(0.52 0.015 285)" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="admin@hospiq.com" style={inp}
              onFocus={e => (e.target.style.borderColor = "oklch(0.66 0.22 295 / 0.6)")}
              onBlur={e => (e.target.style.borderColor = "oklch(1 0 0 / 0.10)")} />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "oklch(0.52 0.015 285)" }}>Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="Enter your password" style={{ ...inp, paddingRight: 40 }}
                onFocus={e => (e.target.style.borderColor = "oklch(0.66 0.22 295 / 0.6)")}
                onBlur={e => (e.target.style.borderColor = "oklch(1 0 0 / 0.10)")} />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:opacity-80"
                style={{ color: "oklch(0.42 0.012 285)" }}>
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm" style={{ background: "oklch(0.62 0.24 27 / 0.12)", color: "oklch(0.72 0.20 27)", border: "1px solid oklch(0.62 0.24 27 / 0.25)" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-95 transition-opacity disabled:opacity-60 mt-2">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <><span>Sign In</span><ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>

        <div className="flex items-center justify-center gap-1.5 mt-5 text-xs" style={{ color: "oklch(0.38 0.010 285)" }}>
          <ShieldCheck className="w-3.5 h-3.5" />
          Secure admin access · Hospiq
        </div>
      </div>
    </div>
  );
}
