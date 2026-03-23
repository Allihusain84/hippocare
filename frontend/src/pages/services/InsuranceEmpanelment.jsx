import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import DeptNav from "../../components/DeptNav";
import "./InsuranceEmpanelment.css";

/* Slider images – save in public/images/ */
const sliderImages = [
  "/images/insurance-1.jpg",
  "/images/insurance-2.jpg",
  "/images/insurance-3.jpg",
];

const patientInsuranceData = [
  { pid: "HPC-10234", name: "Aarav Sharma", company: "Star Health Insurance", policyNo: "SH-90012345", type: "Cashless", validity: "2025-12-31", sumInsured: "₹5,00,000" },
  { pid: "HPC-10278", name: "Meera Iyer", company: "ICICI Lombard", policyNo: "IL-88045678", type: "Reimbursement", validity: "2026-03-15", sumInsured: "₹10,00,000" },
  { pid: "HPC-10319", name: "Rajesh Gupta", company: "New India Assurance", policyNo: "NIA-7701122", type: "Cashless", validity: "2025-09-30", sumInsured: "₹3,00,000" },
  { pid: "HPC-10345", name: "Priya Patel", company: "HDFC ERGO", policyNo: "HE-66098765", type: "Cashless", validity: "2026-01-20", sumInsured: "₹7,50,000" },
  { pid: "HPC-10389", name: "Sunil Verma", company: "Bajaj Allianz", policyNo: "BA-55087654", type: "Reimbursement", validity: "2025-11-10", sumInsured: "₹4,00,000" },
  { pid: "HPC-10412", name: "Kavita Singh", company: "Max Bupa", policyNo: "MB-44076543", type: "Cashless", validity: "2026-06-30", sumInsured: "₹15,00,000" },
  { pid: "HPC-10456", name: "Deepak Nair", company: "Tata AIG", policyNo: "TA-33065432", type: "Cashless", validity: "2025-08-25", sumInsured: "₹5,00,000" },
  { pid: "HPC-10478", name: "Anita Joshi", company: "Religare Health", policyNo: "RH-22054321", type: "Reimbursement", validity: "2026-02-28", sumInsured: "₹8,00,000" },
];


