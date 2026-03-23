import { Link } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import hippocareLogo from "../../assets/hippocare-logo.png";
import "./Blog.css";

const posts = [
  {
    id: 1,
    title: "Understanding the Importance of Regular Health Checkups",
    date: "Feb 20, 2026",
    excerpt: "Regular health checkups can detect potential health issues before they become serious. Learn why preventive care is the cornerstone of a healthy life and how Hippocare makes it easy.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    tag: "Wellness",
  },
  {
    id: 2,
    title: "How Our Hospital Management System Improves Patient Care",
    date: "Feb 10, 2026",
    excerpt: "From instant appointment booking to digital prescriptions, explore how Hippocare's HMS streamlines every step of the patient journey and reduces wait times significantly.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    tag: "Technology",
  },
  {
    id: 3,
    title: "5 Tips for Managing Diabetes Effectively",
    date: "Jan 28, 2026",
    excerpt: "Living with diabetes requires careful management. Our endocrinologists share five practical tips that can help patients keep blood sugar levels in check and lead a fulfilling life.",
    image: "https://images.unsplash.com/photo-1631549916768-4be77e48b586?auto=format&fit=crop&w=600&q=80",
    tag: "Health Tips",
  },
  {
    id: 4,
    title: "The Role of Physiotherapy in Post-Surgery Recovery",
    date: "Jan 15, 2026",
    excerpt: "Surgery is just the beginning of recovery. Discover how physiotherapy accelerates healing, restores mobility, and helps patients return to their normal routines faster.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    tag: "Rehabilitation",
  },
  {
    id: 5,
    title: "Emergency Care: What to Do When Every Second Counts",
    date: "Jan 05, 2026",
    excerpt: "Knowing basic first-aid and understanding when to call an ambulance can save lives. Read our emergency readiness guide curated by Hippocare's trauma specialists.",
    image: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=600&q=80",
    tag: "Emergency",
  },
  {
    id: 6,
    title: "Women's Health: Why Regular Gynaecological Checkups Matter",
    date: "Dec 22, 2025",
    excerpt: "From cervical cancer screening to prenatal care, routine gynaecological visits are essential. Our specialists explain what every woman should know about preventive gynaecology.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=80",
    tag: "Women's Health",
  },
];

const Blog = () => {
  const revealRef = useScrollReveal({ staggerDelay: 100 });

  return (
    <div className="blog" ref={revealRef}>
      {/* Nav */}
      <nav className="blog__nav">
        <div className="blog__nav-inner">
          <Link to="/" className="blog__brand">
            <img src={hippocareLogo} alt="Hippocare" className="blog__logo" />
            <span>Hippocare Hospital</span>
          </Link>
          <div className="blog__nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* Banner */}
      <header className="blog__banner scroll-reveal">
        <div className="blog__banner-overlay" />
        <div className="blog__banner-content">
          <h1>Health Blog</h1>
          <p className="blog__breadcrumb">
            <Link to="/">Home</Link><span>/</span>Blog
          </p>
        </div>
      </header>

      {/* Posts Grid */}
      <section className="blog__section">
        <p className="blog__subtitle">Stay Informed, Stay Healthy</p>
        <h2 className="blog__heading">Latest Articles &amp; Health Tips</h2>

        <div className="blog__grid">
          {posts.map((post) => (
            <article key={post.id} className="blog__card scroll-reveal">
              <img src={post.image} alt={post.title} className="blog__card-img" loading="lazy" />
              <div className="blog__card-body">
                <span className="blog__tag">{post.tag}</span>
                <h3 className="blog__card-title">{post.title}</h3>
                <p className="blog__card-date">{post.date}</p>
                <p className="blog__card-excerpt">{post.excerpt}</p>
                <button className="blog__read-more">Read More →</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
