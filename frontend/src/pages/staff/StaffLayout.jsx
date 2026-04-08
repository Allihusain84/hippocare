import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import StaffSidebar from "./StaffSidebar";
import "./StaffLayout.css";

const StaffLayout = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }

      const { data: staffRow } = await supabase.from("staff").select("*").eq("id", user.id).single();
      if (!staffRow) { navigate("/login"); return; }

      if (staffRow.assigned_doctor_id) {
        const { data: doc } = await supabase.from("doctors").select("name, department").eq("id", staffRow.assigned_doctor_id).single();
        if (doc) {
          setDoctorName(doc.name);
          staffRow._assignedDoctorName = doc.name;
          staffRow._assignedDoctorDept = doc.department;
        }
      }

      setStaff(staffRow);
    };
    load();
  }, [navigate]);

  if (!staff) return null;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short", year: "numeric", month: "short", day: "numeric",
  });

  return (
    <div className="staff-layout">
      <StaffSidebar staff={staff} />
      <div className="staff-layout__main">
        <header className="staff-nav">
          <div className="staff-nav__left">
            <h2>Staff Dashboard</h2>
            <span>Welcome, {staff.name} · {staff.role}</span>
          </div>
          <div className="staff-nav__right">
            <span className="staff-nav__date">{today}</span>
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
