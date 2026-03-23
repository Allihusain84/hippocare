import { useState, useEffect } from "react";
import "./Appointments.css";

const Appointments = () => {
  const [myAppointments, setMyAppointments] = useState([]);
  const doctorId = localStorage.getItem("hmsDoctorId") || "";

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("hmsAppointments") || "[]");
    const filtered = all.filter((a) => a.doctorId === doctorId);
    setMyAppointments(filtered);
  }, [doctorId]);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>My Appointments</h1>
          <p>Patients who have booked appointments with you.</p>
        </div>
        <button className="page__button" onClick={() => {
          const all = JSON.parse(localStorage.getItem("hmsAppointments") || "[]");
          const filtered = all.filter((a) => a.doctorId === doctorId);
          setMyAppointments(filtered);
        }}>Refresh</button>
      </div>

      {myAppointments.length === 0 ? (
        <div className="page__empty">
          <p>No appointments booked yet. When patients book with you, they'll appear here.</p>
        </div>
      ) : (
        <div className="table">
          <div className="table__row table__head">
            <span>ID</span>
            <span>Patient</span>
            <span>Date</span>
            <span>Time</span>
            <span>Concern</span>
            <span>Status</span>
          </div>
          {myAppointments.map((item) => (
            <div className="table__row" key={item.id}>
              <span>{item.id}</span>
              <span>{item.patientName}</span>
              <span>{item.date}</span>
              <span>{item.time}</span>
              <span className="table__concern">{item.concern}</span>
              <span className={`status status--${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
