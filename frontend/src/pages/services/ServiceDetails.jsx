import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { services } from "../../data/mockData";
import { getServiceImages } from "../../data/serviceImages";
import useScrollReveal from "../../hooks/useScrollReveal";
import hippocareLogo from "../../assets/hippocare-logo.png";
import "./ServiceDetails.css";

/**
 * ServiceDetails page – dynamic route /services/:serviceName
 *
 * Sections:
 *  1. Hero – title + subtitle
 *  2. Detailed description (3-4 paragraphs)
 *  3. Features list (bullet points)
 *  4. Doctors in the department (dummy cards)
 *  5. Book Appointment CTA
 */
const ServiceDetails = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const revealRef = useScrollReveal({ staggerDelay: 100 });
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState({});
  const toggle = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));

  /* Find the matching service by slug */
  const service = services.find((s) => s.slug === serviceName);

  /* Get rotating images for this service */
  const heroImages = getServiceImages(serviceName);

  /* Auto-advance slideshow every 3.5 s */
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  /* Reset slide & expanded when service changes */
  useEffect(() => {
    setSlide(0);
    setExpanded({});
  }, [serviceName]);

  /* Fallback if the slug doesn't match any service */
  if (!service) {
    return (
      <div className="sd-page">
        <nav className="sd-nav">
          <div className="sd-nav__inner">
            <Link to="/" className="sd-nav__brand">
              <img src={hippocareLogo} alt="Hippocare logo" className="sd-nav__logo" />
              <span>Hippocare Hospital</span>
            </Link>
          </div>
        </nav>
        <div className="sd-not-found">
          <h2>Service Not Found</h2>
          <p>The service you're looking for doesn't exist.</p>
          <Link to="/services" className="sd-cta">Browse All Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sd-page" ref={revealRef}>
      {/* ── Navigation ── */}
      <nav className="sd-nav">
        <div className="sd-nav__inner">
          <Link to="/" className="sd-nav__brand">
            <img src={hippocareLogo} alt="Hippocare logo" className="sd-nav__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="sd-nav__links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* ── 1. Hero Section ── */}
      <header className="sd-hero scroll-reveal">
        <span className="sd-hero__icon">{service.icon}</span>
        <h1 className="sd-hero__title">{service.name}</h1>
        <p className="sd-hero__subtitle">{service.shortDesc}</p>
        <Link to="/services" className="sd-hero__back">← Back to All Services</Link>
      </header>

      {/* ── Image Slider Section ── */}
      {heroImages.length > 0 && (
        <section className="sd-slider-section scroll-reveal">
          {serviceName === "ambulance-services" ? (
            /* Ambulance: image left + content right */
            <div className="sd-ambulance-split">
              <div className="sd-ambulance-split__image">
                <div className="sd-slider">
                  {heroImages.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`${service.name} ${idx + 1}`}
                      className={`sd-slider__img ${idx === slide ? "sd-slider__img--active" : ""}`}
                    />
                  ))}
                </div>
              </div>
              <div className="sd-ambulance-split__content">
                <h2>Hippocare Ambulance Service</h2>
                <p>
                  Our GPS-enabled ambulance fleet covers the city and surrounding regions,
                  ensuring rapid emergency response 24 hours a day, 7 days a week.
                </p>
                <p>
                  Each vehicle is equipped with Advanced Life Support (ALS) systems —
                  cardiac monitors, defibrillators, oxygen supply, IV kits, and trauma
                  equipment — so life-saving care begins before the patient reaches
                  the hospital.
                </p>
                <p>
                  Trained paramedics staff every unit, working in coordination with our
                  centralized dispatch and ER team for seamless patient handoff.
                </p>
              </div>
            </div>
          ) : (
            /* All other services: full-width slider */
            <div className="sd-slider sd-slider--full">
              {heroImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${service.name} ${idx + 1}`}
                  className={`sd-slider__img ${idx === slide ? "sd-slider__img--active" : ""}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── 2. Detailed Description ── */}
      <section className="sd-section scroll-reveal">
        <h2 className="sd-section__heading">About This Department</h2>
        <div className="sd-description">
          {service.description.slice(0, 2).map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
          {service.description.length > 2 && (
            <>
              <div className={`sd-expand ${expanded.desc ? "sd-expand--open" : ""}`}>
                {service.description.slice(2).map((para, idx) => (
                  <p key={idx + 2}>{para}</p>
                ))}
              </div>
              <button className="sd-read-more" onClick={() => toggle("desc")}>
                {expanded.desc ? "Read Less ▲" : "Read More ▼"}
              </button>
            </>
          )}
        </div>
      </section>

      {/* ── 3. Features List ── */}
      <section className="sd-section sd-section--alt scroll-reveal">
        <h2 className="sd-section__heading">Key Services & Features</h2>
        <ul className="sd-features">
          {service.features.slice(0, 4).map((feature, idx) => (
            <li key={idx} className="sd-features__item">
              <span className="sd-features__check">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        {service.features.length > 4 && (
          <>
            <div className={`sd-expand ${expanded.feat ? "sd-expand--open" : ""}`}>
              <ul className="sd-features">
                {service.features.slice(4).map((feature, idx) => (
                  <li key={idx + 4} className="sd-features__item">
                    <span className="sd-features__check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button className="sd-read-more" onClick={() => toggle("feat")}>
              {expanded.feat ? "Read Less ▲" : "Read More ▼"}
            </button>
          </>
        )}
      </section>

      {/* ── 4. Department Doctors ── */}
      <section className="sd-section scroll-reveal">
        <h2 className="sd-section__heading">Our Specialists</h2>
        <div className="sd-doctors">
          {service.doctors.map((doc, idx) => (
            <div key={idx} className="sd-doctor-card">
              <span className="sd-doctor-card__avatar">{doc.avatar}</span>
              <h3 className="sd-doctor-card__name">{doc.name}</h3>
              <p className="sd-doctor-card__qual">{doc.qualification}</p>
              <p className="sd-doctor-card__exp">{doc.experience} experience</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Book Appointment CTA ── */}
      <section className="sd-section sd-section--cta scroll-reveal">
        <h2>Ready to book an appointment?</h2>
        <p>Our {service.name} department is here to help. Schedule a visit today.</p>
        <button className="sd-cta" onClick={() => navigate("/login")}>
          Book Appointment
        </button>
      </section>


    </div>
  );
};

export default ServiceDetails;
