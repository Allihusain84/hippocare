import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import "./StaffSidebar.css";

const menuItems = [
  { label: "Dashboard",            icon: "📊", to: "/staff" },
  { label: "Duty Schedule",        icon: "📋", to: "/staff/duty-schedule" },
  { label: "Patient Registration", icon: "🏥", to: "/staff/patients" },
  { label: "Doctor Assignment",    icon: "🩺", to: "/staff/doctor-assignment" },
  { label: "Reports",              icon: "📈", to: "/staff/reports" },
  { label: "Messages",             icon: "💬", to: "/staff/messages" },
  { label: "Profile",              icon: "👤", to: "/staff/profile" },
];

const StaffSidebar = ({ staff }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const initials = staff.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("hmsRole");
    localStorage.removeItem("hmsProfile");
    navigate("/");
  };

  return (
    <aside className="staff-sb">
      <div className="staff-sb__brand">
        <span className="staff-sb__brand-icon">🏥</span>
        <h3 className="staff-sb__brand-name">Hippocare</h3>
      </div>

      <div className="staff-sb__profile" ref={dropdownRef}>
        <div className="staff-sb__avatar" onClick={() => setProfileOpen((p) => !p)}>
          <span className="staff-sb__initials">{initials}</span>
          <span className="staff-sb__status" />
        </div>
        <div className="staff-sb__info">
          <h4 className="staff-sb__name">{staff.name}</h4>
          <p className="staff-sb__dept">{staff.department} · {staff.role}</p>
          <span className="staff-sb__online">Online</span>
        </div>

        {profileOpen && (
          <div className="staff-sb__dropdown">
            <div className="staff-sb__dropdown-card">
              <div className="staff-sb__dropdown-img">
                <span className="staff-sb__dropdown-initials">{initials}</span>
              </div>
              <h4>{staff.name}</h4>
              <p>{staff.department}</p>
            </div>
          </div>
        )}
      </div>

      <nav className="staff-sb__menu">
        <span className="staff-sb__menu-label">MAIN MENU</span>
        {menuItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/staff"}
            className={({ isActive }) => isActive ? "staff-sb__link staff-sb__link--active" : "staff-sb__link"}>
            <span className="staff-sb__link-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="staff-sb__footer">
        <button className="staff-sb__logout" onClick={handleLogout}>Logout</button>
      </div>
    </aside>
  );
};

export default StaffSidebar;
