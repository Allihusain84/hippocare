# Hippocare Hospital Management System (Frontend)

React (Vite) frontend for the Hippocare Hospital full-stack application.

## Tech Stack
- React 19 + Vite 7
- React Router
- Supabase (Auth + PostgreSQL database)
- jsPDF (receipt generation)

## Architecture
- **Authentication** — Supabase Auth with email/password. Role-based access is validated against the `profiles` table (`admin`, `doctor`, `patient`, `staff`).
- **Data** — All medical data (doctors, patients, appointments, prescriptions, payments, staff) is stored in Supabase PostgreSQL with Row-Level Security.
- **AI Chat** — Gemini API requests are proxied through the backend (`VITE_API_URL/api/gemini/chat`) to keep the API key server-side.

## Required Environment Variables

Create a `.env` file (see `.env.example`):

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `VITE_API_URL` | Backend API URL (default: `http://localhost:5000`) |

## Run Locally
1. `npm install`
2. `npm run dev`

## Build
```
npm run build
```

## Login Credentials (Seeded)

| Role | Email | Password |
|---|---|---|
| Admin | admin@hippocare.com | Admin@123 |
| Doctor | aisha.verma@hippocare.com | Doctor@123 |
| Patient | patient@hippocare.com | Patient@123 |
| Staff | staff@hippocare.com | Staff@123 |

All 8 doctors share the password `Doctor@123` — see `backend/seed-users.js` for the full list.
