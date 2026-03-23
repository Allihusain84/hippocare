import { useState } from "react";
import { prescriptions } from "../../data/mockData";
import "./Prescriptions.css";

const Prescriptions = () => {
  const [form, setForm] = useState({
    patient: "",
    medicines: "",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Prescriptions</h1>
          <p>Create digital prescriptions and review history.</p>
        </div>
        <button className="page__button">Sync Pharmacy</button>
      </div>

      <div className="prescriptions">
        <form className="form" onSubmit={handleSubmit}>
          <h3>Create Prescription</h3>
          <label>
            Patient Name
            <input
              type="text"
              name="patient"
              placeholder="Enter patient name"
              value={form.patient}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Medicines
            <textarea
              name="medicines"
              placeholder="List prescribed medicines"
              value={form.medicines}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Notes
            <textarea
              name="notes"
              placeholder="Add diagnosis or instructions"
              value={form.notes}
              onChange={handleChange}
            />
          </label>
          {submitted ? <p className="form__success">Prescription saved (demo).</p> : null}
          <button type="submit" className="page__button">
            Save Prescription
          </button>
        </form>

        <div className="history">
          <h3>Prescription History</h3>
          <div className="table">
            <div className="table__row table__head">
              <span>ID</span>
              <span>Patient</span>
              <span>Date</span>
              <span>Medicines</span>
            </div>
            {prescriptions.map((item) => (
              <div className="table__row" key={item.id}>
                <span>{item.id}</span>
                <span>{item.patient}</span>
                <span>{item.date}</span>
                <span>{item.medicines}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;
