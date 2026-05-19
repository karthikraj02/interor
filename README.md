# Sai Interior Designers

Futuristic luxury interior design website experience for **Sai Interior Designers**.

## Project Structure

- `frontend/` – Next.js + Tailwind + Framer Motion + GSAP + Lenis + Three.js frontend
- `backend/` – Basic Express API for health and consultation contact submission

## Run Locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## API Endpoints

- `GET /api/health`
- `POST /api/contact`

## Environment variables

Frontend supports optional `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_PHONE_DISPLAY` for business contact details.
Backend supports `PORT` (see `backend/.env.example`).
