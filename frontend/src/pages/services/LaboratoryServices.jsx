import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import DeptNav from "../../components/DeptNav";
import "./LaboratoryServices.css";

const sliderImages = ["/images/laboratory-services-1.jpg","/images/laboratory-services-2.jpg","/images/laboratory-services-3.jpg"];

const labStaff = [
  { name: "Dr. Ramesh Iyer", role: "Chief Pathologist & Lab Director", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", qualification: "MD Pathology, DNB", experience: "22+", bio: "Dr. Ramesh Iyer has been heading Hippocare's Laboratory Services for over two decades. A gold medalist in MD Pathology from AIIMS, he has published 40+ research papers in international journals and established the hospital's NABL-accredited diagnostics wing.", languages: "English, Hindi, Marathi", email: "ramesh.iyer@hippocare.in", phone: "+91-99887-22001", specializations: ["Histopathology", "Onco-pathology", "Hematopathology", "Molecular Diagnostics"], achievements: ["NABL Accreditation Lead — Hippocare Lab", "Best Pathologist Award — Indian Medical Association 2019", "Published 40+ peer-reviewed research papers", "Fellowship in Onco-Pathology, Tata Memorial Centre"], workingHours: "Mon–Sat: 8:00 AM – 4:00 PM", joinedYear: 2003 },
  { name: "Dr. Sneha Kulkarni", role: "Senior Microbiologist", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", qualification: "MD Microbiology", experience: "14+", bio: "Dr. Sneha Kulkarni specializes in clinical microbiology and infection control. She leads the hospital's antimicrobial stewardship program and has instrumental experience in setting up automated culture systems for rapid sepsis detection.", languages: "English, Hindi, Kannada", email: "sneha.kulkarni@hippocare.in", phone: "+91-99887-22002", specializations: ["Clinical Microbiology", "Infection Control", "Antimicrobial Stewardship", "TB & Mycology"], achievements: ["Implemented BACTEC automated culture system", "ICMR Research Grant recipient 2020", "Hospital Infection Control Committee Chair", "Trained 50+ lab technicians in biosafety protocols"], workingHours: "Mon–Sat: 9:00 AM – 5:00 PM", joinedYear: 2011 },
  { name: "Mr. Anil Pandey", role: "Head Lab Technician", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80", qualification: "DMLT, B.Sc MLT", experience: "18+", bio: "Mr. Anil Pandey is the backbone of day-to-day lab operations at Hippocare. With 18+ years of hands-on experience in hematology, biochemistry, and serology analyzers, he ensures quality control and swift turnaround for all routine and emergency samples.", languages: "English, Hindi", email: "anil.pandey@hippocare.in", phone: "+91-99887-22003", specializations: ["Hematology Analyzers", "Biochemistry Platforms", "Phlebotomy Training", "Quality Control & EQAS"], achievements: ["Zero error record in sample handling — 5 consecutive years", "Trained 30+ junior technicians", "ISO 15189 Internal Auditor certified", "Employee of the Year — Hippocare 2021"], workingHours: "Mon–Sat: 7:00 AM – 3:00 PM (Rotational)", joinedYear: 2007 },
  { name: "Ms. Priya Nair", role: "Senior Biochemist", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", qualification: "M.Sc Biochemistry", experience: "10+", bio: "Ms. Priya Nair manages the clinical biochemistry and immunoassay section of Hippocare's laboratory. She is proficient in CLIA-based hormone testing, cardiac biomarkers, and therapeutic drug monitoring with a focus on accurate and timely reporting.", languages: "English, Hindi, Malayalam", email: "priya.nair@hippocare.in", phone: "+91-99887-22004", specializations: ["Clinical Biochemistry", "Immunoassay (CLIA/ELISA)", "Cardiac Biomarkers", "Thyroid & Hormone Panels"], achievements: ["Reduced biochemistry TAT by 35%", "State-level Gold Medal in M.Sc Biochemistry", "Presented at National Biochemistry Conference 2022", "Developed SOP for critical value reporting"], workingHours: "Mon–Sat: 8:00 AM – 4:00 PM", joinedYear: 2015 },
];


const LaboratoryServices = () => {
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [selectedProfile, setSelectedProfile] = useState(null);
  useEffect(() => { const t = setInterval(() => setSlide((p) => (p + 1) % sliderImages.length), 3500); return () => clearInterval(t); }, []);
  const toggle = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="labs">
      <nav className="labs__nav"><div className="labs__nav-inner"><Link to="/" className="labs__brand"><img src={hippocareLogo} alt="Hippocare" className="labs__logo" /><span>Hippocare Hospital</span></Link><div className="labs__nav-links"><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/login">Login</Link></div></div></nav>
      <header className="labs__banner"><div className="labs__banner-overlay" /><div className="labs__banner-content"><h1>Laboratory Services</h1><p className="labs__breadcrumb"><Link to="/">Home</Link><span>/</span>Services<span>/</span>Laboratory Services</p></div></header>

      <DeptNav />

      <section className="labs__main">
        <div className="labs__left">
          <div className="labs__slider">
            {sliderImages.map((src, i) => (<img key={i} src={src} alt={`Laboratory ${i+1}`} className={`labs__slide ${i===slide?"labs__slide--active":""}`} />))}
            <div className="labs__brand-overlay"><span className="labs__brand-overlay-text">Hippocare Hospital</span></div>
            <div className="labs__dots">{sliderImages.map((_,i) => (<button key={i} className={`labs__dot ${i===slide?"labs__dot--active":""}`} onClick={()=>setSlide(i)} aria-label={`Slide ${i+1}`} />))}</div>
          </div>

          <article className="labs__content-box">
            <h2>Laboratory Services Department</h2>
            <div className="labs__section">
              <h3 className="labs__section-title">🔬 State-of-the-Art Diagnostics</h3>
              <p>Our laboratory is equipped with fully automated analyzers and follows strict quality control protocols to deliver accurate, reliable, and timely diagnostic results for all medical disciplines.</p>
              <div className={`labs__section-expand ${expanded.diag?"labs__section-expand--open":""}`}><p>NABL-accredited and EQAS-enrolled, our lab processes thousands of samples daily with minimal turnaround time. Internal and external quality assessments are conducted regularly.</p></div>
              <button className="labs__read-more" onClick={()=>toggle("diag")}>{expanded.diag?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="labs__section">
              <h3 className="labs__section-title">🩸 Hematology & Blood Banking</h3>
              <p>Complete blood counts, coagulation profiles, peripheral smear examinations, and cross-matching for blood transfusions are performed with advanced 5-part differential hematology analyzers.</p>
              <div className={`labs__section-expand ${expanded.hema?"labs__section-expand--open":""}`}><p>Our blood bank maintains an adequate inventory of blood products including packed red cells, platelets, and fresh frozen plasma with rigorous screening for transfusion-transmitted infections.</p></div>
              <button className="labs__read-more" onClick={()=>toggle("hema")}>{expanded.hema?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="labs__section">
              <h3 className="labs__section-title">🧫 Clinical Biochemistry</h3>
              <p>Liver function, kidney function, lipid profile, blood glucose, thyroid function, cardiac markers, and hundreds of other biochemical parameters are tested on fully automated platforms.</p>
              <div className={`labs__section-expand ${expanded.biochem?"labs__section-expand--open":""}`}><p>Stat and routine samples are prioritized efficiently. Critical value reporting ensures treating doctors are notified immediately for life-threatening results, enabling rapid clinical intervention.</p></div>
              <button className="labs__read-more" onClick={()=>toggle("biochem")}>{expanded.biochem?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="labs__section">
              <h3 className="labs__section-title">🦠 Microbiology & Infection Control</h3>
              <p>Culture and sensitivity testing, Gram stain, AFB stain, and rapid antigen tests help identify infectious organisms and guide appropriate antibiotic therapy for effective treatment.</p>
              <div className={`labs__section-expand ${expanded.micro?"labs__section-expand--open":""}`}><p>Our microbiology section plays a key role in hospital infection control by monitoring antibiotic resistance patterns and contributing to the hospital's antimicrobial stewardship program.</p></div>
              <button className="labs__read-more" onClick={()=>toggle("micro")}>{expanded.micro?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="labs__section">
              <h3 className="labs__section-title">🧬 Histopathology & Cytology</h3>
              <p>Tissue biopsy processing, frozen sections, FNAC (fine needle aspiration cytology), and Pap smears are examined by experienced pathologists for accurate diagnosis of tumors and lesions.</p>
              <div className={`labs__section-expand ${expanded.histo?"labs__section-expand--open":""}`}><p>Immunohistochemistry (IHC) panels are available for tumor subtyping and prognostic markers, supporting oncologists in tailoring personalized cancer treatment plans for patients.</p></div>
              <button className="labs__read-more" onClick={()=>toggle("histo")}>{expanded.histo?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="labs__section">
              <h3 className="labs__section-title">🧪 Serology & Immunology</h3>
              <p>Tests for HIV, Hepatitis B & C, dengue, malaria, typhoid, ANA, rheumatoid factor, and other immunological markers are performed using ELISA, CLIA, and rapid card methods.</p>
              <div className={`labs__section-expand ${expanded.sero?"labs__section-expand--open":""}`}><p>Our immunology department also performs allergy testing, autoimmune panels, and complement studies to assist in the diagnosis of complex autoimmune and allergic conditions.</p></div>
              <button className="labs__read-more" onClick={()=>toggle("sero")}>{expanded.sero?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>

          <article className="labs__content-box">
            <h2>About This Department</h2>
            <div className="labs__section">
              <h3 className="labs__section-title">🏥 Molecular Diagnostics</h3>
              <p>PCR-based testing for COVID-19, tuberculosis, HPV, and hepatitis quantification is available with rapid turnaround, supporting clinicians with precise molecular-level diagnosis.</p>
              <div className={`labs__section-expand ${expanded.molecular?"labs__section-expand--open":""}`}><p>Our molecular lab follows stringent contamination prevention protocols and is equipped with real-time PCR machines for quantitative viral load monitoring and genotyping.</p></div>
              <button className="labs__read-more" onClick={()=>toggle("molecular")}>{expanded.molecular?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="labs__section">
              <h3 className="labs__section-title">👨‍🔬 Our Team</h3>
              <p>The department is headed by senior pathologists and supported by experienced technicians who are trained in operating advanced diagnostic equipment with precision and care.</p>
              <div className={`labs__section-expand ${expanded.team?"labs__section-expand--open":""}`}><p>Regular workshops and CME programs keep our staff updated with the latest advancements in laboratory medicine, ensuring the highest standards of diagnostic accuracy.</p></div>
              <button className="labs__read-more" onClick={()=>toggle("team")}>{expanded.team?"Read Less ▲":"Read More ▼"}</button>
            </div>
            <div className="labs__section">
              <h3 className="labs__section-title">📋 Sample Collection & Reports</h3>
              <p>Walk-in sample collection is available from 7 AM daily. Reports can be accessed via our online portal, SMS, or collected at the lab counter for patient convenience.</p>
              <div className={`labs__section-expand ${expanded.reports?"labs__section-expand--open":""}`}><p>Home sample collection services are available for elderly and immobile patients. Our phlebotomists are trained in pediatric and geriatric blood collection techniques for comfortable experiences.</p></div>
              <button className="labs__read-more" onClick={()=>toggle("reports")}>{expanded.reports?"Read Less ▲":"Read More ▼"}</button>
            </div>
          </article>

          {/* ── Lab Staff Section ── */}
          <section className="labs__staff">
            <h2 className="labs__staff-heading">Our Laboratory Team</h2>
            <p className="labs__staff-sub">Dedicated professionals ensuring diagnostic excellence at Hippocare Hospital</p>
            <div className="labs__staff-grid">
              {labStaff.map((s, i) => (
                <div className="labs__staff-card" key={i}>
                  <div className="labs__staff-img-wrap"><img src={s.photo} alt={s.name} className="labs__staff-img" /><span className="labs__staff-exp">{s.experience} Yrs</span></div>
                  <div className="labs__staff-body">
                    <h3 className="labs__staff-name">{s.name}</h3>
                    <p className="labs__staff-role">{s.role}</p>
                    <p className="labs__staff-qual">🎓 {s.qualification}</p>
                    <button className="labs__view-profile-btn" onClick={() => setSelectedProfile(s)}>View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Profile Modal ── */}
          {selectedProfile && (
            <div className="labs__modal-overlay" onClick={() => setSelectedProfile(null)}>
              <div className="labs__modal" onClick={(e) => e.stopPropagation()}>
                <button className="labs__modal-close" onClick={() => setSelectedProfile(null)}>✕</button>
                <div className="labs__modal-header">
                  <div className="labs__modal-img-wrap">
                    <img src={selectedProfile.photo} alt={selectedProfile.name} className="labs__modal-img" />
                  </div>
                  <div className="labs__modal-title">
                    <h2>{selectedProfile.name}</h2>
                    <p className="labs__modal-role">{selectedProfile.role}</p>
                    <span className="labs__modal-exp-badge">{selectedProfile.experience} Years Experience</span>
                  </div>
                </div>
                <div className="labs__modal-body">
                  <div className="labs__modal-section">
                    <h4>📋 About</h4>
                    <p>{selectedProfile.bio}</p>
                  </div>
                  <div className="labs__modal-section">
                    <h4>🎓 Qualification</h4>
                    <p>{selectedProfile.qualification}</p>
                  </div>
                  <div className="labs__modal-section">
                    <h4>🔬 Specializations</h4>
                    <div className="labs__modal-tags">
                      {selectedProfile.specializations.map((sp, idx) => (
                        <span key={idx} className="labs__modal-tag">{sp}</span>
                      ))}
                    </div>
                  </div>
                  <div className="labs__modal-section">
                    <h4>🏆 Key Achievements</h4>
                    <ul className="labs__modal-list">
                      {selectedProfile.achievements.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="labs__modal-info-grid">
                    <div className="labs__modal-info-item"><span className="labs__modal-info-label">🌐 Languages</span><span>{selectedProfile.languages}</span></div>
                    <div className="labs__modal-info-item"><span className="labs__modal-info-label">📧 Email</span><span>{selectedProfile.email}</span></div>
                    <div className="labs__modal-info-item"><span className="labs__modal-info-label">📞 Phone</span><span>{selectedProfile.phone}</span></div>
                    <div className="labs__modal-info-item"><span className="labs__modal-info-label">🕐 Working Hours</span><span>{selectedProfile.workingHours}</span></div>
                    <div className="labs__modal-info-item"><span className="labs__modal-info-label">📅 Joined Hippocare</span><span>{selectedProfile.joinedYear}</span></div>
                    <div className="labs__modal-info-item"><span className="labs__modal-info-label">🏥 Department</span><span>Laboratory Services</span></div>
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
export default LaboratoryServices;
