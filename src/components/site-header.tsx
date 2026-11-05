import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LoginModal } from "@/components/auth/LoginModal";
import schoolLogo from "@/assets/school-logo.png";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Teachers & Faculty", to: "/teachers" },
  { label: "Courses Available", to: "/courses" },
  { label: "Results", to: "/results" },
  { label: "Contact Us", to: "/contact" },
] as const;

function Dot() {
  return (
    <span
      aria-hidden
      className="hidden h-1 w-1 rounded-full sm:inline-block"
      style={{ backgroundColor: "#ffffff", opacity: 0.6 }}
    />
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { email, role, dashboardPath, signOut } = useAuth();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  async function handleSignOut() {
    await signOut();
    navigate({ to: "/" });
  }

  return (
    <>
      
      <header className="sticky top-0 z-50 shadow-header">
        {/* Top row: School Name, Address & Logo in Dark Orange */}
        <div
          className="border-b border-black/15 shadow-sm"
          style={{ backgroundColor: "#b84200" }}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center gap-5 px-4 py-5 sm:px-6">
            {/* School logo */}
            <Link
              to="/"
              aria-label="BR Gyan Deep Sr Sec School — home"
              className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-white/90 bg-white p-1 shadow-md overflow-hidden transition-transform hover:scale-105 sm:h-24 sm:w-24"
            >
              <img
                src={schoolLogo}
                alt="BR Gyan Deep Sr. Sec. School Logo"
                className="h-full w-full object-contain"
              />
            </Link>

            {/* Parallel text block: Line 1 = Name, Line 2 = Affiliation & Location details */}
            <div className="flex flex-1 flex-col justify-center min-w-0">
              {/* Line 1: School Name */}
              <h1
                className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[2.4rem] leading-tight truncate drop-shadow-sm"
                style={{ color: "#ffffff" }}
              >
                BR GYAN DEEP SR SEC SCHOOL
              </h1>

              {/* Line 2: Affiliated and details */}
              <p
                className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold sm:text-lg leading-normal mt-1.5"
                style={{ color: "#ffffff" }}
              >
                <span className="opacity-95">CBSE Affiliated · Sr. Sec. · English Medium</span>
                <Dot />
                <span className="opacity-90">
                  Surjanwas, Mahendragarh (Near 152D Underpass) – 123031
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Navigation bar: includes Home, Teachers, Courses, Results, Contact Us, AND Login/Account */}
        <nav
          className="border-t border-white/15"
          style={{ backgroundColor: "#002147" }}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between overflow-x-auto px-4 py-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Equi-spaced Nav Links distributed across the entire line */}
            <div className="flex flex-1 items-center justify-between min-w-0 pr-6">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    aria-current={active ? "page" : undefined}
                    className="relative shrink-0 whitespace-nowrap px-4 py-2.5 text-center text-lg font-bold transition-opacity hover:opacity-100"
                    style={{ color: "#ffffff" }}
                  >
                    <span className={active ? "opacity-100" : "opacity-85 hover:opacity-100"}>
                      {link.label}
                    </span>
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-x-2 bottom-0 h-1 rounded-full"
                        style={{ backgroundColor: "#e67300" }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Login section cleanly integrated at the end of the line */}
            <div className="flex items-center justify-end shrink-0 pl-3">
              {email ? (
                <div className="flex items-center gap-3">
                  {role && dashboardPath && (
                    <Link
                      to={dashboardPath}
                      className="hidden rounded-full px-5 py-2.5 text-base font-bold transition-all shadow-sm sm:inline-block hover:opacity-95"
                      style={{
                        backgroundColor: "#e67300",
                        color: "#ffffff",
                      }}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
                    </Link>
                  )}
                  <span
                    className="hidden max-w-[190px] truncate rounded-full px-3.5 py-2 text-sm font-semibold sm:inline-block"
                    style={{
                      color: "#ffffff",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    {email}
                  </span>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center rounded-full border px-5 py-2 text-base font-bold shadow-sm transition-all hover:bg-white/10"
                    style={{
                      borderColor: "#ffffff",
                      color: "#ffffff",
                    }}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-base font-bold shadow-md transition-all hover:opacity-95"
                  style={{
                    backgroundColor: "#e67300",
                    color: "#ffffff",
                  }}
                >
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
      {/* ── Announcement bar ──────────────────────────────────────── */}
      <div
        className="w-full overflow-hidden bg-transparent px-4 py-1.5 text-xs font-medium border-b border-black/5"
        style={{ color: "#324ab2" }}
      >
        <div className="w-full overflow-hidden">
          <div className="animate-marquee-rtl flex items-center gap-2">
            <span className="font-bold">🎉 Admissions Open!</span>
            <span>
              Contact <strong className="font-semibold">Prem Kumar</strong> (Management Head Admin)
            </span>
            <span>|</span>
            <a
              href="tel:9518XXXXXXX"
              style={{ color: "#324ab2" }}
              className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:opacity-80"
            >
              📞 9518XXXXXXX
            </a>
            <span>|</span>
            <a
              href="mailto:premkumaryadavchikna@gmail.com"
              style={{ color: "#324ab2" }}
              className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:opacity-80"
            >
              ✉️ premkumaryadavchikna@gmail.com
            </a>
          </div>
        </div>
      </div>


      {/* Login modal */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
