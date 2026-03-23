import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import doctorsData from "../../data/doctorsData";
import staffDataRaw from "../../data/staffData";
import { appointments as mockAppts, patients as mockPatients } from "../../data/mockData";
import "./Dashboard.css";

/* ── Pull real counts ── */
const countDoctors = () => {
  const saved = localStorage.getItem("hmsAdminDoctors");
  return saved ? JSON.parse(saved).length : Object.keys(doctorsData).length;
};
const countStaff = () => {
  const saved = localStorage.getItem("hmsAdminStaff");
  return saved ? JSON.parse(saved).length : Object.keys(staffDataRaw).length;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [totalDoctors, setTotalDoctors] = useState(countDoctors);
  const [totalStaff, setTotalStaff] = useState(countStaff);
  const totalPatients = mockPatients.length;
  const todayAppts = mockAppts.filter((a) => a.status !== "Cancelled").length;

  /* Re-sync when navigating back */
  useEffect(() => {
    setTotalDoctors(countDoctors());
    setTotalStaff(countStaff());
  }, []);

  const statCards = [
    { label: "Total Doctors",      value: totalDoctors,  icon: "🩺", color: "#0ea5e9", to: "/admin/doctors" },
    { label: "Total Staff",        value: totalStaff,    icon: "👤", color: "#8b5cf6", to: "/admin/staff" },
    { label: "Total Patients",     value: totalPatients, icon: "👥", color: "#10b981", to: "/admin/patients" },
    { label: "Appointments Today", value: todayAppts,    icon: "📅", color: "#f59e0b", to: "/admin/appointments" },
  ];

  return (
    <div className="adm-dash">
      {/* ── Header ── */}
      <div className="adm-dash__header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Real-time overview of hospital operations</p>
        </div>
        <button className="adm-dash__report-btn" onClick={() => window.print()}>
          📄 Generate Report
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="adm-dash__stats">
        {statCards.map((s) => (
          <div
            key={s.label}
            className="adm-dash__card"
            style={{ "--accent": s.color }}
            onClick={() => navigate(s.to)}
          >
            <span className="adm-dash__card-icon">{s.icon}</span>
            <div>
              <span className="adm-dash__card-val">{s.value}</span>
              <span className="adm-dash__card-lbl">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Quick Links ── */}
      <div className="adm-dash__quick">
        <h2>Quick Actions</h2>
        <div className="adm-dash__quick-grid">
          {[
            { label: "Manage Doctors",    icon: "🩺", to: "/admin/doctors" },
            { label: "Manage Staff",       icon: "👤", to: "/admin/staff" },
            { label: "View Patients",      icon: "👥", to: "/admin/patients" },
            { label: "View Appointments",  icon: "📅", to: "/admin/appointments" },
          ].map((q) => (
            <button
              key={q.label}
              className="adm-dash__quick-btn"
              onClick={() => navigate(q.to)}
            >
              <span>{q.icon}</span> {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Appointments Today ── */}
      <div className="adm-dash__section">
        <div className="adm-dash__section-head">
          <h2>Appointments Today</h2>
          <span className="adm-dash__badge">{mockAppts.length} total</span>
        </div>
        <div className="adm-dash__table-wrap">
          <table className="adm-dash__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAppts.map((a) => (
                <tr key={a.id}>
                  <td><span className="adm-dash__id">{a.id}</span></td>
                  <td>{a.patient}</td>
                  <td>{a.doctor}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>
                    <span className={`adm-dash__status adm-dash__status--${a.status.toLowerCase()}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Patients ── */}
      <div className="adm-dash__section">
        <div className="adm-dash__section-head">
          <h2>Recent Patients</h2>
          <span className="adm-dash__badge">{mockPatients.length} registered</span>
        </div>
        <div className="adm-dash__table-wrap">
          <table className="adm-dash__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Condition</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPatients.map((p) => (
                <tr key={p.id}>
                  <td><span className="adm-dash__id">{p.id}</span></td>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.condition}</td>
                  <td>
                    <span className={`adm-dash__status adm-dash__status--${p.status.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
