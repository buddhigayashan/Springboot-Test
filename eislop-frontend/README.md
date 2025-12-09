# EISLOP Frontend

React 18 + Vite implementation of the Enterprise Intelligent Supply Chain & Logistics Orchestration Platform (EISLOP).

## Tech Stack
- React 18 (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Chart.js via react-chartjs-2
- react-hot-toast for notifications

## Getting Started
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Create a `.env` file with backend base URL and Google Maps key:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   VITE_GOOGLE_MAPS_KEY=YOUR_KEY
      VITE_ENABLE_MOCK_AUTH=true
   ```
3. Run the development server:
   ```powershell
   npm run dev
   ```

## Project Structure
- `src/components` – reusable UI widgets (tables, modals, charts, etc.)
- `src/layouts` – authentication and dashboard shells
- `src/pages` – feature modules (supply chain, fleet, analytics)
- `src/context` – React context providers (auth, analytics)
- `src/services` – Axios data access layer
- `src/hooks` – shared hooks (`useAuth`, `useFetch`)
- `src/utils` – helper utilities (JWT, formatters, validators)

## Authentication
JWT is stored in `localStorage` under `eislop_token`. `AuthContext` handles login/register/logout flows and ensures protected routes redirect to `/auth/login` if unauthenticated.

With `VITE_ENABLE_MOCK_AUTH=true` (default) you can sign in using:

- Email: `admin@eislop.com`
- Password: `Admin@123`

Disable the mock flag once the Spring Boot backend is ready.

## Analytics
`AnalyticsContext` loads operational metrics on mount. If the backend analytics service is unavailable, curated sample data keeps the dashboard usable for demos.

## Fleet & Supply Modules
CRUD pages rely on reusable `DataTable`, `Modal`, and form components. If API calls fail, the UI falls back to representative sample data and surfaces warnings.

## Styling
Tailwind CSS powers layout and styling. View `tailwind.config.js` for theme extensions. Custom classes use the `primary` color token to stay on-brand.

## Linting
ESLint is configured via `.eslintrc.json`. Run `npm run lint` for static checks.

---
Pair this frontend with the Spring Boot backend to enable live data orchestration across logistics, supply chain, and analytics domains.
