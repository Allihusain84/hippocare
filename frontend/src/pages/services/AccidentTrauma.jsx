import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import hippocareLogo from "../../assets/hippocare-logo.png";
import { supabase } from "../../lib/supabaseClient";
import DeptNav from "../../components/DeptNav";
import "./AccidentTrauma.css";

/* Emergency / trauma slider images – save your images in public/images/ */
const sliderImages = [
  "/images/accident-trauma-1.jpg",
  "/images/accident-trauma-2.jpg",
  "/images/accident-trauma-3.jpg",
];

const AccidentTrauma = () => {
  const [expertDoctors, setExpertDoctors] = useState([]);
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [docPage, setDocPage] = useState(0);
  const navigate = useNavigate();
  const docsPerView = 2;
  const totalPages = Math.ceil(expertDoctors.length / docsPerView);
  const revealRef = useScrollReveal({ staggerDelay: 100 });

  /* Auto-advance slideshow every 3.5 seconds */
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => { supabase.from("doctors").select("*").eq("department", "Emergency Medicine").then(({ data }) => setExpertDoctors(data || [])); }, []);

  const toggle = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="atem" ref={revealRef}>
      {/* ── Nav bar ── */}
      <nav className="atem__nav">
        <div className="atem__nav-inner">
          <Link to="/" className="atem__brand">
            <img src={hippocareLogo} alt="Hippocare" className="atem__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="atem__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Banner ── */}
      <header className="atem__banner scroll-reveal">
        <div className="atem__banner-overlay" />
        <div className="atem__banner-content">
          <h1>Accident Trauma &amp; Emergency</h1>
          <p className="atem__breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            24×7 Services
            <span>/</span>
            Accident Trauma &amp; Emergency
          </p>
        </div>
      </header>

      <DeptNav />

      {/* ── Main Content ── */}
      <section className="atem__main">
        {/* LEFT: Image slideshow + content */}
        <div className="atem__left">
          <div className="atem__slider">
            {sliderImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Emergency slide ${idx + 1}`}
                className={`atem__slide ${idx === slide ? "atem__slide--active" : ""}`}
              />
            ))}
            {/* Branded overlay on the ambulance image */}
            <div className="atem__brand-overlay">
              <span className="atem__brand-overlay-text">Hippocare Hospital</span>
            </div>
            {/* Dots indicator */}
            <div className="atem__dots">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`atem__dot ${idx === slide ? "atem__dot--active" : ""}`}
                  onClick={() => setSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Accident Trauma & Emergency content below the slider */}
          <article className="atem__content scroll-reveal">
            <h2>Accident Trauma &amp; Emergency</h2>

            {/* ── 24/7 Emergency Care ── */}
            <div className="atem__section">
              <h3 className="atem__section-title">🏥 24/7 Emergency Care</h3>
              <p>
                The Accident Trauma &amp; Emergency Department at Hippocare Hospital is the
                cornerstone of our commitment to saving lives. Operating round the clock —
                24 hours a day, 7 days a week, 365 days a year — our emergency department
                is always prepared to handle any medical crisis.
              </p>
              <div className={`atem__section-expand ${expanded.emergency ? "atem__section-expand--open" : ""}`}>
                <p>
                  From minor injuries to life-threatening trauma cases, our team delivers
                  care with speed, precision, and compassion. We follow a systematic triage
                  protocol to prioritize patients based on the severity of their condition.
                  This ensures that the most critical cases — such as road traffic accidents,
                  cardiac arrests, stroke, severe burns, and poisoning — receive immediate
                  attention, while less urgent cases are managed efficiently without
                  unnecessary delays. Our triage nurses are specially trained to assess,
                  classify, and escalate cases within seconds.
                </p>
              </div>
              <button className="atem__read-more" onClick={() => toggle("emergency")}>
                {expanded.emergency ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Expert Medical Team ── */}
            <div className="atem__section">
              <h3 className="atem__section-title">👨‍⚕️ Expert Medical Team</h3>
              <p>
                Our emergency unit is staffed by a highly skilled team of trauma surgeons,
                emergency medicine physicians, critical-care specialists, anesthesiologists,
                and trained nursing professionals who work in coordinated shifts.
              </p>
              <div className={`atem__section-expand ${expanded.team ? "atem__section-expand--open" : ""}`}>
                <p>
                  Each member of our emergency team is certified in Advanced Trauma Life
                  Support (ATLS) and Basic Life Support (BLS), guaranteeing that patients
                  receive globally recognized standards of emergency treatment from the
                  very first moment. Uninterrupted, expert-level care is available at
                  every hour of the day and night.
                </p>
              </div>
              <button className="atem__read-more" onClick={() => toggle("team")}>
                {expanded.team ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── State-of-the-Art Trauma Bay ── */}
            <div className="atem__section">
              <h3 className="atem__section-title">🏗️ State-of-the-Art Trauma Bay</h3>
              <p>
                The department features a state-of-the-art trauma bay equipped with advanced
                resuscitation systems, cardiac monitors, ventilators, defibrillators, and
                portable ultrasound machines.
              </p>
              <div className={`atem__section-expand ${expanded.trauma ? "atem__section-expand--open" : ""}`}>
                <p>
                  These resources enable our doctors to perform rapid assessments, stabilize
                  critical patients, and initiate life-saving interventions within minutes
                  of arrival — because in emergency medicine, every second counts. The quick
                  admission process at Hippocare eliminates bureaucratic hurdles during
                  emergencies. Patients arriving in critical condition are treated first;
                  administrative formalities are handled simultaneously by our dedicated
                  admission coordinators.
                </p>
              </div>
              <button className="atem__read-more" onClick={() => toggle("trauma")}>
                {expanded.trauma ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── ICU & Critical Care ── */}
            <div className="atem__section">
              <h3 className="atem__section-title">🫀 ICU &amp; Critical Care</h3>
              <p>
                Our Intensive Care Unit (ICU) is directly connected to the emergency
                department, allowing seamless transfer of critically ill patients who
                require continuous monitoring and advanced organ-support therapy.
              </p>
              <div className={`atem__section-expand ${expanded.icu ? "atem__section-expand--open" : ""}`}>
                <p>
                  The ICU is equipped with multi-parameter monitors, infusion pumps,
                  mechanical ventilators, and centralized nursing stations for round-the-clock
                  observation. Dedicated ICU consultants are available at all times to manage
                  complex cases including polytrauma, head injuries, and multi-organ failure.
                </p>
              </div>
              <button className="atem__read-more" onClick={() => toggle("icu")}>
                {expanded.icu ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Ambulance Network ── */}
            <div className="atem__section">
              <h3 className="atem__section-title">🚑 Ambulance Network</h3>
              <p>
                Hippocare maintains a well-coordinated ambulance network that covers the
                city and surrounding regions. Our Advanced Life Support (ALS) ambulances
                are fitted with oxygen supply, cardiac monitors, and emergency drug kits.
              </p>
              <div className={`atem__section-expand ${expanded.ambulance ? "atem__section-expand--open" : ""}`}>
                <p>
                  Stretcher systems ensure that pre-hospital care begins the moment our
                  paramedics reach the patient. GPS-enabled dispatch allows our control room
                  to send the nearest available ambulance, minimizing response time and
                  maximizing the chance of survival. This patient-first approach ensures that
                  no time is lost in initiating treatment, whether it involves emergency
                  surgery, blood transfusion, or critical medication administration.
                </p>
              </div>
              <button className="atem__read-more" onClick={() => toggle("ambulance")}>
                {expanded.ambulance ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Rapid Diagnosis ── */}
            <div className="atem__section">
              <h3 className="atem__section-title">🔬 Rapid Diagnosis</h3>
              <p>
                Rapid and accurate diagnosis is fundamental to effective emergency care.
                Our department has direct, 24/7 access to in-house diagnostic facilities
                including digital X-ray, CT scan, ultrasound, and a clinical laboratory.
              </p>
              <div className={`atem__section-expand ${expanded.diagnosis ? "atem__section-expand--open" : ""}`}>
                <p>
                  Urgent blood work, imaging, and cross-matching are processed on a priority
                  basis so that doctors can make informed treatment decisions without delay.
                  This integrated approach ensures that from the moment of arrival, every
                  diagnostic resource is immediately available to support rapid clinical
                  decision-making.
                </p>
              </div>
              <button className="atem__read-more" onClick={() => toggle("diagnosis")}>
                {expanded.diagnosis ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Patient Safety & HMS ── */}
            <div className="atem__section">
              <h3 className="atem__section-title">🛡️ Patient Safety &amp; HMS</h3>
              <p>
                Patient safety is embedded in every process of our emergency department.
                From infection-control protocols and sterile procedure rooms to real-time
                electronic health records integrated with our Hospital Management System.
              </p>
              <div className={`atem__section-expand ${expanded.safety ? "atem__section-expand--open" : ""}`}>
                <p>
                  Every step is designed to minimize risk and maximize care quality. Our HMS
                  platform enables instant access to patient histories, allergy records, and
                  previous prescriptions — empowering doctors with the information they need
                  to treat safely and effectively. This digital-first approach eliminates
                  manual errors and ensures continuity of care across departments.
                </p>
              </div>
              <button className="atem__read-more" onClick={() => toggle("safety")}>
                {expanded.safety ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Family Support & Communication ── */}
            <div className="atem__section">
              <h3 className="atem__section-title">💬 Family Support &amp; Communication</h3>
              <p>
                At Hippocare, we understand that emergencies affect not just the patient but
                the entire family. Our emergency department includes a dedicated waiting
                area with regular updates provided to attendants.
              </p>
              <div className={`atem__section-expand ${expanded.family ? "atem__section-expand--open" : ""}`}>
                <p>
                  A counselor is available on call for emotional support, and transparent
                  communication is maintained throughout the treatment process. We believe
                  that empathy and professionalism go hand in hand in delivering world-class
                  emergency care. Families are kept informed at every stage, ensuring peace
                  of mind during critical moments.
                </p>
              </div>
              <button className="atem__read-more" onClick={() => toggle("family")}>
                {expanded.family ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>
          </article>

          {/* ── Expert Doctors Carousel ── */}
          <section className="atem__experts">
            <div className="atem__experts-header">
              <h2>Expert Doctors</h2>
              <p className="atem__experts-sub">Our Top Accident &amp; Trauma Specialists at Hippocare Hospital</p>
              <div className="atem__experts-arrows">
                <button className="atem__experts-arrow" onClick={() => setDocPage((p) => Math.max(p - 1, 0))} disabled={docPage === 0} aria-label="Previous">‹</button>
                <button className="atem__experts-arrow" onClick={() => setDocPage((p) => Math.min(p + 1, totalPages - 1))} disabled={docPage === totalPages - 1} aria-label="Next">›</button>
              </div>
            </div>
            <div className="atem__experts-track" style={{ transform: `translateX(-${docPage * 100}%)` }}>
              {expertDoctors.map((doc) => (
                <div className="atem__expert-card" key={doc.id}>
                  <div className="atem__expert-img-wrap">
                    <img src={doc.photo_url || ""} alt={doc.name} className="atem__expert-img" />
                    <span className="atem__expert-exp">{doc.experience || "—"}</span>
                  </div>
                  <div className="atem__expert-body">
                    <span className="atem__expert-partner">🏥 Hippocare Partner</span>
                    <h3 className="atem__expert-name" onClick={() => navigate(`/doctor/${doc.id}`)} style={{ cursor: "pointer" }}>{doc.name}</h3>
                    <p className="atem__expert-spec">{doc.specialization}</p>
                    <div className="atem__expert-stats"><span>👍 {doc.recommended} Recommended</span></div>
                    <div className="atem__expert-fee">Consultation Fee: <strong>{doc.consultation_fee ? `₹${doc.consultation_fee}` : "—"}</strong></div>
                    <div className="atem__expert-actions">
                      <button className="atem__expert-cta" onClick={() => { const role = localStorage.getItem("hmsRole"); if (role === "patient") { navigate(`/patient/book?doctor=${doc.id}`); } else { navigate(`/login?redirect=/patient/book&doctor=${doc.id}`); } }}>📅 Book Appointment</button>
                      <button className="atem__expert-profile" onClick={() => navigate(`/doctor/${doc.id}`)}>View Profile</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default AccidentTrauma;
