// src/components/AppointmentForm.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AppointmentForm() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await supabase.from('doctors').select('*');
      setDoctors(data || []);
    };
    fetchDoctors();
  }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage('Please login first.');
      setLoading(false);
      return;
    }
    const { error } = await supabase.from('appointments').insert([
      { doctor_id: doctorId, patient_id: user.id, appointment_date: date, status: 'pending' }
    ]);
    setLoading(false);
    if (error) setMessage(error.message);
    else setMessage('Appointment booked!');
  };

  return (
    <form onSubmit={handleBook}>
      <h4>Book Appointment</h4>
      <select value={doctorId} onChange={e => setDoctorId(e.target.value)} required>
        <option value="">Select Doctor</option>
        {doctors.map(doc => <option key={doc.id} value={doc.id}>{doc.name}</option>)}
      </select>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? 'Booking...' : 'Book'}</button>
      {message && <p>{message}</p>}
    </form>
  );
}
