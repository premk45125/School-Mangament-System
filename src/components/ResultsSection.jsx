import { useState, useMemo, useEffect } from "react";
import {
  Search,
  X,
  Award,
  GraduationCap,
  Trophy,
  Calendar,
  BookOpen,
  Stethoscope,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  LayoutGrid,
  List,
  MapPin,
  Building2,
  User,
  Hash,
  School,
} from "lucide-react";

import studentAnanya from "@/assets/student-ananya.jpg";
import studentIshita from "@/assets/student-ishita.jpg";
import studentKabir from "@/assets/student-kabir.jpg";
import studentRohan from "@/assets/student-rohan.jpg";

/* ===================================================================
   CURATED STUDENT PHOTOS & AVATARS
=================================================================== */

const MALE_PHOTOS = [
  studentRohan,
  studentKabir,
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=260&auto=format&fit=crop&q=80",
];

const FEMALE_PHOTOS = [
  studentAnanya,
  studentIshita,
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=260&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=260&auto=format&fit=crop&q=80",
];

function isLikelyFemale(name) {
  const n = name.toLowerCase();
  const femaleEndings = ["a", "i", "ee", "ka", "ya", "ti", "na", "ha", "ta", "shi", "kumari", "devi", "kaur"];
  const femaleNames = ["diya", "sneha", "priya", "ananya", "khushi", "riya", "tanu", "bhavna", "ishika", "mehak", "palak", "simran", "vanshika", "bhumi", "deepali", "isha", "lavanya", "payal", "sakshi", "urvashi", "yashika", "chhavi", "garima", "monika", "aditi", "pooja", "ritu", "neha", "anjali", "kavita", "suman", "muskan", "mansi", "tanya", "divya"];
  const first = n.split(" ")[0];
  if (femaleNames.includes(first)) return true;
  return femaleEndings.some((e) => first.endsWith(e));
}

function getStudentPhotoByName(name, indexOffset = 0) {
  if (name.includes("Ananya")) return studentAnanya;
  if (name.includes("Ishita")) return studentIshita;
  if (name.includes("Kabir")) return studentKabir;
  if (name.includes("Rohan")) return studentRohan;

  let hash = indexOffset;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const pos = Math.abs(hash);

  if (isLikelyFemale(name)) {
    return FEMALE_PHOTOS[pos % FEMALE_PHOTOS.length];
  }
  return MALE_PHOTOS[pos % MALE_PHOTOS.length];
}

/* ===================================================================
   DATA SPECIFICATIONS (STANDARD JAVASCRIPT OBJECTS)
=================================================================== */

/* 50 Class 10th Student Records */
export const CLASS_10_RESULTS = [
  { rollNo: "1001", name: "Aarav Sharma", fatherName: "Rajesh Sharma", address: "Surjanwas", score: 98.6, year: 2024 },
  { rollNo: "1002", name: "Diya Yadav", fatherName: "Sunil Yadav", address: "Mahendragarh", score: 98.2, year: 2024 },
  { rollNo: "1003", name: "Rohit Verma", fatherName: "Mukesh Verma", address: "Kanina", score: 98.0, year: 2024 },
  { rollNo: "1004", name: "Sneha Rao", fatherName: "Anil Rao", address: "Narnaul", score: 97.8, year: 2024 },
  { rollNo: "1005", name: "Aryan Singh", fatherName: "Vikram Singh", address: "Surjanwas", score: 97.6, year: 2024 },
  { rollNo: "1006", name: "Priya Sharma", fatherName: "Naresh Sharma", address: "Ateli", score: 97.4, year: 2024 },
  { rollNo: "1007", name: "Harsh Vardhan", fatherName: "Satyaveer Yadav", address: "Mahendragarh", score: 97.2, year: 2024 },
  { rollNo: "1008", name: "Ananya Gupta", fatherName: "Manoj Gupta", address: "Kanina", score: 97.0, year: 2024 },
  { rollNo: "1009", name: "Dev Kumar", fatherName: "Krishan Kumar", address: "Satnali", score: 96.8, year: 2024 },
  { rollNo: "1010", name: "Khushi Yadav", fatherName: "Dharmender Yadav", address: "Surjanwas", score: 96.6, year: 2024 },
  { rollNo: "1011", name: "Nikhil Jangid", fatherName: "Ramesh Jangid", address: "Mahendragarh", score: 96.4, year: 2024 },
  { rollNo: "1012", name: "Riya Saini", fatherName: "Ashok Saini", address: "Narnaul", score: 96.2, year: 2024 },
  { rollNo: "1013", name: "Sahil Khan", fatherName: "Aas Mohammad", address: "Ateli", score: 96.0, year: 2024 },
  { rollNo: "1014", name: "Tanu Sharma", fatherName: "Vijay Sharma", address: "Kanina", score: 95.8, year: 2024 },
  { rollNo: "1015", name: "Yash Yadav", fatherName: "Bhupender Yadav", address: "Surjanwas", score: 95.6, year: 2024 },
  { rollNo: "1016", name: "Bhavna Kumari", fatherName: "Rajender Kumar", address: "Mahendragarh", score: 95.4, year: 2024 },
  { rollNo: "1017", name: "Chirag Rao", fatherName: "Sandeep Rao", address: "Satnali", score: 95.2, year: 2024 },
  { rollNo: "1018", name: "Ishika Choudhary", fatherName: "Subhash Choudhary", address: "Narnaul", score: 95.0, year: 2024 },
  { rollNo: "1019", name: "Jatin Kumar", fatherName: "Mahipal Kumar", address: "Kanina", score: 94.8, year: 2023 },
  { rollNo: "1020", name: "Mehak Yadav", fatherName: "Jagdish Yadav", address: "Surjanwas", score: 94.6, year: 2023 },
  { rollNo: "1021", name: "Naveen Saini", fatherName: "Vinod Saini", address: "Mahendragarh", score: 94.4, year: 2023 },
  { rollNo: "1022", name: "Palak Sharma", fatherName: "Dinesh Sharma", address: "Ateli", score: 94.2, year: 2023 },
  { rollNo: "1023", name: "Rahul Yadav", fatherName: "Sanjay Yadav", address: "Kanina", score: 94.0, year: 2023 },
  { rollNo: "1024", name: "Simran Kaur", fatherName: "Gurmeet Singh", address: "Narnaul", score: 93.8, year: 2023 },
  { rollNo: "1025", name: "Tarun Verma", fatherName: "Ramavtar Verma", address: "Surjanwas", score: 93.6, year: 2023 },
  { rollNo: "1026", name: "Varun Rao", fatherName: "Devender Rao", address: "Mahendragarh", score: 93.4, year: 2023 },
  { rollNo: "1027", name: "Vanshika Yadav", fatherName: "Surender Yadav", address: "Satnali", score: 93.2, year: 2023 },
  { rollNo: "1028", name: "Aman Kumar", fatherName: "Hawa Singh", address: "Kanina", score: 93.0, year: 2023 },
  { rollNo: "1029", name: "Bhumi Sharma", fatherName: "Parveen Sharma", address: "Ateli", score: 92.8, year: 2023 },
  { rollNo: "1030", name: "Chetan Yadav", fatherName: "Pawan Yadav", address: "Surjanwas", score: 92.6, year: 2023 },
  { rollNo: "1031", name: "Deepali Rao", fatherName: "Bijender Rao", address: "Mahendragarh", score: 92.4, year: 2023 },
  { rollNo: "1032", name: "Gaurav Saini", fatherName: "Kailash Saini", address: "Narnaul", score: 92.0, year: 2023 },
  { rollNo: "1033", name: "Isha Kumari", fatherName: "Anil Kumar", address: "Kanina", score: 91.8, year: 2023 },
  { rollNo: "1034", name: "Kunal Yadav", fatherName: "Ved Prakash", address: "Surjanwas", score: 91.4, year: 2023 },
  { rollNo: "1035", name: "Lavanya Sharma", fatherName: "Hemant Sharma", address: "Mahendragarh", score: 91.0, year: 2023 },
  { rollNo: "1036", name: "Manav Singh", fatherName: "Jagat Singh", address: "Ateli", score: 90.6, year: 2022 },
  { rollNo: "1037", name: "Nishant Rao", fatherName: "Rohtas Rao", address: "Satnali", score: 90.2, year: 2022 },
  { rollNo: "1038", name: "Payal Yadav", fatherName: "Sumer Yadav", address: "Narnaul", score: 89.8, year: 2022 },
  { rollNo: "1039", name: "Rishabh Verma", fatherName: "Omprakash Verma", address: "Kanina", score: 89.4, year: 2022 },
  { rollNo: "1040", name: "Sakshi Sharma", fatherName: "Lalit Sharma", address: "Surjanwas", score: 89.0, year: 2022 },
  { rollNo: "1041", name: "Tushar Kumar", fatherName: "Rajkumar", address: "Mahendragarh", score: 88.6, year: 2022 },
  { rollNo: "1042", name: "Urvashi Yadav", fatherName: "Narender Yadav", address: "Ateli", score: 88.2, year: 2022 },
  { rollNo: "1043", name: "Vivek Saini", fatherName: "Jagmohan Saini", address: "Kanina", score: 87.8, year: 2022 },
  { rollNo: "1044", name: "Yashika Rao", fatherName: "Rakesh Rao", address: "Narnaul", score: 87.4, year: 2022 },
  { rollNo: "1045", name: "Ayush Sharma", fatherName: "Mukesh Sharma", address: "Surjanwas", score: 87.0, year: 2022 },
  { rollNo: "1046", name: "Chhavi Kumari", fatherName: "Dharamvir", address: "Satnali", score: 86.6, year: 2022 },
  { rollNo: "1047", name: "Deepak Yadav", fatherName: "Balwan Yadav", address: "Mahendragarh", score: 86.2, year: 2022 },
  { rollNo: "1048", name: "Garima Rao", fatherName: "Satish Rao", address: "Kanina", score: 85.8, year: 2022 },
  { rollNo: "1049", name: "Himanshu Verma", fatherName: "Tara Chand", address: "Ateli", score: 85.6, year: 2022 },
  { rollNo: "1050", name: "Monika Kumari", fatherName: "Surender Kumar", address: "Mahendragarh", score: 85.4, year: 2022 },
];

