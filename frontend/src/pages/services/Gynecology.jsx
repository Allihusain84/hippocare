import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import { getDoctorPhoto } from "../../utils/getDoctorPhoto";
import { applyDoctorOverrides, getAdminDoctorsForDept } from "../../utils/getDoctorData";
import DeptNav from "../../components/DeptNav";
import "./Gynecology.css";

const sliderImages = ["/images/gynecology-1.jpg","/images/gynecology-2.jpg","/images/gynecology-3.jpg"];

const _rawExperts = [
  { id: "dr-sunita-agarwal", name: "Dr. Sunita Agarwal", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", specialization: "High-Risk Pregnancy", experience: "22+", recommended: "100%", fee: "₹1200" },
  { id: "dr-kavita-singh-gyne", name: "Dr. Kavita Singh", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", specialization: "Infertility Treatment", experience: "14+", recommended: "98%", fee: "₹1000" },
  { id: "dr-rekha-yadav-gyne", name: "Dr. Rekha Yadav", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", specialization: "Gynecologic Oncology", experience: "16+", recommended: "99%", fee: "₹1300" },
  { id: "dr-deepika-chaudhary-gyne", name: "Dr. Deepika Chaudhary", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", specialization: "Obstetrics & Adolescent Health", experience: "10+", recommended: "97%", fee: "₹800" },
];

const Gynecology = () => {
  const expertDoctors = [...applyDoctorOverrides(_rawExperts), ...getAdminDoctorsForDept("Gynecology")];
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [docPage, setDocPage] = useState(0);
  const navigate = useNavigate();
  const docsPerView = 2;
  const totalPages = Math.ceil(expertDoctors.length / docsPerView);
  useEffect(() => { const t = setInterval(() => setSlide((p) => (p + 1) % sliderImages.length), 3500); return () => clearInterval(t); }, []);
  const toggle = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="gyne">
      <nav className="gyne__nav"><div className="gyne__nav-inner"><Link to="/" className="gyne__brand"><img src={hippocareLogo} alt="Hippocare" className="gyne__logo" /><span>Hippocare Hospital</span></Link><div className="gyne__nav-links"><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/login">Login</Link></div></div></nav>
      <header className="gyne__banner"><div className="gyne__banner-overlay" /><div className="gyne__banner-content"><h1>Gynecology</h1><p className="gyne__breadcrumb"><Link to="/">Home</Link><span>/</span>Services<span>/</span>Gynecology</p></div></header>

      <DeptNav />

      <section className="gyne__main">
        <div className="gyne__left">
          <div className="gyne__slider">
            {sliderImages.map((src, i) => (<img key={i} src={src} alt={`Gynecology ${i+1}`} className={`gyne__slide ${i===slide?"gyne__slide--active":""}`} />))}
            <div className="gyne__brand-overlay"><span className="gyne__brand-overlay-text">Hippocare Hospital</span></div>
            <div className="gyne__dots">{sliderImages.map((_,i) => (<button key={i} className={`gyne__dot ${i===slide?"gyne__dot--active":""}`} onClick={()=>setSlide(i)} aria-label={`Slide ${i+1}`} />))}</div>
          </div>

          <article className="gyne__content-box">
            <h2>Gynecology & Obstetrics Department</h2>
            <div className="gyne__section">
              <h3 className="gyne__section-title">🤰 Complete Women's Healthcare</h3>
              <p>Our Gynecology & Obstetrics department provides holistic care for women at every stage of life. From routine screenings to high-risk pregnancy management, we prioritize safety and comfort.</p>
              <div className={`gyne__section-expand ${expanded.women?"gyne__section-expand--open":""}`}><p>Every woman deserves personalized, respectful healthcare — and that's exactly what our dedicated team delivers. Our consultants ensure privacy, dignity, and compassion in every interaction.</p></div>
              <button className="gyne__read-more" onClick={()=>toggle("women")}>{expanded.women?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="gyne__section">
              <h3 className="gyne__section-title">🍼 Prenatal & Postnatal Care</h3>
              <p>We provide comprehensive pregnancy care including regular antenatal checkups, ultrasound monitoring, nutritional guidance, and high-risk pregnancy management for mothers and babies.</p>
              <div className={`gyne__section-expand ${expanded.prenatal?"gyne__section-expand--open":""}`}><p>Our maternity suite offers a comfortable and hygienic environment for delivery and recovery. Postnatal services include breastfeeding support, newborn care education, and postpartum mental health screening.</p></div>
              <button className="gyne__read-more" onClick={()=>toggle("prenatal")}>{expanded.prenatal?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="gyne__section">
              <h3 className="gyne__section-title">🏥 Normal & Cesarean Deliveries</h3>
              <p>Our experienced obstetricians perform both normal vaginal deliveries and cesarean sections in well-equipped labor rooms and operation theatres with round-the-clock emergency readiness.</p>
              <div className={`gyne__section-expand ${expanded.delivery?"gyne__section-expand--open":""}`}><p>We encourage natural birth wherever safe and support mothers with pain management options including epidural analgesia. Emergency C-section capability ensures rapid response when complications arise.</p></div>
              <button className="gyne__read-more" onClick={()=>toggle("delivery")}>{expanded.delivery?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="gyne__section">
              <h3 className="gyne__section-title">🔬 Fertility Assessment & Treatment</h3>
              <p>Our fertility clinic offers comprehensive evaluation and treatment for couples facing difficulty conceiving, including hormonal testing, ovulation induction, and referral for IVF when needed.</p>
              <div className={`gyne__section-expand ${expanded.fertility?"gyne__section-expand--open":""}`}><p>Both partners are assessed to identify the root cause. Treatment plans are individualized and may include medication, lifestyle modifications, minor procedures, or assisted reproduction techniques.</p></div>
              <button className="gyne__read-more" onClick={()=>toggle("fertility")}>{expanded.fertility?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="gyne__section">
              <h3 className="gyne__section-title">🔧 Laparoscopic Gynecological Surgery</h3>
              <p>We perform advanced laparoscopic surgeries for fibroids, ovarian cysts, endometriosis, ectopic pregnancy, and hysterectomy with minimal scarring and faster recovery.</p>
              <div className={`gyne__section-expand ${expanded.laparo?"gyne__section-expand--open":""}`}><p>Our surgeons use HD laparoscopy and energy devices that allow precise tissue handling. Most patients are discharged within 24–48 hours and resume normal activity within a week.</p></div>
              <button className="gyne__read-more" onClick={()=>toggle("laparo")}>{expanded.laparo?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="gyne__section">
              <h3 className="gyne__section-title">🌸 Menopause Care & Counseling</h3>
              <p>Our menopause clinic helps women navigate hormonal changes with symptom management, bone density screening, cardiac risk assessment, and lifestyle counseling for a healthy transition.</p>
              <div className={`gyne__section-expand ${expanded.meno?"gyne__section-expand--open":""}`}><p>Hormone replacement therapy (HRT) is offered when clinically appropriate, with regular monitoring. Nutritional and exercise guidance helps maintain bone and heart health during and after menopause.</p></div>
              <button className="gyne__read-more" onClick={()=>toggle("meno")}>{expanded.meno?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>

          {/* ── Expert Doctors Carousel ── */}
          <section className="gyne__experts">
            <div className="gyne__experts-header">
              <h2>Expert Doctors</h2>
              <p className="gyne__experts-sub">Our Top Gynecology Specialists at Hippocare Hospital</p>
              <div className="gyne__experts-arrows">
                <button className="gyne__experts-arrow" onClick={() => setDocPage((p) => Math.max(p - 1, 0))} disabled={docPage === 0} aria-label="Previous">‹</button>
                <button className="gyne__experts-arrow" onClick={() => setDocPage((p) => Math.min(p + 1, totalPages - 1))} disabled={docPage === totalPages - 1} aria-label="Next">›</button>
              </div>
            </div>
            <div className="gyne__experts-track" style={{ transform: `translateX(-${docPage * 100}%)` }}>
              {expertDoctors.map((doc) => (
                <div className="gyne__expert-card" key={doc.id}>
                  <div className="gyne__expert-img-wrap">
                    <img src={getDoctorPhoto(doc.id, doc.photo)} alt={doc.name} className="gyne__expert-img" />
                    <span className="gyne__expert-exp">{doc.experience} Yrs Exp.</span>
                  </div>
                  <div className="gyne__expert-body">
                    <span className="gyne__expert-partner">🏥 Hippocare Partner</span>
                    <h3 className="gyne__expert-name" onClick={() => navigate(`/doctor/${doc.id}`)} style={{ cursor: "pointer" }}>{doc.name}</h3>
                    <p className="gyne__expert-spec">{doc.specialization}</p>
                    <div className="gyne__expert-stats"><span>👍 {doc.recommended} Recommended</span></div>
                    <div className="gyne__expert-fee">Consultation Fee: <strong>{doc.fee}</strong></div>
                    <div className="gyne__expert-actions">
                      <button className="gyne__expert-cta" onClick={() => { const role = localStorage.getItem("hmsRole"); if (role === "patient") { navigate(`/patient/book?doctor=${doc.id}`); } else { navigate(`/login?redirect=/patient/book&doctor=${doc.id}`); } }}>📅 Book Appointment</button>
                      <button className="gyne__expert-profile" onClick={() => navigate(`/doctor/${doc.id}`)}>View Profile</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <article className="gyne__content-box">
            <h2>About This Department</h2>
            <div className="gyne__section">
              <h3 className="gyne__section-title">🏛️ Department Overview</h3>
              <p>The Gynecology & Obstetrics department features dedicated labor rooms, a maternity ward, outpatient clinics, and a fully equipped OT for gynecological surgeries — all staffed 24/7.</p>
              <div className={`gyne__section-expand ${expanded.overview?"gyne__section-expand--open":""}`}><p>Led by a senior consultant with over 22 years of experience, the department conducts over 100 deliveries monthly and handles complex cases including multiple pregnancies, placenta previa, and post-menopausal complications.</p></div>
              <button className="gyne__read-more" onClick={()=>toggle("overview")}>{expanded.overview?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="gyne__section">
              <h3 className="gyne__section-title">👩‍⚕️ Our Team</h3>
              <p>Our all-women team of consultants, residents, and midwives ensures a comfortable and supportive environment for every patient visiting the department.</p>
              <div className={`gyne__section-expand ${expanded.team?"gyne__section-expand--open":""}`}><p>Every team member undergoes regular training in obstetric emergencies, neonatal resuscitation, and evidence-based delivery practices to maintain the highest standards of maternal and newborn safety.</p></div>
              <button className="gyne__read-more" onClick={()=>toggle("team")}>{expanded.team?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="gyne__section">
              <h3 className="gyne__section-title">💝 Patient Support</h3>
              <p>Antenatal classes, birthing preparation workshops, and postnatal support groups are conducted regularly to educate and empower expectant and new mothers.</p>
              <div className={`gyne__section-expand ${expanded.support?"gyne__section-expand--open":""}`}><p>A dedicated maternity coordinator assists with hospital admission planning, insurance processing, and room arrangements to ensure a stress-free delivery experience for the family.</p></div>
              <button className="gyne__read-more" onClick={()=>toggle("support")}>{expanded.support?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
export default Gynecology;
