import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThreeBackground from "../components/ThreeBackground";
import ServiceCard from "../components/ServiceCard";
import TopBar from "../components/TopBar";
import LocationMap from "../components/LocationMap";
import ContactModal from "../components/ContactModal";
import SearchAnimButton from "../components/SearchAnimButton";
import useScrollReveal from "../hooks/useScrollReveal";
import { services } from "../data/mockData";

/* 24×7 services shown in the navbar dropdown */
const navServices = [
  { name: "Accident Trauma & Emergency", icon: "🚨", link: "/accident-trauma-emergency" },
  { name: "Ambulance Services", icon: "🚑", link: "/services/ambulance-services" },
  { name: "Pharmacy", icon: "💊", link: "/pharmacy" },
  { name: "Radiology", icon: "📡", link: "/services/radiology" },
  { name: "Clinical Laboratory", icon: "🧪", link: "/services/clinical-laboratory" },
  { name: "Insurance Empanelment", icon: "🛡️", link: "/services/insurance-empanelment" },
];

/* Career openings shown in the navbar dropdown */
const navCareers = [
  { title: "Staff Nurse — ICU", dept: "Nursing", icon: "🏥" },
  { title: "Junior Resident — General Medicine", dept: "Medical", icon: "🩺" },
  { title: "Lab Technician", dept: "Pathology", icon: "🔬" },
  { title: "Pharmacist", dept: "Pharmacy", icon: "💊" },
  { title: "Receptionist / Front Desk", dept: "Administration", icon: "🗂️" },
  { title: "Radiography Technician", dept: "Radiology", icon: "📡" },
];
import "./Landing.css";
import hippocareLogo from "../assets/hippocare-logo.png";
import heroSlide1 from "../assets/hero-slide-1.jpg";
import heroSlide2 from "../assets/hero-slide-2.jpg";
import heroSlide3 from "../assets/hero-slide-3.jpeg";
import heroSlide4 from "../assets/hero-slide-4.jpg";

