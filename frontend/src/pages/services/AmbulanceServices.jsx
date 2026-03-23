import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import DeptNav from "../../components/DeptNav";
import "./AmbulanceServices.css";

/* Ambulance slider images – save your images in public/images/ */
const sliderImages = [
  "/images/ambulance-1.jpg",
  "/images/ambulance-2.jpg",
  "/images/ambulance-3.jpg",
];

const ambulanceDrivers = [
  {
    name: "Rajendra Yadav",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    dl: "DL-1420110012345",
    experience: "14+",
    fresher: false,
    contact: "+91-99887-11001",
    bio: "Rajendra Yadav is Hippocare's most experienced ambulance driver with over 14 years of service. He has completed over 8,000 emergency trips and is known for his calm composure during high-pressure situations. He is trained in Basic Life Support (BLS) and handles the Advanced Life Support ambulance unit.",
    dob: "12 March 1982",
    bloodGroup: "B+",
    address: "Sector 15, Faridabad, Haryana",
    vehicleAssigned: "ALS Unit — DL-01-AB-1234 (Force Traveller)",
    shiftTiming: "6:00 AM – 2:00 PM (Day Shift)",
    previousEmployment: [
      { org: "Max Hospital, Saket", role: "Ambulance Driver", duration: "2007–2011" },
      { org: "Apollo Emergency Services", role: "Senior Driver", duration: "2011–2015" }
    ],
    training: ["Basic Life Support (BLS) Certified", "Advanced Driving Techniques — IDTR Delhi", "Emergency Vehicle Operations Course (EVOC)", "Fire Safety & First Aid Training"],
    awards: ["Best Emergency Driver — Hippocare 2020", "Zero Accident Record — 8 consecutive years", "Life Saver Commendation — 2019"],
    totalTrips: "8,000+",
    avgResponseTime: "11 min",
    languages: "Hindi, English",
    joinedYear: 2015
  },
  {
    name: "Sunil Kumar",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    dl: "UP-3220130067890",
    experience: "10+",
    fresher: false,
    contact: "+91-99887-11002",
    bio: "Sunil Kumar has been with Hippocare for over 8 years and specializes in inter-hospital patient transfers and neonatal transport. He is known for his thorough knowledge of city routes and traffic patterns, achieving one of the lowest average response times in the fleet.",
    dob: "25 August 1988",
    bloodGroup: "O+",
    address: "Loni, Ghaziabad, Uttar Pradesh",
    vehicleAssigned: "BLS Unit — UP-14-CD-5678 (Tata Winger)",
    shiftTiming: "2:00 PM – 10:00 PM (Evening Shift)",
    previousEmployment: [
      { org: "Fortis Hospital, Noida", role: "Ambulance Driver", duration: "2013–2016" },
      { org: "108 Emergency Services (GVK EMRI)", role: "Emergency Driver", duration: "2016–2017" }
    ],
    training: ["Basic Life Support (BLS) Certified", "Neonatal Transport Safety Course", "Defensive Driving Certificate — RTO UP", "Patient Handling & Stretcher Operations"],
    awards: ["Fastest Response Time Award — 2021", "Patient Comfort Excellence — 2022", "5,000 Trip Milestone Award"],
    totalTrips: "5,500+",
    avgResponseTime: "9 min",
    languages: "Hindi, English, Bhojpuri",
    joinedYear: 2017
  },
  {
    name: "Amit Chauhan",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    dl: "DL-0920220098765",
    experience: "1+",
    fresher: true,
    contact: "+91-99887-11003",
    bio: "Amit Chauhan is a fresh recruit who joined Hippocare's ambulance team after completing the Emergency Vehicle Operations Course with distinction. Despite being new, he has shown exceptional dedication, quick learning ability, and has already completed over 400 emergency trips under senior supervision.",
    dob: "08 January 2000",
    bloodGroup: "A+",
    address: "Rohini, New Delhi",
    vehicleAssigned: "BLS Unit — DL-01-EF-9012 (Maruti Eeco Ambulance)",
    shiftTiming: "10:00 PM – 6:00 AM (Night Shift)",
    previousEmployment: [
      { org: "Delhi Transport Corporation (Intern)", role: "Driver Trainee", duration: "2021–2022" }
    ],
    training: ["Emergency Vehicle Operations Course (EVOC)", "Basic Life Support (BLS) — In Progress", "Traffic Rules & Road Safety — IDTR Delhi", "GPS Navigation & Dispatch Systems"],
    awards: ["Best New Recruit — Hippocare 2024", "Perfect Attendance — 2023–2024"],
    totalTrips: "400+",
    avgResponseTime: "13 min",
    languages: "Hindi, English",
    joinedYear: 2023
  },
  {
    name: "Vikram Singh",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    dl: "HR-0620180045678",
    experience: "8+",
    fresher: false,
    contact: "+91-99887-11004",
    bio: "Vikram Singh is a seasoned ambulance professional specializing in highway emergency rescue and critical care transport. He has extensive experience navigating through heavy traffic and adverse weather conditions. He also serves as the backup operations coordinator for the ambulance dispatch team.",
    dob: "19 June 1990",
    bloodGroup: "AB+",
    address: "Sector 56, Gurugram, Haryana",
    vehicleAssigned: "ALS Unit — HR-26-GH-3456 (Force Traveller ICU)",
    shiftTiming: "Rotational (All Shifts)",
    previousEmployment: [
      { org: "Medanta Hospital, Gurugram", role: "Ambulance Driver", duration: "2016–2019" },
      { org: "CATS Ambulance Service, Delhi Govt.", role: "Emergency Driver", duration: "2019–2021" }
    ],
    training: ["Advanced Life Support (ALS) Driver Certification", "Highway Rescue Operations", "Hazardous Material Transport Awareness", "CPR & First Responder Certified"],
    awards: ["Highway Rescue Hero — Hippocare 2022", "Best Team Coordinator Award — 2023", "Disaster Management Volunteer — Haryana"],
    totalTrips: "4,200+",
    avgResponseTime: "10 min",
    languages: "Hindi, English, Haryanvi",
    joinedYear: 2021
  },
];


