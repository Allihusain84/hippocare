const supabase = require('../services/supabaseService');

// Example middleware for protected routes (expand as needed)
module.exports = async function (req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  // Validate token with Supabase
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
  req.user = data.user;
  next();
};
