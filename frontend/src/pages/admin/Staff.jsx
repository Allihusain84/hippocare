import { useState, useEffect } from "react";
import staffDataRaw from "../../data/staffData";
import "./Staff.css";

/* ── helpers ── */
const LS_KEY = "hmsAdminStaff";
const STAFF_CREDS_KEY = "hmsAdminStaffCreds";

const loadStaff = () => {
  const saved = localStorage.getItem(LS_KEY);
  if (saved) return JSON.parse(saved);
  const list = Object.values(staffDataRaw).map((s) => ({ ...s }));
  localStorage.setItem(LS_KEY, JSON.stringify(list));
  return list;
};

const loadStaffCreds = () => {
  try { return JSON.parse(localStorage.getItem(STAFF_CREDS_KEY) || "{}"); }
  catch { return {}; }
};
const saveStaffCreds = (c) => localStorage.setItem(STAFF_CREDS_KEY, JSON.stringify(c));

const emptyForm = {
  name: "",
  department: "",
  role: "",
  phone: "",
  email: "",
  loginId: "",
  password: "",
  assignedDoctor: "",
  assignedDoctorDept: "",
  roomNumber: "",
  dutyShift: "Morning Shift",
  shiftTime: "06:00 AM – 02:00 PM",
};

const shiftMap = {
  "Morning Shift": "06:00 AM – 02:00 PM",
  "Evening Shift": "02:00 PM – 10:00 PM",
  "Night Shift": "10:00 PM – 06:00 AM",
};

/* ──────────────────────────────────────── */

