import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Sidebar.css";

const menuConfig = {
  admin: [
    { label: "Dashboard", icon: "📊", to: "/admin" },
    { label: "Doctors", icon: "🩺", to: "/admin/doctors" },
    { label: "Staff", icon: "👤", to: "/admin/staff" },
    { label: "Patients", icon: "👥", to: "/admin/patients" },
    { label: "Appointments", icon: "📅", to: "/admin/appointments" },
    { label: "Settings", icon: "⚙️", to: "/admin/settings" }
  ],
  doctor: [
    { label: "Dashboard", icon: "📊", to: "/doctor" },
    { label: "Appointments", icon: "📅", to: "/doctor/appointments" },
    { label: "Prescriptions", icon: "💊", to: "/doctor/prescriptions" },
    { label: "Settings", icon: "⚙️", to: "/doctor/settings" },
  ],
  patient: [
    { label: "Dashboard", icon: "📊", to: "/patient" },
    { label: "Book Appointment", icon: "📅", to: "/patient/book" },
    { label: "My Appointments", icon: "🗓️", to: "/patient/appointments" },
    { label: "Bills", icon: "💳", to: "/patient/bills" }
  ]
};


const Sidebar = ({ role }) => {
  const menuItems = menuConfig[role] || [];
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const adminDropdownRef = useRef(null);
    // Close admin profile dropdown on outside click
    useEffect(() => {
      if (role !== "admin") return;
      if (!profileOpen) return;
      const handleClick = (e) => {
        if (adminDropdownRef.current && !adminDropdownRef.current.contains(e.target)) {
          setProfileOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [profileOpen, role]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  /* ── Admin profile (reactive) ── */
  const loadAdminProfile = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem("hmsSettingsAdminProfile") || "{}");
    } catch { return {}; }
  }, []);
  const [adminProfile, setAdminProfile] = useState(loadAdminProfile);

  useEffect(() => {
    const refresh = () => setAdminProfile(loadAdminProfile());
    window.addEventListener("adminSettingsUpdated", refresh);
    return () => window.removeEventListener("adminSettingsUpdated", refresh);
  }, [loadAdminProfile]);

  const loadDoctorInfo = useCallback(async () => {
    if (role === "doctor") {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("doctors").select("id, name, specialization, photo_url").eq("id", user.id).maybeSingle();
        if (data) setDoctorInfo(data);
        else {
          const { data: prof } = await supabase.from("profiles").select("id, name").eq("id", user.id).single();
          if (prof) setDoctorInfo(prof);
        }
      }
    }
  }, [role]);

  useEffect(() => {
    loadDoctorInfo();
    const onUpdate = () => loadDoctorInfo();
    window.addEventListener("doctorSettingsUpdated", onUpdate);
    return () => window.removeEventListener("doctorSettingsUpdated", onUpdate);
  }, [loadDoctorInfo]);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "DR";
    return name
      .replace(/^Dr\.\s*/i, "")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayPhoto = profilePhoto || (doctorInfo?.photo_url || null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePhoto(reader.result);
    };
    reader.readAsDataURL(file);
    setProfileOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("hmsRole");
    localStorage.removeItem("hmsProfile");
    navigate("/");
  };

  const isDoctor = role === "doctor" && doctorInfo;

  return (
    <aside className="sidebar">
      {/* ── Brand header ── */}
      <div className="sidebar__brand">
        <span className="sidebar__brand-icon">🏥</span>
        <h3 className="sidebar__brand-name">Hippocare</h3>
      </div>

      {/* ── Doctor profile card (only for doctors) ── */}
      {isDoctor && (
        <div className="sidebar__doc-card" ref={dropdownRef}>
          <div
            className="sidebar__doc-avatar"
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            {displayPhoto ? (
              <img src={displayPhoto} alt={doctorInfo.name} />
            ) : (
              <span className="sidebar__doc-initials">
                {getInitials(doctorInfo.name)}
              </span>
            )}
            <span className="sidebar__doc-status" />
          </div>
          <div className="sidebar__doc-info">
            <h4 className="sidebar__doc-name">{doctorInfo.name}</h4>
            <p className="sidebar__doc-id">ID: {doctorInfo.id}</p>
            <p className="sidebar__doc-spec">
              {doctorInfo.specialization || "Specialist"}
            </p>
            <span className="sidebar__doc-online">● Online</span>
          </div>

          {/* Profile dropdown */}
          {profileOpen && (
            <div className="sidebar__profile-dropdown">
              <div className="sidebar__profile-card">
                <div className="sidebar__profile-img">
                  {displayPhoto ? (
                    <img src={displayPhoto} alt={doctorInfo.name} />
                  ) : (
                    <span className="sidebar__profile-initials">
                      {getInitials(doctorInfo.name)}
                    </span>
                  )}
                </div>
                <h4 className="sidebar__profile-name">{doctorInfo.name}</h4>
                <p className="sidebar__profile-id">ID: {doctorInfo.id}</p>
                <button
                  className="sidebar__profile-upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Edit Profile Photo
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
      )}

      {/* ── Admin profile card (only for admin) ── */}
      {role === "admin" && (
        <div className="sidebar__admin-card" style={{ position: 'relative' }} ref={adminDropdownRef}>
          <div
            className="sidebar__admin-avatar"
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            {adminProfile.photo ? (
              <img src={adminProfile.photo} alt="admin" />
            ) : (
              <span className="sidebar__admin-initials">
                {(adminProfile.name || "Admin").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)}
              </span>
            )}
          </div>
          {/* Dropdown with profile image and edit button */}
          {profileOpen && (
            <div
              className="sidebar__admin-profile-dropdown"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: '#0a2342', // dark blue
                boxShadow: '0 2px 12px rgba(0,0,0,0.13)',
                borderRadius: 8,
                padding: 20,
                zIndex: 10,
                minWidth: 180,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 8
              }}
            >
              <div style={{ marginBottom: 18 }}>
                {adminProfile.photo ? (
                  <img src={adminProfile.photo} alt="admin" style={{ width: 130, height: 130, borderRadius: '50%', objectFit: 'cover', border: '3px solid #eee', boxShadow: '0 2px 12px rgba(0,0,0,0.13)' }} />
                ) : (
                  <span style={{
                    width: 130,
                    height: 130,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: '#f2f2f2',
                    fontSize: 48,
                    color: '#888',
                    border: '3px solid #eee',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.13)'
                  }}>
                    {(adminProfile.name || "Admin").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)}
                  </span>
                )}
              </div>
              <button
                className="sidebar__admin-edit-photo-btn"
                style={{
                  background: '#174ea6', // deeper blue
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '7px 18px',
                  cursor: 'pointer',
                  fontSize: '1em',
                  marginBottom: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontWeight: 500
                }}
                title="Profile Change"
                onClick={e => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <span style={{ fontSize: '1.2em', display: 'flex', alignItems: 'center' }}>🖼️</span>
                <span>Profile Change</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={e => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    const dataUrl = reader.result;
                    const updated = { ...adminProfile, photo: dataUrl };
                    setAdminProfile(updated);
                    localStorage.setItem("hmsSettingsAdminProfile", JSON.stringify(updated));
                    window.dispatchEvent(new Event("adminSettingsUpdated"));
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </div>
          )}
          <div className="sidebar__admin-info">
            <h4 className="sidebar__admin-name">
              {adminProfile.name || "Admin"}
            </h4>
            <p className="sidebar__admin-role">System Administrator</p>
          </div>
        </div>
      )}

      {/* ── Non-doctor / non-admin brand subtitle ── */}
      {!isDoctor && role !== "admin" && (
        <p className="sidebar__subtitle">Hospital Suite</p>
      )}

      {/* ── Navigation menu ── */}
      <nav className="sidebar__menu">
        <span className="sidebar__menu-label">MAIN MENU</span>
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
            }
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer / Logout ── */}
      <div className="sidebar__footer">
        {(isDoctor || role === "admin") ? (
          <button className="sidebar__logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        ) : (
          <>
            <p>24/7 Support</p>
            <span>+91 1800 222 911</span>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
