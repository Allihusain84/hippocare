// src/components/PrescriptionForm.jsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function PrescriptionForm() {
  const [appointmentId, setAppointmentId] = useState('');
  const [medicine, setMedicine] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { error } = await supabase.from('prescriptions').insert([
      { appointment_id: appointmentId, medicine, notes }
    ]);
    setLoading(false);
    if (error) setMessage(error.message);
    else setMessage('Prescription added!');
  };

  return (
    <form onSubmit={handleAdd}>
      <h4>Add Prescription</h4>
      <input type="text" placeholder="Appointment ID" value={appointmentId} onChange={e => setAppointmentId(e.target.value)} required />
      <input type="text" placeholder="Medicine" value={medicine} onChange={e => setMedicine(e.target.value)} required />
      <input type="text" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add'}</button>
      {message && <p>{message}</p>}
    </form>
  );
}
