import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./StaffPatients.css";

/* Demo patients */
const initialPatients = [
  { id: "P-1001", name: "Kavita Sharma",    age: 45, gender: "Female", dept: "Cardiology",  doctor: "Dr. Arjun Malhotra",  room: "Room 204", status: "Admitted",    date: "2026-03-04" },
  { id: "P-1002", name: "Rajesh Kumar",     age: 52, gender: "Male",   dept: "Cardiology",  doctor: "Dr. Arjun Malhotra",  room: "Room 204", status: "Follow-up",   date: "2026-03-04" },
  { id: "P-1003", name: "Sunita Devi",      age: 38, gender: "Female", dept: "Pediatrics",  doctor: "Dr. Priya Sharma",    room: "Room 108", status: "OPD",         date: "2026-03-04" },
  { id: "P-1004", name: "Mohammad Irfan",   age: 60, gender: "Male",   dept: "Neurology",   doctor: "Dr. Sandeep Kumar",   room: "Room 312", status: "Admitted",    date: "2026-03-03" },
  { id: "P-1005", name: "Priya Singh",      age: 29, gender: "Female", dept: "Gynecology",  doctor: "Dr. Sunita Agarwal",  room: "Room 310", status: "Discharged",  date: "2026-03-03" },
  { id: "P-1006", name: "Ramesh Yadav",     age: 67, gender: "Male",   dept: "Orthopedics", doctor: "Dr. Rajesh Bhatia",   room: "Room 215", status: "Admitted",    date: "2026-03-02" },
  { id: "P-1007", name: "Meena Kumari",     age: 41, gender: "Female", dept: "Radiology",   doctor: "Dr. Ashok Kumar",     room: "Room 105", status: "OPD",         date: "2026-03-04" },
  { id: "P-1008", name: "Suresh Tiwari",    age: 55, gender: "Male",   dept: "Urology",     doctor: "Dr. Manoj Kumar",     room: "Room 220", status: "Admitted",    date: "2026-03-04" },
  { id: "P-1009", name: "Asha Rani",        age: 33, gender: "Female", dept: "Physiotherapy",doctor: "Dr. Anand Sharma",   room: "Room 118", status: "Follow-up",   date: "2026-03-01" },
  { id: "P-1010", name: "Vikrant Joshi",    age: 48, gender: "Male",   dept: "Emergency",   doctor: "Dr. Vikrant Chauhan", room: "Room 001", status: "Admitted",    date: "2026-03-04" },
];

const StaffPatients = () => {
  const { staff } = useOutletContext();
  const [patients] = useState(initialPatients);
  const [search, setSearch] = useState("");

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sp">
      <div className="sp__header">
        <div>
          <h2>🏥 Patient Registration</h2>
          <p>Manage and view patient records</p>
        </div>
        <input
          className="sp__search"
          type="text"
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="sp__panel">
        <div className="sp__table-wrap">
          <table className="sp__table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Doctor</th>
                <th>Room</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td><code>{p.id}</code></td>
                  <td className="sp__name">{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.dept}</td>
                  <td className="sp__doc">{p.doctor}</td>
                  <td><span className="sp__room">{p.room}</span></td>
                  <td>
                    <span className={`sp__status sp__status--${p.status.toLowerCase().replace(/[-\s]/g, "")}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="sp__date">{p.date}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="sp__empty">No patients found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffPatients;
