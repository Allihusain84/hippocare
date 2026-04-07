const express = require('express');
const router = express.Router();
const supabase = require('../services/supabaseService');

/**
 * POST /api/admin/register
 * Only operation that genuinely needs the service-role key:
 * create a Supabase Auth user + insert their profile row.
 */
router.post('/register', async (req, res) => {
  const { email, password, name, role, staff } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();
  const normalizedName = (name || '').trim();

  if (!normalizedEmail || !password || !normalizedName || !role) {
    return res.status(400).json({ success: false, message: 'email, password, name, and role are required' });
  }

  const allowed = ['patient', 'doctor', 'admin', 'staff'];
  if (!allowed.includes(role)) {
    return res.status(400).json({ success: false, message: `role must be one of: ${allowed.join(', ')}` });
  }

  if (role === 'staff' && (!staff || !staff.department || !staff.role)) {
    return res.status(400).json({ success: false, message: 'staff.department and staff.role are required for staff registration' });
  }

  try {
    const { data, error: authErr } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true,
      user_metadata: { name: normalizedName, role },
    });

    if (authErr) return res.status(400).json({ success: false, message: authErr.message });

    const userId = data.user.id;
    const { error: profileErr } = await supabase
      .from('profiles')
      .insert([{ id: userId, name: normalizedName, email: normalizedEmail, role }]);

    if (profileErr) {
      await supabase.auth.admin.deleteUser(userId);
      return res.status(400).json({ success: false, message: profileErr.message });
    }

    if (role === 'staff') {
      const shift = staff.shift || 'Morning Shift';
      const shiftTime = staff.shift_time || (
        shift === 'Evening Shift'
          ? '02:00 PM – 10:00 PM'
          : shift === 'Night Shift'
            ? '10:00 PM – 06:00 AM'
            : '06:00 AM – 02:00 PM'
      );

      const { error: staffErr } = await supabase.from('staff').insert([{
        id: userId,
        name: normalizedName,
        email: normalizedEmail,
        department: staff.department,
        role: staff.role,
        phone: staff.phone || null,
        assigned_doctor_id: staff.assigned_doctor_id || null,
        room_number: staff.room_number || null,
        shift,
        shift_time: shiftTime,
      }]);

      if (staffErr) {
        const cleanupErrors = [];
        try {
          const { error: profileDeleteErr } = await supabase.from('profiles').delete().eq('id', userId);
          if (profileDeleteErr) cleanupErrors.push(`profile cleanup failed: ${profileDeleteErr.message}`);
        } catch (cleanupErr) {
          cleanupErrors.push(`profile cleanup exception: ${cleanupErr.message}`);
        }

        try {
          const { error: userDeleteErr } = await supabase.auth.admin.deleteUser(userId);
          if (userDeleteErr) cleanupErrors.push(`auth cleanup failed: ${userDeleteErr.message}`);
        } catch (cleanupErr) {
          cleanupErrors.push(`auth cleanup exception: ${cleanupErr.message}`);
        }

        if (cleanupErrors.length) {
          return res.status(500).json({
            success: false,
            message: `${staffErr.message}. Cleanup issue(s): ${cleanupErrors.join('; ')}`,
          });
        }
        return res.status(400).json({ success: false, message: staffErr.message });
      }
    }

    res.json({ success: true, data: { id: userId, name: normalizedName, email: normalizedEmail, role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
