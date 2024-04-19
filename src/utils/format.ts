import {
  format,
  formatDistance as formatAsDistance,
  formatRelative as formatAsRelativeDate,
  intlFormat,
} from 'date-fns';
import { zhTW } from 'date-fns/locale/zh-TW';

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
