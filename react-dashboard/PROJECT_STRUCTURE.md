# Project Structure Documentation

## Overview
This project is organized using industry-standard best practices to promote clear separation between the **Admin Panel** and **Frontend User App**. This makes onboarding, maintenance, and scaling far easier for teams and individual developers.

## Directory Structure
```
src/
├── admin/                  # All admin panel (dashboard) code
│   ├── components/         # Shared/admin-only UI components
│   ├── contexts/           # React context providers (auth, theme, sidebar, etc.)
│   ├── hooks/              # Custom admin React hooks
│   ├── layouts/            # Admin layouts (sidebars, wrappers, etc.)
│   ├── pages/              # All admin-side routes (auth, dashboard, users, etc.)
│   │   ├── auth/           # Admin authentication pages (sign in, etc.)
│   │   └── ...             # Dashboard, users, tables, charts, etc.
│   ├── services/           # API service modules (admin only)
│   ├── store/              # State managers/store (Zustand, Redux, etc.)
│   ├── types/              # Shared admin-facing TypeScript types
│   └── utils/              # Helper functions for admin-side only
│
├── frontend/               # All user-facing website/app code
│   ├── components/         # Shared UI components for frontend
│   ├── contexts/           # Contexts for frontend
│   ├── hooks/              # Custom hooks for users
│   ├── layouts/            # Website layouts (header, footer, etc.)
│   ├── pages/              # Route-level frontend components
│   ├── services/           # API utilities specific to frontend
│   ├── store/              # State management for frontend
│   ├── types/              # Types/interfaces for user side
│   └── utils/              # Frontend-side utility functions
│
├── icons/                  # Central SVG/icon assets for project-wide use
├── lang/                   # Localization/language files (shared)
├── index.css               # Global CSS
├── main.tsx                # React/TS application bootstrap
├── App.tsx                 # App entry/root layout and router
├── ...                     # Shared types, environment, config, etc.
```

---

## What Goes Where?

- **admin/**: Strictly for code used by the admin panel/dashboard.
- **frontend/**: Code for the user-facing side (e.g., homepage, user signup, landing pages, etc.).
- **icons/**: Place all SVGs or icon components here for sharing across both sides.
- **lang/**: Any translations or language-specific files for i18n.
- **index.css**: Styles that apply project-wide.

### Shared Code
If logic/components need to be shared (rare), use `src/shared/` and document usage thoroughly.

---

## Onboarding Tips
- **Routes and Pages**: Match each route to a file/subfolder under `pages/` in its respective directory.
- **Keep Concerns Separated**: Don’t cross-import from `admin/` to `frontend/` (or vice versa) unless using a clearly defined shared module.
- **Follow Naming Conventions**: Prefer `UserLogin.tsx`, `UserHome.tsx`, etc., for clarity.
- **New Features**: Place files in the corresponding domain (`admin/pages/Reports/ReportList.tsx`, `frontend/pages/Home.tsx`, etc.).
- **Services**: Keep API/services specific to their respective module, unless shared by both.

---

## Best Practices
- Use context/providers for app-wide state.
- Favor local state/hooks for isolated UI state.
- For larger shared utilities, consider documenting and placing in a top-level `shared/` folder.
- Group granular UI elements (buttons, badges, etc.) in `components/ui/` within each main folder.
- Update this document if you add/remove major folders or alter conventions.

---

## Example Usage
Adding a new dashboard widget? Place your file under `admin/components/dashboard/` and add the route/component entry in `admin/pages/Dashboard/`.

Adding a homepage hero banner for the user site? Place it under `frontend/components/banner/` and connect it in `frontend/pages/Home.tsx`.

---

**For questions or amendments, update this README!**
