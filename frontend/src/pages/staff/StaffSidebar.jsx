import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./StaffSidebar.css";

const menuItems = [
  { label: "Dashboard",           icon: "📊", to: "/staff" },
  { label: "Duty Schedule",       icon: "📋", to: "/staff/duty-schedule" },
  { label: "Patient Registration",icon: "🏥", to: "/staff/patients" },
  { label: "Doctor Assignment",   icon: "🩺", to: "/staff/doctor-assignment" },
  { label: "Reports",             icon: "📈", to: "/staff/reports" },
  { label: "Messages",            icon: "💬", to: "/staff/messages" },
  { label: "Profile",             icon: "👤", to: "/staff/profile" },
];

const StaffSidebar = ({ staff }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(`hmsStaffPhoto_${staff.id}`);
    if (saved) setProfilePhoto(saved);
  }, [staff.id]);

  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const initials = staff.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePhoto(reader.result);
      localStorage.setItem(`hmsStaffPhoto_${staff.id}`, reader.result);
    };
    reader.readAsDataURL(file);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("hmsRole");
    localStorage.removeItem("hmsStaffId");
    navigate("/");
  };

  return (
    <aside className="staff-sb">
      {/* ── Brand ── */}
      <div className="staff-sb__brand">
        <span className="staff-sb__brand-icon">🏥</span>
        <h3 className="staff-sb__brand-name">Hippocare</h3>
      </div>

      {/* ── Staff Profile Card ── */}
      <div className="staff-sb__profile" ref={dropdownRef}>
        <div
          className="staff-sb__avatar"
          onClick={() => setProfileOpen((p) => !p)}
        >
          {profilePhoto ? (
            <img src={profilePhoto} alt={staff.name} />
          ) : (
            <span className="staff-sb__initials">{initials}</span>
          )}
          <span className="staff-sb__status" />
        </div>
        <div className="staff-sb__info">
          <h4 className="staff-sb__name">{staff.name}</h4>
          <p className="staff-sb__id">ID: {staff.id}</p>
          <p className="staff-sb__dept">{staff.department} · {staff.role}</p>
          <span className="staff-sb__online">● Online</span>
        </div>

        {/* Profile dropdown */}
        {profileOpen && (
          <div className="staff-sb__dropdown">
            <div className="staff-sb__dropdown-card">
              <div className="staff-sb__dropdown-img">
                {profilePhoto ? (
                  <img src={profilePhoto} alt={staff.name} />
                ) : (
                  <span className="staff-sb__dropdown-initials">{initials}</span>
                )}
              </div>
              <h4>{staff.name}</h4>
              <p>{staff.id} · {staff.department}</p>
              <button
                className="staff-sb__upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                📷 Change Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoUpload}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="staff-sb__menu">
        <span className="staff-sb__menu-label">MAIN MENU</span>
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/staff"}
            className={({ isActive }) =>
              isActive ? "staff-sb__link staff-sb__link--active" : "staff-sb__link"
            }
          >
            <span className="staff-sb__link-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="staff-sb__footer">
        <button className="staff-sb__logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default StaffSidebar;
