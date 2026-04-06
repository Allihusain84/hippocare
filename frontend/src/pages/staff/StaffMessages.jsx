import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./StaffMessages.css";

const demoMessages = [
  { id: 1, from: "Admin Office",         subject: "April Duty Roster Published",                date: "2026-04-06 09:30", read: false, body: "The duty roster for April 2026 has been published. Please review your schedule and confirm your shifts by end of day." },
  { id: 2, from: "Dr. Aisha Verma",      subject: "Patient handover notes \u2014 Room 204",            date: "2026-04-06 08:15", read: false, body: "Please ensure patient Sunita Devi\u2019s vitals (BP, pulse, SpO\u2082) are updated in the chart before 11 AM. She is scheduled for an ECG this afternoon." },
  { id: 3, from: "HR Department",         subject: "Annual Health Checkup \u2014 Schedule Yours",       date: "2026-04-05 14:00", read: false, body: "Annual health checkups for all staff members are being conducted this month. Please book your slot via the HR portal or visit the HR desk." },
  { id: 4, from: "Infection Control",     subject: "Updated PPE guidelines effective immediately", date: "2026-04-04 11:45", read: true,  body: "New PPE guidelines for all ward staff are now in effect. N95 masks are mandatory in ICU and isolation wards. Refer to the updated SOP on the notice board." },
  { id: 5, from: "IT Department",         subject: "HMS Portal v2.5 \u2014 New features available",    date: "2026-04-03 16:20", read: true,  body: "The HMS portal has been updated to v2.5 with improved patient records, faster search, and new dashboard widgets. Report any issues to IT support." },
  { id: 6, from: "Pharmacy",              subject: "Stock alert \u2014 Amoxicillin 500mg low",          date: "2026-04-02 13:10", read: true,  body: "Amoxicillin 500mg stock is running low. New supply expected by April 8. Please use alternative antibiotics where clinically appropriate and inform the attending physician." },
  { id: 7, from: "Dr. Rohan Mehta",       subject: "Post-op care instructions \u2014 Room 302",        date: "2026-04-01 10:00", read: true,  body: "Patient Arun Patel (ACL repair) needs ice compression every 4 hours, leg elevation, and mobility exercises starting tomorrow morning. Please ensure physiotherapy is coordinated." },
  { id: 8, from: "Admin Office",          subject: "Fire drill scheduled \u2014 April 10",              date: "2026-03-31 09:00", read: true,  body: "A hospital-wide fire drill is scheduled for April 10 at 3:00 PM. All staff must participate. Assembly point: main parking lot. Patients will be informed in advance." },
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
