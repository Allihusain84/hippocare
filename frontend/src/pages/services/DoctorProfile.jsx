import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import hippocareLogo from "../../assets/hippocare-logo.png";
import { supabase } from "../../lib/supabaseClient";
import "./DoctorProfile.css";

const tabs = ["Overview", "Treatments", "Hospitals", "FAQs"];

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [showReviews, setShowReviews] = useState(false);
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("doctors")
      .select("*")
      .eq("id", doctorId)
      .single()
      .then(({ data }) => {
        setDoc(data);
        setLoading(false);
      });
  }, [doctorId]);

  if (loading) return <p>Loading...</p>;

  if (!doc) {
    return (
      <div className="dpro">
        <nav className="dpro__nav"><div className="dpro__nav-inner"><Link to="/" className="dpro__brand"><img src={hippocareLogo} alt="Hippocare" className="dpro__logo" /><span>Hippocare Hospital</span></Link><div className="dpro__nav-links"><Link to="/">Home</Link><Link to="/services">Services</Link></div></div></nav>
        <div className="dpro__not-found">
          <h2>Doctor Not Found</h2>
          <p>The doctor profile you're looking for does not exist.</p>
          <button onClick={() => navigate(-1)} className="dpro__back-btn">← Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dpro">
      {/* ── Navbar ── */}
      <nav className="dpro__nav">
        <div className="dpro__nav-inner">
          <Link to="/" className="dpro__brand">
            <img src={hippocareLogo} alt="Hippocare" className="dpro__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="dpro__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* ── Breadcrumb ── */}
      <div className="dpro__breadcrumb-bar">
        <div className="dpro__breadcrumb-inner">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/services/cardiology">Cardiology</Link>
          <span>/</span>
          <span className="dpro__breadcrumb-current">{doc.name}</span>
        </div>
      </div>

      {/* ── Hero Card ── */}
      <section className="dpro__hero">
        <div className="dpro__hero-inner">
          <div className="dpro__hero-info">
            <div className="dpro__name-row">
              <h1 className="dpro__name">{doc.name}</h1>
              {doc.verified && <span className="dpro__verified" title="Verified">✓</span>}
            </div>

            <div className="dpro__tags">
              {[doc.specialization].filter(Boolean).map((s, i) => (
                <span className="dpro__tag" key={i}>{s}</span>
              ))}
            </div>

            <p className="dpro__qualifications">{doc.qualification || "—"}</p>

            <div className="dpro__stats-row">
              <div className="dpro__stat">
                <span className="dpro__stat-val">{doc.experience || "—"} Years</span>
                <span className="dpro__stat-label">Experience</span>
              </div>
              <div className="dpro__stat">
                <span className="dpro__stat-val">{doc.recommended || "—"}</span>
                <span className="dpro__stat-label">Recommended</span>
              </div>
              <div className="dpro__stat dpro__stat--clickable" onClick={() => setShowReviews(true)} title="Click to view patient details">
                <span className="dpro__stat-val">{doc.ratingsCount || "—"}</span>
                <span className="dpro__stat-label">Patient Reviews</span>
                <span className="dpro__stat-hint">Click to view ›</span>
              </div>
            </div>

            <p className="dpro__enquiry">
              📋 <strong>{doc.patientsEnquired || 0}+</strong> patients enquired about this doctor in the last 30 days
            </p>

            {/* Timings */}
            {(doc.timings || []).length > 0 && (
              <div className="dpro__timings">
                <h3>🕐 Available Timings</h3>
                <div className="dpro__timing-list">
                  {doc.timings.map((t, i) => (
                    <div className="dpro__timing-row" key={i}>
                      <span className="dpro__timing-day">{t.day}</span>
                      <span className="dpro__timing-time">{t.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fee + Actions */}
            <div className="dpro__fee-row">
              <span className="dpro__fee">Consultation Fee: <strong>{doc.consultation_fee ? `₹${doc.consultation_fee}` : "—"}</strong></span>
            </div>
            <div className="dpro__actions">
              <button className="dpro__btn dpro__btn--primary" onClick={() => {
                const role = localStorage.getItem("hmsRole");
                if (role === "patient") {
                  navigate(`/patient/book?doctor=${doc.id}`);
                } else {
                  navigate(`/login?redirect=/patient/book&doctor=${doc.id}`);
                }
              }}>📅 Book Appointment</button>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="dpro__btn dpro__btn--whatsapp">💬 WhatsApp Expert</a>
            </div>
          </div>

          <div className="dpro__hero-photo">
            <img src={doc.photo_url || ""} alt={doc.name} />
          </div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <section className="dpro__tabs-section">
        <div className="dpro__tabs-inner">
          <div className="dpro__tabs">
            {tabs.map((t) => (
              <button
                key={t}
                className={`dpro__tab ${activeTab === t ? "dpro__tab--active" : ""}`}
                onClick={() => setActiveTab(t)}
              >{t}</button>
            ))}
          </div>

          <div className="dpro__tab-content">
            {activeTab === "Overview" && (
              <div className="dpro__overview">
                <h2>About {doc.name}</h2>
                {(doc.overview || []).length > 0
                  ? doc.overview.map((p, i) => <p key={i}>{p}</p>)
                  : <p className="dpro__empty">No overview available yet.</p>}
              </div>
            )}

            {activeTab === "Treatments" && (
              <div className="dpro__treatments">
                <h2>Treatments & Procedures</h2>
                {(doc.treatments || []).length > 0 ? (
                  <ul className="dpro__treatment-list">
                    {doc.treatments.map((t, i) => (
                      <li key={i}><span className="dpro__treatment-icon">🩺</span>{t}</li>
                    ))}
                  </ul>
                ) : <p className="dpro__empty">No treatment data available yet.</p>}
              </div>
            )}

            {activeTab === "Hospitals" && (
              <div className="dpro__hospitals">
                <h2>Hospital Affiliations</h2>
                {(doc.hospitals || []).length > 0 ? (
                  <div className="dpro__hospital-cards">
                    {doc.hospitals.map((h, i) => (
                      <div className="dpro__hospital-card" key={i}>
                        <div className="dpro__hospital-icon">🏥</div>
                        <div>
                          <h4>{h.name}</h4>
                          <p>{h.city}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <p className="dpro__empty">No hospital affiliation data yet.</p>}
              </div>
            )}

            {activeTab === "FAQs" && (
              <div className="dpro__faqs">
                <h2>Frequently Asked Questions</h2>
                {(doc.faqs || []).length > 0
                  ? doc.faqs.map((faq, i) => (
                      <details className="dpro__faq" key={i}>
                        <summary>{faq.q}</summary>
                        <p>{faq.a}</p>
                      </details>
                    ))
                  : <p className="dpro__empty">No FAQs available yet.</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Patient Reviews Modal ── */}
      {showReviews && (
        <div className="dpro__modal-backdrop" onClick={() => setShowReviews(false)}>
          <div className="dpro__modal" onClick={(e) => e.stopPropagation()}>
            <div className="dpro__modal-header">
              <h2>Patient Reviews — <span>{doc.name}</span></h2>
              <button className="dpro__modal-close" onClick={() => setShowReviews(false)}>✕</button>
            </div>
            <p className="dpro__modal-subtitle">Total Patients Treated: <strong>{doc.patientReviews?.length || 0}</strong> (showing recent)</p>
            <div className="dpro__modal-table-wrap">
              <table className="dpro__modal-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Village / City</th>
                    <th>Treatment</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {(doc.patientReviews || []).map((p, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td className="dpro__modal-name">{p.name}</td>
                      <td>{p.age} yrs</td>
                      <td>{p.village}</td>
                      <td>{p.treatment}</td>
                      <td>{p.months} Months</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
