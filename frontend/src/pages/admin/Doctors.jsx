import { useState, useEffect, useRef } from "react";
import doctorsData from "../../data/doctorsData";
import { getDoctorPhoto } from "../../utils/getDoctorPhoto";
import "./Doctors.css";

/* ── localStorage keys ── */
const LS_KEY = "hmsAdminDoctors";
const PHOTO_KEY = "hmsAdminDocPhotos";
const CREDS_KEY = "hmsAdminDoctorCreds";
const VERSION_KEY = "hmsAdminDoctors_v";
const CURRENT_VERSION = 2; /* bump to force re-seed */

/* ══════════════════════════════════════════════════
   MAIN DEPARTMENT MAPPING
   Maps every doctor to one of 14 main departments
   based on their ID suffix and specializations.
   ══════════════════════════════════════════════════ */
const DEPARTMENTS = [
  "Cardiology",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
  "Neurology",
  "Radiology",
  "Accident & Trauma",
  "Physiotherapy",
  "Dentistry",
  "Diabetes & Endocrinology",
  "Obstetrics & Gynaecology",
  "Nephrology & Dialysis",
  "Anaesthesiology",
  "Urology",
];

/* ID-suffix → department */
const ID_DEPT_MAP = {
  trauma: "Accident & Trauma",
  physio: "Physiotherapy",
  dent: "Dentistry",
  endo: "Diabetes & Endocrinology",
  obgyn: "Obstetrics & Gynaecology",
  nephro: "Nephrology & Dialysis",
  anaes: "Anaesthesiology",
  uro: "Urology",
  pedi: "Pediatrics",
  gyne: "Gynecology",
  neuro: "Neurology",
  radio: "Radiology",
};

/* keyword → department (for specializations text matching) */
const KEYWORD_DEPT_MAP = [
  { keywords: ["cardiology", "cardiac", "heart", "coronary", "ecg", "echo"], dept: "Cardiology" },
  { keywords: ["orthoped", "joint replacement", "spine surgery", "arthroscop", "fracture", "bone tumor"], dept: "Orthopedics" },
  { keywords: ["pediatric", "neonat", "child", "nicu"], dept: "Pediatrics" },
  { keywords: ["gynecol", "pregnancy", "infertility", "obstetric", "reproductive", "laparoscopic gyn"], dept: "Gynecology" },
  { keywords: ["neurol", "stroke", "epilep", "movement disorder", "migraine", "neuromuscular"], dept: "Neurology" },
  { keywords: ["radiol", "imaging", "ultrasound", "doppler", "mri", "ct scan", "x-ray"], dept: "Radiology" },
  { keywords: ["trauma", "emergency", "critical care", "disaster", "resuscitation", "accident"], dept: "Accident & Trauma" },
  { keywords: ["physiotherapy", "rehabilitation", "sports rehab"], dept: "Physiotherapy" },
  { keywords: ["dental", "dentist", "orthodont", "endodont", "periodont", "oral", "maxillofacial"], dept: "Dentistry" },
  { keywords: ["diabetes", "endocrin", "thyroid", "pcos", "diabetol"], dept: "Diabetes & Endocrinology" },
  { keywords: ["maternal", "fetal", "uro-gyn", "menopause", "obgyn"], dept: "Obstetrics & Gynaecology" },
  { keywords: ["nephrol", "dialysis", "kidney", "ckd"], dept: "Nephrology & Dialysis" },
  { keywords: ["anaesth", "anesthes", "pain medicine"], dept: "Anaesthesiology" },
  { keywords: ["urol", "androl", "male infertil", "endourol", "laser urol"], dept: "Urology" },
];

