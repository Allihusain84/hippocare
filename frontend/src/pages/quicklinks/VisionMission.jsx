import { Link } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import hippocareLogo from "../../assets/hippocare-logo.png";
import "./VisionMission.css";

const VisionMission = () => {
  const revealRef = useScrollReveal({ staggerDelay: 120 });

  return (
    <div className="vm" ref={revealRef}>
      {/* Nav */}
      <nav className="vm__nav">
        <div className="vm__nav-inner">
          <Link to="/" className="vm__brand">
            <img src={hippocareLogo} alt="Hippocare" className="vm__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="vm__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* Banner */}
      <header className="vm__banner scroll-reveal">
        <div className="vm__banner-overlay" />
        <div className="vm__banner-content">
          <h1>Vision, Mission &amp; Values</h1>
          <p className="vm__breadcrumb">
            <Link to="/">Home</Link><span>/</span>Vision Mission &amp; Values
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="vm__section">
        <div className="vm__card scroll-reveal">
          <h2>🔭 Our Vision</h2>
          <p>
            To be a globally recognized center of medical excellence, delivering
            compassionate, patient-centered healthcare powered by innovation,
            technology, and a commitment to continuous improvement. We envision a
            world where every individual has access to high-quality medical care,
            irrespective of their socio-economic background.
          </p>
          <p>
            Hippocare Hospital aspires to set new benchmarks in clinical outcomes,
            medical education, and research — becoming the most trusted healthcare
            institution in the region and a beacon of hope for patients and their
            families.
          </p>
        </div>

        <div className="vm__card scroll-reveal">
          <h2>🎯 Our Mission</h2>
          <p>
            Our mission is to provide comprehensive, affordable, and accessible
            healthcare services through a team of highly skilled professionals
            using cutting-edge technology and evidence-based practices. We are
            committed to treating every patient with dignity, respect, and
            empathy.
          </p>
          <p>
            We strive to build a healthcare ecosystem that integrates preventive
            care, early diagnosis, advanced treatment, and holistic rehabilitation
            — ensuring that patients receive seamless, end-to-end medical support
            under one roof.
          </p>
          <p>
            Through our Hospital Management System, we leverage digital
            technology to streamline patient records, appointment scheduling,
            billing, and interdepartmental coordination — reducing wait times
            and improving the overall patient experience.
          </p>
        </div>

        <div className="vm__card scroll-reveal">
          <h2>💎 Our Core Values</h2>
          <ul className="vm__values-list">
            <li><strong>Patient First —</strong> Every decision we make is guided by the best interest of our patients. Their safety, comfort, and well-being are non-negotiable priorities.</li>
            <li><strong>Clinical Excellence —</strong> We pursue the highest standards of medical practice, continuously updating our knowledge, skills, and infrastructure to deliver world-class outcomes.</li>
            <li><strong>Compassion &amp; Empathy —</strong> We treat patients not as cases but as people. Emotional support, active listening, and genuine care are at the heart of everything we do.</li>
            <li><strong>Integrity &amp; Transparency —</strong> Honest communication, ethical practices, and transparent billing build the trust that our patients place in us.</li>
            <li><strong>Innovation —</strong> From AI-powered diagnostics to our fully integrated Hospital Management System, we embrace technology to enhance care delivery and operational efficiency.</li>
            <li><strong>Teamwork —</strong> Outstanding healthcare is a team effort. Our doctors, nurses, technicians, and administrative staff work collaboratively to ensure seamless patient care.</li>
            <li><strong>Community Responsibility —</strong> We actively engage in health awareness campaigns, free medical camps, and community outreach programs to improve public health beyond our hospital walls.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default VisionMission;
