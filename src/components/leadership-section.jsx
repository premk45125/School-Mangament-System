const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

const LEADERS = [
  {
    role: "Chairman",
    name: "Rupram Yadav",
    tagline: "Ex-Government Teacher",
    qualification: "B.Sc, M.Sc — Govt College Mahendragarh",
    experience: "30+ Years Experience",
    color: "bg-violet-600",
  },
  {
    role: "Principal",
    name: "Rambir Yadav",
    tagline: "English Expert",
    qualification: "B.Sc, M.Sc — Delhi University",
    experience: "30 Years Experience",
    color: "bg-blue-600",
  },
  {
    role: "Director",
    name: "Rajkumar Yadav",
    tagline: "Physics Expert",
    qualification: "B.Sc, M.Sc — Allahabad University",
    experience: "25+ Years Experience",
    color: "bg-emerald-600",
  },
  {
    role: "Transport Incharge",
    name: "Mahipal Yadav",
    tagline: "Fleet & Route Management",
    qualification: "Bus Routing & Fleet Management Expert",
    experience: "Operations Specialist",
    color: "bg-amber-600",
  },
  {
    role: "Accountant",
    name: "Sandeep Yadav",
    tagline: "Financial Management",
    qualification: "Financial & Accounts Management",
    experience: "Accounts Specialist",
    color: "bg-rose-600",
  },
];

export function LeadershipSection() {
  return (
    <section className="border-b border-border/40 bg-white/40 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
          Leadership &amp; Administration
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
          The dedicated team behind BR Gyan Deep Sr Sec School — guiding
          students and staff with decades of combined experience.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {LEADERS.map((leader) => (
            <div
              key={leader.role}
              className="group rounded-2xl border border-border bg-card p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              {/* Avatar */}
              <div
                className={`mx-auto grid h-20 w-20 place-items-center rounded-full font-display text-xl font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-105 ${leader.color}`}
              >
                {initials(leader.name)}
              </div>

              {/* Role badge */}
              <span className="mt-4 inline-block rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                {leader.role}
              </span>

              {/* Name */}
              <p className="mt-2 text-sm font-bold text-foreground">
                {leader.name}
              </p>

              {/* Tagline */}
              <p className="mt-1 text-xs font-medium text-primary">
                {leader.tagline}
              </p>

              {/* Details */}
              <div className="mt-3 space-y-1 border-t border-border pt-3">
                <p className="text-[11px] leading-snug text-muted-foreground">
                  {leader.qualification}
                </p>
                <span className="inline-block rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {leader.experience}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeadershipSection;
