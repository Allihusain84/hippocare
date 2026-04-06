import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./Patients.css";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const emptyForm = {
  name: "", age: "", gender: "Male", phone: "", email: "",
  address: "", blood_group: "", emergency_contact: "",
};

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [selected, setSelected] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchPatients = async () => {
    setLoading(true);
    const { data } = await supabase.from("patients").select("*").order("created_at", { ascending: false });
    setPatients(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPatients(); }, []);

  const filtered = patients.filter((p) => {
    const t = search.toLowerCase();
    return p.name.toLowerCase().includes(t) || (p.email || "").toLowerCase().includes(t) || (p.phone || "").includes(t);
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("patients").insert([{
      name: form.name, age: Number(form.age) || null, gender: form.gender,
      phone: form.phone, email: form.email, address: form.address,
      blood_group: form.blood_group, emergency_contact: form.emergency_contact,
    }]);
    if (!error) { setForm({ ...emptyForm }); setShowAdd(false); fetchPatients(); }
    else alert(error.message);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("patients").delete().eq("id", id);
    if (!error) { setDeleteConfirm(null); setSelected(null); fetchPatients(); }
  };

  const f = (key, val) => setForm({ ...form, [key]: val });

  return (
    <div className="adm-pat">
      <div className="adm-pat__header">
        <div>
          <h1>Patient Records</h1>
          <p>Track admissions and patient information</p>
        </div>
        <button className="adm-pat__add-btn" onClick={() => setShowAdd(true)}>+ Add Patient</button>
      </div>

      <div className="adm-pat__stats">
        <div className="adm-pat__stat adm-pat__stat--blue">
          <span className="adm-pat__stat-val">{patients.length}</span>
          <span className="adm-pat__stat-lbl">Total Patients</span>
        </div>
      </div>

      <div className="adm-pat__filters">
        <input className="adm-pat__search" placeholder="Search by name, email, phone..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="adm-pat__table-wrap">
          <table className="adm-pat__table">
            <thead>
              <tr><th>Name</th><th>Age / Gender</th><th>Phone</th><th>Email</th><th>Blood</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan="6" className="adm-pat__empty">No patients found.</td></tr>}
              {filtered.map((p) => (
                <tr key={p.id} className="adm-pat__row">
                  <td><strong>{p.name}</strong></td>
                  <td>{p.age || "—"} / {p.gender || "—"}</td>
                  <td>{p.phone || "—"}</td>
                  <td>{p.email || "—"}</td>
                  <td><span className="adm-pat__blood">{p.blood_group || "—"}</span></td>
                  <td>
                    <div className="adm-pat__actions">
                      <button className="adm-pat__action-btn adm-pat__action-btn--view" onClick={() => setSelected(p)}>View</button>
                      <button className="adm-pat__action-btn adm-pat__action-btn--del" onClick={() => setDeleteConfirm(p)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && (
        <div className="adm-pat__overlay" onClick={() => setShowAdd(false)}>
          <div className="adm-pat__modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-pat__modal-head">
              <h2>Add New Patient</h2>
              <button className="adm-pat__close" onClick={() => setShowAdd(false)}>x</button>
            </div>
            <form className="adm-pat__form" onSubmit={handleAdd}>
              <div className="adm-pat__form-row">
                <label className="adm-pat__label">Name *<input required className="adm-pat__input" value={form.name} onChange={(e) => f("name", e.target.value)} /></label>
                <label className="adm-pat__label adm-pat__label--sm">Age<input type="number" className="adm-pat__input" value={form.age} onChange={(e) => f("age", e.target.value)} /></label>
              </div>
              <div className="adm-pat__form-row">
                <label className="adm-pat__label">Gender<select className="adm-pat__input" value={form.gender} onChange={(e) => f("gender", e.target.value)}><option>Male</option><option>Female</option><option>Other</option></select></label>
                <label className="adm-pat__label">Blood Group<select className="adm-pat__input" value={form.blood_group} onChange={(e) => f("blood_group", e.target.value)}><option value="">Select</option>{BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}</select></label>
              </div>
              <div className="adm-pat__form-row">
                <label className="adm-pat__label">Phone<input className="adm-pat__input" value={form.phone} onChange={(e) => f("phone", e.target.value)} /></label>
                <label className="adm-pat__label">Email<input type="email" className="adm-pat__input" value={form.email} onChange={(e) => f("email", e.target.value)} /></label>
              </div>
              <div className="adm-pat__form-row">
                <label className="adm-pat__label">Address<input className="adm-pat__input" value={form.address} onChange={(e) => f("address", e.target.value)} /></label>
                <label className="adm-pat__label">Emergency Contact<input className="adm-pat__input" value={form.emergency_contact} onChange={(e) => f("emergency_contact", e.target.value)} /></label>
              </div>
              <button type="submit" className="adm-pat__submit-btn">Add Patient</button>
            </form>
          </div>
        </div>
      )}

      {selected && !deleteConfirm && (
        <div className="adm-pat__overlay" onClick={() => setSelected(null)}>
          <div className="adm-pat__modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-pat__modal-head">
              <h2>Patient Profile — {selected.name}</h2>
              <button className="adm-pat__close" onClick={() => setSelected(null)}>x</button>
            </div>
            <div className="adm-pat__profile">
              <div className="adm-pat__profile-grid">
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Name</span><strong>{selected.name}</strong></div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Age</span>{selected.age || "—"}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Gender</span>{selected.gender || "—"}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Blood Group</span><span className="adm-pat__blood">{selected.blood_group || "—"}</span></div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Phone</span>{selected.phone || "—"}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Email</span>{selected.email || "—"}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Address</span>{selected.address || "—"}</div>
                <div className="adm-pat__detail"><span className="adm-pat__detail-lbl">Emergency Contact</span>{selected.emergency_contact || "—"}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="adm-pat__overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="adm-pat__modal adm-pat__modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="adm-pat__modal-head">
              <h2>Confirm Deletion</h2>
              <button className="adm-pat__close" onClick={() => setDeleteConfirm(null)}>x</button>
            </div>
            <p style={{ padding: "0 24px", color: "#475569" }}>
              Remove <strong>{deleteConfirm.name}</strong>?
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
