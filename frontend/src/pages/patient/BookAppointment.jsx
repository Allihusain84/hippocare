import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSearchParams } from "react-router-dom";
import "./BookAppointment.css";

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const doctorIdParam = searchParams.get("doctor");
  const [allDoctors, setAllDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorId: doctorIdParam || "", doctorName: "", date: "", time: "", patientName: "", concern: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("doctors").select("id, name, specialization, department").order("name");
      setAllDoctors(data || []);

      if (doctorIdParam && data) {
        const doc = data.find((d) => d.id === doctorIdParam);
        if (doc) setForm((p) => ({ ...p, doctorName: doc.name }));
      }

      const profile = JSON.parse(localStorage.getItem("hmsProfile") || "{}");
      if (profile.name) setForm((p) => ({ ...p, patientName: profile.name }));
    };
    load();
  }, [doctorIdParam]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "doctorId") {
      const doc = allDoctors.find((d) => d.id === value);
      setForm((prev) => ({ ...prev, doctorId: value, doctorName: doc ? doc.name : "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profile = JSON.parse(localStorage.getItem("hmsProfile") || "{}");

    const { error } = await supabase.from("appointments").insert([{
      doctor_id: form.doctorId,
      doctor_name: form.doctorName,
      patient_id: profile.id,
      patient_name: profile.name || form.patientName,
      appointment_date: form.date,
      appointment_time: form.time,
      concern: form.concern,
      status: "Confirmed",
      booked_at: new Date().toISOString(),
    }]);
    if (error) { alert("Failed to book: " + error.message); return; }
    setSubmitted(true);
  };

  return (
    <div className="page">
      <div className="page__header">
        <div><h1>Book Appointment</h1><p>Schedule a visit with your preferred specialist.</p></div>
      </div>

      {submitted ? (
        <div className="form__success-card">
          <div className="form__success-icon">Booked!</div>
          <h2>Appointment Booked Successfully!</h2>
          <p>Your appointment with <strong>{form.doctorName}</strong> has been confirmed.</p>
          <div className="form__success-details"><span>{form.date}</span><span>{form.time}</span></div>
          <button className="page__button" onClick={() => { setSubmitted(false); setForm({ doctorId: "", doctorName: "", date: "", time: "", patientName: "", concern: "" }); }}>Book Another</button>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <label>Doctor
            <select name="doctorId" value={form.doctorId} onChange={handleChange} required>
              <option value="">-- Select Doctor --</option>
              {allDoctors.map((d) => (
                <option key={d.id} value={d.id}>{d.name} — {d.specialization || d.department}</option>
              ))}
            </select>
          </label>
          <label>Your Name<input type="text" name="patientName" placeholder="Enter your full name" value={form.patientName} onChange={handleChange} required /></label>
          <label>Date<input type="date" name="date" value={form.date} onChange={handleChange} required /></label>
          <label>Time<input type="time" name="time" value={form.time} onChange={handleChange} required /></label>
          <label>Concern<textarea name="concern" placeholder="Describe your health concern" value={form.concern} onChange={handleChange} required /></label>
          <button type="submit" className="page__button">Confirm Appointment</button>
        </form>
      )}
    </div>
  );
};

export default BookAppointment;
