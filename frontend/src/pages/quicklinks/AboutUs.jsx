import { Link } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import hippocareLogo from "../../assets/hippocare-logo.png";
import "./AboutUs.css";

const facilities = [
  { icon: "🚑", title: "24×7 Emergency Services", desc: "Round-the-clock emergency care with rapid-response trauma teams and fully equipped resuscitation bays." },
  { icon: "🏥", title: "ICU & Critical Care Unit", desc: "State-of-the-art multi-disciplinary ICU with advanced ventilators, cardiac monitors and 1:1 nursing ratio." },
  { icon: "🔬", title: "Advanced Laboratory Services", desc: "NABL-accredited diagnostic labs providing accurate pathology, microbiology and biochemistry reports within hours." },
  { icon: "📡", title: "Radiology & Imaging Department", desc: "Digital X-ray, 128-slice CT, 3T MRI, ultrasound and interventional radiology under experienced radiologists." },
  { icon: "💊", title: "In-house Pharmacy", desc: "24-hour pharmacy stocked with genuine medicines, surgical supplies and patient counselling by licensed pharmacists." },
  { icon: "👨‍⚕️", title: "Experienced Doctors & Nursing Staff", desc: "A team of 50+ specialist consultants and 200+ trained nursing professionals committed to compassionate care." },
];

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "50+", label: "Specialist Doctors" },
  { value: "200+", label: "Nursing Staff" },
  { value: "1,00,000+", label: "Patients Treated" },
  { value: "14", label: "Departments" },
  { value: "24/7", label: "Emergency Care" },
];

const AboutUs = () => {
  const revealRef = useScrollReveal({ staggerDelay: 100 });

  return (
    <div className="about" ref={revealRef}>
      {/* ── Navigation ── */}
      <nav className="about__nav">
        <div className="about__nav-inner">
          <Link to="/" className="about__brand">
            <img src={hippocareLogo} alt="Hippocare" className="about__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="about__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/career">Career</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* ── Banner ── */}
      <header className="about__banner scroll-reveal">
        <div className="about__banner-overlay" />
        <div className="about__banner-content">
          <h1>About Us</h1>
        </div>
      </header>

      {/* ── Breadcrumb Bar ── */}
      <nav className="about__breadcrumb-bar" aria-label="Breadcrumb">
        <div className="about__breadcrumb-inner">
          <Link to="/" className="about__bc-home">
            <span className="about__bc-icon">🏠</span>
            <span className="about__bc-text">Home</span>
          </Link>
          <span className="about__bc-sep">/</span>
          <span className="about__bc-current">About Us</span>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          Section 1 — Hero Image + Introduction
         ══════════════════════════════════════════ */}
      <section className="about__intro scroll-reveal">
        <div className="about__intro-img-wrap">
          {/* 🔽 Replace the src below with your actual hospital image file name */}
          <img
            src="/images/hippocare-hospital.png"
            alt="Hippocare Hospital & Research Center"
            className="about__intro-img"
          />
          <div className="about__intro-badge">Estd. 2011</div>
        </div>

        <div className="about__intro-text">
          <h2>About Hippocare Hospital</h2>
          <p>
            Established in 2011, <strong>Hippocare Hospital &amp; Research Center</strong> has
            grown into one of the most trusted multi-speciality healthcare institutions in the
            region. Our mission is to deliver <em>high-quality, patient-centered healthcare</em>{" "}
            that is accessible, affordable, and rooted in compassion.
          </p>
          <p>
            Backed by a team of <strong>experienced doctors and surgeons</strong>, we combine
            clinical excellence with <strong>advanced medical equipment</strong> — from
            state-of-the-art operating theatres to cutting-edge diagnostic imaging — ensuring
            every patient receives an accurate diagnosis and effective treatment under one roof.
          </p>
          <p>
            At Hippocare, patient safety is not just a protocol — it is a culture. Every process,
            from admission to discharge, is designed around the pillars of{" "}
            <strong>safety, compassion, transparency, and modern treatment practices</strong>.
            Our dedicated staff works around the clock to provide a healing environment where
            patients and their families feel cared for at every step.
          </p>
        </div>
      </section>

      {/* ── Stats Counter Bar ── */}
      <section className="about__stats scroll-reveal">
        {stats.map((s) => (
          <div key={s.label} className="about__stat">
            <span className="about__stat-value">{s.value}</span>
            <span className="about__stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ══════════════════════════════════════════
          Section 2 — Our Facilities
         ══════════════════════════════════════════ */}
      <section className="about__facilities scroll-reveal">
        <h2 className="about__section-heading">Our World-Class Facilities</h2>
        <p className="about__section-sub">
          Every department at Hippocare is equipped with the latest technology and managed by
          qualified professionals to ensure the highest standard of care.
        </p>

        <div className="about__fac-grid">
          {facilities.map((f) => (
            <div key={f.title} className="about__fac-card scroll-reveal">
              <span className="about__fac-icon">{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Section 3 — Staff Image + Commitment
         ══════════════════════════════════════════ */}
      <section className="about__commitment scroll-reveal">
        <div className="about__commit-text">
          <h2>Our Commitment to You</h2>
          <p>
            Hippocare Hospital is built on the belief that <strong>quality healthcare should
            be affordable</strong> for every individual and family. We have invested in{" "}
            <strong>modern infrastructure</strong> — spacious wards, advanced ICU beds,
            modular operation theatres, and a paperless digital records system — to streamline
            the patient experience from registration to recovery.
          </p>
          <p>
            Our campus features a <strong>clean, hygienic environment</strong> maintained by
            round-the-clock housekeeping and infection-control teams following international
            protocols. We believe that healing happens faster in a space designed for comfort,
            dignity, and positivity.
          </p>
          <p>
            Above all, <strong>dedicated patient care</strong> is what defines us. From our
            empathetic nursing staff to our specialist consultants, every member of the
            Hippocare family is united by a single purpose — to help you and your loved ones
            get back to good health, safely and with confidence.
          </p>

          <div className="about__commit-highlights">
            <div className="about__highlight">
              <span className="about__highlight-icon">💰</span>
              <div>
                <strong>Affordable Treatment</strong>
                <p>Transparent pricing with no hidden charges. Cashless insurance accepted.</p>
              </div>
            </div>
            <div className="about__highlight">
              <span className="about__highlight-icon">🏗️</span>
              <div>
                <strong>Modern Infrastructure</strong>
                <p>150+ bed capacity with modular OTs, digital records, and smart wards.</p>
              </div>
            </div>
            <div className="about__highlight">
              <span className="about__highlight-icon">🧹</span>
              <div>
                <strong>Clean Environment</strong>
                <p>International-grade infection control and 24/7 housekeeping protocols.</p>
              </div>
            </div>
            <div className="about__highlight">
              <span className="about__highlight-icon">❤️</span>
              <div>
                <strong>Dedicated Patient Care</strong>
                <p>Personalised treatment plans with compassionate bedside care.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about__commit-img-wrap">
          {/* 🔽 Replace the src below with your hospital staff/team image */}
          <img
            src="/images/hospital-staff.jpg"
            alt="Hippocare Hospital Staff"
            className="about__commit-img"
          />
          <div className="about__commit-caption">Our dedicated medical team</div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about__cta scroll-reveal">
        <h3>Experience Healthcare, the Hippocare Way</h3>
        <p>
          Whether you need a routine check-up or advanced surgical care, our doors are always open.
        </p>
        <div className="about__cta-btns">
          <Link to="/services" className="about__cta-primary">Explore Our Services</Link>
          <Link to="/career" className="about__cta-secondary">Join Our Team</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
