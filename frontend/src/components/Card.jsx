import "./Card.css";

const Card = ({ title, value, subtitle }) => {
  return (
    <div className="card">
      <div className="card__body">
        <p className="card__title">{title}</p>
        <h3 className="card__value">{value}</h3>
        {subtitle ? <p className="card__subtitle">{subtitle}</p> : null}
      </div>
    </div>
  );
};

export default Card;
