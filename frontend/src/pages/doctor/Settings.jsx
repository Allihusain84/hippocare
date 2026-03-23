import { useState, useEffect, useRef } from "react";
import { getDoctorPhoto } from "../../utils/getDoctorPhoto";
import "./Settings.css";

/* ── Helper: load / save settings from localStorage ── */
const SETTINGS_KEY = "hmsDoctorSettings";
const defaultSettings = {
  profile: {
    name: "",
    email: "",
    phone: "+91 98765 43210",
    specialization: "",
    bio: "",
    address: "Hippocare Hospital, New Delhi",
    experience: "",
  },
  consultation: {
    duration: "30",
    fee: "₹1200",
    autoConfirm: true,
    followUpDays: "7",
    maxPatientsPerDay: "20",
    breakBetween: "5",
  },
  notifications: {
    emailNotifs: true,
    smsNotifs: true,
    appointmentReminders: true,
    patientMessages: true,
    labResults: true,
    weeklyReport: true,
    reminderBefore: "30",
  },
  availability: {
    monday: { enabled: true, start: "09:00", end: "17:00" },
    tuesday: { enabled: true, start: "09:00", end: "17:00" },
    wednesday: { enabled: true, start: "09:00", end: "17:00" },
    thursday: { enabled: true, start: "09:00", end: "17:00" },
    friday: { enabled: true, start: "09:00", end: "17:00" },
    saturday: { enabled: true, start: "10:00", end: "14:00" },
    sunday: { enabled: false, start: "09:00", end: "13:00" },
  },
  security: {
    twoFactor: false,
    sessionTimeout: "60",
    loginAlerts: true,
  },
  appearance: {
    theme: "light",
    compactMode: false,
    language: "English",
  },
};

