import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import "./StaffProfile.css";

const StaffProfile = () => {
  const { staff } = useOutletContext();
  const fileRef = useRef(null);

  const photoKey = `hmsStaffPhoto_${staff.id}`;
  const [photo, setPhoto] = useState(() => localStorage.getItem(photoKey) || "");

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target.result;
      localStorage.setItem(photoKey, data);
      setPhoto(data);
    };
    reader.readAsDataURL(file);
  };

  const initials = staff.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="spf">
      <h2 className="spf__title">👤 My Profile</h2>

      <div className="spf__layout">
        {/* Left – Photo + quick info */}
        <div className="spf__left">
          <div className="spf__photo-card">
            <div className="spf__avatar-wrap" onClick={() => fileRef.current?.click()}>
              {photo ? (
                <img src={photo} alt={staff.name} className="spf__avatar-img" />
              ) : (
                <div className="spf__avatar-init">{initials}</div>
              )}
              <div className="spf__avatar-overlay">📷 Change</div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhoto}
            />
            <h3 className="spf__name">{staff.name}</h3>
            <span className="spf__id">{staff.id}</span>
            <span className="spf__dept-tag">{staff.department}</span>
            <span className="spf__role-tag">{staff.role}</span>
            <span className="spf__online">● Online</span>
          </div>
        </div>

        {/* Right – Details */}
        <div className="spf__right">
          {/* Personal Info */}
          <div className="spf__section">
            <h4 className="spf__sec-title">Personal Information</h4>
            <div className="spf__grid">
              <Detail label="Full Name" value={staff.name} />
              <Detail label="Staff ID" value={staff.id} />
              <Detail label="Phone" value={staff.phone} />
              <Detail label="Email" value={staff.email} />
              <Detail label="Date of Joining" value={staff.joinDate} />
              <Detail label="Department" value={staff.department} />
              <Detail label="Role" value={staff.role} />
            </div>
          </div>

          {/* Duty Info */}
          <div className="spf__section">
            <h4 className="spf__sec-title">Duty & Assignment</h4>
            <div className="spf__grid">
              <Detail label="Assigned Doctor" value={staff.assignedDoctor} highlight />
              <Detail label="Doctor's Department" value={staff.assignedDoctorDept} />
              <Detail label="Room Number" value={staff.roomNumber} />
              <Detail label="Duty Shift" value={staff.dutyShift} />
              <Detail label="Shift Timing" value={staff.shiftTime} />
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
