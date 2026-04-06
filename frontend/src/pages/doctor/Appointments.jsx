import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./Appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("doctor_id", user.id)
      .order("appointment_date", { ascending: false });

    if (!error) setAppointments(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleStatusChange = async (id, newStatus) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
    }
  };

  const STATUS_OPTIONS = ["Confirmed", "Waiting", "Completed", "Cancelled"];

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>My Appointments</h1>
          <p>Patients who have booked appointments with you.</p>
        </div>
        <button className="page__button" onClick={fetchAppointments}>Refresh</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <div className="page__empty">
          <p>No appointments booked yet. When patients book with you, they'll appear here.</p>
        </div>
      ) : (
        <div className="table">
          <div className="table__row table__head">
            <span>Patient</span>
            <span>Date</span>
            <span>Time</span>
            <span>Concern</span>
            <span>Status</span>
          </div>
          {appointments.map((item) => (
            <div className="table__row" key={item.id}>
              <span>{item.patient_name || "—"}</span>
              <span>{item.appointment_date || item.date || "—"}</span>
              <span>{item.appointment_time || item.time || "—"}</span>
              <span className="table__concern">{item.concern || "—"}</span>
              <span>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className={`status status--${(item.status || "").toLowerCase()}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
