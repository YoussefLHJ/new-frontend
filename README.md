# Sakai-NG — Angular 21 Admin Dashboard

Full-featured admin dashboard built with **Angular 21**, **PrimeNG 21**, and **Tailwind CSS 4**. The application follows a three-layer architecture (framework / shared / module) with standalone components, zoneless change detection, JWT authentication, and multi-language support (EN, FR, ES, AR with RTL).

## Tech Stack

| Layer        | Technology                                          |
|--------------|-----------------------------------------------------|
| Framework    | Angular 21 (standalone, zoneless)                   |
| UI Library   | PrimeNG 21 + PrimeIcons 7                           |
| Styling      | Tailwind CSS 4.1 + SCSS                             |
| i18n         | ngx-translate (EN, FR, ES, AR)                      |
| Auth         | JWT (@auth0/angular-jwt)                            |
| Charts       | Chart.js 4                                          |
| Export       | jsPDF, ExcelJS, xlsx                                |
| Calendar     | FullCalendar 6                                      |
| Backend      | Spring Boot (expected at `localhost:8036`)           |
| Deployment   | Docker + Nginx (multi-stage, profile-based SSL)     |

---

## Prerequisites

- **Node.js** >= 22
- **npm** >= 10
- **Angular CLI** >= 21 (`npm install -g @angular/cli`)
- **Docker** (optional, for containerised deployment)

---

## Installation (Local)

```bash
# 1. Clone the repository
git clone <repository-url>
cd sakai-ng

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start the development server
ng serve
```

The app is available at **http://localhost:4200/**. It expects the backend API at `http://localhost:8036/api/`.

### Useful Commands

| Command              | Description                              |
|----------------------|------------------------------------------|
| `ng serve`           | Start dev server with hot-reload         |
| `npm run build`      | Production build → `dist/sakai-ng/`      |
| `ng test`            | Run unit tests (Karma)                   |
| `ng lint`            | Lint with ESLint + Prettier              |
| `npm run format`     | Format code with Prettier                |

---

## Installation (Docker)

The Dockerfile uses a **multi-stage build** (Node 22 → Nginx) and supports **profile-based** configuration for different environments.

```bash
# Build for local development (uses localhost nginx/ssl configs)
docker build -t sakai-ng .

# Build for production
docker build --build-arg PROFILE=prod -t sakai-ng:prod .

# Run the container
docker run -p 80:80 sakai-ng
```

