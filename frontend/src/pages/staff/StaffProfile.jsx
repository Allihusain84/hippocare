import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import "./StaffProfile.css";

const StaffProfile = () => {
  const { staff } = useOutletContext();
  const [doctorName, setDoctorName] = useState("—");
  const [doctorDept, setDoctorDept] = useState("—");

  useEffect(() => {
    if (staff.assigned_doctor_id) {
      supabase.from("doctors").select("name, department").eq("id", staff.assigned_doctor_id).single()
        .then(({ data }) => { if (data) { setDoctorName(data.name); setDoctorDept(data.department); } });
    }
  }, [staff]);

  const initials = staff.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="spf">
      <h2 className="spf__title">My Profile</h2>

      <div className="spf__layout">
        <div className="spf__left">
          <div className="spf__photo-card">
            <div className="spf__avatar-wrap">
              <div className="spf__avatar-init">{initials}</div>
            </div>
            <h3 className="spf__name">{staff.name}</h3>
            <span className="spf__dept-tag">{staff.department}</span>
            <span className="spf__role-tag">{staff.role}</span>
            <span className="spf__online">Online</span>
          </div>
        </div>

        <div className="spf__right">
          <div className="spf__section">
            <h4 className="spf__sec-title">Personal Information</h4>
            <div className="spf__grid">
              <Detail label="Full Name" value={staff.name} />
              <Detail label="Phone" value={staff.phone || "—"} />
              <Detail label="Email" value={staff.email || "—"} />
              <Detail label="Department" value={staff.department || "—"} />
              <Detail label="Role" value={staff.role || "—"} />
            </div>
          </div>

          <div className="spf__section">
            <h4 className="spf__sec-title">Duty & Assignment</h4>
            <div className="spf__grid">
              <Detail label="Assigned Doctor" value={doctorName} highlight />
              <Detail label="Doctor's Department" value={doctorDept} />
              <Detail label="Room Number" value={staff.room_number || "—"} />
              <Detail label="Duty Shift" value={staff.shift || "—"} />
              <Detail label="Shift Timing" value={staff.shift_time || "—"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value, highlight }) => (
  <div className="spf__detail">
    <span className="spf__detail-label">{label}</span>
    <span className={`spf__detail-value ${highlight ? "spf__detail-value--hl" : ""}`}>{value}</span>
  </div>
);

export default StaffProfile;
