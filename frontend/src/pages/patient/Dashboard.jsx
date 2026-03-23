
import Card from "../../components/Card";
import { stats, patientAppointments, prescriptions, bills } from "../../data/mockData";
import { FaCalendarAlt, FaFileMedical, FaPills, FaMoneyBillWave, FaHeartbeat, FaBell, FaUserCircle, FaSignOutAlt, FaDownload, FaUserEdit } from "react-icons/fa";
import "./Dashboard.css";

const patient = {
  name: "John Doe",
  id: "P-3001",
  photo: "https://randomuser.me/api/portraits/men/32.jpg",
};

const Dashboard = () => {
  const today = new Date().toLocaleDateString();
  return (
    <div className="patient-dashboard">
      {/* Top Header */}
      <div className="pd-header">
        <div className="pd-header__left">
          <h2 className="pd-header__hospital">Hippocare Hospital</h2>
          <span className="pd-header__portal">Patient Portal</span>
        </div>
        <div className="pd-header__right">
          <span className="pd-header__date">{today}</span>
          <span className="pd-header__icon"><FaBell /></span>
          <span className="pd-header__avatar" title="Profile">
            <img src={patient.photo} alt={patient.name} onClick={() => window.location.href='/patient/profile'} />
          </span>
          <button className="pd-header__logout" title="Logout"><FaSignOutAlt /></button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="pd-welcome">
        <h3>Welcome back, {patient.name}</h3>
        <p>Track your appointments, prescriptions, and bills in one place.</p>
        <button className="pd-action-btn" onClick={() => window.location.href='/patient/book'}>
          <FaCalendarAlt style={{ marginRight: 8 }} /> Book Appointment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="pd-cards">
        <div className="pd-card" style={{ borderLeft: '6px solid #2563eb' }}>
          <FaCalendarAlt className="pd-card__icon" />
          <div>
            <div className="pd-card__title">Upcoming Appointments</div>
            <div className="pd-card__value">2</div>
            <div className="pd-card__desc">2 Upcoming Visits</div>
          </div>
        </div>
        <div className="pd-card" style={{ borderLeft: '6px solid #0ea5e9' }}>
          <FaPills className="pd-card__icon" />
          <div>
            <div className="pd-card__title">Prescriptions</div>
            <div className="pd-card__value">5</div>
            <div className="pd-card__desc">5 Active Prescriptions</div>
          </div>
        </div>
        <div className="pd-card" style={{ borderLeft: '6px solid #f59e42' }}>
          <FaMoneyBillWave className="pd-card__icon" />
          <div>
            <div className="pd-card__title">Outstanding Bills</div>
            <div className="pd-card__value">1</div>
            <div className="pd-card__desc">1 Pending Payment</div>
          </div>
        </div>
        <div className="pd-card" style={{ borderLeft: '6px solid #22c55e' }}>
          <FaHeartbeat className="pd-card__icon" />
          <div>
            <div className="pd-card__title">Health Score</div>
            <div className="pd-card__value">86%</div>
            <div className="pd-card__desc">86% Health Status</div>
          </div>
        </div>
      </div>

      {/* Two Columns: Appointments & Prescriptions */}
      <div className="pd-main-cols">
        <div className="pd-col pd-col--left">
          <h4 className="pd-section-title"><FaCalendarAlt /> Upcoming Appointments</h4>
          <div className="pd-list">
            {patientAppointments.map((apt, idx) => (
              <div className="pd-list-item" key={apt.id}>
                <div className="pd-list-main">
                  <span className="pd-list-doc">{apt.doctor}</span>
                  <span className="pd-list-date">{apt.date}</span>
                  <span className="pd-list-time">{apt.time}</span>
                  <span className={`pd-list-status pd-list-status--${apt.status.toLowerCase()}`}>{apt.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pd-col pd-col--right">
          <h4 className="pd-section-title"><FaFileMedical /> Recent Prescriptions</h4>
          <div className="pd-list">
            {prescriptions.map((rx, idx) => (
              <div className="pd-list-item" key={rx.id}>
                <div className="pd-list-main">
                  <span className="pd-list-meds">{rx.medicines}</span>
                  <span className="pd-list-doc">{rx.doctor}</span>
                  <span className="pd-list-date">{rx.date}</span>
                  <button className="pd-list-download"><FaDownload /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pd-quick-actions">
        <button className="pd-action-btn" onClick={() => window.location.href='/patient/book'}><FaCalendarAlt /> Book Appointment</button>
        <button className="pd-action-btn" onClick={() => window.location.href='/patient/bills'}><FaMoneyBillWave /> Pay Bills</button>
        <button className="pd-action-btn" onClick={() => window.location.href='/patient/appointments'}><FaCalendarAlt /> View Appointments</button>
        <button className="pd-action-btn" onClick={() => window.location.href='/patient/profile'}><FaUserEdit /> Edit Profile</button>
      </div>
    </div>
  );
};

export default Dashboard;
