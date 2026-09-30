# Angular Admin Dashboard

Angular administrative frontend with reusable CRUD and data-grid components.

## Features

- Reusable client-side and server-side data tables
- Filtering, sorting, column selection, grouping, and pagination
- Excel, CSV, and PDF export utilities
- JWT-oriented authentication guards and interceptor code
- Role-aware security modules
- English, French, Arabic, and Spanish translation files
- Docker and nginx configuration for deployment

## Architecture

The application is an Angular project. Shared UI and data-grid components live under `src/app/pages/components`, while generated application scaffolding is under `src/app/zynerator`. Project documentation is available in `docs/`.

## Getting Started

```bash
npm ci
npm start
```

Use `npm run build` for a production build. Backend API endpoints are configured through the Angular environment files; the backend is separate from this repository.

## Documentation

See `docs/project/overview.md` and `docs/components/` for the data-grid and UI component documentation.

## Origin and Attribution

The project includes PrimeNG Sakai template material and Zynerator-generated scaffolding. The reusable data-grid implementation and project-specific modules are maintained alongside that generated and template code; this README does not present template or generated code as wholly original work.