const getMainDept = (doc) => {
  /* 1) check ID suffix  */
  const idParts = doc.id.split("-");
  const suffix = idParts[idParts.length - 1];
  if (ID_DEPT_MAP[suffix]) return ID_DEPT_MAP[suffix];

  /* 2) check specializations keywords */
  const specText = (doc.specializations || []).join(" ").toLowerCase();
  for (const { keywords, dept } of KEYWORD_DEPT_MAP) {
    if (keywords.some((kw) => specText.includes(kw))) return dept;
  }

  /* 3) Check if department field was explicitly set (admin-added docs) */
  if (doc.department && DEPARTMENTS.includes(doc.department)) return doc.department;

  return "General";
};

/* ── Load helpers ── */
const loadDoctors = () => {
  const savedVer = Number(localStorage.getItem(VERSION_KEY) || 0);
  if (savedVer >= CURRENT_VERSION) {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) return JSON.parse(saved);
  }
  /* Re-seed from doctorsData (version mismatch or first visit) */
  const list = Object.values(doctorsData).map((d) => ({
    id: d.id,
    name: d.name,
    photo: d.photo || "",
    specializations: d.specializations || [],
    qualifications: d.qualifications || [],
    experience: d.experience || "—",
    fee: d.fee || "—",
    recommended: d.recommended || "—",
    ratingsCount: d.ratingsCount || 0,
    patientsEnquired: d.patientsEnquired || 0,
    mobile: "",
    status: "Available",
  }));
  localStorage.setItem(LS_KEY, JSON.stringify(list));
  localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION));
  return list;
};

const loadPhotos = () => {
  try { return JSON.parse(localStorage.getItem(PHOTO_KEY) || "{}"); }
  catch { return {}; }
};
const savePhotos = (p) => localStorage.setItem(PHOTO_KEY, JSON.stringify(p));

/* ── Credential helpers for admin-added doctors ── */
const loadCreds = () => {
  try { return JSON.parse(localStorage.getItem(CREDS_KEY) || "{}"); }
  catch { return {}; }
};
const saveCreds = (c) => localStorage.setItem(CREDS_KEY, JSON.stringify(c));

const generateEmail = (slug) => {
  /* dr-ra-hind → ra.hind@hms.local */
  const parts = slug.replace(/^dr-/, "").split("-");
  return parts.join(".") + "@hms.local";
};

/* Group doctors by MAIN department */
const buildDeptMap = (docs) => {
  const map = {};
  docs.forEach((d) => {
    const dept = getMainDept(d);
    if (!map[dept]) map[dept] = [];
    map[dept].push(d);
  });
  /* Sort departments in DEPARTMENTS order, then alphabetical for any extras */
  const ordered = {};
  DEPARTMENTS.forEach((dept) => {
    if (map[dept]) ordered[dept] = map[dept];
  });
  Object.keys(map)
    .filter((d) => !ordered[d])
    .sort()
    .forEach((d) => {
      ordered[d] = map[d];
    });
  return ordered;
};

const emptyForm = {
  name: "",
  department: "Cardiology",
  specializations: "",
  qualifications: "",
  experience: "",
  fee: "",
  mobile: "",
  email: "",
  loginId: "",
  password: "doctor",
  roomNumber: "",
  dutyShift: "",
  status: "Available",
};

/* ══════════════════════════════════════════ */

