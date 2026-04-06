import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabaseClient";
import PaymentModal from "../../components/PaymentModal";
import "./Bills.css";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchBills = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data } = await supabase
      .from("payments")
      .select("*")
      .eq("patient_id", user.id)
      .order("payment_date", { ascending: false });

    setBills(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchBills(); }, [fetchBills]);

  const pendingBill = bills.find((b) => (b.status || "").toLowerCase() === "pending");

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Bills & Payments</h1>
          <p>Track payment status and download receipts.</p>
        </div>
        <button className="page__button" onClick={() => setModalOpen(true)} disabled={!pendingBill}>
          Pay Now
        </button>
      </div>

      {bills.length === 0 ? (
        <div className="page__empty"><p>No bills yet.</p></div>
      ) : (
        <div className="table">
          <div className="table__row table__head">
            <span>Description</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Status</span>
          </div>
          {bills.map((item) => (
            <div className="table__row" key={item.id}>
              <span>{item.description || "Hospital Charges"}</span>
              <span>₹{item.amount}</span>
              <span>{item.payment_date ? new Date(item.payment_date).toLocaleDateString() : "—"}</span>
              <span className={`status status--${(item.status || "").toLowerCase()}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}

      <PaymentModal isOpen={modalOpen} onClose={() => { setModalOpen(false); fetchBills(); }} bill={pendingBill || {}} />
    </div>
  );
};

export default Bills;
