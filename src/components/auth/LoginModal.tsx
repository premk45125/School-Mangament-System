/**
 * LoginModal — role-tab login dialog.
 *
 * Roles: [Accountant, Admin, Teacher, Student / Parent, Head]
 */
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type PortalRole } from "@/context/AuthContext";

const ROLES: { id: PortalRole; label: string; icon: string }[] = [
  { id: "accountant", label: "Accountant", icon: "💰" },
  { id: "admin", label: "Admin", icon: "🏛️" },
  { id: "teacher", label: "Teacher", icon: "📚" },
  { id: "student-parent", label: "Student / Parent", icon: "🎓" },
  { id: "head", label: "Head / Management", icon: "👔" },
];

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { setRole } = useAuth();
  const navigate = useNavigate();

  const [activeRole, setActiveRole] = useState<PortalRole>("student-parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function resetForm() {
    setEmail("");
    setPassword("");
    setRemember(false);
    setError(null);
    setBusy(false);
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm();
    onOpenChange(next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    const { error: sbError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setBusy(false);

    if (sbError) {
      setError(
        sbError.message === "Invalid login credentials"
          ? "Incorrect email or password. Please try again."
          : sbError.message,
      );
      return;
    }

    // Persist the role choice and redirect
    setRole(activeRole, remember);
    onOpenChange(false);
    resetForm();

    const dashMap: Record<PortalRole, string> = {
      accountant: "/dashboard/accountant",
      admin: "/dashboard/admin",
      teacher: "/dashboard/teacher",
      "student-parent": "/dashboard/student-parent",
      head: "/dashboard/head",
    };
    await navigate({ to: dashMap[activeRole] });
  }

  const roleLabel = ROLES.find((r) => r.id === activeRole)?.label ?? "";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-md gap-0 p-0 overflow-hidden">
        {/* Role tabs */}
        <div className="flex border-b border-border bg-muted/40 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setActiveRole(r.id);
                setError(null);
              }}
              className={[
                "flex min-w-0 flex-1 flex-col items-center gap-0.5 px-2 py-2.5 text-[11px] font-semibold transition-colors whitespace-nowrap",
                activeRole === r.id
                  ? "border-b-2 border-primary text-primary bg-background"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <span className="text-base leading-none">{r.icon}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-5">
          <DialogHeader className="mb-4 text-left">
            <DialogTitle className="font-display text-lg font-bold">
              {roleLabel} Portal Login
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Sign in with your school credentials to access the{" "}
              <strong>{roleLabel}</strong> dashboard.
            </DialogDescription>
          </DialogHeader>

          {/* Email */}
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Email / User ID
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@brgyandeep.com"
              className={inputClass}
            />
          </label>

          {/* Password */}
          <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Password
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </label>

          {/* Remember me */}
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-foreground select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            Remember me
          </label>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={busy}
            className="mt-5 w-full rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent/85 disabled:opacity-60"
          >
            {busy ? "Signing in…" : `Sign in as ${roleLabel}`}
          </button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Accounts are created by the school office — contact the front desk.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
