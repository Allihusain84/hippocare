import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import "./Dashboard.css";

/* ── Icons as tiny SVG components ── */
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const IconClipboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
);
const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
);
const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const IconPen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
);
const IconUpload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
);
const IconCal2 = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);


const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [prescriptionCount, setPrescriptionCount] = useState(0);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      setDoctorInfo({ id: user.id, name: profile?.name || "Doctor" });

      const [apptRes, rxRes] = await Promise.all([
        supabase
          .from("appointments")
          .select("*")
          .eq("doctor_id", user.id)
          .order("appointment_date", { ascending: false }),
        supabase
          .from("prescriptions")
          .select("id", { count: "exact", head: true })
          .eq("doctor_id", user.id),
      ]);

      setAppointments((apptRes.data || []).map((a) => ({
        ...a,
        patientName: a.patient_name || "—",
        date: a.appointment_date,
        time: a.appointment_time || "",
      })));
      setPrescriptionCount(rxRes.count || 0);
    };
    load();
  }, []);

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const todayAppointments = appointments.filter((a) => a.date === todayStr);

  const dateStr = today.toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  /* ── Weekly chart data (last 7 days) ── */
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const ds = d.toISOString().split("T")[0];
    return {
      label: weekDays[d.getDay()],
      count: appointments.filter((a) => a.date === ds).length
    };
  });
  const maxWeek = Math.max(...weekData.map((w) => w.count), 1);

  /* ── Recent unique patients ── */
  const recentPatients = [];
  const seen = new Set();
  for (const a of [...appointments].reverse()) {
    if (!seen.has(a.patientName)) {
      seen.add(a.patientName);
      recentPatients.push(a);
    }
    if (recentPatients.length >= 5) break;
  }

  /* ── Schedule timeline for today ── */
  const schedule = todayAppointments
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 6);

  const completedCount = appointments.filter((a) => a.status === "Completed").length;
  const upcomingCount = appointments.filter((a) => a.status === "Confirmed" || a.status === "Waiting").length;

  const statCards = [
    { title: "Today Appointments", value: todayAppointments.length, icon: <IconCalendar />, color: "#0ea5e9", bg: "#eff6ff", badge: "Today", badgeColor: "#0ea5e9" },
    { title: "Prescriptions Written", value: prescriptionCount, icon: <IconClipboard />, color: "#f59e0b", bg: "#fffbeb", badge: "Total", badgeColor: "#f59e0b" },
    { title: "Upcoming", value: upcomingCount, icon: <IconUsers />, color: "#8b5cf6", bg: "#f5f3ff", badge: "Scheduled", badgeColor: "#8b5cf6" },
    { title: "Completed", value: completedCount, icon: <IconStar />, color: "#10b981", bg: "#ecfdf5", badge: "Done", badgeColor: "#10b981" }
  ];

  return (
    <div className="dd">
      {/* ── STAT CARDS ── */}
      <div className="dd__stats">
        {statCards.map((c) => (
          <div className="dd__stat" key={c.title}>
            <div className="dd__stat-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
            <div className="dd__stat-body">
              <p className="dd__stat-label">{c.title}</p>
              <h3 className="dd__stat-value">{c.value}</h3>
            </div>
            <span className="dd__stat-badge" style={{ background: c.bg, color: c.color }}>{c.badge}</span>
          </div>
        ))}
      </div>

      {/* ── MIDDLE ROW: Appointments table + Schedule/Actions ── */}
      <div className="dd__row">
        {/* Left: Today's Appointments */}
        <div className="dd__panel dd__panel--wide">
          <div className="dd__panel-head">
            <h3>Today's Appointments</h3>
            <span className="dd__panel-count">{todayAppointments.length} patients</span>
          </div>
          {todayAppointments.length === 0 ? (
            <p className="dd__empty">No appointments scheduled for today.</p>
          ) : (
            <div className="dd__table-wrap">
              <table className="dd__table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Patient Name</th>
                    <th>Problem</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todayAppointments.map((a) => (
                    <tr key={a.id}>
                      <td className="dd__table-time">{a.time}</td>
                      <td>{a.patientName}</td>
                      <td className="dd__table-concern">{a.concern}</td>
                      <td><span className={`dd__badge dd__badge--${a.status.toLowerCase()}`}>{a.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right column: schedule + quick actions */}
        <div className="dd__right-col">
          {/* Today's Schedule */}
          <div className="dd__panel">
            <div className="dd__panel-head">
              <h3>Today's Schedule</h3>
            </div>
            {schedule.length === 0 ? (
              <p className="dd__empty">No schedule for today.</p>
            ) : (
              <div className="dd__timeline">
                {schedule.map((s, i) => (
                  <div className="dd__tl-item" key={i}>
                    <div className="dd__tl-dot" />
                    <div className="dd__tl-body">
                      <span className="dd__tl-time">{s.time}</span>
                      <span className="dd__tl-name">{s.patientName}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="dd__panel">
            <div className="dd__panel-head"><h3>Quick Actions</h3></div>
            <div className="dd__actions">
              <button className="dd__action" onClick={() => setConsultationOpen(true)}><IconPlus /> Add Patient</button>
              <button className="dd__action" onClick={() => navigate("/doctor/prescriptions")}><IconPen /> Write Prescription</button>
              <button className="dd__action"><IconUpload /> Upload Report</button>
              <button className="dd__action" onClick={() => navigate("/doctor/appointments")}><IconCal2 /> View Calendar</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW: Chart + Recent Patients ── */}
      <div className="dd__row">
        {/* Weekly Chart */}
        <div className="dd__panel dd__panel--wide">
          <div className="dd__panel-head">
            <h3>Weekly Appointments</h3>
            <span className="dd__panel-count">Last 7 days</span>
          </div>
          <div className="dd__chart">
            {weekData.map((w, i) => (
              <div className="dd__chart-col" key={i}>
                <div className="dd__chart-bar-wrap">
                  <div className="dd__chart-bar" style={{ height: `${(w.count / maxWeek) * 100}%` }} />
                </div>
                <span className="dd__chart-label">{w.label}</span>
                <span className="dd__chart-val">{w.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="dd__panel">
          <div className="dd__panel-head">
            <h3>Recent Patients</h3>
            <span className="dd__panel-count">{recentPatients.length} patients</span>
          </div>
          {recentPatients.length === 0 ? (
            <p className="dd__empty">No patient records yet.</p>
          ) : (
            <ul className="dd__patient-list">
              {recentPatients.map((p, i) => (
                <li className="dd__patient" key={i}>
                  <div className="dd__patient-avatar">{p.patientName.charAt(0)}</div>
                  <div className="dd__patient-info">
                    <span className="dd__patient-name">{p.patientName}</span>
                    <span className="dd__patient-sub">{p.concern} · {p.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── START CONSULTATION MODAL ── */}
      {consultationOpen && <ConsultationModal onClose={() => setConsultationOpen(false)} todayAppointments={todayAppointments} doctorName={doctorInfo?.name || "Doctor"} />}
    </div>
  );
};

/* ════════════════════════════════════════════════
   Consultation Modal – full-featured
   ══════════════════════════════════════════════ */
const ConsultationModal = ({ onClose, todayAppointments, doctorName }) => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [consultType, setConsultType] = useState("in-person");
  const [notes, setNotes] = useState("");
  const [vitals, setVitals] = useState({ bp: "", pulse: "", temp: "", spo2: "" });
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let timer;
    if (started) {
      timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [started]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleStart = () => setStarted(true);
  const handleEnd = () => {
    setStarted(false);
    alert(`Consultation ended.\nPatient: ${selectedPatient}\nDuration: ${formatTime(elapsed)}\nNotes saved successfully.`);
    onClose();
  };

  const patientList = [...new Set(todayAppointments.map((a) => a.patientName))];

  return (
    <div className="dd__modal-overlay" onClick={onClose}>
      <div className="dd__modal" onClick={(e) => e.stopPropagation()}>
        <div className="dd__modal-header">
          <h2>🩺 Start Consultation</h2>
          <button className="dd__modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="dd__modal-body">
          {/* Patient selection */}
          <div className="dd__modal-field">
            <label>Select Patient</label>
            <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
              <option value="">-- Choose patient --</option>
              {patientList.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          {/* Consultation type */}
          <div className="dd__modal-field">
            <label>Consultation Type</label>
            <div className="dd__modal-radios">
              {["in-person", "video", "phone"].map((t) => (
                <label key={t} className={`dd__radio-pill ${consultType === t ? "dd__radio-pill--active" : ""}`}>
                  <input type="radio" name="consultType" value={t} checked={consultType === t} onChange={() => setConsultType(t)} />
                  {t === "in-person" ? "🏥 In-Person" : t === "video" ? "📹 Video Call" : "📞 Phone"}
                </label>
              ))}
            </div>
          </div>

          {/* Vitals */}
          <div className="dd__modal-field">
            <label>Patient Vitals</label>
            <div className="dd__vitals-grid">
              <input placeholder="BP (e.g. 120/80)" value={vitals.bp} onChange={(e) => setVitals({ ...vitals, bp: e.target.value })} />
              <input placeholder="Pulse (bpm)" value={vitals.pulse} onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })} />
              <input placeholder="Temp (°F)" value={vitals.temp} onChange={(e) => setVitals({ ...vitals, temp: e.target.value })} />
              <input placeholder="SpO₂ (%)" value={vitals.spo2} onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })} />
            </div>
          </div>

          {/* Notes */}
          <div className="dd__modal-field">
            <label>Consultation Notes</label>
            <textarea rows="4" placeholder="Symptoms, observations, diagnosis..." value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>

          {/* Timer */}
          {started && (
            <div className="dd__consult-timer">
              <span className="dd__timer-dot" />
              <span>In Progress — {formatTime(elapsed)}</span>
              <span className="dd__timer-doc">Dr. {doctorName.replace(/^Dr\.\s*/i, "")} → {selectedPatient || "Patient"}</span>
            </div>
          )}
        </div>

        <div className="dd__modal-footer">
          {!started ? (
            <button className="dd__modal-btn dd__modal-btn--start" onClick={handleStart} disabled={!selectedPatient}>
              ▶ Start Consultation
            </button>
          ) : (
            <button className="dd__modal-btn dd__modal-btn--end" onClick={handleEnd}>
              ⏹ End Consultation
            </button>
          )}
          <button className="dd__modal-btn dd__modal-btn--cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
