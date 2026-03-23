import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import staffData from "../../data/staffData";
import StaffSidebar from "./StaffSidebar";
import "./StaffLayout.css";

const StaffLayout = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("hmsRole");
    const sid = localStorage.getItem("hmsStaffId");
    if (role !== "staff" || !sid || !staffData[sid]) {
      navigate("/staff-login");
      return;
    }
    setStaff(staffData[sid]);
  }, [navigate]);

  if (!staff) return null;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="staff-layout">
      <StaffSidebar staff={staff} />
      <div className="staff-layout__main">
        {/* ── Top Navbar ── */}
        <header className="staff-nav">
          <div className="staff-nav__left">
            <h2>Staff Dashboard</h2>
            <span>Welcome, {staff.name} · {staff.role}</span>
          </div>
          <div className="staff-nav__right">
            <span className="staff-nav__date">{today}</span>
            <button className="staff-nav__icon-btn" title="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              <span className="staff-nav__notif-dot" />
            </button>
            <div className="staff-nav__avatar">
              {staff.name.split(" ").map((w) => w[0]).join("")}
            </div>
          </div>
        </header>
        <div className="staff-layout__content">
          <Outlet context={{ staff }} />
        </div>
      </div>
    </div>
  );
};

export default StaffLayout;
