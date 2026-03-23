import { useNavigate } from "react-router-dom";
import "./ServiceCard.css";

/**
 * ServiceCard – A reusable card component for displaying a hospital service.
 *
 * Props:
 *  - icon     : emoji or icon string (e.g. "🩺")
 *  - name     : service name displayed as the card title
 *  - shortDesc: 1-2 line description shown below the title
 *  - slug     : URL-friendly name used for navigation
 *  - index    : position index used for staggered animation delay
 *  - compact  : if true, renders a smaller card (used inside the navbar dropdown)
 */
const ServiceCard = ({ icon, name, shortDesc, slug, index = 0, compact = false, linkTo }) => {
  const navigate = useNavigate();

  /* Navigate to the dedicated service details page */
  const handleClick = () => {
    navigate(linkTo || `/services/${slug}`);
  };

  return (
    <div
      className={`service-card ${compact ? "service-card--compact" : ""}`}
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Icon displayed inside a rounded badge */}
      <span className="service-card__icon">{icon}</span>

      {/* Service name */}
      <h3 className="service-card__name">{name}</h3>

      {/* Short description — hidden in compact mode */}
      {!compact && <p className="service-card__desc">{shortDesc}</p>}
    </div>
  );
};

export default ServiceCard;