const heroSlides = [heroSlide1, heroSlide2, heroSlide3, heroSlide4];

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const dropdownRef = useRef(null);
  const careerDropdownRef = useRef(null);
  const revealRef = useScrollReveal({ staggerDelay: 120 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  /* Close dropdowns when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
      if (careerDropdownRef.current && !careerDropdownRef.current.contains(e.target)) {
        setCareerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Gemini chat state
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAskGemini = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError('');
    setAnswer('');
    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: question })
      });
      const data = await res.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setAnswer(data.candidates[0].content.parts[0].text);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError('No answer received.');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="landing" ref={revealRef}>
      {/* Slim top bar with contact info + login/register */}
      <TopBar />

      <nav className="landing__nav" aria-label="Primary">
        <div className="landing__nav-content">
          <div className="landing__brand">
            <img
              className="landing__logo"
              src={hippocareLogo}
              alt="Hippocare logo"
            />
            <span className="landing__brand-text">Hippocare Hospital</span>
          </div>
          <div className="landing__menu">
            <a href="#home">Home</a>
            <Link to="/about">About</Link>

            {/* Services dropdown trigger */}
            <div
              className="landing__services-wrapper"
              ref={dropdownRef}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`landing__services-btn ${servicesOpen ? "landing__services-btn--active" : ""}`}
                onClick={() => setServicesOpen((prev) => !prev)}
                aria-expanded={servicesOpen}
              >
                Services <span className="landing__services-arrow">{servicesOpen ? "▲" : "▼"}</span>
              </button>

              {/* Dropdown panel – 24×7 Services list */}
              <div className={`landing__services-panel ${servicesOpen ? "landing__services-panel--open" : ""}`}>
               <div className="landing__services-panel-card">
                <h4 className="landing__services-panel-title">24×7 Services</h4>
                <ul className="landing__services-list">
                  {navServices.map((svc) => (
                    <li key={svc.link} className="landing__services-list-item">
                      <Link
                        to={svc.link}
                        className="landing__services-list-link"
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className="landing__services-list-icon">{svc.icon}</span>
                        {svc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="landing__services-footer">
                  <Link
                    to="/services"
                    className="landing__services-viewall"
                    onClick={() => setServicesOpen(false)}
                  >
                    View Other Resources →
                  </Link>
                </div>
               </div>
              </div>
            </div>

            {/* Career dropdown trigger */}
            <div
              className="landing__career-wrapper"
              ref={careerDropdownRef}
              onMouseEnter={() => setCareerOpen(true)}
              onMouseLeave={() => setCareerOpen(false)}
            >
              <button
                className={`landing__career-btn ${careerOpen ? "landing__career-btn--active" : ""}`}
                onClick={() => setCareerOpen((prev) => !prev)}
                aria-expanded={careerOpen}
              >
                Career <span className="landing__career-arrow">{careerOpen ? "▲" : "▼"}</span>
              </button>

              <div className={`landing__career-panel ${careerOpen ? "landing__career-panel--open" : ""}`}>
               <div className="landing__career-panel-card">
                <h4 className="landing__career-panel-title">Current Openings</h4>
                <ul className="landing__career-list">
                  {navCareers.map((job) => (
                    <li key={job.title} className="landing__career-list-item">
                      <Link
                        to="/career"
                        className="landing__career-list-link"
                        onClick={() => setCareerOpen(false)}
                      >
                        <span className="landing__career-list-icon">{job.icon}</span>
                        <div className="landing__career-list-info">
                          <span className="landing__career-list-title">{job.title}</span>
                          <span className="landing__career-list-dept">{job.dept}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="landing__career-footer">
                  <Link
                    to="/career"
                    className="landing__career-viewall"
                    onClick={() => setCareerOpen(false)}
                  >
                    View All Careers →
                  </Link>
                </div>
               </div>
              </div>
            </div>

            <a href="#" onClick={(e) => { e.preventDefault(); setContactOpen(true); }}>Contact</a>
            <SearchAnimButton />
          </div>
        </div>
      </nav>
      <header className="landing__hero" id="home">
        <div className="landing__slider">
          {heroSlides.map((src, index) => (
            <img
              key={index}
              className={`landing__slide ${index === currentSlide ? "landing__slide--active" : ""}`}
              src={src}
              alt={`Hospital slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="landing__canvas">
          <ThreeBackground />
        </div>
        <div className="landing__hero-content scroll-reveal">
          <p className="landing__tag">Good Care. Smart Management.</p>
          <h1>Hippocare – Smart Hospital Management System</h1>
          <p>
            A unified hospital operations hub that connects administrators,
            doctors, and patients with fast, reliable workflows.
          </p>
          <div className="landing__actions">
            <Link to="/login" className="landing__cta">
              Explore Demo Login
            </Link>
            <Link to="/register" className="landing__ghost">
              Register Account
            </Link>
          </div>
        </div>
      </header>

      <section className="landing__section" id="about">
        <h2 className="scroll-reveal">Hospital Features & Functionality</h2>
        <div className="landing__grid">
          <div className="landing__card scroll-reveal">
            <h3>Central Admin Control</h3>
            <p>Manage doctor rosters, patient records, and appointment queues.</p>
          </div>
          <div className="landing__card scroll-reveal">
            <h3>Doctor Workflow</h3>
            <p>Track daily schedules, review appointments, and issue prescriptions.</p>
          </div>
          <div className="landing__card scroll-reveal">
            <h3>Patient Services</h3>
            <p>Book visits, view appointment status, and monitor bills.</p>
          </div>
          <div className="landing__card scroll-reveal">
            <h3>Operational Insights</h3>
            <p>Daily activity summary cards for instant hospital visibility.</p>
          </div>
        </div>
      </section>

      <section className="landing__section landing__section--alt" id="services">
        <h2 className="scroll-reveal">Quick Role Access</h2>
        <p className="landing__sub">
          Use quick login buttons for demo credentials.
        </p>
        <div className="landing__roles">
          <Link to="/login?role=admin" className="landing__role scroll-reveal">
            <span>Admin</span>
            <p>Manage doctors, patients, and appointments.</p>
          </Link>
          <Link to="/login?role=doctor" className="landing__role scroll-reveal">
            <span>Doctor</span>
            <p>View schedule and create prescriptions.</p>
          </Link>
          <Link to="/login?role=patient" className="landing__role scroll-reveal">
            <span>Patient</span>
            <p>Book visits, track bills, and appointments.</p>
          </Link>
        </div>
      </section>

      <section className="landing__section">
        <h2 className="scroll-reveal">Patient & Doctor Reviews</h2>
        <div className="landing__reviews">
          <article className="landing__review scroll-reveal">
            <p>
              “Booking appointments is effortless. I can see my bills and
              upcoming visits in minutes.”
            </p>
            <div>
              <strong>Ritika Sharma</strong>
              <span>Patient</span>
            </div>
          </article>
          <article className="landing__review scroll-reveal">
            <p>
              “The daily dashboard helps me focus on patients without missing
              follow-ups.”
            </p>
            <div>
              <strong>Dr. Aman Joshi</strong>
              <span>Consultant</span>
            </div>
          </article>
          <article className="landing__review scroll-reveal">
            <p>
              “Admin operations are streamlined with quick visibility of
              appointments and ward activity.”
            </p>
            <div>
              <strong>Neha Kapoor</strong>
              <span>Admin Supervisor</span>
            </div>
          </article>
        </div>
      </section>



      {/* Location / Map section – above footer */}
      <LocationMap />

      {/* Contact Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: 8, maxWidth: 500 }}>
        <h2>Ask Gemini</h2>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Type your question..."
          style={{ width: '80%', padding: 8, marginRight: 8 }}
          onKeyDown={e => { if (e.key === 'Enter') handleAskGemini(); }}
        />
        <button onClick={handleAskGemini} disabled={loading} style={{ padding: 8 }}>
          {loading ? 'Asking...' : 'Ask'}
        </button>
        {answer && (
          <div style={{ marginTop: 16, background: '#f6f6f6', padding: 12, borderRadius: 6 }}>
            <strong>Gemini:</strong>
            <div>{answer}</div>
          </div>
        )}
        {error && (
          <div style={{ marginTop: 16, color: 'red' }}>{error}</div>
        )}
      </div>
    </div>
  );
};

export default Landing;
