
import React, { useState } from "react";
import jsPDF from "jspdf";
import "./PaymentModal.css";

const UPI_ID = "allihusain184-1@okicici";
const PAYMENT_METHODS = [
  { name: "Google Pay", icon: "/images/services/gpay.png" },
  { name: "PhonePe", icon: "/images/services/phonepe.png" },
  { name: "Paytm", icon: "/images/services/paytm.png" },
  { name: "BHIM", icon: "/images/services/bhim.png" },
];

function getAmountNumber(amountString) {
  // Remove currency symbol and commas, return as number
  if (!amountString) return 0;
  return Number(amountString.replace(/[^\d.]/g, ""));
}

function getDynamicUPIQR(upiId, amount, name = "Hippocare") {
  // UPI QR code URL (Google Chart API)
  const amt = getAmountNumber(amount);
  return `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&am=${amt}`;
}

const PaymentModal = ({ isOpen, onClose, bill }) => {
  const [step, setStep] = useState("pay");
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0].name);
  const [loading, setLoading] = useState(false);

  // Show receipt automatically after payment method is clicked or QR is scanned
  function handlePaymentAction(methodName) {
    setSelectedMethod(methodName);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("receipt");
    }, 1200);
  }
  if (!isOpen) return null;

  const handlePaymentDone = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("receipt");
    }, 1200); // Simulate payment processing
  };

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
    doc.text("Payment Receipt", 20, 20);
    doc.text(`Bill ID: ${bill.id || "-"}`, 20, 35);
    doc.text(`Description: ${bill.description || "-"}`, 20, 45);
    doc.text(`Amount: ${bill.amount || "-"}`, 20, 55);
    doc.text(`Payment Method: ${selectedMethod}`, 20, 65);
    doc.text(`Status: Paid`, 20, 75);
    doc.save("payment-receipt.pdf");
  };

  const handleBack = () => {
    setStep("pay");
  };

  // Fallback for missing icons
  const handleImgError = (e) => {
    e.target.style.display = "none";
  };

  // UPI deep link for direct app open
  function getUPILink(app) {
    const amt = getAmountNumber(bill.amount);
    const upiBase = `upi://pay?pa=${UPI_ID}&pn=Hippocare&am=${amt}`;
    if (app === "Google Pay") return `https://pay.google.com/gp/p/ui/pay?${upiBase}`;
    if (app === "PhonePe") return `phonepe://pay?${upiBase}`;
    if (app === "Paytm") return `paytmmp://pay?${upiBase}`;
    if (app === "BHIM") return `bhim://upi/pay?${upiBase}`;
    return upiBase;
  }

  return (
    <div className="payment-modal__overlay" onClick={onClose}>
      <div className="payment-modal__box" onClick={e => e.stopPropagation()}>
        {step === "pay" && (
          <>
            <h2>Pay Your Bill</h2>
            <p><b>Bill ID:</b> {bill.id}</p>
            <p><b>Description:</b> {bill.description}</p>
            <p><b>Amount:</b> {bill.amount}</p>
            <div className="payment-methods">
              <p><b>Select Payment Method:</b></p>
              <div className="payment-methods__list">
                {PAYMENT_METHODS.map((method) => (
                  <a
                    key={method.name}
                    href={getUPILink(method.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`payment-method-btn${selectedMethod === method.name ? " selected" : ""}`}
                    onClick={() => handlePaymentAction(method.name)}
                  >
                    <img src={method.icon} alt={method.name} className="payment-method-icon" onError={handleImgError} />
                    {method.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="payment-modal__section">
              <p><b>UPI ID:</b> <span className="upi-id">{UPI_ID}</span></p>
              <img
                src={getDynamicUPIQR(UPI_ID, bill.amount)}
                alt="UPI QR Code"
                className="payment-modal__qr"
                onError={e => { e.target.onerror = null; e.target.src = "/images/services/upi-qr.png"; }}
              />
              <p className="payment-modal__scan-note">Scan QR code with your selected app to pay. The amount will be filled automatically.</p>
            </div>
            {/* Payment Complete button removed for auto receipt */}
            <button className="payment-modal__close" onClick={onClose} disabled={loading}>Close</button>
            {loading && <div className="payment-modal__processing">Processing payment...</div>}
          </>
        )}
        {step === "receipt" && (
          <>
            <h2>Payment Successful</h2>
            <div className="receipt-box">
              <p><b>Bill ID:</b> {bill.id}</p>
              <p><b>Description:</b> {bill.description}</p>
              <p><b>Amount:</b> {bill.amount}</p>
              <p><b>Payment Method:</b> {selectedMethod}</p>
              <p><b>Status:</b> Paid</p>
            </div>
            <button className="payment-modal__download" onClick={handleDownloadReceipt}>Download PDF Receipt</button>
            <button className="payment-modal__close" onClick={onClose}>Close</button>
            <button className="payment-modal__back" onClick={handleBack}>Back</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
