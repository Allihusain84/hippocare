import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import hippocareLogo from "../../assets/hippocare-logo.png";
import "./Career.css";

/* ── Job Openings Data ── */
const openings = [
  {
    id: 1,
    title: "Staff Nurse – ICU",
    dept: "Nursing",
    type: "Full-time",
    location: "Kanpur",
    description:
      "Provide critical-care nursing in our state-of-the-art ICU. Must hold a B.Sc Nursing / GNM with valid registration and at least 1 year ICU experience.",
  },
  {
    id: 2,
    title: "Junior Resident – General Medicine",
    dept: "Medical",
    type: "Full-time",
    location: "Kanpur",
    description:
      "Assist senior consultants in diagnosis, treatment & ward rounds. MBBS with MCI/NMC registration required. Post-MBBS internship completion mandatory.",
  },
  {
    id: 3,
    title: "Lab Technician",
    dept: "Pathology",
    type: "Full-time",
    location: "Kanpur",
    description:
      "Operate haematology, biochemistry & microbiology analysers. DMLT/BMLT required. Experience with automated analysers preferred.",
  },
  {
    id: 4,
    title: "Pharmacist",
    dept: "Pharmacy",
    type: "Full-time",
    location: "Kanpur",
    description:
      "Dispense medications, counsel patients and maintain inventory records. D.Pharm / B.Pharm with state pharmacy council registration required.",
  },
  {
    id: 5,
    title: "Receptionist / Front Desk Executive",
    dept: "Administration",
    type: "Full-time",
    location: "Kanpur",
    description:
      "Manage patient registration, appointment scheduling & visitor coordination. Graduate with good communication skills. Hospital front desk experience preferred.",
  },
  {
    id: 6,
    title: "Radiography Technician",
    dept: "Radiology",
    type: "Full-time",
    location: "Kanpur",
    description:
      "Perform X-ray, CT and MRI imaging procedures. B.Sc Radiology / Diploma in Radiography with AERB certification required.",
  },
];

/* ── Empty form state ── */
const emptyForm = {
  fullName: "",
  dob: "",
  gender: "",
  mobile: "",
  email: "",
  address: "",
  qualification: "",
  experience: "",
  prevHospital: "",
  position: "",
  resume: null,
  certificates: null,
  declaration: false,
  signDate: new Date().toISOString().slice(0, 10),
};

