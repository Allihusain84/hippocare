import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import "./Settings.css";

/* ═══════════════════════════════════════════════
   localStorage keys
   ═══════════════════════════════════════════════ */
const LS = {
  general: "hmsSettingsGeneral",
  departments: "hmsSettingsDepartments",
  doctorConfig: "hmsSettingsDoctorConfig",
  appointment: "hmsSettingsAppointment",
  billing: "hmsSettingsBilling",
  notification: "hmsSettingsNotification",
  security: "hmsSettingsSecurity",
  profile: "hmsSettingsAdminProfile",
  system: "hmsSettingsSystem",
};

/* ── Seed data ─────────────────────────────── */
const SEED_DEPARTMENTS = [
  "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Radiology",
  "Emergency", "General Medicine", "Gynecology", "Physiotherapy", "Dentistry",
  "Diabetes & Endocrinology", "Nephrology & Dialysis", "Anaesthesiology", "Urology",
];

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
};
const save = (key, val) => localStorage.setItem(key, JSON.stringify(val));

/* ═══════════════════════════════════════════════
   TABS
   ═══════════════════════════════════════════════ */
const TABS = [
  { id: "general", label: "General", icon: "🏥" },
  { id: "users", label: "Users & Roles", icon: "👤" },
  { id: "departments", label: "Departments", icon: "🏢" },
  { id: "doctor", label: "Doctor Settings", icon: "🩺" },
  { id: "appointment", label: "Appointments", icon: "📅" },
  { id: "billing", label: "Billing & Payment", icon: "💳" },
  { id: "notification", label: "Notifications", icon: "🔔" },
  { id: "security", label: "Security", icon: "🔒" },
  { id: "profileAdmin", label: "Profile", icon: "🧑‍💼" },
  { id: "system", label: "System", icon: "⚙️" },
];

/* ═══════════════════════════════════════════════ */

