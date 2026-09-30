# Veer Kunwar Singh — Portfolio

A premium, dark-themed personal portfolio for Veer Kunwar Singh, Full Stack Developer.
Two independent apps live here:

```
portfolio/
├── frontend/   React + Vite + Tailwind + Framer Motion
└── backend/    Node.js + Express contact-form API (Nodemailer)
```

## 1. Frontend

```bash
cd frontend
npm install
cp .env.example .env      # set VITE_API_URL to your backend URL
npm run dev                # http://localhost:5173
```

All editable content lives in `frontend/src/data/`:

| File | Controls |
|---|---|
| `siteData.js` | name, hero copy, about text, **stats** (set real numbers or leave `null` to hide), resume path, social links, nav |
| `skills.js` | tech stack cards, grouped by category |
| `projects.js` | project cards, tech tags, live/GitHub links |
| `certificates.js` | certificate gallery (starts empty — add your own) |

No stats, certificates, or achievements were invented — the file defaults to `null`/empty
until you fill in real information.

**Assets to add** (paths already wired up, just drop files in):
- `public/assets/profile.jpg` — hero portrait
- `public/assets/resume/resume.pdf` — resume (preview, download, open-in-tab all use this)
- `public/assets/projects/medicare.png`, `rideit.png` — project screenshots
- `public/assets/certificates/*` — certificate images/PDFs referenced from `certificates.js`

Until an asset is added, the UI shows a clean placeholder instead of a broken image.

Build for production:
```bash
npm run build      # outputs to frontend/dist
```

## 2. Backend

```bash
cd backend
npm install
cp .env.example .env      # fill in SMTP + receiver details
npm run dev                 # http://localhost:5000
```

Environment variables (`.env`):

```
PORT=5000
CLIENT_URL=http://localhost:5173        # comma-separate multiple origins in production
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
RECEIVER_EMAIL=
```

`POST /api/contact` validates and sanitizes input (express-validator), rate-limits
to 5 requests / 15 minutes per IP, checks a hidden honeypot field, and emails
`RECEIVER_EMAIL` via Nodemailer with `reply-to` set to the sender — so you can reply
directly from your inbox. Security headers via Helmet, CORS locked to `CLIENT_URL`.

## 3. Deployment

- **Frontend → Vercel**: import `frontend/` as the project root, set `VITE_API_URL`
  to your deployed backend URL in Vercel's environment variables.
- **Backend → Render**: import `backend/` as the project root (or set root directory
  to `backend`), add all variables from `.env.example` as Render environment variables,
  start command `node server.js`.
- After both are live, update `CLIENT_URL` on the backend to your Vercel domain, and
  `VITE_API_URL` on the frontend to your Render domain, then redeploy each.

## 4. What still needs your input

- Real numbers for the four stats in `siteData.js` (currently hidden)
- Social links (GitHub / LinkedIn / email) in `siteData.js`
- MediCare's live URL and GitHub URL in `projects.js` (RideIt's links are already set)
- Resume PDF, portrait photo, project screenshots, and certificates (see Assets above)
- SMTP credentials in `backend/.env`
