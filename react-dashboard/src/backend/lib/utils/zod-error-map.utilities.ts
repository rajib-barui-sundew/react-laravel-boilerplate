import { z } from 'zod';
import validationMessages from '../../../lang/en/validation';

const formatFieldName = (fieldName: string): string => {
  // Handle special cases
  const specialCases: Record<string, string> = {
    listUid: 'List UID',
    labUid: 'Lab UID',
    stateUid: 'State UID',
    zoneUid: 'Zone UID',
    subzoneUid: 'Subzone UID',
    labTypeUid: 'Lab Type UID',
    url: 'URL',
    email: 'Email',
    phoneNumber: 'Phone Number',
  };

  if (specialCases[fieldName]) {
    return specialCases[fieldName];
  }

  // Convert camelCase to Title Case
  let formatted = fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();

  if (/\bId\b$/i.test(formatted) || /_id$/i.test(fieldName)) {
    return 'Code';
  }

  // Handle common abbreviations that should be uppercase
  formatted = formatted.replace(/\bUid\b/g, 'UID');

  return formatted;
};

/**
 * Replace placeholders in validation message with actual values
 */
const replacePlaceholders = (
  message: string,
  replacements: Record<string, string | number>
): string => {
  let result = message;
  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(`:${key}`, String(value));
  });
  return result;
};

/**
 * Custom Zod error map that uses our validation messages
 * This provides consistent error messages across all Zod validations
 */
export const customZodErrorMap = ((issue: any, ctx: any) => {
  // Get field name from path
  const fieldName =
    issue.path && issue.path.length > 0 ? issue.path[issue.path.length - 1] : 'Field';
  const formattedFieldName = formatFieldName(String(fieldName));

  // Provide a fallback for defaultError
  const defaultError = ctx?.defaultError || 'Invalid value';

  switch (issue.code) {
    case 'invalid_type':
      // Handle missing required fields
      if (issue.received === 'undefined' || issue.received === undefined) {
        return {
          message: replacePlaceholders(validationMessages.required, {
            attribute: formattedFieldName,
          }),
        };
      }
      return {
        message: replacePlaceholders(validationMessages.invalid_type, {
          attribute: formattedFieldName,
          expected: issue.expected || 'valid type',
          received: issue.received || 'invalid type',
        }),
      };

    case 'too_small':
      // Check different properties for value type (Zod v4 uses 'origin')
      const smallType = issue.origin || issue.type || issue.valueType;
      if (smallType === 'string') {
        const minimum = issue.minimum || issue.min || 1;
        if (minimum === 1) {
          // If minimum is 1, it's essentially a required field
          return {
            message: replacePlaceholders(validationMessages.required, {
              attribute: formattedFieldName,
            }),
          };
        }
        return {
          message: replacePlaceholders(validationMessages.min, {
            attribute: formattedFieldName,
            min: String(minimum),
          }),
        };
      }
      if (smallType === 'number') {
        return {
          message: replacePlaceholders(validationMessages.too_small, {
            attribute: formattedFieldName,
          }),
        };
      }
      if (smallType === 'array') {
        return {
          message: replacePlaceholders(validationMessages.required, {
            attribute: formattedFieldName,
          }),
        };
      }
      return { message: defaultError };

    case 'too_big':
      // Zod v4 uses 'origin' to specify the value type
      const bigType = issue.origin || issue.type || issue.valueType;
      if (bigType === 'string') {
        const maximum = issue.maximum || issue.max;
        return {
          message: replacePlaceholders(validationMessages.max, {
            attribute: formattedFieldName,
            max: String(maximum),
          }),
        };
      }
      if (bigType === 'number') {
        return {
          message: replacePlaceholders(validationMessages.too_big, {
            attribute: formattedFieldName,
          }),
        };
      }
      return { message: defaultError };

    case 'invalid_format':
    case 'invalid_string':
      // In Zod v4, email and url validations use invalid_format
      if (issue.validation === 'email') {
        return {
          message: replacePlaceholders(validationMessages.email, {
            attribute: formattedFieldName,
          }),
        };
      }
      if (issue.validation === 'url') {
        return {
          message: replacePlaceholders(validationMessages.url, {
            attribute: formattedFieldName,
          }),
        };
      }
      return {
        message: replacePlaceholders(validationMessages.invalid_string, {
          attribute: formattedFieldName,
        }),
      };

    case 'invalid_value':
    case 'invalid_enum_value':
      // Handle enum validation - Zod v4 uses 'values' property
      const options = issue.values || issue.options || issue.expectedValues || issue.expected || [];
      return {
        message: replacePlaceholders(validationMessages.invalid_enum_value, {
          attribute: formattedFieldName,
          options: Array.isArray(options) ? options.join(', ') : 'valid values',
        }),
      };

    case 'custom':
      // Allow custom messages to pass through
      return { message: issue.message || defaultError };

    default:
      return { message: defaultError };
  }
}) as z.ZodErrorMap;

/**
 * Initialize the custom Zod error map
 * Call this function early in your application (e.g., in app.ts)
 */
export const initializeZodErrorMap = () => {
  z.setErrorMap(customZodErrorMap);
};
