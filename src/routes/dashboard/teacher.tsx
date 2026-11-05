import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CalendarDays, ClipboardList, UserCheck } from "lucide-react";

export const Route = createFileRoute("/dashboard/teacher")({
  head: () => ({ meta: [{ title: "Teacher Dashboard | Greenwood Public School" }] }),
  component: TeacherDashboard,
});

const TODAY_CLASSES = [
  { time: "08:00", subject: "Mathematics – Class X-A", room: "Room 12" },
  { time: "10:00", subject: "Mathematics – Class IX-B", room: "Room 08" },
  { time: "13:00", subject: "Mathematics – Class XI (Science)", room: "Room 21" },
];

const STATS = [
  { label: "Classes Today", value: "3", icon: BookOpen, color: "bg-blue-100 text-blue-700" },
  { label: "Pending Assignments", value: "7", icon: ClipboardList, color: "bg-amber-100 text-amber-700" },
  { label: "Attendance Marked", value: "2/3", icon: UserCheck, color: "bg-emerald-100 text-emerald-700" },
  { label: "Events This Week", value: "4", icon: CalendarDays, color: "bg-violet-100 text-violet-700" },
];

function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Teacher Dashboard
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

      {/* Today's timetable */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Today's Classes
        </h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          {TODAY_CLASSES.map((cls, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-0"
            >
              <span className="w-12 shrink-0 text-xs font-semibold text-muted-foreground">
                {cls.time}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{cls.subject}</p>
                <p className="text-xs text-muted-foreground">{cls.room}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Attendance
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
        📚 Assignment grading, class messages, and timetable editor will appear here.
      </div>
    </div>
  );
}
