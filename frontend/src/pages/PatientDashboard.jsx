// src/pages/PatientDashboard.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import AppointmentForm from '../components/AppointmentForm';

export default function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setLoading(true);
      const { data: doctors } = await supabase.from('doctors').select('*');
      const { data: appointments } = await supabase.from('appointments').select('*').eq('patient_id', user.id);
      const { data: prescriptions } = await supabase.from('prescriptions').select('*').in('appointment_id', appointments.map(a => a.id));
      setDoctors(doctors || []);
      setAppointments(appointments || []);
      setPrescriptions(prescriptions || []);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <h3>Doctors</h3>
      <ul>{doctors.map(d => <li key={d.id}>{d.name} ({d.specialization})</li>)}</ul>
      <AppointmentForm />
      <h3>Appointments</h3>
      <ul>{appointments.map(a => <li key={a.id}>{a.appointment_date} - {a.status}</li>)}</ul>
      <h3>Prescriptions</h3>
      <ul>{prescriptions.map(p => <li key={p.id}>{p.medicine} - {p.notes}</li>)}</ul>
    </div>
  );
}
