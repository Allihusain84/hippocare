import { useState, useEffect } from "react";
import { appointments as seedAppointments } from "../../data/mockData";
import "./Appointments.css";

/* ── localStorage ── */
const LS_KEY = "hmsAdminAppointments";

const loadAppointments = () => {
  const saved = localStorage.getItem(LS_KEY);
  if (saved) return JSON.parse(saved);
  const list = seedAppointments.map((a) => ({
    ...a,
    time: a.time || "",
    department: a.department || "",
    type: a.type || "Consultation",
    phone: a.phone || "",
    notes: a.notes || "",
    roomNumber: a.roomNumber || "",
  }));
  localStorage.setItem(LS_KEY, JSON.stringify(list));
  return list;
};

const emptyForm = {
  patient: "",
  doctor: "",
  department: "",
  date: new Date().toISOString().slice(0, 10),
  time: "09:00 AM",
  type: "Consultation",
  phone: "",
  roomNumber: "",
  notes: "",
  status: "Confirmed",
};

const STATUS_OPTIONS = ["Confirmed", "Waiting", "Completed", "Cancelled", "No-Show"];
const TYPE_OPTIONS = ["Consultation", "Follow-up", "Emergency", "Surgery", "Lab Test", "Imaging"];
const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM",
];

const DEPARTMENTS = [
  "Cardiology", "Orthopedics", "Pediatrics", "Gynecology", "Neurology",
  "Radiology", "Accident & Trauma", "Physiotherapy", "Dentistry",
  "Diabetes & Endocrinology", "Obstetrics & Gynaecology",
  "Nephrology & Dialysis", "Anaesthesiology", "Urology", "General Medicine",
];

/* ═══════════════════════════════════════════════ */

