import { z } from 'zod';

export const locales = {
  'en-US': {
    name: 'English',
  },
  'zh-TW': {
    name: '繁體中文',
  },
  'ja-JP': {
    name: '日本語',
  },
};

export type Locale = keyof typeof locales;

export const defaultLocale = 'zh-TW';

export type LocaleString = {
  'zh-TW': string;
  'en-US'?: string;
  'ja-JP'?: string;
};

export const localeString = z.object({
  'zh-TW': z.string().min(1),
  'en-US': z.string(),
  'ja-JP': z.string(),
});

export const defaultLocaleString = {
  'zh-TW': '',
};
