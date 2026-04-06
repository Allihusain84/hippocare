const express = require('express');
const router = express.Router();
const supabase = require('../services/supabaseService');

/**
 * POST /api/admin/register
 * Only operation that genuinely needs the service-role key:
 * create a Supabase Auth user + insert their profile row.
 */
router.post('/register', async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ success: false, message: 'email, password, name, and role are required' });
  }

  const allowed = ['patient', 'doctor', 'admin', 'staff'];
  if (!allowed.includes(role)) {
    return res.status(400).json({ success: false, message: `role must be one of: ${allowed.join(', ')}` });
  }

  try {
    const { data, error: authErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authErr) return res.status(400).json({ success: false, message: authErr.message });

    const userId = data.user.id;
    const { error: profileErr } = await supabase
      .from('profiles')
      .insert([{ id: userId, name, email, role }]);

    if (profileErr) return res.status(400).json({ success: false, message: profileErr.message });

    res.json({ success: true, data: { id: userId, name, email, role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
