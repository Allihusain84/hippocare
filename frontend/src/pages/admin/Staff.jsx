import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./Staff.css";

const shiftMap = {
  "Morning Shift": "06:00 AM – 02:00 PM",
  "Evening Shift": "02:00 PM – 10:00 PM",
  "Night Shift": "10:00 PM – 06:00 AM",
};

const emptyForm = {
  name: "", department: "", role: "", phone: "", email: "",
  password: "",
  assigned_doctor_id: "", room_number: "", shift: "Morning Shift",
  shift_time: "06:00 AM – 02:00 PM",
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterShift, setFilterShift] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = async () => {
    const [staffRes, docRes] = await Promise.all([
      supabase.from("staff").select("*").order("name"),
      supabase.from("doctors").select("id, name, department"),
    ]);
    setStaff(staffRes.data || []);
    setDoctors(docRes.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const departments = [...new Set(staff.map((s) => s.department).filter(Boolean))].sort();
  const getDoctorName = (docId) => doctors.find((d) => d.id === docId)?.name || "—";

  const filtered = staff.filter((s) => {
    const text = search.toLowerCase();
    const matchSearch =
      s.name.toLowerCase().includes(text) ||
      (s.role || "").toLowerCase().includes(text) ||
      (s.email || "").toLowerCase().includes(text);
    const matchDept = filterDept === "All" || s.department === filterDept;
    const matchShift = filterShift === "All" || s.shift === filterShift;
    return matchSearch && matchDept && matchShift;
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    setAddError("");
    setAdding(true);

    if (!form.email || !form.password) {
      setAddError("Email and password are required so staff can sign in.");
      setAdding(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
          role: "staff",
          staff: {
            department: form.department,
            role: form.role,
            phone: form.phone,
            assigned_doctor_id: form.assigned_doctor_id || null,
            room_number: form.room_number,
            shift: form.shift,
            shift_time: form.shift_time,
          },
        }),
      });

      const rawResponse = await response.text();
      let payload = null;
      try {
        payload = rawResponse ? JSON.parse(rawResponse) : null;
      } catch (parseError) {
        console.error("Failed to parse register response:", parseError);
      }

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || rawResponse || "Failed to create staff account.");
      }

      setForm({ ...emptyForm });
      setShowAdd(false);
      await fetchData();
    } catch (err) {
      setAddError(err.message || "Failed to create staff account.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    await supabase.from("staff").delete().eq("id", id);
    setDeleteConfirm(null);
    if (selected?.id === id) setSelected(null);
    fetchData();
  };

  const initials = (name) => name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const shiftColor = (shift) => {
    if ((shift || "").includes("Morning")) return "adm-stf__shift--morning";
    if ((shift || "").includes("Evening")) return "adm-stf__shift--evening";
    return "adm-stf__shift--night";
  };

  if (loading) return <p>Loading staff...</p>;

  return (
    <div className="adm-stf">
      <div className="adm-stf__header">
        <div>
          <h1>Staff Management</h1>
          <p>Manage all {staff.length} staff members</p>
        </div>
        <button className="adm-stf__add-btn" onClick={() => setShowAdd(true)}>+ Add Staff</button>
      </div>

      <div className="adm-stf__stats">
        <div className="adm-stf__stat"><span className="adm-stf__stat-val">{staff.length}</span><span className="adm-stf__stat-lbl">Total Staff</span></div>
        <div className="adm-stf__stat adm-stf__stat--blue"><span className="adm-stf__stat-val">{staff.filter((s) => (s.shift || "").includes("Morning")).length}</span><span className="adm-stf__stat-lbl">Morning Shift</span></div>
        <div className="adm-stf__stat adm-stf__stat--amber"><span className="adm-stf__stat-val">{staff.filter((s) => (s.shift || "").includes("Evening")).length}</span><span className="adm-stf__stat-lbl">Evening Shift</span></div>
        <div className="adm-stf__stat adm-stf__stat--purple"><span className="adm-stf__stat-val">{staff.filter((s) => (s.shift || "").includes("Night")).length}</span><span className="adm-stf__stat-lbl">Night Shift</span></div>
      </div>

      <div className="adm-stf__filters">
        <input className="adm-stf__search" type="text" placeholder="Search by name, role or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="adm-stf__select" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
          <option value="All">All Departments</option>
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select className="adm-stf__select" value={filterShift} onChange={(e) => setFilterShift(e.target.value)}>
          <option value="All">All Shifts</option>
          <option>Morning Shift</option>
          <option>Evening Shift</option>
          <option>Night Shift</option>
        </select>
      </div>

      <div className="adm-stf__table-wrap">
        <table className="adm-stf__table">
          <thead>
            <tr><th>Staff</th><th>Department</th><th>Role</th><th>Shift</th><th>Assigned Doctor</th><th>Room</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan="7" className="adm-stf__empty">No staff match your filters.</td></tr>}
            {filtered.map((s) => (
              <tr key={s.id} className="adm-stf__row">
                <td>
                  <div className="adm-stf__name-cell">
                    <div className="adm-stf__avatar"><span>{initials(s.name)}</span></div>
                    <div><strong>{s.name}</strong><small>{s.email || ""}</small></div>
                  </div>
                </td>
                <td>{s.department || "—"}</td>
                <td>{s.role || "—"}</td>
                <td><span className={`adm-stf__shift ${shiftColor(s.shift)}`}>{s.shift || "—"}</span></td>
                <td>{getDoctorName(s.assigned_doctor_id)}</td>
                <td>{s.room_number || "—"}</td>
                <td>
                  <div className="adm-stf__actions">
                    <button className="adm-stf__view-btn" onClick={() => setSelected(s)}>View</button>
                    <button className="adm-stf__del-btn" onClick={() => setDeleteConfirm(s.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="adm-stf__overlay" onClick={() => setSelected(null)}>
          <div className="adm-stf__modal" onClick={(e) => e.stopPropagation()}>
            <button className="adm-stf__modal-close" onClick={() => setSelected(null)}>x</button>
            <div className="adm-stf__modal-top">
              <div className="adm-stf__modal-avatar"><span className="adm-stf__modal-initials">{initials(selected.name)}</span></div>
              <div><h2>{selected.name}</h2></div>
            </div>
            <div className="adm-stf__modal-body">
              <div className="adm-stf__row-detail"><span>Department</span><span>{selected.department || "—"}</span></div>
              <div className="adm-stf__row-detail"><span>Role</span><span>{selected.role || "—"}</span></div>
              <div className="adm-stf__row-detail"><span>Phone</span><span>{selected.phone || "—"}</span></div>
              <div className="adm-stf__row-detail"><span>Email</span><span>{selected.email || "—"}</span></div>
              <div className="adm-stf__row-detail"><span>Assigned Doctor</span><span>{getDoctorName(selected.assigned_doctor_id)}</span></div>
              <div className="adm-stf__row-detail"><span>Room Number</span><span>{selected.room_number || "—"}</span></div>
              <div className="adm-stf__row-detail"><span>Duty Shift</span><span>{selected.shift || "—"}</span></div>
              <div className="adm-stf__row-detail"><span>Shift Timing</span><span>{selected.shift_time || "—"}</span></div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="adm-stf__overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="adm-stf__confirm" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Remove <strong>{staff.find((s) => s.id === deleteConfirm)?.name}</strong>?</p>
            <div className="adm-stf__confirm-btns">
              <button className="adm-stf__confirm-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="adm-stf__confirm-delete" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="adm-stf__overlay" onClick={() => setShowAdd(false)}>
          <div className="adm-stf__modal adm-stf__modal--form" onClick={(e) => e.stopPropagation()}>
            <button className="adm-stf__modal-close" onClick={() => setShowAdd(false)}>x</button>
            <h2>Add New Staff Member</h2>
            <form className="adm-stf__form" onSubmit={handleAdd}>
              <label>Full Name *<input required placeholder="Rahul Singh" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></label>
              <div className="adm-stf__form-row">
                <label>Department *<input required placeholder="Reception" value={form.department} onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))} /></label>
                <label>Role *<input required placeholder="Front Desk Staff" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} /></label>
              </div>
              <div className="adm-stf__form-row">
                <label>Phone<input placeholder="+91 98765 43201" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /></label>
                <label>Email *<input required type="email" placeholder="name@hippocare.com" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /></label>
              </div>
              <label>Password *<input required type="password" placeholder="Create temporary password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} /></label>
              <div className="adm-stf__form-row">
                <label>Assigned Doctor
                  <select value={form.assigned_doctor_id} onChange={(e) => setForm((p) => ({ ...p, assigned_doctor_id: e.target.value }))}>
                    <option value="">None</option>
                    {doctors.map((d) => <option key={d.id} value={d.id}>{d.name} — {d.department}</option>)}
                  </select>
                </label>
                <label>Room Number<input placeholder="Room 204" value={form.room_number} onChange={(e) => setForm((p) => ({ ...p, room_number: e.target.value }))} /></label>
              </div>
              <div className="adm-stf__form-row">
                <label>Duty Shift
                  <select value={form.shift} onChange={(e) => setForm((p) => ({ ...p, shift: e.target.value, shift_time: shiftMap[e.target.value] || p.shift_time }))}>
                    <option>Morning Shift</option>
                    <option>Evening Shift</option>
                    <option>Night Shift</option>
                  </select>
                </label>
              </div>
              {addError && <p style={{ color: "#dc2626", margin: 0 }}>{addError}</p>}
              <button type="submit" className="adm-stf__submit-btn" disabled={adding}>{adding ? "Creating Staff Account..." : "Add Staff Member"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
