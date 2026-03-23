/**
 * Returns the doctor's profile photo.
 * Checks localStorage for a custom uploaded photo first,
 * then admin-uploaded photo, then falls back to the default photo.
 */
export const getDoctorPhoto = (doctorId, fallbackPhoto) => {
  if (!doctorId) return fallbackPhoto || null;
  /* 1) Doctor's own uploaded photo (from doctor Settings) */
  const custom = localStorage.getItem(`hmsProfilePhoto_${doctorId}`);
  if (custom) return custom;
  /* 2) Admin-uploaded photo (from Admin Doctors panel) */
  try {
    const adminPhotos = JSON.parse(localStorage.getItem("hmsAdminDocPhotos") || "{}");
    if (adminPhotos[doctorId]) return adminPhotos[doctorId];
  } catch { /* ignore */ }
  return fallbackPhoto || null;
};
