import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import "./StaffDashboard.css";

const StaffDashboard = () => {
  const { staff } = useOutletContext();
  const [patients, setPatients] = useState([]);
  const [doctorName, setDoctorName] = useState("—");
  const [doctorDept, setDoctorDept] = useState("—");

  useEffect(() => {
    const load = async () => {
      if (staff.assigned_doctor_id) {
        const { data: doc } = await supabase.from("doctors").select("name, department").eq("id", staff.assigned_doctor_id).single();
        if (doc) { setDoctorName(doc.name); setDoctorDept(doc.department); }
      }

      const { data } = await supabase.from("patients").select("*").limit(10);
      setPatients(data || []);
    };
    load();
  }, [staff]);

  const stats = [
    { label: "Today's Patients", value: patients.length, icon: "🏥", color: "#0ea5e9", bg: "#e0f2fe" },
    { label: "Assigned Doctor", value: doctorName.split(" ").slice(0, 2).join(" "), icon: "🩺", color: "#8b5cf6", bg: "#ede9fe" },
    { label: "Room Duty", value: staff.room_number || "—", icon: "🚪", color: "#f59e0b", bg: "#fef3c7" },
    { label: "Shift", value: staff.shift || "—", icon: "⏰", color: "#10b981", bg: "#dcfce7" },
  ];

  return (
    <div className="sd">
      <div className="sd__stats">
        {stats.map((s, i) => (
          <div className="sd__stat" key={i}>
            <div className="sd__stat-icon" style={{ background: s.bg, color: s.color }}><span>{s.icon}</span></div>
            <div className="sd__stat-body">
              <p className="sd__stat-label">{s.label}</p>
              <h3 className="sd__stat-value">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="sd__grid">
        <div className="sd__panel sd__panel--duty">
          <div className="sd__panel-head">
            <h3>My Duty Assignment</h3>
            <span className="sd__panel-badge sd__panel-badge--blue">{staff.shift || "—"}</span>
          </div>
          <div className="sd__duty-card">
            <div className="sd__duty-row"><span className="sd__duty-label">Assigned Doctor</span><span className="sd__duty-value">{doctorName}</span></div>
            <div className="sd__duty-row"><span className="sd__duty-label">Department</span><span className="sd__duty-value">{doctorDept}</span></div>
            <div className="sd__duty-row"><span className="sd__duty-label">Room Number</span><span className="sd__duty-value sd__duty-value--room">{staff.room_number || "—"}</span></div>
            <div className="sd__duty-row"><span className="sd__duty-label">Shift Time</span><span className="sd__duty-value">{staff.shift_time || "—"}</span></div>
            <div className="sd__duty-row"><span className="sd__duty-label">Your Role</span><span className="sd__duty-value">{staff.role}</span></div>
          </div>
        </div>

        <div className="sd__panel sd__panel--profile">
          <div className="sd__panel-head"><h3>Staff Profile</h3></div>
          <div className="sd__profile-card">
            <div className="sd__profile-avatar">{staff.name.split(" ").map((w) => w[0]).join("")}</div>
            <h4 className="sd__profile-name">{staff.name}</h4>
            <div className="sd__profile-tags">
              <span className="sd__tag sd__tag--blue">{staff.department}</span>
              <span className="sd__tag sd__tag--green">{staff.role}</span>
            </div>
            <div className="sd__profile-details">
              <div className="sd__profile-row"><span>Email:</span><span>{staff.email}</span></div>
              <div className="sd__profile-row"><span>Phone:</span><span>{staff.phone || "—"}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="sd__panel sd__panel--table">
        <div className="sd__panel-head">
          <h3>Recent Patients</h3>
          <span className="sd__panel-badge sd__panel-badge--green">{patients.length} Patients</span>
        </div>
        <div className="sd__table-wrap">
          <table className="sd__table">
            <thead><tr><th>Name</th><th>Age</th><th>Gender</th><th>Phone</th><th>Blood Group</th></tr></thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td className="sd__table-name">{p.name}</td>
                  <td>{p.age || "—"}</td>
                  <td>{p.gender || "—"}</td>
                  <td>{p.phone || "—"}</td>
                  <td>{p.blood_group || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
