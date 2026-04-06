import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./MyAppointments.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("patient_id", user.id)
      .order("appointment_date", { ascending: false });

    if (!error) setAppointments(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAppointments(); }, []);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>My Appointments</h1>
          <p>All your scheduled consultations in one place.</p>
        </div>
        <button className="page__button" onClick={fetchAppointments}>Refresh</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <div className="page__empty">
          <p>No appointments yet. Book an appointment with a doctor to get started.</p>
        </div>
      ) : (
        <div className="table">
          <div className="table__row table__head">
            <span>Doctor</span>
            <span>Date</span>
            <span>Time</span>
            <span>Concern</span>
            <span>Status</span>
          </div>
          {appointments.map((item) => (
            <div className="table__row" key={item.id}>
              <span>{item.doctor_name || "—"}</span>
              <span>{item.appointment_date || item.date || "—"}</span>
              <span>{item.appointment_time || item.time || "—"}</span>
              <span className="table__concern">{item.concern || "—"}</span>
              <span className={`status status--${(item.status || "").toLowerCase()}`}>
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