/* Class 12th Results across Medical, Non-Medical, Arts, Commerce */
export const CLASS_12_RESULTS = [
  { year: 2023, stream: "Non-Medical", section: "12-A", name: "Shivam Sharma", fatherName: "Rakesh Sharma", address: "Surjanwas", score: 98.2 },
  { year: 2023, stream: "Medical", section: "12-B", name: "Aditi Yadav", fatherName: "Dharambir Yadav", address: "Mahendragarh", score: 97.4 },
  { year: 2023, stream: "Medical", section: "12-B", name: "Tanmay Khairwal", fatherName: "Sanjay Khairwal", address: "Surjanwas", score: 96.8 },
  { year: 2023, stream: "Commerce", section: "12-C", name: "Ritu Kumari", fatherName: "Sunil Kumar", address: "Kanina", score: 96.2 },
  { year: 2023, stream: "Non-Medical", section: "12-A", name: "Prem Kumar", fatherName: "Mahipal Yadav", address: "Surjanwas", score: 96.0 },
  { year: 2023, stream: "Non-Medical", section: "12-A", name: "Satyaprakash Khairwal", fatherName: "Jaiveer Singh", address: "Ateli", score: 95.8 },
  { year: 2023, stream: "Commerce", section: "12-C", name: "Neha Sharma", fatherName: "Ramesh Sharma", address: "Mahendragarh", score: 95.6 },
  { year: 2023, stream: "Arts", section: "12-D", name: "Vikas Rao", fatherName: "Krishan Rao", address: "Narnaul", score: 95.4 },
  { year: 2023, stream: "Arts", section: "12-D", name: "Anjali Yadav", fatherName: "Bijender Yadav", address: "Satnali", score: 94.8 },
  { year: 2022, stream: "Non-Medical", section: "12-A", name: "Aman Sharma", fatherName: "Subhash Sharma", address: "Kanina", score: 97.2 },
  { year: 2022, stream: "Medical", section: "12-B", name: "Pooja Yadav", fatherName: "Naresh Yadav", address: "Mahendragarh", score: 96.4 },
  { year: 2022, stream: "Medical", section: "12-B", name: "Mohit Yadav", fatherName: "Rajender Yadav", address: "Surjanwas", score: 95.2 },
  { year: 2022, stream: "Non-Medical", section: "12-A", name: "Dheeraj Sharma", fatherName: "Anil Sharma", address: "Ateli", score: 94.6 },
  { year: 2022, stream: "Commerce", section: "12-C", name: "Kavita Devi", fatherName: "Tara Chand", address: "Narnaul", score: 94.2 },
  { year: 2022, stream: "Arts", section: "12-D", name: "Suman Rao", fatherName: "Omprakash Rao", address: "Kanina", score: 93.8 },
  { year: 2022, stream: "Arts", section: "12-D", name: "Deepak Saini", fatherName: "Jagmohan Saini", address: "Surjanwas", score: 93.2 },
  { year: 2024, stream: "Medical", section: "12-B", name: "Sneha Kumari", fatherName: "Kuldeep Singh", address: "Mahendragarh", score: 97.0 },
  { year: 2024, stream: "Non-Medical", section: "12-A", name: "Deepak Verma", fatherName: "Ashok Verma", address: "Kanina", score: 96.6 },
  { year: 2024, stream: "Commerce", section: "12-C", name: "Harshit Rao", fatherName: "Satyaveer Rao", address: "Surjanwas", score: 95.8 },
  { year: 2024, stream: "Arts", section: "12-D", name: "Priyanshu Sharma", fatherName: "Mukesh Sharma", address: "Ateli", score: 94.4 },
  { year: 2025, stream: "Non-Medical", section: "12-A", name: "Yashika Yadav", fatherName: "Sanjay Yadav", address: "Narnaul", score: 97.8 },
  { year: 2025, stream: "Medical", section: "12-B", name: "Rohit Saini", fatherName: "Vinod Saini", address: "Surjanwas", score: 96.8 },
  { year: 2025, stream: "Commerce", section: "12-C", name: "Muskan Gupta", fatherName: "Manoj Gupta", address: "Mahendragarh", score: 96.0 },
  { year: 2025, stream: "Arts", section: "12-D", name: "Abhishek Kumar", fatherName: "Balwan Singh", address: "Satnali", score: 95.0 },
  { year: 2026, stream: "Non-Medical", section: "12-A", name: "Aryan Yadav", fatherName: "Vikram Yadav", address: "Surjanwas", score: 98.4 },
  { year: 2026, stream: "Medical", section: "12-B", name: "Mansi Sharma", fatherName: "Rajesh Sharma", address: "Mahendragarh", score: 97.6 },
  { year: 2026, stream: "Commerce", section: "12-C", name: "Tanya Rao", fatherName: "Sandeep Rao", address: "Kanina", score: 96.5 },
  { year: 2026, stream: "Arts", section: "12-D", name: "Gaurav Choudhary", fatherName: "Subhash Choudhary", address: "Ateli", score: 95.2 },
];

