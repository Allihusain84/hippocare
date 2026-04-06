import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import "./StaffDoctorAssignment.css";

const StaffDoctorAssignment = () => {
  const { staff } = useOutletContext();
  const [allStaff, setAllStaff] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [sRes, dRes] = await Promise.all([
        supabase.from("staff").select("*").order("name"),
        supabase.from("doctors").select("id, name, department"),
      ]);
      setAllStaff(sRes.data || []);
      setDoctors(dRes.data || []);
    };
    load();
  }, []);

  const getDoc = (id) => doctors.find((d) => d.id === id);
  const myDoc = getDoc(staff.assigned_doctor_id);

  const byDept = {};
  allStaff.forEach((s) => {
    const doc = getDoc(s.assigned_doctor_id);
    const dept = doc?.department || s.department || "Unassigned";
    if (!byDept[dept]) byDept[dept] = [];
    byDept[dept].push({ ...s, _docName: doc?.name || "—" });
  });

  return (
    <div className="sda">
      <h2 className="sda__title">Doctor - Staff Assignment</h2>
      <p className="sda__sub">Overview of staff assigned to each doctor across departments</p>

      <div className="sda__my">
        <span className="sda__my-label">Your Assignment</span>
        <div className="sda__my-row">
          <div className="sda__my-item"><span className="sda__my-key">Doctor</span><span className="sda__my-val">{myDoc?.name || "—"}</span></div>
          <div className="sda__my-item"><span className="sda__my-key">Department</span><span className="sda__my-val">{myDoc?.department || staff.department || "—"}</span></div>
          <div className="sda__my-item"><span className="sda__my-key">Room</span><span className="sda__my-val">{staff.room_number || "—"}</span></div>
          <div className="sda__my-item"><span className="sda__my-key">Shift</span><span className="sda__my-val">{staff.shift || "—"} ({staff.shift_time || "—"})</span></div>
        </div>
      </div>

      <div className="sda__grid">
        {Object.entries(byDept).map(([dept, members]) => (
          <div className="sda__card" key={dept}>
            <div className="sda__card-head">
              <h3>{dept}</h3>
              <span className="sda__badge">{members.length} staff</span>
            </div>
            {members.map((m) => {
              const isYou = m.id === staff.id;
              return (
                <div className={`sda__row ${isYou ? "sda__row--you" : ""}`} key={m.id}>
                  <div className="sda__avatar">{m.name.charAt(0)}</div>
                  <div className="sda__info">
                    <span className="sda__info-name">{m.name} {isYou && <span className="sda__you-tag">You</span>}</span>
                    <span className="sda__info-meta">{m.role}</span>
                  </div>
                  <div className="sda__right">
                    <span className="sda__doc-name">{m._docName}</span>
                    <span className="sda__room-pill">{m.room_number || "—"}</span>
                    <span className={`sda__shift sda__shift--${(m.shift || "morning").split(" ")[0].toLowerCase()}`}>{m.shift || "—"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDoctorAssignment;
