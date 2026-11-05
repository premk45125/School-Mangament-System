import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard | Greenwood Public School" }] }),
  component: AdminDashboard,
});

const STATS = [
  { label: "Total Students", value: "1,248", icon: GraduationCap, color: "bg-violet-100 text-violet-700" },
  { label: "Teaching Staff", value: "84", icon: Users, color: "bg-blue-100 text-blue-700" },
  { label: "Active Courses", value: "36", icon: BookOpen, color: "bg-emerald-100 text-emerald-700" },
  { label: "Avg. Attendance", value: "94%", icon: TrendingUp, color: "bg-pink-100 text-pink-700" },
];

const QUICK_LINKS = [
  { label: "Manage Students", to: "/dashboard/admin", desc: "View, add, edit student records" },
  { label: "Manage Teachers", to: "/dashboard/admin", desc: "Staff profiles and assignments" },
  { label: "Course Catalogue", to: "/courses", desc: "Manage offered courses" },
];

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Admin Overview
      </h1>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <div className={`mb-3 inline-flex rounded-lg p-2 ${s.color}`}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Quick Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {QUICK_LINKS.map((q) => (
            <Link
              key={q.label}
              to={q.to}
              className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {q.label}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{q.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Placeholder notice */}
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
        📊 Detailed reports, charts, and management tables will appear here once connected to live data.
      </div>
    </div>
  );
}
