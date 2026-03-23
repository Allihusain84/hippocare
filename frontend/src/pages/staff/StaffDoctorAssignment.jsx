import { useOutletContext } from "react-router-dom";
import staffData from "../../data/staffData";
import "./StaffDoctorAssignment.css";

const allStaff = Object.values(staffData);

const StaffDoctorAssignment = () => {
  const { staff } = useOutletContext();

  /* Group by department */
  const byDept = {};
  allStaff.forEach((s) => {
    const dept = s.assignedDoctorDept;
    if (!byDept[dept]) byDept[dept] = [];
    byDept[dept].push(s);
  });

  return (
    <div className="sda">
      <h2 className="sda__title">👨‍⚕️ Doctor – Staff Assignment</h2>
      <p className="sda__sub">Overview of staff assigned to each doctor across departments</p>

      {/* Your assignment highlight */}
      <div className="sda__my">
        <span className="sda__my-label">Your Assignment</span>
        <div className="sda__my-row">
          <div className="sda__my-item">
            <span className="sda__my-key">Doctor</span>
            <span className="sda__my-val">{staff.assignedDoctor}</span>
          </div>
          <div className="sda__my-item">
            <span className="sda__my-key">Department</span>
            <span className="sda__my-val">{staff.assignedDoctorDept}</span>
          </div>
          <div className="sda__my-item">
            <span className="sda__my-key">Room</span>
            <span className="sda__my-val">{staff.roomNumber}</span>
          </div>
          <div className="sda__my-item">
            <span className="sda__my-key">Shift</span>
            <span className="sda__my-val">{staff.dutyShift} ({staff.shiftTime})</span>
          </div>
        </div>
      </div>

      {/* Department-wise cards */}
      <div className="sda__grid">
        {Object.entries(byDept).map(([dept, members]) => (
          <div className="sda__card" key={dept}>
            <div className="sda__card-head">
              <h3>{dept}</h3>
              <span className="sda__badge">{members.length} staff</span>
            </div>
            {members.map((m) => {
              const isYou = m.id === staff.id;
              return (
                <div className={`sda__row ${isYou ? "sda__row--you" : ""}`} key={m.id}>
                  <div className="sda__avatar">{m.name.charAt(0)}</div>
                  <div className="sda__info">
                    <span className="sda__info-name">
                      {m.name} {isYou && <span className="sda__you-tag">You</span>}
                    </span>
                    <span className="sda__info-meta">{m.role} · {m.id}</span>
                  </div>
                  <div className="sda__right">
                    <span className="sda__doc-name">{m.assignedDoctor}</span>
                    <span className="sda__room-pill">{m.roomNumber}</span>
                    <span className={`sda__shift sda__shift--${m.dutyShift.split(" ")[0].toLowerCase()}`}>
                      {m.dutyShift}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDoctorAssignment;
