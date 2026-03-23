/**
 * credentials.js
 * ──────────────
 * Single source of truth for all demo login credentials.
 * Both Login.jsx and AuthForms.jsx import from here.
 */

/* Helper: generate a doctor credential entry */
const doc = (id, email) => ({ email, password: "doctor", role: "doctor", doctorId: id });

export const credentials = {
  /* ── System Accounts ── */
  admin:   { email: "admin@hms.local",   password: "admin",   role: "admin" },
  doctor:  { email: "doctor@hms.local",  password: "doctor",  role: "doctor", doctorId: "dr-aisha-verma" },
  patient: { email: "patient@hms.local", password: "patient", role: "patient" },
  staff:   { email: "staff@hms.local",   password: "staff",   role: "staff" },

  /* ── Cardiology ── */
  "dr-aisha-verma":      doc("dr-aisha-verma",      "aisha@hms.local"),
  "dr-vikram-deshmukh":  doc("dr-vikram-deshmukh",  "vikram@hms.local"),
  "dr-nisha-kapoor":     doc("dr-nisha-kapoor",     "nisha@hms.local"),
  "dr-arjun-malhotra":   doc("dr-arjun-malhotra",   "arjun@hms.local"),

  /* ── Orthopedics ── */
  "dr-rajesh-bhatia":    doc("dr-rajesh-bhatia",    "rajesh.bhatia@hms.local"),
  "dr-sneha-mehta":      doc("dr-sneha-mehta",      "sneha.mehta@hms.local"),
  "dr-prakash-reddy":    doc("dr-prakash-reddy",    "prakash.reddy@hms.local"),
  "dr-manish-tanwar":    doc("dr-manish-tanwar",    "manish.tanwar@hms.local"),

  /* ── Pediatrics ── */
  "dr-priya-sharma":       doc("dr-priya-sharma",       "priya.sharma@hms.local"),
  "dr-rahul-gupta-pedi":   doc("dr-rahul-gupta-pedi",   "rahul.gupta@hms.local"),
  "dr-anita-joshi-pedi":   doc("dr-anita-joshi-pedi",   "anita.joshi@hms.local"),
  "dr-sudhir-kumar-pedi":  doc("dr-sudhir-kumar-pedi",  "sudhir.kumar@hms.local"),

  /* ── Gynecology ── */
  "dr-sunita-agarwal":          doc("dr-sunita-agarwal",          "sunita.agarwal@hms.local"),
  "dr-kavita-singh-gyne":       doc("dr-kavita-singh-gyne",       "kavita.singh@hms.local"),
  "dr-rekha-yadav-gyne":        doc("dr-rekha-yadav-gyne",        "rekha.yadav@hms.local"),
  "dr-deepika-chaudhary-gyne":  doc("dr-deepika-chaudhary-gyne",  "deepika.chaudhary@hms.local"),

  /* ── Neurology ── */
  "dr-sandeep-kumar-neuro":  doc("dr-sandeep-kumar-neuro",  "sandeep.kumar@hms.local"),
  "dr-meera-patel-neuro":    doc("dr-meera-patel-neuro",    "meera.patel@hms.local"),
  "dr-amit-tiwari-neuro":    doc("dr-amit-tiwari-neuro",    "amit.tiwari@hms.local"),
  "dr-ritu-verma-neuro":     doc("dr-ritu-verma-neuro",     "ritu.verma@hms.local"),

  /* ── Radiology ── */
  "dr-ashok-kumar-radio":   doc("dr-ashok-kumar-radio",   "ashok.kumar@hms.local"),
  "dr-neelam-gupta-radio":  doc("dr-neelam-gupta-radio",  "neelam.gupta@hms.local"),
  "dr-vivek-sharma-radio":  doc("dr-vivek-sharma-radio",  "vivek.sharma@hms.local"),
  "dr-pooja-rawat-radio":   doc("dr-pooja-rawat-radio",   "pooja.rawat@hms.local"),

  /* ── Accident & Trauma ── */
  "dr-vikrant-chauhan-trauma":  doc("dr-vikrant-chauhan-trauma",  "vikrant.chauhan@hms.local"),
  "dr-shalini-rao-trauma":     doc("dr-shalini-rao-trauma",      "shalini.rao@hms.local"),
  "dr-pawan-mishra-trauma":    doc("dr-pawan-mishra-trauma",      "pawan.mishra@hms.local"),
  "dr-nandini-singh-trauma":   doc("dr-nandini-singh-trauma",     "nandini.singh@hms.local"),

  /* ── Physiotherapy ── */
  "dr-anand-sharma-physio":   doc("dr-anand-sharma-physio",   "anand.sharma@hms.local"),
  "dr-nisha-rawat-physio":    doc("dr-nisha-rawat-physio",    "nisha.rawat@hms.local"),
  "dr-ravi-malhotra-physio":  doc("dr-ravi-malhotra-physio",  "ravi.malhotra@hms.local"),
  "dr-pallavi-joshi-physio":  doc("dr-pallavi-joshi-physio",  "pallavi.joshi@hms.local"),

  /* ── Dentistry ── */
  "dr-rohit-mehra-dent":   doc("dr-rohit-mehra-dent",   "rohit.mehra@hms.local"),
  "dr-shweta-kapoor-dent": doc("dr-shweta-kapoor-dent", "shweta.kapoor@hms.local"),
  "dr-arun-kumar-dent":    doc("dr-arun-kumar-dent",    "arun.kumar@hms.local"),
  "dr-divya-singh-dent":   doc("dr-divya-singh-dent",   "divya.singh@hms.local"),

  /* ── Diabetes & Endocrinology ── */
  "dr-sanjay-mittal-endo":  doc("dr-sanjay-mittal-endo",  "sanjay.mittal@hms.local"),
  "dr-prerna-singh-endo":   doc("dr-prerna-singh-endo",   "prerna.singh@hms.local"),
  "dr-nikhil-verma-endo":   doc("dr-nikhil-verma-endo",   "nikhil.verma@hms.local"),
  "dr-rina-patel-endo":     doc("dr-rina-patel-endo",     "rina.patel@hms.local"),

  /* ── Obstetrics & Gynaecology ── */
  "dr-anjali-mehta-obgyn":    doc("dr-anjali-mehta-obgyn",    "anjali.mehta@hms.local"),
  "dr-ranjit-chopra-obgyn":   doc("dr-ranjit-chopra-obgyn",   "ranjit.chopra@hms.local"),
  "dr-kriti-bhatia-obgyn":    doc("dr-kriti-bhatia-obgyn",    "kriti.bhatia@hms.local"),
  "dr-mansi-aggarwal-obgyn":  doc("dr-mansi-aggarwal-obgyn",  "mansi.aggarwal@hms.local"),

  /* ── Nephrology & Dialysis ── */
  "dr-rajiv-saxena-nephro":   doc("dr-rajiv-saxena-nephro",   "rajiv.saxena@hms.local"),
  "dr-shikha-jain-nephro":    doc("dr-shikha-jain-nephro",    "shikha.jain@hms.local"),
  "dr-anurag-tiwari-nephro":  doc("dr-anurag-tiwari-nephro",  "anurag.tiwari@hms.local"),
  "dr-pooja-arora-nephro":    doc("dr-pooja-arora-nephro",    "pooja.arora@hms.local"),

  /* ── Anaesthesiology ── */
  "dr-arun-bahl-anaes":     doc("dr-arun-bahl-anaes",     "arun.bahl@hms.local"),
  "dr-nidhi-chauhan-anaes": doc("dr-nidhi-chauhan-anaes", "nidhi.chauhan@hms.local"),
  "dr-vikash-singh-anaes":  doc("dr-vikash-singh-anaes",  "vikash.singh@hms.local"),
  "dr-swati-mathur-anaes":  doc("dr-swati-mathur-anaes",  "swati.mathur@hms.local"),

  /* ── Urology ── */
  "dr-manoj-kumar-uro":   doc("dr-manoj-kumar-uro",   "manoj.kumar@hms.local"),
  "dr-priya-kapoor-uro":  doc("dr-priya-kapoor-uro",  "priya.kapoor@hms.local"),
  "dr-saurabh-jain-uro":  doc("dr-saurabh-jain-uro",  "saurabh.jain@hms.local"),
  "dr-neha-agarwal-uro":  doc("dr-neha-agarwal-uro",  "neha.agarwal@hms.local"),
};