const Settings = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("general");
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2400); };

  /* ── General ── */
  const [general, setGeneral] = useState(() =>
    load(LS.general, {
      hospitalName: "Hippocare Multi-Specialty Hospital",
      adminName: "Hospital Admin",
      address: "Sector 12, Dwarka, New Delhi – 110078",
      phone: "+91 1800 222 911",
      email: "info@hippocare.in",
      website: "https://hippocare.in",
      regNumber: "HC-REG-2024-0001",
      timeZone: "Asia/Kolkata (IST)",
      language: "English",
      logo: "",
    })
  );
  const logoRef = useRef(null);
  const fireSync = () => window.dispatchEvent(new Event("adminSettingsUpdated"));
  const saveGeneral = () => {
    save(LS.general, general);
    // Also update admin name in profile for sidebar sync
    const profile = load(LS.profile, {
      name: "Hospital Admin",
      email: "admin@hippocare.in",
      phone: "+91 98765 43210",
      photo: "",
      password: "",
    });
    if (general.adminName && general.adminName.trim()) {
      profile.name = general.adminName.trim();
      save(LS.profile, profile);
    }
    fireSync();
    showToast("General settings saved!");
  };
  const gf = (k, v) => setGeneral({ ...general, [k]: v });
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => gf("logo", reader.result);
    reader.readAsDataURL(file);
  };

  /* ── Departments ── */
  const [departments, setDepartments] = useState(() => load(LS.departments, SEED_DEPARTMENTS));
  const [newDept, setNewDept] = useState("");
  const [editDeptIdx, setEditDeptIdx] = useState(null);
  const [editDeptVal, setEditDeptVal] = useState("");
  useEffect(() => { save(LS.departments, departments); fireSync(); }, [departments]);
  const addDept = () => {
    const d = newDept.trim();
    if (!d || departments.includes(d)) return;
    setDepartments([...departments, d]);
    setNewDept("");
    showToast(`"${d}" added`);
  };
  const deleteDept = (i) => { setDepartments(departments.filter((_, idx) => idx !== i)); showToast("Department removed"); };
  const startEditDept = (i) => { setEditDeptIdx(i); setEditDeptVal(departments[i]); };
  const saveEditDept = () => {
    if (!editDeptVal.trim()) return;
    const copy = [...departments];
    copy[editDeptIdx] = editDeptVal.trim();
    setDepartments(copy);
    setEditDeptIdx(null);
    showToast("Department updated");
  };

  /* ── Users & Roles (from Supabase) ── */
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    const [docRes, staffRes] = await Promise.all([
      supabase.from("doctors").select("id, name, department, status"),
      supabase.from("staff").select("id, name, department, role"),
    ]);
    const docs = (docRes.data || []).map((d) => ({ ...d, _type: "Doctor", _disabled: d.status !== "Active" }));
    const stf = (staffRes.data || []).map((s) => ({ ...s, _type: s.role || "Staff", _disabled: false }));
    setUsers([...docs, ...stf]);
    setUsersLoading(false);
  }, []);

  useEffect(() => { if (tab === "users") fetchUsers(); }, [tab, fetchUsers]);

  const refreshUsers = () => fetchUsers();

  const toggleUserStatus = async (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    if (user._type === "Doctor") {
      const newStatus = user._disabled ? "Active" : "Inactive";
      await supabase.from("doctors").update({ status: newStatus }).eq("id", id);
    }
    setUsers((prev) =>
      prev.map((u) => u.id === id ? { ...u, _disabled: !u._disabled } : u)
    );
    showToast("User status updated");
  };

  /* ── Doctor Settings ── */
  const [doctorConfig, setDoctorConfig] = useState(() =>
    load(LS.doctorConfig, {
      consultationFee: "500",
      appointmentDuration: "20",
      defaultRoom: "",
      dutySchedule: "Mon–Sat, 9 AM – 5 PM",
    })
  );
  const dc = (k, v) => setDoctorConfig({ ...doctorConfig, [k]: v });
  const saveDoctorConfig = () => { save(LS.doctorConfig, doctorConfig); fireSync(); showToast("Doctor settings saved!"); };

  /* ── Appointment Settings ── */
  const [apptConfig, setApptConfig] = useState(() =>
    load(LS.appointment, {
      onlineBooking: true,
      slotDuration: "20",
      maxDaily: "40",
      emergencySlot: true,
    })
  );
  const ac = (k, v) => setApptConfig({ ...apptConfig, [k]: v });
  const saveApptConfig = () => { save(LS.appointment, apptConfig); fireSync(); showToast("Appointment settings saved!"); };

  /* ── Billing ── */
  const [billing, setBilling] = useState(() =>
    load(LS.billing, {
      consultationFee: "500",
      serviceCharges: "200",
      taxPercent: "18",
      paymentMethods: ["Cash", "Card", "UPI", "Online Payment Gateway"],
    })
  );
  const bf = (k, v) => setBilling({ ...billing, [k]: v });
  const togglePayMethod = (m) => {
    const has = billing.paymentMethods.includes(m);
    bf("paymentMethods", has ? billing.paymentMethods.filter((x) => x !== m) : [...billing.paymentMethods, m]);
  };
  const saveBilling = () => { save(LS.billing, billing); fireSync(); showToast("Billing settings saved!"); };

  /* ── Notifications ── */
  const [notif, setNotif] = useState(() =>
    load(LS.notification, {
      email: true,
      sms: true,
      appointmentReminder: true,
      prescriptionReady: true,
    })
  );
  const nf = (k) => setNotif({ ...notif, [k]: !notif[k] });
  const saveNotif = () => { save(LS.notification, notif); fireSync(); showToast("Notification settings saved!"); };

  /* ── Security ── */
  const [security, setSecurity] = useState(() =>
    load(LS.security, {
      loginAttemptLimit: "5",
      twoFactor: false,
      sessionTimeout: "30",
    })
  );
  const [secPwd, setSecPwd] = useState({ current: "", newPwd: "", confirm: "" });
  const sf = (k, v) => setSecurity({ ...security, [k]: v });
  const saveSecurity = () => {
    save(LS.security, security);
    fireSync();
    if (secPwd.newPwd && secPwd.newPwd === secPwd.confirm) {
      showToast("Security & password updated!");
    } else {
      showToast("Security settings saved!");
    }
    setSecPwd({ current: "", newPwd: "", confirm: "" });
  };

  /* ── Admin Profile ── */
  const [profile, setProfile] = useState(() =>
    load(LS.profile, {
      name: "Hospital Admin",
      email: "admin@hippocare.in",
      phone: "+91 98765 43210",
      photo: "",
      password: "",
    })
  );
  const profilePhotoRef = useRef(null);
  const pf = (k, v) => setProfile({ ...profile, [k]: v });
  const handleProfilePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => pf("photo", reader.result);
    reader.readAsDataURL(file);
  };
  const saveProfile = () => { save(LS.profile, profile); fireSync(); showToast("Profile saved!"); };

  /* ── System ── */
  const [sysLogs] = useState([
    { time: "2026-03-05 09:12", msg: "Admin logged in" },
    { time: "2026-03-05 08:45", msg: "Database backup completed" },
    { time: "2026-03-04 22:00", msg: "Cache cleared automatically" },
    { time: "2026-03-04 18:30", msg: "New doctor added — Dr. Ashif Raja" },
    { time: "2026-03-04 14:15", msg: "System updated to v2.5.0" },
  ]);
  const handleBackup = () => showToast("Database backup initiated!");
  const handleClearCache = () => { showToast("Cache cleared successfully!"); };

  /* ── Logout ── */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("hmsRole");
    localStorage.removeItem("hmsProfile");
    navigate("/");
  };

  /* ═══════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════ */
  return (
    <div className="adm-set">
      {/* Toast */}
      {toast && <div className="adm-set__toast">{toast}</div>}

      {/* ── Header ── */}
      <div className="adm-set__header">
        <div>
          <h1>⚙️ Settings</h1>
          <p>Configure hospital system, users, billing, security, and more</p>
        </div>
        <div className="adm-set__header-actions">
          <button className="adm-set__logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="adm-set__tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`adm-set__tab ${tab === t.id ? "adm-set__tab--active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            <span className="adm-set__tab-icon">{t.icon}</span>
            <span className="adm-set__tab-label">{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="adm-set__content">

        {/* ══════════ GENERAL ══════════ */}
        {tab === "general" && (
          <div className="adm-set__card">
            <h2 className="adm-set__card-title">🏥 General Settings</h2>
            <p className="adm-set__card-desc">Configure hospital identity and basic information.</p>



            <div className="adm-set__form-grid">
              <label className="adm-set__field">
                Hospital Name
                <input value={general.hospitalName} onChange={(e) => gf("hospitalName", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Admin Name
                <input value={general.adminName || ""} onChange={(e) => gf("adminName", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Phone Number
                <input value={general.phone} onChange={(e) => gf("phone", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Email Address
                <input value={general.email} onChange={(e) => gf("email", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Website
                <input value={general.website} onChange={(e) => gf("website", e.target.value)} />
              </label>
              <label className="adm-set__field adm-set__field--full">
                Address
                <input value={general.address} onChange={(e) => gf("address", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Registration Number
                <input value={general.regNumber} onChange={(e) => gf("regNumber", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Time Zone
                <input value={general.timeZone} onChange={(e) => gf("timeZone", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Default Language
                <select value={general.language} onChange={(e) => gf("language", e.target.value)}>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Urdu</option>
                  <option>Punjabi</option>
                </select>
              </label>
            </div>
            <button className="adm-set__save-btn" onClick={saveGeneral}>💾 Save General Settings</button>
          </div>
        )}

        {/* ══════════ USERS & ROLES ══════════ */}
        {tab === "users" && (
          <div className="adm-set__card">
            <div className="adm-set__card-head-row">
              <div>
                <h2 className="adm-set__card-title">👤 User & Role Management</h2>
                <p className="adm-set__card-desc">View all system users. Add doctors/staff from their respective pages.</p>
              </div>
              <button className="adm-set__refresh-btn" onClick={refreshUsers}>🔄 Refresh</button>
            </div>

            <div className="adm-set__users-stats">
              <div className="adm-set__users-stat">
                <span className="adm-set__users-stat-val">{users.length}</span>
                <span className="adm-set__users-stat-lbl">Total Users</span>
              </div>
              <div className="adm-set__users-stat">
                <span className="adm-set__users-stat-val">{users.filter((u) => u._type === "Doctor").length}</span>
                <span className="adm-set__users-stat-lbl">Doctors</span>
              </div>
              <div className="adm-set__users-stat">
                <span className="adm-set__users-stat-val">{users.filter((u) => u._type !== "Doctor").length}</span>
                <span className="adm-set__users-stat-lbl">Staff</span>
              </div>
            </div>

            <div className="adm-set__table-wrap">
              <table className="adm-set__table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersLoading && (
                    <tr><td colSpan="6" className="adm-set__empty">Loading users...</td></tr>
                  )}
                  {!usersLoading && users.length === 0 && (
                    <tr><td colSpan="6" className="adm-set__empty">No users found. Add doctors or staff from their pages.</td></tr>
                  )}
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td><span className="adm-set__id-badge">{u.id}</span></td>
                      <td><strong>{u.name}</strong></td>
                      <td><span className="adm-set__role-badge">{u._type}</span></td>
                      <td>{u.department || "—"}</td>
                      <td>
                        <span className={`adm-set__status-dot ${u._disabled ? "adm-set__status-dot--off" : "adm-set__status-dot--on"}`}>
                          {u._disabled ? "Inactive" : "Active"}
                        </span>
                      </td>
                      <td>
                        <button
                          className={`adm-set__toggle-btn ${u._disabled ? "adm-set__toggle-btn--activate" : "adm-set__toggle-btn--deactivate"}`}
                          onClick={() => toggleUserStatus(u.id)}
                        >
                          {u._disabled ? "Activate" : "Deactivate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="adm-set__hint">💡 To add new Doctors, go to <strong>Doctors</strong> page. For Staff/Nurse/Receptionist/Lab Tech, go to <strong>Staff</strong> page.</p>
          </div>
        )}

        {/* ══════════ DEPARTMENTS ══════════ */}
        {tab === "departments" && (
          <div className="adm-set__card">
            <h2 className="adm-set__card-title">🏢 Department Settings</h2>
            <p className="adm-set__card-desc">Manage hospital departments. Changes appear in Doctor & Staff forms automatically.</p>

            <div className="adm-set__dept-add">
              <input
                className="adm-set__dept-input"
                placeholder="New department name…"
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addDept()}
              />
              <button className="adm-set__dept-add-btn" onClick={addDept}>+ Add</button>
            </div>

            <div className="adm-set__dept-list">
              {departments.map((d, i) => (
                <div key={i} className="adm-set__dept-item">
                  {editDeptIdx === i ? (
                    <>
                      <input
                        className="adm-set__dept-edit-input"
                        value={editDeptVal}
                        onChange={(e) => setEditDeptVal(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveEditDept()}
                      />
                      <button className="adm-set__dept-save" onClick={saveEditDept}>✓</button>
                      <button className="adm-set__dept-cancel" onClick={() => setEditDeptIdx(null)}>✕</button>
                    </>
                  ) : (
                    <>
                      <span className="adm-set__dept-name">{d}</span>
                      <div className="adm-set__dept-actions">
                        <button className="adm-set__dept-edit" onClick={() => startEditDept(i)}>✏️</button>
                        <button className="adm-set__dept-del" onClick={() => deleteDept(i)}>🗑</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════ DOCTOR SETTINGS ══════════ */}
        {tab === "doctor" && (
          <div className="adm-set__card">
            <h2 className="adm-set__card-title">🩺 Doctor Settings</h2>
            <p className="adm-set__card-desc">Default configurations for doctor-related operations.</p>

            <div className="adm-set__form-grid">
              <label className="adm-set__field">
                Default Consultation Fee (₹)
                <input type="number" value={doctorConfig.consultationFee} onChange={(e) => dc("consultationFee", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Appointment Duration (min)
                <input type="number" value={doctorConfig.appointmentDuration} onChange={(e) => dc("appointmentDuration", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Department Assignment
                <select value={doctorConfig.defaultDept || ""} onChange={(e) => dc("defaultDept", e.target.value)}>
                  <option value="">Select Default Department</option>
                  {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </label>
              <label className="adm-set__field">
                Default Room Number
                <input value={doctorConfig.defaultRoom} onChange={(e) => dc("defaultRoom", e.target.value)} placeholder="e.g. 101" />
              </label>
              <label className="adm-set__field adm-set__field--full">
                Duty Schedule
                <input value={doctorConfig.dutySchedule} onChange={(e) => dc("dutySchedule", e.target.value)} />
              </label>
            </div>
            <button className="adm-set__save-btn" onClick={saveDoctorConfig}>💾 Save Doctor Settings</button>
          </div>
        )}

        {/* ══════════ APPOINTMENT ══════════ */}
        {tab === "appointment" && (
          <div className="adm-set__card">
            <h2 className="adm-set__card-title">📅 Appointment Settings</h2>
            <p className="adm-set__card-desc">Control booking behavior and slot configurations.</p>

            <div className="adm-set__form-grid">
              <label className="adm-set__field">
                Slot Duration (minutes)
                <input type="number" value={apptConfig.slotDuration} onChange={(e) => ac("slotDuration", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Max Daily Appointments
                <input type="number" value={apptConfig.maxDaily} onChange={(e) => ac("maxDaily", e.target.value)} />
              </label>
            </div>

            <div className="adm-set__toggles">
              <div className="adm-set__toggle-row">
                <div className="adm-set__toggle-info">
                  <strong>Online Booking</strong>
                  <span>Allow patients to book appointments online</span>
                </div>
                <button
                  className={`adm-set__switch ${apptConfig.onlineBooking ? "adm-set__switch--on" : ""}`}
                  onClick={() => ac("onlineBooking", !apptConfig.onlineBooking)}
                >
                  <span className="adm-set__switch-knob" />
                </button>
              </div>
              <div className="adm-set__toggle-row">
                <div className="adm-set__toggle-info">
                  <strong>Emergency Appointment Slot</strong>
                  <span>Reserve a slot for emergency walk-ins</span>
                </div>
                <button
                  className={`adm-set__switch ${apptConfig.emergencySlot ? "adm-set__switch--on" : ""}`}
                  onClick={() => ac("emergencySlot", !apptConfig.emergencySlot)}
                >
                  <span className="adm-set__switch-knob" />
                </button>
              </div>
            </div>

            <button className="adm-set__save-btn" onClick={saveApptConfig}>💾 Save Appointment Settings</button>
          </div>
        )}

        {/* ══════════ BILLING ══════════ */}
        {tab === "billing" && (
          <div className="adm-set__card">
            <h2 className="adm-set__card-title">💳 Billing & Payment Settings</h2>
            <p className="adm-set__card-desc">Configure fees, tax, and accepted payment methods.</p>

            <div className="adm-set__form-grid">
              <label className="adm-set__field">
                Consultation Fee (₹)
                <input type="number" value={billing.consultationFee} onChange={(e) => bf("consultationFee", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Service Charges (₹)
                <input type="number" value={billing.serviceCharges} onChange={(e) => bf("serviceCharges", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Tax Percentage (%)
                <input type="number" value={billing.taxPercent} onChange={(e) => bf("taxPercent", e.target.value)} />
              </label>
            </div>

            <h3 className="adm-set__sub-title">Payment Methods</h3>
            <div className="adm-set__pay-methods">
              {["Cash", "Card", "UPI", "Online Payment Gateway"].map((m) => (
                <label key={m} className="adm-set__check-row">
                  <input
                    type="checkbox"
                    checked={billing.paymentMethods.includes(m)}
                    onChange={() => togglePayMethod(m)}
                  />
                  <span>{m}</span>
                </label>
              ))}
            </div>

            <button className="adm-set__save-btn" onClick={saveBilling}>💾 Save Billing Settings</button>
          </div>
        )}

        {/* ══════════ NOTIFICATIONS ══════════ */}
        {tab === "notification" && (
          <div className="adm-set__card">
            <h2 className="adm-set__card-title">🔔 Notification Settings</h2>
            <p className="adm-set__card-desc">Control which notifications are active system-wide.</p>

            <div className="adm-set__toggles">
              {[
                { key: "email", title: "Email Notifications", desc: "Send email alerts for appointments, reports" },
                { key: "sms", title: "SMS Notifications", desc: "Send SMS alerts to patients and staff" },
                { key: "appointmentReminder", title: "Appointment Reminders", desc: "Remind patients before their appointment" },
                { key: "prescriptionReady", title: "Prescription Ready Alerts", desc: "Notify patients when prescriptions are ready" },
              ].map((item) => (
                <div key={item.key} className="adm-set__toggle-row">
                  <div className="adm-set__toggle-info">
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                  <button
                    className={`adm-set__switch ${notif[item.key] ? "adm-set__switch--on" : ""}`}
                    onClick={() => nf(item.key)}
                  >
                    <span className="adm-set__switch-knob" />
                  </button>
                </div>
              ))}
            </div>

            <button className="adm-set__save-btn" onClick={saveNotif}>💾 Save Notification Settings</button>
          </div>
        )}

        {/* ══════════ SECURITY ══════════ */}
        {tab === "security" && (
          <div className="adm-set__card">
            <h2 className="adm-set__card-title">🔒 Security Settings</h2>
            <p className="adm-set__card-desc">Protect admin access and configure session controls.</p>

            <h3 className="adm-set__sub-title">Change Admin Password</h3>
            <div className="adm-set__form-grid">
              <label className="adm-set__field">
                Current Password
                <input type="password" value={secPwd.current} onChange={(e) => setSecPwd({ ...secPwd, current: e.target.value })} />
              </label>
              <label className="adm-set__field">
                New Password
                <input type="password" value={secPwd.newPwd} onChange={(e) => setSecPwd({ ...secPwd, newPwd: e.target.value })} />
              </label>
              <label className="adm-set__field">
                Confirm Password
                <input type="password" value={secPwd.confirm} onChange={(e) => setSecPwd({ ...secPwd, confirm: e.target.value })} />
              </label>
            </div>

            <h3 className="adm-set__sub-title">Access Controls</h3>
            <div className="adm-set__form-grid">
              <label className="adm-set__field">
                Login Attempt Limit
                <input type="number" value={security.loginAttemptLimit} onChange={(e) => sf("loginAttemptLimit", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Session Timeout (min)
                <input type="number" value={security.sessionTimeout} onChange={(e) => sf("sessionTimeout", e.target.value)} />
              </label>
            </div>

            <div className="adm-set__toggles">
              <div className="adm-set__toggle-row">
                <div className="adm-set__toggle-info">
                  <strong>Two-Factor Authentication</strong>
                  <span>Require OTP on every admin login</span>
                </div>
                <button
                  className={`adm-set__switch ${security.twoFactor ? "adm-set__switch--on" : ""}`}
                  onClick={() => sf("twoFactor", !security.twoFactor)}
                >
                  <span className="adm-set__switch-knob" />
                </button>
              </div>
            </div>

            <button className="adm-set__save-btn" onClick={saveSecurity}>💾 Save Security Settings</button>
          </div>
        )}

        {/* ══════════ PROFILE ══════════ */}
        {tab === "profileAdmin" && (
          <div className="adm-set__card">
            <h2 className="adm-set__card-title">🧑‍💼 Admin Profile</h2>
            <p className="adm-set__card-desc">Update your personal information and profile photo.</p>

            <div className="adm-set__profile-photo-area">
              <div className="adm-set__profile-avatar" onClick={() => profilePhotoRef.current?.click()}>
                {profile.photo ? (
                  <img src={profile.photo} alt="Admin" />
                ) : (
                  <span className="adm-set__profile-initials">
                    {profile.name ? profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "AD"}
                  </span>
                )}
              </div>
              <input ref={profilePhotoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleProfilePhoto} />
              <div className="adm-set__profile-meta">
                <h3>{profile.name}</h3>
                <span>System Administrator</span>
              </div>
            </div>

            <div className="adm-set__form-grid">
              <label className="adm-set__field">
                Admin Name
                <input value={profile.name} onChange={(e) => pf("name", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Email
                <input type="email" value={profile.email} onChange={(e) => pf("email", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Phone Number
                <input value={profile.phone} onChange={(e) => pf("phone", e.target.value)} />
              </label>
              <label className="adm-set__field">
                Change Password
                <input type="password" placeholder="Enter new password" value={profile.password} onChange={(e) => pf("password", e.target.value)} />
              </label>
            </div>
            <button className="adm-set__save-btn" onClick={saveProfile}>💾 Save Profile</button>
          </div>
        )}

        {/* ══════════ SYSTEM ══════════ */}
        {tab === "system" && (
          <div className="adm-set__card">
            <h2 className="adm-set__card-title">⚙️ System Settings</h2>
            <p className="adm-set__card-desc">Technical maintenance and system information.</p>

            <div className="adm-set__sys-info">
              <div className="adm-set__sys-item">
                <span className="adm-set__sys-label">System Version</span>
                <span className="adm-set__sys-val">v2.5.0</span>
              </div>
              <div className="adm-set__sys-item">
                <span className="adm-set__sys-label">Framework</span>
                <span className="adm-set__sys-val">React 19 + Vite 7</span>
              </div>
              <div className="adm-set__sys-item">
                <span className="adm-set__sys-label">Database</span>
                <span className="adm-set__sys-val">Supabase (PostgreSQL)</span>
              </div>
              <div className="adm-set__sys-item">
                <span className="adm-set__sys-label">Last Backup</span>
                <span className="adm-set__sys-val">2026-03-05 08:45</span>
              </div>
            </div>

            <div className="adm-set__sys-actions">
              <button className="adm-set__sys-btn adm-set__sys-btn--blue" onClick={handleBackup}>
                💾 Database Backup
              </button>
              <button className="adm-set__sys-btn adm-set__sys-btn--amber" onClick={handleClearCache}>
                🧹 Clear Cache
              </button>
            </div>

            <h3 className="adm-set__sub-title">📋 System Logs</h3>
            <div className="adm-set__logs">
              {sysLogs.map((log, i) => (
                <div key={i} className="adm-set__log-row">
                  <span className="adm-set__log-time">{log.time}</span>
                  <span className="adm-set__log-msg">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Settings;
