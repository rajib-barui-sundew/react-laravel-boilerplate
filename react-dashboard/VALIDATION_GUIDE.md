# Validation Error Messages Guide

This project now uses a centralized validation system for consistent error messages across all forms.

## How It Works

The validation system consists of three main parts:

1. **Language Files** (`src/lang/`)
   - Contains validation messages in different languages
   - Currently supports English (`en/validation.ts`)
   - Messages use placeholders like `:attribute`, `:min`, `:max`

2. **Zod Error Map** (`src/lib/utils/zod-error-map.utilities.ts`)
   - Custom Zod error map that automatically applies validation messages
   - Handles field name formatting (camelCase → Title Case)
   - Supports all common Zod validation types

3. **Initialization** (`src/main.tsx`)
   - Error map is initialized at app startup
   - Applies to all Zod schemas automatically

## Usage

### Creating Form Schemas

Simply define your Zod schemas without custom error messages:

```typescript
import { z } from 'zod';

// ✅ Good - Uses automatic validation messages
export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().positive(),
});

// ❌ Avoid - Hardcoded messages
export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
});
```

### Automatic Error Messages

The system automatically generates user-friendly error messages:

- `email` field → "Email is required."
- `phoneNumber` field → "Phone Number must be a valid email address."
- `firstName` field → "First Name must be at least 2 characters."

### Custom Validation Messages

For custom validations, you can still provide specific messages:

```typescript
export const passwordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
```

### Using Translation Function

For non-validation messages (success, info, etc.), use the `t()` function:

```typescript
import { t } from '@/lib/utils';

// Usage
const successMessage = t('response.created', { attribute: 'User' });
// Output: "User created successfully."

const errorMessage = t('response.not_found', { attribute: 'Product' });
// Output: "Product not found."
```

## Available Validation Messages

From `src/lang/en/validation.ts`:

- `required` - ":attribute is required."
- `min` - ":attribute must be at least :min characters."
- `max` - ":attribute cannot exceed :max characters."
- `email` - ":attribute must be a valid email address."
- `url` - ":attribute must be a valid URL."
- `invalid_enum_value` - ":attribute must be one of: :options."
- And more...

## Adding New Validation Messages

1. Add the message to `src/lang/en/validation.ts`:
```typescript
export default {
  // ... existing messages
  phone: ":attribute must be a valid phone number.",
};
```

2. Update the error map in `zod-error-map.utilities.ts` if needed for special handling.

## Field Name Formatting

The system automatically formats field names:

- `firstName` → "First Name"
- `email` → "Email"
- `phoneNumber` → "Phone Number"
- `userUid` → "User UID"
- `userId` → "Code" (special case for ID fields)

## Benefits

✅ **Consistency** - All forms use the same error messages  
✅ **Maintainability** - Update messages in one place  
✅ **Internationalization** - Easy to add new languages  
✅ **Developer Experience** - Less boilerplate code  
✅ **Type Safety** - Full TypeScript support
