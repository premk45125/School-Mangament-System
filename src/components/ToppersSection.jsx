import { useState } from "react";
import { Trophy, Star } from "lucide-react";
import { StudentDetailModal } from "@/components/StudentDetailModal";
import studentRohan from "@/assets/student-rohan.jpg";
import studentKabir from "@/assets/student-kabir.jpg";

export const TOPPERS_LIST = [
  {
    name: "Prem Kumar",
    batch: "2023 Batch",
    score: "96.0%",
    achievement: "JEE Mains — 98.7 Percentile",
    college: "NIT Kurukshetra",
    stream: "B.Tech Computer Science & Engineering",
    initials: "PK",
    color: "bg-violet-600",
    photo: studentRohan,
    details:
      "Prem Kumar cleared the JEE Mains 2023 with an outstanding 98.7 percentile, securing a seat in B.Tech Computer Science & Engineering at NIT Kurukshetra — one of the premier NITs in India. He scored 96% in his Class XII CBSE boards.",
    testimonial:
      "BR GYAN DEEP SR SEC SCHOOL provided me with the disciplined environment, rigorous daily problem sets, and personal mentoring that made achieving 98.7 percentile in JEE Mains possible. The faculty's focus on deep concepts was the game-changer.",
  },
  {
    name: "Tanmay Khairwal",
    batch: "2023 Batch",
    score: "95.0%",
    achievement: "NEET 2023 — 655 / 720",
    college: "UCMS New Delhi",
    stream: "Bachelor of Medicine & Bachelor of Surgery (MBBS)",
    initials: "TK",
    color: "bg-emerald-600",
    photo: studentKabir,
    details:
      "Tanmay Khairwal scored a remarkable 655/720 in NEET 2023 and earned an MBBS seat at University College of Medical Sciences (UCMS), New Delhi. He achieved 95% in his Class XII boards.",
    testimonial:
      "Cracking NEET with 655/720 and securing an MBBS seat at UCMS Delhi was made achievable by the dedicated biology and chemistry faculty at BR Gyan Deep. The regular Sunday mock tests and personalized doubt solving kept me confident and exam-ready.",
  },
  {
    name: "Satyaprakash Khairwal",
    batch: "2023 Batch",
    score: "94.0%",
    achievement: "Engineering Entrance Qualified",
    college: "YMCA Faridabad (J.C. Bose UST)",
    stream: "B.Tech Mechanical Engineering",
    initials: "SK",
    color: "bg-amber-600",
    details:
      "Satyaprakash Khairwal scored 94% in Class XII boards and secured admission to B.Tech Mechanical Engineering at YMCA Faridabad. His strong foundation in physics and mathematics was nurtured by the systematic curriculum at school.",
    testimonial:
      "The practical laboratory training and strong mathematical fundamentals built at BR GYAN DEEP SR SEC SCHOOL gave me the confidence to clear engineering entrance exams and score 94% in my 12th boards. Proud to be an alumnus!",
  },
  {
    name: "Dheeraj Sharma",
    batch: "2023 Batch",
    score: "92.0%",
    achievement: "Engineering Entrance Qualified",
    college: "VIT Bhopal",
    stream: "B.Tech Computer Science & Engineering",
    initials: "DS",
    color: "bg-blue-600",
    details:
      "Dheeraj Sharma scored 92% in his Class XII boards and earned a seat in B.Tech Computer Science & Engineering at VIT Bhopal. His consistent performance across sciences reflects the academic culture of the school.",
    testimonial:
      "The dedicated faculty at BR Gyan Deep went above and beyond to support us. The peer environment, regular performance assessments, and career mentoring helped me secure my computer science seat at VIT Bhopal.",
  },
];

export function ToppersSection() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <section id="toppers-section" className="relative w-full py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-orange-500/10 text-orange-600 border border-orange-500/20 mb-3 shadow-xs">
            <Trophy className="h-4 w-4 text-orange-600" />
            Class of 2023 Distinctions
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Toppers &amp; Premier Selections
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium">
            Click any topper card below to view their complete score breakdown, college admissions, and testimonial.
          </p>
        </div>

        {/* 4 Cards Grid - Fully Client-Side Click with Modal (NO broken Link or router navigation) */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOPPERS_LIST.map((topper) => (
            <button
              key={topper.name}
              type="button"
              onClick={() => setSelectedStudent(topper)}
              className="group text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-2xl"
              aria-label={`View profile for ${topper.name}`}
            >
              <div className="h-full rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-md backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-orange-500/80 group-hover:shadow-2xl group-hover:bg-orange-50/10 flex flex-col justify-between">
                <div>
                  {/* Avatar / Photo with Achievement Pill */}
                  <div className="flex justify-center relative">
                    {topper.photo ? (
                      <img
                        src={topper.photo}
                        alt={topper.name}
                        className="h-20 w-20 rounded-2xl object-cover object-top border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div
                        className={`grid h-20 w-20 place-items-center rounded-2xl font-display text-2xl font-bold text-white shadow-lg ${topper.color} group-hover:scale-105 transition-transform duration-300`}
                      >
                        {topper.initials}
                      </div>
                    )}
                    <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-orange-600 text-white shadow-xs">
                      <Star className="h-3.5 w-3.5 fill-white" />
                    </span>
                  </div>

                  {/* Floating Score Box */}
                  <div className="relative z-10 mx-auto -mt-3.5 w-[92%] rounded-xl bg-slate-900 text-white px-3 py-2 shadow-md text-center">
                    <p className="text-xs font-mono font-extrabold text-orange-400">
                      12th Board: {topper.score}
                    </p>
                    <p className="text-[10px] text-slate-300 font-semibold truncate mt-0.5">
                      {topper.achievement}
                    </p>
                  </div>

                  {/* Name and Basic Details */}
                  <div className="px-1 pb-1 pt-4 text-center">
                    <h4 className="text-base font-display font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {topper.name}
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-500 font-medium">
                      Class XII · {topper.batch}
                    </p>
                    <p className="mt-2 text-xs font-bold text-blue-700 bg-blue-50/80 border border-blue-200/60 rounded-lg py-1 px-2 line-clamp-1">
                      🏛️ {topper.college}
                    </p>
                  </div>
                </div>

                {/* Card Click Hint */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center text-xs font-bold text-orange-600 group-hover:underline">
                  View Full Profile &amp; Story →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sleek Detail Modal Popup */}
      <StudentDetailModal
        student={selectedStudent}
        isOpen={selectedStudent !== null}
        onClose={() => setSelectedStudent(null)}
      />
    </section>
  );
}

export default ToppersSection;
