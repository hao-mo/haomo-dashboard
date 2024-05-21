import {
  format,
  formatDistance as formatAsDistance,
  formatRelative as formatAsRelativeDate,
  intlFormat,
} from 'date-fns';
import { zhTW } from 'date-fns/locale';

import { useLocaleStore } from './../stores/locale-store';

import type { LocaleString } from '@/stores/locale-store';

export const formatDate = (date: Date | number, formatString = 'PPPP') => {
  return format(date, formatString, {
    locale: zhTW,
    weekStartsOn: 1,
    useAdditionalWeekYearTokens: true,
  });
};

const formatRelativeLocale = {
  lastWeek: "'上個' eeee p",
  yesterday: "'昨天' p",
  today: "'今天' p",
  tomorrow: "'明天' p",
  nextWeek: "'下個' eeee p",
  other: 'PPPP',
};

export const formatRelative = (date: number | Date, baseDate: number | Date = new Date()) => {
  return formatAsRelativeDate(date, baseDate, {
    locale: {
      ...zhTW,
      formatRelative: (token) => formatRelativeLocale[token],
    },
  });
};

export const formatTime = (date: Date | number) => {
  return intlFormat(
    date,
    {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    },
    { locale: 'zh-TW' }
  );
};

export const formatDistance = (date: Date | number, baseDate: Date | number = new Date()) => {
  return formatAsDistance(date, baseDate, { addSuffix: true, locale: zhTW });
};

/**
 * Formats a locale string based on the current locale.
 * @param localeString - The locale string object containing translations for different locales.
 * @returns An object with the default translation and all other translations.
 */
export const formatLocaleString = (localeString: LocaleString) => {
  const defaultLocale = useLocaleStore.getState().locale;
  const defaultText = localeString[defaultLocale];
  return {
    default: defaultText,
    ...localeString,
  };
};
