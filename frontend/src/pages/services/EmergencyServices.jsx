import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import DeptNav from "../../components/DeptNav";
import "./EmergencyServices.css";

const sliderImages = ["/images/emergency-services-1.jpg","/images/emergency-services-2.jpg","/images/emergency-services-3.jpg"];


const EmergencyServices = () => {
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  useEffect(() => { const t = setInterval(() => setSlide((p) => (p + 1) % sliderImages.length), 3500); return () => clearInterval(t); }, []);
  const toggle = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="emer">
      <nav className="emer__nav"><div className="emer__nav-inner"><Link to="/" className="emer__brand"><img src={hippocareLogo} alt="Hippocare" className="emer__logo" /><span>Hippocare Hospital</span></Link><div className="emer__nav-links"><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/login">Login</Link></div></div></nav>
      <header className="emer__banner"><div className="emer__banner-overlay" /><div className="emer__banner-content"><h1>Emergency Services</h1><p className="emer__breadcrumb"><Link to="/">Home</Link><span>/</span>Services<span>/</span>Emergency Services</p></div></header>

      <DeptNav />

      <section className="emer__main">
        <div className="emer__left">
          <div className="emer__slider">
            {sliderImages.map((src, i) => (<img key={i} src={src} alt={`Emergency ${i+1}`} className={`emer__slide ${i===slide?"emer__slide--active":""}`} />))}
            <div className="emer__brand-overlay"><span className="emer__brand-overlay-text">Hippocare Hospital</span></div>
            <div className="emer__dots">{sliderImages.map((_,i) => (<button key={i} className={`emer__dot ${i===slide?"emer__dot--active":""}`} onClick={()=>setSlide(i)} aria-label={`Slide ${i+1}`} />))}</div>
          </div>

          <article className="emer__content-box">
            <h2>Emergency Services Department</h2>
            <div className="emer__section">
              <h3 className="emer__section-title">🚨 24/7 Emergency Department</h3>
              <p>Our Emergency Department operates round-the-clock, 365 days a year, with a dedicated team of emergency physicians, trauma surgeons, and critical care nurses ready to handle any medical emergency.</p>
              <div className={`emer__section-expand ${expanded.dept?"emer__section-expand--open":""}`}><p>The department features a fully equipped resuscitation bay, observation ward, minor procedure room, and point-of-care testing facility to ensure rapid diagnosis and treatment of all emergencies.</p></div>
              <button className="emer__read-more" onClick={()=>toggle("dept")}>{expanded.dept?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="emer__section">
              <h3 className="emer__section-title">🏥 Advanced Trauma Life Support</h3>
              <p>Our trauma team is ATLS-certified and trained to manage polytrauma cases including road traffic accidents, falls, assault injuries, and industrial accidents with systematic, life-saving protocols.</p>
              <div className={`emer__section-expand ${expanded.atls?"emer__section-expand--open":""}`}><p>Primary and secondary surveys follow international guidelines. Emergency surgical backup, blood bank support, and ICU admission pathways are available on standby at all times.</p></div>
              <button className="emer__read-more" onClick={()=>toggle("atls")}>{expanded.atls?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="emer__section">
              <h3 className="emer__section-title">❤️ Cardiac Emergency & Code Blue</h3>
              <p>Chest pain evaluation with immediate ECG, cardiac enzymes, and emergency thrombolysis is available. Our Code Blue team responds within minutes to cardiac arrest calls anywhere in the hospital.</p>
              <div className={`emer__section-expand ${expanded.cardiac?"emer__section-expand--open":""}`}><p>Defibrillators, crash carts, and ACLS-trained staff are stationed across the hospital. Post-resuscitation care includes ICU transfer and cardiology consultation for definitive management.</p></div>
              <button className="emer__read-more" onClick={()=>toggle("cardiac")}>{expanded.cardiac?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="emer__section">
              <h3 className="emer__section-title">🔰 Triage & Rapid Assessment</h3>
              <p>All patients are triaged on arrival using an internationally recognized color-coded system to prioritize treatment based on clinical severity — ensuring critical patients receive immediate attention.</p>
              <div className={`emer__section-expand ${expanded.triage?"emer__section-expand--open":""}`}><p>Dedicated triage nurses perform rapid vital sign assessment, symptom screening, and risk stratification. Fast-track pathways are available for non-critical patients to reduce wait times.</p></div>
              <button className="emer__read-more" onClick={()=>toggle("triage")}>{expanded.triage?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="emer__section">
              <h3 className="emer__section-title">🚑 Ambulance Coordination</h3>
              <p>Our emergency helpline coordinates ambulance dispatch with GPS-tracked vehicles equipped with cardiac monitors, oxygen, and basic life support equipment for safe patient transport.</p>
              <div className={`emer__section-expand ${expanded.ambulance?"emer__section-expand--open":""}`}><p>Pre-hospital care protocols ensure the receiving team is prepared before the patient arrives. Tele-consultation with the ER physician during transit allows early treatment initiation.</p></div>
              <button className="emer__read-more" onClick={()=>toggle("ambulance")}>{expanded.ambulance?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="emer__section">
              <h3 className="emer__section-title">🧒 Pediatric & Obstetric Emergencies</h3>
              <p>Specialized protocols for neonatal emergencies, pediatric resuscitation, and obstetric crises like eclampsia or postpartum hemorrhage are in place with trained specialists available on call.</p>
              <div className={`emer__section-expand ${expanded.pedia?"emer__section-expand--open":""}`}><p>The emergency department has separate pediatric assessment bays and neonatal stabilization units to provide age-appropriate care in a child-friendly environment.</p></div>
              <button className="emer__read-more" onClick={()=>toggle("pedia")}>{expanded.pedia?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>

          <article className="emer__content-box">
            <h2>About This Department</h2>
            <div className="emer__section">
              <h3 className="emer__section-title">🏛️ Disaster & Mass Casualty Preparedness</h3>
              <p>Our hospital has a comprehensive disaster management plan with regular drills, stockpiled emergency supplies, and surge capacity protocols to handle mass casualty incidents effectively.</p>
              <div className={`emer__section-expand ${expanded.disaster?"emer__section-expand--open":""}`}><p>Coordination with local authorities, fire services, and police ensures a seamless multi-agency response during major incidents. Decontamination facilities are available for hazmat situations.</p></div>
              <button className="emer__read-more" onClick={()=>toggle("disaster")}>{expanded.disaster?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="emer__section">
              <h3 className="emer__section-title">👨‍⚕️ Our Team</h3>
              <p>Led by senior emergency medicine consultants, our team includes ER physicians, trauma surgeons, anesthesiologists, and specially trained emergency nurses available 24/7.</p>
              <div className={`emer__section-expand ${expanded.team?"emer__section-expand--open":""}`}><p>All emergency staff undergo regular skill drills, BLS/ACLS recertification, and simulation-based training to maintain the highest readiness for any emergency scenario.</p></div>
              <button className="emer__read-more" onClick={()=>toggle("team")}>{expanded.team?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="emer__section">
              <h3 className="emer__section-title">📞 Emergency Helpline</h3>
              <p>Call our 24/7 emergency helpline for immediate assistance. Our trained operators coordinate ambulance dispatch, guide first-aid over the phone, and alert the ER team for arrivals.</p>
              <div className={`emer__section-expand ${expanded.helpline?"emer__section-expand--open":""}`}><p>The helpline also assists with inter-hospital transfers, providing bed availability updates and coordinating critical patient transport with advanced life support ambulances.</p></div>
              <button className="emer__read-more" onClick={()=>toggle("helpline")}>{expanded.helpline?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
export default EmergencyServices;
