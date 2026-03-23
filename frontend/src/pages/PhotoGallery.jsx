import { useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";
import "./PhotoGallery.css";

/* Hospital-themed photos — covers all departments & services */
const photos = [
  /* ── Hospital Infrastructure ── */
  { id: 1,  src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80", alt: "Modern Hospital Building" },
  { id: 2,  src: "/images/hippocare-hospital.png", alt: "Hippocare Hospital Building" },
  { id: 3,  src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80", alt: "Hospital Reception & Front Desk" },
  { id: 4,  src: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&q=80", alt: "Patient Room & Ward" },

  /* ── Emergency & Trauma ── */
  { id: 5,  src: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600&q=80", alt: "Emergency Department – Trauma Care" },

  /* ── Operation Theatre & ICU ── */
  { id: 8,  src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&q=80", alt: "Operation Theatre – Surgery in Progress" },

  /* ── Doctors & Medical Team ── */
  { id: 10, src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80", alt: "Doctor Team – Medical Staff" },
  { id: 11, src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80", alt: "Doctor Consultation – Patient Checkup" },
  { id: 12, src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80", alt: "Senior Doctor – Specialist" },

  /* ── Nursing Staff ── */
  { id: 13, src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80", alt: "Nursing Staff – Patient Care" },
  { id: 14, src: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80", alt: "Nurse Monitoring Vital Signs" },

  /* ── Laboratory & Pathology ── */
  { id: 15, src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80", alt: "Clinical Laboratory – Blood Testing" },
  { id: 16, src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80", alt: "Lab Equipment – Microscope Analysis" },

  /* ── Radiology & Imaging ── */
  { id: 17, src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80", alt: "Radiology Department – CT Scan" },
  { id: 18, src: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&q=80", alt: "X-Ray & MRI Imaging Room" },

  /* ── Pharmacy ── */
  { id: 19, src: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80", alt: "Pharmacy – Medicine Dispensary" },
  { id: 20, src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80", alt: "Pharmacy Shelves – Drug Storage" },

  /* ── Ambulance Services ── */
  { id: 21, src: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&q=80", alt: "Ambulance – Emergency Transport" },

  /* ── Physiotherapy & Rehab ── */
  { id: 22, src: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=600&q=80", alt: "Physiotherapy – Rehabilitation Session" },
  { id: 23, src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", alt: "Physical Therapy – Exercise Room" },

  /* ── Dental Department ── */
  { id: 24, src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&q=80", alt: "Dental Clinic – Dentist at Work" },
  { id: 25, src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80", alt: "Dental Chair – Oral Checkup" },

  /* ── Maternity & Gynaecology ── */
  { id: 26, src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80", alt: "Maternity Ward – Newborn Care" },

  /* ── Hospital Events & Workshops ── */
  { id: 27, src: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80", alt: "Health Workshop – Medical Seminar" },
];

const PhotoGallery = () => {
  const [lightbox, setLightbox] = useState(null);
  const revealRef = useScrollReveal({ staggerDelay: 60 });

  const openLightbox = (photo) => setLightbox(photo);
  const closeLightbox = () => setLightbox(null);

  return (
    <div className="pg" ref={revealRef}>
      {/* ── Hero Banner ── */}
      <section className="pg__banner scroll-reveal">
        <div className="pg__banner-overlay" />
        <div className="pg__banner-content">
          <h1 className="pg__banner-title">Photo Gallery</h1>
          <p className="pg__breadcrumb">
            <Link to="/">Home</Link> / <span>Photo Gallery</span>
          </p>
        </div>
        <img
          className="pg__banner-building"
          src="/images/hms.jpeg"
          alt="Hippocare Hospital Building"
        />
      </section>

      {/* ── Gallery Section ── */}
      <section className="pg__section">
        <p className="pg__subtitle">◉ A Glimpse into Wellness ◉</p>
        <h2 className="pg__heading scroll-reveal">A Picture Gallery</h2>

        <div className="pg__grid">
          {photos.map((photo) => (
            <div
              className="pg__card"
              key={photo.id}
              onClick={() => openLightbox(photo)}
            >
              <img
                className="pg__img"
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
              />
              <div className="pg__card-overlay">
                <span className="pg__card-zoom">🔍</span>
              </div>
              <p className="pg__card-caption">{photo.alt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="pg__lightbox" onClick={closeLightbox}>
          <button className="pg__lightbox-close" onClick={closeLightbox}>
            ✕
          </button>
          <img
            className="pg__lightbox-img"
            src={lightbox.src.replace("w=600", "w=1200")}
            alt={lightbox.alt}
          />
          <p className="pg__lightbox-caption">{lightbox.alt}</p>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
