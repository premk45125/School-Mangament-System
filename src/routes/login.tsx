import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { supabase } from "@/integrations/supabase/client";

const ROLES = [
  { id: "admin", label: "Admin" },
  { id: "teacher", label: "Teacher" },
  { id: "student", label: "Student" },
  { id: "parent", label: "Parent" },
  { id: "transport-incharge", label: "Transport Incharge" },
] as const;

type View = "login" | "code-email" | "code-verify" | "code-success";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login | Greenwood Public School" },
      {
        name: "description",
        content:
          "Sign in to the Greenwood Public School portal with email and password, or receive a one-time code by email if you forgot your password.",
      },
      { property: "og:title", content: "Login | Greenwood Public School" },
      {
        property: "og:description",
        content:
          "Sign in to the Greenwood Public School portal with email and password, or receive a one-time code by email if you forgot your password.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

const inputClass =
  "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

function LoginPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("login");
  const [role, setRole] = useState<string>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const roleLabel = ROLES.find((r) => r.id === role)?.label ?? "";

  const backToLogin = () => {
    setView("login");
    setError(null);
    setInfo(null);
    setCode("");
  };

  async function handlePasswordSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);
    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "Incorrect email or password. Try again, or use Forgot password to sign in with an emailed code."
          : error.message,
      );
      return;
    }
    await navigate({ to: "/" });
  }

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    setBusy(false);
    if (error) {
      setError(
        error.message.includes("rate limit")
          ? "Too many code emails were requested. Please wait a few minutes and try again."
          : error.message,
      );
      return;
    }
    setInfo(`A 6-digit code was sent to ${email}. It expires shortly, so enter it soon.`);
    setView("code-verify");
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });
    setBusy(false);
    if (error) {
      setError(
        "That code is incorrect or has expired. Check the latest email and try again, or send a new code.",
      );
      return;
    }
    setView("code-success");
  }

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (newPassword.length < 6) {
      setError("Choose a password with at least 6 characters.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("The two passwords don't match.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setPasswordSaved(true);
    setNewPassword("");
    setConfirmNewPassword("");
  }

  return (
    <div className="min-h-screen bg-transparent">
      <SiteHeader />
      <main className="mx-auto max-w-md px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-header sm:p-8">
          {view === "login" && (
            <form onSubmit={handlePasswordSignIn}>
              <h1 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                Portal Login
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Sign in with your school email and password.
              </p>

              <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                I am signing in as
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`${inputClass} normal-case tracking-normal`}
                >
                  {ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@greenwood.edu.in"
                  className={inputClass}
                />
              </label>
              <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Password
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </label>

              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setView("code-email");
                  }}
                  className="text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="mt-4 w-full rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent/85 disabled:opacity-60"
              >
                {busy ? "Signing in…" : `Sign in as ${roleLabel}`}
              </button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Don't have an account yet? Accounts are created by the school
                office — contact the front desk.
              </p>
            </form>
          )}

          {view === "code-email" && (
            <form onSubmit={handleSendCode}>
              <button
                type="button"
                onClick={backToLogin}
                className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Back to login
              </button>
              <h1 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                Forgot password
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Enter the email on your account and we'll send a one-time code
                to it. The code verifies you and signs you in, then you can set
                a new password.
              </p>
              <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@greenwood.edu.in"
                  className={inputClass}
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="mt-5 w-full rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent/85 disabled:opacity-60"
              >
                {busy ? "Sending code…" : "Email me a one-time code"}
              </button>
            </form>
          )}

          {view === "code-verify" && (
            <form onSubmit={handleVerifyCode}>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setInfo(null);
                  setView("code-email");
                }}
                className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Change email / resend code
              </button>
              <h1 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                Enter your code
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {info ?? "Check your inbox for the one-time code."}
              </p>
              <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                6-digit code
                <input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="••••••"
                  className={`${inputClass} text-center font-display text-lg tracking-[0.4em]`}
                />
              </label>
              <button
                type="submit"
                disabled={busy || code.length < 6}
                className="mt-5 w-full rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent/85 disabled:opacity-60"
              >
                {busy ? "Verifying…" : "Verify code & sign in"}
              </button>
            </form>
          )}

          {view === "code-success" && (
            <div>
              {!passwordSaved && (
                <div className="mb-5 flex items-start gap-3 rounded-xl border border-border bg-secondary/60 p-3.5">
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground"
                  >
                    ✓
                  </span>
                  <p className="text-sm text-foreground">
                    Code verified — you're signed in as{" "}
                    <span className="font-semibold">{email}</span>.
                  </p>
                </div>
              )}
              <h1 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                {passwordSaved ? "Password updated" : "Set a new password"}
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {passwordSaved
                  ? "Your new password is saved. You can now use it to sign in next time."
                  : "Recommended next: replace the emailed code with a password you'll remember."}
              </p>

              {!passwordSaved ? (
                <form onSubmit={handleSetPassword}>
                  <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    New password
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className={inputClass}
                    />
                  </label>
                  <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Confirm new password
                    <input
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Repeat the password"
                      className={inputClass}
                    />
                  </label>
                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={busy}
                      className="w-full rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent/85 disabled:opacity-60"
                    >
                      {busy ? "Saving…" : "Save new password"}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate({ to: "/" })}
                      className="w-full rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                    >
                      Skip for now — go to home
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate({ to: "/" })}
                  className="mt-5 w-full rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent/85"
                >
                  Continue to the portal
                </button>
              )}
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
            >
              {error}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
