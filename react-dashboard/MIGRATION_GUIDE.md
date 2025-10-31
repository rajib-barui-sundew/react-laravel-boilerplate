# Project Restructuring Migration Guide

## Completed Steps

### ✅ Phase 1: Services Layer Created
- Created `src/services/http.ts` (replaces `src/api/axios.ts`)
- Created `src/services/auth.service.ts` (replaces `src/api/auth.ts`)
- Created `src/services/dashboard.service.ts` (replaces `src/api/dashboard.ts`)
- Created `src/services/apiConfig.ts`

### ✅ Phase 2: Schemas Layer Created
- Created `src/lib/schemas/auth.schema.ts` (validation schemas)
- Created `src/lib/utils/utils.ts` (utility functions)

### ✅ Phase 3: Updated Store
- Updated `src/store/authStore.ts` to use new services

### ✅ Phase 4: Updated Components
- Updated `src/components/auth/SignInForm.tsx` to use new schemas
- Updated `src/components/ecommerce/EcommerceMetrics.tsx` to use new services

## Remaining Manual Steps

### Step 1: Rename ecommerce folder to dashboard
```bash
cd src/components
mv ecommerce dashboard
```

### Step 2: Delete old api folder
```bash
cd src
rm -rf api
```

### Step 3: Create app folder structure (optional - for future)
```bash
mkdir -p src/app/{auth,dashboard}
```

### Step 4: Update remaining component imports

Search and replace across all files:
- `from '../../api/dashboard'` → `from '../../services/dashboard.service'`
- `from '../api/dashboard'` → `from '../services/dashboard.service'`
- `from '../../api/auth'` → `from '../../services/auth.service'`
- `getDashboardData` → `dashboardService.getDashboardData`

### Step 5: Test the build
```bash
pnpm build
```

## New Structure Overview

```
src/
├── services/           # API services (NEW)
│   ├── http.ts
│   ├── auth.service.ts
│   ├── dashboard.service.ts
│   └── apiConfig.ts
├── lib/               # Utilities & schemas (NEW)
│   ├── schemas/
│   │   └── auth.schema.ts
│   └── utils/
│       └── utils.ts
├── components/
│   ├── auth/
│   ├── dashboard/     # Renamed from ecommerce
│   ├── common/
│   ├── form/
│   ├── header/
│   ├── tables/
│   └── ui/
├── store/
├── context/
├── hooks/
├── layout/
├── types/
├── icons/
├── pages/
└── styles/
```

## Benefits

1. **Clear separation** - Services layer separated from components
2. **Better organization** - Schemas in lib folder
3. **Scalability** - Easy to add new services
4. **Maintainability** - Consistent structure across features
5. **Type safety** - Centralized schemas and types

## Next Steps (Future Enhancement)

1. Move pages to app folder structure
2. Create feature-based modules
3. Add more utility functions
4. Implement proper error handling
5. Add API response interceptors
