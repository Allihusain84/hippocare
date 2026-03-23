import { Link } from "react-router-dom";
import "./ServiceBanner.css";

/**
 * ServiceBanner – shared hero banner for service / department pages.
 *
 * Props:
 *  - title       : string  (page heading, e.g. "Cardiology")
 *  - category    : string  (breadcrumb middle item, e.g. "Services" or "24×7 Services")
 *  - scrollReveal: boolean (optional, adds scroll-reveal class)
 */
const ServiceBanner = ({ title, category = "Services", scrollReveal = false }) => (
  <header className={`svc-banner${scrollReveal ? " scroll-reveal" : ""}`}>
    <div className="svc-banner__overlay" />
    <div className="svc-banner__content">
      <h1>{title}</h1>
      <p className="svc-banner__breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        {category}
        <span>/</span>
        {title}
      </p>
    </div>
  </header>
);

export default ServiceBanner;
