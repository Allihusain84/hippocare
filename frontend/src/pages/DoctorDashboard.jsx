// src/pages/DoctorDashboard.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import PrescriptionForm from '../components/PrescriptionForm';

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
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
    const fetchAppointments = async () => {
      setLoading(true);
      const { data } = await supabase.from('appointments').select('*').eq('doctor_id', user.id);
      setAppointments(data || []);
      setLoading(false);
    };
    fetchAppointments();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <ul>{appointments.map(a => <li key={a.id}>{a.appointment_date} - {a.status}</li>)}</ul>
      <PrescriptionForm />
    </div>
  );
}
