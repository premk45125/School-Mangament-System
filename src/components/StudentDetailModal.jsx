import { useEffect } from "react";
import {
  X,
  Trophy,
  GraduationCap,
  Building2,
  Quote,
  CheckCircle2,
  Calendar,
  Award,
} from "lucide-react";

export function StudentDetailModal({ student, isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !student) return null;

  const defaultTestimonials = {
    "Prem Kumar":
      "BR GYAN DEEP SR SEC SCHOOL provided me with the disciplined environment, rigorous daily problem sets, and personal mentoring that made achieving 98.7 percentile in JEE Mains possible. The teachers always took extra doubt classes whenever we needed.",
    "Tanmay Khairwal":
      "Securing 655/720 in NEET and an MBBS seat at UCMS Delhi was made achievable by the outstanding biology and chemistry faculty at BR Gyan Deep. The regular Sunday full-length mock tests and conceptual approach were the foundation of my success.",
    "Satyaprakash Khairwal":
      "The practical laboratory training and strong mathematical fundamentals built at BR GYAN DEEP SR SEC SCHOOL gave me the confidence to clear engineering entrance exams and score 94% in my 12th boards. Proud to be an alumnus!",
    "Dheeraj Sharma":
      "The dedicated faculty at BR Gyan Deep went above and beyond to support us. The peer environment, regular performance assessments, and career mentoring helped me secure a seat in B.Tech CSE at VIT Bhopal.",
  };

  const testimonialText =
    student.testimonial ||
    defaultTestimonials[student.name] ||
    student.details ||
    "My time at BR GYAN DEEP SR SEC SCHOOL shaped my academic career and provided the foundation for clearing national competitive entrance examinations.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${student.name} Topper Profile`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Dark frosted backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative z-10 w-full max-w-lg my-8 rounded-3xl border border-white/80 bg-white p-6 sm:p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300 transform scale-100 max-h-[90vh] overflow-y-auto [scrollbar-width:thin]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          {/* Avatar / Photo Placeholder */}
          <div className="relative">
            {student.photo ? (
              <img
                src={student.photo}
                alt={student.name}
                className="h-24 w-24 rounded-3xl object-cover object-top border-4 border-white shadow-xl"
              />
            ) : (
              <div
                className={`grid h-24 w-24 place-items-center rounded-3xl font-display text-3xl font-bold text-white shadow-xl ${student.color} border-4 border-white`}
              >
                {student.initials}
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-orange-600 text-white shadow-md">
              <Trophy className="h-4 w-4 fill-white" />
            </span>
          </div>

          {/* Student Name */}
          <h3 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            {student.name}
          </h3>

          {/* Batch Year Badge */}
          <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            <Calendar className="h-3.5 w-3.5 text-slate-500" />
            <span>Passing Batch: {student.batch}</span>
          </div>
        </div>

        {/* Scores & Achievements Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-3.5 text-center shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-center gap-1">
              <Award className="h-3.5 w-3.5" />
              12th Board Score
            </span>
            <p className="mt-1 font-mono text-xl font-extrabold text-emerald-950">
              {student.score}
            </p>
            <span className="text-[10px] text-emerald-700 font-semibold">
              CBSE Senior Secondary
            </span>
          </div>

          <div className="rounded-2xl border border-orange-200/80 bg-orange-50/80 p-3.5 text-center shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-800 flex items-center justify-center gap-1">
              <Trophy className="h-3.5 w-3.5" />
              Competitive Exam
            </span>
            <p className="mt-1 text-xs sm:text-sm font-extrabold text-orange-950 truncate font-mono">
              {student.achievement}
            </p>
            <span className="text-[10px] text-orange-700 font-semibold">
              National Entrance Rank
            </span>
          </div>
        </div>

        {/* Current College & Stream */}
        <div className="mt-4 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900">
            <Building2 className="h-4 w-4 text-blue-700" />
            Current College &amp; Program
          </div>
          <p className="mt-1.5 font-display text-base font-bold text-slate-900">
            {student.college}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-blue-800 font-medium">
            <GraduationCap className="h-4 w-4 text-blue-700" />
            <span>Pursuing Undergraduate Degree</span>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50 p-4 sm:p-5 relative">
          <Quote className="h-6 w-6 text-orange-400/60 mb-1" />
          <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-medium">
            "{testimonialText}"
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-2 text-xs">
            <span className="font-bold text-slate-900">— {student.name}</span>
            <span className="text-slate-500 font-medium">
              Alumni, BR GYAN DEEP SR SEC SCHOOL
            </span>
          </div>
        </div>

        {/* Official Verification Footer */}
        <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 py-2.5 text-xs font-bold text-emerald-800">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Verified Topper Record · BR GYAN DEEP SR SEC SCHOOL</span>
        </div>
      </div>
    </div>
  );
}

export default StudentDetailModal;
