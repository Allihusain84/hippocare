
import { useState } from "react";
import { bills } from "../../data/mockData";
import PaymentModal from "../../components/PaymentModal";
import "./Bills.css";


const Bills = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // Find the first pending bill
  const pendingBill = bills.find((b) => b.status.toLowerCase() === "pending");

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Bills & Payments</h1>
          <p>Track payment status and download receipts.</p>
        </div>
        <button
          className="page__button"
          onClick={() => setModalOpen(true)}
          disabled={!pendingBill}
        >
          Pay Now
        </button>
      </div>

      <div className="table">
        <div className="table__row table__head">
          <span>ID</span>
          <span>Description</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        {bills.map((item) => (
          <div className="table__row" key={item.id}>
            <span>{item.id}</span>
            <span>{item.description}</span>
            <span>{item.amount}</span>
            <span className={`status status--${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Payment Modal for pending bill */}
      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        bill={pendingBill || {}}
      />
    </div>
  );
};

export default Bills;
