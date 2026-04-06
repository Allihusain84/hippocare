import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { FaCalendarAlt, FaFileMedical, FaPills, FaMoneyBillWave, FaHeartbeat, FaBell, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(prof);

      const { data: appts } = await supabase
        .from("appointments")
        .select("*")
        .eq("patient_id", user.id)
        .order("appointment_date", { ascending: true });
      setAppointments(appts || []);

      const apptIds = (appts || []).map((a) => a.id);
      if (apptIds.length > 0) {
        const { data: rxs } = await supabase
          .from("prescriptions")
          .select("*")
          .in("appointment_id", apptIds)
          .order("created_at", { ascending: false });
        setPrescriptions(rxs || []);
      }

      const { data: pays } = await supabase
        .from("payments")
        .select("*")
        .eq("patient_id", user.id)
        .order("payment_date", { ascending: false });
      setBills(pays || []);

      setLoading(false);
    };
    load();
  }, []);

  const today = new Date().toLocaleDateString();
  const upcoming = appointments.filter((a) => a.status !== "Completed" && a.status !== "Cancelled");
  const pendingBills = bills.filter((b) => b.status === "Pending");

  if (loading) return <p>Loading...</p>;

  return (
    <div className="patient-dashboard">
      <div className="pd-header">
        <div className="pd-header__left">
          <h2 className="pd-header__hospital">Hippocare Hospital</h2>
          <span className="pd-header__portal">Patient Portal</span>
        </div>
        <div className="pd-header__right">
          <span className="pd-header__date">{today}</span>
          <span className="pd-header__icon"><FaBell /></span>
          <button className="pd-header__logout" title="Logout" onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}><FaSignOutAlt /></button>
        </div>
      </div>

      <div className="pd-welcome">
        <h3>Welcome back, {profile?.name || "Patient"}</h3>
        <p>Track your appointments, prescriptions, and bills in one place.</p>
        <button className="pd-action-btn" onClick={() => navigate("/patient/book")}>
          <FaCalendarAlt style={{ marginRight: 8 }} /> Book Appointment
        </button>
      </div>

      <div className="pd-cards">
        <div className="pd-card" style={{ borderLeft: "6px solid #2563eb" }}>
          <FaCalendarAlt className="pd-card__icon" />
          <div>
            <div className="pd-card__title">Upcoming Appointments</div>
            <div className="pd-card__value">{upcoming.length}</div>
          </div>
        </div>
        <div className="pd-card" style={{ borderLeft: "6px solid #0ea5e9" }}>
          <FaPills className="pd-card__icon" />
          <div>
            <div className="pd-card__title">Prescriptions</div>
            <div className="pd-card__value">{prescriptions.length}</div>
          </div>
        </div>
        <div className="pd-card" style={{ borderLeft: "6px solid #f59e42" }}>
          <FaMoneyBillWave className="pd-card__icon" />
          <div>
            <div className="pd-card__title">Pending Bills</div>
            <div className="pd-card__value">{pendingBills.length}</div>
          </div>
        </div>
        <div className="pd-card" style={{ borderLeft: "6px solid #22c55e" }}>
          <FaHeartbeat className="pd-card__icon" />
          <div>
            <div className="pd-card__title">Total Visits</div>
            <div className="pd-card__value">{appointments.length}</div>
          </div>
        </div>
      </div>

      <div className="pd-main-cols">
        <div className="pd-col pd-col--left">
          <h4 className="pd-section-title"><FaCalendarAlt /> Upcoming Appointments</h4>
          <div className="pd-list">
            {upcoming.length === 0 ? <p>No upcoming appointments.</p> : upcoming.map((apt) => (
              <div className="pd-list-item" key={apt.id}>
                <div className="pd-list-main">
                  <span className="pd-list-doc">{apt.doctor_name}</span>
                  <span className="pd-list-date">{apt.appointment_date}</span>
                  <span className="pd-list-time">{apt.appointment_time || ""}</span>
                  <span className={`pd-list-status pd-list-status--${(apt.status || "").toLowerCase()}`}>{apt.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pd-col pd-col--right">
          <h4 className="pd-section-title"><FaFileMedical /> Recent Prescriptions</h4>
          <div className="pd-list">
            {prescriptions.length === 0 ? <p>No prescriptions yet.</p> : prescriptions.slice(0, 5).map((rx) => (
              <div className="pd-list-item" key={rx.id}>
                <div className="pd-list-main">
                  <span className="pd-list-meds">{rx.medicine}</span>
                  <span className="pd-list-date">{rx.notes || ""}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pd-quick-actions">
        <button className="pd-action-btn" onClick={() => navigate("/patient/book")}><FaCalendarAlt /> Book Appointment</button>
        <button className="pd-action-btn" onClick={() => navigate("/patient/bills")}><FaMoneyBillWave /> Pay Bills</button>
        <button className="pd-action-btn" onClick={() => navigate("/patient/appointments")}><FaCalendarAlt /> View Appointments</button>
      </div>
    </div>
  );
};

export default Dashboard;
