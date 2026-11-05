import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, TrendingUp, FileText, UserCheck } from "lucide-react";

export const Route = createFileRoute("/dashboard/parent")({
  head: () => ({ meta: [{ title: "Parent Dashboard | Greenwood Public School" }] }),
  component: ParentDashboard,
});

const STATS = [
  { label: "Ward's Attendance", value: "91%", icon: UserCheck, color: "bg-amber-100 text-amber-700" },
  { label: "Overall Grade", value: "A−", icon: TrendingUp, color: "bg-emerald-100 text-emerald-700" },
  { label: "Fee Due", value: "₹4,200", icon: FileText, color: "bg-red-100 text-red-700" },
  { label: "Ward", value: "Rohan", icon: GraduationCap, color: "bg-blue-100 text-blue-700" },
];

const NOTICES = [
  { date: "Nov 02", text: "PTM scheduled for November 15th (Saturday), 9 AM – 1 PM." },
  { date: "Oct 30", text: "Unit test results for Term 1 have been published." },
  { date: "Oct 25", text: "Annual Sports Day is on November 10. Students must bring sportswear." },
];

function ParentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Parent Dashboard
      </h1>

      {/* Stats */}
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

      {/* Notices */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          School Notices
        </h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          {NOTICES.map((n, i) => (
            <div
              key={i}
              className="flex items-start gap-4 border-b border-border px-4 py-3.5 last:border-0"
            >
              <span className="mt-0.5 w-14 shrink-0 text-xs font-semibold text-muted-foreground">
                {n.date}
              </span>
              <p className="text-sm text-foreground">{n.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
        👨‍👩‍👧 Detailed academic progress, fee payments, and messaging will be available here.
      </div>
    </div>
  );
}
