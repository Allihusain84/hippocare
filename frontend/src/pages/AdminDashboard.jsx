// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import DoctorList from '../components/DoctorList';
import AppointmentForm from '../components/AppointmentForm';

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: doctors } = await supabase.from('doctors').select('*');
      const { data: patients } = await supabase.from('patients').select('*');
      const { data: appointments } = await supabase.from('appointments').select('*');
      const { data: payments } = await supabase.from('payments').select('*');
      setDoctors(doctors || []);
      setPatients(patients || []);
      setAppointments(appointments || []);
      setPayments(payments || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <DoctorList doctors={doctors} />
      <h3>Patients</h3>
      <ul>{patients.map(p => <li key={p.id}>{p.name} ({p.email})</li>)}</ul>
      <h3>Appointments</h3>
      <ul>{appointments.map(a => <li key={a.id}>{a.appointment_date} - {a.status}</li>)}</ul>
      <h3>Payments</h3>
      <ul>{payments.map(pay => <li key={pay.id}>{pay.amount} - {pay.status}</li>)}</ul>
      <AppointmentForm />
    </div>
  );
}
