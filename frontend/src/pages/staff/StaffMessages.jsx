import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./StaffMessages.css";

const demoMessages = [
  { id: 1, from: "Admin Office",         subject: "March Duty Roster Published",        date: "2026-03-04 09:30", read: false, body: "The duty roster for March 2026 has been published. Please review your schedule." },
  { id: 2, from: "Dr. Arjun Malhotra",   subject: "Patient handover notes – Room 204",  date: "2026-03-04 08:15", read: false, body: "Please ensure patient Kavita Sharma's vitals are updated in the chart before 11 AM." },
  { id: 3, from: "HR Department",         subject: "ID Card Renewal Reminder",           date: "2026-03-03 14:00", read: true,  body: "Your staff ID card is due for renewal. Please visit HR with a passport-sized photo." },
  { id: 4, from: "Infection Control",     subject: "New sanitisation protocol update",   date: "2026-03-02 11:45", read: true,  body: "Updated hand-hygiene protocol is now effective. Refer to notice board for full details." },
  { id: 5, from: "IT Department",         subject: "System downtime – 6 Mar 2 AM",      date: "2026-03-01 16:20", read: true,  body: "The HMS portal will undergo maintenance on 6 March 2026, 2 AM – 4 AM." },
  { id: 6, from: "Pharmacy",              subject: "Stock update – Paracetamol 500mg",   date: "2026-02-28 13:10", read: true,  body: "Paracetamol 500mg has been restocked. Please update ward inventory." },
];

const StaffMessages = () => {
  const { staff } = useOutletContext();
  const [messages] = useState(demoMessages);
  const [selected, setSelected] = useState(null);

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="sm">
      <div className="sm__header">
        <div>
          <h2>💬 Messages</h2>
          <p>{unread} unread message{unread !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="sm__layout">
        {/* Inbox list */}
        <div className="sm__list">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`sm__item ${!m.read ? "sm__item--unread" : ""} ${selected?.id === m.id ? "sm__item--sel" : ""}`}
              onClick={() => setSelected(m)}
            >
              <div className="sm__item-dot">{!m.read && <span />}</div>
              <div className="sm__item-body">
                <span className="sm__item-from">{m.from}</span>
                <span className="sm__item-subj">{m.subject}</span>
                <span className="sm__item-date">{m.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Message detail */}
        <div className="sm__detail">
          {selected ? (
            <>
              <h3 className="sm__detail-subj">{selected.subject}</h3>
              <div className="sm__detail-meta">
                <span>From: <strong>{selected.from}</strong></span>
                <span>{selected.date}</span>
              </div>
              <p className="sm__detail-body">{selected.body}</p>
            </>
          ) : (
            <div className="sm__detail-empty">
              <span>📩</span>
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffMessages;
