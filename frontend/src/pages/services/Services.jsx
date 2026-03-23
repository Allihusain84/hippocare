import { Link } from "react-router-dom";
import ServiceCard from "../../components/ServiceCard";
import { services } from "../../data/mockData";
import useScrollReveal from "../../hooks/useScrollReveal";
import hippocareLogo from "../../assets/hippocare-logo.png";
import "./Services.css";

/**
 * Services page – displays every hospital service in a responsive grid.
 * Accessible at /services
 */
const Services = () => {
  const revealRef = useScrollReveal({ staggerDelay: 80 });

  return (
    <div className="services-page" ref={revealRef}>
      {/* ── Top navigation bar ── */}
      <nav className="services-page__nav">
        <div className="services-page__nav-inner">
          <Link to="/" className="services-page__brand">
            <img src={hippocareLogo} alt="Hippocare logo" className="services-page__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="services-page__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services" className="services-page__nav-active">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero banner ── */}
      <header className="services-page__hero scroll-reveal">
        <h1>Our Services</h1>
        <p>
          Hippocare offers a wide range of medical services designed to provide
          comprehensive, high-quality care for every patient.
        </p>
      </header>

      {/* ── Service cards grid ── */}
      <section className="services-page__grid-wrapper">
        <div className="services-page__grid">
          {services.map((svc, idx) => (
            <div className="scroll-reveal" key={svc.slug}>
              <ServiceCard
                icon={svc.icon}
                name={svc.name}
                shortDesc={svc.shortDesc}
                slug={svc.slug}
                index={idx}
              />
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default Services;
