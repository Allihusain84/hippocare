import { Link } from "react-router-dom";
import hippocareLogo from "../assets/hippocare-logo.png";
import "./ServiceNav.css";

/**
 * ServiceNav – shared navigation bar for all service / department pages.
 * Replaces the 17 duplicated inline <nav> blocks.
 */
const ServiceNav = () => (
  <nav className="svc-nav">
    <div className="svc-nav__inner">
      <Link to="/" className="svc-nav__brand">
        <img src={hippocareLogo} alt="Hippocare" className="svc-nav__logo" />
        <span>Hippocare Hospital</span>
      </Link>
      <div className="svc-nav__links">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  </nav>
);

export default ServiceNav;
