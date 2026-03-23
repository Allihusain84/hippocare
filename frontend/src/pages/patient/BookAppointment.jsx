import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSearchParams } from "react-router-dom";
import { getDoctorsDataMerged } from "../../utils/getDoctorData";
import "./BookAppointment.css";

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const doctorIdParam = searchParams.get("doctor");
  const doctorsData = getDoctorsDataMerged();
  const prefilledDoc = doctorIdParam ? doctorsData[doctorIdParam] : null;

  const [form, setForm] = useState({
    doctorId: doctorIdParam || "",
    doctorName: prefilledDoc ? prefilledDoc.name : "",
    date: "",
    time: "",
    patientName: "",
    concern: ""
  });
  const [submitted, setSubmitted] = useState(false);

  /* Build list of all doctors for the dropdown */
  const allDoctors = Object.values(doctorsData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "doctorId") {
      const doc = doctorsData[value];
      setForm((prev) => ({ ...prev, doctorId: value, doctorName: doc ? doc.name : "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const profile = JSON.parse(localStorage.getItem("hmsProfile")) || {};

    // Build appointment object
    const appointment = {
      doctor_id: form.doctorId,
      doctor_name: form.doctorName,
      patient_id: profile.id,
      patient_name: profile.name || form.patientName,
      date: form.date,
      time: form.time,
      concern: form.concern,
      status: "Confirmed",
      booked_at: new Date().toISOString()
    };

    // Try to insert into Supabase
    const { error } = await supabase.from("appointments").insert([appointment]);
    if (error) {
      // Fallback: Save to localStorage if Supabase fails
      const existing = JSON.parse(localStorage.getItem("hmsAppointments") || "[]");
      existing.push(appointment);
      localStorage.setItem("hmsAppointments", JSON.stringify(existing));
      alert("Supabase insert failed, saved locally: " + error.message);
    }

    setSubmitted(true);
  };

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Book Appointment</h1>
          <p>Schedule a visit with your preferred specialist.</p>
        </div>
      </div>

      {submitted ? (
        <div className="form__success-card">
          <div className="form__success-icon">✅</div>
          <h2>Appointment Booked Successfully!</h2>
          <p>Your appointment with <strong>{form.doctorName}</strong> has been confirmed.</p>
          <div className="form__success-details">
            <span>📅 {form.date}</span>
            <span>🕐 {form.time}</span>
          </div>
          <p className="form__success-note">You can view your appointments in the "My Appointments" section.</p>
          <button className="page__button" onClick={() => { setSubmitted(false); setForm({ doctorId: "", doctorName: "", date: "", time: "", patientName: "", concern: "" }); }}>Book Another</button>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Doctor
            <select name="doctorId" value={form.doctorId} onChange={handleChange} required>
              <option value="">-- Select Doctor --</option>
              {allDoctors.map((d) => (
                <option key={d.id} value={d.id}>{d.name} — {d.specializations[0]}</option>
              ))}
            </select>
          </label>
          <label>
            Your Name
            <input
              type="text"
              name="patientName"
              placeholder="Enter your full name"
              value={form.patientName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </label>
          <label>
            Time
            <input type="time" name="time" value={form.time} onChange={handleChange} required />
          </label>
          <label>
            Concern
            <textarea
              name="concern"
              placeholder="Describe your health concern"
              value={form.concern}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="page__button">
            Confirm Appointment
          </button>
        </form>
      )}
    </div>
  );
};

export default BookAppointment;
