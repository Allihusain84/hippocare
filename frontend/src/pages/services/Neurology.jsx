import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import { getDoctorPhoto } from "../../utils/getDoctorPhoto";
import { applyDoctorOverrides, getAdminDoctorsForDept } from "../../utils/getDoctorData";
import DeptNav from "../../components/DeptNav";
import "./Neurology.css";

const sliderImages = ["/images/neurology-1.jpg","/images/neurology-2.jpg","/images/neurology-3.jpg"];

const _rawExperts = [
  { id: "dr-sandeep-kumar-neuro", name: "Dr. Sandeep Kumar", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", specialization: "Stroke & Epileptology", experience: "20+", recommended: "100%", fee: "₹1400" },
  { id: "dr-meera-patel-neuro", name: "Dr. Meera Patel", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", specialization: "Movement Disorders", experience: "14+", recommended: "98%", fee: "₹1200" },
  { id: "dr-amit-tiwari-neuro", name: "Dr. Amit Tiwari", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80", specialization: "Headache & Neuro-Rehabilitation", experience: "11+", recommended: "97%", fee: "₹1000" },
  { id: "dr-ritu-verma-neuro", name: "Dr. Ritu Verma", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", specialization: "Pediatric Neurology", experience: "13+", recommended: "98%", fee: "₹1100" },
];

const Neurology = () => {
  const expertDoctors = [...applyDoctorOverrides(_rawExperts), ...getAdminDoctorsForDept("Neurology")];
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [docPage, setDocPage] = useState(0);
  const navigate = useNavigate();
  const docsPerView = 2;
  const totalPages = Math.ceil(expertDoctors.length / docsPerView);
  useEffect(() => { const t = setInterval(() => setSlide((p) => (p + 1) % sliderImages.length), 3500); return () => clearInterval(t); }, []);
  const toggle = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="neur">
      <nav className="neur__nav"><div className="neur__nav-inner"><Link to="/" className="neur__brand"><img src={hippocareLogo} alt="Hippocare" className="neur__logo" /><span>Hippocare Hospital</span></Link><div className="neur__nav-links"><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/login">Login</Link></div></div></nav>
      <header className="neur__banner"><div className="neur__banner-overlay" /><div className="neur__banner-content"><h1>Neurology</h1><p className="neur__breadcrumb"><Link to="/">Home</Link><span>/</span>Services<span>/</span>Neurology</p></div></header>

      <DeptNav />

      <section className="neur__main">
        <div className="neur__left">
          <div className="neur__slider">
            {sliderImages.map((src, i) => (<img key={i} src={src} alt={`Neurology ${i+1}`} className={`neur__slide ${i===slide?"neur__slide--active":""}`} />))}
            <div className="neur__brand-overlay"><span className="neur__brand-overlay-text">Hippocare Hospital</span></div>
            <div className="neur__dots">{sliderImages.map((_,i) => (<button key={i} className={`neur__dot ${i===slide?"neur__dot--active":""}`} onClick={()=>setSlide(i)} aria-label={`Slide ${i+1}`} />))}</div>
          </div>

          <article className="neur__content-box">
            <h2>Neurology Department</h2>
            <div className="neur__section">
              <h3 className="neur__section-title">🧠 Comprehensive Neurological Care</h3>
              <p>Our Neurology department offers expert diagnosis and treatment of disorders affecting the brain, spinal cord, and peripheral nerves — from common headaches to complex neurological conditions.</p>
              <div className={`neur__section-expand ${expanded.care?"neur__section-expand--open":""}`}><p>Equipped with advanced neurology labs and imaging technologies, we deliver precise diagnostics and individualized treatment plans for patients of all ages with neurological concerns.</p></div>
              <button className="neur__read-more" onClick={()=>toggle("care")}>{expanded.care?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="neur__section">
              <h3 className="neur__section-title">⚡ Stroke Care & Management</h3>
              <p>Our stroke-ready unit provides rapid evaluation and thrombolytic therapy within the critical golden-hour window, significantly improving survival and recovery outcomes for stroke patients.</p>
              <div className={`neur__section-expand ${expanded.stroke?"neur__section-expand--open":""}`}><p>A multidisciplinary stroke team comprising neurologists, neuro-interventional radiologists, and rehabilitation specialists ensures end-to-end management from acute care through long-term recovery.</p></div>
              <button className="neur__read-more" onClick={()=>toggle("stroke")}>{expanded.stroke?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="neur__section">
              <h3 className="neur__section-title">🔍 Epilepsy Evaluation & Treatment</h3>
              <p>We provide thorough epilepsy workup including video EEG monitoring, brain MRI, and anti-epileptic drug optimization to achieve seizure freedom or maximum control for patients.</p>
              <div className={`neur__section-expand ${expanded.epilepsy?"neur__section-expand--open":""}`}><p>For medically refractory epilepsy, our team evaluates surgical candidacy and coordinates with epilepsy surgery centers to offer the best possible outcomes, including vagus nerve stimulation.</p></div>
              <button className="neur__read-more" onClick={()=>toggle("epilepsy")}>{expanded.epilepsy?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="neur__section">
              <h3 className="neur__section-title">📊 EEG, NCS & EMG Studies</h3>
              <p>Our neurodiagnostic lab offers electroencephalography (EEG), nerve conduction studies (NCS), and electromyography (EMG) performed by trained technicians and interpreted by neurologists.</p>
              <div className={`neur__section-expand ${expanded.eeg?"neur__section-expand--open":""}`}><p>These tests are essential for diagnosing epilepsy, neuropathies, carpal tunnel syndrome, Guillain-Barré syndrome, and myasthenia gravis. Results are typically available within 24 hours.</p></div>
              <button className="neur__read-more" onClick={()=>toggle("eeg")}>{expanded.eeg?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="neur__section">
              <h3 className="neur__section-title">🧬 Parkinson's & Movement Disorders</h3>
              <p>Our movement disorder specialists manage Parkinson's disease, essential tremor, dystonia, and other movement abnormalities with medication optimization and advanced therapeutic strategies.</p>
              <div className={`neur__section-expand ${expanded.parkinsons?"neur__section-expand--open":""}`}><p>Regular follow-up protocols ensure timely dose adjustments and early detection of motor complications. We also coordinate deep brain stimulation (DBS) referrals when appropriate.</p></div>
              <button className="neur__read-more" onClick={()=>toggle("parkinsons")}>{expanded.parkinsons?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="neur__section">
              <h3 className="neur__section-title">💊 Migraine & Headache Clinic</h3>
              <p>Our dedicated headache clinic treats chronic migraines, tension-type headaches, cluster headaches, and secondary headaches with evidence-based pharmacological and non-pharmacological approaches.</p>
              <div className={`neur__section-expand ${expanded.migraine?"neur__section-expand--open":""}`}><p>Preventive medications, Botox therapy for chronic migraines, lifestyle counseling, and biofeedback techniques are all available. We also screen for underlying causes with brain imaging as needed.</p></div>
              <button className="neur__read-more" onClick={()=>toggle("migraine")}>{expanded.migraine?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>

          {/* ── Expert Doctors Carousel ── */}
          <section className="neur__experts">
            <div className="neur__experts-header">
              <h2>Expert Doctors</h2>
              <p className="neur__experts-sub">Our Top Neurology Specialists at Hippocare Hospital</p>
              <div className="neur__experts-arrows">
                <button className="neur__experts-arrow" onClick={() => setDocPage((p) => Math.max(p - 1, 0))} disabled={docPage === 0} aria-label="Previous">‹</button>
                <button className="neur__experts-arrow" onClick={() => setDocPage((p) => Math.min(p + 1, totalPages - 1))} disabled={docPage === totalPages - 1} aria-label="Next">›</button>
              </div>
            </div>
            <div className="neur__experts-track" style={{ transform: `translateX(-${docPage * 100}%)` }}>
              {expertDoctors.map((doc) => (
                <div className="neur__expert-card" key={doc.id}>
                  <div className="neur__expert-img-wrap">
                    <img src={getDoctorPhoto(doc.id, doc.photo)} alt={doc.name} className="neur__expert-img" />
                    <span className="neur__expert-exp">{doc.experience} Yrs Exp.</span>
                  </div>
                  <div className="neur__expert-body">
                    <span className="neur__expert-partner">🏥 Hippocare Partner</span>
                    <h3 className="neur__expert-name" onClick={() => navigate(`/doctor/${doc.id}`)} style={{ cursor: "pointer" }}>{doc.name}</h3>
                    <p className="neur__expert-spec">{doc.specialization}</p>
                    <div className="neur__expert-stats"><span>👍 {doc.recommended} Recommended</span></div>
                    <div className="neur__expert-fee">Consultation Fee: <strong>{doc.fee}</strong></div>
                    <div className="neur__expert-actions">
                      <button className="neur__expert-cta" onClick={() => { const role = localStorage.getItem("hmsRole"); if (role === "patient") { navigate(`/patient/book?doctor=${doc.id}`); } else { navigate(`/login?redirect=/patient/book&doctor=${doc.id}`); } }}>📅 Book Appointment</button>
                      <button className="neur__expert-profile" onClick={() => navigate(`/doctor/${doc.id}`)}>View Profile</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <article className="neur__content-box">
            <h2>About This Department</h2>
            <div className="neur__section">
              <h3 className="neur__section-title">🏛️ Neuro-Rehabilitation Program</h3>
              <p>Our neuro-rehabilitation team provides physiotherapy, occupational therapy, and speech therapy for patients recovering from stroke, head injury, or other neurological conditions.</p>
              <div className={`neur__section-expand ${expanded.rehab?"neur__section-expand--open":""}`}><p>Goal-oriented rehabilitation programs help patients regain mobility, speech, and cognitive function. Family education and home exercise training are integral to our discharge planning.</p></div>
              <button className="neur__read-more" onClick={()=>toggle("rehab")}>{expanded.rehab?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="neur__section">
              <h3 className="neur__section-title">👨‍⚕️ Our Team</h3>
              <p>Led by senior neurologists with over 20 years of experience, our department includes specialists in stroke, epilepsy, movement disorders, and pediatric neurology.</p>
              <div className={`neur__section-expand ${expanded.team?"neur__section-expand--open":""}`}><p>The department participates in continuing medical education, clinical research, and neurology awareness programs to stay at the forefront of neurological care.</p></div>
              <button className="neur__read-more" onClick={()=>toggle("team")}>{expanded.team?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="neur__section">
              <h3 className="neur__section-title">🧪 Research & Innovation</h3>
              <p>Our neurologists actively participate in clinical trials and collaborate with leading research institutions to bring the latest treatments and technologies to our patients.</p>
              <div className={`neur__section-expand ${expanded.research?"neur__section-expand--open":""}`}><p>Areas of active research include neuroprotection in stroke, biomarkers for early Alzheimer's detection, and novel anti-epileptic drug regimens for drug-resistant epilepsy.</p></div>
              <button className="neur__read-more" onClick={()=>toggle("research")}>{expanded.research?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
export default Neurology;