const Staff = () => {
  const [staff, setStaff] = useState(loadStaff);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterShift, setFilterShift] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const departments = [...new Set(staff.map((s) => s.department))].sort();

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(staff));
  }, [staff]);

  /* filter */
  const filtered = staff.filter((s) => {
    const text = search.toLowerCase();
    const matchSearch =
      s.name.toLowerCase().includes(text) ||
      s.id.toLowerCase().includes(text) ||
      s.role.toLowerCase().includes(text);
    const matchDept = filterDept === "All" || s.department === filterDept;
    const matchShift = filterShift === "All" || s.dutyShift === filterShift;
    return matchSearch && matchDept && matchShift;
  });

  /* add */
  const handleAdd = (e) => {
    e.preventDefault();
    const maxId = staff.reduce((mx, s) => {
      const n = parseInt(s.id.replace("STF-", ""), 10);
      return n > mx ? n : mx;
    }, 100);
    const newId = `STF-${maxId + 1}`;
    const autoEmail = form.email || `${form.name.toLowerCase().replace(/\s+/g, ".")}@hms.local`;
    const autoPassword = form.password || `pass${maxId + 1}`;
    const autoLoginId = form.loginId || autoEmail;
    const newStaff = {
      id: newId,
      name: form.name,
      password: autoPassword,
      department: form.department,
      role: form.role,
      phone: form.phone,
      email: autoEmail,
      loginId: autoLoginId,
      joinDate: new Date().toISOString().slice(0, 10),
      assignedDoctor: form.assignedDoctor,
      assignedDoctorDept: form.assignedDoctorDept,
      roomNumber: form.roomNumber,
      dutyShift: form.dutyShift,
      shiftTime: shiftMap[form.dutyShift] || form.shiftTime,
      photo: null,
    };
    /* Save credentials for staff login */
    const creds = loadStaffCreds();
    creds[newId] = {
      email: autoLoginId,
      password: autoPassword,
      role: "staff",
      staffId: newId,
      department: form.department,
      name: form.name,
    };
    saveStaffCreds(creds);
    setStaff((prev) => [newStaff, ...prev]);
    setForm({ ...emptyForm });
    setShowAdd(false);
  };

  /* delete */
  const handleDelete = (id) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
    /* Also remove credentials */
    const creds = loadStaffCreds();
    if (creds[id]) {
      delete creds[id];
      saveStaffCreds(creds);
    }
    setDeleteConfirm(null);
    if (selected?.id === id) setSelected(null);
  };

  const initials = (name) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const shiftColor = (shift) => {
    if (shift.includes("Morning")) return "adm-stf__shift--morning";
    if (shift.includes("Evening")) return "adm-stf__shift--evening";
    return "adm-stf__shift--night";
  };

  return (
    <div className="adm-stf">
      {/* header */}
      <div className="adm-stf__header">
        <div>
          <h1>Staff Management</h1>
          <p>Manage all {staff.length} staff members — view details, add or remove.</p>
        </div>
        <button className="adm-stf__add-btn" onClick={() => setShowAdd(true)}>+ Add Staff</button>
      </div>

      {/* stat strip */}
      <div className="adm-stf__stats">
        <div className="adm-stf__stat"><span className="adm-stf__stat-val">{staff.length}</span><span className="adm-stf__stat-lbl">Total Staff</span></div>
        <div className="adm-stf__stat adm-stf__stat--blue"><span className="adm-stf__stat-val">{staff.filter((s) => s.dutyShift.includes("Morning")).length}</span><span className="adm-stf__stat-lbl">Morning Shift</span></div>
        <div className="adm-stf__stat adm-stf__stat--amber"><span className="adm-stf__stat-val">{staff.filter((s) => s.dutyShift.includes("Evening")).length}</span><span className="adm-stf__stat-lbl">Evening Shift</span></div>
        <div className="adm-stf__stat adm-stf__stat--purple"><span className="adm-stf__stat-val">{staff.filter((s) => s.dutyShift.includes("Night")).length}</span><span className="adm-stf__stat-lbl">Night Shift</span></div>
      </div>

      {/* filters */}
      <div className="adm-stf__filters">
        <input className="adm-stf__search" type="text" placeholder="🔍  Search by name, ID or role…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="adm-stf__select" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
          <option value="All">All Departments</option>
          {departments.map((d) => (<option key={d}>{d}</option>))}
        </select>
        <select className="adm-stf__select" value={filterShift} onChange={(e) => setFilterShift(e.target.value)}>
          <option value="All">All Shifts</option>
          <option>Morning Shift</option>
          <option>Evening Shift</option>
          <option>Night Shift</option>
        </select>
      </div>

      {/* table */}
      <div className="adm-stf__table-wrap">
        <table className="adm-stf__table">
          <thead>
            <tr>
              <th>Staff</th>
              <th>ID</th>
              <th>Department</th>
              <th>Role</th>
              <th>Shift</th>
              <th>Assigned Doctor</th>
              <th>Room</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="8" className="adm-stf__empty">No staff match your filters.</td></tr>
            )}
            {filtered.map((s) => (
              <tr key={s.id} className="adm-stf__row">
                <td>
                  <div className="adm-stf__name-cell">
                    <div className="adm-stf__avatar">
                      {s.photo ? <img src={s.photo} alt={s.name} /> : <span>{initials(s.name)}</span>}
                    </div>
                    <div>
                      <strong>{s.name}</strong>
                      <small>{s.email}</small>
                    </div>
                  </div>
                </td>
                <td><span className="adm-stf__id-badge">{s.id}</span></td>
                <td>{s.department}</td>
                <td>{s.role}</td>
                <td><span className={`adm-stf__shift ${shiftColor(s.dutyShift)}`}>{s.dutyShift}</span></td>
                <td>{s.assignedDoctor}</td>
                <td>{s.roomNumber}</td>
                <td>
                  <div className="adm-stf__actions">
                    <button className="adm-stf__view-btn" onClick={() => setSelected(s)}>View</button>
                    <button className="adm-stf__del-btn" onClick={() => setDeleteConfirm(s.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="adm-stf__overlay" onClick={() => setSelected(null)}>
          <div className="adm-stf__modal" onClick={(e) => e.stopPropagation()}>
            <button className="adm-stf__modal-close" onClick={() => setSelected(null)}>✕</button>
            <div className="adm-stf__modal-top">
              <div className="adm-stf__modal-avatar">
                {selected.photo ? <img src={selected.photo} alt={selected.name} /> : <span className="adm-stf__modal-initials">{initials(selected.name)}</span>}
              </div>
              <div>
                <h2>{selected.name}</h2>
                <span className="adm-stf__id-badge">{selected.id}</span>
              </div>
            </div>
            <div className="adm-stf__modal-body">
              <div className="adm-stf__row-detail"><span>Department</span><span>{selected.department}</span></div>
              <div className="adm-stf__row-detail"><span>Role</span><span>{selected.role}</span></div>
              <div className="adm-stf__row-detail"><span>Phone</span><span>{selected.phone}</span></div>
              <div className="adm-stf__row-detail"><span>Email</span><span>{selected.email}</span></div>
              <div className="adm-stf__row-detail"><span>Login ID</span><span className="adm-stf__cred-badge">🔑 {selected.loginId || selected.email}</span></div>
              <div className="adm-stf__row-detail"><span>Password</span><span className="adm-stf__cred-badge">🔒 {selected.password}</span></div>
              <div className="adm-stf__row-detail"><span>Join Date</span><span>{selected.joinDate}</span></div>
              <div className="adm-stf__row-detail"><span>Assigned Doctor</span><span>{selected.assignedDoctor}</span></div>
              <div className="adm-stf__row-detail"><span>Doctor Department</span><span>{selected.assignedDoctorDept}</span></div>
              <div className="adm-stf__row-detail"><span>Room Number</span><span>{selected.roomNumber}</span></div>
              <div className="adm-stf__row-detail"><span>Duty Shift</span><span>{selected.dutyShift}</span></div>
              <div className="adm-stf__row-detail"><span>Shift Timing</span><span>{selected.shiftTime}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="adm-stf__overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="adm-stf__confirm" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to remove <strong>{staff.find((s) => s.id === deleteConfirm)?.name}</strong>?</p>
            <div className="adm-stf__confirm-btns">
              <button className="adm-stf__confirm-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="adm-stf__confirm-delete" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Staff modal */}
      {showAdd && (
        <div className="adm-stf__overlay" onClick={() => setShowAdd(false)}>
          <div className="adm-stf__modal adm-stf__modal--form" onClick={(e) => e.stopPropagation()}>
            <button className="adm-stf__modal-close" onClick={() => setShowAdd(false)}>✕</button>
            <h2>Add New Staff Member</h2>
            <form className="adm-stf__form" onSubmit={handleAdd}>
              <label>Full Name *<input required placeholder="Rahul Singh" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></label>
              <div className="adm-stf__form-row">
                <label>Department *<input required placeholder="Reception" value={form.department} onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))} /></label>
                <label>Role *<input required placeholder="Front Desk Staff" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} /></label>
              </div>
              <div className="adm-stf__form-row">
                <label>Phone<input placeholder="+91 98765 43201" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /></label>
                <label>Email<input placeholder="name@hms.local" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /></label>
              </div>
              <div className="adm-stf__form-section-title">🔑 Login Credentials</div>
              <div className="adm-stf__form-row">
                <label>Login ID<input placeholder="Auto-generated if empty" value={form.loginId} onChange={(e) => setForm((p) => ({ ...p, loginId: e.target.value }))} /></label>
                <label>Password<input placeholder="Auto-generated if empty" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} /></label>
              </div>
              <div className="adm-stf__form-section-title">🏥 Assignment</div>
              <div className="adm-stf__form-row">
                <label>Assigned Doctor<input placeholder="Dr. Aisha Verma" value={form.assignedDoctor} onChange={(e) => setForm((p) => ({ ...p, assignedDoctor: e.target.value }))} /></label>
                <label>Doctor Dept<input placeholder="Cardiology" value={form.assignedDoctorDept} onChange={(e) => setForm((p) => ({ ...p, assignedDoctorDept: e.target.value }))} /></label>
              </div>
              <div className="adm-stf__form-row">
                <label>Room Number<input placeholder="Room 204" value={form.roomNumber} onChange={(e) => setForm((p) => ({ ...p, roomNumber: e.target.value }))} /></label>
                <label>Duty Shift
                  <select value={form.dutyShift} onChange={(e) => setForm((p) => ({ ...p, dutyShift: e.target.value, shiftTime: shiftMap[e.target.value] || p.shiftTime }))}>
                    <option>Morning Shift</option>
                    <option>Evening Shift</option>
                    <option>Night Shift</option>
                  </select>
                </label>
              </div>
              <button type="submit" className="adm-stf__submit-btn">Add Staff Member</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
