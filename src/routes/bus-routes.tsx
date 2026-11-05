import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/bus-routes")({
  head: () => ({
    meta: [
      { title: "Bus Routes | Greenwood Public School" },
      {
        name: "description",
        content: "School bus routes, stops and timings at Greenwood Public School.",
      },
      { property: "og:title", content: "Bus Routes | Greenwood Public School" },
      {
        property: "og:description",
        content: "School bus routes, stops and timings at Greenwood Public School.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BusRoutesPage,
});

interface Route_ {
  id: string;
  name: string;
  stops: string[];
  pickup: string;
  drop: string;
  driver: string;
  driverPhone: string;
}

const ROUTES: Route_[] = [
  {
    id: "R-01",
    name: "Indiranagar Loop",
    stops: ["Domlur Circle", "Indiranagar 100ft Rd", "Chinnappanahally", "Kundalahalli Gate"],
    pickup: "7:10 AM",
    drop: "3:45 PM",
    driver: "Mohan Das",
    driverPhone: "+91 98XXX 12001",
  },
  {
    id: "R-02",
    name: "Whitefield Express",
    stops: ["Hope Farm Junction", "Kadugodi", "Whitefield Main Rd", "Pattandur Agrahara"],
    pickup: "6:55 AM",
    drop: "3:50 PM",
    driver: "Ravi Shankar",
    driverPhone: "+91 98XXX 12002",
  },
  {
    id: "R-03",
    name: "HSR Layout Route",
    stops: ["HSR Sector 1", "Bommanahalli Signal", "Silk Board Junction", "Agara Lake"],
    pickup: "7:05 AM",
    drop: "3:45 PM",
    driver: "Prakash Nair",
    driverPhone: "+91 98XXX 12003",
  },
  {
    id: "R-04",
    name: "Jayanagar Route",
    stops: ["4th Block Jayanagar", "Jayanagar Shopping Complex", "South End Circle", "Banashankari"],
    pickup: "7:00 AM",
    drop: "3:40 PM",
    driver: "Girish Kumar",
    driverPhone: "+91 98XXX 12004",
  },
  {
    id: "R-05",
    name: "Yelahanka Route",
    stops: ["Yelahanka New Town", "Nagavara", "Hebbal Flyover", "Belnahalli Gate"],
    pickup: "6:50 AM",
    drop: "3:55 PM",
    driver: "Anand Rao",
    driverPhone: "+91 98XXX 12005",
  },
  {
    id: "R-06",
    name: "Marathahalli Route",
    stops: ["Marathahalli Bridge", "AECS Layout", "Kundalahalli", "Munnekolalu"],
    pickup: "7:15 AM",
    drop: "3:45 PM",
    driver: "Joseph Mathew",
    driverPhone: "+91 98XXX 12006",
  },
];

const RULES = [
  "Students should reach their stop 5 minutes before the scheduled pickup time.",
  "Route timings may vary by up to 10 minutes on exam days and during monsoon.",
  "Each bus carries a trained lady attendant and GPS tracking, visible to parents in the app.",
  "Changes to a child's route or stop need a written request at the transport office (Ext. 105).",
];

function BusRoutesPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Bus Routes
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Six routes cover the school's catchment area. Every bus has GPS
          tracking and an onboard attendant.
        </p>

        {/* Route cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ROUTES.map((r) => (
            <div
              key={r.id}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                  {r.id}
                </span>
                <p className="font-display text-sm font-bold text-foreground">
                  {r.name}
                </p>
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Stops
              </p>
              <ol className="mt-1.5 space-y-1 text-xs text-foreground/90">
                {r.stops.map((stop, i) => (
                  <li key={stop} className="flex gap-2">
                    <span className="font-semibold text-accent">{i + 1}.</span>
                    {stop}
                  </li>
                ))}
              </ol>
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Pickup
                  </p>
                  <p className="font-semibold text-foreground">{r.pickup}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Drop-off
                  </p>
                  <p className="font-semibold text-foreground">{r.drop}</p>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Driver: {r.driver} · {r.driverPhone}
              </p>
            </div>
          ))}
        </div>

        {/* Rules */}
        <h2 className="mt-12 font-display text-xl font-bold text-foreground">
          Transport Rules & Notes
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="divide-y divide-border">
            {RULES.map((rule, i) => (
              <div key={rule} className="flex gap-3 px-5 py-3.5">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                  {i + 1}
                </span>
                <p className="text-xs leading-relaxed text-foreground/90">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 rounded-2xl border border-dashed border-border bg-secondary/40 px-4 py-3 text-center text-xs text-muted-foreground">
          Sample route data with placeholder phone numbers — share the actual
          route sheet and we will publish it as-is.
        </p>
      </main>
    </div>
  );
}