/* 16 JEE Advanced Records */
export const JEE_ADVANCED_RESULTS = [
  { year: 2023, name: "Shivam Sharma", fatherName: "Rakesh Sharma", address: "Surjanwas", marks: 298, airRank: 320, college: "IIT Bombay", degree: "B.Tech Computer Science" },
  { year: 2024, name: "Rohan Singh", fatherName: "Vikram Singh", address: "Mahendragarh", marks: 284, airRank: 720, college: "IIT Delhi", degree: "B.Tech Electrical Engineering" },
  { year: 2026, name: "Aryan Yadav", fatherName: "Balwan Yadav", address: "Surjanwas", marks: 312, airRank: 185, college: "IIT Bombay", degree: "B.Tech Computer Science" },
  { year: 2023, name: "Prem Kumar", fatherName: "Mahipal Yadav", address: "Surjanwas", marks: 276, airRank: 980, college: "IIT Roorkee", degree: "B.Tech Computer Science" },
  { year: 2025, name: "Yashika Yadav", fatherName: "Sanjay Yadav", address: "Narnaul", marks: 289, airRank: 640, college: "IIT Madras", degree: "B.Tech Data Science & AI" },
  { year: 2024, name: "Deepak Verma", fatherName: "Ashok Verma", address: "Kanina", marks: 270, airRank: 1240, college: "IIT Kanpur", degree: "B.Tech Mechanical Engineering" },
  { year: 2022, name: "Aman Sharma", fatherName: "Subhash Sharma", address: "Kanina", marks: 265, airRank: 1540, college: "IIT BHU Varanasi", degree: "B.Tech Electronics & Comm." },
  { year: 2023, name: "Satyaprakash Khairwal", fatherName: "Jaiveer Singh", address: "Ateli", marks: 258, airRank: 1820, college: "IIT Kharagpur", degree: "B.Tech Mechanical Engineering" },
  { year: 2025, name: "Harshit Rao", fatherName: "Satyaveer Rao", address: "Surjanwas", marks: 252, airRank: 2150, college: "IIT Hyderabad", degree: "B.Tech Artificial Intelligence" },
  { year: 2022, name: "Dheeraj Sharma", fatherName: "Anil Sharma", address: "Ateli", marks: 248, airRank: 2310, college: "IIT Guwahati", degree: "B.Tech Computer Science" },
  { year: 2025, name: "Rahul Verma", fatherName: "Rajesh Verma", address: "Mahendragarh", marks: 246, airRank: 2540, college: "IIT Mandi", degree: "B.Tech Computer Science" },
  { year: 2024, name: "Kunal Saini", fatherName: "Vinod Saini", address: "Kanina", marks: 242, airRank: 2890, college: "IIT Indore", degree: "B.Tech Electrical Engineering" },
  { year: 2023, name: "Nishant Kumar", fatherName: "Krishan Kumar", address: "Satnali", marks: 238, airRank: 3210, college: "IIT Gandhinagar", degree: "B.Tech Civil Engineering" },
  { year: 2024, name: "Sachin Rao", fatherName: "Devender Rao", address: "Mahendragarh", marks: 234, airRank: 3450, college: "IIT (ISM) Dhanbad", degree: "B.Tech Mining Engineering" },
  { year: 2022, name: "Vikas Sharma", fatherName: "Naresh Sharma", address: "Surjanwas", marks: 230, airRank: 3840, college: "IIT Ropar", degree: "B.Tech Computer Science" },
  { year: 2026, name: "Tarun Yadav", fatherName: "Dharmender Yadav", address: "Ateli", marks: 295, airRank: 490, college: "IIT Delhi", degree: "B.Tech Mathematics & Computing" },
];

/* 11 NEET UG Records */
export const NEET_RESULTS = [
  { year: 2023, name: "Aditi Yadav", fatherName: "Dharambir Yadav", address: "Mahendragarh", marks: 701, airRank: 115, college: "AIIMS New Delhi", degree: "MBBS" },
  { year: 2026, name: "Mansi Sharma", fatherName: "Rajesh Sharma", address: "Mahendragarh", marks: 705, airRank: 85, college: "AIIMS New Delhi", degree: "MBBS" },
  { year: 2024, name: "Tanvi Sharma", fatherName: "Vijay Sharma", address: "Kanina", marks: 688, airRank: 420, college: "AIIMS Jodhpur", degree: "MBBS" },
  { year: 2026, name: "Ananya Yadav", fatherName: "Bhupender Yadav", address: "Surjanwas", marks: 692, airRank: 340, college: "AIIMS Rishikesh", degree: "MBBS" },
  { year: 2024, name: "Sneha Kumari", fatherName: "Kuldeep Singh", address: "Mahendragarh", marks: 682, airRank: 710, college: "Maulana Azad Medical College (MAMC)", degree: "MBBS" },
  { year: 2025, name: "Rohit Saini", fatherName: "Vinod Saini", address: "Surjanwas", marks: 676, airRank: 1180, college: "VMMC & Safdarjung Hospital", degree: "MBBS" },
  { year: 2025, name: "Priya Rao", fatherName: "Anil Rao", address: "Narnaul", marks: 670, airRank: 1650, college: "King George's Medical University (KGMU)", degree: "MBBS" },
  { year: 2022, name: "Pooja Yadav", fatherName: "Naresh Yadav", address: "Mahendragarh", marks: 664, airRank: 2140, college: "Lady Hardinge Medical College (LHMC)", degree: "MBBS" },
  { year: 2023, name: "Tanmay Khairwal", fatherName: "Sanjay Khairwal", address: "Surjanwas", marks: 655, airRank: 3120, college: "UCMS & GTB Hospital Delhi", degree: "MBBS" },
  { year: 2022, name: "Mohit Yadav", fatherName: "Rajender Yadav", address: "Surjanwas", marks: 648, airRank: 4320, college: "Pt. B.D. Sharma PGIMS Rohtak", degree: "MBBS" },
  { year: 2023, name: "Divya Sharma", fatherName: "Dinesh Sharma", address: "Ateli", marks: 645, airRank: 4920, college: "BPS Govt Medical College Khanpur", degree: "MBBS" },
];

