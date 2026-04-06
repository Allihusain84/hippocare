import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import { supabase } from "../../lib/supabaseClient";
import DeptNav from "../../components/DeptNav";
import "./Pediatrics.css";

const sliderImages = ["/images/pediatrics-1.jpg","/images/pediatrics-2.jpg","/images/pediatrics-3.jpg"];

const Pediatrics = () => {
  const [expertDoctors, setExpertDoctors] = useState([]);
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [docPage, setDocPage] = useState(0);
  const navigate = useNavigate();
  const docsPerView = 2;
  const totalPages = Math.ceil(expertDoctors.length / docsPerView);
  useEffect(() => { const t = setInterval(() => setSlide((p) => (p + 1) % sliderImages.length), 3500); return () => clearInterval(t); }, []);
  useEffect(() => { supabase.from("doctors").select("*").eq("department", "Pediatrics").then(({ data }) => setExpertDoctors(data || [])); }, []);
  const toggle = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="pedi">
      <nav className="pedi__nav"><div className="pedi__nav-inner"><Link to="/" className="pedi__brand"><img src={hippocareLogo} alt="Hippocare" className="pedi__logo" /><span>Hippocare Hospital</span></Link><div className="pedi__nav-links"><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/login">Login</Link></div></div></nav>
      <header className="pedi__banner"><div className="pedi__banner-overlay" /><div className="pedi__banner-content"><h1>Pediatrics</h1><p className="pedi__breadcrumb"><Link to="/">Home</Link><span>/</span>Services<span>/</span>Pediatrics</p></div></header>

      <DeptNav />

      <section className="pedi__main">
        <div className="pedi__left">
          <div className="pedi__slider">
            {sliderImages.map((src, i) => (<img key={i} src={src} alt={`Pediatrics ${i+1}`} className={`pedi__slide ${i===slide?"pedi__slide--active":""}`} />))}
            <div className="pedi__brand-overlay"><span className="pedi__brand-overlay-text">Hippocare Hospital</span></div>
            <div className="pedi__dots">{sliderImages.map((_,i) => (<button key={i} className={`pedi__dot ${i===slide?"pedi__dot--active":""}`} onClick={()=>setSlide(i)} aria-label={`Slide ${i+1}`} />))}</div>
          </div>

          <article className="pedi__content-box">
            <h2>Pediatrics Department</h2>
            <div className="pedi__section">
              <h3 className="pedi__section-title">👶 Specialized Child Healthcare</h3>
              <p>The Pediatrics department at Hippocare is dedicated to the health and well-being of infants, children, and adolescents. Our pediatricians provide compassionate care in a child-friendly environment.</p>
              <div className={`pedi__section-expand ${expanded.child?"pedi__section-expand--open":""}`}><p>We offer comprehensive services including newborn screening, immunization, growth and development assessment, and management of childhood illnesses like asthma, allergies, and infections with a focus on gentle, age-appropriate care.</p></div>
              <button className="pedi__read-more" onClick={()=>toggle("child")}>{expanded.child?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="pedi__section">
              <h3 className="pedi__section-title">🍼 Newborn & Well-Baby Care</h3>
              <p>Our neonatology team provides expert care for newborns including initial assessments, hearing screening, metabolic screening, and lactation counseling for new mothers.</p>
              <div className={`pedi__section-expand ${expanded.newborn?"pedi__section-expand--open":""}`}><p>Well-baby checkups are scheduled at regular intervals to monitor growth milestones, nutrition, and development. Any concerns are identified early and addressed with appropriate interventions.</p></div>
              <button className="pedi__read-more" onClick={()=>toggle("newborn")}>{expanded.newborn?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="pedi__section">
              <h3 className="pedi__section-title">💉 Vaccination & Immunization</h3>
              <p>We follow the Indian Academy of Pediatrics (IAP) immunization schedule and provide all recommended vaccines including optional ones for maximum protection of your child.</p>
              <div className={`pedi__section-expand ${expanded.vaccine?"pedi__section-expand--open":""}`}><p>Our vaccination clinic maintains strict cold-chain protocols and uses pre-filled syringes to ensure safety. Digital vaccination cards and SMS reminders for upcoming doses help parents stay on track.</p></div>
              <button className="pedi__read-more" onClick={()=>toggle("vaccine")}>{expanded.vaccine?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="pedi__section">
              <h3 className="pedi__section-title">🏥 NICU for Critical Newborns</h3>
              <p>Our Neonatal Intensive Care Unit (NICU) is equipped to handle premature births, low birth weight babies, and critically ill newborns with round-the-clock specialist supervision.</p>
              <div className={`pedi__section-expand ${expanded.nicu?"pedi__section-expand--open":""}`}><p>The NICU features incubators, phototherapy units, CPAP machines, and ventilators. A dedicated neonatologist leads the team, ensuring the highest survival and recovery rates for our tiniest patients.</p></div>
              <button className="pedi__read-more" onClick={()=>toggle("nicu")}>{expanded.nicu?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="pedi__section">
              <h3 className="pedi__section-title">📏 Growth & Development Monitoring</h3>
              <p>We track children's physical growth, motor skills, cognitive and language development against WHO standards to identify and address developmental delays early.</p>
              <div className={`pedi__section-expand ${expanded.growth?"pedi__section-expand--open":""}`}><p>Children flagged for developmental concerns are referred to occupational therapists, speech therapists, and child psychologists within the hospital for integrated management and support.</p></div>
              <button className="pedi__read-more" onClick={()=>toggle("growth")}>{expanded.growth?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="pedi__section">
              <h3 className="pedi__section-title">🧒 Adolescent Health Counseling</h3>
              <p>Our adolescent health clinic addresses nutrition, mental health, puberty concerns, screen addiction, and academic stress in teenagers through confidential and supportive consultations.</p>
              <div className={`pedi__section-expand ${expanded.adol?"pedi__section-expand--open":""}`}><p>Counseling sessions are conducted in a private, non-judgmental environment. Parents are involved in the care plan with the teen's consent, ensuring a balanced and family-centered approach.</p></div>
              <button className="pedi__read-more" onClick={()=>toggle("adol")}>{expanded.adol?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>

          {/* ── Expert Doctors Carousel ── */}
          <section className="pedi__experts">
            <div className="pedi__experts-header">
              <h2>Expert Doctors</h2>
              <p className="pedi__experts-sub">Our Top Pediatric Specialists at Hippocare Hospital</p>
              <div className="pedi__experts-arrows">
                <button className="pedi__experts-arrow" onClick={() => setDocPage((p) => Math.max(p - 1, 0))} disabled={docPage === 0} aria-label="Previous">‹</button>
                <button className="pedi__experts-arrow" onClick={() => setDocPage((p) => Math.min(p + 1, totalPages - 1))} disabled={docPage === totalPages - 1} aria-label="Next">›</button>
              </div>
            </div>
            <div className="pedi__experts-track" style={{ transform: `translateX(-${docPage * 100}%)` }}>
              {expertDoctors.map((doc) => (
                <div className="pedi__expert-card" key={doc.id}>
                  <div className="pedi__expert-img-wrap">
                    <img src={doc.photo_url || ""} alt={doc.name} className="pedi__expert-img" />
                    <span className="pedi__expert-exp">{doc.experience || "—"}</span>
                  </div>
                  <div className="pedi__expert-body">
                    <span className="pedi__expert-partner">🏥 Hippocare Partner</span>
                    <h3 className="pedi__expert-name" onClick={() => navigate(`/doctor/${doc.id}`)} style={{ cursor: "pointer" }}>{doc.name}</h3>
                    <p className="pedi__expert-spec">{doc.specialization}</p>
                    <div className="pedi__expert-stats"><span>👍 {doc.recommended} Recommended</span></div>
                    <div className="pedi__expert-fee">Consultation Fee: <strong>{doc.consultation_fee ? `₹${doc.consultation_fee}` : "—"}</strong></div>
                    <div className="pedi__expert-actions">
                      <button className="pedi__expert-cta" onClick={() => { const role = localStorage.getItem("hmsRole"); if (role === "patient") { navigate(`/patient/book?doctor=${doc.id}`); } else { navigate(`/login?redirect=/patient/book&doctor=${doc.id}`); } }}>📅 Book Appointment</button>
                      <button className="pedi__expert-profile" onClick={() => navigate(`/doctor/${doc.id}`)}>View Profile</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <article className="pedi__content-box">
            <h2>About This Department</h2>
            <div className="pedi__section">
              <h3 className="pedi__section-title">🏛️ Department Overview</h3>
              <p>The Pediatrics Department features child-friendly wards, a dedicated pediatric OPD, a play zone in the waiting area, and a state-of-the-art NICU — all designed to make hospital visits less stressful for children.</p>
              <div className={`pedi__section-expand ${expanded.overview?"pedi__section-expand--open":""}`}><p>Led by a senior pediatrician with over 18 years of experience, the team includes neonatologists, pediatric surgeons, and child psychologists who collaborate for holistic care.</p></div>
              <button className="pedi__read-more" onClick={()=>toggle("overview")}>{expanded.overview?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="pedi__section">
              <h3 className="pedi__section-title">👩‍⚕️ Our Pediatricians</h3>
              <p>Our team of board-certified pediatricians and trained nursing staff are experienced in handling everything from routine checkups to pediatric emergencies with gentle, empathetic care.</p>
              <div className={`pedi__section-expand ${expanded.team?"pedi__section-expand--open":""}`}><p>Regular training in Pediatric Advanced Life Support (PALS) and neonatal resuscitation ensures our team is prepared for any emergency situation involving children.</p></div>
              <button className="pedi__read-more" onClick={()=>toggle("team")}>{expanded.team?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="pedi__section">
              <h3 className="pedi__section-title">🎯 Pediatric Emergency</h3>
              <p>24/7 pediatric emergency services are available with age-appropriate equipment, medications, and trained staff to handle convulsions, breathing difficulties, injuries, and acute infections in children.</p>
              <div className={`pedi__section-expand ${expanded.emergency?"pedi__section-expand--open":""}`}><p>A dedicated pediatric triage system ensures critical cases are identified and treated immediately. Parents are kept informed at every step to reduce anxiety during emergencies.</p></div>
              <button className="pedi__read-more" onClick={()=>toggle("emergency")}>{expanded.emergency?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
export default Pediatrics;
