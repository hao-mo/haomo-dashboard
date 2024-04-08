import { z } from 'zod';

export const defaultLocale = {
  'zh-TW': {
    name: '繁體中文',
  },
};

export const optionalLocale = {
  'en-US': {
    name: 'English',
  },
  'ja-JP': {
    name: '日本語',
  },
};

export const locales = {
  ...defaultLocale,
  ...optionalLocale,
};

export type Locale = keyof typeof locales;

export type LocaleString = {
  'zh-TW': string;
  'en-US'?: string;
  'ja-JP'?: string;
};

export const localeSchema = z.object({
  'zh-TW': z.string().min(1, '繁體中文 是必填欄位'),
  'en-US': z.string().optional(),
  'ja-JP': z.string().optional(),
});
// .superRefine((obj, ctx) => {
//   // Ensure only known locale keys are used (add your locale keys here)
//   const allowedKeys = ['zh-TW', 'en-US', 'ja-JP'];
//   for (const key of Object.keys(obj)) {
//     if (!allowedKeys.includes(key)) {
//       ctx.addIssue({
//         path: [key],
//         code: 'custom',
//         message: `該語言 "${key}" 並不支援`,
//       });
//     }
//   }
// });

export const defaultLocaleString = {
  'zh-TW': '',
};
