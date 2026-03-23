import doctorsData from "../data/doctorsData";

/**
 * getDoctorData – Returns doctor data merged with any saved setting overrides.
 *
 * When a doctor updates their name, specialization, phone, email, experience,
 * fee, bio, or address from their Settings page, those values are persisted in
 * localStorage under `hmsDoctorSettings_<doctorId>`.
 *
 * This utility reads the base doctorsData entry and overlays any saved changes,
 * so every page in the app automatically reflects the latest values.
 *
 * Also supports admin-added doctors stored in localStorage (hmsAdminDoctors).
 *
 * Usage:
 *   import { getDoctorData, getAllDoctors } from "../utils/getDoctorData";
 *   const doc = getDoctorData("dr-aisha-verma");
 *   const allDocs = getAllDoctors();           // array with overrides applied
 */

const SETTINGS_KEY = "hmsDoctorSettings";

/**
 * Helper: get an admin-added doctor from localStorage by ID.
 * Returns null if not found or if the doctor exists in static data.
 */
const getAdminDoctor = (doctorId) => {
  try {
    const raw = localStorage.getItem("hmsAdminDoctors");
    if (!raw) return null;
    const all = JSON.parse(raw);
    if (doctorsData[doctorId]) return null; // exists in static data
    const found = all.find((d) => d.id === doctorId);
    if (!found) return null;
    const photos = JSON.parse(localStorage.getItem("hmsAdminDocPhotos") || "{}");
    return {
      ...found,
      photo: photos[doctorId] || found.photo || "",
      qualifications: found.qualifications || [],
      specializations: found.specializations || [],
      verified: true,
    };
  } catch {
    return null;
  }
};

/**
 * Get a single doctor's data with saved overrides merged in.
 * Returns null if the doctorId does not exist in the base data.
 */
export const getDoctorData = (doctorId) => {
  if (!doctorId) return null;
  const base = doctorsData[doctorId];
  if (!base) {
    // Check admin-added doctors in localStorage
    return getAdminDoctor(doctorId);
  }

  // Clone so we don't mutate the import
  const merged = { ...base };

  try {
    const raw = localStorage.getItem(`${SETTINGS_KEY}_${doctorId}`);
    if (raw) {
      const saved = JSON.parse(raw);
      const p = saved.profile || {};

      // Name
      if (p.name && p.name.trim()) merged.name = p.name.trim();

      // Specialization → put as first entry in specializations array
      if (p.specialization && p.specialization.trim()) {
        merged.specializations = [
          p.specialization.trim(),
          ...(base.specializations || []).filter(
            (s) => s.toLowerCase() !== p.specialization.trim().toLowerCase()
          ),
        ];
      }

      // Experience
      if (p.experience && p.experience.trim()) merged.experience = p.experience.trim();

      // Email (store as contactEmail so it's accessible)
      if (p.email && p.email.trim()) merged.contactEmail = p.email.trim();

      // Phone
      if (p.phone && p.phone.trim()) merged.contactPhone = p.phone.trim();

      // Bio
      if (p.bio && p.bio.trim()) merged.bio = p.bio.trim();

      // Address
      if (p.address && p.address.trim()) merged.address = p.address.trim();

      // Consultation fee
      const c = saved.consultation || {};
      if (c.fee && c.fee.trim()) merged.fee = c.fee.trim();
    }
  } catch {
    /* If localStorage data is corrupt, just return base data */
  }

  return merged;
};

/**
 * Get the full doctors data object with overrides applied.
 * Returns { "dr-aisha-verma": {...}, ... }
 */
export const getDoctorsDataMerged = () => {
  const result = {};
  for (const id of Object.keys(doctorsData)) {
    result[id] = getDoctorData(id);
  }
  // Also include admin-added doctors from localStorage
  try {
    const raw = localStorage.getItem("hmsAdminDoctors");
    if (raw) {
      const all = JSON.parse(raw);
      const photos = JSON.parse(localStorage.getItem("hmsAdminDocPhotos") || "{}");
      all.forEach((d) => {
        if (!doctorsData[d.id]) {
          result[d.id] = {
            ...d,
            photo: photos[d.id] || d.photo || "",
            qualifications: d.qualifications || [],
            specializations: d.specializations || [],
            verified: true,
          };
        }
      });
    }
  } catch { /* ignore */ }
  return result;
};

/**
 * Get all doctors as an array with overrides applied.
 */
export const getAllDoctors = () => Object.values(getDoctorsDataMerged());

/**
 * Apply saved overrides to any hardcoded expertDoctors array.
 * Each item must have an `id` that matches a key in doctorsData.
 * Returns a new array with name, specialization, experience, fee merged.
 */
export const applyDoctorOverrides = (expertDoctors) => {
  if (!expertDoctors || !Array.isArray(expertDoctors)) return expertDoctors;
  return expertDoctors.map((doc) => {
    const merged = getDoctorData(doc.id);
    if (!merged) return doc;
    return {
      ...doc,
      name: merged.name || doc.name,
      specialization: merged.specializations?.[0] || doc.specialization,
      experience: merged.experience || doc.experience,
      fee: merged.fee || doc.fee,
    };
  });
};

export default getDoctorData;

/**
 * Get admin-added doctors for a specific department / service page.
 * Reads hmsAdminDoctors from localStorage and filters by specialization match.
 * Accepts a single keyword string or an array of keywords.
 * Only returns doctors that were ADDED by admin (not the original doctorsData entries).
 * Returns array formatted for service-page expert carousels.
 */
export const getAdminDoctorsForDept = (deptKeywords) => {
  try {
    const keywords = Array.isArray(deptKeywords) ? deptKeywords : [deptKeywords];
    const lowerKw = keywords.map((k) => k.toLowerCase());
    const raw = localStorage.getItem("hmsAdminDoctors");
    if (!raw) return [];
    const all = JSON.parse(raw);
    const photos = JSON.parse(localStorage.getItem("hmsAdminDocPhotos") || "{}");
    const originalIds = new Set(Object.keys(doctorsData));

    return all
      .filter((d) => {
        if (originalIds.has(d.id)) return false;
        /* Match by explicit department field (set by admin form) */
        if (d.department) {
          const deptLower = d.department.toLowerCase();
          if (lowerKw.some((k) => deptLower.includes(k))) return true;
        }
        /* Fallback: match by specialization keywords */
        return (d.specializations || []).some((s) =>
          lowerKw.some((k) => s.toLowerCase().includes(k))
        );
      })
      .map((d) => ({
        id: d.id,
        name: d.name,
        photo: photos[d.id] || d.photo || "",
        specialization: (d.specializations || [])[0] || d.department || keywords[0],
        experience: d.experience || "—",
        recommended: d.recommended || "—",
        fee: d.fee || "—",
      }));
  } catch {
    return [];
  }
};
