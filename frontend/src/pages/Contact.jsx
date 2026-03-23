import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app this would POST to a backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section className="contact">
      {/* ── LEFT: Info Panel ── */}
      <div className="contact__info">
        <h1 className="contact__heading">You Can Contact With Us</h1>
        <p className="contact__college">Hippocare Hospital &amp; Axis colleges</p>

        <span className="contact__divider" />

        <ul className="contact__details">
          <li>
            <FaMapMarkerAlt className="contact__icon" />
            <div>
              <strong>Address:</strong>
              <span>Hathipur, Maharajpur, Kanpur Nagar(U.P.) 209402</span>
            </div>
          </li>
          <li>
            <FaEnvelope className="contact__icon" />
            <div>
              <strong>Email:</strong>
              <span>Hippocare1942@gmail.com</span>
            </div>
          </li>
          <li>
            <FaPhoneAlt className="contact__icon" />
            <div>
              <strong>Phone:</strong>
              <span>7570869211</span>
            </div>
          </li>
        </ul>

        <div className="contact__socials">
          <a href="https://wa.me/919451163464" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="contact__social contact__social--wa">
            <FaWhatsapp />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61578893700083" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="contact__social contact__social--fb">
            <FaFacebookF />
          </a>
          <a href="https://x.com/alli_husain184" target="_blank" rel="noopener noreferrer" aria-label="X" className="contact__social contact__social--tw">
            <SiX />
          </a>
          <a href="https://www.instagram.com/maliq_bhai_184?igsh=N3RpaTgwbTQ5b3N1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="contact__social contact__social--ig">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* ── RIGHT: Form Panel ── */}
      <div className="contact__form-panel">
        <h2 className="contact__form-heading">SEND YOUR MESSAGE</h2>

        {submitted && (
          <div className="contact__success">
            ✅ Your message has been sent successfully!
          </div>
        )}

        <form className="contact__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            required
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone *"
            required
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            value={form.message}
            onChange={handleChange}
          />
          <button type="submit" className="contact__send-btn">
            SEND
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