const Doctors = () => {
  const [doctors, setDoctors] = useState(loadDoctors);
  const [photos, setPhotos] = useState(loadPhotos);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [uploadPreview, setUploadPreview] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [collapsedDepts, setCollapsedDepts] = useState({});
  const fileRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(doctors));
  }, [doctors]);

  /* ── Filter ── */
  const filtered = doctors.filter((d) => {
    const t = search.toLowerCase();
    const mainDept = getMainDept(d).toLowerCase();
    const matchSearch =
      d.name.toLowerCase().includes(t) ||
      d.id.toLowerCase().includes(t) ||
      mainDept.includes(t) ||
      (d.specializations || []).some((s) => s.toLowerCase().includes(t));
    const matchStatus = filterStatus === "All" || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const deptMap = buildDeptMap(filtered);
  const deptNames = Object.keys(deptMap);
  const totalDepts = Object.keys(buildDeptMap(doctors)).length;

  /* ── Photo upload ── */
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Photo must be under 2 MB"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setUploadPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  /* ── Add doctor ── */
  const handleAdd = (e) => {
    e.preventDefault();
    const slug =
      "dr-" +
      form.name
        .toLowerCase()
        .replace(/^dr\.?\s*/i, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    const autoEmail = generateEmail(slug);
    const newDoc = {
      id: slug,
      name: form.name.startsWith("Dr.") ? form.name : `Dr. ${form.name}`,
      photo: "",
      department: form.department,
      specializations: form.specializations
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      qualifications: form.qualifications
        .split(",")
        .map((q) => q.trim())
        .filter(Boolean),
      experience: form.experience || "—",
      fee: form.fee || "—",
      mobile: form.mobile || "",
      email: form.email || autoEmail,
      loginId: form.loginId || autoEmail,
      password: form.password || "doctor",
      roomNumber: form.roomNumber || "",
      dutyShift: form.dutyShift || "",
      recommended: "—",
      ratingsCount: 0,
      patientsEnquired: 0,
      status: form.status,
    };
    if (uploadPreview) {
      const updated = { ...photos, [slug]: uploadPreview };
      setPhotos(updated);
      savePhotos(updated);
    }
    /* Auto-generate login credentials for admin-added doctors */
    const originalIds = new Set(Object.keys(doctorsData));
    if (!originalIds.has(slug)) {
      const creds = loadCreds();
      creds[slug] = {
        email: form.loginId || autoEmail,
        password: form.password || "doctor",
        role: "doctor",
        doctorId: slug,
        department: form.department,
        name: newDoc.name,
      };
      saveCreds(creds);
    }
    setDoctors((prev) => [newDoc, ...prev]);
    setForm({ ...emptyForm });
    setUploadPreview(null);
    if (fileRef.current) fileRef.current.value = "";
    setShowAdd(false);
  };

  /* ── Delete ── */
  const handleDelete = (id) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    const updated = { ...photos };
    delete updated[id];
    setPhotos(updated);
    savePhotos(updated);
    /* Also remove credentials for admin-added doctors */
    const creds = loadCreds();
    if (creds[id]) {
      delete creds[id];
      saveCreds(creds);
    }
    setDeleteConfirm(null);
    if (selected?.id === id) setSelected(null);
  };

  /* ── Status cycle ── */
  const cycleStatus = (id) => {
    const order = ["Available", "In Surgery", "On Leave"];
    setDoctors((prev) =>
      prev.map((d) =>
        d.id !== id
          ? d
          : { ...d, status: order[(order.indexOf(d.status) + 1) % order.length] }
      )
    );
  };

  /* ── Dept collapse ── */
  const toggleDept = (dept) =>
    setCollapsedDepts((p) => ({ ...p, [dept]: !p[dept] }));

  const allCollapsed = deptNames.length > 0 && deptNames.every((d) => collapsedDepts[d]);

  /* ── Photo getter ── */
  const getPhoto = (doc) => {
    if (photos[doc.id]) return photos[doc.id];
    if (doc.photo) return getDoctorPhoto(doc.id, doc.photo);
    return null;
  };

  const initials = (name) =>
    name
      .replace(/^Dr\.?\s*/i, "")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  /* ══════════════════ RENDER ══════════════════ */
  return (
    <div className="adm-doc">
      {/* ── Header ── */}
      <div className="adm-doc__header">
        <div>
          <h1>Doctors Directory</h1>
          <p>
            Manage {doctors.length} doctors across {totalDepts} departments
          </p>
        </div>
        <button className="adm-doc__add-btn" onClick={() => setShowAdd(true)}>
          + Add Doctor
        </button>
      </div>

      {/* ── Stat strip ── */}
      <div className="adm-doc__stats">
        <div className="adm-doc__stat">
          <span className="adm-doc__stat-val">{doctors.length}</span>
          <span className="adm-doc__stat-lbl">Total Doctors</span>
        </div>
        <div className="adm-doc__stat adm-doc__stat--blue">
          <span className="adm-doc__stat-val">{totalDepts}</span>
          <span className="adm-doc__stat-lbl">Departments</span>
        </div>
        <div className="adm-doc__stat adm-doc__stat--green">
          <span className="adm-doc__stat-val">
            {doctors.filter((d) => d.status === "Available").length}
          </span>
          <span className="adm-doc__stat-lbl">Available</span>
        </div>
        <div className="adm-doc__stat adm-doc__stat--amber">
          <span className="adm-doc__stat-val">
            {doctors.filter((d) => d.status === "In Surgery").length}
          </span>
          <span className="adm-doc__stat-lbl">In Surgery</span>
        </div>
        <div className="adm-doc__stat adm-doc__stat--red">
          <span className="adm-doc__stat-val">
            {doctors.filter((d) => d.status === "On Leave").length}
          </span>
          <span className="adm-doc__stat-lbl">On Leave</span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="adm-doc__filters">
        <input
          className="adm-doc__search"
          type="text"
          placeholder="🔍  Search by name, ID or department…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="adm-doc__select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option>Available</option>
          <option>In Surgery</option>
          <option>On Leave</option>
        </select>
        <button
          className="adm-doc__collapse-all"
          onClick={() => {
            const next = {};
            deptNames.forEach((d) => {
              next[d] = !allCollapsed;
            });
            setCollapsedDepts(next);
          }}
        >
          {allCollapsed ? "▼ Expand All" : "▲ Collapse All"}
        </button>
      </div>

      {/* ── Department sections ── */}
      {deptNames.length === 0 && (
        <p className="adm-doc__empty">No doctors match your search.</p>
      )}

      {deptNames.map((dept) => (
        <div className="adm-doc__dept" key={dept}>
          <div className="adm-doc__dept-header" onClick={() => toggleDept(dept)}>
            <div className="adm-doc__dept-info">
              <h2 className="adm-doc__dept-name">{dept}</h2>
              <span className="adm-doc__dept-count">
                {deptMap[dept].length} Doctor
                {deptMap[dept].length !== 1 ? "s" : ""}
              </span>
            </div>
            <span
              className={`adm-doc__dept-arrow ${
                !collapsedDepts[dept] ? "adm-doc__dept-arrow--open" : ""
              }`}
            >
              ▶
            </span>
          </div>

          {!collapsedDepts[dept] && (
            <div className="adm-doc__dept-grid">
              {deptMap[dept].map((doc) => (
                <div className="adm-doc__card" key={doc.id}>
                  <div className="adm-doc__card-top">
                    <div className="adm-doc__avatar">
                      {getPhoto(doc) ? (
                        <img src={getPhoto(doc)} alt={doc.name} />
                      ) : (
                        <span className="adm-doc__initials">
                          {initials(doc.name)}
                        </span>
                      )}
                    </div>
                    <div className="adm-doc__card-info">
                      <h3>{doc.name}</h3>
                      <p className="adm-doc__spec">
                        {(doc.specializations || []).join(", ") || "General"}
                      </p>
                      <span className="adm-doc__exp">
                        {doc.experience} yrs exp • {doc.fee}
                      </span>
                      {doc.mobile && (
                        <span className="adm-doc__mobile">📱 {doc.mobile}</span>
                      )}
                    </div>
                    <span
                      className={`adm-doc__badge adm-doc__badge--${doc.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      onClick={() => cycleStatus(doc.id)}
                      title="Click to change status"
                    >
                      {doc.status}
                    </span>
                  </div>
                  <div className="adm-doc__card-meta">
                    <span>⭐ {doc.recommended}</span>
                    <span>📝 {doc.ratingsCount} ratings</span>
                    <span>👥 {doc.patientsEnquired} patients</span>
                  </div>
                  <div className="adm-doc__card-actions">
                    <button
                      className="adm-doc__view-btn"
                      onClick={() => setSelected(doc)}
                    >
                      View Profile
                    </button>
                    <button
                      className="adm-doc__del-btn"
                      onClick={() => setDeleteConfirm(doc.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* ── Detail Modal ── */}
      {selected && (
        <div className="adm-doc__overlay" onClick={() => setSelected(null)}>
          <div className="adm-doc__modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="adm-doc__modal-close"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <div className="adm-doc__modal-header">
              <div className="adm-doc__modal-avatar">
                {getPhoto(selected) ? (
                  <img src={getPhoto(selected)} alt={selected.name} />
                ) : (
                  <span className="adm-doc__initials adm-doc__initials--lg">
                    {initials(selected.name)}
                  </span>
                )}
              </div>
              <div>
                <h2>{selected.name}</h2>
                <p className="adm-doc__modal-id">ID: {selected.id}</p>
                <span
                  className={`adm-doc__badge adm-doc__badge--${selected.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {selected.status}
                </span>
              </div>
            </div>
            <div className="adm-doc__modal-body">
              <div className="adm-doc__detail-row">
                <span className="adm-doc__detail-label">Department</span>
                <span className="adm-doc__dept-badge">{getMainDept(selected)}</span>
              </div>
              <div className="adm-doc__detail-row">
                <span className="adm-doc__detail-label">Specializations</span>
                <span>{(selected.specializations || []).join(", ") || "—"}</span>
              </div>
              <div className="adm-doc__detail-row">
                <span className="adm-doc__detail-label">Qualifications</span>
                <span>{(selected.qualifications || []).join(", ") || "—"}</span>
              </div>
              <div className="adm-doc__detail-row">
                <span className="adm-doc__detail-label">Experience</span>
                <span>{selected.experience} years</span>
              </div>
              <div className="adm-doc__detail-row">
                <span className="adm-doc__detail-label">Consultation Fee</span>
                <span>{selected.fee}</span>
              </div>
              {(selected.mobile || selected.email) && (
                <>
                  {selected.mobile && (
                    <div className="adm-doc__detail-row">
                      <span className="adm-doc__detail-label">Phone Number</span>
                      <span>📱 {selected.mobile}</span>
                    </div>
                  )}
                  {selected.email && (
                    <div className="adm-doc__detail-row">
                      <span className="adm-doc__detail-label">Email</span>
                      <span>✉️ {selected.email}</span>
                    </div>
                  )}
                </>
              )}
              {selected.roomNumber && (
                <div className="adm-doc__detail-row">
                  <span className="adm-doc__detail-label">Room Number</span>
                  <span>🏠 {selected.roomNumber}</span>
                </div>
              )}
              {selected.dutyShift && (
                <div className="adm-doc__detail-row">
                  <span className="adm-doc__detail-label">Duty Shift</span>
                  <span>🕐 {selected.dutyShift}</span>
                </div>
              )}
              {selected.loginId && (
                <div className="adm-doc__detail-row">
                  <span className="adm-doc__detail-label">Login ID</span>
                  <span className="adm-doc__cred-badge">🔑 {selected.loginId}</span>
                </div>
              )}
              <div className="adm-doc__detail-row">
                <span className="adm-doc__detail-label">Recommended</span>
                <span>{selected.recommended}</span>
              </div>
              <div className="adm-doc__detail-row">
                <span className="adm-doc__detail-label">Total Ratings</span>
                <span>{selected.ratingsCount}</span>
              </div>
              <div className="adm-doc__detail-row">
                <span className="adm-doc__detail-label">Patients Enquired</span>
                <span>{selected.patientsEnquired}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteConfirm && (
        <div
          className="adm-doc__overlay"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="adm-doc__confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to remove{" "}
              <strong>
                {doctors.find((d) => d.id === deleteConfirm)?.name}
              </strong>
              ? This action cannot be undone.
            </p>
            <div className="adm-doc__confirm-btns">
              <button
                className="adm-doc__confirm-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="adm-doc__confirm-delete"
                onClick={() => handleDelete(deleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Doctor Modal ── */}
      {showAdd && (
        <div
          className="adm-doc__overlay"
          onClick={() => {
            setShowAdd(false);
            setUploadPreview(null);
          }}
        >
          <div
            className="adm-doc__modal adm-doc__modal--form"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="adm-doc__modal-close"
              onClick={() => {
                setShowAdd(false);
                setUploadPreview(null);
              }}
            >
              ✕
            </button>
            <h2>Add New Doctor</h2>
            <form className="adm-doc__form" onSubmit={handleAdd}>
              {/* Photo Upload */}
              <div className="adm-doc__upload-area">
                <div
                  className="adm-doc__upload-preview"
                  onClick={() => fileRef.current?.click()}
                >
                  {uploadPreview ? (
                    <img src={uploadPreview} alt="Preview" />
                  ) : (
                    <span className="adm-doc__upload-placeholder">
                      📷
                      <br />
                      Upload Photo
                    </span>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="adm-doc__upload-input"
                  onChange={handlePhotoUpload}
                />
                <p className="adm-doc__upload-hint">
                  Click to upload doctor&apos;s photo (max 2 MB)
                </p>
              </div>

              <label>
                Full Name *
                <input
                  required
                  placeholder="Dr. John Doe"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </label>

              <label>
                Department *
                <select
                  required
                  value={form.department}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, department: e.target.value }))
                  }
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Specializations (comma separated)
                <input
                  placeholder="Interventional Cardiology, Cardiac Electrophysiology"
                  value={form.specializations}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, specializations: e.target.value }))
                  }
                />
              </label>

              <label>
                Qualifications (comma separated)
                <input
                  placeholder="MBBS, MD, DM"
                  value={form.qualifications}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, qualifications: e.target.value }))
                  }
                />
              </label>

              <div className="adm-doc__form-row">
                <label>
                  Experience
                  <input
                    placeholder="10+"
                    value={form.experience}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, experience: e.target.value }))
                    }
                  />
                </label>
                <label>
                  Consultation Fee
                  <input
                    placeholder="₹1200"
                    value={form.fee}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, fee: e.target.value }))
                    }
                  />
                </label>
              </div>

              <div className="adm-doc__form-row">
                <label>
                  Email
                  <input
                    type="email"
                    placeholder="doctor@hms.local"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </label>
                <label>
                  Mobile Number
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.mobile}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, mobile: e.target.value }))
                    }
                  />
                </label>
              </div>

              <div className="adm-doc__form-section-title">🔑 Login Credentials</div>
              <div className="adm-doc__form-row">
                <label>
                  Login ID (email)
                  <input
                    placeholder="Auto-generated if empty"
                    value={form.loginId}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, loginId: e.target.value }))
                    }
                  />
                </label>
                <label>
                  Password *
                  <input
                    required
                    placeholder="doctor"
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                  />
                </label>
              </div>

              <div className="adm-doc__form-section-title">🏥 Assignment</div>
              <div className="adm-doc__form-row">
                <label>
                  Room Number
                  <input
                    placeholder="Room 301"
                    value={form.roomNumber}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, roomNumber: e.target.value }))
                    }
                  />
                </label>
                <label>
                  Duty Shift
                  <select
                    value={form.dutyShift}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, dutyShift: e.target.value }))
                    }
                  >
                    <option value="">None</option>
                    <option>Morning Shift</option>
                    <option>Evening Shift</option>
                    <option>Night Shift</option>
                  </select>
                </label>
              </div>

              <label>
                Status
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, status: e.target.value }))
                  }
                >
                  <option>Available</option>
                  <option>In Surgery</option>
                  <option>On Leave</option>
                </select>
              </label>

              <button type="submit" className="adm-doc__submit-btn">
                Add Doctor
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
