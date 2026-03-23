import { useState, useEffect } from "react";
import "./MyAppointments.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("hmsAppointments") || "[]");
    setAppointments(all);
  }, []);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>My Appointments</h1>
          <p>All your scheduled consultations in one place.</p>
        </div>
        <button className="page__button" onClick={() => {
          const all = JSON.parse(localStorage.getItem("hmsAppointments") || "[]");
          setAppointments(all);
        }}>Refresh</button>
      </div>

      {appointments.length === 0 ? (
        <div className="page__empty">
          <p>No appointments yet. Book an appointment with a doctor to get started.</p>
        </div>
      ) : (
        <div className="table">
          <div className="table__row table__head">
            <span>ID</span>
            <span>Doctor</span>
            <span>Date</span>
            <span>Time</span>
            <span>Concern</span>
            <span>Status</span>
          </div>
          {appointments.map((item) => (
            <div className="table__row" key={item.id}>
              <span>{item.id}</span>
              <span>{item.doctorName}</span>
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

export default MyAppointments;