The `PROFILE` build argument selects which Nginx and SSL configuration set is used from `src/zyn/`. See [Infrastructure](#srczyn--infrastructure) below.

---

## Environment Configuration

Environment files live in `src/environments/`:

| File                    | Purpose                                    |
|-------------------------|--------------------------------------------|
| `environment.ts`        | Development — API at `http://localhost:8036`  |
| `environment.prod.ts`   | Production — API at `https://localhost:8036`  |

Key variables:

```typescript
apiUrl: 'http://localhost:8036/'          // Backend base URL
loginUrl: 'http://localhost:8036/'        // Auth endpoint
uploadMultipleUrl: '…/cloud/upload-multiple/bucket/ana'  // File uploads
stripePublicKey: 'pk_test_…'             // Stripe integration
rootAppUrl: 'app'                        // Root route prefix
```

To change the backend URL, edit the appropriate environment file before building.

---

## Project Structure

```
sakai-ng/
├── src/
│   ├── app/                        # Application source code
│   │   ├── zynerator/              #   Framework layer (generic base classes)
│   │   ├── shared/                 #   Shared domain layer (models, services, components)
│   │   ├── module/                 #   Feature modules (business views)
│   │   ├── layout/                 #   Application shell (topbar, sidebar, footer)
│   │   ├── pages/                  #   Demo / UI showcase pages
│   │   ├── app.component.ts        #   Root component
│   │   ├── app.config.ts           #   Application providers configuration
│   │   ├── app.routes.ts           #   Root routing table
│   │   └── app-routing.module.ts   #   Legacy routing module
│   ├── assets/                     # Static resources (styles, images, i18n)
│   ├── environments/               # Environment-specific configuration
│   ├── types/                      # Global TypeScript type declarations
│   ├── zyn/                        # Infrastructure configs (Nginx, SSL)
│   ├── index.html                  # HTML entry point
│   └── main.ts                     # Bootstrap entry point
├── public/                         # Public static assets (served as-is)
├── Dockerfile                      # Multi-stage Docker build
├── angular.json                    # Angular CLI workspace configuration
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # Root TypeScript configuration
├── eslint.config.js                # ESLint configuration
└── vercel.json                     # Vercel deployment config
```

### Detailed Breakdown

#### `src/app/zynerator/` — Framework Layer

The core framework providing generic, reusable base classes. Business modules extend these rather than implementing CRUD logic from scratch.

```
zynerator/
├── dto/                            # Base data transfer objects
│   ├── BaseDto.model.ts            #   Root DTO — all models extend this (id field)
│   ├── PaginatedList.model.ts      #   Server pagination wrapper (items, totalCount)
│   ├── FileTempDto.model.ts        #   File upload metadata
│   ├── MinIOInfos.model.ts         #   Cloud storage (MinIO) configuration
│   └── ScheduleDto.model.ts        #   Scheduling data structure
├── criteria/
│   └── BaseCriteria.model.ts       #   Base search filter (page, maxResults, sort)
├── controller/                     # Abstract component controllers
│   ├── AbstractCreateController.ts #   Create-dialog logic (open, validate, save)
│   ├── AbstractEditController.ts   #   Edit-dialog logic (load, update)
│   ├── AbstractListController.ts   #   List/table logic (fetch, paginate, delete)
│   └── AbstractViewController.ts   #   Detail-view logic (read-only display)
├── service/
│   ├── AbstractService.ts          #   Generic HTTP CRUD service (GET/POST/PUT/DELETE)
│   └── ServiceLocator.ts           #   Global Angular injector reference
├── security/                       # Authentication & authorization
│   ├── guards/
│   │   ├── auth.guard.ts           #     Protects routes — redirects to login if no token
│   │   └── guest.guard.ts          #     Allows access only to unauthenticated users
│   ├── interceptors/
│   │   └── jwt.interceptor.ts      #     Attaches JWT Bearer token to outgoing requests
│   └── shared/
│       ├── model/                  #     User, Role, Permission DTOs
│       ├── criteria/               #     User search/filter criteria
│       └── service/                #     AuthService, TokenService, UserService, RoleService
├── spinner/                        # Global loading indicator
│   ├── http.interceptor.ts         #   Shows spinner during HTTP requests
│   ├── loading.service.ts          #   Spinner visibility state
│   └── spinner.component.ts        #   Spinner UI component
└── util/                           # Utility services
    ├── DateUtils.ts                #   Date formatting helpers
    ├── Export.service.ts            #   PDF / Excel / CSV export
    ├── MessageHelper.service.ts    #   Toast notification helper
    └── StringUtil.service.ts       #   String manipulation utilities
```

#### `src/app/shared/` — Shared Domain Layer

Domain-specific models, criteria, services, and reusable UI components. These are used by the feature modules in `module/`.

```
shared/
├── model/                          # Business domain DTOs
│   ├── demande/
│   │   ├── Client.model.ts         #   Client entity (code, libelle, description, actif)
│   │   └── Demande.model.ts        #   Request entity (numero, adresse, dates, client FK)
│   └── commun/
│       ├── ActionDemande.model.ts   #   Action reference data
│       └── MotifDemande.model.ts    #   Reason/motif reference data
├── criteria/                       # Search filter objects per entity
│   ├── demande/
│   │   ├── ClientCriteria.model.ts  #   Filter by code, libelle, etc.
│   │   └── DemandeCriteria.model.ts #   Filter by numero, date range, etc.
│   └── commun/
│       ├── ActionDemandeCriteria.model.ts
│       └── MotifDemandeCriteria.model.ts
├── service/admin/                  # Admin-level HTTP services
│   ├── demande/
│   │   ├── ClientAdmin.service.ts   #   CRUD operations for Client
│   │   └── DemandeAdmin.service.ts  #   CRUD operations for Demande
│   └── commun/
│       ├── ActionDemandeAdmin.service.ts
│       └── MotifDemandeAdmin.service.ts
├── components/                     # Reusable UI components
│   └── data-grid/                  #   Advanced data table toolkit
│       ├── data-table/             #     Core reusable table (selection bar, view dialog, CRUD actions)
│       ├── data-grid-toolbar/      #     Toolbar with filter, group, export actions
│       ├── column-selector/        #     Show/hide table columns
│       ├── export-menu/            #     PDF / Excel / CSV export popover (color-coded icons)
│       ├── filter-dialog/          #     Advanced multi-condition filter (AND/OR logic, card layout)
│       ├── view-detail-dialog/     #     Read-only record detail dialog (auto-generated from columns)
│       ├── services/               #     DataGridFilterService (client-side filter engine)
│       └── models/                 #     ColumnConfig, FilterGroup, FilterOperator interfaces
└── pipe/
    └── signal-translate.pipe.ts    #   Signal-aware i18n pipe (works with zoneless CD)
```

#### `src/app/module/` — Feature Modules (Business Logic)

Contains the actual business screens users interact with. Each view is a CRUD page backed by the shared services.

```
module/
├── admin/
│   ├── admin.module.ts             # PrimeNG component imports for admin views
│   ├── admin-routing.module.ts     # Child routes (dashboard, client, demande, etc.)
│   └── view/                       # Business CRUD views
│       ├── client/
│       │   └── client.component.ts #   Client management (list, create, edit, delete)
│       ├── demande/
│       │   └── demande.component.ts #  Request management
│       ├── action-demande/
│       │   └── action-demande.component.ts
│       └── motif-demande/
│           └── motif-demande.component.ts
└── security/                       # Auth standalone components
    ├── login.ts                    #   Login form with i18n
    ├── register.ts                 #   Registration form
    ├── activation.ts               #   Email activation page
    ├── change-password.ts          #   Password change page
    └── forget-password.ts          #   Password recovery page
```

#### `src/app/layout/` — Application Shell

The visual frame of the application: header, sidebar menu, footer, and theme configuration.

```
layout/
├── component/
│   ├── app.layout.ts               # Main wrapper (topbar + sidebar + router-outlet)
│   ├── app.topbar.ts               # Header bar (language switcher, profile menu)
│   ├── app.sidebar.ts              # Collapsible navigation sidebar
│   ├── app.menu.ts                 # Menu item definitions
│   ├── app.menuitem.ts             # Recursive menu item renderer
│   ├── app.footer.ts               # Footer bar
│   ├── app.configurator.ts         # Theme configuration panel
│   └── app.floatingconfigurator.ts # Floating config button
└── service/
    ├── language.service.ts          # i18n management (signal-based, RTL for Arabic)
    └── layout.service.ts            # Layout state (menu mode, dark mode, theme)
```

#### `src/app/pages/` — Demo & Showcase Pages

Template pages from PrimeNG Sakai. These serve as examples and can be removed in production without affecting business functionality.

```
pages/
├── dashboard/           # Dashboard with chart widgets and stats
├── crud/                # Generic CRUD demo (products table)
├── uikit/               # PrimeNG component showcase (buttons, forms, tables, etc.)
├── auth/                # Error pages (access denied, 404)
├── landing/             # Marketing landing page
├── documentation/       # In-app documentation page
├── empty/               # Blank page template
└── service/             # Demo data services (products, customers, countries)
```

#### `src/assets/` — Static Resources

```
assets/
├── i18n/                # Translation JSON files
│   ├── en.json          #   English
│   ├── fr.json          #   French
│   ├── es.json          #   Spanish
│   └── ar.json          #   Arabic (RTL)
├── layout/              # Layout SCSS and images
│   ├── layout.scss      #   Main layout stylesheet
│   ├── _topbar.scss     #   Topbar-specific styles
│   ├── _menu.scss       #   Sidebar menu styles
│   ├── _responsive.scss #   Responsive breakpoints
│   ├── variables/       #   Dark/light mode SCSS variables
│   ├── images/          #   Logos, banners, icons
│   └── login/           #   Login page SVG illustrations
├── demo/                # Demo page assets (flags, styles)
├── styles.scss          # Global stylesheet entry point
└── tailwind.css         # Tailwind CSS 4 configuration + PrimeUI plugin
```

#### `src/zyn/` — Infrastructure

Profile-based Nginx and SSL configurations used by the Docker build.

```
zyn/
├── nginx/
│   ├── localhost/
│   │   ├── nginx.conf      # Nginx main config (workers, logging)
│   │   └── default.conf    # Server block (port 80 + SSL, SPA fallback)
│   └── prod/
│       ├── nginx.conf
│       └── default.conf    # Production server block (server_name: _)
└── ssl/
    ├── localhost/
    │   ├── cert.pem        # Self-signed dev certificate
    │   └── key.pem         # Dev private key
    └── prod/
        ├── cert.pem        # Production certificate
        └── key.pem         # Production private key
```

---

## Architecture Overview

The application follows a **three-layer architecture**:

```
┌──────────────────────────────────────────────┐
│              module/ (Feature Layer)          │
│  Business views: Client, Demande, Auth, ...  │
├──────────────────────────────────────────────┤
│              shared/ (Domain Layer)           │
│  Models, Criteria, Services, Reusable UI     │
├──────────────────────────────────────────────┤
│            zynerator/ (Framework Layer)       │
│  Base DTOs, Abstract Services, Guards,       │
│  Interceptors, Utilities                     │
└──────────────────────────────────────────────┘
```

- **zynerator/** provides generic, entity-agnostic base classes (e.g., `AbstractService<T>` handles all CRUD HTTP calls).
- **shared/** defines domain-specific models and services that extend the framework (e.g., `ClientAdmin.service.ts` extends `AbstractService<Client>`).
- **module/** contains the UI components that consume shared services to build actual screens.

### Reusable Data-Grid System

All CRUD tables (Client, Demande, ActionDemande, MotifDemande) are powered by a single shared `<app-data-table>` component. Features propagate automatically to every module.

| Feature | Description |
|---------|-------------|
| **Column Configuration** | Declarative `ColumnConfig[]` drives headers, types, sorting, visibility, grouping |
| **Advanced Filtering** | Multi-condition filter dialog with AND/OR logic, card-based UI, per-type inputs |
| **Row Grouping** | Multi-field grouping with expandable subheaders and count badges |
| **Column Visibility** | Toggle columns on/off via popover; persisted to localStorage |
| **Row Selection** | Checkbox selection with contextual selection bar (count + bulk delete) |
| **View Detail Dialog** | Read-only record detail dialog, auto-generated from column config |
| **Row Actions** | View / Edit / Delete with icon buttons and tooltips |
| **Export** | PDF, Excel, CSV with professional formatting, filter criteria, and page numbers |
| **Global Search** | Debounced full-text search across all visible fields (including entity labels) |
| **Loading State** | Skeleton loading driven by `[loading]` input |
| **Empty State** | Illustrated empty message when no records found |
| **i18n** | Every label, operator, and button is fully translated (EN, FR, ES, AR) |

### Key Patterns

- **Standalone Components** — No NgModules for components; everything uses `standalone: true` with direct imports.
- **Zoneless Change Detection** — Angular 21's `provideZonelessChangeDetection()` is enabled; reactivity is driven by Signals.
- **JWT Authentication** — Tokens stored in localStorage, attached via `JwtInterceptor`, routes protected by `AuthGuard`.
- **i18n** — ngx-translate with 4 languages; `SignalTranslatePipe` ensures translations work with zoneless CD; Arabic triggers RTL layout.
- **Lazy Loading** — Admin module routes are lazy-loaded for optimal bundle size.

### Routing

```
/admin/login            → Login page (public)
/admin/register         → Registration (public)
/admin/activation       → Email activation (public)
/admin/forget-password  → Password recovery (public)
/admin/change-password  → Password change (public)
/app/**                 → Protected area (AuthGuard)
  /app/admin/dashboard  → Dashboard
  /app/admin/client     → Client management
  /app/admin/demande    → Request management
  /app/admin/...        → Other business modules
```

---

## License

See [LICENSE.md](LICENSE.md).
