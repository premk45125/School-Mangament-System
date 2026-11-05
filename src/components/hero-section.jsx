import { useState } from "react";
import { StudentDetailModal } from "@/components/StudentDetailModal";
import heroCampus from "@/assets/hero-campus.jpg";
import studentRohan from "@/assets/student-rohan.jpg";
import studentKabir from "@/assets/student-kabir.jpg";

const TOPPERS = [
  {
    name: "Prem Kumar",
    batch: "Class XII · 2023",
    score: "12th: 96%",
    achievement: "JEE Mains — 98.7 Percentile",
    college: "NIT Kurukshetra · B.Tech CSE",
    stream: "B.Tech Computer Science & Engineering",
    initials: "PK",
    color: "bg-violet-600",
    photo: studentRohan,
    details:
      "Prem Kumar cleared the JEE Mains 2023 with an outstanding 98.7 percentile, securing a seat in B.Tech Computer Science & Engineering at NIT Kurukshetra — one of the most competitive NITs in the country. He scored 96% in his Class XII boards, consistently ranking at the top of his batch throughout school. His disciplined approach to mathematics and problem-solving set a benchmark for juniors.",
    testimonial:
      "BR GYAN DEEP SR SEC SCHOOL provided me with the disciplined environment, rigorous daily problem sets, and personal mentoring that made achieving 98.7 percentile in JEE Mains possible. The teachers always took extra doubt classes whenever we needed.",
  },
  {
    name: "Tanmay Khairwal",
    batch: "Class XII · 2023",
    score: "12th: 95%",
    achievement: "NEET 2023 — 655 / 720",
    college: "UCMS New Delhi · MBBS",
    stream: "Bachelor of Medicine & Bachelor of Surgery (MBBS)",
    initials: "TK",
    color: "bg-emerald-600",
    photo: studentKabir,
    details:
      "Tanmay Khairwal achieved a remarkable 655/720 in NEET 2023 and secured an MBBS seat at the University College of Medical Sciences (UCMS), New Delhi — a premier government medical college. He scored 95% in his Class XII boards and was known for his rigorous Biology preparation and analytical approach to Chemistry questions.",
    testimonial:
      "Cracking NEET with 655/720 and securing an MBBS seat at UCMS Delhi was made achievable by the dedicated biology and chemistry faculty at BR Gyan Deep. The regular Sunday mock tests and conceptual approach were the foundation of my success.",
  },
  {
    name: "Satyaprakash Khairwal",
    batch: "Class XII · 2023",
    score: "12th: 94%",
    achievement: "Engineering Entrance Qualified",
    college: "YMCA Faridabad · B.Tech Mechanical",
    stream: "B.Tech Mechanical Engineering",
    initials: "SK",
    color: "bg-amber-600",
    details:
      "Satyaprakash Khairwal scored 94% in his Class XII boards and secured admission to B.Tech Mechanical Engineering at J.C. Bose University of Science & Technology (YMCA), Faridabad. His strong foundation in Physics and Mathematics, built through the school's systematic teaching methodology, was key to his success.",
    testimonial:
      "The practical laboratory training and strong mathematical fundamentals built at BR GYAN DEEP SR SEC SCHOOL gave me the confidence to clear engineering entrance exams and score 94% in my 12th boards. Proud to be an alumnus!",
  },
  {
    name: "Dheeraj Sharma",
    batch: "Class XII · 2023",
    score: "12th: 92%",
    achievement: "Engineering Entrance Qualified",
    college: "VIT Bhopal · B.Tech CSE",
    stream: "B.Tech Computer Science & Engineering",
    initials: "DS",
    color: "bg-blue-600",
    details:
      "Dheeraj Sharma scored 92% in his Class XII boards and secured a seat in B.Tech Computer Science & Engineering at VIT Bhopal. His consistent performance across Physics, Chemistry and Mathematics throughout his school years reflects the strong academic culture fostered at BR Gyan Deep Sr Sec School.",
    testimonial:
      "The dedicated faculty at BR Gyan Deep went above and beyond to support us. The peer environment, regular performance assessments, and career mentoring helped me secure my computer science seat at VIT Bhopal.",
  },
];

const STREAMS = ["Science", "Commerce", "Arts"];
const PROGRAMS = [
  "JEE Coaching",
  "NEET Coaching",
  "Class Guidance",
  "Career Mentoring",
];

export function HeroSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image */}
      <img
        src={heroCampus}
        alt="BR Gyan Deep Sr Sec School campus"
        width={1600}
        height={900}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Overlay - subtle gradient to highlight the real campus while keeping text crisp */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#002147]/85 via-[#002147]/65 to-[#002147]/85"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        {/* Glassmorphism overview card */}
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/15 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
            Surjanwas, Mahendragarh · Est. 2001
          </p>
          <p className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            BR GYAN DEEP SR SEC SCHOOL
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/85 sm:text-base">
            Senior-secondary streams across Science, Commerce and Arts — backed
            by structured JEE &amp; NEET coaching, class guidance, and
            personalised career mentoring.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {STREAMS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {PROGRAMS.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Toppers showcase — Div 2 */}
        <div className="mt-16">
          <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
            Our Toppers &amp; Selections · 2023 Batch
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-white/75">
            Click any card to read their full journey.
          </p>

          <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {TOPPERS.map((topper) => (
              <button
                key={topper.name}
                type="button"
                onClick={() => setSelected(topper)}
                className="group text-left focus:outline-none"
              >
                <div className="rounded-2xl border border-white/30 bg-white/10 p-4 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/60 group-hover:shadow-2xl">
                  {/* Avatar with initials */}
                  <div className="flex justify-center">
                    <div
                      className={`grid h-20 w-20 place-items-center rounded-2xl font-display text-2xl font-bold text-white shadow-lg ${topper.color}`}
                    >
                      {topper.initials}
                    </div>
                  </div>

                  {/* Floating score note */}
                  <div className="relative z-10 mx-auto -mt-4 w-[88%] -rotate-1 rounded-lg bg-secondary px-3 py-2 shadow-xl transition-transform duration-300 group-hover:rotate-0">
                    <p className="text-[11px] font-semibold text-secondary-foreground">
                      {topper.score}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {topper.achievement}
                    </p>
                  </div>

                  <div className="px-1 pb-1 pt-3 text-center">
                    <p className="text-sm font-bold text-white">{topper.name}</p>
                    <p className="mt-0.5 text-[11px] text-white/60">
                      {topper.batch}
                    </p>
                    <p className="mt-1.5 text-xs font-medium text-white/85">
                      {topper.college}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sleek Detail Modal Popup */}
      <StudentDetailModal
        student={selected}
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
