// src/components/DoctorList.jsx
import React from 'react';

export default function DoctorList({ doctors }) {
  return (
    <div>
      <h3>Doctors</h3>
      <ul>
        {doctors.map(doc => (
          <li key={doc.id}>{doc.name} ({doc.specialization})</li>
        ))}
      </ul>
    </div>
  );
}
