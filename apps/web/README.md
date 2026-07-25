# @kisaniyat/web

The React + TypeScript frontend for Kisaniyat (AI Farmer Scheme Assistant).

## Stack
React 19 · Vite · TypeScript · Tailwind CSS · Framer Motion · Recharts · Lucide · Axios · React Router

## Scripts
```bash
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Environment
Copy `.env.example` → `.env`. Set `VITE_API_URL` to use the real backend;
leave it unset to run against the bundled **mock data layer** (`src/data/*`).

## Structure
```
src/
├── components/   # layout (Navbar/Footer), ui/, schemes/, FAQ
├── context/      # Auth, Theme, Language, AppData, Toast
├── data/         # mock datasets (schemes, updates, news, weather)
├── hooks/        # useDebounce, ...
├── lib/          # utils (cn, dates, currency)
├── pages/        # lazy-loaded route pages
├── services/     # api + domain services (real ↔ mock)
└── types/        # shared domain types
```

The `services/*` layer is the single seam between UI and data: each function
calls the API when `VITE_API_URL` is present, otherwise returns mock data.
