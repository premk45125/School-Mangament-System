import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CalendarDays, TrendingUp, Bell } from "lucide-react";

export const Route = createFileRoute("/dashboard/student")({
  head: () => ({ meta: [{ title: "Student Dashboard | Greenwood Public School" }] }),
  component: StudentDashboard,
});

const STATS = [
  { label: "Enrolled Courses", value: "8", icon: BookOpen, color: "bg-emerald-100 text-emerald-700" },
  { label: "Attendance", value: "91%", icon: CalendarDays, color: "bg-blue-100 text-blue-700" },
  { label: "Overall Grade", value: "A", icon: TrendingUp, color: "bg-violet-100 text-violet-700" },
  { label: "New Notices", value: "3", icon: Bell, color: "bg-amber-100 text-amber-700" },
];

const UPCOMING = [
  { date: "Nov 05", label: "Mathematics – Unit Test", type: "Exam" },
  { date: "Nov 07", label: "Science Project Submission", type: "Assignment" },
  { date: "Nov 10", label: "Annual Sports Day", type: "Event" },
];

function StudentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Student Dashboard
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

      {/* Upcoming */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Upcoming
        </h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          {UPCOMING.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-0"
            >
              <span className="w-14 shrink-0 text-xs font-semibold text-muted-foreground">
                {item.date}
              </span>
              <p className="flex-1 text-sm text-foreground">{item.label}</p>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
        🎓 Course materials, assignment submissions, and detailed results will be available here.
      </div>
    </div>
  );
}
