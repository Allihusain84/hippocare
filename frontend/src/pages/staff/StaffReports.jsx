import { useOutletContext } from "react-router-dom";
import "./StaffReports.css";

const reports = [
  { id: "RPT-301", title: "Monthly Patient Summary – Feb 2026", date: "2026-03-01", type: "Patient", status: "Submitted" },
  { id: "RPT-302", title: "Room Utilisation Report – Wing B",   date: "2026-02-28", type: "Facility", status: "Approved" },
  { id: "RPT-303", title: "Duty Attendance Log – February",     date: "2026-02-28", type: "Attendance", status: "Submitted" },
  { id: "RPT-304", title: "OPD Footfall – Feb 2026",            date: "2026-02-27", type: "Patient", status: "Pending" },
  { id: "RPT-305", title: "Emergency Room Statistics",           date: "2026-02-25", type: "Facility", status: "Approved" },
  { id: "RPT-306", title: "Staff Overtime Hours – Feb 2026",    date: "2026-02-25", type: "Attendance", status: "Submitted" },
  { id: "RPT-307", title: "Equipment Maintenance Checklist",    date: "2026-02-20", type: "Facility", status: "Approved" },
];

const StaffReports = () => {
  const { staff } = useOutletContext();

  return (
    <div className="sr">
      <h2 className="sr__title">📊 Reports</h2>
      <p className="sr__sub">View and track submitted reports</p>

      {/* Summary cards */}
      <div className="sr__cards">
        <div className="sr__card sr__card--blue">
          <span className="sr__card-num">{reports.length}</span>
          <span className="sr__card-label">Total Reports</span>
        </div>
        <div className="sr__card sr__card--green">
          <span className="sr__card-num">{reports.filter(r=>r.status==="Approved").length}</span>
          <span className="sr__card-label">Approved</span>
        </div>
        <div className="sr__card sr__card--amber">
          <span className="sr__card-num">{reports.filter(r=>r.status==="Pending").length}</span>
          <span className="sr__card-label">Pending Review</span>
        </div>
        <div className="sr__card sr__card--purple">
          <span className="sr__card-num">{reports.filter(r=>r.status==="Submitted").length}</span>
          <span className="sr__card-label">Submitted</span>
        </div>
      </div>

      <div className="sr__panel">
        <div className="sr__table-wrap">
          <table className="sr__table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td><code>{r.id}</code></td>
                  <td className="sr__name">{r.title}</td>
                  <td>
                    <span className={`sr__type sr__type--${r.type.toLowerCase()}`}>{r.type}</span>
                  </td>
                  <td className="sr__date">{r.date}</td>
                  <td>
                    <span className={`sr__status sr__status--${r.status.toLowerCase()}`}>{r.status}</span>
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

export default StaffReports;
