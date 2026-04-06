import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import { supabase } from "../../lib/supabaseClient";
import DeptNav from "../../components/DeptNav";
import "./Radiology.css";

/* Radiology slider images – save your images in public/images/ */
const sliderImages = [
  "/images/radiology-1.jpg",
  "/images/radiology-2.jpg",
  "/images/radiology-3.jpg",
];

const Radiology = () => {
  const [expertDoctors, setExpertDoctors] = useState([]);
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [docPage, setDocPage] = useState(0);
  const navigate = useNavigate();
  const docsPerView = 2;
  const totalPages = Math.ceil(expertDoctors.length / docsPerView);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => { supabase.from("doctors").select("*").eq("department", "Radiology").then(({ data }) => setExpertDoctors(data || [])); }, []);

  const toggle = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="radio">
      {/* ── Nav bar ── */}
      <nav className="radio__nav">
        <div className="radio__nav-inner">
          <Link to="/" className="radio__brand">
            <img src={hippocareLogo} alt="Hippocare" className="radio__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="radio__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Banner ── */}
      <header className="radio__banner">
        <div className="radio__banner-overlay" />
        <div className="radio__banner-content">
          <h1>Radiology</h1>
          <p className="radio__breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            24×7 Services
            <span>/</span>
            Radiology
          </p>
        </div>
      </header>

      <DeptNav />

      {/* ── Main Content ── */}
      <section className="radio__main">
        {/* LEFT: Image slider + content */}
        <div className="radio__left">
          <div className="radio__slider">
            {sliderImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Radiology slide ${idx + 1}`}
                className={`radio__slide ${idx === slide ? "radio__slide--active" : ""}`}
              />
            ))}
            <div className="radio__brand-overlay">
              <span className="radio__brand-overlay-text">Hippocare Hospital</span>
            </div>
            <div className="radio__dots">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`radio__dot ${idx === slide ? "radio__dot--active" : ""}`}
                  onClick={() => setSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── Radiology Department (bordered box) ── */}
          <article className="radio__content-box">
            <h2>Radiology Department</h2>

            {/* ── Advanced Imaging ── */}
            <div className="radio__section">
              <h3 className="radio__section-title">🔬 Advanced Diagnostic Imaging</h3>
              <p>
                The Radiology Department at Hippocare Hospital is equipped with
                cutting-edge imaging technology to deliver fast, accurate, and
                comprehensive diagnostic services 24 hours a day, 7 days a week.
              </p>
              <div className={`radio__section-expand ${expanded.imaging ? "radio__section-expand--open" : ""}`}>
                <p>
                  Our department houses the latest generation MRI scanners, multi-slice
                  CT scanners, digital X-ray systems, and high-resolution ultrasound
                  machines. These advanced tools enable our radiologists to detect even
                  the most subtle abnormalities with exceptional clarity and precision.
                </p>
              </div>
              <button className="radio__read-more" onClick={() => toggle("imaging")}>
                {expanded.imaging ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Expert Radiologists ── */}
            <div className="radio__section">
              <h3 className="radio__section-title">👨‍⚕️ Expert Radiologists</h3>
              <p>
                Our team of board-certified radiologists and trained technicians
                specialize in interpreting complex diagnostic images with accuracy
                and delivering timely reports.
              </p>
              <div className={`radio__section-expand ${expanded.experts ? "radio__section-expand--open" : ""}`}>
                <p>
                  Each radiologist brings years of subspecialty experience in areas
                  including neuroradiology, musculoskeletal imaging, cardiac imaging,
                  and interventional radiology. Reports are peer-reviewed for quality
                  assurance before being shared with treating physicians.
                </p>
              </div>
              <button className="radio__read-more" onClick={() => toggle("experts")}>
                {expanded.experts ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── CT Scan ── */}
            <div className="radio__section">
              <h3 className="radio__section-title">🏥 CT Scan & MRI Services</h3>
              <p>
                Our multi-slice CT scanner provides high-speed, high-resolution
                cross-sectional imaging for emergency trauma, oncology screening,
                and vascular assessments — available round the clock.
              </p>
              <div className={`radio__section-expand ${expanded.ct ? "radio__section-expand--open" : ""}`}>
                <p>
                  The 1.5T MRI system delivers superior soft-tissue contrast for
                  brain, spine, joint, and abdominal studies without radiation
                  exposure. Contrast-enhanced studies are performed under strict
                  safety protocols with renal function screening.
                </p>
              </div>
              <button className="radio__read-more" onClick={() => toggle("ct")}>
                {expanded.ct ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Digital X-Ray ── */}
            <div className="radio__section">
              <h3 className="radio__section-title">📷 Digital X-Ray & Fluoroscopy</h3>
              <p>
                Our fully digital X-ray systems produce instant, high-quality images
                with significantly lower radiation doses compared to conventional
                X-ray machines.
              </p>
              <div className={`radio__section-expand ${expanded.xray ? "radio__section-expand--open" : ""}`}>
                <p>
                  Images are directly available on the PACS (Picture Archiving and
                  Communication System) network, enabling treating doctors to view
                  results on their screens within minutes. Fluoroscopy services
                  support real-time imaging for guided procedures and barium studies.
                </p>
              </div>
              <button className="radio__read-more" onClick={() => toggle("xray")}>
                {expanded.xray ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Ultrasound ── */}
            <div className="radio__section">
              <h3 className="radio__section-title">🫀 Ultrasound & Doppler</h3>
              <p>
                High-resolution ultrasound machines with color Doppler capabilities
                support obstetric, abdominal, cardiac, and vascular imaging with
                real-time visualization.
              </p>
              <div className={`radio__section-expand ${expanded.ultrasound ? "radio__section-expand--open" : ""}`}>
                <p>
                  Portable bedside ultrasound units are available for ICU and emergency
                  patients who cannot be transported. Specialized obstetric scans include
                  NT scan, anomaly scan, and growth monitoring with 3D/4D capabilities.
                </p>
              </div>
              <button className="radio__read-more" onClick={() => toggle("ultrasound")}>
                {expanded.ultrasound ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── HMS Integration ── */}
            <div className="radio__section">
              <h3 className="radio__section-title">💻 Digital PACS & HMS Integration</h3>
              <p>
                All imaging studies are stored on our PACS system and integrated with
                the Hospital Management System for seamless access by doctors across
                all departments.
              </p>
              <div className={`radio__section-expand ${expanded.pacs ? "radio__section-expand--open" : ""}`}>
                <p>
                  Electronic reports with embedded images are available instantly,
                  eliminating the need for physical films. Historical comparisons
                  enable radiologists to track disease progression and treatment
                  response over time.
                </p>
              </div>
              <button className="radio__read-more" onClick={() => toggle("pacs")}>
                {expanded.pacs ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>
          </article>

          {/* ── Expert Doctors Carousel ── */}
          <section className="radio__experts">
            <div className="radio__experts-header">
              <h2>Expert Doctors</h2>
              <p className="radio__experts-sub">Our Top Radiology Specialists at Hippocare Hospital</p>
              <div className="radio__experts-arrows">
                <button className="radio__experts-arrow" onClick={() => setDocPage((p) => Math.max(p - 1, 0))} disabled={docPage === 0} aria-label="Previous">‹</button>
                <button className="radio__experts-arrow" onClick={() => setDocPage((p) => Math.min(p + 1, totalPages - 1))} disabled={docPage === totalPages - 1} aria-label="Next">›</button>
              </div>
            </div>
            <div className="radio__experts-track" style={{ transform: `translateX(-${docPage * 100}%)` }}>
              {expertDoctors.map((doc) => (
                <div className="radio__expert-card" key={doc.id}>
                  <div className="radio__expert-img-wrap">
                    <img src={doc.photo_url || ""} alt={doc.name} className="radio__expert-img" />
                    <span className="radio__expert-exp">{doc.experience || "—"}</span>
                  </div>
                  <div className="radio__expert-body">
                    <span className="radio__expert-partner">🏥 Hippocare Partner</span>
                    <h3 className="radio__expert-name" onClick={() => navigate(`/doctor/${doc.id}`)} style={{ cursor: "pointer" }}>{doc.name}</h3>
                    <p className="radio__expert-spec">{doc.specialization}</p>
                    <div className="radio__expert-stats"><span>👍 {doc.recommended} Recommended</span></div>
                    <div className="radio__expert-fee">Consultation Fee: <strong>{doc.consultation_fee ? `₹${doc.consultation_fee}` : "—"}</strong></div>
                    <div className="radio__expert-actions">
                      <button className="radio__expert-cta" onClick={() => { const role = localStorage.getItem("hmsRole"); if (role === "patient") { navigate(`/patient/book?doctor=${doc.id}`); } else { navigate(`/login?redirect=/patient/book&doctor=${doc.id}`); } }}>📅 Book Appointment</button>
                      <button className="radio__expert-profile" onClick={() => navigate(`/doctor/${doc.id}`)}>View Profile</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── About This Department (bordered box) ── */}
          <article className="radio__content-box">
            <h2>About This Department</h2>

            <div className="radio__section">
              <h3 className="radio__section-title">🏛️ Department Overview</h3>
              <p>
                The Radiology Department is a cornerstone of Hippocare Hospital's
                diagnostic capabilities, serving inpatients, outpatients, and emergency
                cases with equal priority and precision.
              </p>
              <div className={`radio__section-expand ${expanded.overview ? "radio__section-expand--open" : ""}`}>
                <p>
                  Headed by a senior consultant radiologist with over 15 years of
                  experience, the department operates multiple imaging suites designed
                  for patient comfort and workflow efficiency. Dedicated emergency
                  imaging is available 24/7 with rapid turnaround times.
                </p>
              </div>
              <button className="radio__read-more" onClick={() => toggle("overview")}>
                {expanded.overview ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            <div className="radio__section">
              <h3 className="radio__section-title">🛡️ Safety & Quality</h3>
              <p>
                Patient safety is our top priority. All imaging equipment undergoes
                regular calibration and quality assurance testing in compliance with
                AERB (Atomic Energy Regulatory Board) standards.
              </p>
              <div className={`radio__section-expand ${expanded.safety ? "radio__section-expand--open" : ""}`}>
                <p>
                  Radiation doses are monitored and optimized using the ALARA (As Low
                  As Reasonably Achievable) principle. Lead shielding, pregnancy
                  screening protocols, and contrast allergy precautions are strictly
                  followed for every patient.
                </p>
              </div>
              <button className="radio__read-more" onClick={() => toggle("safety")}>
                {expanded.safety ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            <div className="radio__section">
              <h3 className="radio__section-title">⏱️ Rapid Reporting</h3>
              <p>
                Emergency scan reports are delivered within 30 minutes, while routine
                reports are available within 2–4 hours. Critical findings are
                immediately communicated to the treating doctor.
              </p>
              <div className={`radio__section-expand ${expanded.reporting ? "radio__section-expand--open" : ""}`}>
                <p>
                  Our teleradiology capabilities allow remote specialist consultations
                  for complex cases. Second opinions from national and international
                  experts can be arranged when needed, ensuring the highest diagnostic
                  accuracy for our patients.
                </p>
              </div>
              <button className="radio__read-more" onClick={() => toggle("reporting")}>
                {expanded.reporting ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Radiology;
