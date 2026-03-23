const supabase = require('../services/supabaseService');
const { patients } = require('../../frontend/src/data/mockData');

exports.getPatients = async (req, res) => {
  try {
    const { data, error } = await supabase.from('patients').select('*');
    if (error) return res.status(500).json({ success: false, message: error.message });
    const result = (data && data.length) ? data : patients;
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addPatient = async (req, res) => {
  try {
    const { error } = await supabase.from('patients').insert([req.body]);
    if (error) return res.status(400).json({ success: false, message: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { error } = await supabase.from('patients').update(req.body).eq('id', req.params.id);
    if (error) return res.status(400).json({ success: false, message: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { error } = await supabase.from('patients').delete().eq('id', req.params.id);
    if (error) return res.status(400).json({ success: false, message: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
