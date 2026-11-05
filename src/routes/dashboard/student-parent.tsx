import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CalendarDays, TrendingUp, Bell, FileText, UserCheck } from "lucide-react";

export const Route = createFileRoute("/dashboard/student-parent")({
  head: () => ({ meta: [{ title: "Student & Parent Portal | BR Gyan Deep Sr Sec School" }] }),
  component: StudentParentDashboard,
});

const STATS = [
  { label: "Attendance", value: "93.4%", icon: UserCheck, color: "bg-emerald-100 text-emerald-700" },
  { label: "Overall Grade", value: "A+", icon: TrendingUp, color: "bg-blue-100 text-blue-700" },
  { label: "Fee Status", value: "All Clear", icon: FileText, color: "bg-violet-100 text-violet-700" },
  { label: "Pending Tasks", value: "2", icon: Bell, color: "bg-amber-100 text-amber-700" },
];

const NOTICES = [
  { date: "Nov 05", title: "Unit Test Schedule for Term II", desc: "Begins from Nov 15th onwards." },
  { date: "Nov 02", title: "Parent-Teacher Meeting (PTM)", desc: "Saturday 9:00 AM – 1:00 PM at School Auditorium." },
  { date: "Oct 28", title: "Annual Sports Meet Registration", desc: "Submit entry forms to sports incharge." },
];

const COURSES = [
  { name: "Physics", teacher: "Rajkumar Yadav", attendance: "96%", grade: "A" },
  { name: "English", teacher: "Rambir Yadav", attendance: "94%", grade: "A+" },
  { name: "Mathematics", teacher: "Faculty Dept", attendance: "91%", grade: "A" },
  { name: "Chemistry", teacher: "Faculty Dept", attendance: "92%", grade: "B+" },
];

function StudentParentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Student &amp; Parent Dashboard
        </h1>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Academic Year 2024-25
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

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Current Courses &amp; Progress
          </h2>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            {COURSES.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between border-b border-border px-4 py-3 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.teacher}</p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold text-foreground">
                    {c.grade}
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Att: {c.attendance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            School Circulars &amp; Notices
          </h2>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            {NOTICES.map((n, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border-b border-border px-4 py-3 last:border-0"
              >
                <span className="mt-0.5 w-14 shrink-0 text-xs font-semibold text-muted-foreground">
                  {n.date}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
