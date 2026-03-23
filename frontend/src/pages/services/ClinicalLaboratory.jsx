import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import DeptNav from "../../components/DeptNav";
import "./ClinicalLaboratory.css";

/* Slider images – save in public/images/ */
const sliderImages = [
  "/images/clinical-lab-1.jpg",
  "/images/clinical-lab-2.jpg",
  "/images/clinical-lab-3.jpg",
];

const labHead = {
  name: "Dr. Suresh Banerjee",
  role: "Head of Clinical Laboratory",
  photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
  qualification: "MD Pathology, FRCPath (UK)",
  experience: "25+",
  overview: "Dr. Banerjee leads Hippocare's Clinical Laboratory with over 25 years of experience in diagnostic pathology, hematology, and lab quality assurance.",
  bio: "Dr. Suresh Banerjee is a globally trained pathologist with an FRCPath from the Royal College of Pathologists (UK). He established the NABL-accredited clinical laboratory at Hippocare and has been instrumental in introducing molecular diagnostics and digital pathology. Under his leadership, the lab processes over 1,500 tests daily with a turnaround accuracy rate of 99.8%.",
  languages: "English, Hindi, Bengali",
  email: "suresh.banerjee@hippocare.in",
  phone: "+91-99887-33001",
  specializations: ["Diagnostic Pathology", "Hematopathology", "Lab Quality Assurance", "Molecular Diagnostics"],
  achievements: ["Established NABL Accreditation for Hippocare Lab", "FRCPath — Royal College of Pathologists, UK", "Published 55+ peer-reviewed papers", "National Pathology Excellence Award 2018"],
  workingHours: "Mon–Sat: 8:00 AM – 4:00 PM",
  joinedYear: 2000,
};

const labTeam = [
  {
    name: "Dr. Meenakshi Rao", role: "Senior Histopathologist",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    qualification: "MD Pathology", experience: "16+",
    bio: "Dr. Meenakshi Rao specializes in surgical pathology and immunohistochemistry. She provides intraoperative frozen section consultations and has extensive experience in cancer subtyping and prognostic marker analysis for oncology treatments.",
    languages: "English, Hindi, Telugu", email: "meenakshi.rao@hippocare.in", phone: "+91-99887-33002",
    specializations: ["Histopathology", "Immunohistochemistry (IHC)", "Frozen Section Analysis", "Cytopathology"],
    achievements: ["IHC Lab Setup Lead — Hippocare", "Best Paper Award — National Pathology Congress 2020", "Trained 20+ pathology residents", "Digital Pathology Integration Lead"],
    workingHours: "Mon–Sat: 9:00 AM – 5:00 PM", joinedYear: 2009,
  },
  {
    name: "Mr. Dinesh Verma", role: "Chief Laboratory Technologist",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    qualification: "B.Sc MLT, PGDMLT", experience: "20+",
    bio: "Mr. Dinesh Verma has two decades of expertise in operating automated laboratory systems spanning biochemistry, hematology, and immunoassay platforms. He is responsible for lab equipment calibration, quality control, and training of junior technologists.",
    languages: "English, Hindi", email: "dinesh.verma@hippocare.in", phone: "+91-99887-33003",
    specializations: ["Automated Analyzers", "Biochemistry Platforms", "EQAS & Quality Control", "Lab Equipment Maintenance"],
    achievements: ["20+ years zero-downtime lab operations", "ISO 15189 Internal Auditor", "Implemented barcode-based sample tracking", "Employee Excellence Award — Hippocare 2020"],
    workingHours: "Mon–Sat: 7:00 AM – 3:00 PM (Rotational)", joinedYear: 2005,
  },
  {
    name: "Ms. Kavita Sharma", role: "Hematology Specialist",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80",
    qualification: "M.Sc Hematology", experience: "12+",
    bio: "Ms. Kavita Sharma manages the hematology and coagulation section, ensuring accurate CBCs, ESR, reticulocyte counts, and coagulation profiles. She plays a key role in the hospital's blood bank operations and transfusion medicine protocols.",
    languages: "English, Hindi, Punjabi", email: "kavita.sharma@hippocare.in", phone: "+91-99887-33004",
    specializations: ["Hematology", "Coagulation Studies", "Blood Banking", "Transfusion Medicine"],
    achievements: ["Blood Bank Safety Officer — Hippocare", "Reduced coagulation TAT by 40%", "State-level Gold Medal in M.Sc Hematology", "EQAS Proficiency Score: 98.5% consistently"],
    workingHours: "Mon–Sat: 8:00 AM – 4:00 PM", joinedYear: 2013,
  },
  {
    name: "Mr. Rajat Khanna", role: "Quality Assurance Officer",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
    qualification: "NABL Certified Auditor", experience: "10+",
    bio: "Mr. Rajat Khanna oversees the entire quality management system of the clinical laboratory. He ensures compliance with NABL, ISO 15189, and EQAS standards through meticulous documentation, internal audits, and corrective action management.",
    languages: "English, Hindi", email: "rajat.khanna@hippocare.in", phone: "+91-99887-33005",
    specializations: ["Quality Management Systems", "NABL Accreditation", "ISO 15189 Compliance", "Internal & External Auditing"],
    achievements: ["Led 3 successful NABL audits with zero non-conformities", "Developed 100+ Lab SOPs", "Quality Circle Award — Hippocare 2022", "Westgard QC Implementation Lead"],
    workingHours: "Mon–Sat: 9:00 AM – 5:00 PM", joinedYear: 2015,
  },
];


