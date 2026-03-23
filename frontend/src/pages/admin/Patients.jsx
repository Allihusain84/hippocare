import { useState, useEffect } from "react";
import { patients as seedPatients } from "../../data/mockData";
import "./Patients.css";

/* ── localStorage ── */
const LS_KEY = "hmsAdminPatients";

const loadPatients = () => {
  const saved = localStorage.getItem(LS_KEY);
  if (saved) return JSON.parse(saved);
  const list = seedPatients.map((p) => ({
    ...p,
    gender: p.gender || "—",
    phone: p.phone || "",
    email: p.email || "",
    address: p.address || "",
    bloodGroup: p.bloodGroup || "",
    emergencyContact: p.emergencyContact || "",
    admitDate: p.admitDate || new Date().toISOString().slice(0, 10),
    assignedDoctor: p.assignedDoctor || "",
    roomNumber: p.roomNumber || "",
    notes: p.notes || "",
  }));
  localStorage.setItem(LS_KEY, JSON.stringify(list));
  return list;
};

const emptyForm = {
  name: "",
  age: "",
  gender: "Male",
  phone: "",
  email: "",
  address: "",
  bloodGroup: "",
  emergencyContact: "",
  condition: "",
  assignedDoctor: "",
  roomNumber: "",
  notes: "",
  status: "Admitted",
};

