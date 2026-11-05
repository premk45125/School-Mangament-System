import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses Available | Greenwood Public School" },
      {
        name: "description",
        content: "Courses and streams offered at Greenwood Public School.",
      },
      { property: "og:title", content: "Courses Available | Greenwood Public School" },
      {
        property: "og:description",
        content: "Courses and streams offered at Greenwood Public School.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoursesPage,
});

const STREAMS = [
  {
    name: "Science",
    tagline: "For aspiring engineers, doctors and researchers",
    core: ["English Core", "Physics", "Chemistry", "Mathematics / Biology"],
    electives: ["Computer Science", "Physical Education"],
    highlights: [
      "Integrated JEE & NEET coaching from Class 9",
      "Weekly doubt clinics and Sunday full-length mock tests",
      "Olympiad training squad for Science & Maths",
    ],
  },
  {
    name: "Commerce",
    tagline: "For future CAs, business leaders and economists",
    core: ["English Core", "Accountancy", "Business Studies", "Economics"],
    electives: ["Mathematics", "Informatics Practices", "Physical Education"],
    highlights: [
      "CA/CS foundation orientation in Class 11",
      "Annual entrepreneurship fair run by students",
      "Economics seminar series with guest speakers",
    ],
  },
  {
    name: "Arts (Humanities)",
    tagline: "For law, design, civil services and media aspirants",
    core: ["English Core", "History", "Political Science", "Economics / Psychology"],
    electives: ["Fine Arts", "Geography", "Hindi / Sanskrit"],
    highlights: [
      "CLAT & CUET preparation workshops",
      "Debate, MUN and drama societies",
      "Field research projects in Class 12",
    ],
  },
] as const;

const STAGES = [
  { stage: "Pre-Primary (Nursery–UKG)", detail: "Play-based learning, phonics, numeracy foundations" },
  { stage: "Primary (Grades I–V)", detail: "CBSE curriculum with activity-led classrooms" },
  { stage: "Middle (Grades VI–VIII)", detail: "Subject specialization begins, lab-based science" },
  { stage: "Secondary (Grades IX–X)", detail: "CBSE board preparation, stream counselling" },
  { stage: "Senior Secondary (Grades XI–XII)", detail: "Science, Commerce and Arts streams with electives" },
] as const;

const COACHING = [
  { name: "JEE Coaching", detail: "Integrated programme from Class 9 — physics, chemistry, maths beyond the CBSE syllabus, with weekly mocks." },
  { name: "NEET Coaching", detail: "Biology-led track with NCERT mastery drills, doubt clinics and full-length mock tests every Sunday." },
  { name: "Class Guidance", detail: "One-on-one mentoring: stream selection in Class 10, study plans and remedial support through the year." },
  { name: "Olympiad Training", detail: "Squad training for NSO, IMO and national-level science olympiad qualifiers." },
] as const;

function CoursesPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Courses Available
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A CBSE-affiliated curriculum from Nursery to Class XII, with three
          senior-secondary streams and structured competitive-exam coaching.
        </p>

        {/* Senior-secondary streams */}
        <h2 className="mt-12 font-display text-xl font-bold text-foreground">
          Senior Secondary Streams (XI–XII)
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {STREAMS.map((stream) => (
            <div
              key={stream.name}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                {stream.name}
              </span>
              <p className="mt-3 text-sm font-medium text-foreground">
                {stream.tagline}
              </p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Core Subjects
              </p>
              <ul className="mt-1.5 space-y-1 text-xs text-foreground/90">
                {stream.core.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-accent">•</span>
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Electives
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {stream.electives.map((e) => (
                  <span
                    key={e}
                    className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-medium text-secondary-foreground"
                  >
                    {e}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
                {stream.highlights.map((h) => (
                  <p key={h}>— {h}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Class stages */}
        <h2 className="mt-12 font-display text-xl font-bold text-foreground">
          Academic Stages
        </h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="divide-y divide-border">
            {STAGES.map((s) => (
              <div
                key={s.stage}
                className="flex flex-col gap-1 px-5 py-4 transition-colors duration-200 hover:bg-secondary/40 sm:flex-row sm:items-center sm:gap-6"
              >
                <p className="w-56 shrink-0 text-sm font-semibold text-foreground">
                  {s.stage}
                </p>
                <p className="text-xs text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coaching programs */}
        <h2 className="mt-12 font-display text-xl font-bold text-foreground">
          Coaching & Enrichment Programmes
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {COACHING.map((p) => (
            <div
              key={p.name}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <p className="text-sm font-semibold text-foreground">{p.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {p.detail}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 rounded-2xl border border-dashed border-border bg-secondary/40 px-4 py-3 text-center text-xs text-muted-foreground">
          Sample course data — we will replace it with the official curriculum
          documents when you share them.
        </p>
      </main>
    </div>
  );
}
