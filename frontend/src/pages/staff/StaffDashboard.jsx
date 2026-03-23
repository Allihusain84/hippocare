import { useOutletContext } from "react-router-dom";
import "./StaffDashboard.css";

/* ── Demo patient data for today ── */
const todayPatients = [
  { name: "Kavita Sharma", age: 45, dept: "Cardiology", doctor: "Dr. Arjun Malhotra", room: "Room 204", status: "Admitted" },
  { name: "Rajesh Kumar", age: 52, dept: "Cardiology", doctor: "Dr. Arjun Malhotra", room: "Room 204", status: "Follow-up" },
  { name: "Sunita Devi", age: 38, dept: "Pediatrics", doctor: "Dr. Priya Sharma", room: "Room 108", status: "OPD" },
  { name: "Mohammad Irfan", age: 60, dept: "Neurology", doctor: "Dr. Sandeep Kumar", room: "Room 312", status: "Admitted" },
  { name: "Priya Singh", age: 29, dept: "Gynecology", doctor: "Dr. Sunita Agarwal", room: "Room 310", status: "Discharged" },
];

const StaffDashboard = () => {
  const { staff } = useOutletContext();

  const stats = [
    { label: "Today's Patients", value: "12", icon: "🏥", color: "#0ea5e9", bg: "#e0f2fe" },
    { label: "Assigned Doctor",  value: staff.assignedDoctor.split(" ").slice(0, 2).join(" "), icon: "🩺", color: "#8b5cf6", bg: "#ede9fe" },
    { label: "Room Duty",        value: staff.roomNumber, icon: "🚪", color: "#f59e0b", bg: "#fef3c7" },
    { label: "Pending Tasks",    value: "5",  icon: "📝", color: "#ef4444", bg: "#fef2f2" },
  ];

  return (
    <div className="sd">
      {/* ── Stat Cards ── */}
      <div className="sd__stats">
        {stats.map((s, i) => (
          <div className="sd__stat" key={i}>
            <div className="sd__stat-icon" style={{ background: s.bg, color: s.color }}>
              <span>{s.icon}</span>
            </div>
            <div className="sd__stat-body">
              <p className="sd__stat-label">{s.label}</p>
              <h3 className="sd__stat-value">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div className="sd__grid">
        {/* ── Duty Assignment Card ── */}
        <div className="sd__panel sd__panel--duty">
          <div className="sd__panel-head">
            <h3>🩺 My Duty Assignment</h3>
            <span className="sd__panel-badge sd__panel-badge--blue">{staff.dutyShift}</span>
          </div>
          <div className="sd__duty-card">
            <div className="sd__duty-row">
              <span className="sd__duty-label">Assigned Doctor</span>
              <span className="sd__duty-value">{staff.assignedDoctor}</span>
            </div>
            <div className="sd__duty-row">
              <span className="sd__duty-label">Department</span>
              <span className="sd__duty-value">{staff.assignedDoctorDept}</span>
            </div>
            <div className="sd__duty-row">
              <span className="sd__duty-label">Room Number</span>
              <span className="sd__duty-value sd__duty-value--room">{staff.roomNumber}</span>
            </div>
            <div className="sd__duty-row">
              <span className="sd__duty-label">Shift Time</span>
              <span className="sd__duty-value">{staff.shiftTime}</span>
            </div>
            <div className="sd__duty-row">
              <span className="sd__duty-label">Your Role</span>
              <span className="sd__duty-value">{staff.role}</span>
            </div>
          </div>
        </div>

        {/* ── Quick Profile ── */}
        <div className="sd__panel sd__panel--profile">
          <div className="sd__panel-head">
            <h3>👤 Staff Profile</h3>
          </div>
          <div className="sd__profile-card">
            <div className="sd__profile-avatar">
              {staff.name.split(" ").map((w) => w[0]).join("")}
            </div>
            <h4 className="sd__profile-name">{staff.name}</h4>
            <p className="sd__profile-id">{staff.id}</p>
            <div className="sd__profile-tags">
              <span className="sd__tag sd__tag--blue">{staff.department}</span>
              <span className="sd__tag sd__tag--green">{staff.role}</span>
            </div>
            <div className="sd__profile-details">
              <div className="sd__profile-row">
                <span>📧</span><span>{staff.email}</span>
              </div>
              <div className="sd__profile-row">
                <span>📞</span><span>{staff.phone}</span>
              </div>
              <div className="sd__profile-row">
                <span>📅</span><span>Joined: {staff.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Today's Patient Table ── */}
      <div className="sd__panel sd__panel--table">
        <div className="sd__panel-head">
          <h3>🏥 Today's Patients</h3>
          <span className="sd__panel-badge sd__panel-badge--green">{todayPatients.length} Patients</span>
        </div>
        <div className="sd__table-wrap">
          <table className="sd__table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Department</th>
                <th>Doctor</th>
                <th>Room</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {todayPatients.map((p, i) => (
                <tr key={i}>
                  <td className="sd__table-name">{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.dept}</td>
                  <td>{p.doctor}</td>
                  <td>{p.room}</td>
                  <td>
                    <span className={`sd__table-status sd__table-status--${p.status.toLowerCase().replace(/[-\s]/g, "")}`}>
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

export default StaffDashboard;
