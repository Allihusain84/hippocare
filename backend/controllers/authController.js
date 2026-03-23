const supabase = require('../services/supabaseService');

exports.register = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    // Create user in Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });
    if (signUpError) return res.status(400).json({ success: false, message: signUpError.message });
    const userId = signUpData.user.id;
    // Insert profile
    const { error: profileError } = await supabase.from('profiles').insert([{ id: userId, name, email, role }]);
    if (profileError) return res.status(400).json({ success: false, message: profileError.message });
    res.json({ success: true, data: { id: userId, name, email, role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ success: false, message: error.message });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.logout = async (req, res) => {
  // Client should handle logout by deleting token
  res.json({ success: true, message: 'Logged out' });
};

exports.session = async (req, res) => {
  // Session info can be handled by frontend using Supabase client
  res.json({ success: true, message: 'Session endpoint (implement as needed)' });
};
