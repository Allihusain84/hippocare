import { useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import hippocareLogo from "../../assets/hippocare-logo.png";
import "./VideoGallery.css";

const videos = [
  { id: 1, title: "What is Coma", youtubeId: "B7m9bMS_nbc", thumb: "https://img.youtube.com/vi/B7m9bMS_nbc/hqdefault.jpg", desc: "Learn about coma, its causes, symptoms, and how it is managed in a medical setting." },
  { id: 2, title: "What is CT scan And MRI", youtubeId: "gGk3xJQgJNc", thumb: "https://img.youtube.com/vi/gGk3xJQgJNc/hqdefault.jpg", desc: "Understand the differences between CT scans and MRI, their uses, and what to expect during these diagnostic procedures." },
  { id: 3, title: "What is Organ Donation?", youtubeId: "Kg_4Q1uKHNo", thumb: "https://img.youtube.com/vi/Kg_4Q1uKHNo/hqdefault.jpg", desc: "Discover the importance of organ donation, the process involved, and how it saves lives." },
  { id: 4, title: "Orthopedics", youtubeId: "JBMj4HKlr20", thumb: "https://img.youtube.com/vi/JBMj4HKlr20/hqdefault.jpg", desc: "Explore the field of orthopedics, including common bone and joint conditions and their treatments." },
  { id: 5, title: "What is Neurology", youtubeId: "O7tOEmY-cEw", thumb: "https://img.youtube.com/vi/O7tOEmY-cEw/hqdefault.jpg", desc: "An introduction to neurology, the study of the nervous system, and what neurologists do." },
  { id: 6, title: "What is Pediatrics neurology", youtubeId: "2MzqS90waig", thumb: "https://img.youtube.com/vi/2MzqS90waig/hqdefault.jpg", desc: "Learn about pediatric neurology, focusing on neurological disorders in children and their management." },
  { id: 7, title: "What is Multiple Sclerosis?", youtubeId: "oGt16EruazM", thumb: "https://img.youtube.com/vi/oGt16EruazM/hqdefault.jpg", desc: "Find out what multiple sclerosis is, its symptoms, and how it affects the nervous system." },
  { id: 8, title: "Radiology", youtubeId: "BiE3IBCPadw", thumb: "https://img.youtube.com/vi/BiE3IBCPadw/hqdefault.jpg", desc: "Get an overview of radiology, the role of imaging in diagnosis, and the types of scans used in medicine." },
  { id: 9, title: "Which medicine is used for what", youtubeId: "MakrclVxolc", thumb: "https://img.youtube.com/vi/MakrclVxolc/hqdefault.jpg", desc: "A guide to understanding common medicines, their uses, and how to identify them for various conditions." },
];

const VideoGallery = () => {
  const [playing, setPlaying] = useState(null);
  const revealRef = useScrollReveal({ staggerDelay: 100 });

  return (
    <div className="vg" ref={revealRef}>
      {/* Nav */}
      <nav className="vg__nav">
        <div className="vg__nav-inner">
          <Link to="/" className="vg__brand">
            <img src={hippocareLogo} alt="Hippocare" className="vg__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="vg__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* Banner */}
      <header className="vg__banner scroll-reveal">
        <div className="vg__banner-overlay" />
        <div className="vg__banner-content">
          <h1>Video Gallery</h1>
          <p className="vg__breadcrumb">
            <Link to="/">Home</Link><span>/</span>Video Gallery
          </p>
        </div>
      </header>

      {/* Grid */}
      <section className="vg__section">
        <p className="vg__subtitle">◉ Watch &amp; Learn ◉</p>
        <h2 className="vg__heading">Our Video Collection</h2>

        <div className="vg__grid">
          {videos.map((v) => (
            <div key={v.id} className="vg__card scroll-reveal" onClick={() => setPlaying(v)}>
              <div className="vg__thumb-wrap">
                <img src={v.thumb} alt={v.title} className="vg__thumb" loading="lazy" />
                <span className="vg__play">▶</span>
              </div>
              <p className="vg__card-title">{v.title}</p>
              <p className="vg__card-desc" style={{fontSize: '0.95em', color: '#555', marginTop: 4}}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox / player overlay */}
      {playing && (
        <div className="vg__overlay" onClick={() => setPlaying(null)}>
          <div className="vg__player" onClick={(e) => e.stopPropagation()}>
            <button className="vg__close" onClick={() => setPlaying(null)}>✕</button>
            {playing.youtubeId && (
              <div className="vg__player-embed">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${playing.youtubeId}`}
                  title={playing.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <p className="vg__player-title">{playing.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
