import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./Appointments.css";

const STATUS_OPTIONS = ["Confirmed", "Waiting", "Completed", "Cancelled", "No-Show"];

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [selected, setSelected] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: false });

    if (!error) setAppointments(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAppointments(); }, []);

  const today = new Date().toISOString().slice(0, 10);
  const todayCount = appointments.filter((a) => a.appointment_date === today).length;
  const confirmedCount = appointments.filter((a) => a.status === "Confirmed").length;
  const waitingCount = appointments.filter((a) => a.status === "Waiting").length;
  const completedCount = appointments.filter((a) => a.status === "Completed").length;
  const cancelledCount = appointments.filter((a) => a.status === "Cancelled").length;

  const filtered = appointments.filter((a) => {
    const t = search.toLowerCase();
    const matchSearch =
      (a.patient_name || "").toLowerCase().includes(t) ||
      (a.doctor_name || "").toLowerCase().includes(t) ||
      a.id?.toLowerCase?.()?.includes(t);
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    const matchDate = !filterDate || a.appointment_date === filterDate;
    return matchSearch && matchStatus && matchDate;
  });

  const handleStatusChange = async (id, newStatus) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      if (selected?.id === id) setSelected({ ...selected, status: newStatus });
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (!error) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      setDeleteConfirm(null);
      if (selected?.id === id) setSelected(null);
    }
  };

  const statusClass = (s) => {
    const map = { Confirmed: "green", Waiting: "amber", Completed: "blue", Cancelled: "red", "No-Show": "gray" };
    return map[s] || "blue";
  };

  return (
    <div className="adm-apt">
      <div className="adm-apt__header">
        <div>
          <h1>Appointments</h1>
          <p>Monitor schedules and manage appointment flow</p>
        </div>
        <button className="page__button" onClick={fetchAppointments}>Refresh</button>
      </div>

      <div className="adm-apt__stats">
        <div className="adm-apt__stat adm-apt__stat--blue">
          <span className="adm-apt__stat-val">{appointments.length}</span>
          <span className="adm-apt__stat-lbl">Total</span>
        </div>
        <div className="adm-apt__stat adm-apt__stat--cyan">
          <span className="adm-apt__stat-val">{todayCount}</span>
          <span className="adm-apt__stat-lbl">Today</span>
        </div>
        <div className="adm-apt__stat adm-apt__stat--green">
          <span className="adm-apt__stat-val">{confirmedCount}</span>
          <span className="adm-apt__stat-lbl">Confirmed</span>
        </div>
        <div className="adm-apt__stat adm-apt__stat--amber">
          <span className="adm-apt__stat-val">{waitingCount}</span>
          <span className="adm-apt__stat-lbl">Waiting</span>
        </div>
        <div className="adm-apt__stat adm-apt__stat--purple">
          <span className="adm-apt__stat-val">{completedCount}</span>
          <span className="adm-apt__stat-lbl">Completed</span>
        </div>
        <div className="adm-apt__stat adm-apt__stat--red">
          <span className="adm-apt__stat-val">{cancelledCount}</span>
          <span className="adm-apt__stat-lbl">Cancelled</span>
        </div>
      </div>

      <div className="adm-apt__filters">
        <input
          className="adm-apt__search"
          placeholder="Search patient, doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="adm-apt__select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="date"
          className="adm-apt__date-filter"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        {filterDate && (
          <button className="adm-apt__clear-date" onClick={() => setFilterDate("")}>Clear</button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="adm-apt__table-wrap">
          <table className="adm-apt__table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Concern</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="adm-apt__empty">No appointments found.</td>
                </tr>
              )}
              {filtered.map((a) => (
                <tr key={a.id} className="adm-apt__row">
                  <td><strong>{a.patient_name || "—"}</strong></td>
                  <td>{a.doctor_name || "—"}</td>
                  <td>{a.appointment_date || "—"}</td>
                  <td>{a.appointment_time || "—"}</td>
                  <td>{a.concern || "—"}</td>
                  <td>
                    <select
                      className={`adm-apt__status adm-apt__status--${statusClass(a.status)}`}
                      value={a.status}
                      onChange={(e) => handleStatusChange(a.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="adm-apt__actions">
                      <button className="adm-apt__action-btn adm-apt__action-btn--view" onClick={() => setSelected(a)}>View</button>
                      <button className="adm-apt__action-btn adm-apt__action-btn--del" onClick={() => setDeleteConfirm(a)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && !deleteConfirm && (
        <div className="adm-apt__overlay" onClick={() => setSelected(null)}>
          <div className="adm-apt__modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-apt__modal-head">
              <h2>Appointment Details</h2>
              <button className="adm-apt__close" onClick={() => setSelected(null)}>x</button>
            </div>
            <div className="adm-apt__profile">
              <div className="adm-apt__profile-grid">
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Patient</span><strong>{selected.patient_name}</strong></div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Doctor</span>{selected.doctor_name}</div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Date</span>{selected.appointment_date}</div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Time</span>{selected.appointment_time || "—"}</div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Concern</span>{selected.concern || "—"}</div>
                <div className="adm-apt__detail"><span className="adm-apt__detail-lbl">Status</span><span className={`adm-apt__badge adm-apt__badge--${statusClass(selected.status)}`}>{selected.status}</span></div>
                {selected.notes && (
                  <div className="adm-apt__detail adm-apt__detail--full"><span className="adm-apt__detail-lbl">Notes</span>{selected.notes}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="adm-apt__overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="adm-apt__modal adm-apt__modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="adm-apt__modal-head">
              <h2>Cancel Appointment</h2>
              <button className="adm-apt__close" onClick={() => setDeleteConfirm(null)}>x</button>
            </div>
            <p style={{ padding: "0 24px", color: "#475569" }}>
              Remove appointment for <strong>{deleteConfirm.patient_name}</strong> with {deleteConfirm.doctor_name}?
            </p>
            <div className="adm-apt__modal-actions">
              <button className="adm-apt__cancel-btn" onClick={() => setDeleteConfirm(null)}>Keep</button>
              <button className="adm-apt__delete-btn" onClick={() => handleDelete(deleteConfirm.id)}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
