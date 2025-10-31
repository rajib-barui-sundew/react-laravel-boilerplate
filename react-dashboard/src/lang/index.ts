type Replacements = Record<string, string | number>;

import validation from "./en/validation";
import response from "./en/response";

const messages = {
  validation,
  response
};

export function t(key: string, replacements: Replacements = {}): string {
  const [group, item] = key.split(".");
  const groupMessages = (messages as any)[group] || {};
  let message: string = groupMessages[item] || key;

  Object.entries(replacements).forEach(([placeholder, value]) => {
    message = message.replace(new RegExp(`:${placeholder}`, "g"), String(value));
  });

  return message;
}
