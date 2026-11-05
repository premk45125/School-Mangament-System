import { createFileRoute } from "@tanstack/react-router";
import { Receipt, CreditCard, FileText, PieChart } from "lucide-react";

export const Route = createFileRoute("/dashboard/accountant")({
  head: () => ({ meta: [{ title: "Accountant Dashboard | BR Gyan Deep Sr Sec School" }] }),
  component: AccountantDashboard,
});

const STATS = [
  { label: "Today's Collection", value: "₹48,500", icon: Receipt, color: "bg-emerald-100 text-emerald-700" },
  { label: "Pending Invoices", value: "34", icon: FileText, color: "bg-amber-100 text-amber-700" },
  { label: "Total Students Paid", value: "982 / 1,248", icon: CreditCard, color: "bg-blue-100 text-blue-700" },
  { label: "Quarter Target", value: "88%", icon: PieChart, color: "bg-violet-100 text-violet-700" },
];

const RECENT_FEES = [
  { id: "REC-2401", student: "Aarav Sharma", class: "X-A", amount: "₹6,500", status: "Paid", date: "Today" },
  { id: "REC-2402", student: "Sneha Yadav", class: "XII-Sci", amount: "₹8,200", status: "Paid", date: "Today" },
  { id: "REC-2403", student: "Rohan Verma", class: "IX-B", amount: "₹5,000", status: "Pending", date: "Yesterday" },
  { id: "REC-2404", student: "Pooja Saini", class: "XI-Com", amount: "₹7,000", status: "Paid", date: "Yesterday" },
];

function AccountantDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Accountant & Financial Overview
      </h1>

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
          Recent Fee Transactions
        </h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-2.5">Receipt ID</th>
                <th className="px-4 py-2.5">Student</th>
                <th className="hidden px-4 py-2.5 sm:table-cell">Class</th>
                <th className="px-4 py-2.5">Amount</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_FEES.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{r.student}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{r.class}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{r.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        r.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
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
    </div>
  );
}
