import { useOutletContext } from "react-router-dom";
import staffData from "../../data/staffData";
import "./StaffDutySchedule.css";

const allStaff = Object.values(staffData);

/* Weekly schedule mock */
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const StaffDutySchedule = () => {
  const { staff } = useOutletContext();

  return (
    <div className="sds">
      {/* ── My Duty Card ── */}
      <div className="sds__my-duty">
        <div className="sds__my-duty-head">
          <h2>📋 My Duty Schedule</h2>
          <span className="sds__shift-badge">{staff.dutyShift}</span>
        </div>
        <div className="sds__my-duty-grid">
          <div className="sds__info-card">
            <span className="sds__info-icon" style={{ background: "#e0f2fe", color: "#0284c7" }}>🩺</span>
            <div>
              <p className="sds__info-label">Assigned Doctor</p>
              <h4 className="sds__info-value">{staff.assignedDoctor}</h4>
            </div>
          </div>
          <div className="sds__info-card">
            <span className="sds__info-icon" style={{ background: "#ede9fe", color: "#7c3aed" }}>🏥</span>
            <div>
              <p className="sds__info-label">Department</p>
              <h4 className="sds__info-value">{staff.assignedDoctorDept}</h4>
            </div>
          </div>
          <div className="sds__info-card">
            <span className="sds__info-icon" style={{ background: "#fef3c7", color: "#d97706" }}>🚪</span>
            <div>
              <p className="sds__info-label">Room Number</p>
              <h4 className="sds__info-value">{staff.roomNumber}</h4>
            </div>
          </div>
          <div className="sds__info-card">
            <span className="sds__info-icon" style={{ background: "#dcfce7", color: "#16a34a" }}>⏰</span>
            <div>
              <p className="sds__info-label">Shift Time</p>
              <h4 className="sds__info-value">{staff.shiftTime}</h4>
            </div>
          </div>
        </div>

        {/* Weekly schedule */}
        <div className="sds__week">
          <h3>Weekly Schedule</h3>
          <div className="sds__week-grid">
            {weekDays.map((day, i) => {
              const isOff = day === "Sunday";
              return (
                <div key={day} className={`sds__week-day ${isOff ? "sds__week-day--off" : ""}`}>
                  <span className="sds__week-day-name">{day}</span>
                  <span className="sds__week-day-time">
                    {isOff ? "Off Day" : staff.shiftTime}
                  </span>
                  <span className="sds__week-day-room">
                    {isOff ? "—" : staff.roomNumber}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Doctor–Staff Assignment Table ── */}
      <div className="sds__panel">
        <div className="sds__panel-head">
          <h3>🩺 Doctor–Staff Assignment Table</h3>
          <span className="sds__panel-badge">{allStaff.length} Staff Members</span>
        </div>
        <div className="sds__table-wrap">
          <table className="sds__table">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Staff ID</th>
                <th>Assigned Doctor</th>
                <th>Department</th>
                <th>Room Number</th>
                <th>Shift</th>
              </tr>
            </thead>
            <tbody>
              {allStaff.map((s) => (
                <tr key={s.id} className={s.id === staff.id ? "sds__table-row--me" : ""}>
                  <td className="sds__table-name">
                    <span className="sds__table-avatar">
                      {s.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                    {s.name}
                    {s.id === staff.id && <span className="sds__me-badge">You</span>}
                  </td>
                  <td><code>{s.id}</code></td>
                  <td className="sds__table-doc">{s.assignedDoctor}</td>
                  <td>{s.assignedDoctorDept}</td>
                  <td>
                    <span className="sds__room-pill">{s.roomNumber}</span>
                  </td>
                  <td>
                    <span className={`sds__shift-pill sds__shift-pill--${s.dutyShift.split(" ")[0].toLowerCase()}`}>
                      {s.dutyShift}
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

export default StaffDutySchedule;