/* 9 NDA Written Records */
export const NDA_RESULTS = [
  { year: 2023, name: "Mohit Kumar", fatherName: "Surender Kumar", address: "Surjanwas", status: "Qualified (AIR 48)", college: "National Defence Academy (NDA Khadakwasla)" },
  { year: 2023, name: "Rahul Verma", fatherName: "Rajesh Verma", address: "Mahendragarh", status: "Qualified (AIR 112)", college: "National Defence Academy (NDA Khadakwasla)" },
  { year: 2024, name: "Karan Singh", fatherName: "Kuldeep Singh", address: "Kanina", status: "Qualified (AIR 76)", college: "National Defence Academy (NDA Khadakwasla)" },
  { year: 2024, name: "Arjun Singh", fatherName: "Hawa Singh", address: "Ateli", status: "Qualified (AIR 154)", college: "National Defence Academy (NDA Khadakwasla)" },
  { year: 2022, name: "Sachin Singh", fatherName: "Virender Singh", address: "Narnaul", status: "Qualified (AIR 92)", college: "National Defence Academy (NDA Khadakwasla)" },
  { year: 2025, name: "Vikas Yadav", fatherName: "Balwan Yadav", address: "Satnali", status: "Qualified (AIR 64)", college: "National Defence Academy (NDA Khadakwasla)" },
  { year: 2025, name: "Deepak Rao", fatherName: "Mahipal Rao", address: "Surjanwas", status: "Qualified (AIR 138)", college: "National Defence Academy (NDA Khadakwasla)" },
  { year: 2026, name: "Naveen Sharma", fatherName: "Dinesh Sharma", address: "Mahendragarh", status: "Qualified (AIR 52)", college: "National Defence Academy (NDA Khadakwasla)" },
  { year: 2022, name: "Amit Kumar", fatherName: "Ramesh Kumar", address: "Kanina", status: "Qualified (AIR 185)", college: "National Defence Academy (NDA Khadakwasla)" },
];

/* ===================================================================
   STUDENT AVATAR COMPONENT
=================================================================== */

