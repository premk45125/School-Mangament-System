import { createFileRoute } from "@tanstack/react-router";
import { Users, GraduationCap, Building, ShieldCheck, TrendingUp, PieChart } from "lucide-react";

export const Route = createFileRoute("/dashboard/head")({
  head: () => ({ meta: [{ title: "Head / Management Dashboard | BR Gyan Deep Sr Sec School" }] }),
  component: HeadDashboard,
});

const STATS = [
  { label: "Total Students", value: "1,248", icon: GraduationCap, color: "bg-rose-100 text-rose-700" },
  { label: "Total Faculty & Staff", value: "84", icon: Users, color: "bg-blue-100 text-blue-700" },
  { label: "Overall Attendance", value: "94.2%", icon: TrendingUp, color: "bg-emerald-100 text-emerald-700" },
  { label: "Monthly Fee Clearance", value: "91%", icon: PieChart, color: "bg-amber-100 text-amber-700" },
];

const LEADERSHIP_SUMMARY = [
  { role: "Chairman", name: "Rupram Yadav", status: "Active Oversight" },
  { role: "Principal", name: "Rambir Yadav", status: "Academics & Operations" },
  { role: "Director", name: "Rajkumar Yadav", status: "Curriculum & Faculty" },
  { role: "Admin Management", name: "Prem Kumar", status: "Admissions & Admin" },
  { role: "Accountant", name: "Sandeep Yadav", status: "Finance & Accounts" },
];

function HeadDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Head &amp; Management Dashboard
          </h1>
          <p className="text-xs text-muted-foreground">
            Executive control panel for BR Gyan Deep Sr Sec School
          </p>
        </div>
        <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-600">
          Executive Access
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className={`mb-3 inline-flex rounded-lg p-2 ${s.color}`}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Administrative Core Members
        </h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="divide-y divide-border">
            {LEADERSHIP_SUMMARY.map((l) => (
              <div key={l.role} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary font-bold text-xs text-foreground">
                    {l.role[0]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.role}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