const loadSettings = (doctorId) => {
  try {
    const raw = localStorage.getItem(`${SETTINGS_KEY}_${doctorId}`);
    if (raw) return { ...defaultSettings, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...defaultSettings };
};

const saveSettings = (doctorId, settings) => {
  localStorage.setItem(`${SETTINGS_KEY}_${doctorId}`, JSON.stringify(settings));
};

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DAY_LABELS = { monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday" };

const Settings = () => {
  const doctorId = localStorage.getItem("hmsDoctorId") || "";
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileRef = useRef(null);

  /* Password-change state */
  const [curPwd, setCurPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState({ type: "", text: "" });

  /* Email-change state */
  const [newEmail, setNewEmail] = useState("");
  const [emailPwd, setEmailPwd] = useState("");
  const [emailMsg, setEmailMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    import("../../data/doctorsData").then(({ default: data }) => {
      const doc = data[doctorId];
      if (doc) {
        setDoctorInfo(doc);
        const loaded = loadSettings(doctorId);
        /* Pre-fill profile from doctor data if empty */
        if (!loaded.profile.name) loaded.profile.name = doc.name;
        if (!loaded.profile.specialization) loaded.profile.specialization = doc.specializations?.[0] || "";
        if (!loaded.profile.email) loaded.profile.email = `${doc.id}@hippocare.in`;
        if (!loaded.profile.experience) loaded.profile.experience = doc.experience || "";
        if (!loaded.consultation.fee) loaded.consultation.fee = doc.fee || "₹1200";
        setSettings(loaded);
      }
    });
    const photo = localStorage.getItem(`hmsProfilePhoto_${doctorId}`);
    if (photo) setProfilePhoto(photo);
  }, [doctorId]);

  const displayPhoto = profilePhoto || (doctorInfo ? getDoctorPhoto(doctorInfo.id, doctorInfo.photo) : null);

  /* Nested setter helpers */
  const updateSection = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
    setSaved(false);
  };

  const updateAvailability = (day, field, value) => {
    setSettings((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: { ...prev.availability[day], [field]: value },
      },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    saveSettings(doctorId, settings);
    /* Notify other components (Sidebar, Navbar, etc.) that doctor data changed */
    window.dispatchEvent(new CustomEvent("doctorSettingsUpdated", { detail: { doctorId } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePhoto(reader.result);
      localStorage.setItem(`hmsProfilePhoto_${doctorId}`, reader.result);
      window.dispatchEvent(new CustomEvent("doctorSettingsUpdated", { detail: { doctorId } }));
    };
    reader.readAsDataURL(file);
  };

  const handleEmailChange = () => {
    setEmailMsg({ type: "", text: "" });
    const storedPwd = settings.security?.password || "doctor";
    if (emailPwd !== storedPwd) {
      setEmailMsg({ type: "error", text: "Password is incorrect." });
      return;
    }
    if (!newEmail || !newEmail.includes("@")) {
      setEmailMsg({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    const updated = {
      ...settings,
      security: { ...settings.security, loginEmail: newEmail },
    };
    setSettings(updated);
    saveSettings(doctorId, updated);
    window.dispatchEvent(new CustomEvent("doctorSettingsUpdated", { detail: { doctorId } }));
    setNewEmail(""); setEmailPwd("");
    setEmailMsg({ type: "success", text: "Login email changed successfully! It will now reflect on the Login page." });
    setTimeout(() => setEmailMsg({ type: "", text: "" }), 4000);
  };

  const handlePasswordChange = () => {
    setPwdMsg({ type: "", text: "" });
    const storedPwd = settings.security?.password || "doctor";
    if (curPwd !== storedPwd) {
      setPwdMsg({ type: "error", text: "Current password is incorrect." });
      return;
    }
    if (!newPwd || newPwd.length < 3) {
      setPwdMsg({ type: "error", text: "New password must be at least 3 characters." });
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg({ type: "error", text: "New password and confirmation do not match." });
      return;
    }
    const updated = {
      ...settings,
      security: { ...settings.security, password: newPwd },
    };
    setSettings(updated);
    saveSettings(doctorId, updated);
    window.dispatchEvent(new CustomEvent("doctorSettingsUpdated", { detail: { doctorId } }));
    setCurPwd(""); setNewPwd(""); setConfirmPwd("");
    setPwdMsg({ type: "success", text: "Password changed successfully! It will now reflect on the Login page." });
    setTimeout(() => setPwdMsg({ type: "", text: "" }), 4000);
  };

  const tabs = [
    { key: "profile", label: "👤 Profile", icon: "👤" },
    { key: "consultation", label: "🩺 Consultation", icon: "🩺" },
    { key: "availability", label: "📅 Availability", icon: "📅" },
    { key: "notifications", label: "🔔 Notifications", icon: "🔔" },
    { key: "security", label: "🔒 Security", icon: "🔒" },
    { key: "appearance", label: "🎨 Appearance", icon: "🎨" },
  ];

  return (
    <div className="ds">
      {/* ── Tab navigation ── */}
      <div className="ds__tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`ds__tab ${activeTab === t.key ? "ds__tab--active" : ""}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="ds__content">
        {/* ════════════ PROFILE ════════════ */}
        {activeTab === "profile" && (
          <div className="ds__section">
            <h2 className="ds__title">Profile Settings</h2>
            <p className="ds__subtitle">Manage your personal and professional information</p>

            {/* Photo */}
            <div className="ds__photo-row">
              <div className="ds__photo-circle" onClick={() => fileRef.current?.click()}>
                {displayPhoto ? (
                  <img src={displayPhoto} alt="Profile" />
                ) : (
                  <span className="ds__photo-initials">{settings.profile.name?.charAt(0) || "D"}</span>
                )}
                <div className="ds__photo-overlay">📷</div>
              </div>
              <div className="ds__photo-info">
                <h4>{settings.profile.name || "Doctor"}</h4>
                <p>{settings.profile.specialization || "Specialist"}</p>
                <button className="ds__btn--outline" onClick={() => fileRef.current?.click()}>Change Photo</button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
            </div>

            <div className="ds__grid">
              <div className="ds__field">
                <label>Full Name</label>
                <input type="text" value={settings.profile.name} onChange={(e) => updateSection("profile", "name", e.target.value)} />
              </div>
              <div className="ds__field">
                <label>Email</label>
                <input type="email" value={settings.profile.email} onChange={(e) => updateSection("profile", "email", e.target.value)} />
              </div>
              <div className="ds__field">
                <label>Phone</label>
                <input type="tel" value={settings.profile.phone} onChange={(e) => updateSection("profile", "phone", e.target.value)} />
              </div>
              <div className="ds__field">
                <label>Specialization</label>
                <input type="text" value={settings.profile.specialization} onChange={(e) => updateSection("profile", "specialization", e.target.value)} />
              </div>
              <div className="ds__field">
                <label>Experience</label>
                <input type="text" value={settings.profile.experience} onChange={(e) => updateSection("profile", "experience", e.target.value)} placeholder="e.g. 16+ years" />
              </div>
              <div className="ds__field">
                <label>Hospital Address</label>
                <input type="text" value={settings.profile.address} onChange={(e) => updateSection("profile", "address", e.target.value)} />
              </div>
              <div className="ds__field ds__field--full">
                <label>Bio / About</label>
                <textarea rows="3" value={settings.profile.bio} onChange={(e) => updateSection("profile", "bio", e.target.value)} placeholder="Write a short bio about yourself..." />
              </div>
            </div>
          </div>
        )}

        {/* ════════════ CONSULTATION ════════════ */}
        {activeTab === "consultation" && (
          <div className="ds__section">
            <h2 className="ds__title">Consultation Settings</h2>
            <p className="ds__subtitle">Configure how you manage patient consultations</p>

            <div className="ds__grid">
              <div className="ds__field">
                <label>Consultation Duration (minutes)</label>
                <select value={settings.consultation.duration} onChange={(e) => updateSection("consultation", "duration", e.target.value)}>
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
              <div className="ds__field">
                <label>Consultation Fee</label>
                <input type="text" value={settings.consultation.fee} onChange={(e) => updateSection("consultation", "fee", e.target.value)} />
              </div>
              <div className="ds__field">
                <label>Max Patients Per Day</label>
                <input type="number" value={settings.consultation.maxPatientsPerDay} onChange={(e) => updateSection("consultation", "maxPatientsPerDay", e.target.value)} />
              </div>
              <div className="ds__field">
                <label>Follow-up Period (days)</label>
                <input type="number" value={settings.consultation.followUpDays} onChange={(e) => updateSection("consultation", "followUpDays", e.target.value)} />
              </div>
              <div className="ds__field">
                <label>Break Between Patients (minutes)</label>
                <select value={settings.consultation.breakBetween} onChange={(e) => updateSection("consultation", "breakBetween", e.target.value)}>
                  <option value="0">No break</option>
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                </select>
              </div>
              <div className="ds__field">
                <label>Auto-confirm Appointments</label>
                <div className="ds__toggle-row">
                  <span>{settings.consultation.autoConfirm ? "Enabled" : "Disabled"}</span>
                  <button
                    className={`ds__toggle ${settings.consultation.autoConfirm ? "ds__toggle--on" : ""}`}
                    onClick={() => updateSection("consultation", "autoConfirm", !settings.consultation.autoConfirm)}
                  >
                    <span className="ds__toggle-knob" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════ AVAILABILITY ════════════ */}
        {activeTab === "availability" && (
          <div className="ds__section">
            <h2 className="ds__title">Availability Schedule</h2>
            <p className="ds__subtitle">Set your working hours for each day of the week</p>

            <div className="ds__avail-list">
              {DAYS.map((day) => (
                <div className={`ds__avail-row ${!settings.availability[day].enabled ? "ds__avail-row--off" : ""}`} key={day}>
                  <div className="ds__avail-day">
                    <button
                      className={`ds__toggle ${settings.availability[day].enabled ? "ds__toggle--on" : ""}`}
                      onClick={() => updateAvailability(day, "enabled", !settings.availability[day].enabled)}
                    >
                      <span className="ds__toggle-knob" />
                    </button>
                    <span className="ds__avail-label">{DAY_LABELS[day]}</span>
                  </div>
                  {settings.availability[day].enabled ? (
                    <div className="ds__avail-times">
                      <input type="time" value={settings.availability[day].start} onChange={(e) => updateAvailability(day, "start", e.target.value)} />
                      <span>to</span>
                      <input type="time" value={settings.availability[day].end} onChange={(e) => updateAvailability(day, "end", e.target.value)} />
                    </div>
                  ) : (
                    <span className="ds__avail-off">Day Off</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════ NOTIFICATIONS ════════════ */}
        {activeTab === "notifications" && (
          <div className="ds__section">
            <h2 className="ds__title">Notification Preferences</h2>
            <p className="ds__subtitle">Choose how and when you receive notifications</p>

            <div className="ds__notif-list">
              {[
                { key: "emailNotifs", label: "Email Notifications", desc: "Receive updates and alerts via email" },
                { key: "smsNotifs", label: "SMS Notifications", desc: "Get text messages for important updates" },
                { key: "appointmentReminders", label: "Appointment Reminders", desc: "Get reminded before each appointment" },
                { key: "patientMessages", label: "Patient Messages", desc: "Notifications when patients send messages" },
                { key: "labResults", label: "Lab Results Alerts", desc: "Get notified when lab results are ready" },
                { key: "weeklyReport", label: "Weekly Summary Report", desc: "Receive a weekly performance summary" },
              ].map((n) => (
                <div className="ds__notif-item" key={n.key}>
                  <div className="ds__notif-info">
                    <h4>{n.label}</h4>
                    <p>{n.desc}</p>
                  </div>
                  <button
                    className={`ds__toggle ${settings.notifications[n.key] ? "ds__toggle--on" : ""}`}
                    onClick={() => updateSection("notifications", n.key, !settings.notifications[n.key])}
                  >
                    <span className="ds__toggle-knob" />
                  </button>
                </div>
              ))}
            </div>

            <div className="ds__grid" style={{ marginTop: 20 }}>
              <div className="ds__field">
                <label>Remind Before Appointment (minutes)</label>
                <select value={settings.notifications.reminderBefore} onChange={(e) => updateSection("notifications", "reminderBefore", e.target.value)}>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ════════════ SECURITY ════════════ */}
        {activeTab === "security" && (
          <div className="ds__section">
            <h2 className="ds__title">Security & Privacy</h2>
            <p className="ds__subtitle">Manage your account security and privacy settings</p>

            {/* Current Credentials Info */}
            <div className="ds__card ds__credentials-box">
              <h3>🔐 Your Login Credentials</h3>
              <p className="ds__credentials-note">These are the credentials you use to log in. Changes made here will reflect on the Login page.</p>
              <div className="ds__credentials-grid">
                <div className="ds__credential-item">
                  <span className="ds__credential-label">Login Email</span>
                  <span className="ds__credential-value">{settings.security?.loginEmail || settings.profile.email || `${doctorId}@hippocare.in`}</span>
                </div>
                <div className="ds__credential-item">
                  <span className="ds__credential-label">Password</span>
                  <span className="ds__credential-value ds__credential-pwd">{settings.security?.password || "doctor"}</span>
                </div>
              </div>
            </div>

            {/* Change Login Email */}
            <div className="ds__card">
              <h3>Change Login Email</h3>
              <p className="ds__card-hint">Change the email you use to sign in. Your password is required to confirm.</p>
              <div className="ds__grid">
                <div className="ds__field">
                  <label>New Login Email</label>
                  <input type="email" placeholder="Enter new email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                </div>
                <div className="ds__field">
                  <label>Confirm Password</label>
                  <input type="password" placeholder="Enter your current password" value={emailPwd} onChange={(e) => setEmailPwd(e.target.value)} />
                </div>
              </div>
              {emailMsg.text && (
                <p className={`ds__pwd-msg ds__pwd-msg--${emailMsg.type}`}>{emailMsg.text}</p>
              )}
              <button className="ds__btn--primary" style={{ marginTop: 12 }} onClick={handleEmailChange}>Update Email</button>
            </div>

            {/* Change Password */}
            <div className="ds__card">
              <h3>Change Password</h3>
              <div className="ds__grid">
                <div className="ds__field">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" value={curPwd} onChange={(e) => setCurPwd(e.target.value)} />
                </div>
                <div className="ds__field">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
                </div>
                <div className="ds__field">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Re-enter new password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
                </div>
              </div>
              {pwdMsg.text && (
                <p className={`ds__pwd-msg ds__pwd-msg--${pwdMsg.type}`}>{pwdMsg.text}</p>
              )}
              <button className="ds__btn--primary" style={{ marginTop: 12 }} onClick={handlePasswordChange}>Update Password</button>
            </div>

            <div className="ds__notif-list" style={{ marginTop: 20 }}>
              <div className="ds__notif-item">
                <div className="ds__notif-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <button
                  className={`ds__toggle ${settings.security.twoFactor ? "ds__toggle--on" : ""}`}
                  onClick={() => updateSection("security", "twoFactor", !settings.security.twoFactor)}
                >
                  <span className="ds__toggle-knob" />
                </button>
              </div>
              <div className="ds__notif-item">
                <div className="ds__notif-info">
                  <h4>Login Alerts</h4>
                  <p>Get notified when someone logs into your account</p>
                </div>
                <button
                  className={`ds__toggle ${settings.security.loginAlerts ? "ds__toggle--on" : ""}`}
                  onClick={() => updateSection("security", "loginAlerts", !settings.security.loginAlerts)}
                >
                  <span className="ds__toggle-knob" />
                </button>
              </div>
            </div>

            <div className="ds__grid" style={{ marginTop: 20 }}>
              <div className="ds__field">
                <label>Session Timeout (minutes)</label>
                <select value={settings.security.sessionTimeout} onChange={(e) => updateSection("security", "sessionTimeout", e.target.value)}>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="0">Never</option>
                </select>
              </div>
            </div>

            {/* Danger zone */}
            <div className="ds__danger-zone">
              <h3>Danger Zone</h3>
              <p>These actions are irreversible. Proceed with caution.</p>
              <div className="ds__danger-actions">
                <button className="ds__btn--danger" onClick={() => alert("All settings reset to default! (Demo)")}>Reset All Settings</button>
                <button className="ds__btn--danger-outline" onClick={() => alert("Account deactivation request sent! (Demo)")}>Deactivate Account</button>
              </div>
            </div>
          </div>
        )}

        {/* ════════════ APPEARANCE ════════════ */}
        {activeTab === "appearance" && (
          <div className="ds__section">
            <h2 className="ds__title">Appearance & Preferences</h2>
            <p className="ds__subtitle">Customize the look and feel of your dashboard</p>

            <div className="ds__grid">
              <div className="ds__field">
                <label>Theme</label>
                <div className="ds__theme-cards">
                  {["light", "dark", "auto"].map((t) => (
                    <button
                      key={t}
                      className={`ds__theme-card ${settings.appearance.theme === t ? "ds__theme-card--active" : ""}`}
                      onClick={() => updateSection("appearance", "theme", t)}
                    >
                      <span className="ds__theme-icon">{t === "light" ? "☀️" : t === "dark" ? "🌙" : "🖥️"}</span>
                      <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="ds__field">
                <label>Language</label>
                <select value={settings.appearance.language} onChange={(e) => updateSection("appearance", "language", e.target.value)}>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                  <option>Bengali</option>
                  <option>Marathi</option>
                </select>
              </div>
              <div className="ds__field">
                <label>Compact Mode</label>
                <div className="ds__toggle-row">
                  <span>{settings.appearance.compactMode ? "Enabled — reduces spacing" : "Disabled — normal spacing"}</span>
                  <button
                    className={`ds__toggle ${settings.appearance.compactMode ? "ds__toggle--on" : ""}`}
                    onClick={() => updateSection("appearance", "compactMode", !settings.appearance.compactMode)}
                  >
                    <span className="ds__toggle-knob" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── STICKY SAVE BAR ── */}
      <div className="ds__save-bar">
        <span className={`ds__saved-badge ${saved ? "ds__saved-badge--show" : ""}`}>✓ Settings saved successfully!</span>
        <button className="ds__btn--primary" onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
