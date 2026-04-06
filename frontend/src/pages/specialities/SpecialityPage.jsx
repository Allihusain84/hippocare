import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import hippocareLogo from "../../assets/hippocare-logo.png";
import { specialities } from "../../data/specialityData";
import DeptNav from "../../components/DeptNav";
import "./SpecialityPage.css";

/**
 * Reusable Speciality detail page.
 * Route: /speciality/:slug
 * Renders banner, image slideshow, sidebar, and professional content.
 */
const SpecialityPage = () => {
  const { slug } = useParams();
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [docPage, setDocPage] = useState(0);
  const navigate = useNavigate();
  const revealRef = useScrollReveal({ staggerDelay: 100 });
  const toggle = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));

  const spec = specialities.find((s) => s.slug === slug);
  const expertDoctors = spec?.expertDoctors || [];
  const docsPerView = 2;
  const totalPages = Math.ceil(expertDoctors.length / docsPerView);

  /* Auto-advance slideshow every 3.5 s */
  useEffect(() => {
    if (!spec) return;
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % spec.images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [spec]);

  /* Reset slide & expanded on slug change */
  useEffect(() => {
    setSlide(0);
    setExpanded({});
    setDocPage(0);
  }, [slug]);

  if (!spec) {
    return (
      <div className="sp">
        <nav className="sp__nav">
          <div className="sp__nav-inner">
            <Link to="/" className="sp__brand">
              <img src={hippocareLogo} alt="Hippocare" className="sp__logo" />
              <span>Hippocare Hospital</span>
            </Link>
          </div>
        </nav>
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <h2>Speciality Not Found</h2>
          <p>The speciality you're looking for doesn't exist.</p>
          <Link to="/services" style={{ color: "#0284c7", fontWeight: 600 }}>Browse All Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sp" ref={revealRef}>
      {/* ── Nav ── */}
      <nav className="sp__nav">
        <div className="sp__nav-inner">
          <Link to="/" className="sp__brand">
            <img src={hippocareLogo} alt="Hippocare" className="sp__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="sp__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* ── Banner ── */}
      <header className="sp__banner scroll-reveal">
        <div className="sp__banner-overlay" />
        <div className="sp__banner-content">
          <h1>{spec.name}</h1>
          <p className="sp__breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            Specialities
            <span>/</span>
            {spec.name}
          </p>
        </div>
      </header>

      <DeptNav />

      {/* ── Main ── */}
      <section className="sp__main">
        {/* LEFT */}
        <div className="sp__left">
          {/* Slideshow */}
          <div className="sp__slider">
            {spec.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${spec.name} slide ${idx + 1}`}
                className={`sp__slide ${idx === slide ? "sp__slide--active" : ""}`}
              />
            ))}
            <div className="sp__brand-overlay"><span className="sp__brand-overlay-text">Hippocare Hospital</span></div>
            <div className="sp__dots">
              {spec.images.map((_, idx) => (
                <button
                  key={idx}
                  className={`sp__dot ${idx === slide ? "sp__dot--active" : ""}`}
                  onClick={() => setSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Content with Read More */}
          <article className="sp__content-box">
            <h2>{spec.name}</h2>
            <p>{spec.content[0]}</p>
            {[1, 3, 5].map((i) =>
              spec.content[i] ? (
                <div key={`s${i}`} className="sp__section">
                  <p>{spec.content[i]}</p>
                  {spec.content[i + 1] && (
                    <>
                      <div className={`sp__section-expand ${expanded[`s${i}`] ? "sp__section-expand--open" : ""}`}>
                        <p>{spec.content[i + 1]}</p>
                      </div>
                      <button className="sp__read-more" onClick={() => toggle(`s${i}`)}>
                        {expanded[`s${i}`] ? "Read Less ▲" : "Read More ▼"}
                      </button>
                    </>
                  )}
                </div>
              ) : null
            )}
          </article>

          {/* ── Expert Doctors Carousel ── */}
          {expertDoctors.length > 0 && (
            <section className="sp__experts">
              <div className="sp__experts-header">
                <h2>Expert Doctors</h2>
                <p className="sp__experts-sub">Our Top {spec.name} Specialists at Hippocare Hospital</p>
                <div className="sp__experts-arrows">
                  <button className="sp__experts-arrow" onClick={() => setDocPage((p) => Math.max(p - 1, 0))} disabled={docPage === 0} aria-label="Previous">‹</button>
                  <button className="sp__experts-arrow" onClick={() => setDocPage((p) => Math.min(p + 1, totalPages - 1))} disabled={docPage === totalPages - 1} aria-label="Next">›</button>
                </div>
              </div>
              <div className="sp__experts-track" style={{ transform: `translateX(-${docPage * 100}%)` }}>
                {expertDoctors.map((doc) => (
                  <div className="sp__expert-card" key={doc.id}>
                    <div className="sp__expert-img-wrap">
                      <img src={doc.photo || ""} alt={doc.name} className="sp__expert-img" />
                      <span className="sp__expert-exp">{doc.experience} Yrs Exp.</span>
                    </div>
                    <div className="sp__expert-body">
                      <span className="sp__expert-partner">🏥 Hippocare Partner</span>
                      <h3 className="sp__expert-name" onClick={() => navigate(`/doctor/${doc.id}`)} style={{ cursor: "pointer" }}>{doc.name}</h3>
                      <p className="sp__expert-spec">{doc.specialization}</p>
                      <div className="sp__expert-stats"><span>👍 {doc.recommended} Recommended</span></div>
                      <div className="sp__expert-fee">Consultation Fee: <strong>{doc.fee}</strong></div>
                      <div className="sp__expert-actions">
                        <button className="sp__expert-cta" onClick={() => { const role = localStorage.getItem("hmsRole"); if (role === "patient") { navigate(`/patient/book?doctor=${doc.id}`); } else { navigate(`/login?redirect=/patient/book&doctor=${doc.id}`); } }}>📅 Book Appointment</button>
                        <button className="sp__expert-profile" onClick={() => navigate(`/doctor/${doc.id}`)}>View Profile</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
};

export default SpecialityPage;
