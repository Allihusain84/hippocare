require('dotenv').config();

const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const geminiRoutes = require('./routes/gemini');

const app = express();

const REQUIRED_ENV = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'FRONTEND_URL'];
const missing = REQUIRED_ENV.filter((v) => !process.env[v]);
if (missing.length) {
  console.error(`Missing env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const allowedOrigins = process.env.FRONTEND_URL.split(',')
  .map((s) => s.trim())
  .filter(Boolean);
if (allowedOrigins.length === 0) {
  console.error('FRONTEND_URL must contain at least one origin URL');
  process.exit(1);
}

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/gemini', geminiRoutes);

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Hippocare Hospital API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