const STATUS_OPTIONS = ["Admitted", "Observation", "Discharged", "Critical"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

/* ═══════════════════════════════════════════════ */

const Patients = () => {
  const [patients, setPatients] = useState(loadPatients);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(patients));
  }, [patients]);

  /* ── Stats ── */
  const totalAdmitted = patients.filter((p) => p.status === "Admitted").length;
  const totalCritical = patients.filter((p) => p.status === "Critical").length;
  const totalObservation = patients.filter((p) => p.status === "Observation").length;
  const totalDischarged = patients.filter((p) => p.status === "Discharged").length;

  /* ── Filter ── */
  const filtered = patients.filter((p) => {
    const t = search.toLowerCase();
    const matchSearch =
      p.name.toLowerCase().includes(t) ||
      p.id.toLowerCase().includes(t) ||
      (p.condition || "").toLowerCase().includes(t);
    const matchStatus = filterStatus === "All" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  /* ── Add patient ── */
  const handleAdd = (e) => {
    e.preventDefault();
    const maxId = patients.reduce((mx, p) => {
      const n = parseInt(p.id.replace("P-", ""), 10);
      return n > mx ? n : mx;
    }, 3000);
    const newPatient = {
      id: `P-${maxId + 1}`,
      name: form.name,
      age: Number(form.age) || 0,
      gender: form.gender,
      phone: form.phone,
      email: form.email,
      address: form.address,
      bloodGroup: form.bloodGroup,
      emergencyContact: form.emergencyContact,
      condition: form.condition,
      assignedDoctor: form.assignedDoctor,
      roomNumber: form.roomNumber,
      notes: form.notes,
      status: form.status,
      admitDate: new Date().toISOString().slice(0, 10),
    };
    setPatients((prev) => [newPatient, ...prev]);
    setForm({ ...emptyForm });
    setShowAdd(false);
  };

  /* ── Delete ── */
  const handleDelete = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
    if (selected?.id === id) setSelected(null);
  };

  /* ── Update Status ── */
  const handleStatusChange = (id, newStatus) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    if (selected?.id === id) setSelected({ ...selected, status: newStatus });
  };

  /* ── field helper ── */
  const f = (key, val) => setForm({ ...form, [key]: val });

  const statusClass = (s) => {
    const map = { Admitted: "blue", Critical: "red", Observation: "amber", Discharged: "green" };
    return map[s] || "blue";
  };

  return (
    <div className="adm-pat">
      {/* ── Header ── */}
      <div className="adm-pat__header">
        <div>
          <h1>👥 Patient Records</h1>
          <p>Track admissions, conditions, and ongoing care</p>
        </div>
        <button className="adm-pat__add-btn" onClick={() => setShowAdd(true)}>
          + Add Patient
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="adm-pat__stats">
        <div className="adm-pat__stat adm-pat__stat--blue">
          <span className="adm-pat__stat-val">{patients.length}</span>
          <span className="adm-pat__stat-lbl">Total Patients</span>
        </div>
        <div className="adm-pat__stat adm-pat__stat--cyan">
          <span className="adm-pat__stat-val">{totalAdmitted}</span>
          <span className="adm-pat__stat-lbl">Admitted</span>
        </div>
        <div className="adm-pat__stat adm-pat__stat--red">
          <span className="adm-pat__stat-val">{totalCritical}</span>
          <span className="adm-pat__stat-lbl">Critical</span>
        </div>
        <div className="adm-pat__stat adm-pat__stat--amber">
          <span className="adm-pat__stat-val">{totalObservation}</span>
          <span className="adm-pat__stat-lbl">Observation</span>
        </div>
        <div className="adm-pat__stat adm-pat__stat--green">
          <span className="adm-pat__stat-val">{totalDischarged}</span>
          <span className="adm-pat__stat-lbl">Discharged</span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="adm-pat__filters">
        <input
          className="adm-pat__search"
          placeholder="🔍 Search by name, ID, or condition…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="adm-pat__select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* ── Table ── */}
      <div className="adm-pat__table-wrap">
        <table className="adm-pat__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age / Gender</th>
              <th>Condition</th>
              <th>Phone</th>
              <th>Blood</th>
              <th>Room</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="9" className="adm-pat__empty">No patients found.</td>
              </tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} className="adm-pat__row">
                <td><span className="adm-pat__id-badge">{p.id}</span></td>
                <td><strong>{p.name}</strong></td>
                <td>{p.age} / {p.gender}</td>
                <td>{p.condition || "—"}</td>
                <td>{p.phone || "—"}</td>
                <td><span className="adm-pat__blood">{p.bloodGroup || "—"}</span></td>
                <td>{p.roomNumber || "—"}</td>
                <td>
                  <select
                    className={`adm-pat__status adm-pat__status--${statusClass(p.status)}`}
                    value={p.status}
                    onChange={(e) => handleStatusChange(p.id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="adm-pat__actions">
                    <button className="adm-pat__action-btn adm-pat__action-btn--view" onClick={() => setSelected(p)}>👁</button>
                    <button className="adm-pat__action-btn adm-pat__action-btn--del" onClick={() => setDeleteConfirm(p)}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ══════════ Add Patient Modal ══════════ */}
      {showAdd && (
        <div className="adm-pat__overlay" onClick={() => setShowAdd(false)}>
          <div className="adm-pat__modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-pat__modal-head">
              <h2>➕ Add New Patient</h2>
              <button className="adm-pat__close" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <form className="adm-pat__form" onSubmit={handleAdd}>
              {/* Row 1: Name + Age */}
              <div className="adm-pat__form-row">
                <label className="adm-pat__label">
                  Full Name *
                  <input required className="adm-pat__input" value={form.name} onChange={(e) => f("name", e.target.value)} placeholder="Patient name" />
                </label>
                <label className="adm-pat__label adm-pat__label--sm">
                  Age *
                  <input required type="number" min="0" max="150" className="adm-pat__input" value={form.age} onChange={(e) => f("age", e.target.value)} placeholder="Age" />
                </label>
              </div>

              {/* Row 2: Gender + Blood Group */}
              <div className="adm-pat__form-row">
                <label className="adm-pat__label">
                  Gender
                  <select className="adm-pat__input" value={form.gender} onChange={(e) => f("gender", e.target.value)}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="adm-pat__label">
                  Blood Group
                  <select className="adm-pat__input" value={form.bloodGroup} onChange={(e) => f("bloodGroup", e.target.value)}>
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Row 3: Phone + Email */}
              <div className="adm-pat__form-row">
                <label className="adm-pat__label">
                  Phone
                  <input className="adm-pat__input" value={form.phone} onChange={(e) => f("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
                </label>
                <label className="adm-pat__label">
                  Email
                  <input type="email" className="adm-pat__input" value={form.email} onChange={(e) => f("email", e.target.value)} placeholder="email@example.com" />
                </label>
              </div>

              {/* Row 4: Emergency Contact + Address */}
              <div className="adm-pat__form-row">
                <label className="adm-pat__label">
                  Emergency Contact
                  <input className="adm-pat__input" value={form.emergencyContact} onChange={(e) => f("emergencyContact", e.target.value)} placeholder="Contact name & number" />
                </label>
                <label className="adm-pat__label">
                  Address
                  <input className="adm-pat__input" value={form.address} onChange={(e) => f("address", e.target.value)} placeholder="City, State" />
                </label>
              </div>

              {/* Section: Medical */}
              <div className="adm-pat__form-section-title">🏥 Medical Information</div>

              {/* Row 5: Condition + Status */}
              <div className="adm-pat__form-row">
                <label className="adm-pat__label">
                  Condition / Diagnosis *
                  <input required className="adm-pat__input" value={form.condition} onChange={(e) => f("condition", e.target.value)} placeholder="e.g. Fracture, Hypertension" />
                </label>
                <label className="adm-pat__label">
                  Status
                  <select className="adm-pat__input" value={form.status} onChange={(e) => f("status", e.target.value)}>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Row 6: Doctor + Room */}
              <div className="adm-pat__form-row">
                <label className="adm-pat__label">
                  Assigned Doctor
                  <input className="adm-pat__input" value={form.assignedDoctor} onChange={(e) => f("assignedDoctor", e.target.value)} placeholder="Dr. Name" />
                </label>
                <label className="adm-pat__label adm-pat__label--sm">
                  Room / Bed
                  <input className="adm-pat__input" value={form.roomNumber} onChange={(e) => f("roomNumber", e.target.value)} placeholder="e.g. 301-A" />
                </label>
              </div>

              {/* Row 7: Notes */}
              <label className="adm-pat__label">
                Notes
                <textarea className="adm-pat__input adm-pat__textarea" rows="2" value={form.notes} onChange={(e) => f("notes", e.target.value)} placeholder="Additional notes…" />
              </label>

              <button type="submit" className="adm-pat__submit-btn">✅ Add Patient</button>
            </form>
          </div>
        </div>
      )}

      {/* ══════════ View Profile Modal ══════════ */}
      {selected && !deleteConfirm && (
        <div className="adm-pat__overlay" onClick={() => setSelected(null)}>
          <div className="adm-pat__modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-pat__modal-head">
              <h2>Patient Profile — {selected.name}</h2>
              <button className="adm-pat__close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="adm-pat__profile">
              <div className="adm-pat__profile-grid">
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">ID</span><span className="adm-pat__id-badge">{selected.id}</span></div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Name</span><strong>{selected.name}</strong></div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Age</span>{selected.age}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Gender</span>{selected.gender}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Blood Group</span><span className="adm-pat__blood">{selected.bloodGroup || "—"}</span></div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Phone</span>{selected.phone || "—"}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Email</span>{selected.email || "—"}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Address</span>{selected.address || "—"}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Emergency Contact</span>{selected.emergencyContact || "—"}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Condition</span>{selected.condition}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Status</span><span className={`adm-pat__badge adm-pat__badge--${statusClass(selected.status)}`}>{selected.status}</span></div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Room / Bed</span>{selected.roomNumber || "—"}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Assigned Doctor</span>{selected.assignedDoctor || "—"}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Admit Date</span>{selected.admitDate || "—"}</div>
                {selected.notes && (
                  <div className="adm-pat__detail adm-pat__detail--full"><span className="adm-pat__detail-lbl">Notes</span>{selected.notes}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ Delete Confirm ══════════ */}
      {deleteConfirm && (
        <div className="adm-pat__overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="adm-pat__modal adm-pat__modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="adm-pat__modal-head">
              <h2>⚠️ Confirm Deletion</h2>
              <button className="adm-pat__close" onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <p style={{ padding: "0 24px", color: "#475569" }}>
              Are you sure you want to remove <strong>{deleteConfirm.name}</strong> ({deleteConfirm.id})?
            </p>
            <div className="adm-pat__modal-actions">
              <button className="adm-pat__cancel-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="adm-pat__delete-btn" onClick={() => handleDelete(deleteConfirm.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