/* ────────────────────────────────────────── */
const Career = () => {
  const [applied, setApplied] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1); // multi-step: 1 = personal, 2 = professional, 3 = uploads & declaration
  const sigCanvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  const revealRef = useScrollReveal({ staggerDelay: 100 });

  /* ── Form helpers ── */
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setForm((f) => ({ ...f, [name]: files }));
    } else if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const openForm = (job) => {
    setApplied(job);
    setForm({ ...emptyForm, position: job.title });
    setStep(1);
    setSuccess(false);
    setHasSigned(false);
  };

  const closeForm = () => {
    setApplied(null);
    setSuccess(false);
    setStep(1);
    setHasSigned(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.declaration) return;
    setSuccess(true);
    setTimeout(() => closeForm(), 4000);
  };

  /* ── Signature pad helpers ── */
  const getCtx = () => sigCanvasRef.current?.getContext("2d");

  const getPos = (e) => {
    const rect = sigCanvasRef.current.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  };

  const startDraw = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const ctx = getCtx();
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = getCtx();
    const pos = getPos(e);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0f172a";
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasSigned(true);
  };

  const endDraw = () => setIsDrawing(false);

  const clearSig = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  /* ── Step validation ── */
  const canNext1 = form.fullName && form.dob && form.gender && form.mobile && form.email && form.address;
  const canNext2 = form.qualification && form.position;

  return (
    <div className="career" ref={revealRef}>
      {/* ── Nav ── */}
      <nav className="career__nav">
        <div className="career__nav-inner">
          <Link to="/" className="career__brand">
            <img src={hippocareLogo} alt="Hippocare" className="career__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="career__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* ── Banner ── */}
      <header className="career__banner scroll-reveal">
        <div className="career__banner-overlay" />
        <div className="career__banner-content">
          <h1>Career Opportunities</h1>
          <p className="career__breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>Career
          </p>
        </div>
      </header>

      {/* ── Intro ── */}
      <section className="career__intro scroll-reveal">
        <h2>Join the Hippocare Family</h2>
        <p>
          We are always looking for passionate, skilled professionals who share
          our commitment to patient-centered healthcare. Explore current openings
          below and take the first step toward a rewarding career at one of the
          region&rsquo;s leading hospitals.
        </p>
      </section>

      {/* ── Why Join Us ── */}
      <section className="career__perks scroll-reveal">
        <h3 className="career__section-heading">Why Join Hippocare?</h3>
        <div className="career__perks-grid">
          {[
            { icon: "🏥", text: "State-of-the-art hospital infrastructure" },
            { icon: "📈", text: "Career growth & continuous learning" },
            { icon: "💰", text: "Competitive salary & benefits" },
            { icon: "🤝", text: "Supportive & collaborative team culture" },
            { icon: "🎓", text: "Funded training & certifications" },
            { icon: "🕐", text: "Work-life balance & flexible shifts" },
          ].map((p) => (
            <div key={p.text} className="career__perk">
              <span className="career__perk-icon">{p.icon}</span>
              <span>{p.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Current Openings ── */}
      <section className="career__openings">
        <h3 className="career__section-heading">Current Openings</h3>
        <div className="career__grid">
          {openings.map((job) => (
            <div key={job.id} className="career__card scroll-reveal">
              <div className="career__card-badge">{job.dept}</div>
              <h4 className="career__card-title">{job.title}</h4>
              <p className="career__card-desc">{job.description}</p>
              <p className="career__card-meta">
                📍 {job.location} &middot; {job.type}
              </p>
              <button className="career__apply-btn" onClick={() => openForm(job)}>
                Apply Now &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Application Form Modal (multi-step)
         ══════════════════════════════════════════ */}
      {applied && (
        <div className="career__overlay" onClick={closeForm}>
          <div className="career__modal" onClick={(e) => e.stopPropagation()}>
            <button className="career__modal-close" onClick={closeForm} aria-label="Close">
              ✕
            </button>

            {/* Header */}
            <div className="career__modal-header">
              <img src={hippocareLogo} alt="" className="career__modal-logo" />
              <div>
                <h3>Job Application Form</h3>
                <p className="career__modal-subtitle">
                  Position: <strong>{applied.title}</strong> — {applied.dept} Department
                </p>
              </div>
            </div>

            {/* Stepper */}
            <div className="career__stepper">
              {["Personal Details", "Professional Details", "Documents & Declaration"].map((label, i) => (
                <div key={label} className={`career__step ${step >= i + 1 ? "career__step--active" : ""} ${step > i + 1 ? "career__step--done" : ""}`}>
                  <span className="career__step-num">{step > i + 1 ? "✓" : i + 1}</span>
                  <span className="career__step-label">{label}</span>
                </div>
              ))}
            </div>

            {success ? (
              <div className="career__success">
                <span className="career__success-icon">✅</span>
                <h4>Application Submitted Successfully!</h4>
                <p>
                  Thank you for applying for <strong>{applied.title}</strong>. Our HR team
                  will review your application and contact you within 7 working days.
                </p>
              </div>
            ) : (
              <form className="career__form" onSubmit={handleSubmit}>
                {/* ── STEP 1: Personal Details ── */}
                {step === 1 && (
                  <div className="career__form-step">
                    <h4 className="career__form-heading">Personal Information</h4>

                    <label className="career__label">
                      Full Name <span className="career__req">*</span>
                      <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" required />
                    </label>

                    <div className="career__row">
                      <label className="career__label">
                        Date of Birth <span className="career__req">*</span>
                        <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
                      </label>
                      <label className="career__label">
                        Gender <span className="career__req">*</span>
                        <select name="gender" value={form.gender} onChange={handleChange} required>
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </label>
                    </div>

                    <div className="career__row">
                      <label className="career__label">
                        Mobile Number <span className="career__req">*</span>
                        <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} placeholder="+91 XXXXX XXXXX" pattern="[0-9+\s\-]{10,15}" required />
                      </label>
                      <label className="career__label">
                        Email ID <span className="career__req">*</span>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="yourname@email.com" required />
                      </label>
                    </div>

                    <label className="career__label">
                      Residential Address <span className="career__req">*</span>
                      <textarea name="address" rows="2" value={form.address} onChange={handleChange} placeholder="House No, Street, City, State, PIN" required />
                    </label>

                    <div className="career__nav-btns">
                      <span />
                      <button type="button" className="career__next-btn" disabled={!canNext1} onClick={() => setStep(2)}>
                        Next: Professional Details &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Professional Details ── */}
                {step === 2 && (
                  <div className="career__form-step">
                    <h4 className="career__form-heading">Professional Information</h4>

                    <label className="career__label">
                      Highest Qualification <span className="career__req">*</span>
                      <input type="text" name="qualification" value={form.qualification} onChange={handleChange} placeholder="e.g. B.Sc Nursing, MBBS, DMLT, D.Pharm" required />
                    </label>

                    <div className="career__row">
                      <label className="career__label">
                        Total Work Experience
                        <input type="text" name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 2 Years 6 Months" />
                      </label>
                      <label className="career__label">
                        Previous Hospital / Employer
                        <input type="text" name="prevHospital" value={form.prevHospital} onChange={handleChange} placeholder="Hospital or organisation name" />
                      </label>
                    </div>

                    <label className="career__label">
                      Position Applied For <span className="career__req">*</span>
                      <select name="position" value={form.position} onChange={handleChange} required>
                        <option value="">Select Position</option>
                        {openings.map((j) => (
                          <option key={j.id} value={j.title}>
                            {j.title}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="career__nav-btns">
                      <button type="button" className="career__back-btn" onClick={() => setStep(1)}>
                        &larr; Back
                      </button>
                      <button type="button" className="career__next-btn" disabled={!canNext2} onClick={() => setStep(3)}>
                        Next: Documents &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Uploads & Declaration ── */}
                {step === 3 && (
                  <div className="career__form-step">
                    <h4 className="career__form-heading">Upload Documents</h4>

                    <label className="career__label career__file-label">
                      Upload Resume / CV <span className="career__req">*</span>
                      <div className="career__file-box">
                        <span className="career__file-icon">📄</span>
                        <span>{form.resume ? Array.from(form.resume).map((f) => f.name).join(", ") : "Choose PDF, DOC, or DOCX (Max 5MB)"}</span>
                        <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} required />
                      </div>
                    </label>

                    <label className="career__label career__file-label">
                      Upload Certificates
                      <div className="career__file-box">
                        <span className="career__file-icon">📑</span>
                        <span>{form.certificates ? Array.from(form.certificates).map((f) => f.name).join(", ") : "Degree, Registration, Experience (multiple allowed)"}</span>
                        <input type="file" name="certificates" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={handleChange} />
                      </div>
                    </label>

                    {/* ── Signature Pad ── */}
                    <div className="career__sig-section">
                      <h4 className="career__form-heading">Applicant Signature</h4>
                      <p className="career__sig-hint">Draw your signature below using mouse or touch</p>
                      <div className="career__sig-wrapper">
                        <canvas
                          ref={sigCanvasRef}
                          width={380}
                          height={100}
                          className="career__sig-canvas"
                          onMouseDown={startDraw}
                          onMouseMove={draw}
                          onMouseUp={endDraw}
                          onMouseLeave={endDraw}
                          onTouchStart={startDraw}
                          onTouchMove={draw}
                          onTouchEnd={endDraw}
                        />
                        <button type="button" className="career__sig-clear" onClick={clearSig}>
                          Clear
                        </button>
                      </div>
                      <p className="career__sig-date">Date: {form.signDate}</p>
                    </div>

                    {/* ── Declaration ── */}
                    <div className="career__declaration">
                      <h4 className="career__form-heading">Declaration</h4>
                      <p className="career__decl-text">
                        I hereby declare that all the information provided in this application
                        form is true and correct to the best of my knowledge and belief. I
                        understand that any false information may result in disqualification of
                        my candidature or termination of employment.
                      </p>
                      <label className="career__checkbox-label">
                        <input type="checkbox" name="declaration" checked={form.declaration} onChange={handleChange} required />
                        <span>
                          I agree to the above declaration and consent to the processing of my
                          personal data for recruitment purposes.
                        </span>
                      </label>
                    </div>

                    <div className="career__nav-btns">
                      <button type="button" className="career__back-btn" onClick={() => setStep(2)}>
                        &larr; Back
                      </button>
                      <button
                        type="submit"
                        className="career__submit-btn"
                        disabled={!form.declaration || !form.resume || !hasSigned}
                      >
                        Submit Application
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── Footer CTA ── */}
      <section className="career__cta scroll-reveal">
        <h3>Don&rsquo;t see the right role?</h3>
        <p>Send your resume to <strong>careers@hippocare.in</strong> and we&rsquo;ll reach out when a suitable position opens.</p>
      </section>
    </div>
  );
};

export default Career;
