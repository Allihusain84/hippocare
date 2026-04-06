import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import "./StaffPatients.css";

const StaffPatients = () => {
  const { staff } = useOutletContext();
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("patients").select("*").order("created_at", { ascending: false });
      setPatients(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = patients.filter((p) => {
    const t = search.toLowerCase();
    return p.name.toLowerCase().includes(t) || (p.phone || "").includes(t) || (p.email || "").toLowerCase().includes(t);
  });

  if (loading) return <p>Loading patients...</p>;

  return (
    <div className="sp">
      <div className="sp__header">
        <div>
          <h2>Patient Registration</h2>
          <p>View patient records</p>
        </div>
        <input className="sp__search" type="text" placeholder="Search patients..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="sp__panel">
        <div className="sp__table-wrap">
          <table className="sp__table">
            <thead>
              <tr><th>Name</th><th>Age</th><th>Gender</th><th>Phone</th><th>Email</th><th>Blood Group</th><th>Address</th></tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="sp__name">{p.name}</td>
                  <td>{p.age || "—"}</td>
                  <td>{p.gender || "—"}</td>
                  <td>{p.phone || "—"}</td>
                  <td>{p.email || "—"}</td>
                  <td>{p.blood_group || "—"}</td>
                  <td>{p.address || "—"}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={7} className="sp__empty">No patients found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffPatients;
