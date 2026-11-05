import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/teachers")({
  head: () => ({
    meta: [
      { title: "Teachers & Faculty | Greenwood Public School" },
      {
        name: "description",
        content: "Meet the teachers and faculty of Greenwood Public School.",
      },
      { property: "og:title", content: "Teachers & Faculty | Greenwood Public School" },
      {
        property: "og:description",
        content: "Meet the teachers and faculty of Greenwood Public School.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeachersPage,
});

interface Teacher {
  name: string;
  subject: string;
  department: "Science" | "Commerce" | "Arts" | "Primary" | "Administration";
  qualification: string;
  experience: string;
  role?: string;
}

const TEACHERS: Teacher[] = [
  {
    name: "Mrs. Kavitha Nair",
    subject: "Principal",
    department: "Administration",
    qualification: "M.A. (English), B.Ed.",
    experience: "24 years",
    role: "Principal",
  },
  {
    name: "Mr. Rajesh Iyer",
    subject: "Physics",
    department: "Science",
    qualification: "M.Sc. (Physics), B.Ed.",
    experience: "18 years",
    role: "Head of Science",
  },
  {
    name: "Ms. Deepa Krishnan",
    subject: "Chemistry",
    department: "Science",
    qualification: "M.Sc. (Chemistry), B.Ed.",
    experience: "12 years",
  },
  {
    name: "Mr. Suresh Babu",
    subject: "Mathematics",
    department: "Science",
    qualification: "M.Sc. (Mathematics), B.Ed.",
    experience: "15 years",
    role: "JEE Track Coordinator",
  },
  {
    name: "Dr. Anil Menon",
    subject: "Biology",
    department: "Science",
    qualification: "Ph.D. (Life Sciences), B.Ed.",
    experience: "20 years",
    role: "NEET Track Coordinator",
  },
  {
    name: "Mrs. Lakshmi Rao",
    subject: "Accountancy & Economics",
    department: "Commerce",
    qualification: "M.Com., B.Ed.",
    experience: "14 years",
    role: "Head of Commerce",
  },
  {
    name: "Mr. Vikram Shetty",
    subject: "Business Studies",
    department: "Commerce",
    qualification: "MBA, B.Ed.",
    experience: "9 years",
  },
  {
    name: "Mrs. Sunita Desai",
    subject: "History & Political Science",
    department: "Arts",
    qualification: "M.A. (History), B.Ed.",
    experience: "16 years",
    role: "Head of Humanities",
  },
  {
    name: "Ms. Farida Khan",
    subject: "English Literature",
    department: "Arts",
    qualification: "M.A. (English), B.Ed.",
    experience: "11 years",
  },
  {
    name: "Mrs. Priya Menon",
    subject: "Class Teacher — Grade V",
    department: "Primary",
    qualification: "B.A., B.Ed. (Primary)",
    experience: "8 years",
  },
  {
    name: "Mr. Karthik Kumar",
    subject: "Computer Science",
    department: "Science",
    qualification: "MCA, B.Ed.",
    experience: "7 years",
  },
  {
    name: "Mrs. Geeta Pillai",
    subject: "Hindi & Sanskrit",
    department: "Arts",
    qualification: "M.A. (Hindi), B.Ed.",
    experience: "13 years",
  },
];

const DEPARTMENTS = ["All", "Science", "Commerce", "Arts", "Primary", "Administration"] as const;

const initials = (name: string) =>
  name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

function TeachersPage() {
  const [dept, setDept] = useState<(typeof DEPARTMENTS)[number]>("All");
  const shown = TEACHERS.filter((t) => dept === "All" || t.department === dept);

  return (
    <div className="min-h-screen bg-transparent">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Teachers & Faculty
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {TEACHERS.length} educators across Science, Commerce, Arts and the
          Primary wing. Filter by department to find a teacher.
        </p>

        {/* Department filter chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {DEPARTMENTS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDept(d)}
              className={
                d === dept
                  ? "rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all"
                  : "rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
              }
            >
              {d}
            </button>
          ))}
        </div>

        {/* Faculty grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((teacher) => (
            <div
              key={teacher.name}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-primary/15 bg-secondary font-display text-base font-bold text-primary transition-colors duration-300 group-hover:border-accent">
                  {initials(teacher.name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {teacher.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {teacher.subject}
                  </p>
                  {teacher.role && (
                    <span className="mt-1.5 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground">
                      {teacher.role}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
                <p>{teacher.qualification}</p>
                <p>Experience: {teacher.experience}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 rounded-2xl border border-dashed border-border bg-secondary/40 px-4 py-3 text-center text-xs text-muted-foreground">
          This is sample directory data — send us the real faculty list and we
          will swap it in.
        </p>
      </main>
    </div>
  );
}
