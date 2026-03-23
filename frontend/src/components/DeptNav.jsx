import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./DeptNav.css";

/* ── All departments + specialities for horizontal nav strip ── */
const departments = [
  { name: "Cardiology", link: "/services/cardiology" },
  { name: "General Medicine", link: "/services/general-medicine" },
  { name: "Orthopedics", link: "/services/orthopedics" },
  { name: "Pediatrics", link: "/services/pediatrics" },
  { name: "Gynecology", link: "/services/gynecology" },
  { name: "Neurology", link: "/services/neurology" },
  { name: "Emergency", link: "/services/emergency-services" },
  { name: "Laboratory", link: "/services/laboratory-services" },
  { name: "Radiology", link: "/services/radiology" },
  { name: "Clinical Lab", link: "/services/clinical-laboratory" },
  { name: "Pharmacy", link: "/pharmacy" },
  { name: "Ambulance", link: "/services/ambulance-services" },
  { name: "Trauma & ER", link: "/accident-trauma-emergency" },
  { name: "Insurance", link: "/services/insurance-empanelment" },
  { name: "Physiotherapy", link: "/speciality/physiotherapy" },
  { name: "Dentistry", link: "/speciality/department-of-dentistry" },
  { name: "Diabetes", link: "/speciality/diabetes-endocrinology" },
  { name: "OB-GYN", link: "/speciality/obstetrics-gynaecology" },
  { name: "Nephrology", link: "/speciality/nephrology-dialysis" },
  { name: "Anaesthesiology", link: "/speciality/anaesthesiology" },
  { name: "Urology", link: "/speciality/urology" },
];

const DeptNav = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* close on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className="deptnav">
      <div className="deptnav__inner">
        {/* ── Hamburger button ── */}
        <div className="deptnav__menu-wrap" ref={panelRef}>
          <button
            className={`deptnav__hamburger ${open ? "deptnav__hamburger--open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="All departments"
            title="All departments"
          >
            <span /><span /><span />
          </button>

          {/* ── Dropdown grid panel ── */}
          {open && (
            <div className="deptnav__dropdown">
              <p className="deptnav__dropdown-title">All Departments</p>
              <div className="deptnav__dropdown-grid">
                {departments.map((d) => {
                  const isActive = pathname === d.link || pathname.startsWith(d.link + "/");
                  return (
                    <Link
                      key={d.link}
                      to={d.link}
                      className={`deptnav__dropdown-item ${isActive ? "deptnav__dropdown-item--active" : ""}`}
                    >
                      {d.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <span className="deptnav__label">Departments</span>
        <div className="deptnav__scroll">
          {departments.map((d) => {
            const isActive = pathname === d.link || pathname.startsWith(d.link + "/");
            return (
              <Link
                key={d.link}
                to={d.link}
                className={`deptnav__link ${isActive ? "deptnav__link--active" : ""}`}
              >
                {d.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default DeptNav;
