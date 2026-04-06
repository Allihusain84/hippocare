import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./Prescriptions.css";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ appointment_id: "", medicine: "", notes: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const [rxRes, apptRes] = await Promise.all([
        supabase.from("prescriptions").select("*").eq("doctor_id", user.id).order("created_at", { ascending: false }),
        supabase.from("appointments").select("id, patient_name, patient_id, appointment_date").eq("doctor_id", user.id).order("appointment_date", { ascending: false }),
      ]);

      setPrescriptions(rxRes.data || []);
      setAppointments(apptRes.data || []);
      setLoading(false);
    };
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMessage("Please login."); return; }

    const apt = appointments.find((a) => a.id === form.appointment_id);

    const { error } = await supabase.from("prescriptions").insert([{
      appointment_id: form.appointment_id,
      doctor_id: user.id,
      patient_id: apt?.patient_id || null,
      medicine: form.medicine,
      notes: form.notes,
    }]);

    if (error) { setMessage(error.message); return; }

    setMessage("Prescription saved.");
    setForm({ appointment_id: "", medicine: "", notes: "" });

    const { data: updated } = await supabase
      .from("prescriptions")
      .select("*")
      .eq("doctor_id", user.id)
      .order("created_at", { ascending: false });
    setPrescriptions(updated || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Prescriptions</h1>
          <p>Create digital prescriptions and review history.</p>
        </div>
      </div>

      <div className="prescriptions">
        <form className="form" onSubmit={handleSubmit}>
          <h3>Create Prescription</h3>
          <label>
            Appointment
            <select name="appointment_id" value={form.appointment_id} onChange={handleChange} required>
              <option value="">Select Appointment</option>
              {appointments.map((a) => (
                <option key={a.id} value={a.id}>{a.patient_name} — {a.appointment_date}</option>
              ))}
            </select>
          </label>
          <label>
            Medicines
            <textarea name="medicine" placeholder="List prescribed medicines" value={form.medicine} onChange={handleChange} required />
          </label>
          <label>
            Notes
            <textarea name="notes" placeholder="Diagnosis or instructions" value={form.notes} onChange={handleChange} />
          </label>
          {message && <p className="form__success">{message}</p>}
          <button type="submit" className="page__button">Save Prescription</button>
        </form>

        <div className="history">
          <h3>Prescription History</h3>
          {prescriptions.length === 0 ? <p>No prescriptions yet.</p> : (
            <div className="table">
              <div className="table__row table__head">
                <span>Patient</span>
                <span>Date</span>
                <span>Medicines</span>
                <span>Notes</span>
              </div>
              {prescriptions.map((rx) => {
                const apt = appointments.find((a) => a.id === rx.appointment_id);
                return (
                  <div className="table__row" key={rx.id}>
                    <span>{apt?.patient_name || "—"}</span>
                    <span>{rx.created_at ? new Date(rx.created_at).toLocaleDateString() : "—"}</span>
                    <span>{rx.medicine}</span>
                    <span>{rx.notes || "—"}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;