/* ── Department-wise doctor list for Demo sections ── */
export const demoDepartments = [
  { dept: "Cardiology", doctors: [
    { label: "Dr. Aisha Verma", email: "aisha@hms.local" },
    { label: "Dr. Vikram Deshmukh", email: "vikram@hms.local" },
    { label: "Dr. Nisha Kapoor", email: "nisha@hms.local" },
    { label: "Dr. Arjun Malhotra", email: "arjun@hms.local" },
  ]},
  { dept: "Orthopedics", doctors: [
    { label: "Dr. Rajesh Bhatia", email: "rajesh.bhatia@hms.local" },
    { label: "Dr. Sneha Mehta", email: "sneha.mehta@hms.local" },
    { label: "Dr. Prakash Reddy", email: "prakash.reddy@hms.local" },
    { label: "Dr. Manish Tanwar", email: "manish.tanwar@hms.local" },
  ]},
  { dept: "Pediatrics", doctors: [
    { label: "Dr. Priya Sharma", email: "priya.sharma@hms.local" },
    { label: "Dr. Rahul Gupta", email: "rahul.gupta@hms.local" },
    { label: "Dr. Anita Joshi", email: "anita.joshi@hms.local" },
    { label: "Dr. Sudhir Kumar", email: "sudhir.kumar@hms.local" },
  ]},
  { dept: "Gynecology", doctors: [
    { label: "Dr. Sunita Agarwal", email: "sunita.agarwal@hms.local" },
    { label: "Dr. Kavita Singh", email: "kavita.singh@hms.local" },
    { label: "Dr. Rekha Yadav", email: "rekha.yadav@hms.local" },
    { label: "Dr. Deepika Chaudhary", email: "deepika.chaudhary@hms.local" },
  ]},
  { dept: "Neurology", doctors: [
    { label: "Dr. Sandeep Kumar", email: "sandeep.kumar@hms.local" },
    { label: "Dr. Meera Patel", email: "meera.patel@hms.local" },
    { label: "Dr. Amit Tiwari", email: "amit.tiwari@hms.local" },
    { label: "Dr. Ritu Verma", email: "ritu.verma@hms.local" },
  ]},
  { dept: "Radiology", doctors: [
    { label: "Dr. Ashok Kumar", email: "ashok.kumar@hms.local" },
    { label: "Dr. Neelam Gupta", email: "neelam.gupta@hms.local" },
    { label: "Dr. Vivek Sharma", email: "vivek.sharma@hms.local" },
    { label: "Dr. Pooja Rawat", email: "pooja.rawat@hms.local" },
  ]},
  { dept: "Accident & Trauma", doctors: [
    { label: "Dr. Vikrant Chauhan", email: "vikrant.chauhan@hms.local" },
    { label: "Dr. Shalini Rao", email: "shalini.rao@hms.local" },
    { label: "Dr. Pawan Mishra", email: "pawan.mishra@hms.local" },
    { label: "Dr. Nandini Singh", email: "nandini.singh@hms.local" },
  ]},
  { dept: "Physiotherapy", doctors: [
    { label: "Dr. Anand Sharma", email: "anand.sharma@hms.local" },
    { label: "Dr. Nisha Rawat", email: "nisha.rawat@hms.local" },
    { label: "Dr. Ravi Malhotra", email: "ravi.malhotra@hms.local" },
    { label: "Dr. Pallavi Joshi", email: "pallavi.joshi@hms.local" },
  ]},
  { dept: "Dentistry", doctors: [
    { label: "Dr. Rohit Mehra", email: "rohit.mehra@hms.local" },
    { label: "Dr. Shweta Kapoor", email: "shweta.kapoor@hms.local" },
    { label: "Dr. Arun Kumar", email: "arun.kumar@hms.local" },
    { label: "Dr. Divya Singh", email: "divya.singh@hms.local" },
  ]},
  { dept: "Diabetes & Endocrinology", doctors: [
    { label: "Dr. Sanjay Mittal", email: "sanjay.mittal@hms.local" },
    { label: "Dr. Prerna Singh", email: "prerna.singh@hms.local" },
    { label: "Dr. Nikhil Verma", email: "nikhil.verma@hms.local" },
    { label: "Dr. Rina Patel", email: "rina.patel@hms.local" },
  ]},
  { dept: "Obstetrics & Gynaecology", doctors: [
    { label: "Dr. Anjali Mehta", email: "anjali.mehta@hms.local" },
    { label: "Dr. Ranjit Chopra", email: "ranjit.chopra@hms.local" },
    { label: "Dr. Kriti Bhatia", email: "kriti.bhatia@hms.local" },
    { label: "Dr. Mansi Aggarwal", email: "mansi.aggarwal@hms.local" },
  ]},
  { dept: "Nephrology & Dialysis", doctors: [
    { label: "Dr. Rajiv Saxena", email: "rajiv.saxena@hms.local" },
    { label: "Dr. Shikha Jain", email: "shikha.jain@hms.local" },
    { label: "Dr. Anurag Tiwari", email: "anurag.tiwari@hms.local" },
    { label: "Dr. Pooja Arora", email: "pooja.arora@hms.local" },
  ]},
  { dept: "Anaesthesiology", doctors: [
    { label: "Dr. Arun Bahl", email: "arun.bahl@hms.local" },
    { label: "Dr. Nidhi Chauhan", email: "nidhi.chauhan@hms.local" },
    { label: "Dr. Vikash Singh", email: "vikash.singh@hms.local" },
    { label: "Dr. Swati Mathur", email: "swati.mathur@hms.local" },
  ]},
  { dept: "Urology", doctors: [
    { label: "Dr. Manoj Kumar", email: "manoj.kumar@hms.local" },
    { label: "Dr. Priya Kapoor", email: "priya.kapoor@hms.local" },
    { label: "Dr. Saurabh Jain", email: "saurabh.jain@hms.local" },
    { label: "Dr. Neha Agarwal", email: "neha.agarwal@hms.local" },
  ]},
];

