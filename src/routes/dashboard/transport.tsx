import { createFileRoute } from "@tanstack/react-router";
import { Bus, Users, CalendarDays, PieChart } from "lucide-react";

export const Route = createFileRoute("/dashboard/transport")({
  head: () => ({ meta: [{ title: "Transport Dashboard | Greenwood Public School" }] }),
  component: TransportDashboard,
});

const STATS = [
  { label: "Active Routes", value: "12", icon: Bus, color: "bg-orange-100 text-orange-700" },
  { label: "Total Drivers", value: "14", icon: Users, color: "bg-blue-100 text-blue-700" },
  { label: "Students Served", value: "386", icon: PieChart, color: "bg-emerald-100 text-emerald-700" },
  { label: "Trips Today", value: "24", icon: CalendarDays, color: "bg-violet-100 text-violet-700" },
];

const ROUTES = [
  { id: "R-01", name: "Koramangala Loop", stops: 8, driver: "Ramu K.", status: "On time" },
  { id: "R-02", name: "HSR Layout", stops: 6, driver: "Venkat S.", status: "On time" },
  { id: "R-03", name: "Whitefield Express", stops: 11, driver: "Suresh M.", status: "Delayed 10 min" },
  { id: "R-04", name: "Jayanagar Circle", stops: 7, driver: "Anand R.", status: "On time" },
];

function TransportDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Transport Dashboard
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

      {/* Route status table */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Live Route Status
        </h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-2.5">ID</th>
                <th className="px-4 py-2.5">Route</th>
                <th className="hidden px-4 py-2.5 sm:table-cell">Stops</th>
                <th className="hidden px-4 py-2.5 md:table-cell">Driver</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {ROUTES.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{r.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{r.name}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{r.stops}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{r.driver}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        r.status === "On time"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
        🚌 Route editing, driver assignment, and GPS tracking will be available here.
      </div>
    </div>
  );
}