const Appointments = () => {
  const [appointments, setAppointments] = useState(loadAppointments);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(appointments));
  }, [appointments]);

  /* ── Stats ── */
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = appointments.filter((a) => a.date === today).length;
  const confirmedCount = appointments.filter((a) => a.status === "Confirmed").length;
  const waitingCount = appointments.filter((a) => a.status === "Waiting").length;
  const completedCount = appointments.filter((a) => a.status === "Completed").length;
  const cancelledCount = appointments.filter((a) => a.status === "Cancelled").length;

  /* ── Filter ── */
  const filtered = appointments.filter((a) => {
    const t = search.toLowerCase();
    const matchSearch =
      a.patient.toLowerCase().includes(t) ||
      a.doctor.toLowerCase().includes(t) ||
      a.id.toLowerCase().includes(t) ||
      (a.department || "").toLowerCase().includes(t);
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    const matchDate = !filterDate || a.date === filterDate;
    return matchSearch && matchStatus && matchDate;
  });

  /* ── Add appointment ── */
  const handleAdd = (e) => {
    e.preventDefault();
    const maxId = appointments.reduce((mx, a) => {
      const n = parseInt(a.id.replace("A-", ""), 10);
      return n > mx ? n : mx;
    }, 9000);
    const newAppt = {
      id: `A-${maxId + 1}`,
      patient: form.patient,
      doctor: form.doctor,
      department: form.department,
      date: form.date,
      time: form.time,
      type: form.type,
      phone: form.phone,
      roomNumber: form.roomNumber,
      notes: form.notes,
      status: form.status,
    };
    setAppointments((prev) => [newAppt, ...prev]);
    setForm({ ...emptyForm });
    setShowAdd(false);
  };

  /* ── Delete ── */
  const handleDelete = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirm(null);
    if (selected?.id === id) setSelected(null);
  };

  /* ── Update status ── */
  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    if (selected?.id === id) setSelected({ ...selected, status: newStatus });
  };

  /* ── helpers ── */
  const f = (key, val) => setForm({ ...form, [key]: val });

  const statusClass = (s) => {
    const map = { Confirmed: "green", Waiting: "amber", Completed: "blue", Cancelled: "red", "No-Show": "gray" };
    return map[s] || "blue";
  };

  return (
    <div className="adm-apt">
      {/* ── Header ── */}
      <div className="adm-apt__header">
        <div>
          <h1>📅 Appointments</h1>
          <p>Monitor schedules, create slots, and manage appointment flow</p>
        </div>
        <button className="adm-apt__add-btn" onClick={() => setShowAdd(true)}>
          + Create Slot
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="adm-apt__stats">
        <div className="adm-apt__stat adm-apt__stat--blue">
          <span className="adm-apt__stat-val">{appointments.length}</span>
          <span className="adm-apt__stat-lbl">Total</span>
        </div>
        <div className="adm-apt__stat adm-apt__stat--cyan">
          <span className="adm-apt__stat-val">{todayCount}</span>
          <span className="adm-apt__stat-lbl">Today</span>
        </div>
        <div className="adm-apt__stat adm-apt__stat--green">
          <span className="adm-apt__stat-val">{confirmedCount}</span>
          <span className="adm-apt__stat-lbl">Confirmed</span>
        </div>
        <div className="adm-apt__stat adm-apt__stat--amber">
          <span className="adm-apt__stat-val">{waitingCount}</span>
          <span className="adm-apt__stat-lbl">Waiting</span>
        </div>
        <div className="adm-apt__stat adm-apt__stat--purple">
          <span className="adm-apt__stat-val">{completedCount}</span>
          <span className="adm-apt__stat-lbl">Completed</span>
        </div>
        <div className="adm-apt__stat adm-apt__stat--red">
          <span className="adm-apt__stat-val">{cancelledCount}</span>
          <span className="adm-apt__stat-lbl">Cancelled</span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="adm-apt__filters">
        <input
          className="adm-apt__search"
          placeholder="🔍 Search patient, doctor, ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="adm-apt__select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="date"
          className="adm-apt__date-filter"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        {filterDate && (
          <button className="adm-apt__clear-date" onClick={() => setFilterDate("")}>✕ Clear</button>
        )}
      </div>

      {/* ── Table ── */}
      <div className="adm-apt__table-wrap">
        <table className="adm-apt__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Dept</th>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="9" className="adm-apt__empty">No appointments found.</td>
              </tr>
            )}
            {filtered.map((a) => (
              <tr key={a.id} className="adm-apt__row">
                <td><span className="adm-apt__id-badge">{a.id}</span></td>
                <td><strong>{a.patient}</strong></td>
                <td>{a.doctor}</td>
                <td>{a.department || "—"}</td>
                <td>{a.date}</td>
                <td>{a.time || "—"}</td>
                <td><span className="adm-apt__type-badge">{a.type || "—"}</span></td>
                <td>
                  <select
                    className={`adm-apt__status adm-apt__status--${statusClass(a.status)}`}
                    value={a.status}
                    onChange={(e) => handleStatusChange(a.id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="adm-apt__actions">
                    <button className="adm-apt__action-btn adm-apt__action-btn--view" onClick={() => setSelected(a)}>👁</button>
                    <button className="adm-apt__action-btn adm-apt__action-btn--del" onClick={() => setDeleteConfirm(a)}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ══════════ Create Slot Modal ══════════ */}
      {showAdd && (
        <div className="adm-apt__overlay" onClick={() => setShowAdd(false)}>
          <div className="adm-apt__modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-apt__modal-head">
              <h2>➕ Create Appointment Slot</h2>
              <button className="adm-apt__close" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <form className="adm-apt__form" onSubmit={handleAdd}>
              {/* Row 1: Patient + Phone */}
              <div className="adm-apt__form-row">
                <label className="adm-apt__label">
                  Patient Name *
                  <input required className="adm-apt__input" value={form.patient} onChange={(e) => f("patient", e.target.value)} placeholder="Patient full name" />
                </label>
                <label className="adm-apt__label">
                  Phone
                  <input className="adm-apt__input" value={form.phone} onChange={(e) => f("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
                </label>
              </div>

              {/* Row 2: Doctor + Department */}
              <div className="adm-apt__form-row">
                <label className="adm-apt__label">
                  Doctor Name *
                  <input required className="adm-apt__input" value={form.doctor} onChange={(e) => f("doctor", e.target.value)} placeholder="Dr. Name" />
                </label>
                <label className="adm-apt__label">
                  Department
                  <select className="adm-apt__input" value={form.department} onChange={(e) => f("department", e.target.value)}>
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Section: Schedule */}
              <div className="adm-apt__form-section-title">🕐 Schedule</div>

              {/* Row 3: Date + Time */}
              <div className="adm-apt__form-row">
                <label className="adm-apt__label">
                  Date *
                  <input required type="date" className="adm-apt__input" value={form.date} onChange={(e) => f("date", e.target.value)} />
                </label>
                <label className="adm-apt__label">
                  Time Slot *
                  <select required className="adm-apt__input" value={form.time} onChange={(e) => f("time", e.target.value)}>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Row 4: Type + Status */}
              <div className="adm-apt__form-row">
                <label className="adm-apt__label">
                  Appointment Type
                  <select className="adm-apt__input" value={form.type} onChange={(e) => f("type", e.target.value)}>
                    {TYPE_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="adm-apt__label">
                  Status
                  <select className="adm-apt__input" value={form.status} onChange={(e) => f("status", e.target.value)}>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Row 5: Room + Notes */}
              <div className="adm-apt__form-row">
                <label className="adm-apt__label adm-apt__label--sm">
                  Room
                  <input className="adm-apt__input" value={form.roomNumber} onChange={(e) => f("roomNumber", e.target.value)} placeholder="e.g. 202" />
                </label>
                <label className="adm-apt__label">
                  Notes
                  <input className="adm-apt__input" value={form.notes} onChange={(e) => f("notes", e.target.value)} placeholder="Additional info…" />
                </label>
              </div>

              <button type="submit" className="adm-apt__submit-btn">✅ Create Appointment</button>
            </form>
          </div>
        </div>
      )}

      {/* ══════════ View Details Modal ══════════ */}
      {selected && !deleteConfirm && (
        <div className="adm-apt__overlay" onClick={() => setSelected(null)}>
          <div className="adm-apt__modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-apt__modal-head">
              <h2>Appointment Details — {selected.id}</h2>
              <button className="adm-apt__close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="adm-apt__profile">
              <div className="adm-apt__profile-grid">
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">ID</span><span className="adm-apt__id-badge">{selected.id}</span></div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Patient</span><strong>{selected.patient}</strong></div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Doctor</span>{selected.doctor}</div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Department</span>{selected.department || "—"}</div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Date</span>{selected.date}</div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Time</span>{selected.time || "—"}</div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Type</span><span className="adm-apt__type-badge">{selected.type || "—"}</span></div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Status</span><span className={`adm-apt__badge adm-apt__badge--${statusClass(selected.status)}`}>{selected.status}</span></div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Phone</span>{selected.phone || "—"}</div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Room</span>{selected.roomNumber || "—"}</div>
                {selected.notes && (
                  <div className="adm-apt__detail adm-apt__detail--full"><span className="adm-apt__detail-lbl">Notes</span>{selected.notes}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ Delete Confirm ══════════ */}
      {deleteConfirm && (
        <div className="adm-apt__overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="adm-apt__modal adm-apt__modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="adm-apt__modal-head">
              <h2>⚠️ Cancel Appointment</h2>
              <button className="adm-apt__close" onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <p style={{ padding: "0 24px", color: "#475569" }}>
              Remove appointment <strong>{deleteConfirm.id}</strong> for <strong>{deleteConfirm.patient}</strong> with {deleteConfirm.doctor}?
            </p>
            <div className="adm-apt__modal-actions">
              <button className="adm-apt__cancel-btn" onClick={() => setDeleteConfirm(null)}>Keep</button>
              <button className="adm-apt__delete-btn" onClick={() => handleDelete(deleteConfirm.id)}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
