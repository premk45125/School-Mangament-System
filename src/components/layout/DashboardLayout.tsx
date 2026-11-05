/**
 * DashboardLayout — shared shell for all /dashboard/* routes.
 *
 * Roles: [accountant, admin, teacher, student-parent, head]
 */
import { useState } from "react";
import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarDays,
  ClipboardList,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  GraduationCap,
  FileText,
  MessageSquare,
  PieChart,
  UserCheck,
  CreditCard,
  Building,
  ShieldCheck,
  Receipt,
  Award,
} from "lucide-react";
import { useAuth, ROLE_LABELS, type PortalRole } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import schoolLogo from "@/assets/school-logo.png";

/* ------------------------------------------------------------------ */
/* Role-specific nav definitions                                         */
/* ------------------------------------------------------------------ */

type NavItem = { label: string; to: string; icon: React.ElementType };

const ROLE_NAV: Record<PortalRole, NavItem[]> = {
  accountant: [
    { label: "Overview", to: "/dashboard/accountant", icon: LayoutDashboard },
    { label: "Fee Collection", to: "/dashboard/accountant", icon: Receipt },
    { label: "Payment Records", to: "/dashboard/accountant", icon: CreditCard },
    { label: "Pending Dues", to: "/dashboard/accountant", icon: FileText },
    { label: "Financial Reports", to: "/dashboard/accountant", icon: PieChart },
  ],
  admin: [
    { label: "Overview", to: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Students", to: "/dashboard/admin", icon: GraduationCap },
    { label: "Teachers", to: "/dashboard/admin", icon: Users },
    { label: "Courses", to: "/dashboard/admin", icon: BookOpen },
    { label: "Reports", to: "/dashboard/admin", icon: PieChart },
    { label: "Settings", to: "/dashboard/admin", icon: Settings },
  ],
  teacher: [
    { label: "Overview", to: "/dashboard/teacher", icon: LayoutDashboard },
    { label: "My Classes", to: "/dashboard/teacher", icon: BookOpen },
    { label: "Attendance", to: "/dashboard/teacher", icon: UserCheck },
    { label: "Assignments", to: "/dashboard/teacher", icon: ClipboardList },
    { label: "Timetable", to: "/dashboard/teacher", icon: CalendarDays },
    { label: "Messages", to: "/dashboard/teacher", icon: MessageSquare },
  ],
  "student-parent": [
    { label: "Overview", to: "/dashboard/student-parent", icon: LayoutDashboard },
    { label: "Courses & Subjects", to: "/dashboard/student-parent", icon: BookOpen },
    { label: "Attendance Record", to: "/dashboard/student-parent", icon: UserCheck },
    { label: "Assignments & Marks", to: "/dashboard/student-parent", icon: Award },
    { label: "Exam Results", to: "/dashboard/student-parent", icon: TrendingUp },
    { label: "Fee Status", to: "/dashboard/student-parent", icon: FileText },
    { label: "Notices & Circulars", to: "/dashboard/student-parent", icon: Bell },
  ],
  head: [
    { label: "Executive Overview", to: "/dashboard/head", icon: LayoutDashboard },
    { label: "Staff & Academics", to: "/dashboard/head", icon: Building },
    { label: "Student Performance", to: "/dashboard/head", icon: TrendingUp },
    { label: "Finance & Accounts", to: "/dashboard/head", icon: PieChart },
    { label: "Approvals & Policies", to: "/dashboard/head", icon: ShieldCheck },
  ],
};

const ROLE_COLORS: Record<PortalRole, string> = {
  accountant: "bg-emerald-600",
  admin: "bg-violet-600",
  teacher: "bg-blue-600",
  "student-parent": "bg-amber-600",
  head: "bg-rose-600",
};

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export function DashboardLayout() {
  const { role, email, signOut } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // If no role (e.g. direct URL access without login), redirect to home
  if (!role) {
    navigate({ to: "/" });
    return null;
  }

  const navItems = ROLE_NAV[role] ?? [];
  const roleLabel = ROLE_LABELS[role] ?? "Portal";
  const roleColor = ROLE_COLORS[role] ?? "bg-primary";

  async function handleLogout() {
    await signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-transparent">
      {/* ── Sidebar ───────────────────────────────────────────────── */}
      <aside
        className={cn(
          "flex h-full flex-col border-r border-border bg-card transition-all duration-300",
          sidebarOpen ? "w-60" : "w-[60px]",
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between px-3 border-b border-border shrink-0">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2.5 min-w-0">
              <img
                src={schoolLogo}
                alt="BR Gyan Deep School Logo"
                className="h-9 w-9 shrink-0 rounded-full object-contain border border-border bg-white p-0.5 shadow-sm"
              />
              <span className="truncate text-sm font-semibold text-foreground">
                BR Gyan Deep Portal
              </span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              !sidebarOpen && "mx-auto",
            )}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Role badge */}
        {sidebarOpen && (
          <div className="mx-3 mt-4 mb-2 flex items-center gap-2.5 rounded-xl bg-muted/60 px-3 py-2.5">
            <span
              className={cn(
                "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white",
                roleColor,
              )}
            >
              {roleLabel[0]}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{roleLabel}</p>
              <p className="truncate text-[10px] text-muted-foreground">{email}</p>
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "group mb-0.5 flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  !sidebarOpen && "justify-center",
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={16} className="shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {active && <ChevronRight size={14} className="shrink-0 opacity-50" />}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-border p-2">
          <button
            type="button"
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
              !sidebarOpen && "justify-center",
            )}
            title={!sidebarOpen ? "Logout" : undefined}
          >
            <LogOut size={16} className="shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── Main area ─────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
          {/* Left: mobile sidebar toggle + breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((o) => !o)}
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu size={18} />
            </button>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {roleLabel} Dashboard
              </p>
              <p className="text-[11px] text-muted-foreground">
                BR Gyan Deep Sr Sec School
              </p>
            </div>
          </div>

          {/* Right: role badge + email + logout */}
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "hidden rounded-full px-3 py-1 text-xs font-semibold text-white sm:inline-block",
                roleColor,
              )}
            >
              {roleLabel}
            </span>
            {email && (
              <span className="hidden max-w-[160px] truncate text-xs text-muted-foreground sm:inline-block">
                {email}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
            >
              <LogOut size={13} />
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-transparent p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
