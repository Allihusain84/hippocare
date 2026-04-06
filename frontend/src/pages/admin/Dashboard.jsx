import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ doctors: 0, staff: 0, patients: 0, appointments: 0 });
  const [recentAppts, setRecentAppts] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [docRes, staffRes, patRes, apptRes] = await Promise.all([
        supabase.from("doctors").select("id", { count: "exact", head: true }),
        supabase.from("staff").select("id", { count: "exact", head: true }),
        supabase.from("patients").select("id", { count: "exact", head: true }),
        supabase.from("appointments").select("id", { count: "exact", head: true }),
      ]);

      setCounts({
        doctors: docRes.count || 0,
        staff: staffRes.count || 0,
        patients: patRes.count || 0,
        appointments: apptRes.count || 0,
      });

      const { data: appts } = await supabase
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: false })
        .limit(10);
      setRecentAppts(appts || []);

      const { data: patients } = await supabase
        .from("patients")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);
      setRecentPatients(patients || []);

      setLoading(false);
    };
    load();
  }, []);

  const statCards = [
    { label: "Total Doctors",      value: counts.doctors,      icon: "🩺", color: "#0ea5e9", to: "/admin/doctors" },
    { label: "Total Staff",        value: counts.staff,        icon: "👤", color: "#8b5cf6", to: "/admin/staff" },
    { label: "Total Patients",     value: counts.patients,     icon: "👥", color: "#10b981", to: "/admin/patients" },
    { label: "Appointments",       value: counts.appointments, icon: "📅", color: "#f59e0b", to: "/admin/appointments" },
  ];

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="adm-dash">
      <div className="adm-dash__header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Real-time overview of hospital operations</p>
        </div>
        <button className="adm-dash__report-btn" onClick={() => window.print()}>
          Generate Report
        </button>
      </div>

      <div className="adm-dash__stats">
        {statCards.map((s) => (
          <div key={s.label} className="adm-dash__card" style={{ "--accent": s.color }} onClick={() => navigate(s.to)}>
            <span className="adm-dash__card-icon">{s.icon}</span>
            <div>
              <span className="adm-dash__card-val">{s.value}</span>
              <span className="adm-dash__card-lbl">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="adm-dash__quick">
        <h2>Quick Actions</h2>
        <div className="adm-dash__quick-grid">
          {[
            { label: "Manage Doctors",   icon: "🩺", to: "/admin/doctors" },
            { label: "Manage Staff",     icon: "👤", to: "/admin/staff" },
            { label: "View Patients",    icon: "👥", to: "/admin/patients" },
            { label: "View Appointments", icon: "📅", to: "/admin/appointments" },
          ].map((q) => (
            <button key={q.label} className="adm-dash__quick-btn" onClick={() => navigate(q.to)}>
              <span>{q.icon}</span> {q.label}
            </button>
          ))}
        </div>
      </div>

      <div className="adm-dash__section">
        <div className="adm-dash__section-head">
          <h2>Recent Appointments</h2>
          <span className="adm-dash__badge">{recentAppts.length} shown</span>
        </div>
        <div className="adm-dash__table-wrap">
          <table className="adm-dash__table">
            <thead>
              <tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th></tr>
            </thead>
            <tbody>
              {recentAppts.map((a) => (
                <tr key={a.id}>
                  <td>{a.patient_name || "—"}</td>
                  <td>{a.doctor_name || "—"}</td>
                  <td>{a.appointment_date}</td>
                  <td>{a.appointment_time || "—"}</td>
                  <td>
                    <span className={`adm-dash__status adm-dash__status--${(a.status || "").toLowerCase()}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="adm-dash__section">
        <div className="adm-dash__section-head">
          <h2>Recent Patients</h2>
          <span className="adm-dash__badge">{recentPatients.length} shown</span>
        </div>
        <div className="adm-dash__table-wrap">
          <table className="adm-dash__table">
            <thead>
              <tr><th>Name</th><th>Age</th><th>Gender</th><th>Phone</th><th>Blood Group</th></tr>
            </thead>
            <tbody>
              {recentPatients.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.phone || "—"}</td>
                  <td><span className="adm-dash__id">{p.blood_group || "—"}</span></td>
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
