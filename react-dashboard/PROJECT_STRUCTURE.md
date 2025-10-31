# Project Structure Documentation

## Overview

This project follows a feature-based architecture with clear separation of concerns, inspired by modern Next.js patterns adapted for React + Vite.

## Folder Structure

```
src/
├── services/                    # API Services Layer
│   ├── http.ts                 # Axios instance with interceptors
│   ├── auth.service.ts         # Authentication API calls
│   ├── dashboard.service.ts    # Dashboard API calls
│   └── apiConfig.ts            # API configuration
│
├── lib/                        # Shared Libraries
│   ├── schemas/                # Zod validation schemas
│   │   └── auth.schema.ts      # Auth form validation
│   └── utils/                  # Utility functions
│       └── utils.ts            # Common utilities (cn, formatDate, etc.)
│
├── components/                 # React Components
│   ├── auth/                   # Authentication components
│   │   ├── SignInForm.tsx
│   │   ├── SignUpForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── dashboard/              # Dashboard components (formerly ecommerce)
│   │   ├── EcommerceMetrics.tsx
│   │   ├── MonthlySalesChart.tsx
│   │   ├── StatisticsChart.tsx
│   │   ├── MonthlyTarget.tsx
│   │   ├── RecentOrders.tsx
│   │   └── DemographicCard.tsx
│   ├── common/                 # Shared components
│   │   ├── PageMeta.tsx
│   │   ├── PageBreadCrumb.tsx
│   │   └── ScrollToTop.tsx
│   ├── form/                   # Form components
│   │   ├── Label.tsx
│   │   ├── input/
│   │   ├── select/
│   │   └── textarea/
│   ├── header/                 # Header components
│   │   ├── AppHeader.tsx
│   │   ├── UserDropdown.tsx
│   │   └── ThemeToggle.tsx
│   ├── tables/                 # Table components
│   ├── charts/                 # Chart components
│   └── ui/                     # UI Library (shadcn-style)
│       ├── button/
│       ├── badge/
│       ├── avatar/
│       └── alert/
│
├── store/                      # Zustand State Management
│   └── authStore.ts            # Authentication state
│
├── context/                    # React Context
│   ├── ThemeContext.tsx        # Theme management
│   └── SidebarContext.tsx      # Sidebar state
│
├── hooks/                      # Custom React Hooks
│   └── useAuth.ts
│
├── layout/                     # Layout Components
│   ├── AppLayout.tsx           # Main app layout
│   ├── AppSidebar.tsx          # Sidebar navigation
│   └── AuthLayout.tsx          # Auth pages layout
│
├── pages/                      # Page Components
│   ├── AuthPages/
│   │   ├── SignIn.tsx
│   │   └── SignUp.tsx
│   ├── Dashboard/
│   │   ├── Home.tsx
│   │   └── Backup.tsx
│   ├── Calendar.tsx
│   ├── UserProfiles.tsx
│   └── Blank.tsx
│
├── types/                      # TypeScript Type Definitions
│   ├── auth.ts
│   ├── dashboard.ts
│   └── user.ts
│
├── icons/                      # SVG Icons
│
├── styles/                     # Global Styles
│   └── index.css
│
├── App.tsx                     # Main App Component
├── main.tsx                    # Entry Point
└── vite-env.d.ts              # Vite Environment Types
```

## Architecture Patterns

### 1. Services Layer (`src/services/`)

**Purpose**: Centralize all API calls and external service interactions.

**Pattern**:
```typescript
// services/auth.service.ts
export const authService = {
  login: async (email: string, password: string) => { ... },
  logout: async () => { ... },
};
```

**Benefits**:
- Single source of truth for API calls
- Easy to mock for testing
- Consistent error handling
- Type-safe API responses

### 2. Schemas (`src/lib/schemas/`)

**Purpose**: Centralize validation logic using Zod.

**Pattern**:
```typescript
// lib/schemas/auth.schema.ts
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
```

**Benefits**:
- Reusable validation across forms and API
- Type inference from schemas
- Runtime validation
- Clear validation rules

### 3. State Management (`src/store/`)

**Purpose**: Global state using Zustand with persistence.

**Pattern**:
```typescript
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (credentials) => { ... },
      logout: () => { ... },
    }),
    { name: 'auth-storage' }
  )
);
```

**Benefits**:
- Simple API
- Built-in persistence
- TypeScript support
- No boilerplate

### 4. Component Organization

**Feature-based**: Components grouped by feature (auth, dashboard, etc.)
**Shared**: Common components in `common/` and `ui/`
**Atomic**: Small, reusable components

## Naming Conventions

### Files
- Components: `PascalCase.tsx` (e.g., `SignInForm.tsx`)
- Services: `kebab-case.service.ts` (e.g., `auth.service.ts`)
- Schemas: `kebab-case.schema.ts` (e.g., `auth.schema.ts`)
- Types: `kebab-case.ts` (e.g., `auth.ts`)
- Utils: `kebab-case.ts` (e.g., `utils.ts`)

### Exports
- Named exports for services: `export const authService = { ... }`
- Default exports for components: `export default function SignInForm() { ... }`
- Named exports for types and schemas

## Import Patterns

### Absolute Imports (Recommended for Future)
```typescript
import { authService } from '@/services/auth.service';
import { loginSchema } from '@/lib/schemas/auth.schema';
import { Button } from '@/components/ui/button';
```

### Current Relative Imports
```typescript
import { authService } from '../../services/auth.service';
import { loginSchema } from '../../lib/schemas/auth.schema';
```

## Environment Variables

```env
# API Configuration
VITE_API_BASE_URL=/api
VITE_AUTH_API_BASE_URL=https://reqres.in/api
VITE_API_KEY=your-api-key
```

## Best Practices

### 1. Service Layer
- All API calls go through services
- Services return typed responses
- Handle errors in services or components
- Use consistent naming (e.g., `getX`, `createX`, `updateX`, `deleteX`)

### 2. Components
- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic to hooks
- Co-locate related files

### 3. State Management
- Use Zustand for global state
- Use React Query for server state
- Use local state for UI state
- Persist only necessary data

### 4. Types
- Define types close to usage
- Export types from service files
- Use Zod for runtime validation
- Leverage type inference

## Migration from Old Structure

See `MIGRATION_GUIDE.md` for detailed migration steps.

## Future Enhancements

1. **App Router Structure**: Move pages to `src/app/` with route-based organization
2. **Feature Modules**: Group related components, services, and types by feature
3. **Barrel Exports**: Add `index.ts` files for cleaner imports
4. **Path Aliases**: Configure `@/` imports in `tsconfig.json`
5. **Testing**: Add test files co-located with components
6. **Documentation**: Add JSDoc comments to services and complex components

## Contributing

When adding new features:
1. Create service in `src/services/`
2. Define schemas in `src/lib/schemas/`
3. Create components in appropriate feature folder
4. Update types in `src/types/`
5. Add to store if needed for global state
6. Update this documentation

## Questions?

Refer to the codebase examples or check the migration guide for patterns.
