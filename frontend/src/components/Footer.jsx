import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaPlusCircle,
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import "./Footer.css";

/* Read hospital general settings from localStorage */
const loadGeneral = () => {
  try {
    return JSON.parse(localStorage.getItem("hmsSettingsGeneral") || "{}");
  } catch { return {}; }
};

const Footer = ({ onContactOpen }) => {
  const [gen, setGen] = useState(loadGeneral);

  useEffect(() => {
    const refresh = () => setGen(loadGeneral());
    window.addEventListener("adminSettingsUpdated", refresh);
    return () => window.removeEventListener("adminSettingsUpdated", refresh);
  }, []);

  const hospitalName = gen.hospitalName || "Hippocare Hospital";
  const address = gen.address || "Hathipur, Maharajpur, Kanpur Nagar (U.P.) 209402";
  const phone = gen.phone || "+91-73-111-26100";

  return (
    <footer className="gf">
      {/* ── Emergency Top Strip ── */}
      <div className="gf__emergency">
        <div className="gf__emergency-inner">
          <div className="gf__emergency-left">
            <FaPhoneAlt className="gf__emergency-icon" />
            <div>
              <span className="gf__emergency-label">
                Immediate help: Dial our emergency number
              </span>
              <span className="gf__emergency-number">
                Call: {phone}
              </span>
            </div>
          </div>
          <span data-tooltip="Get in touch with us">
          <button type="button" className="gf__emergency-btn" onClick={onContactOpen}>
            <FaPlusCircle /> CONTACT US
          </button>
          </span>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="gf__main">
        <div className="gf__main-inner">
          {/* Column 1 – Hospital Info */}
          <div className="gf__col gf__col--info">
            <h3 className="gf__logo-text">
              <span className="gf__logo-accent">{hospitalName.split(" ")[0]}</span> {hospitalName.split(" ").slice(1).join(" ")}
            </h3>
            <p className="gf__address">
              <FaMapMarkerAlt className="gf__address-icon" />
              {address}
            </p>
            <ul className="gf__phones">
              <li>
                <FaPhoneAlt /> {phone}
              </li>
            </ul>
            <div className="gf__socials">
              <a href="https://www.facebook.com/profile.php?id=61578893700083" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="gf__social-link">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Pinterest" className="gf__social-link">
                <FaPinterestP />
              </a>
              <a href="https://x.com/alli_husain184" target="_blank" rel="noopener noreferrer" aria-label="X" className="gf__social-link">
                <SiX />
              </a>
              <a href="https://www.instagram.com/maliq_bhai_184?igsh=N3RpaTgwbTQ5b3N1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="gf__social-link">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 2 – Services */}
          <div className="gf__col">
            <h4 className="gf__col-title">Services (24×7)</h4>
            <ul className="gf__links">
              <li><Link to="/accident-trauma-emergency">Accident Trauma &amp; Emergency</Link></li>
              <li><Link to="/services/ambulance-services">Ambulance Services</Link></li>
              <li><Link to="/pharmacy">Pharmacy</Link></li>
              <li><Link to="/services/radiology">Radiology</Link></li>
              <li><Link to="/services/clinical-laboratory">Clinical Laboratory</Link></li>
              <li><Link to="/services/insurance-empanelment">Insurance Empanelment</Link></li>
            </ul>
          </div>

          {/* Column 3 – Specialities */}
          <div className="gf__col">
            <h4 className="gf__col-title">Specialities</h4>
            <ul className="gf__links">
              <li><Link to="/speciality/physiotherapy">Physiotherapy</Link></li>
              <li><Link to="/speciality/department-of-dentistry">Department of Dentistry</Link></li>
              <li><Link to="/speciality/diabetes-endocrinology">Diabetes &amp; Endocrinology</Link></li>
              <li><Link to="/speciality/obstetrics-gynaecology">Obstetrics &amp; Gynaecology</Link></li>
              <li><Link to="/speciality/nephrology-dialysis">Nephrology and Dialysis</Link></li>
              <li><Link to="/speciality/anaesthesiology">Anaesthesiology</Link></li>
              <li><Link to="/speciality/urology">Urology</Link></li>
            </ul>
          </div>

          {/* Column 4 – Quick Links */}
          <div className="gf__col">
            <h4 className="gf__col-title">Quick Links</h4>
            <ul className="gf__links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/vision-mission">Vision Mission &amp; Values</Link></li>
              <li><Link to="/services">Specialities</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/photo-gallery">Photo Gallery</Link></li>
              <li><Link to="/video-gallery">Video Gallery</Link></li>
              <li><Link to="/career">Career</Link></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onContactOpen(); }}>Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="gf__bottom">
        <p>&copy; 2026 {hospitalName}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