export function StudentAvatar({ src, name, size = "md" }) {
  const [error, setError] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const sizeClasses = {
    sm: "h-9 w-9 text-xs",
    md: "h-14 w-14 text-sm sm:h-16 sm:w-16 sm:text-base",
    lg: "h-20 w-20 text-lg sm:h-24 sm:w-24 sm:text-xl",
    xl: "h-28 w-28 text-3xl",
  };

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border-3 border-white shadow-md bg-slate-100 ${sizeClasses[size] || sizeClasses.md}`}
    >
      {!error && src ? (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-amber-600 font-extrabold text-white uppercase tracking-wider">
          {initials}
        </div>
      )}
    </div>
  );
}

/* ===================================================================
   COMPREHENSIVE STUDENT DETAIL MODAL
=================================================================== */

function StudentDetailModal({ student, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${student.name} Student Details`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-white/80 bg-white p-6 shadow-2xl backdrop-blur-2xl sm:p-8 [scrollbar-width:thin]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <StudentAvatar src={student.photo} name={student.name} size="xl" />
            <span className="absolute bottom-0 right-1 grid h-7 w-7 place-items-center rounded-full bg-orange-600 text-white shadow-md">
              <Trophy className="h-4 w-4 fill-white" />
            </span>
          </div>

          <h3 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            {student.name}
          </h3>

          <p className="text-xs font-bold uppercase tracking-wider text-orange-600 mt-1">
            {student.category} · Batch {student.year}
          </p>

          {/* Primary Badge */}
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200 px-4 py-1.5 shadow-2xs">
            {student.scoreText && (
              <span className="font-mono text-sm font-extrabold text-orange-950">
                Score: {student.scoreText}
              </span>
            )}
            {student.rankBadge && (
              <span className="rounded-full bg-orange-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-2xs">
                {student.rankBadge}
              </span>
            )}
          </div>

          {/* Detailed Description / Citation of Honor */}
          <div className="mt-5 w-full rounded-2xl bg-orange-50/60 border border-orange-100 p-4 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-800 uppercase tracking-wider mb-1.5">
              <Sparkles className="h-4 w-4 text-orange-600" />
              Academic Achievement &amp; Overview
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {student.description}
            </p>
          </div>

          {/* Complete Information Grid */}
          <div className="mt-4 w-full rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-left space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-slate-400" />
                Father's Name:
              </span>
              <span className="font-bold text-slate-900">{student.fatherName}</span>
            </div>

            <div className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                Native Village / Address:
              </span>
              <span className="font-semibold text-slate-900">📍 {student.address}</span>
            </div>

            {student.rollNo && (
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Hash className="h-3.5 w-3.5 text-slate-400" />
                  Roll Number:
                </span>
                <span className="font-mono font-bold text-slate-900">{student.rollNo}</span>
              </div>
            )}

            {student.stream && (
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                  Stream:
                </span>
                <span className="font-semibold text-slate-900">{student.stream}</span>
              </div>
            )}

            {student.college && (
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  Present College / Academy:
                </span>
                <span className="font-bold text-blue-700">🏛️ {student.college}</span>
              </div>
            )}

            {student.degree && (
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                  Course / Degree:
                </span>
                <span className="font-semibold text-slate-900">{student.degree}</span>
              </div>
            )}

            <div className="flex justify-between pt-1">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <School className="h-3.5 w-3.5 text-slate-400" />
                School:
              </span>
              <span className="font-semibold text-slate-900">BR Gyan Deep Sr Sec School, Surjanwas</span>
            </div>
          </div>

          <div className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 rounded-xl py-2 shadow-2xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Official Verified Merit Record · BR Gyan Deep School
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================================================================
   MAIN RESULTS COMPONENT
=================================================================== */

const YEARS = ["All", "2026", "2025", "2024", "2023", "2022"];
const STREAMS = ["All Streams", "Medical", "Non-Medical", "Commerce", "Arts"];

export function ResultsSection() {
  const [activeTab, setActiveTab] = useState("class10");
  const [compSubTab, setCompSubTab] = useState("jee");
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStream, setSelectedStream] = useState("All Streams");
  const [viewMode, setViewMode] = useState("cards");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const queryLower = searchQuery.trim().toLowerCase();

  /* ---------------- Filtered Data with Photos ---------------- */
  const filteredClass10 = useMemo(() => {
    return CLASS_10_RESULTS.map((item, idx) => ({
      ...item,
      photo: getStudentPhotoByName(item.name, idx),
    })).filter((item) => {
      if (selectedYear !== "All" && item.year !== Number(selectedYear)) return false;
      if (queryLower) {
        const matchesName = item.name.toLowerCase().includes(queryLower);
        const matchesRoll = item.rollNo.toLowerCase().includes(queryLower);
        const matchesFather = item.fatherName.toLowerCase().includes(queryLower);
        const matchesAddress = item.address.toLowerCase().includes(queryLower);
        if (!matchesName && !matchesRoll && !matchesFather && !matchesAddress) return false;
      }
      return true;
    });
  }, [selectedYear, queryLower]);

  const filteredClass12 = useMemo(() => {
    return CLASS_12_RESULTS.map((item, idx) => ({
      ...item,
      photo: getStudentPhotoByName(item.name, idx + 50),
    })).filter((item) => {
      if (selectedYear !== "All" && item.year !== Number(selectedYear)) return false;
      if (selectedStream !== "All Streams" && item.stream !== selectedStream) return false;
      if (queryLower) {
        const matchesName = item.name.toLowerCase().includes(queryLower);
        const matchesFather = item.fatherName.toLowerCase().includes(queryLower);
        const matchesAddress = item.address.toLowerCase().includes(queryLower);
        const matchesStream = item.stream.toLowerCase().includes(queryLower);
        if (!matchesName && !matchesFather && !matchesAddress && !matchesStream) return false;
      }
      return true;
    });
  }, [selectedYear, selectedStream, queryLower]);

  const filteredJee = useMemo(() => {
    return JEE_ADVANCED_RESULTS.map((item, idx) => ({
      ...item,
      photo: getStudentPhotoByName(item.name, idx + 100),
    })).filter((item) => {
      if (selectedYear !== "All" && item.year !== Number(selectedYear)) return false;
      if (queryLower) {
        const matchesName = item.name.toLowerCase().includes(queryLower);
        const matchesCollege = item.college.toLowerCase().includes(queryLower);
        const matchesFather = item.fatherName.toLowerCase().includes(queryLower);
        const matchesRank = String(item.airRank).includes(queryLower);
        if (!matchesName && !matchesCollege && !matchesFather && !matchesRank) return false;
      }
      return true;
    });
  }, [selectedYear, queryLower]);

  const filteredNeet = useMemo(() => {
    return NEET_RESULTS.map((item, idx) => ({
      ...item,
      photo: getStudentPhotoByName(item.name, idx + 150),
    })).filter((item) => {
      if (selectedYear !== "All" && item.year !== Number(selectedYear)) return false;
      if (queryLower) {
        const matchesName = item.name.toLowerCase().includes(queryLower);
        const matchesCollege = item.college.toLowerCase().includes(queryLower);
        const matchesFather = item.fatherName.toLowerCase().includes(queryLower);
        const matchesRank = String(item.airRank).includes(queryLower);
        if (!matchesName && !matchesCollege && !matchesFather && !matchesRank) return false;
      }
      return true;
    });
  }, [selectedYear, queryLower]);

  const filteredNda = useMemo(() => {
    return NDA_RESULTS.map((item, idx) => ({
      ...item,
      photo: getStudentPhotoByName(item.name, idx + 200),
    })).filter((item) => {
      if (selectedYear !== "All" && item.year !== Number(selectedYear)) return false;
      if (queryLower) {
        const matchesName = item.name.toLowerCase().includes(queryLower);
        const matchesFather = item.fatherName.toLowerCase().includes(queryLower);
        const matchesAddress = item.address.toLowerCase().includes(queryLower);
        if (!matchesName && !matchesFather && !matchesAddress) return false;
      }
      return true;
    });
  }, [selectedYear, queryLower]);

  const currentCount = useMemo(() => {
    if (activeTab === "class10") return filteredClass10.length;
    if (activeTab === "class12") return filteredClass12.length;
    if (compSubTab === "jee") return filteredJee.length;
    if (compSubTab === "neet") return filteredNeet.length;
    return filteredNda.length;
  }, [activeTab, compSubTab, filteredClass10, filteredClass12, filteredJee, filteredNeet, filteredNda]);

  return (
    <section id="results-section" className="relative w-full py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-orange-500/10 text-orange-600 border border-orange-500/20 mb-3 shadow-xs">
            <Trophy className="h-4 w-4 text-orange-600" />
            Hall of Academic Excellence
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl drop-shadow-xs">
            Academic &amp; Competitive Results
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-medium">
            Student cards showcasing verified photos, parent names, board percentages, and present colleges.
            Click any student card to view full descriptions.
          </p>
        </div>

        {/* Outer Frosted Glass Card Container */}
        <div className="rounded-3xl border border-white/60 bg-white/90 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
          {/* Main Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("class10")}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-xs ${
                  activeTab === "class10"
                    ? "bg-slate-900 text-white shadow-md scale-102"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                Class 10th Results
                <span className="ml-1 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  50
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("class12")}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-xs ${
                  activeTab === "class12"
                    ? "bg-slate-900 text-white shadow-md scale-102"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <BookOpen className="h-4 w-4" />
                Class 12th Results
                <span className="ml-1 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  CBSE
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("competitive")}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-xs ${
                  activeTab === "competitive"
                    ? "bg-orange-600 text-white shadow-md scale-102"
                    : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Competitive Exams
                <span className="ml-1 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
                  JEE · NEET · NDA
                </span>
              </button>
            </div>

            {/* Layout View Switcher */}
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  viewMode === "cards"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="5 cards in each row layout"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Student Cards (5 / Row)
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  viewMode === "table"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Table view"
              >
                <List className="h-3.5 w-3.5" />
                Table View
              </button>
            </div>
          </div>

          {/* Sub-tabs for Competitive Exams */}
          {activeTab === "competitive" && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setCompSubTab("jee")}
                className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                  compSubTab === "jee"
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Compass className="h-4 w-4" />
                JEE Advanced ({JEE_ADVANCED_RESULTS.length})
              </button>

              <button
                type="button"
                onClick={() => setCompSubTab("neet")}
                className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                  compSubTab === "neet"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Stethoscope className="h-4 w-4" />
                NEET UG ({NEET_RESULTS.length})
              </button>

              <button
                type="button"
                onClick={() => setCompSubTab("nda")}
                className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                  compSubTab === "nda"
                    ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                NDA Written ({NDA_RESULTS.length})
              </button>
            </div>
          )}

          {/* Filter Bar: Year Filter + Live Search + Stream Filter */}
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-t border-slate-100 pt-5">
            {/* Year Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
                <Calendar className="h-3.5 w-3.5" />
                Year:
              </span>
              {YEARS.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYear(yr)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    selectedYear === yr
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {yr === "All" ? "All Years" : yr}
                </button>
              ))}
            </div>

            {/* Right side: Search bar & Stream selector */}
            <div className="flex flex-wrap items-center gap-3">
              {activeTab === "class12" && (
                <select
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 outline-none transition-all focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 shadow-xs"
                >
                  {STREAMS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              )}

              {/* Search input */}
              <div className="relative min-w-[240px] flex-1 sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Name, Roll, Father, College..."
                  className="w-full rounded-xl border border-slate-300 bg-white pl-9.5 pr-8 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results count & reset */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Showing <strong className="text-slate-800">{currentCount}</strong> students in 5-column card view
              {selectedYear !== "All" && ` for year ${selectedYear}`}
              {searchQuery && ` matching "${searchQuery}"`}
              {activeTab === "class12" && selectedStream !== "All Streams" && ` in ${selectedStream}`}
            </span>
            {(selectedYear !== "All" || searchQuery || selectedStream !== "All Streams") && (
              <button
                type="button"
                onClick={() => {
                  setSelectedYear("All");
                  setSearchQuery("");
                  setSelectedStream("All Streams");
                }}
                className="text-orange-600 hover:underline font-semibold"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* =================================================================
              PRIMARY VIEW: 5 STUDENT CARDS IN EACH ROW
          ================================================================= */}
          {viewMode === "cards" && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {/* Class 10th Cards */}
              {activeTab === "class10" &&
                filteredClass10.map((row, index) => {
                  const isTopRanker = index < 3 && selectedYear === "All" && !searchQuery;
                  return (
                    <div
                      key={row.rollNo}
                      onClick={() =>
                        setSelectedStudent({
                          name: row.name,
                          photo: row.photo,
                          fatherName: row.fatherName,
                          address: row.address,
                          category: "Class 10th CBSE Examination",
                          year: row.year,
                          rollNo: row.rollNo,
                          scoreText: `${row.score.toFixed(1)}%`,
                          rankBadge: isTopRanker ? `Rank ${index + 1}` : "Distinction",
                          description: `${row.name} scored an outstanding ${row.score.toFixed(1)}% in the CBSE Class 10th Board Examination (Roll No: ${row.rollNo}) from BR Gyan Deep Sr Sec School, Surjanwas. Son/Daughter of ${row.fatherName}, residing at ${row.address}. Consistently demonstrated academic excellence throughout the session.`,
                        })
                      }
                      className="group cursor-pointer rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500 hover:shadow-xl hover:bg-orange-50/10 flex flex-col justify-between"
                    >
                      <div>
                        {/* Photo with rank pill */}
                        <div className="relative flex justify-center">
                          <StudentAvatar src={row.photo} name={row.name} size="md" />
                          {isTopRanker && (
                            <span
                              className={`absolute -bottom-1 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase shadow-xs ${
                                index === 0
                                    ? "bg-amber-400 text-amber-950"
                                  : index === 1
                                    ? "bg-slate-300 text-slate-800"
                                  : "bg-amber-600 text-white"
                              }`}
                            >
                              Rank {index + 1}
                            </span>
                          )}
                        </div>

                        {/* Student Name */}
                        <h4 className="mt-3 font-display font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors text-center truncate">
                          {row.name}
                        </h4>

                        {/* Father Name */}
                        <p className="text-xs text-slate-500 text-center font-medium truncate mt-0.5">
                          S/D of {row.fatherName}
                        </p>
                      </div>

                      {/* Score as Percentage */}
                      <div className="mt-3">
                        <div className="rounded-full bg-emerald-50 border border-emerald-200/90 py-1 px-2 text-center shadow-2xs">
                          <span className="font-mono text-xs font-extrabold text-emerald-800">
                            Score: {row.score.toFixed(1)}%
                          </span>
                        </div>
                        <p className="mt-1.5 text-[10px] text-center text-slate-400 font-medium group-hover:text-orange-600 transition-colors">
                          Click for full details →
                        </p>
                      </div>
                    </div>
                  );
                })}

              {/* Class 12th Cards */}
              {activeTab === "class12" &&
                filteredClass12.map((row) => (
                  <div
                    key={`${row.year}-${row.name}`}
                    onClick={() =>
                      setSelectedStudent({
                        name: row.name,
                        photo: row.photo,
                        fatherName: row.fatherName,
                        address: row.address,
                        category: `Class 12th CBSE (${row.stream})`,
                        year: row.year,
                        stream: `${row.stream} — Section ${row.section}`,
                        scoreText: `${row.score.toFixed(1)}%`,
                        rankBadge: row.stream,
                        description: `${row.name} achieved a distinguished ${row.score.toFixed(1)}% in Class 12th CBSE Boards (${row.stream} Stream, Section ${row.section}) from BR Gyan Deep Sr Sec School. Son/Daughter of ${row.fatherName}, native of ${row.address}. Prepared with excellence across core subjects and laboratory practicals.`,
                      })
                    }
                    className="group cursor-pointer rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500 hover:shadow-xl hover:bg-blue-50/10 flex flex-col justify-between"
                  >
                    <div>
                      {/* Photo with stream pill */}
                      <div className="relative flex justify-center">
                        <StudentAvatar src={row.photo} name={row.name} size="md" />
                        <span className="absolute -bottom-1 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-bold uppercase text-white shadow-xs">
                          {row.stream}
                        </span>
                      </div>

                      {/* Student Name */}
                      <h4 className="mt-3 font-display font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors text-center truncate">
                        {row.name}
                      </h4>

                      {/* Father Name */}
                      <p className="text-xs text-slate-500 text-center font-medium truncate mt-0.5">
                        S/D of {row.fatherName}
                      </p>
                    </div>

                    {/* Score as Percentage */}
                    <div className="mt-3">
                      <div className="rounded-full bg-blue-50 border border-blue-200/90 py-1 px-2 text-center shadow-2xs">
                        <span className="font-mono text-xs font-extrabold text-blue-900">
                          Score: {row.score.toFixed(1)}%
                        </span>
                      </div>
                      <p className="mt-1.5 text-[10px] text-center text-slate-400 font-medium group-hover:text-blue-600 transition-colors">
                        Click for full details →
                      </p>
                    </div>
                  </div>
                ))}

              {/* JEE Advanced Cards */}
              {activeTab === "competitive" && compSubTab === "jee" &&
                filteredJee.map((row) => (
                  <div
                    key={`${row.year}-${row.name}`}
                    onClick={() =>
                      setSelectedStudent({
                        name: row.name,
                        photo: row.photo,
                        fatherName: row.fatherName,
                        address: row.address,
                        category: "JEE Advanced Entrance Selection",
                        year: row.year,
                        scoreText: `${row.marks} / 360`,
                        rankBadge: `AIR ${row.airRank}`,
                        college: row.college,
                        degree: row.degree,
                        description: `${row.name} secured All India Rank ${row.airRank} in JEE Advanced with ${row.marks}/360 marks, gaining admission to ${row.college} for ${row.degree}. Proud alumnus of BR Gyan Deep Sr Sec School. Son/Daughter of ${row.fatherName}, residing at ${row.address}.`,
                      })
                    }
                    className="group cursor-pointer rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500 hover:shadow-xl hover:bg-blue-50/10 flex flex-col justify-between"
                  >
                    <div>
                      {/* Photo with AIR rank badge */}
                      <div className="relative flex justify-center">
                        <StudentAvatar src={row.photo} name={row.name} size="md" />
                        <span className="absolute -bottom-1 inline-flex items-center gap-0.5 rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-bold text-amber-950 shadow-xs">
                          <Trophy className="h-2.5 w-2.5" />
                          AIR {row.airRank}
                        </span>
                      </div>

                      {/* Student Name */}
                      <h4 className="mt-3 font-display font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors text-center truncate">
                        {row.name}
                      </h4>

                      {/* Father Name */}
                      <p className="text-xs text-slate-500 text-center font-medium truncate mt-0.5">
                        S/D of {row.fatherName}
                      </p>
                    </div>

                    {/* Present College */}
                    <div className="mt-3">
                      <div className="rounded-xl bg-blue-50/90 border border-blue-200/80 p-1.5 text-center shadow-2xs">
                        <p className="text-xs font-bold text-blue-900 truncate">
                          🏛️ {row.college}
                        </p>
                        <p className="text-[10px] text-blue-700 font-semibold truncate">
                          {row.degree}
                        </p>
                      </div>
                      <p className="mt-1.5 text-[10px] text-center text-slate-400 font-medium group-hover:text-blue-600 transition-colors">
                        Click for full details →
                      </p>
                    </div>
                  </div>
                ))}

              {/* NEET UG Cards */}
              {activeTab === "competitive" && compSubTab === "neet" &&
                filteredNeet.map((row) => (
                  <div
                    key={`${row.year}-${row.name}`}
                    onClick={() =>
                      setSelectedStudent({
                        name: row.name,
                        photo: row.photo,
                        fatherName: row.fatherName,
                        address: row.address,
                        category: "NEET UG Entrance Selection",
                        year: row.year,
                        scoreText: `${row.marks} / 720`,
                        rankBadge: `AIR ${row.airRank}`,
                        college: row.college,
                        degree: row.degree,
                        description: `${row.name} secured All India Rank ${row.airRank} in NEET UG with an exceptional score of ${row.marks}/720, securing MBBS admission at ${row.college}. Proud student of BR Gyan Deep Sr Sec School. Son/Daughter of ${row.fatherName}, residing at ${row.address}.`,
                      })
                    }
                    className="group cursor-pointer rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500 hover:shadow-xl hover:bg-emerald-50/10 flex flex-col justify-between"
                  >
                    <div>
                      {/* Photo with AIR rank badge */}
                      <div className="relative flex justify-center">
                        <StudentAvatar src={row.photo} name={row.name} size="md" />
                        <span className="absolute -bottom-1 inline-flex items-center gap-0.5 rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[9px] font-bold text-emerald-900 shadow-xs">
                          <Award className="h-2.5 w-2.5" />
                          AIR {row.airRank}
                        </span>
                      </div>

                      {/* Student Name */}
                      <h4 className="mt-3 font-display font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors text-center truncate">
                        {row.name}
                      </h4>

                      {/* Father Name */}
                      <p className="text-xs text-slate-500 text-center font-medium truncate mt-0.5">
                        S/D of {row.fatherName}
                      </p>
                    </div>

                    {/* Present College */}
                    <div className="mt-3">
                      <div className="rounded-xl bg-emerald-50/90 border border-emerald-200/80 p-1.5 text-center shadow-2xs">
                        <p className="text-xs font-bold text-emerald-900 truncate">
                          🏥 {row.college}
                        </p>
                        <p className="text-[10px] text-emerald-700 font-semibold">
                          {row.degree} · {row.marks}/720
                        </p>
                      </div>
                      <p className="mt-1.5 text-[10px] text-center text-slate-400 font-medium group-hover:text-emerald-600 transition-colors">
                        Click for full details →
                      </p>
                    </div>
                  </div>
                ))}

              {/* NDA Written Cards */}
              {activeTab === "competitive" && compSubTab === "nda" &&
                filteredNda.map((row) => (
                  <div
                    key={`${row.year}-${row.name}`}
                    onClick={() =>
                      setSelectedStudent({
                        name: row.name,
                        photo: row.photo,
                        fatherName: row.fatherName,
                        address: row.address,
                        category: "NDA Written Officer Cadre Selection",
                        year: row.year,
                        scoreText: row.status,
                        rankBadge: "NDA Cadet",
                        college: row.college,
                        description: `${row.name} cleared the prestigious UPSC National Defence Academy (NDA) written examination with ${row.status}, admitted for training towards defense officer commissions at ${row.college}. Son/Daughter of ${row.fatherName}, residing at ${row.address}. A pride of BR Gyan Deep Sr Sec School.`,
                      })
                    }
                    className="group cursor-pointer rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500 hover:shadow-xl hover:bg-amber-50/10 flex flex-col justify-between"
                  >
                    <div>
                      {/* Photo with NDA cadet badge */}
                      <div className="relative flex justify-center">
                        <StudentAvatar src={row.photo} name={row.name} size="md" />
                        <span className="absolute -bottom-1 inline-flex items-center gap-0.5 rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[9px] font-bold text-amber-900 shadow-xs">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          Cadet
                        </span>
                      </div>

                      {/* Student Name */}
                      <h4 className="mt-3 font-display font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors text-center truncate">
                        {row.name}
                      </h4>

                      {/* Father Name */}
                      <p className="text-xs text-slate-500 text-center font-medium truncate mt-0.5">
                        S/D of {row.fatherName}
                      </p>
                    </div>

                    {/* Present College / Academy */}
                    <div className="mt-3">
                      <div className="rounded-xl bg-amber-50/90 border border-amber-200/80 p-1.5 text-center shadow-2xs">
                        <p className="text-xs font-bold text-amber-950 truncate">
                          🎖️ {row.college}
                        </p>
                        <p className="text-[10px] text-amber-800 font-semibold">
                          {row.status} · Batch {row.year}
                        </p>
                      </div>
                      <p className="mt-1.5 text-[10px] text-center text-slate-400 font-medium group-hover:text-amber-600 transition-colors">
                        Click for full details →
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* =================================================================
              ALTERNATIVE TABLE VIEW (AVAILABLE VIA TOGGLE)
          ================================================================= */}
          {viewMode === "table" && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto [scrollbar-width:thin]">
                {activeTab === "class10" && (
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-white">
                      <tr>
                        <th className="px-4 py-3.5 sm:px-6">Roll No</th>
                        <th className="px-4 py-3.5 sm:px-6">Student (Photo &amp; Name)</th>
                        <th className="px-4 py-3.5 sm:px-6">Father's Name</th>
                        <th className="px-4 py-3.5 sm:px-6">Address</th>
                        <th className="px-4 py-3.5 sm:px-6 text-right">Score (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredClass10.map((row, idx) => (
                        <tr
                          key={row.rollNo}
                          onClick={() =>
                            setSelectedStudent({
                              name: row.name,
                              photo: row.photo,
                              fatherName: row.fatherName,
                              address: row.address,
                              category: "Class 10th CBSE Examination",
                              year: row.year,
                              rollNo: row.rollNo,
                              scoreText: `${row.score.toFixed(1)}%`,
                              rankBadge: idx < 3 ? `Rank ${idx + 1}` : "Distinction",
                              description: `${row.name} scored ${row.score.toFixed(1)}% in Class 10th CBSE from BR Gyan Deep Sr Sec School. Son/Daughter of ${row.fatherName}, residing at ${row.address}.`,
                            })
                          }
                          className="cursor-pointer transition-colors hover:bg-slate-50"
                        >
                          <td className="px-4 py-3 sm:px-6 font-mono font-bold text-slate-800">
                            <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                              {row.rollNo}
                            </span>
                          </td>
                          <td className="px-4 py-3 sm:px-6">
                            <div className="flex items-center gap-3">
                              <StudentAvatar src={row.photo} name={row.name} size="sm" />
                              <div>
                                <span className="font-bold text-slate-900 block">{row.name}</span>
                                <span className="text-[11px] text-slate-500">
                                  Batch {row.year}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 text-slate-600 font-medium">
                            {row.fatherName}
                          </td>
                          <td className="px-4 py-3 sm:px-6 text-slate-600 font-medium">
                            📍 {row.address}
                          </td>
                          <td className="px-4 py-3 sm:px-6 text-right">
                            <span className="inline-block rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 font-mono text-xs font-extrabold text-emerald-800 shadow-2xs">
                              {row.score.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === "class12" && (
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-white">
                      <tr>
                        <th className="px-4 py-3.5 sm:px-6">Year</th>
                        <th className="px-4 py-3.5 sm:px-6">Stream</th>
                        <th className="px-4 py-3.5 sm:px-6">Student (Photo &amp; Name)</th>
                        <th className="px-4 py-3.5 sm:px-6">Father's Name</th>
                        <th className="px-4 py-3.5 sm:px-6">Address</th>
                        <th className="px-4 py-3.5 sm:px-6 text-right">Score (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredClass12.map((row) => (
                        <tr
                          key={`${row.year}-${row.name}`}
                          onClick={() =>
                            setSelectedStudent({
                              name: row.name,
                              photo: row.photo,
                              fatherName: row.fatherName,
                              address: row.address,
                              category: `Class 12th CBSE (${row.stream})`,
                              year: row.year,
                              stream: row.stream,
                              scoreText: `${row.score.toFixed(1)}%`,
                              rankBadge: row.stream,
                              description: `${row.name} scored ${row.score.toFixed(1)}% in Class 12th CBSE (${row.stream}) from BR Gyan Deep Sr Sec School. Son/Daughter of ${row.fatherName}, residing at ${row.address}.`,
                            })
                          }
                          className="cursor-pointer transition-colors hover:bg-slate-50"
                        >
                          <td className="px-4 py-3 sm:px-6 font-mono font-bold text-slate-700">
                            {row.year}
                          </td>
                          <td className="px-4 py-3 sm:px-6">
                            <span className="inline-block rounded-md bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-bold uppercase text-blue-700">
                              {row.stream}
                            </span>
                          </td>
                          <td className="px-4 py-3 sm:px-6">
                            <div className="flex items-center gap-3">
                              <StudentAvatar src={row.photo} name={row.name} size="sm" />
                              <span className="font-bold text-slate-900">{row.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 text-slate-600 font-medium">
                            {row.fatherName}
                          </td>
                          <td className="px-4 py-3 sm:px-6 text-slate-600 font-medium">
                            📍 {row.address}
                          </td>
                          <td className="px-4 py-3 sm:px-6 text-right">
                            <span className="inline-block rounded-full bg-blue-100 border border-blue-300 px-3 py-1 font-mono text-xs font-extrabold text-blue-900 shadow-2xs">
                              {row.score.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === "competitive" && (
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-white">
                      <tr>
                        <th className="px-4 py-3.5 sm:px-6">Year</th>
                        <th className="px-4 py-3.5 sm:px-6">Student (Photo &amp; Name)</th>
                        <th className="px-4 py-3.5 sm:px-6">Father's Name</th>
                        <th className="px-4 py-3.5 sm:px-6">Present College / Academy</th>
                        <th className="px-4 py-3.5 sm:px-6 text-right">Rank / Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {compSubTab === "jee" &&
                        filteredJee.map((row) => (
                          <tr
                            key={`${row.year}-${row.name}`}
                            onClick={() =>
                              setSelectedStudent({
                                name: row.name,
                                photo: row.photo,
                                fatherName: row.fatherName,
                                address: row.address,
                                category: "JEE Advanced Entrance Selection",
                                year: row.year,
                                scoreText: `${row.marks} / 360`,
                                rankBadge: `AIR ${row.airRank}`,
                                college: row.college,
                                degree: row.degree,
                                description: `${row.name} qualified JEE Advanced with AIR ${row.airRank} and ${row.marks}/360 marks, entering ${row.college} for ${row.degree}. Son/Daughter of ${row.fatherName}, residing at ${row.address}.`,
                              })
                            }
                            className="cursor-pointer transition-colors hover:bg-slate-50"
                          >
                            <td className="px-4 py-3 sm:px-6 font-mono font-bold text-slate-700">
                              {row.year}
                            </td>
                            <td className="px-4 py-3 sm:px-6">
                              <div className="flex items-center gap-3">
                                <StudentAvatar src={row.photo} name={row.name} size="sm" />
                                <span className="font-bold text-slate-900">{row.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 sm:px-6 text-slate-600 font-medium">
                              {row.fatherName}
                            </td>
                            <td className="px-4 py-3 sm:px-6">
                              <span className="font-bold text-blue-700 block">{row.college}</span>
                              <span className="text-xs text-slate-500">{row.degree}</span>
                            </td>
                            <td className="px-4 py-3 sm:px-6 text-right">
                              <span className="inline-block rounded-full bg-amber-100 border border-amber-300 px-3 py-1 font-mono text-xs font-extrabold text-amber-900 shadow-2xs">
                                AIR {row.airRank}
                              </span>
                            </td>
                          </tr>
                        ))}

                      {compSubTab === "neet" &&
                        filteredNeet.map((row) => (
                          <tr
                            key={`${row.year}-${row.name}`}
                            onClick={() =>
                              setSelectedStudent({
                                name: row.name,
                                photo: row.photo,
                                fatherName: row.fatherName,
                                address: row.address,
                                category: "NEET UG Entrance Selection",
                                year: row.year,
                                scoreText: `${row.marks} / 720`,
                                rankBadge: `AIR ${row.airRank}`,
                                college: row.college,
                                degree: row.degree,
                                description: `${row.name} secured NEET AIR ${row.airRank} with ${row.marks}/720 marks, joining MBBS at ${row.college}. Son/Daughter of ${row.fatherName}, residing at ${row.address}.`,
                              })
                            }
                            className="cursor-pointer transition-colors hover:bg-slate-50"
                          >
                            <td className="px-4 py-3 sm:px-6 font-mono font-bold text-slate-700">
                              {row.year}
                            </td>
                            <td className="px-4 py-3 sm:px-6">
                              <div className="flex items-center gap-3">
                                <StudentAvatar src={row.photo} name={row.name} size="sm" />
                                <span className="font-bold text-slate-900">{row.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 sm:px-6 text-slate-600 font-medium">
                              {row.fatherName}
                            </td>
                            <td className="px-4 py-3 sm:px-6">
                              <span className="font-bold text-emerald-700 block">{row.college}</span>
                              <span className="text-xs text-slate-500">{row.degree} · {row.marks}/720</span>
                            </td>
                            <td className="px-4 py-3 sm:px-6 text-right">
                              <span className="inline-block rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 font-mono text-xs font-extrabold text-emerald-900 shadow-2xs">
                                AIR {row.airRank}
                              </span>
                            </td>
                          </tr>
                        ))}

                      {compSubTab === "nda" &&
                        filteredNda.map((row) => (
                          <tr
                            key={`${row.year}-${row.name}`}
                            onClick={() =>
                              setSelectedStudent({
                                name: row.name,
                                photo: row.photo,
                                fatherName: row.fatherName,
                                address: row.address,
                                category: "NDA Written Officer Cadre Selection",
                                year: row.year,
                                scoreText: row.status,
                                rankBadge: "Cadet",
                                college: row.college,
                                description: `${row.name} cleared UPSC NDA Written Examination (${row.status}), joining ${row.college}. Son/Daughter of ${row.fatherName}, residing at ${row.address}.`,
                              })
                            }
                            className="cursor-pointer transition-colors hover:bg-slate-50"
                          >
                            <td className="px-4 py-3 sm:px-6 font-mono font-bold text-slate-700">
                              {row.year}
                            </td>
                            <td className="px-4 py-3 sm:px-6">
                              <div className="flex items-center gap-3">
                                <StudentAvatar src={row.photo} name={row.name} size="sm" />
                                <span className="font-bold text-slate-900">{row.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 sm:px-6 text-slate-600 font-medium">
                              {row.fatherName}
                            </td>
                            <td className="px-4 py-3 sm:px-6">
                              <span className="font-bold text-amber-900 block">{row.college}</span>
                            </td>
                            <td className="px-4 py-3 sm:px-6 text-right">
                              <span className="inline-block rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-bold text-amber-900 shadow-2xs">
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </section>
  );
}

export default ResultsSection;
