import "./LocationMap.css";

/**
 * LocationMap – Embedded Google Map showing Axis Colleges, Rooma, Kanpur.
 *
 * Features:
 *  - Interactive Google Maps embed (zoom, drag)
 *  - "Get Directions" button that opens Google Maps in a new tab
 *  - Fully responsive layout with rounded map container
 */

/* Google Maps search URL – opens directions in a new tab */
const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=Axis+Colleges+Rooma+Kanpur";

/* Embed URL using Google Maps embed with the same query */
const EMBED_URL =
  "https://www.google.com/maps?q=Axis+Colleges+Rooma+Kanpur+Uttar+Pradesh+India&output=embed";

const LocationMap = () => {
  return (
    <section className="location" id="location">
      {/* ── Section heading ── */}
      <div className="location__header">
        <span className="location__icon">📍</span>
        <h2 className="location__title">Our Location</h2>
        <p className="location__subtitle">
          Visit us at Axis Colleges, Rooma, Kanpur, Uttar Pradesh, India
        </p>
      </div>

      {/* ── Map container with rounded corners + shadow ── */}
      <div className="location__map-wrapper">
        <iframe
          className="location__map"
          title="Hippocare Hospital – Axis Colleges, Rooma, Kanpur"
          src={EMBED_URL}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* ── Info cards + Get Directions button ── */}
      <div className="location__info">
        <div className="location__details">
          <div className="location__detail-card">
            <span className="location__detail-icon">🏥</span>
            <div>
              <h4>Hippocare Hospital</h4>
              <p>Axis Colleges, Rooma, Kanpur, Uttar Pradesh, India</p>
            </div>
          </div>
          <div className="location__detail-card">
            <span className="location__detail-icon">🕒</span>
            <div>
              <h4>Working Hours</h4>
              <p>Open 24/7 — Emergency services always available</p>
            </div>
          </div>
          <div className="location__detail-card">
            <span className="location__detail-icon">📞</span>
            <div>
              <h4>Contact</h4>
              <p>+91 7570869211 · Hippocare1942@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Direction button – opens Google Maps in new tab */}
        <a
          className="location__directions-btn"
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          🧭 Get Directions
        </a>
      </div>
    </section>
  );
};

export default LocationMap;
