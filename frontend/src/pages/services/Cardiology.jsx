import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import { supabase } from "../../lib/supabaseClient";
import DeptNav from "../../components/DeptNav";
import "./Cardiology.css";

const sliderImages = ["/images/cardiology-1.jpg","/images/cardiology-2.jpg","/images/cardiology-3.jpg"];

const Cardiology = () => {
  const [expertDoctors, setExpertDoctors] = useState([]);
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [docPage, setDocPage] = useState(0);
  const navigate = useNavigate();
  const docsPerView = 2;
  const totalPages = Math.ceil(expertDoctors.length / docsPerView);

  useEffect(() => {
    supabase.from("doctors").select("*").eq("department", "Cardiology").then(({ data }) => setExpertDoctors(data || []));
  }, []);

  useEffect(() => { const t = setInterval(() => setSlide((p) => (p + 1) % sliderImages.length), 3500); return () => clearInterval(t); }, []);
  const toggle = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="card">
      <nav className="card__nav"><div className="card__nav-inner"><Link to="/" className="card__brand"><img src={hippocareLogo} alt="Hippocare" className="card__logo" /><span>Hippocare Hospital</span></Link><div className="card__nav-links"><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/login">Login</Link></div></div></nav>

      <header className="card__banner"><div className="card__banner-overlay" /><div className="card__banner-content"><h1>Cardiology</h1><p className="card__breadcrumb"><Link to="/">Home</Link><span>/</span>Services<span>/</span>Cardiology</p></div></header>

      <DeptNav />

      <section className="card__main">
        <div className="card__left">
          <div className="card__slider">
            {sliderImages.map((src, i) => (<img key={i} src={src} alt={`Cardiology ${i+1}`} className={`card__slide ${i===slide?"card__slide--active":""}`} />))}
            <div className="card__brand-overlay"><span className="card__brand-overlay-text">Hippocare Hospital</span></div>
            <div className="card__dots">{sliderImages.map((_,i) => (<button key={i} className={`card__dot ${i===slide?"card__dot--active":""}`} onClick={()=>setSlide(i)} aria-label={`Slide ${i+1}`} />))}</div>
          </div>

          <article className="card__content-box">
            <h2>Cardiology Department</h2>

            <div className="card__section">
              <h3 className="card__section-title">❤️ Advanced Heart Care</h3>
              <p>The Cardiology department at Hippocare is equipped with cutting-edge technology for the diagnosis and treatment of cardiovascular diseases. From ECGs to complex catheterizations, we cover it all.</p>
              <div className={`card__section-expand ${expanded.heart?"card__section-expand--open":""}`}><p>Our cardiologists specialize in managing coronary artery disease, heart failure, arrhythmias, hypertension, and congenital heart conditions with both medical and interventional approaches. Advanced cath lab facilities enable life-saving procedures round the clock.</p></div>
              <button className="card__read-more" onClick={()=>toggle("heart")}>{expanded.heart?"Read Less ▲":"Read More ▼"}</button>
            </div>

            <div className="card__section">
              <h3 className="card__section-title">🫀 ECG, Echo & Stress Testing</h3>
              <p>We offer comprehensive non-invasive cardiac diagnostics including 12-lead ECG, 2D echocardiography, Doppler studies, Holter monitoring, and treadmill stress testing for accurate heart assessment.</p>
              <div className={`card__section-expand ${expanded.echo?"card__section-expand--open":""}`}><p>These tests help detect arrhythmias, valve disorders, wall motion abnormalities, and exercise-induced ischemia. Results are interpreted by senior cardiologists and integrated with the HMS for seamless clinical access.</p></div>
              <button className="card__read-more" onClick={()=>toggle("echo")}>{expanded.echo?"Read Less ▲":"Read More ▼"}</button>
            </div>

            <div className="card__section">
              <h3 className="card__section-title">🏥 Coronary Angiography & Angioplasty</h3>
              <p>Our state-of-the-art cath lab performs diagnostic coronary angiography and percutaneous coronary interventions (PCI/angioplasty) with stent placement for blocked arteries.</p>
              <div className={`card__section-expand ${expanded.angio?"card__section-expand--open":""}`}><p>Primary PCI for acute heart attacks is available 24/7 with a door-to-balloon time target of under 90 minutes. Drug-eluting stents and cutting-edge guidewire technology ensure optimal outcomes with minimal complications.</p></div>
              <button className="card__read-more" onClick={()=>toggle("angio")}>{expanded.angio?"Read Less ▲":"Read More ▼"}</button>
            </div>

            <div className="card__section">
              <h3 className="card__section-title">🔋 Pacemaker & Device Implantation</h3>
              <p>We provide permanent pacemaker implantation, ICD (Implantable Cardioverter Defibrillator) placement, and CRT (Cardiac Resynchronization Therapy) for patients with rhythm disorders and heart failure.</p>
              <div className={`card__section-expand ${expanded.pace?"card__section-expand--open":""}`}><p>Post-implantation, patients are monitored regularly through our dedicated device clinic. Remote monitoring capabilities allow our electrophysiologists to track device performance and detect abnormalities without requiring hospital visits.</p></div>
              <button className="card__read-more" onClick={()=>toggle("pace")}>{expanded.pace?"Read Less ▲":"Read More ▼"}</button>
            </div>

            <div className="card__section">
              <h3 className="card__section-title">🏃 Cardiac Rehabilitation</h3>
              <p>Our cardiac rehab program combines supervised exercise therapy, dietary counseling, stress management, and patient education to help patients recover after heart events and surgeries.</p>
              <div className={`card__section-expand ${expanded.rehab?"card__section-expand--open":""}`}><p>The program is designed by cardiologists and physiotherapists to progressively build cardiovascular fitness while monitoring heart response. Patients who complete the program show significantly improved quality of life and reduced readmission rates.</p></div>
              <button className="card__read-more" onClick={()=>toggle("rehab")}>{expanded.rehab?"Read Less ▲":"Read More ▼"}</button>
            </div>

            <div className="card__section">
              <h3 className="card__section-title">🛡️ Preventive Cardiology</h3>
              <p>Early detection saves lives — our preventive cardiology clinic focuses on risk assessment, lipid management, lifestyle modification, and cardiac screening for high-risk individuals.</p>
              <div className={`card__section-expand ${expanded.prevent?"card__section-expand--open":""}`}><p>Executive cardiac checkup packages, family screening programs, and corporate heart health initiatives are offered regularly. Our cardiologists use global risk calculators and advanced biomarkers to stratify patients and design individualized prevention strategies.</p></div>
              <button className="card__read-more" onClick={()=>toggle("prevent")}>{expanded.prevent?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>

          {/* ── Expert Doctors Carousel ── */}
          <section className="card__experts">
            <div className="card__experts-header">
              <h2>Expert Doctors</h2>
              <p className="card__experts-sub">Our Top Cardiology Specialists at Hippocare Hospital</p>
              <div className="card__experts-arrows">
                <button className="card__experts-arrow" onClick={() => setDocPage((p) => Math.max(p - 1, 0))} disabled={docPage === 0} aria-label="Previous">‹</button>
                <button className="card__experts-arrow" onClick={() => setDocPage((p) => Math.min(p + 1, totalPages - 1))} disabled={docPage === totalPages - 1} aria-label="Next">›</button>
              </div>
            </div>
            <div className="card__experts-track" style={{ transform: `translateX(-${docPage * 100}%)` }}>
              {expertDoctors.map((doc) => (
                <div className="card__expert-card" key={doc.id}>
                  <div className="card__expert-img-wrap">
                    <img src={doc.photo_url || ""} alt={doc.name} className="card__expert-img" />
                    <span className="card__expert-exp">{doc.experience || "—"}</span>
                  </div>
                  <div className="card__expert-body">
                    <span className="card__expert-partner">🏥 Hippocare Partner</span>
                    <h3 className="card__expert-name" onClick={() => navigate(`/doctor/${doc.id}`)} style={{ cursor: "pointer" }}>{doc.name}</h3>
                    <p className="card__expert-spec">{doc.specialization}</p>
                    <div className="card__expert-stats">
                      <span>👍 {doc.recommended} Recommended</span>
                    </div>
                    <div className="card__expert-fee">Consultation Fee: <strong>{doc.consultation_fee ? `₹${doc.consultation_fee}` : "—"}</strong></div>
                    <div className="card__expert-actions">
                      <button className="card__expert-cta" onClick={() => {
                        const role = localStorage.getItem("hmsRole");
                        if (role === "patient") {
                          navigate(`/patient/book?doctor=${doc.id}`);
                        } else {
                          navigate(`/login?redirect=/patient/book&doctor=${doc.id}`);
                        }
                      }}>📅 Book Appointment</button>
                      <button className="card__expert-profile" onClick={() => navigate(`/doctor/${doc.id}`)}>View Profile</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <article className="card__content-box">
            <h2>About This Department</h2>
            <div className="card__section">
              <h3 className="card__section-title">🏛️ Department Overview</h3>
              <p>The Cardiology Department is one of Hippocare's flagship centres, equipped with a dedicated cath lab, cardiac ICU (CCU), and outpatient heart clinic serving hundreds of patients monthly.</p>
              <div className={`card__section-expand ${expanded.overview?"card__section-expand--open":""}`}><p>Led by interventional cardiologists with over 20 years of experience, the department handles the full spectrum of cardiac care — from routine consultations to emergency primary PCI and complex device implantations.</p></div>
              <button className="card__read-more" onClick={()=>toggle("overview")}>{expanded.overview?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="card__section">
              <h3 className="card__section-title">👨‍⚕️ Our Cardiologists</h3>
              <p>Our team includes interventional cardiologists, electrophysiologists, and cardiac imaging specialists who collaborate to deliver comprehensive heart care based on the latest guidelines.</p>
              <div className={`card__section-expand ${expanded.team?"card__section-expand--open":""}`}><p>All cardiologists participate in national and international conferences, clinical research, and peer-reviewed publications. This commitment to academic excellence directly translates to better patient outcomes.</p></div>
              <button className="card__read-more" onClick={()=>toggle("team")}>{expanded.team?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="card__section">
              <h3 className="card__section-title">💻 HMS Integration</h3>
              <p>All cardiac investigations, reports, and prescriptions are digitally stored in the Hospital Management System, enabling seamless access and follow-up for patients and referring physicians.</p>
              <div className={`card__section-expand ${expanded.hms?"card__section-expand--open":""}`}><p>Patients can view their ECG reports, echo results, and discharge summaries through the patient portal. Automated alerts remind patients of medication schedules and follow-up appointments.</p></div>
              <button className="card__read-more" onClick={()=>toggle("hms")}>{expanded.hms?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Cardiology;
