import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Navbar.css";

const Navbar = ({ role }) => {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  /* ── Admin / hospital settings (reactive) ── */
  const readSettings = useCallback(() => {
    try {
      const g = JSON.parse(localStorage.getItem("hmsSettingsGeneral") || "{}");
      const p = JSON.parse(localStorage.getItem("hmsSettingsAdminProfile") || "{}");
      return { hospitalName: g.hospitalName || "Hippocare Hospital", adminName: p.name || "Admin", adminPhoto: p.photo || "" };
    } catch { return { hospitalName: "Hippocare Hospital", adminName: "Admin", adminPhoto: "" }; }
  }, []);
  const [settings, setSettings] = useState(readSettings);

  useEffect(() => {
    const refresh = () => setSettings(readSettings());
    window.addEventListener("adminSettingsUpdated", refresh);
    return () => window.removeEventListener("adminSettingsUpdated", refresh);
  }, [readSettings]);

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

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("hmsRole");
    localStorage.removeItem("hmsProfile");
    navigate("/");
  };

  const displayRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : "User";
  const isDoctor = role === "doctor" && doctorInfo;
  const displayPhoto = isDoctor ? (doctorInfo.photo_url || null) : null;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short", year: "numeric", month: "short", day: "numeric"
  });

  return (
    <header className="navbar">
      <div className="navbar__left">
        {isDoctor ? (
          <>
            <h2>Doctor Dashboard</h2>
            <span>Welcome, {doctorInfo.name} · {doctorInfo.specialization || "Specialist"}</span>
          </>
        ) : (
          <>
            <h2>{settings.hospitalName}</h2>
            <span>{displayRole} Portal</span>
          </>
        )}
      </div>

      <div className="navbar__right">
        {/* Today's date */}
        <span className="navbar__date">{today}</span>

        {/* Notification bell */}
        <button className="navbar__icon-btn" title="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
          <span className="navbar__notif-dot" />
        </button>

        {/* Profile image dropdown (doctor only) */}
        {isDoctor && (
          <div className="navbar__profile-wrap" ref={menuRef}>
            <button className="navbar__profile-btn" onClick={() => setShowProfileMenu((p) => !p)}>
              {displayPhoto ? (
                <img src={displayPhoto} alt={doctorInfo.name} className="navbar__profile-img" />
              ) : (
                <span className="navbar__profile-initial">{doctorInfo.name.charAt(0)}</span>
              )}
            </button>
            {showProfileMenu && (
              <div className="navbar__profile-menu">
                <div className="navbar__profile-menu-head">
                  {displayPhoto && <img src={displayPhoto} alt="" />}
                  <div>
                    <strong>{doctorInfo.name}</strong>
                    <span>{doctorInfo.id}</span>
                  </div>
                </div>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}

        {/* Start Consultation / Logout */}
        {isDoctor ? (
          <button className="navbar__cta" onClick={() => navigate("/doctor")}>Start Consultation</button>
        ) : (
          <button className="navbar__logout" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
