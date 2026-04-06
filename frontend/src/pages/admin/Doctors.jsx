import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./Doctors.css";

const DEPARTMENTS = [
  "Cardiology", "Orthopedics", "Pediatrics", "Gynecology", "Neurology",
  "Radiology", "Emergency Medicine", "Dermatology", "Pathology",
  "Physiotherapy", "Dentistry", "Diabetes & Endocrinology",
  "Nephrology & Dialysis", "Anaesthesiology", "Urology",
];

const emptyForm = {
  name: "", department: "Cardiology", specialization: "", qualification: "",
  experience: "", consultation_fee: "", phone: "", email: "",
  availability: "Available", status: "Active",
};

const buildDeptMap = (docs) => {
  const map = {};
  docs.forEach((d) => {
    const dept = d.department || "General";
    if (!map[dept]) map[dept] = [];
    map[dept].push(d);
  });
  const ordered = {};
  DEPARTMENTS.forEach((dept) => { if (map[dept]) ordered[dept] = map[dept]; });
  Object.keys(map).filter((d) => !ordered[d]).sort().forEach((d) => { ordered[d] = map[d]; });
  return ordered;
};

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [collapsedDepts, setCollapsedDepts] = useState({});

  const fetchDoctors = async () => {
    const { data } = await supabase.from("doctors").select("*").order("name");
    setDoctors(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchDoctors(); }, []);

  const filtered = doctors.filter((d) => {
    const t = search.toLowerCase();
    const matchSearch =
      d.name.toLowerCase().includes(t) ||
      (d.department || "").toLowerCase().includes(t) ||
      (d.specialization || "").toLowerCase().includes(t);
    const matchStatus = filterStatus === "All" || d.availability === filterStatus;
    return matchSearch && matchStatus;
  });

  const deptMap = buildDeptMap(filtered);
  const deptNames = Object.keys(deptMap);
  const totalDepts = Object.keys(buildDeptMap(doctors)).length;

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = form.name.startsWith("Dr.") ? form.name : `Dr. ${form.name}`;
    const { error } = await supabase.from("doctors").insert([{
      name, department: form.department, specialization: form.specialization,
      qualification: form.qualification, experience: form.experience,
      consultation_fee: Number(form.consultation_fee) || null,
      phone: form.phone, email: form.email,
      availability: form.availability, status: form.status,
    }]);
    if (error) { alert(error.message); return; }
    setForm({ ...emptyForm });
    setShowAdd(false);
    fetchDoctors();
  };

  const handleDelete = async (id) => {
    await supabase.from("doctors").delete().eq("id", id);
    setDeleteConfirm(null);
    if (selected?.id === id) setSelected(null);
    fetchDoctors();
  };

  const cycleStatus = async (doc) => {
    const order = ["Available", "In Surgery", "On Leave"];
    const next = order[(order.indexOf(doc.availability) + 1) % order.length];
    await supabase.from("doctors").update({ availability: next }).eq("id", doc.id);
    fetchDoctors();
  };

  const toggleDept = (dept) => setCollapsedDepts((p) => ({ ...p, [dept]: !p[dept] }));
  const allCollapsed = deptNames.length > 0 && deptNames.every((d) => collapsedDepts[d]);

  const initials = (name) =>
    name.replace(/^Dr\.?\s*/i, "").split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  if (loading) return <p>Loading doctors...</p>;

  return (
    <div className="adm-doc">
      <div className="adm-doc__header">
        <div>
          <h1>Doctors Directory</h1>
          <p>Manage {doctors.length} doctors across {totalDepts} departments</p>
        </div>
        <button className="adm-doc__add-btn" onClick={() => setShowAdd(true)}>+ Add Doctor</button>
      </div>

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
          <span className="adm-doc__stat-val">{doctors.filter((d) => d.availability === "Available").length}</span>
          <span className="adm-doc__stat-lbl">Available</span>
        </div>
        <div className="adm-doc__stat adm-doc__stat--amber">
          <span className="adm-doc__stat-val">{doctors.filter((d) => d.availability === "In Surgery").length}</span>
          <span className="adm-doc__stat-lbl">In Surgery</span>
        </div>
        <div className="adm-doc__stat adm-doc__stat--red">
          <span className="adm-doc__stat-val">{doctors.filter((d) => d.availability === "On Leave").length}</span>
          <span className="adm-doc__stat-lbl">On Leave</span>
        </div>
      </div>

      <div className="adm-doc__filters">
        <input className="adm-doc__search" type="text" placeholder="Search by name, department or specialization..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="adm-doc__select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option>Available</option>
          <option>In Surgery</option>
          <option>On Leave</option>
        </select>
        <button className="adm-doc__collapse-all" onClick={() => {
          const next = {};
          deptNames.forEach((d) => { next[d] = !allCollapsed; });
          setCollapsedDepts(next);
        }}>
          {allCollapsed ? "Expand All" : "Collapse All"}
        </button>
      </div>

      {deptNames.length === 0 && <p className="adm-doc__empty">No doctors match your search.</p>}

      {deptNames.map((dept) => (
        <div className="adm-doc__dept" key={dept}>
          <div className="adm-doc__dept-header" onClick={() => toggleDept(dept)}>
            <div className="adm-doc__dept-info">
              <h2 className="adm-doc__dept-name">{dept}</h2>
              <span className="adm-doc__dept-count">{deptMap[dept].length} Doctor{deptMap[dept].length !== 1 ? "s" : ""}</span>
            </div>
            <span className={`adm-doc__dept-arrow ${!collapsedDepts[dept] ? "adm-doc__dept-arrow--open" : ""}`}>&#9654;</span>
          </div>

          {!collapsedDepts[dept] && (
            <div className="adm-doc__dept-grid">
              {deptMap[dept].map((doc) => (
                <div className="adm-doc__card" key={doc.id}>
                  <div className="adm-doc__card-top">
                    <div className="adm-doc__avatar">
                      {doc.photo_url ? <img src={doc.photo_url} alt={doc.name} /> : <span className="adm-doc__initials">{initials(doc.name)}</span>}
                    </div>
                    <div className="adm-doc__card-info">
                      <h3>{doc.name}</h3>
                      <p className="adm-doc__spec">{doc.specialization || "General"}</p>
                      <span className="adm-doc__exp">{doc.experience || "—"} exp {doc.consultation_fee ? `• ₹${doc.consultation_fee}` : ""}</span>
                      {doc.phone && <span className="adm-doc__mobile">{doc.phone}</span>}
                    </div>
                    <span className={`adm-doc__badge adm-doc__badge--${(doc.availability || "available").toLowerCase().replace(" ", "-")}`}
                      onClick={() => cycleStatus(doc)} title="Click to change status">
                      {doc.availability || "Available"}
                    </span>
                  </div>
                  <div className="adm-doc__card-actions">
                    <button className="adm-doc__view-btn" onClick={() => setSelected(doc)}>View Profile</button>
                    <button className="adm-doc__del-btn" onClick={() => setDeleteConfirm(doc.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {selected && (
        <div className="adm-doc__overlay" onClick={() => setSelected(null)}>
          <div className="adm-doc__modal" onClick={(e) => e.stopPropagation()}>
            <button className="adm-doc__modal-close" onClick={() => setSelected(null)}>x</button>
            <div className="adm-doc__modal-header">
              <div className="adm-doc__modal-avatar">
                {selected.photo_url ? <img src={selected.photo_url} alt={selected.name} /> : <span className="adm-doc__initials adm-doc__initials--lg">{initials(selected.name)}</span>}
              </div>
              <div>
                <h2>{selected.name}</h2>
                <span className={`adm-doc__badge adm-doc__badge--${(selected.availability || "available").toLowerCase().replace(" ", "-")}`}>{selected.availability}</span>
              </div>
            </div>
            <div className="adm-doc__modal-body">
              <div className="adm-doc__detail-row"><span className="adm-doc__detail-label">Department</span><span className="adm-doc__dept-badge">{selected.department}</span></div>
              <div className="adm-doc__detail-row"><span className="adm-doc__detail-label">Specialization</span><span>{selected.specialization || "—"}</span></div>
              <div className="adm-doc__detail-row"><span className="adm-doc__detail-label">Qualification</span><span>{selected.qualification || "—"}</span></div>
              <div className="adm-doc__detail-row"><span className="adm-doc__detail-label">Experience</span><span>{selected.experience || "—"}</span></div>
              <div className="adm-doc__detail-row"><span className="adm-doc__detail-label">Consultation Fee</span><span>{selected.consultation_fee ? `₹${selected.consultation_fee}` : "—"}</span></div>
              <div className="adm-doc__detail-row"><span className="adm-doc__detail-label">Phone</span><span>{selected.phone || "—"}</span></div>
              <div className="adm-doc__detail-row"><span className="adm-doc__detail-label">Email</span><span>{selected.email || "—"}</span></div>
              <div className="adm-doc__detail-row"><span className="adm-doc__detail-label">Status</span><span>{selected.status || "—"}</span></div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="adm-doc__overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="adm-doc__confirm" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Remove <strong>{doctors.find((d) => d.id === deleteConfirm)?.name}</strong>? This cannot be undone.</p>
            <div className="adm-doc__confirm-btns">
              <button className="adm-doc__confirm-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="adm-doc__confirm-delete" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="adm-doc__overlay" onClick={() => setShowAdd(false)}>
          <div className="adm-doc__modal adm-doc__modal--form" onClick={(e) => e.stopPropagation()}>
            <button className="adm-doc__modal-close" onClick={() => setShowAdd(false)}>x</button>
            <h2>Add New Doctor</h2>
            <form className="adm-doc__form" onSubmit={handleAdd}>
              <label>Full Name *<input required placeholder="Dr. John Doe" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></label>
              <label>Department *<select required value={form.department} onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select></label>
              <label>Specialization<input placeholder="Interventional Cardiology" value={form.specialization} onChange={(e) => setForm((p) => ({ ...p, specialization: e.target.value }))} /></label>
              <label>Qualification<input placeholder="MBBS, MD, DM" value={form.qualification} onChange={(e) => setForm((p) => ({ ...p, qualification: e.target.value }))} /></label>
              <div className="adm-doc__form-row">
                <label>Experience<input placeholder="10 years" value={form.experience} onChange={(e) => setForm((p) => ({ ...p, experience: e.target.value }))} /></label>
                <label>Consultation Fee<input type="number" placeholder="1200" value={form.consultation_fee} onChange={(e) => setForm((p) => ({ ...p, consultation_fee: e.target.value }))} /></label>
              </div>
              <div className="adm-doc__form-row">
                <label>Email<input type="email" placeholder="doctor@hippocare.com" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /></label>
                <label>Phone<input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /></label>
              </div>
              <label>Availability<select value={form.availability} onChange={(e) => setForm((p) => ({ ...p, availability: e.target.value }))}>
                <option>Available</option><option>In Surgery</option><option>On Leave</option>
              </select></label>
              <button type="submit" className="adm-doc__submit-btn">Add Doctor</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
