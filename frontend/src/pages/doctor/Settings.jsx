import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./Settings.css";

const SETTINGS_KEY = "hmsDoctorSettings";
const defaultSettings = {
  consultation: {
    duration: "30", fee: "", autoConfirm: true,
    followUpDays: "7", maxPatientsPerDay: "20", breakBetween: "5",
  },
  notifications: {
    emailNotifs: true, smsNotifs: true, appointmentReminders: true,
    patientMessages: true, labResults: true, weeklyReport: true, reminderBefore: "30",
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
  appearance: { theme: "light", compactMode: false, language: "English" },
};

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DAY_LABELS = { monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday" };

const Settings = () => {
  const [doctor, setDoctor] = useState(null);
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", specialization: "", experience: "", qualification: "" });
  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: doc } = await supabase.from("doctors").select("*").eq("id", user.id).maybeSingle();

      let docRow = doc;
      if (!docRow) {
        const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        if (prof) docRow = { name: prof.name, email: prof.email, phone: "", specialization: "", experience: "", qualification: "" };
      }

      if (docRow) {
        setDoctor(docRow);
        setProfile({
          name: docRow.name || "", email: docRow.email || "", phone: docRow.phone || "",
          specialization: docRow.specialization || "", experience: docRow.experience || "",
          qualification: docRow.qualification || "",
        });
        if (docRow.consultation_fee) {
          setSettings((prev) => ({ ...prev, consultation: { ...prev.consultation, fee: `₹${docRow.consultation_fee}` } }));
        }
      }

      try {
        const raw = localStorage.getItem(`${SETTINGS_KEY}_${user.id}`);
        if (raw) setSettings((prev) => ({ ...prev, ...JSON.parse(raw) }));
      } catch { /* ignore */ }

      setLoading(false);
    };
    load();
  }, []);

  const updateProfile = (field, value) => { setProfile((p) => ({ ...p, [field]: value })); setSaved(false); };
  const updateSection = (section, field, value) => { setSettings((p) => ({ ...p, [section]: { ...p[section], [field]: value } })); setSaved(false); };
  const updateAvailability = (day, field, value) => { setSettings((p) => ({ ...p, availability: { ...p.availability, [day]: { ...p.availability[day], [field]: value } } })); setSaved(false); };

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (doctor?.id) {
      await supabase.from("doctors").update({
        name: profile.name, email: profile.email, phone: profile.phone,
        specialization: profile.specialization, experience: profile.experience,
        qualification: profile.qualification,
      }).eq("id", doctor.id);
    }

    localStorage.setItem(`${SETTINGS_KEY}_${user.id}`, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { key: "profile", label: "Profile" },
    { key: "consultation", label: "Consultation" },
    { key: "availability", label: "Availability" },
    { key: "notifications", label: "Notifications" },
    { key: "appearance", label: "Appearance" },
  ];

  if (loading) return <p>Loading settings...</p>;

  return (
    <div className="ds">
      <div className="ds__tabs">
        {tabs.map((t) => (
          <button key={t.key} className={`ds__tab ${activeTab === t.key ? "ds__tab--active" : ""}`} onClick={() => setActiveTab(t.key)}>{t.label}</button>
        ))}
      </div>

      <div className="ds__content">
        {activeTab === "profile" && (
          <div className="ds__section">
            <h2 className="ds__title">Profile Settings</h2>
            <p className="ds__subtitle">Manage your personal and professional information</p>
            <div className="ds__photo-row">
              <div className="ds__photo-circle">
                <span className="ds__photo-initials">{profile.name?.charAt(0) || "D"}</span>
              </div>
              <div className="ds__photo-info">
                <h4>{profile.name || "Doctor"}</h4>
                <p>{profile.specialization || "Specialist"}</p>
              </div>
            </div>
            <div className="ds__grid">
              <div className="ds__field"><label>Full Name</label><input type="text" value={profile.name} onChange={(e) => updateProfile("name", e.target.value)} /></div>
              <div className="ds__field"><label>Email</label><input type="email" value={profile.email} onChange={(e) => updateProfile("email", e.target.value)} /></div>
              <div className="ds__field"><label>Phone</label><input type="tel" value={profile.phone} onChange={(e) => updateProfile("phone", e.target.value)} /></div>
              <div className="ds__field"><label>Specialization</label><input type="text" value={profile.specialization} onChange={(e) => updateProfile("specialization", e.target.value)} /></div>
              <div className="ds__field"><label>Experience</label><input type="text" value={profile.experience} onChange={(e) => updateProfile("experience", e.target.value)} placeholder="e.g. 16 years" /></div>
              <div className="ds__field"><label>Qualification</label><input type="text" value={profile.qualification} onChange={(e) => updateProfile("qualification", e.target.value)} placeholder="e.g. MBBS, DM" /></div>
            </div>
          </div>
        )}

        {activeTab === "consultation" && (
          <div className="ds__section">
            <h2 className="ds__title">Consultation Settings</h2>
            <p className="ds__subtitle">Configure how you manage patient consultations</p>
            <div className="ds__grid">
              <div className="ds__field"><label>Duration (minutes)</label>
                <select value={settings.consultation.duration} onChange={(e) => updateSection("consultation", "duration", e.target.value)}>
                  <option value="15">15 minutes</option><option value="20">20 minutes</option><option value="30">30 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option>
                </select>
              </div>
              <div className="ds__field"><label>Consultation Fee</label><input type="text" value={settings.consultation.fee} onChange={(e) => updateSection("consultation", "fee", e.target.value)} /></div>
              <div className="ds__field"><label>Max Patients Per Day</label><input type="number" value={settings.consultation.maxPatientsPerDay} onChange={(e) => updateSection("consultation", "maxPatientsPerDay", e.target.value)} /></div>
              <div className="ds__field"><label>Follow-up Period (days)</label><input type="number" value={settings.consultation.followUpDays} onChange={(e) => updateSection("consultation", "followUpDays", e.target.value)} /></div>
              <div className="ds__field"><label>Break Between (minutes)</label>
                <select value={settings.consultation.breakBetween} onChange={(e) => updateSection("consultation", "breakBetween", e.target.value)}>
                  <option value="0">No break</option><option value="5">5 minutes</option><option value="10">10 minutes</option><option value="15">15 minutes</option>
                </select>
              </div>
              <div className="ds__field"><label>Auto-confirm Appointments</label>
                <div className="ds__toggle-row">
                  <span>{settings.consultation.autoConfirm ? "Enabled" : "Disabled"}</span>
                  <button className={`ds__toggle ${settings.consultation.autoConfirm ? "ds__toggle--on" : ""}`} onClick={() => updateSection("consultation", "autoConfirm", !settings.consultation.autoConfirm)}>
                    <span className="ds__toggle-knob" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "availability" && (
          <div className="ds__section">
            <h2 className="ds__title">Availability Schedule</h2>
            <p className="ds__subtitle">Set your working hours for each day</p>
            <div className="ds__avail-list">
              {DAYS.map((day) => (
                <div className={`ds__avail-row ${!settings.availability[day].enabled ? "ds__avail-row--off" : ""}`} key={day}>
                  <div className="ds__avail-day">
                    <button className={`ds__toggle ${settings.availability[day].enabled ? "ds__toggle--on" : ""}`} onClick={() => updateAvailability(day, "enabled", !settings.availability[day].enabled)}>
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
                  ) : <span className="ds__avail-off">Day Off</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="ds__section">
            <h2 className="ds__title">Notification Preferences</h2>
            <p className="ds__subtitle">Choose how and when you receive notifications</p>
            <div className="ds__notif-list">
              {[
                { key: "emailNotifs", label: "Email Notifications", desc: "Receive updates via email" },
                { key: "smsNotifs", label: "SMS Notifications", desc: "Get text messages for updates" },
                { key: "appointmentReminders", label: "Appointment Reminders", desc: "Get reminded before each appointment" },
                { key: "patientMessages", label: "Patient Messages", desc: "Notifications for patient messages" },
                { key: "labResults", label: "Lab Results Alerts", desc: "Get notified when results are ready" },
                { key: "weeklyReport", label: "Weekly Summary", desc: "Receive a weekly performance summary" },
              ].map((n) => (
                <div className="ds__notif-item" key={n.key}>
                  <div className="ds__notif-info"><h4>{n.label}</h4><p>{n.desc}</p></div>
                  <button className={`ds__toggle ${settings.notifications[n.key] ? "ds__toggle--on" : ""}`} onClick={() => updateSection("notifications", n.key, !settings.notifications[n.key])}>
                    <span className="ds__toggle-knob" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="ds__section">
            <h2 className="ds__title">Appearance & Preferences</h2>
            <p className="ds__subtitle">Customize the look and feel</p>
            <div className="ds__grid">
              <div className="ds__field"><label>Theme</label>
                <div className="ds__theme-cards">
                  {["light", "dark", "auto"].map((t) => (
                    <button key={t} className={`ds__theme-card ${settings.appearance.theme === t ? "ds__theme-card--active" : ""}`} onClick={() => updateSection("appearance", "theme", t)}>
                      <span className="ds__theme-icon">{t === "light" ? "Light" : t === "dark" ? "Dark" : "Auto"}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="ds__field"><label>Language</label>
                <select value={settings.appearance.language} onChange={(e) => updateSection("appearance", "language", e.target.value)}>
                  <option>English</option><option>Hindi</option><option>Tamil</option><option>Telugu</option>
                </select>
              </div>
              <div className="ds__field"><label>Compact Mode</label>
                <div className="ds__toggle-row">
                  <span>{settings.appearance.compactMode ? "Enabled" : "Disabled"}</span>
                  <button className={`ds__toggle ${settings.appearance.compactMode ? "ds__toggle--on" : ""}`} onClick={() => updateSection("appearance", "compactMode", !settings.appearance.compactMode)}>
                    <span className="ds__toggle-knob" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="ds__save-bar">
        <span className={`ds__saved-badge ${saved ? "ds__saved-badge--show" : ""}`}>Settings saved!</span>
        <button className="ds__btn--primary" onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
