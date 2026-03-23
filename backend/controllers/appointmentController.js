const supabase = require('../services/supabaseService');
const { appointments } = require('../../frontend/src/data/mockData');

exports.getAppointments = async (req, res) => {
  try {
    const { data, error } = await supabase.from('appointments').select('*');
    if (error) return res.status(500).json({ success: false, message: error.message });
    const result = (data && data.length) ? data : appointments;
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addAppointment = async (req, res) => {
  try {
    const { error } = await supabase.from('appointments').insert([req.body]);
    if (error) return res.status(400).json({ success: false, message: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { error } = await supabase.from('appointments').update(req.body).eq('id', req.params.id);
    if (error) return res.status(400).json({ success: false, message: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { error } = await supabase.from('appointments').delete().eq('id', req.params.id);
    if (error) return res.status(400).json({ success: false, message: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