/* ── Helpers: email → doctorId mapping ── */
export const emailToDoctorId = {};
Object.values(credentials).forEach((c) => {
  if (c.doctorId) emailToDoctorId[c.email] = c.doctorId;
});

/* Read doctor overrides from localStorage */
export const getDoctorOverride = (doctorId) => {
  try {
    const raw = localStorage.getItem(`hmsDoctorSettings_${doctorId}`);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
};

/**
 * Get credentials for admin-added doctors from localStorage.
 * Returns { [doctorId]: { email, password, role, doctorId, department, name } }
 */
export const getAdminDoctorCredentials = () => {
  try {
    const raw = localStorage.getItem("hmsAdminDoctorCreds");
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
};

/**
 * Get credentials for all staff (both static staffData and admin-added).
 * Returns { [staffId]: { email, password, role, staffId, department, name } }
 */
export const getStaffCredentials = () => {
  const result = {};
  /* 1) Static staff from staffData import — use email + password */
  try {
    const raw = localStorage.getItem("hmsAdminStaff");
    if (raw) {
      JSON.parse(raw).forEach((s) => {
        result[s.id] = {
          email: s.loginId || s.email,
          password: s.password || "staff",
          role: "staff",
          staffId: s.id,
          department: s.department,
          name: s.name,
        };
      });
    }
  } catch { /* ignore */ }
  /* 2) Admin-added staff credentials override/extend */
  try {
    const raw = localStorage.getItem("hmsAdminStaffCreds");
    if (raw) {
      const adminCreds = JSON.parse(raw);
      Object.entries(adminCreds).forEach(([id, c]) => {
        result[id] = { ...result[id], ...c };
      });
    }
  } catch { /* ignore */ }
  return result;
};

/**
 * Get admin-added doctors grouped by department for the demo login section.
 * Returns array of { dept: string, doctors: [{ label, email, password }] }
 */
export const getAdminDemoDepartments = () => {
  try {
    const creds = getAdminDoctorCredentials();
    const entries = Object.values(creds);
    if (!entries.length) return [];
    const deptMap = {};
    entries.forEach((c) => {
      const dept = c.department || "General";
      if (!deptMap[dept]) deptMap[dept] = [];
      deptMap[dept].push({
        label: c.name || c.doctorId,
        email: c.email,
        password: c.password || "doctor",
      });
    });
    return Object.entries(deptMap).map(([dept, doctors]) => ({
      dept: `${dept} (New)`,
      doctors,
    }));
  } catch {
    return [];
  }
};

/**
 * Get staff demo list for login page.
 * Returns array of { label, email, password }
 */
export const getStaffDemoList = () => {
  try {
    const creds = getStaffCredentials();
    return Object.values(creds).map((c) => ({
      label: `${c.name} (${c.department})`,
      email: c.email,
      password: c.password || "staff",
    }));
  } catch {
    return [];
  }
};
