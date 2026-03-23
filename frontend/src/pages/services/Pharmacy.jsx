import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import hippocareLogo from "../../assets/hippocare-logo.png";
import DeptNav from "../../components/DeptNav";
import "./Pharmacy.css";

/* Pharmacy slider images – save your images in public/images/ */
const sliderImages = [
  "/images/pharmacy-1.jpg",
  "/images/pharmacy-2.jpg",
  "/images/pharmacy-3.jpg",
  "/images/pharmacy-4.jpg",
];

const pharmacyStaff = [
  { name: "Dr. Siddharth Joshi", role: "Chief Pharmacist", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", qualification: "Pharm.D, MBA Healthcare", experience: "18+", speciality: "Clinical Pharmacy & Drug Interactions", bio: "Dr. Siddharth Joshi leads Hippocare's Pharmacy Department with 18+ years of expertise in clinical pharmacy, drug safety, and healthcare management. He has developed the hospital's drug formulary and implemented an electronic prescription verification system that reduced dispensing errors by 95%.", languages: "English, Hindi, Gujarati", email: "siddharth.joshi@hippocare.in", phone: "+91-99887-44001", specializations: ["Clinical Pharmacy", "Drug Interaction Management", "Formulary Development", "Pharmacovigilance"], achievements: ["Reduced dispensing errors by 95% via e-prescription system", "Hospital Drug & Therapeutics Committee Chair", "Best Pharmacist Award — IPA 2020", "Published 15+ papers on drug safety"], workingHours: "Mon–Sat: 8:00 AM – 5:00 PM", joinedYear: 2007 },
  { name: "Ms. Aarti Deshmukh", role: "Senior Clinical Pharmacist", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", qualification: "M.Pharm, RPh", experience: "12+", speciality: "Oncology Pharmacy", bio: "Ms. Aarti Deshmukh specializes in oncology pharmacy services, managing chemotherapy drug preparation, dosage calculations, and patient counseling for cancer treatments. She ensures safe handling and administration of cytotoxic drugs in the hospital's oncology unit.", languages: "English, Hindi, Marathi", email: "aarti.deshmukh@hippocare.in", phone: "+91-99887-44002", specializations: ["Oncology Pharmacy", "Chemotherapy Preparation", "Patient Drug Counseling", "Adverse Drug Reaction Monitoring"], achievements: ["Set up Hippocare's Oncology Drug Preparation Unit", "Trained 15+ pharmacists in cytotoxic drug handling", "State Pharmacy Council Recognition 2021", "ADR Reporting Excellence Award"], workingHours: "Mon–Sat: 9:00 AM – 5:00 PM", joinedYear: 2013 },
  { name: "Mr. Gaurav Thakur", role: "Drug Store In-Charge", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80", qualification: "B.Pharm, ADPQ", experience: "15+", speciality: "Inventory & Supply Chain", bio: "Mr. Gaurav Thakur manages the entire pharmacy inventory and supply chain. With 15+ years of experience, he has implemented an automated inventory management system with real-time stock monitoring, expiry tracking, and vendor management that ensures zero stock-outs for critical medicines.", languages: "English, Hindi", email: "gaurav.thakur@hippocare.in", phone: "+91-99887-44003", specializations: ["Inventory Management", "Supply Chain Optimization", "Vendor Management", "Cold Chain Compliance"], achievements: ["Zero critical medicine stock-out for 5+ years", "Implemented automated inventory tracking system", "Reduced pharmaceutical wastage by 60%", "Best Store Manager — Hippocare 2019"], workingHours: "Mon–Sat: 7:30 AM – 4:00 PM", joinedYear: 2010 },
  { name: "Ms. Ritika Pandey", role: "Pharmacist – Emergency", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", qualification: "B.Pharm", experience: "8+", speciality: "Emergency Dispensing", bio: "Ms. Ritika Pandey handles the 24/7 emergency pharmacy counter, ensuring rapid dispensing of life-saving drugs, emergency kits, and critical-care medications. She is trained in emergency medicine protocols and works closely with ICU and trauma teams.", languages: "English, Hindi, Bhojpuri", email: "ritika.pandey@hippocare.in", phone: "+91-99887-44004", specializations: ["Emergency Dispensing", "ICU Medication Management", "Life-Saving Drug Protocols", "Night-Shift Pharmacy Operations"], achievements: ["Fastest emergency dispensing record — under 3 minutes", "Night Shift Excellence Award — Hippocare 2022", "Trained in BLS & emergency drug protocols", "Zero dispensing error record — 3 consecutive years"], workingHours: "Rotational Shifts: 24/7 Coverage", joinedYear: 2017 },
];


const Pharmacy = () => {
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [selectedProfile, setSelectedProfile] = useState(null);
  const revealRef = useScrollReveal({ staggerDelay: 100 });

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
    <div className="pharm" ref={revealRef}>
      {/* ── Nav bar ── */}
      <nav className="pharm__nav">
        <div className="pharm__nav-inner">
          <Link to="/" className="pharm__brand">
            <img src={hippocareLogo} alt="Hippocare" className="pharm__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="pharm__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Banner ── */}
      <header className="pharm__banner scroll-reveal">
        <div className="pharm__banner-overlay" />
        <div className="pharm__banner-content">
          <h1>Pharmacy</h1>
          <p className="pharm__breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            24×7 Services
            <span>/</span>
            Pharmacy
          </p>
        </div>
      </header>

      <DeptNav />

      {/* ── Main Content ── */}
      <section className="pharm__main">
        {/* LEFT: Image slider */}
        <div className="pharm__left">
          <div className="pharm__slider">
            {sliderImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Pharmacy slide ${idx + 1}`}
                className={`pharm__slide ${idx === slide ? "pharm__slide--active" : ""}`}
              />
            ))}
            {/* Dots indicator */}
            <div className="pharm__dots">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`pharm__dot ${idx === slide ? "pharm__dot--active" : ""}`}
                  onClick={() => setSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Pharmacy content below the slider */}
          <article className="pharm__content-box scroll-reveal">
            <h2>Pharmacy</h2>

            {/* ── 24/7 Pharmacy ── */}
            <div className="pharm__section">
              <h3 className="pharm__section-title">💊 24/7 In-House Pharmacy</h3>
              <p>
                The Hippocare Hospital Pharmacy is a fully licensed and professionally
                managed in-house pharmacy operating round the clock — 24 hours a day,
                7 days a week, 365 days a year.
              </p>
              <div className={`pharm__section-expand ${expanded.allday ? "pharm__section-expand--open" : ""}`}>
                <p>
                  We understand that medical emergencies do not follow a schedule, and
                  neither does our commitment to patient care. Whether it’s a midnight
                  emergency or an early-morning prescription, our pharmacy is always
                  open and ready to serve.
                </p>
              </div>
              <button className="pharm__read-more" onClick={() => toggle("allday")}>
                {expanded.allday ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Certified Team ── */}
            <div className="pharm__section">
              <h3 className="pharm__section-title">👨‍⚕️ Certified Pharmacists</h3>
              <p>
                Our pharmacy is staffed by certified, experienced pharmacists and
                pharmacy technicians dedicated to ensuring every patient receives the
                right medication at the right time with proper guidance.
              </p>
              <div className={`pharm__section-expand ${expanded.team ? "pharm__section-expand--open" : ""}`}>
                <p>
                  Each prescription is carefully verified and cross-checked before
                  dispensing to eliminate any possibility of error. Our pharmacists
                  counsel patients about dosage schedules, potential side effects, drug
                  interactions, storage instructions, and dietary precautions.
                </p>
              </div>
              <button className="pharm__read-more" onClick={() => toggle("team")}>
                {expanded.team ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Genuine Medicines ── */}
            <div className="pharm__section">
              <h3 className="pharm__section-title">✅ Genuine &amp; Quality Medicines</h3>
              <p>
                We stock a comprehensive range of genuine, high-quality medicines sourced
                directly from reputed pharmaceutical manufacturers and authorized
                distributors with strict quality control checks.
              </p>
              <div className={`pharm__section-expand ${expanded.quality ? "pharm__section-expand--open" : ""}`}>
                <p>
                  Every batch of medication undergoes rigorous verification to ensure
                  patients receive only authentic and effective drugs. We maintain
                  temperature-controlled storage for sensitive medications and follow
                  all regulatory guidelines for drug safety.
                </p>
              </div>
              <button className="pharm__read-more" onClick={() => toggle("quality")}>
                {expanded.quality ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Affordable Pricing ── */}
            <div className="pharm__section">
              <h3 className="pharm__section-title">💰 Affordable &amp; Transparent Pricing</h3>
              <p>
                We offer medicines at competitive, transparent prices — often lower than
                retail market rates — so that quality healthcare remains accessible
                to all patients.
              </p>
              <div className={`pharm__section-expand ${expanded.price ? "pharm__section-expand--open" : ""}`}>
                <p>
                  Generic alternatives are always available when applicable, giving
                  patients cost-effective choices without compromising therapeutic value.
                  No hidden charges — every bill is itemized and transparent.
                </p>
              </div>
              <button className="pharm__read-more" onClick={() => toggle("price")}>
                {expanded.price ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Emergency Stock ── */}
            <div className="pharm__section">
              <h3 className="pharm__section-title">🚨 Emergency Medicine Stock</h3>
              <p>
                Our pharmacy maintains a dedicated emergency medicine stock including
                life-saving drugs, IV fluids, surgical consumables, and essential
                injections for urgent situations.
              </p>
              <div className={`pharm__section-expand ${expanded.emergency ? "pharm__section-expand--open" : ""}`}>
                <p>
                  This ensures doctors and nursing staff never face delays in treating
                  patients during critical-care situations. Emergency stock levels are
                  monitored in real-time to prevent any shortages.
                </p>
              </div>
              <button className="pharm__read-more" onClick={() => toggle("emergency")}>
                {expanded.emergency ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── HMS Integration ── */}
            <div className="pharm__section">
              <h3 className="pharm__section-title">💻 HMS Digital Integration</h3>
              <p>
                Our pharmacy is seamlessly integrated with the Hospital Management System,
                enabling real-time prescription tracking, inventory management, and
                automatic refill alerts.
              </p>
              <div className={`pharm__section-expand ${expanded.hms ? "pharm__section-expand--open" : ""}`}>
                <p>
                  Doctors send electronic prescriptions directly, reducing wait times
                  and paperwork. The system tracks medication history, flags potential
                  drug interactions, and ensures continuity of care across all departments.
                </p>
              </div>
              <button className="pharm__read-more" onClick={() => toggle("hms")}>
                {expanded.hms ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Outpatient Services ── */}
            <div className="pharm__section">
              <h3 className="pharm__section-title">🏥 Outpatient &amp; Community Service</h3>
              <p>
                We support outpatient prescription services, allowing discharged patients
                and the local community to purchase prescribed medications conveniently
                from our facility.
              </p>
              <div className={`pharm__section-expand ${expanded.outpatient ? "pharm__section-expand--open" : ""}`}>
                <p>
                  Whether you are an inpatient, outpatient, or a visitor, our pharmacy
                  serves you with a smile. We follow all regulatory guidelines set by
                  the State Pharmacy Council and the Drug Controller General of India.
                </p>
              </div>
              <button className="pharm__read-more" onClick={() => toggle("outpatient")}>
                {expanded.outpatient ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Trusted Partner ── */}
            <div className="pharm__section">
              <h3 className="pharm__section-title">🤝 Your Trusted Health Partner</h3>
              <p>
                At Hippocare, we believe a hospital pharmacy should be more than just a
                medicine counter — it should be a trusted health partner for patients
                and their families.
              </p>
              <div className={`pharm__section-expand ${expanded.partner ? "pharm__section-expand--open" : ""}`}>
                <p>
                  Regular audits, staff training, and process improvements ensure we
                  continuously raise the bar for pharmaceutical care. Genuine products,
                  professional guidance, and compassionate service — at any hour of
                  the day or night.
                </p>
              </div>
              <button className="pharm__read-more" onClick={() => toggle("partner")}>
                {expanded.partner ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>
          </article>

          {/* ── Pharmacy Staff Section ── */}
          <section className="pharm__staff">
            <h2 className="pharm__staff-heading">Our Pharmacy Team</h2>
            <p className="pharm__staff-sub">Experienced professionals ensuring safe medication management</p>
            <div className="pharm__staff-grid">
              {pharmacyStaff.map((s, i) => (
                <div className="pharm__staff-card" key={i}>
                  <div className="pharm__staff-img-wrap"><img src={s.photo} alt={s.name} className="pharm__staff-img" /><span className="pharm__staff-exp">{s.experience} Yrs</span></div>
                  <div className="pharm__staff-body">
                    <h3 className="pharm__staff-name">{s.name}</h3>
                    <p className="pharm__staff-role">{s.role}</p>
                    <p className="pharm__staff-qual">🎓 {s.qualification}</p>
                    <p className="pharm__staff-spec">💊 {s.speciality}</p>
                    <button className="pharm__view-profile-btn" onClick={() => setSelectedProfile(s)}>View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Profile Modal ── */}
          {selectedProfile && (
            <div className="pharm__modal-overlay" onClick={() => setSelectedProfile(null)}>
              <div className="pharm__modal" onClick={(e) => e.stopPropagation()}>
                <button className="pharm__modal-close" onClick={() => setSelectedProfile(null)}>✕</button>
                <div className="pharm__modal-header">
                  <div className="pharm__modal-img-wrap">
                    <img src={selectedProfile.photo} alt={selectedProfile.name} className="pharm__modal-img" />
                  </div>
                  <div className="pharm__modal-title">
                    <h2>{selectedProfile.name}</h2>
                    <p className="pharm__modal-role">{selectedProfile.role}</p>
                    <span className="pharm__modal-exp-badge">{selectedProfile.experience} Years Experience</span>
                  </div>
                </div>
                <div className="pharm__modal-body">
                  <div className="pharm__modal-section">
                    <h4>📋 About</h4>
                    <p>{selectedProfile.bio}</p>
                  </div>
                  <div className="pharm__modal-section">
                    <h4>🎓 Qualification</h4>
                    <p>{selectedProfile.qualification}</p>
                  </div>
                  <div className="pharm__modal-section">
                    <h4>💊 Specializations</h4>
                    <div className="pharm__modal-tags">
                      {selectedProfile.specializations.map((sp, idx) => (
                        <span key={idx} className="pharm__modal-tag">{sp}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pharm__modal-section">
                    <h4>🏆 Key Achievements</h4>
                    <ul className="pharm__modal-list">
                      {selectedProfile.achievements.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pharm__modal-info-grid">
                    <div className="pharm__modal-info-item"><span className="pharm__modal-info-label">🌐 Languages</span><span>{selectedProfile.languages}</span></div>
                    <div className="pharm__modal-info-item"><span className="pharm__modal-info-label">📧 Email</span><span>{selectedProfile.email}</span></div>
                    <div className="pharm__modal-info-item"><span className="pharm__modal-info-label">📞 Phone</span><span>{selectedProfile.phone}</span></div>
                    <div className="pharm__modal-info-item"><span className="pharm__modal-info-label">🕐 Working Hours</span><span>{selectedProfile.workingHours}</span></div>
                    <div className="pharm__modal-info-item"><span className="pharm__modal-info-label">📅 Joined Hippocare</span><span>{selectedProfile.joinedYear}</span></div>
                    <div className="pharm__modal-info-item"><span className="pharm__modal-info-label">🏥 Department</span><span>Pharmacy</span></div>
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

export default Pharmacy;
