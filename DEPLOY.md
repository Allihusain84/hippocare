# Deploy Hippocare Hospital (Render + Vercel)

This repo is a monorepo: **`backend/`** (Express API) and **`frontend/`** (Vite + React).

## Quick reference

| Service   | Platform | Root directory | URL you will get                          |
|-----------|----------|----------------|-------------------------------------------|
| API       | Render   | `backend`      | `https://<your-service>.onrender.com`     |
| Frontend  | Vercel   | `frontend`     | `https://<your-project>.vercel.app`       |

---

## 1. Render (backend)

### Option A — Blueprint (uses [render.yaml](render.yaml))

1. Push this repo to GitHub.
2. In [Render Dashboard](https://dashboard.render.com) → **Blueprints** → **New Blueprint Instance**.
3. Select the repository and branch. Render reads `render.yaml`.
4. When prompted, set **secret** environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `FRONTEND_URL` — your Vercel production URL (see section 2). You can add preview URLs later, comma-separated.
   - `GEMINI_API_KEY` (optional; required for Gemini chat)

### Option B — Web Service (manual)

1. **New** → **Web Service** → connect the repo.
2. **Root directory:** `backend`
3. **Build command:** `npm install`
4. **Start command:** `npm start`
5. **Health check path:** `/`
6. Add the same environment variables as above.

Copy the service URL (e.g. `https://hippocare-hospital-api.onrender.com`). The API must stay awake for the first request after idle on the free tier (cold start).

**`FRONTEND_URL`:** Required at startup. Use your **production** Vercel URL with no trailing slash. For Vercel preview deployments, add extra origins separated by commas (no spaces), for example:

`https://myapp.vercel.app,https://myapp-git-feature-xyz.vercel.app`

---

## 2. Vercel (frontend)

1. [Vercel Dashboard](https://vercel.com) → **Add New** → **Project** → import the same GitHub repo.
2. **Root Directory:** `frontend` (Override the default and set to `frontend`).
3. **Framework Preset:** Vite (auto-detected).
4. **Build Command:** `npm run build` (default).
5. **Output Directory:** `dist` (default for Vite).

### Environment variables (Production + Preview as needed)

| Name | Value |
|------|--------|
| `VITE_SUPABASE_URL` | Same as Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | **Legacy JWT anon key** (`eyJ...`), not `sb_publishable_...` |
| `VITE_API_URL` | Your Render API URL, **no trailing slash** (e.g. `https://hippocare-hospital-api.onrender.com`) |

Redeploy after changing `VITE_*` variables (they are inlined at build time).

### SPA routing

[frontend/vercel.json](frontend/vercel.json) rewrites all paths to `index.html` so React Router works on hard refresh and deep links (`/admin`, `/patient`, etc.).

---

## 3. Wire CORS (order of operations)

1. Deploy Vercel once and note the **production** URL (`https://....vercel.app`).
2. Set Render `FRONTEND_URL` to that URL (and any preview URLs, comma-separated). **Redeploy** the Render service if you change it.
3. Set Vercel `VITE_API_URL` to the Render URL and **redeploy** the frontend.

If the API was deployed first, update `FRONTEND_URL` on Render after Vercel exists, then redeploy Render.

---

## 4. Supabase (production)

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Authentication** → **URL configuration**.
2. Set **Site URL** to your Vercel production URL.
3. Under **Redirect URLs**, add:
   - Production: `https://your-app.vercel.app/**` (or the exact patterns Supabase suggests).
   - Optional: preview URLs if you use Supabase OAuth or magic links later.

Email/password sign-in works once the anon key and URL are correct; configuring Site URL avoids subtle auth issues in production.

---

## 5. Security

- Keep **service role** key only on Render (never in Vercel or the browser).
- Do not commit `.env` files; use platform env UIs or secrets.
- Rotate keys if they were ever exposed in git history.

---

## Verify

- `GET https://<render-host>/` → JSON `{ success: true, message: '...' }`
- Open Vercel site → login → patient/admin flows should load data from Supabase and call `VITE_API_URL` for Gemini (if configured).
