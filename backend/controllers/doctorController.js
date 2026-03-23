const supabase = require('../services/supabaseService');
const { doctors } = require('../../frontend/src/data/mockData');

exports.getDoctors = async (req, res) => {
  try {
    const { data, error } = await supabase.from('doctors').select('*');
    if (error) return res.status(500).json({ success: false, message: error.message });
    const result = (data && data.length) ? data : doctors;
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addDoctor = async (req, res) => {
  try {
    const { error } = await supabase.from('doctors').insert([req.body]);
    if (error) return res.status(400).json({ success: false, message: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const { error } = await supabase.from('doctors').update(req.body).eq('id', req.params.id);
    if (error) return res.status(400).json({ success: false, message: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { error } = await supabase.from('doctors').delete().eq('id', req.params.id);
    if (error) return res.status(400).json({ success: false, message: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