const AmbulanceServices = () => {
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [selectedDriver, setSelectedDriver] = useState(null);

  /* Auto-advance slider every 3.5 seconds */
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const toggle = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="ambu">
      {/* ── Nav bar ── */}
      <nav className="ambu__nav">
        <div className="ambu__nav-inner">
          <Link to="/" className="ambu__brand">
            <img src={hippocareLogo} alt="Hippocare" className="ambu__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="ambu__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Banner ── */}
      <header className="ambu__banner">
        <div className="ambu__banner-overlay" />
        <div className="ambu__banner-content">
          <h1>Ambulance Services</h1>
          <p className="ambu__breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            24×7 Services
            <span>/</span>
            Ambulance Services
          </p>
        </div>
      </header>

      <DeptNav />

      {/* ── Main Content ── */}
      <section className="ambu__main">
        {/* LEFT: Image slider + content */}
        <div className="ambu__left">
          <div className="ambu__slider">
            {sliderImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Ambulance slide ${idx + 1}`}
                className={`ambu__slide ${idx === slide ? "ambu__slide--active" : ""}`}
              />
            ))}
            {/* Branded overlay */}
            <div className="ambu__brand-overlay">
              <span className="ambu__brand-overlay-text">Hippocare Hospital</span>
            </div>
            {/* Dots indicator */}
            <div className="ambu__dots">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`ambu__dot ${idx === slide ? "ambu__dot--active" : ""}`}
                  onClick={() => setSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── Hippocare Ambulance Service (bordered box) ── */}
          <article className="ambu__content-box">
            <h2>Hippocare Ambulance Service</h2>

            {/* ── 24/7 Fleet ── */}
            <div className="ambu__section">
              <h3 className="ambu__section-title">🚑 24/7 Ambulance Fleet</h3>
              <p>
                Hippocare Hospital operates a dedicated fleet of modern, fully-equipped
                ambulances available 24 hours a day, 7 days a week, 365 days a year,
                providing rapid pre-hospital care across the city and surrounding regions.
              </p>
              <div className={`ambu__section-expand ${expanded.fleet ? "ambu__section-expand--open" : ""}`}>
                <p>
                  Our fleet includes Advanced Life Support (ALS) and Basic Life Support (BLS)
                  units strategically positioned across the city for minimum response time.
                  Each ambulance is GPS-enabled for real-time tracking and optimized routing.
                </p>
              </div>
              <button className="ambu__read-more" onClick={() => toggle("fleet")}>
                {expanded.fleet ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Equipment ── */}
            <div className="ambu__section">
              <h3 className="ambu__section-title">🏥 Advanced Medical Equipment</h3>
              <p>
                Each ambulance is classified as an Advanced Life Support unit, equipped
                with oxygen cylinders, cardiac monitors, defibrillators, emergency drug
                kits, suction apparatus, spine boards, and stretcher systems.
              </p>
              <div className={`ambu__section-expand ${expanded.equip ? "ambu__section-expand--open" : ""}`}>
                <p>
                  This ensures that critical care begins the moment our paramedic team
                  reaches the patient — long before they arrive at the hospital. Ventilators,
                  IV infusion sets, and emergency airway management kits are available in
                  every vehicle for handling the most severe cases during transit.
                </p>
              </div>
              <button className="ambu__read-more" onClick={() => toggle("equip")}>
                {expanded.equip ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Trained Staff ── */}
            <div className="ambu__section">
              <h3 className="ambu__section-title">👨‍⚕️ Trained Paramedic Team</h3>
              <p>
                Our ambulances are staffed by trained paramedics, emergency medical
                technicians (EMTs), and in critical cases, an on-board doctor certified
                in BLS and ACLS protocols.
              </p>
              <div className={`ambu__section-expand ${expanded.staff ? "ambu__section-expand--open" : ""}`}>
                <p>
                  The team is capable of handling cardiac arrests, trauma injuries,
                  respiratory emergencies, obstetric emergencies, and more during transit.
                  Regular training drills and skill upgradation programs ensure that our
                  staff is always prepared for any medical scenario.
                </p>
              </div>
              <button className="ambu__read-more" onClick={() => toggle("staff")}>
                {expanded.staff ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── GPS Dispatch ── */}
            <div className="ambu__section">
              <h3 className="ambu__section-title">📡 GPS-Enabled Dispatch System</h3>
              <p>
                Hippocare's centralized GPS-enabled dispatch system identifies and sends
                the nearest available ambulance to the patient's location, with an average
                city response time under 15 minutes.
              </p>
              <div className={`ambu__section-expand ${expanded.gps ? "ambu__section-expand--open" : ""}`}>
                <p>
                  We continuously improve response time through route optimization and
                  real-time traffic monitoring. The dispatch system integrates directly
                  with the hospital's Emergency Department for seamless patient handoff
                  and pre-arrival alerts.
                </p>
              </div>
              <button className="ambu__read-more" onClick={() => toggle("gps")}>
                {expanded.gps ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Service Types ── */}
            <div className="ambu__section">
              <h3 className="ambu__section-title">🔄 Multiple Service Types</h3>
              <p>
                We offer emergency pickup, inter-hospital patient transfer, neonatal
                transport with specialized incubators, and non-emergency medical transport
                for dialysis, chemotherapy, or scheduled treatments.
              </p>
              <div className={`ambu__section-expand ${expanded.types ? "ambu__section-expand--open" : ""}`}>
                <p>
                  Dedicated dead-body van service is also available with dignity and respect.
                  All transport services are available round the clock — simply call our
                  24/7 ambulance helpline for immediate assistance.
                </p>
              </div>
              <button className="ambu__read-more" onClick={() => toggle("types")}>
                {expanded.types ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>
          </article>

          {/* ── About This Department (bordered box) ── */}
          <article className="ambu__content-box">
            <h2>About This Department</h2>

            {/* ── Leadership ── */}
            <div className="ambu__section">
              <h3 className="ambu__section-title">🏛️ Department Leadership</h3>
              <p>
                The Ambulance Services Department at Hippocare Hospital functions as the
                critical first link in our emergency care chain, headed by an experienced
                Emergency Medicine specialist.
              </p>
              <div className={`ambu__section-expand ${expanded.lead ? "ambu__section-expand--open" : ""}`}>
                <p>
                  A dedicated operations team ensures seamless coordination between dispatch,
                  field paramedics, and the hospital's Emergency Department. Regular audits
                  and performance reviews maintain the highest standards of pre-hospital care.
                </p>
              </div>
              <button className="ambu__read-more" onClick={() => toggle("lead")}>
                {expanded.lead ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Fleet & Coverage ── */}
            <div className="ambu__section">
              <h3 className="ambu__section-title">🗺️ Fleet &amp; City Coverage</h3>
              <p>
                The department maintains a fleet of over 10 ambulances strategically
                stationed at key locations throughout the city for maximum coverage
                and minimum response time.
              </p>
              <div className={`ambu__section-expand ${expanded.coverage ? "ambu__section-expand--open" : ""}`}>
                <p>
                  Each vehicle undergoes daily maintenance checks and is fitted with
                  communication equipment for live coordination with hospital doctors
                  during patient transport. Backup vehicles are always on standby to
                  handle surge situations.
                </p>
              </div>
              <button className="ambu__read-more" onClick={() => toggle("coverage")}>
                {expanded.coverage ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Control Room ── */}
            <div className="ambu__section">
              <h3 className="ambu__section-title">📞 24/7 Control Room</h3>
              <p>
                Our ambulance control room operates around the clock with trained
                dispatchers who manage emergency calls, coordinate field teams, and
                pre-alert the Emergency Department about incoming patients.
              </p>
              <div className={`ambu__section-expand ${expanded.control ? "ambu__section-expand--open" : ""}`}>
                <p>
                  This pre-notification system allows the ER team to prepare resuscitation
                  bays, surgical teams, and diagnostic equipment before the patient arrives,
                  saving critical minutes that can mean the difference between life and death.
                </p>
              </div>
              <button className="ambu__read-more" onClick={() => toggle("control")}>
                {expanded.control ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Community Outreach ── */}
            <div className="ambu__section">
              <h3 className="ambu__section-title">🤝 Community Outreach</h3>
              <p>
                Hippocare provides free ambulance services for highway accident victims,
                tie-ups with traffic police for rapid response, and first-aid training
                workshops for the public.
              </p>
              <div className={`ambu__section-expand ${expanded.community ? "ambu__section-expand--open" : ""}`}>
                <p>
                  Our ambulance helpline is available round the clock. We also partner with
                  local authorities for disaster management and mass-casualty incident
                  preparedness, reinforcing our commitment to community health and safety.
                </p>
              </div>
              <button className="ambu__read-more" onClick={() => toggle("community")}>
                {expanded.community ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Patient Safety ── */}
            <div className="ambu__section">
              <h3 className="ambu__section-title">🛡️ Patient Comfort &amp; Safety</h3>
              <p>
                All ambulances feature climate control, shock-absorbent suspension, and
                hygienic interiors sanitized after every trip, with real-time tracking
                for families and hospital staff.
              </p>
              <div className={`ambu__section-expand ${expanded.safety ? "ambu__section-expand--open" : ""}`}>
                <p>
                  Family members can monitor the ambulance's location and estimated arrival
                  time via our tracking system. Infection control protocols are strictly
                  followed, and all equipment is sterilized between patients to ensure
                  complete safety during transit.
                </p>
              </div>
              <button className="ambu__read-more" onClick={() => toggle("safety")}>
                {expanded.safety ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>
          </article>

          {/* ── Ambulance Driver Details ── */}
          <section className="ambu__drivers">
            <h2 className="ambu__drivers-heading">🚑 Our Ambulance Crew</h2>
            <p className="ambu__drivers-sub">Trained and licensed drivers ensuring swift emergency transport</p>
            <div className="ambu__drivers-grid">
              {ambulanceDrivers.map((d, i) => (
                <div className="ambu__driver-card" key={i}>
                  <div className="ambu__driver-img-wrap">
                    <img src={d.photo} alt={d.name} className="ambu__driver-img" />
                    {d.fresher && <span className="ambu__driver-badge ambu__driver-badge--fresher">Fresher</span>}
                    {!d.fresher && <span className="ambu__driver-badge ambu__driver-badge--exp">{d.experience} Yrs</span>}
                  </div>
                  <div className="ambu__driver-body">
                    <h3 className="ambu__driver-name">{d.name}</h3>
                    <p className="ambu__driver-dl">🆔 DL: {d.dl}</p>
                    <p className="ambu__driver-exp">📅 Experience: {d.experience} Years</p>
                    <p className="ambu__driver-contact">📞 {d.contact}</p>
                    <button className="ambu__view-profile-btn" onClick={() => setSelectedDriver(d)}>View Full Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Driver Profile Modal ── */}
          {selectedDriver && (
            <div className="ambu__modal-overlay" onClick={() => setSelectedDriver(null)}>
              <div className="ambu__modal" onClick={(e) => e.stopPropagation()}>
                <button className="ambu__modal-close" onClick={() => setSelectedDriver(null)}>✕</button>
                <div className="ambu__modal-header">
                  <div className="ambu__modal-img-wrap">
                    <img src={selectedDriver.photo} alt={selectedDriver.name} className="ambu__modal-img" />
                    {selectedDriver.fresher && <span className="ambu__modal-badge ambu__modal-badge--fresher">Fresher</span>}
                    {!selectedDriver.fresher && <span className="ambu__modal-badge ambu__modal-badge--exp">{selectedDriver.experience} Yrs Exp.</span>}
                  </div>
                  <div className="ambu__modal-title">
                    <h2>{selectedDriver.name}</h2>
                    <p className="ambu__modal-role">Ambulance Driver — Hippocare Hospital</p>
                    <span className="ambu__modal-exp-badge">🚑 {selectedDriver.totalTrips} Emergency Trips</span>
                  </div>
                </div>
                <div className="ambu__modal-body">
                  <div className="ambu__modal-section">
                    <h4>📋 About</h4>
                    <p>{selectedDriver.bio}</p>
                  </div>

                  <div className="ambu__modal-section">
                    <h4>🆔 Driving License &amp; Identity</h4>
                    <div className="ambu__modal-info-grid">
                      <div className="ambu__modal-info-item"><span className="ambu__modal-info-label">DL Number</span><span>{selectedDriver.dl}</span></div>
                      <div className="ambu__modal-info-item"><span className="ambu__modal-info-label">Date of Birth</span><span>{selectedDriver.dob}</span></div>
                      <div className="ambu__modal-info-item"><span className="ambu__modal-info-label">Blood Group</span><span>{selectedDriver.bloodGroup}</span></div>
                      <div className="ambu__modal-info-item"><span className="ambu__modal-info-label">Address</span><span>{selectedDriver.address}</span></div>
                    </div>
                  </div>

                  <div className="ambu__modal-section">
                    <h4>🚑 Vehicle &amp; Duty Details</h4>
                    <div className="ambu__modal-info-grid">
                      <div className="ambu__modal-info-item"><span className="ambu__modal-info-label">Vehicle Assigned</span><span>{selectedDriver.vehicleAssigned}</span></div>
                      <div className="ambu__modal-info-item"><span className="ambu__modal-info-label">Shift Timing</span><span>{selectedDriver.shiftTiming}</span></div>
                      <div className="ambu__modal-info-item"><span className="ambu__modal-info-label">Total Trips</span><span>{selectedDriver.totalTrips}</span></div>
                      <div className="ambu__modal-info-item"><span className="ambu__modal-info-label">Avg. Response Time</span><span>{selectedDriver.avgResponseTime}</span></div>
                      <div className="ambu__modal-info-item"><span className="ambu__modal-info-label">Experience</span><span>{selectedDriver.experience} Years</span></div>
                      <div className="ambu__modal-info-item"><span className="ambu__modal-info-label">Joined Hippocare</span><span>{selectedDriver.joinedYear}</span></div>
                    </div>
                  </div>

                  <div className="ambu__modal-section">
                    <h4>🏢 Previous Employment</h4>
                    <div className="ambu__modal-employment">
                      {selectedDriver.previousEmployment.map((emp, idx) => (
                        <div key={idx} className="ambu__modal-emp-item">
                          <div className="ambu__modal-emp-dot" />
                          <div>
                            <strong>{emp.org}</strong>
                            <p>{emp.role} • {emp.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ambu__modal-section">
                    <h4>📜 Training &amp; Certifications</h4>
                    <div className="ambu__modal-tags">
                      {selectedDriver.training.map((t, idx) => (
                        <span key={idx} className="ambu__modal-tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="ambu__modal-section">
                    <h4>🏆 Awards &amp; Recognition</h4>
                    <ul className="ambu__modal-list">
                      {selectedDriver.awards.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="ambu__modal-contact-bar">
                    <div><span>📞</span> <strong>{selectedDriver.contact}</strong></div>
                    <div><span>🌐</span> {selectedDriver.languages}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AmbulanceServices;