const InsuranceEmpanelment = () => {
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const toggle = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="insu">
      {/* ── Nav bar ── */}
      <nav className="insu__nav">
        <div className="insu__nav-inner">
          <Link to="/" className="insu__brand">
            <img src={hippocareLogo} alt="Hippocare" className="insu__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="insu__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Banner ── */}
      <header className="insu__banner">
        <div className="insu__banner-overlay" />
        <div className="insu__banner-content">
          <h1>Insurance Empanelment</h1>
          <p className="insu__breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            24×7 Services
            <span>/</span>
            Insurance Empanelment
          </p>
        </div>
      </header>

      <DeptNav />

      {/* ── Main Content ── */}
      <section className="insu__main">
        {/* LEFT: Image slider + content */}
        <div className="insu__left">
          <div className="insu__slider">
            {sliderImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Insurance slide ${idx + 1}`}
                className={`insu__slide ${idx === slide ? "insu__slide--active" : ""}`}
              />
            ))}
            <div className="insu__brand-overlay">
              <span className="insu__brand-overlay-text">Hippocare Hospital</span>
            </div>
            <div className="insu__dots">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`insu__dot ${idx === slide ? "insu__dot--active" : ""}`}
                  onClick={() => setSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── Insurance & Cashless Treatment (bordered box) ── */}
          <article className="insu__content-box">
            <h2>Insurance & Cashless Treatment</h2>

            {/* ── Cashless Facility ── */}
            <div className="insu__section">
              <h3 className="insu__section-title">💳 Cashless Treatment Facility</h3>
              <p>
                Hippocare Hospital is empanelled with all major insurance companies and
                Third-Party Administrators (TPAs), enabling patients to avail cashless
                treatment without upfront payment for eligible policies.
              </p>
              <div className={`insu__section-expand ${expanded.cashless ? "insu__section-expand--open" : ""}`}>
                <p>
                  Our dedicated insurance desk handles all pre-authorization, document
                  verification, and approval processes on behalf of the patient. From
                  admission to discharge, our team coordinates with the TPA to ensure
                  a seamless cashless experience so patients can focus entirely on
                  their recovery.
                </p>
              </div>
              <button className="insu__read-more" onClick={() => toggle("cashless")}>
                {expanded.cashless ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── TPA Network ── */}
            <div className="insu__section">
              <h3 className="insu__section-title">🤝 Wide TPA & Insurer Network</h3>
              <p>
                We are empanelled with 50+ insurance companies including Star Health,
                ICICI Lombard, New India Assurance, HDFC Ergo, Bajaj Allianz, Max Bupa,
                Niva Bupa, Care Health, and many more.
              </p>
              <div className={`insu__section-expand ${expanded.tpa ? "insu__section-expand--open" : ""}`}>
                <p>
                  Our partnerships cover individual policies, family floater plans,
                  group mediclaim, corporate insurance, and government schemes. We
                  regularly update our empanelment list and negotiate with new insurers
                  to expand coverage options for our patients.
                </p>
              </div>
              <button className="insu__read-more" onClick={() => toggle("tpa")}>
                {expanded.tpa ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Government Schemes ── */}
            <div className="insu__section">
              <h3 className="insu__section-title">🏛️ Government Health Schemes</h3>
              <p>
                Hippocare Hospital is a recognized provider under Ayushman Bharat –
                Pradhan Mantri Jan Arogya Yojana (PMJAY), CGHS, ECHS, and various
                state government health insurance schemes.
              </p>
              <div className={`insu__section-expand ${expanded.govt ? "insu__section-expand--open" : ""}`}>
                <p>
                  Eligible beneficiaries can access a wide range of treatments including
                  surgeries, diagnostics, and hospitalization completely free of cost
                  under these programs. Our enrollment team assists patients with
                  Ayushman card generation, eligibility verification, and claim
                  processing from start to finish.
                </p>
              </div>
              <button className="insu__read-more" onClick={() => toggle("govt")}>
                {expanded.govt ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Claim Process ── */}
            <div className="insu__section">
              <h3 className="insu__section-title">📋 Hassle-Free Claim Process</h3>
              <p>
                Whether it's a planned hospitalization or an emergency admission, our
                insurance team initiates the claim process immediately to minimize
                waiting time and paperwork for patients and their families.
              </p>
              <div className={`insu__section-expand ${expanded.claim ? "insu__section-expand--open" : ""}`}>
                <p>
                  For cashless claims, pre-authorization is obtained before or during
                  admission. For reimbursement cases, we provide all necessary
                  documentation — discharge summary, investigation reports, bills, and
                  pharmacy receipts — in a well-organized claim file. Our team also
                  assists with follow-up queries raised by the insurer.
                </p>
              </div>
              <button className="insu__read-more" onClick={() => toggle("claim")}>
                {expanded.claim ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Corporate Tie-ups ── */}
            <div className="insu__section">
              <h3 className="insu__section-title">🏢 Corporate & Group Insurance</h3>
              <p>
                We offer special tie-ups with corporates for employee health check-ups,
                group mediclaim facilitation, and dedicated billing arrangements that
                simplify healthcare access for organizations.
              </p>
              <div className={`insu__section-expand ${expanded.corporate ? "insu__section-expand--open" : ""}`}>
                <p>
                  Companies partnering with Hippocare enjoy priority appointment
                  scheduling, dedicated health coordinators, annual wellness programs,
                  and streamlined cashless processing for their workforce. Customized
                  MoUs can be drawn up based on the organization's specific requirements.
                </p>
              </div>
              <button className="insu__read-more" onClick={() => toggle("corporate")}>
                {expanded.corporate ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* ── Insurance Desk ── */}
            <div className="insu__section">
              <h3 className="insu__section-title">🖥️ Dedicated Insurance Desk</h3>
              <p>
                A full-time insurance help desk is operational at the hospital reception,
                staffed by trained coordinators who guide patients through every step of
                the insurance process.
              </p>
              <div className={`insu__section-expand ${expanded.desk ? "insu__section-expand--open" : ""}`}>
                <p>
                  From policy verification and document collection to pre-auth submission
                  and final settlement, our coordinators handle everything. They also
                  assist patients in understanding their policy coverage, co-pay
                  obligations, and sub-limits to avoid any surprises at discharge.
                </p>
              </div>
              <button className="insu__read-more" onClick={() => toggle("desk")}>
                {expanded.desk ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>
          </article>

          {/* ── About This Department (bordered box) ── */}
          <article className="insu__content-box">
            <h2>About This Department</h2>

            <div className="insu__section">
              <h3 className="insu__section-title">🏛️ Department Overview</h3>
              <p>
                The Insurance & Empanelment Department at Hippocare Hospital serves as
                the bridge between patients and their insurance providers, ensuring
                financial barriers never delay critical medical care.
              </p>
              <div className={`insu__section-expand ${expanded.overview ? "insu__section-expand--open" : ""}`}>
                <p>
                  The department is headed by a senior insurance manager with over
                  12 years of healthcare insurance experience. A team of 8 trained
                  coordinators manages cashless approvals, reimbursement documentation,
                  government scheme enrollment, and corporate health tie-ups across
                  all hospital departments.
                </p>
              </div>
              <button className="insu__read-more" onClick={() => toggle("overview")}>
                {expanded.overview ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            <div className="insu__section">
              <h3 className="insu__section-title">📊 Digital Claim Tracking</h3>
              <p>
                All insurance claims are tracked digitally through our Hospital
                Management System, providing real-time status updates to patients,
                doctors, and billing teams.
              </p>
              <div className={`insu__section-expand ${expanded.tracking ? "insu__section-expand--open" : ""}`}>
                <p>
                  Automated alerts notify the team of pending approvals, query
                  responses, and settlement timelines. This digital workflow reduces
                  claim rejection rates and ensures faster turnaround on approvals —
                  most cashless pre-authorizations are completed within 2–4 hours.
                </p>
              </div>
              <button className="insu__read-more" onClick={() => toggle("tracking")}>
                {expanded.tracking ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            <div className="insu__section">
              <h3 className="insu__section-title">📞 Patient Assistance</h3>
              <p>
                Patients can reach our insurance helpline before admission to verify
                coverage, understand their benefits, and get guidance on required
                documents — making the entire experience smooth and stress-free.
              </p>
              <div className={`insu__section-expand ${expanded.assist ? "insu__section-expand--open" : ""}`}>
                <p>
                  Our team also conducts regular awareness sessions and distributes
                  informational material in the OPD to educate patients about their
                  insurance rights, claim procedures, and how to maximise their policy
                  benefits. Post-discharge reimbursement support is available for
                  patients who paid out-of-pocket during emergencies.
                </p>
              </div>
              <button className="insu__read-more" onClick={() => toggle("assist")}>
                {expanded.assist ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>
          </article>

          {/* ── Patient Insurance Data Table ── */}
          <section className="insu__table-section">
            <h2 className="insu__table-title">📊 Patient Insurance Records</h2>
            <p className="insu__table-sub">Sample empanelled patient insurance data maintained at Hippocare Hospital</p>
            <div className="insu__table-wrap">
              <table className="insu__table">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Patient Name</th>
                    <th>Insurance Company</th>
                    <th>Policy Number</th>
                    <th>Insurance Type</th>
                    <th>Policy Validity</th>
                    <th>Sum Insured</th>
                  </tr>
                </thead>
                <tbody>
                  {patientInsuranceData.map((row, i) => (
                    <tr key={i}>
                      <td>{row.pid}</td>
                      <td>{row.name}</td>
                      <td>{row.company}</td>
                      <td>{row.policyNo}</td>
                      <td><span className={`insu__type-badge ${row.type === "Cashless" ? "insu__type-badge--cashless" : "insu__type-badge--reimburse"}`}>{row.type}</span></td>
                      <td>{row.validity}</td>
                      <td><strong>{row.sumInsured}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default InsuranceEmpanelment;