const ClinicalLaboratory = () => {
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const toggle = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="clab">
      {/* ── Nav bar ── */}
      <nav className="clab__nav">
        <div className="clab__nav-inner">
          <Link to="/" className="clab__brand">
            <img src={hippocareLogo} alt="Hippocare" className="clab__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="clab__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Banner ── */}
      <header className="clab__banner">
        <div className="clab__banner-overlay" />
        <div className="clab__banner-content">
          <h1>Clinical Laboratory</h1>
          <p className="clab__breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            24×7 Services
            <span>/</span>
            Clinical Laboratory
          </p>
        </div>
      </header>

      <DeptNav />

      {/* ── Main Content ── */}
      <section className="clab__main">
        {/* LEFT: Image slider + content */}
        <div className="clab__left">
          <div className="clab__slider">
            {sliderImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Clinical Lab slide ${idx + 1}`}
                className={`clab__slide ${idx === slide ? "clab__slide--active" : ""}`}
              />
            ))}
            <div className="clab__brand-overlay">
              <span className="clab__brand-overlay-text">Hippocare Hospital</span>
            </div>
            <div className="clab__dots">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`clab__dot ${idx === slide ? "clab__dot--active" : ""}`}
                  onClick={() => setSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── Clinical Laboratory (bordered box) ── */}
          <article className="clab__content-box">
            <h2>Clinical Laboratory</h2>

            {/* ── 24/7 Lab Services ── */}
            <div className="clab__section">
              <h3 className="clab__section-title">🧪 24/7 Laboratory Services</h3>
              <p>
                The Clinical Laboratory at Hippocare Hospital operates round the clock,
                providing accurate and timely diagnostic testing to support emergency,
                inpatient, and outpatient care across all medical departments.
              </p>
              <div className={`clab__section-expand ${expanded.allday ? "clab__section-expand--open" : ""}`}>
                <p>
                  Our laboratory processes thousands of tests daily, including critical
                  emergency panels that are reported within 30 minutes. Night and weekend
                  staffing ensures uninterrupted service for ICU, trauma, and maternity
                  cases requiring urgent laboratory results.
                </p>
              </div>
              <button className="clab__read-more" onClick={() => toggle("allday")}>
                {expanded.allday ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Biochemistry ── */}
            <div className="clab__section">
              <h3 className="clab__section-title">🔬 Biochemistry & Clinical Chemistry</h3>
              <p>
                Our fully automated biochemistry analyzers deliver precise results for
                liver function, kidney function, lipid profiles, blood glucose, thyroid
                panels, and cardiac biomarkers.
              </p>
              <div className={`clab__section-expand ${expanded.biochem ? "clab__section-expand--open" : ""}`}>
                <p>
                  Advanced chemiluminescence immunoassay (CLIA) systems enable high-sensitivity
                  hormone testing, tumour marker screening, and therapeutic drug monitoring.
                  Every batch undergoes internal quality control with Westgard rules to
                  ensure analytical accuracy.
                </p>
              </div>
              <button className="clab__read-more" onClick={() => toggle("biochem")}>
                {expanded.biochem ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Hematology ── */}
            <div className="clab__section">
              <h3 className="clab__section-title">🩸 Hematology & Blood Banking</h3>
              <p>
                State-of-the-art hematology analyzers produce complete blood counts with
                5-part differential, ESR, reticulocyte count, and peripheral smear
                examination — critical for diagnosing infections, anemias, and blood disorders.
              </p>
              <div className={`clab__section-expand ${expanded.hemato ? "clab__section-expand--open" : ""}`}>
                <p>
                  Our blood bank component types, cross-matches, and stores blood products
                  under stringent temperature-controlled conditions. Coagulation studies
                  including PT, APTT, INR, and D-Dimer are available on an emergency basis
                  for surgical and ICU patients.
                </p>
              </div>
              <button className="clab__read-more" onClick={() => toggle("hemato")}>
                {expanded.hemato ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Microbiology ── */}
            <div className="clab__section">
              <h3 className="clab__section-title">🦠 Microbiology & Culture Sensitivity</h3>
              <p>
                The microbiology section handles culture and sensitivity testing for
                blood, urine, sputum, wound swabs, and body fluids, aiding clinicians
                in selecting targeted antibiotic therapy.
              </p>
              <div className={`clab__section-expand ${expanded.micro ? "clab__section-expand--open" : ""}`}>
                <p>
                  Automated culture systems (BACTEC) ensure rapid detection of bacteremia
                  and sepsis. Rapid antigen tests for dengue, malaria, typhoid, and
                  COVID-19 deliver results within minutes for faster clinical decision-making.
                  Antibiogram data is compiled quarterly to guide the hospital's
                  antibiotic stewardship program.
                </p>
              </div>
              <button className="clab__read-more" onClick={() => toggle("micro")}>
                {expanded.micro ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Pathology ── */}
            <div className="clab__section">
              <h3 className="clab__section-title">🔎 Histopathology & Cytology</h3>
              <p>
                Our pathology division provides tissue biopsy processing, frozen section
                analysis for intraoperative consultations, and cytological examination
                of body fluids and fine-needle aspirates.
              </p>
              <div className={`clab__section-expand ${expanded.patho ? "clab__section-expand--open" : ""}`}>
                <p>
                  Immunohistochemistry (IHC) markers assist oncologists in cancer subtyping
                  and treatment planning. Pap smear screening, FNAC reporting, and
                  special staining techniques ensure comprehensive diagnostic coverage.
                  Digital pathology is being integrated for teleconsultation and archival.
                </p>
              </div>
              <button className="clab__read-more" onClick={() => toggle("patho")}>
                {expanded.patho ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── HMS Integration ── */}
            <div className="clab__section">
              <h3 className="clab__section-title">💻 HMS & LIS Integration</h3>
              <p>
                All laboratory results are seamlessly integrated with the Hospital
                Management System through our Laboratory Information System (LIS),
                enabling real-time access by treating doctors across all departments.
              </p>
              <div className={`clab__section-expand ${expanded.hms ? "clab__section-expand--open" : ""}`}>
                <p>
                  Barcode-based sample tracking eliminates identification errors from
                  collection to reporting. Patients can view their lab reports online
                  through the Hippocare patient portal. Historical trends are graphically
                  presented to help doctors monitor chronic conditions over time.
                </p>
              </div>
              <button className="clab__read-more" onClick={() => toggle("hms")}>
                {expanded.hms ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>
          </article>

          {/* ── About This Department (bordered box) ── */}
          <article className="clab__content-box">
            <h2>About This Department</h2>

            <div className="clab__section">
              <h3 className="clab__section-title">🏛️ Department Overview</h3>
              <p>
                The Clinical Laboratory is the diagnostic backbone of Hippocare Hospital,
                processing over 500 types of tests covering biochemistry, hematology,
                microbiology, serology, and histopathology.
              </p>
              <div className={`clab__section-expand ${expanded.overview ? "clab__section-expand--open" : ""}`}>
                <p>
                  Led by a senior consultant pathologist with more than 18 years of
                  experience, the department employs qualified technicians and phlebotomists
                  trained in specimen handling and quality protocols. The lab is designed
                  with separate pre-analytical, analytical, and post-analytical zones
                  to maintain workflow efficiency and minimize turnaround times.
                </p>
              </div>
              <button className="clab__read-more" onClick={() => toggle("overview")}>
                {expanded.overview ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            <div className="clab__section">
              <h3 className="clab__section-title">✅ Quality Accreditation</h3>
              <p>
                Our laboratory follows NABL (National Accreditation Board for Testing
                and Calibration Laboratories) standards and participates in External
                Quality Assurance Schemes (EQAS) for all disciplines.
              </p>
              <div className={`clab__section-expand ${expanded.quality ? "clab__section-expand--open" : ""}`}>
                <p>
                  Internal quality control (IQC) is run with every batch using certified
                  reference materials. Equipment calibration, reagent validation, and
                  proficiency testing are documented meticulously. Regular audits ensure
                  compliance with ISO 15189 medical laboratory standards.
                </p>
              </div>
              <button className="clab__read-more" onClick={() => toggle("quality")}>
                {expanded.quality ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            <div className="clab__section">
              <h3 className="clab__section-title">🚀 Sample Collection & Home Service</h3>
              <p>
                Walk-in sample collection is available at the ground-floor collection
                centre. For patients unable to visit, Hippocare offers home sample
                collection services with trained phlebotomists.
              </p>
              <div className={`clab__section-expand ${expanded.collection ? "clab__section-expand--open" : ""}`}>
                <p>
                  Samples are transported in temperature-controlled carriers to preserve
                  integrity. Reports are delivered via SMS, email, and the patient portal
                  within the promised turnaround time — typically 4–6 hours for routine
                  tests and 30 minutes for critical emergency panels.
                </p>
              </div>
              <button className="clab__read-more" onClick={() => toggle("collection")}>
                {expanded.collection ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>
          </article>

          {/* ── Lab Head Feature ── */}
          <section className="clab__head-section">
            <h2 className="clab__head-title">Laboratory Head</h2>
            <div className="clab__head-card">
              <div className="clab__head-img-wrap"><img src={labHead.photo} alt={labHead.name} className="clab__head-img" /><span className="clab__head-exp">{labHead.experience} Yrs Exp.</span></div>
              <div className="clab__head-info">
                <h3>{labHead.name}</h3>
                <p className="clab__head-role">{labHead.role}</p>
                <p className="clab__head-qual">🎓 {labHead.qualification}</p>
                <p className="clab__head-overview">{labHead.overview}</p>
                <button className="clab__view-profile-btn" onClick={() => setSelectedProfile(labHead)}>View Profile</button>
              </div>
            </div>
          </section>

          {/* ── Lab Staff Grid ── */}
          <section className="clab__staff">
            <h2 className="clab__staff-heading">Our Clinical Lab Team</h2>
            <p className="clab__staff-sub">Skilled professionals committed to accurate diagnostics</p>
            <div className="clab__staff-grid">
              {labTeam.map((s, i) => (
                <div className="clab__staff-card" key={i}>
                  <div className="clab__staff-img-wrap"><img src={s.photo} alt={s.name} className="clab__staff-img" /><span className="clab__staff-exp">{s.experience} Yrs</span></div>
                  <div className="clab__staff-body">
                    <h3 className="clab__staff-name">{s.name}</h3>
                    <p className="clab__staff-role">{s.role}</p>
                    <p className="clab__staff-qual">🎓 {s.qualification}</p>
                    <button className="clab__view-profile-btn" onClick={() => setSelectedProfile(s)}>View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Profile Modal ── */}
          {selectedProfile && (
            <div className="clab__modal-overlay" onClick={() => setSelectedProfile(null)}>
              <div className="clab__modal" onClick={(e) => e.stopPropagation()}>
                <button className="clab__modal-close" onClick={() => setSelectedProfile(null)}>✕</button>

                {/* Gradient banner header */}
                <div className="clab__modal-banner">
                  <span className="clab__modal-banner-brand">🏥 Hippocare Hospital — Clinical Laboratory</span>
                </div>

                <div className="clab__modal-header">
                  <div className="clab__modal-img-wrap">
                    <img src={selectedProfile.photo} alt={selectedProfile.name} className="clab__modal-img" />
                  </div>
                  <div className="clab__modal-title">
                    <h2>{selectedProfile.name}</h2>
                    <p className="clab__modal-role">{selectedProfile.role}</p>
                    <div className="clab__modal-badges">
                      <span className="clab__modal-exp-badge">🧪 {selectedProfile.experience} Years Experience</span>
                      <span className="clab__modal-qual-badge">🎓 {selectedProfile.qualification}</span>
                    </div>
                  </div>
                </div>

                <div className="clab__modal-body">
                  {/* About */}
                  <div className="clab__modal-section">
                    <h4>📋 About</h4>
                    <p>{selectedProfile.bio}</p>
                  </div>

                  {/* Specializations */}
                  <div className="clab__modal-section">
                    <h4>🔬 Specializations</h4>
                    <div className="clab__modal-tags">
                      {selectedProfile.specializations.map((sp, idx) => (
                        <span key={idx} className="clab__modal-tag">{sp}</span>
                      ))}
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div className="clab__modal-section">
                    <h4>🏆 Key Achievements</h4>
                    <ul className="clab__modal-list">
                      {selectedProfile.achievements.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact & Details Grid */}
                  <div className="clab__modal-section">
                    <h4>📇 Contact &amp; Details</h4>
                    <div className="clab__modal-info-grid">
                      <div className="clab__modal-info-item"><span className="clab__modal-info-label">📧 Email</span><span>{selectedProfile.email}</span></div>
                      <div className="clab__modal-info-item"><span className="clab__modal-info-label">📞 Phone</span><span>{selectedProfile.phone}</span></div>
                      <div className="clab__modal-info-item"><span className="clab__modal-info-label">🌐 Languages</span><span>{selectedProfile.languages}</span></div>
                      <div className="clab__modal-info-item"><span className="clab__modal-info-label">🕐 Working Hours</span><span>{selectedProfile.workingHours}</span></div>
                      <div className="clab__modal-info-item"><span className="clab__modal-info-label">📅 Joined Hippocare</span><span>{selectedProfile.joinedYear}</span></div>
                      <div className="clab__modal-info-item"><span className="clab__modal-info-label">🏥 Department</span><span>Clinical Laboratory</span></div>
                    </div>
                  </div>

                  {/* Footer branding */}
                  <div className="clab__modal-footer">
                    <span>Hippocare Hospital — Excellence in Diagnostics</span>
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

export default ClinicalLaboratory;
