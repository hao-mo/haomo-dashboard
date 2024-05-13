import { z } from 'zod';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export enum LOCALE {
  ZH_TW = 'zh-TW',
  EN_US = 'en-US',
  JA_JP = 'ja-JP',
}

export const locales = {
  [LOCALE.ZH_TW]: {
    name: '繁體中文',
  },
  [LOCALE.EN_US]: {
    name: 'English',
  },
  [LOCALE.JA_JP]: {
    name: '日本語',
  },
};

export type Locale = keyof typeof locales;

type LocaleState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const useLocaleStore = create<LocaleState>()(
  devtools(
    persist(
      (set) => ({
        locale: LOCALE.ZH_TW,
        setLocale: (locale) => set({ locale }),
      }),
      {
        name: 'locale-store',
      }
    ),
    {
      name: 'locale-store',
      enabled: false,
    }
  )
);

export const localeSchema = z
  .object({
    [LOCALE.ZH_TW]: z.string().optional(),
    [LOCALE.EN_US]: z.string().optional(),
    [LOCALE.JA_JP]: z.string().optional(),
  })
  .superRefine((obj, ctx) => {
    const defaultLocale = useLocaleStore.getState().locale;
    const defaultLocaleString = obj[defaultLocale];
    if (!defaultLocaleString) {
      ctx.addIssue({
        path: [defaultLocale],
        code: 'custom',
        message: '預設語言必須有值',
      });
    }
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
  [LOCALE.ZH_TW]: '',
  [LOCALE.EN_US]: '',
  [LOCALE.JA_JP]: '',
};

export type LocaleString = z.infer<typeof localeSchema>;
