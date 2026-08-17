# Interior Design Studio

Production-oriented Next.js and Express foundation for an interior-design studio. Business facts, imagery, social profiles, and contact data are intentionally environment-configured rather than fabricated.

## Project Structure

- `frontend/` – Next.js + Tailwind + Framer Motion + GSAP + Lenis + Three.js frontend
- `backend/` – Express lead API with PostgreSQL persistence, validation, rate limits, secure headers, CORS allowlist, and optional SMTP notifications

## Run Locally

### Frontend

```bash
cd frontend
npm ci
npm run dev
```

### Backend

```bash
cd backend
npm ci
npm run dev
```

## Configuration

Copy `frontend/.env.example` to `frontend/.env.local` and `backend/.env.example` to `backend/.env`. Set `DATABASE_URL` to a PostgreSQL database. Configure all SMTP variables to enable lead and customer email messages. In production set `FRONTEND_URL` to the deployed frontend origin and `NEXT_PUBLIC_API_URL` to the public API origin.

Create an admin password hash with `cd backend && npm run hash-admin-password -- "your-long-password"`; place its output in `ADMIN_PASSWORD_HASH`, then set `ADMIN_EMAIL` and a random `AUTH_SECRET` of at least 32 characters.

## API endpoints

- `GET /api/health`
- `POST /api/contact`

## Production

Run `npm run build` then `npm start` in both applications. The backend initializes the `leads` table and indexes on startup; use a managed PostgreSQL service with SSL in production. Do not deploy with missing `DATABASE_URL` or `FRONTEND_URL`.

## Verification

Run `npm run lint` and `npm run build` in `frontend`, and `npm test` in `backend`. The backend requires a reachable database for its startup and API checks.
