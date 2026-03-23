import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import DeptNav from "../../components/DeptNav";
import "./GeneralMedicine.css";

const sliderImages = [
  "/images/general-medicine-1.jpg",
  "/images/general-medicine-2.jpg",
  "/images/general-medicine-3.jpg",
];


const GeneralMedicine = () => {
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const timer = setInterval(() => setSlide((p) => (p + 1) % sliderImages.length), 3500);
    return () => clearInterval(timer);
  }, []);

  const toggle = (key) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="gmed">
      <nav className="gmed__nav">
        <div className="gmed__nav-inner">
          <Link to="/" className="gmed__brand"><img src={hippocareLogo} alt="Hippocare" className="gmed__logo" /><span>Hippocare Hospital</span></Link>
          <div className="gmed__nav-links"><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/login">Login</Link></div>
        </div>
      </nav>

      <header className="gmed__banner">
        <div className="gmed__banner-overlay" />
        <div className="gmed__banner-content">
          <h1>General Medicine</h1>
          <p className="gmed__breadcrumb"><Link to="/">Home</Link><span>/</span>Services<span>/</span>General Medicine</p>
        </div>
      </header>

      <DeptNav />

      <section className="gmed__main">
        <div className="gmed__left">
          <div className="gmed__slider">
            {sliderImages.map((src, i) => (
              <img key={i} src={src} alt={`General Medicine ${i + 1}`} className={`gmed__slide ${i === slide ? "gmed__slide--active" : ""}`} />
            ))}
            <div className="gmed__brand-overlay"><span className="gmed__brand-overlay-text">Hippocare Hospital</span></div>
            <div className="gmed__dots">
              {sliderImages.map((_, i) => (
                <button key={i} className={`gmed__dot ${i === slide ? "gmed__dot--active" : ""}`} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
          </div>

          <article className="gmed__content-box">
            <h2>General Medicine Department</h2>

            <div className="gmed__section">
              <h3 className="gmed__section-title">🩺 Comprehensive Primary Care</h3>
              <p>Our General Medicine department serves as the first point of contact for patients seeking medical attention. Our experienced physicians provide thorough evaluations and coordinate care across specialties when needed.</p>
              <div className={`gmed__section-expand ${expanded.primary ? "gmed__section-expand--open" : ""}`}>
                <p>We handle a broad spectrum of conditions including infections, chronic disease management, lifestyle disorders, and preventive health checkups. Every patient receives a personalized treatment plan designed for long-term wellness and recovery.</p>
              </div>
              <button className="gmed__read-more" onClick={() => toggle("primary")}>{expanded.primary ? "Read Less ▲" : "Read More ▼"}</button>
            </div>

            <div className="gmed__section">
              <h3 className="gmed__section-title">💊 Chronic Disease Management</h3>
              <p>Our specialists excel in managing chronic conditions such as diabetes, hypertension, thyroid disorders, and respiratory diseases with evidence-based treatment protocols and regular follow-up schedules.</p>
              <div className={`gmed__section-expand ${expanded.chronic ? "gmed__section-expand--open" : ""}`}>
                <p>Patients are enrolled in structured disease management programs that include medication optimization, dietary counseling, lifestyle modification, and periodic laboratory monitoring to prevent complications and ensure optimal health outcomes.</p>
              </div>
              <button className="gmed__read-more" onClick={() => toggle("chronic")}>{expanded.chronic ? "Read Less ▲" : "Read More ▼"}</button>
            </div>

            <div className="gmed__section">
              <h3 className="gmed__section-title">🔬 Diagnostic Excellence</h3>
              <p>With state-of-the-art diagnostic support including in-house laboratory, imaging, and point-of-care testing, our general medicine team ensures timely, accurate diagnosis for every patient.</p>
              <div className={`gmed__section-expand ${expanded.diagnostic ? "gmed__section-expand--open" : ""}`}>
                <p>Rapid diagnostic capabilities allow us to detect infections, metabolic disorders, and organ dysfunction within hours. Our physicians correlate clinical findings with lab results to arrive at precise diagnoses and initiate treatment without delay.</p>
              </div>
              <button className="gmed__read-more" onClick={() => toggle("diagnostic")}>{expanded.diagnostic ? "Read Less ▲" : "Read More ▼"}</button>
            </div>

            <div className="gmed__section">
              <h3 className="gmed__section-title">🛡️ Preventive Health Checkups</h3>
              <p>Hippocare offers comprehensive health screening packages tailored by age and risk factors, enabling early detection of conditions like diabetes, cardiovascular disease, and cancer.</p>
              <div className={`gmed__section-expand ${expanded.preventive ? "gmed__section-expand--open" : ""}`}>
                <p>Our preventive care programs include annual executive health checkups, women's wellness packages, senior citizen panels, and pre-employment screenings. Each package is designed with input from our multi-specialty team to cover all critical health parameters.</p>
              </div>
              <button className="gmed__read-more" onClick={() => toggle("preventive")}>{expanded.preventive ? "Read Less ▲" : "Read More ▼"}</button>
            </div>

            <div className="gmed__section">
              <h3 className="gmed__section-title">💉 Vaccination & Immunization</h3>
              <p>We provide a full range of adult and pediatric vaccinations including flu shots, hepatitis, typhoid, pneumonia, and travel vaccines as per the latest immunization guidelines.</p>
              <div className={`gmed__section-expand ${expanded.vaccine ? "gmed__section-expand--open" : ""}`}>
                <p>Our vaccination clinic maintains cold-chain integrity and uses WHO-approved vaccines. Corporate vaccination drives, booster dose reminders, and digital vaccination certificates are also available for employees and individual patients.</p>
              </div>
              <button className="gmed__read-more" onClick={() => toggle("vaccine")}>{expanded.vaccine ? "Read Less ▲" : "Read More ▼"}</button>
            </div>

            <div className="gmed__section">
              <h3 className="gmed__section-title">🤝 Specialist Referral Coordination</h3>
              <p>When specialized care is needed, our general medicine team coordinates seamless referrals to the appropriate department, ensuring continuity of care and complete clinical handoff.</p>
              <div className={`gmed__section-expand ${expanded.referral ? "gmed__section-expand--open" : ""}`}>
                <p>Our integrated HMS platform allows real-time sharing of patient records, lab reports, and imaging across departments. This eliminates redundant testing, reduces wait times, and ensures every specialist has full access to the patient's medical history.</p>
              </div>
              <button className="gmed__read-more" onClick={() => toggle("referral")}>{expanded.referral ? "Read Less ▲" : "Read More ▼"}</button>
            </div>
          </article>

          <article className="gmed__content-box">
            <h2>About This Department</h2>

            <div className="gmed__section">
              <h3 className="gmed__section-title">🏛️ Department Overview</h3>
              <p>The General Medicine Department is the cornerstone of Hippocare Hospital, handling the highest patient volume across OPD and inpatient services with dedicated wards and a fully equipped outpatient clinic.</p>
              <div className={`gmed__section-expand ${expanded.overview ? "gmed__section-expand--open" : ""}`}>
                <p>Led by a senior consultant physician with over 20 years of experience, the department operates daily OPD clinics, manages medical ICU admissions, and runs specialized clinics for diabetes, respiratory medicine, and infectious diseases.</p>
              </div>
              <button className="gmed__read-more" onClick={() => toggle("overview")}>{expanded.overview ? "Read Less ▲" : "Read More ▼"}</button>
            </div>

            <div className="gmed__section">
              <h3 className="gmed__section-title">👨‍⚕️ Expert Medical Team</h3>
              <p>Our team includes experienced internists, resident doctors, and trained nursing staff who work collaboratively to provide round-the-clock patient care with a patient-first philosophy.</p>
              <div className={`gmed__section-expand ${expanded.team ? "gmed__section-expand--open" : ""}`}>
                <p>Regular CME (Continuing Medical Education) sessions, clinical audits, and protocol updates ensure our physicians stay current with the latest medical advances and treatment guidelines from national and international bodies.</p>
              </div>
              <button className="gmed__read-more" onClick={() => toggle("team")}>{expanded.team ? "Read Less ▲" : "Read More ▼"}</button>
            </div>

            <div className="gmed__section">
              <h3 className="gmed__section-title">📋 Patient-Centered Approach</h3>
              <p>Every patient visiting General Medicine receives a comprehensive assessment, a clear treatment plan, and follow-up scheduling — all managed through our digital HMS for transparency and convenience.</p>
              <div className={`gmed__section-expand ${expanded.patient ? "gmed__section-expand--open" : ""}`}>
                <p>Patients can access their reports, prescriptions, and appointment history online. Teleconsultation services are also available for follow-up visits, making healthcare accessible even from home.</p>
              </div>
              <button className="gmed__read-more" onClick={() => toggle("patient")}>{expanded.patient ? "Read Less ▲" : "Read More ▼"}</button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default GeneralMedicine;
