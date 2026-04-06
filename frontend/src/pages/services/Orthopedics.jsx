import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import { supabase } from "../../lib/supabaseClient";
import DeptNav from "../../components/DeptNav";
import "./Orthopedics.css";

const sliderImages = ["/images/orthopedics-1.jpg","/images/orthopedics-2.jpg","/images/orthopedics-3.jpg"];

const Orthopedics = () => {
  const [expertDoctors, setExpertDoctors] = useState([]);
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [docPage, setDocPage] = useState(0);
  const navigate = useNavigate();
  const docsPerView = 2;
  const totalPages = Math.ceil(expertDoctors.length / docsPerView);
  useEffect(() => { const t = setInterval(() => setSlide((p) => (p + 1) % sliderImages.length), 3500); return () => clearInterval(t); }, []);
  useEffect(() => { supabase.from("doctors").select("*").eq("department", "Orthopedics").then(({ data }) => setExpertDoctors(data || [])); }, []);
  const toggle = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="orth">
      <nav className="orth__nav"><div className="orth__nav-inner"><Link to="/" className="orth__brand"><img src={hippocareLogo} alt="Hippocare" className="orth__logo" /><span>Hippocare Hospital</span></Link><div className="orth__nav-links"><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/login">Login</Link></div></div></nav>

      <header className="orth__banner"><div className="orth__banner-overlay" /><div className="orth__banner-content"><h1>Orthopedics</h1><p className="orth__breadcrumb"><Link to="/">Home</Link><span>/</span>Services<span>/</span>Orthopedics</p></div></header>

      <DeptNav />

      <section className="orth__main">
        <div className="orth__left">
          <div className="orth__slider">
            {sliderImages.map((src, i) => (<img key={i} src={src} alt={`Orthopedics ${i+1}`} className={`orth__slide ${i===slide?"orth__slide--active":""}`} />))}
            <div className="orth__brand-overlay"><span className="orth__brand-overlay-text">Hippocare Hospital</span></div>
            <div className="orth__dots">{sliderImages.map((_,i) => (<button key={i} className={`orth__dot ${i===slide?"orth__dot--active":""}`} onClick={()=>setSlide(i)} aria-label={`Slide ${i+1}`} />))}</div>
          </div>

          <article className="orth__content-box">
            <h2>Orthopedics Department</h2>
            <div className="orth__section">
              <h3 className="orth__section-title">🦴 Comprehensive Musculoskeletal Care</h3>
              <p>Our Orthopedics department provides comprehensive musculoskeletal care ranging from fracture treatment to complex joint replacement surgeries. We use minimally invasive techniques wherever possible.</p>
              <div className={`orth__section-expand ${expanded.msk?"orth__section-expand--open":""}`}><p>Our surgeons are skilled in arthroscopy, spinal surgery, trauma care, and pediatric orthopedics. We treat conditions like arthritis, ligament tears, spinal disorders, and sports injuries with precision and compassion.</p></div>
              <button className="orth__read-more" onClick={()=>toggle("msk")}>{expanded.msk?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="orth__section">
              <h3 className="orth__section-title">🏥 Joint Replacement Surgery</h3>
              <p>We specialize in total knee replacement, total hip replacement, and revision arthroplasty using the latest implant technology and computer-assisted navigation for precision alignment.</p>
              <div className={`orth__section-expand ${expanded.joint?"orth__section-expand--open":""}`}><p>Our joint replacement outcomes are benchmarked against international standards. Patients benefit from rapid recovery protocols, early mobilization, and dedicated physiotherapy that gets them back on their feet within days of surgery.</p></div>
              <button className="orth__read-more" onClick={()=>toggle("joint")}>{expanded.joint?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="orth__section">
              <h3 className="orth__section-title">🔬 Arthroscopy & Minimally Invasive Surgery</h3>
              <p>Our arthroscopic surgery program treats knee, shoulder, and ankle joint problems through keyhole procedures — resulting in smaller incisions, less pain, and faster recovery.</p>
              <div className={`orth__section-expand ${expanded.arthro?"orth__section-expand--open":""}`}><p>Common procedures include ACL reconstruction, meniscus repair, rotator cuff repair, and labral surgery. High-definition arthroscopic equipment allows our surgeons to visualize and treat intra-articular pathology with exceptional precision.</p></div>
              <button className="orth__read-more" onClick={()=>toggle("arthro")}>{expanded.arthro?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="orth__section">
              <h3 className="orth__section-title">🦷 Spine Surgery & Disc Treatment</h3>
              <p>Our spine unit handles disc prolapse, spinal stenosis, scoliosis, fractures, and degenerative conditions using microsurgical and endoscopic techniques for minimal tissue disruption.</p>
              <div className={`orth__section-expand ${expanded.spine?"orth__section-expand--open":""}`}><p>Spinal fusion, disc replacement, and minimally invasive decompression procedures are performed with intraoperative imaging guidance. Pain management specialists work alongside surgeons to provide comprehensive spine care.</p></div>
              <button className="orth__read-more" onClick={()=>toggle("spine")}>{expanded.spine?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="orth__section">
              <h3 className="orth__section-title">⚽ Sports Medicine</h3>
              <p>Our sports medicine clinic caters to athletes and active individuals with injuries related to muscles, tendons, ligaments, and bones, combining surgical and non-surgical approaches for optimal recovery.</p>
              <div className={`orth__section-expand ${expanded.sports?"orth__section-expand--open":""}`}><p>Services include PRP therapy, shockwave treatment, sports-specific rehabilitation, and injury prevention programs. We collaborate with physiotherapists and nutritionists to design comprehensive recovery plans.</p></div>
              <button className="orth__read-more" onClick={()=>toggle("sports")}>{expanded.sports?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="orth__section">
              <h3 className="orth__section-title">🏋️ Physiotherapy & Rehabilitation</h3>
              <p>Rehabilitation is a critical part of recovery. Our physiotherapy unit works closely with orthopedic surgeons to design personalized rehab plans that get patients back on their feet faster.</p>
              <div className={`orth__section-expand ${expanded.physio?"orth__section-expand--open":""}`}><p>Our rehab centre is equipped with advanced modalities including ultrasound therapy, electrical stimulation, hydrotherapy, and gait training facilities. Pre-surgical strengthening (prehab) programs are also offered to improve surgical outcomes.</p></div>
              <button className="orth__read-more" onClick={()=>toggle("physio")}>{expanded.physio?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>

          {/* ── Expert Doctors Carousel ── */}
          <section className="orth__experts">
            <div className="orth__experts-header">
              <h2>Expert Doctors</h2>
              <p className="orth__experts-sub">Our Top Orthopedic Specialists at Hippocare Hospital</p>
              <div className="orth__experts-arrows">
                <button className="orth__experts-arrow" onClick={() => setDocPage((p) => Math.max(p - 1, 0))} disabled={docPage === 0} aria-label="Previous">‹</button>
                <button className="orth__experts-arrow" onClick={() => setDocPage((p) => Math.min(p + 1, totalPages - 1))} disabled={docPage === totalPages - 1} aria-label="Next">›</button>
              </div>
            </div>
            <div className="orth__experts-track" style={{ transform: `translateX(-${docPage * 100}%)` }}>
              {expertDoctors.map((doc) => (
                <div className="orth__expert-card" key={doc.id}>
                  <div className="orth__expert-img-wrap">
                    <img src={doc.photo_url || ""} alt={doc.name} className="orth__expert-img" />
                    <span className="orth__expert-exp">{doc.experience || "—"}</span>
                  </div>
                  <div className="orth__expert-body">
                    <span className="orth__expert-partner">🏥 Hippocare Partner</span>
                    <h3 className="orth__expert-name" onClick={() => navigate(`/doctor/${doc.id}`)} style={{ cursor: "pointer" }}>{doc.name}</h3>
                    <p className="orth__expert-spec">{doc.specialization}</p>
                    <div className="orth__expert-stats"><span>👍 {doc.recommended} Recommended</span></div>
                    <div className="orth__expert-fee">Consultation Fee: <strong>{doc.consultation_fee ? `₹${doc.consultation_fee}` : "—"}</strong></div>
                    <div className="orth__expert-actions">
                      <button className="orth__expert-cta" onClick={() => { const role = localStorage.getItem("hmsRole"); if (role === "patient") { navigate(`/patient/book?doctor=${doc.id}`); } else { navigate(`/login?redirect=/patient/book&doctor=${doc.id}`); } }}>📅 Book Appointment</button>
                      <button className="orth__expert-profile" onClick={() => navigate(`/doctor/${doc.id}`)}>View Profile</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <article className="orth__content-box">
            <h2>About This Department</h2>
            <div className="orth__section">
              <h3 className="orth__section-title">🏛️ Department Overview</h3>
              <p>The Orthopedics Department at Hippocare is a high-volume centre performing over 200 surgeries monthly, including trauma fixations, joint replacements, and arthroscopic procedures.</p>
              <div className={`orth__section-expand ${expanded.overview?"orth__section-expand--open":""}`}><p>Led by senior orthopedic surgeons with international training, the department has dedicated OR suites, a trauma bay, and a rehabilitation centre. 24/7 emergency orthopedic coverage ensures immediate care for fractures and dislocations.</p></div>
              <button className="orth__read-more" onClick={()=>toggle("overview")}>{expanded.overview?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="orth__section">
              <h3 className="orth__section-title">👨‍⚕️ Our Surgeons</h3>
              <p>Our team includes fellowship-trained joint replacement surgeons, spine specialists, arthroscopy experts, and trauma surgeons who bring decades of collective experience.</p>
              <div className={`orth__section-expand ${expanded.team?"orth__section-expand--open":""}`}><p>Surgeons regularly attend international conferences, hands-on workshops, and cadaveric training programs to stay at the forefront of orthopedic innovation and technique.</p></div>
              <button className="orth__read-more" onClick={()=>toggle("team")}>{expanded.team?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="orth__section">
              <h3 className="orth__section-title">📋 Patient Journey</h3>
              <p>From initial consultation through surgery and rehabilitation, every step of the patient's orthopedic journey is tracked and managed through our digital HMS for complete transparency.</p>
              <div className={`orth__section-expand ${expanded.journey?"orth__section-expand--open":""}`}><p>Patients receive pre-operative counseling, surgical consent with animation-based explanations, and a detailed post-op care plan. Follow-up reminders and physiotherapy schedules are automated through the patient portal.</p></div>
              <button className="orth__read-more" onClick={()=>toggle("journey")}>{expanded.journey?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
export default Orthopedics;
