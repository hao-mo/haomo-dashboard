import type {
  ZodCustomIssue,
  ZodInvalidDateIssue,
  ZodInvalidStringIssue,
  ZodInvalidTypeIssue,
  ZodTooBigIssue,
  ZodTooSmallIssue,
} from 'zod';
import { z, ZodIssueCode, ZodParsedType } from 'zod';

type InvalidHandler<T> = (issue: T) => string;

const handleInvalidType: InvalidHandler<ZodInvalidTypeIssue> = (issue) => {
  if (issue.received === ZodParsedType.undefined) {
    return '必填';
  } else {
    return '格式錯誤';
  }
};

const handleInvalidDate: InvalidHandler<ZodInvalidDateIssue> = (issue) => {
  return '無效的日期';
};

const handleInvalidString: InvalidHandler<ZodInvalidStringIssue> = (issue) => {
  if (typeof issue.validation === 'object') {
    if ('startsWith' in issue.validation) {
      return `必須以 ${issue.validation.startsWith} 開頭`;
    } else if ('endsWith' in issue.validation) {
      return `必須以 ${issue.validation.endsWith} 結尾`;
    }
    return '';
  } else {
    return '格式錯誤';
  }
};

const handleTooSmall: InvalidHandler<ZodTooSmallIssue> = (issue) => {
  const minimum =
    issue.type === 'date' ? new Date(issue.minimum as number) : (issue.minimum as number);

  if (minimum === 1 && issue.type === 'string') {
    return '必填';
  }

  return `必須大於 ${minimum}`;
};

const handleTooBig: InvalidHandler<ZodTooBigIssue> = (issue) => {
  const maximum =
    issue.type === 'date' ? new Date(issue.maximum as number) : (issue.maximum as number);
  return `必須小於 ${maximum}`;
};

const handleCustom: InvalidHandler<ZodCustomIssue> = (issue) => {
  return issue.message ?? '格式錯誤';
};

export const useI18nZodErrors = () => {
  z.setErrorMap((issue) => {
    let message: string;

    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        message = handleInvalidType(issue);
        break;
      case ZodIssueCode.invalid_date:
        message = handleInvalidDate(issue);
        break;
      case ZodIssueCode.invalid_string:
        message = handleInvalidString(issue) ?? '';
        break;
      case ZodIssueCode.too_small:
        message = handleTooSmall(issue);
        break;
      case ZodIssueCode.too_big:
        message = handleTooBig(issue);
        break;
      case ZodIssueCode.custom:
        message = handleCustom(issue);
        break;
      default:
        message = '格式錯誤';
        break;
    }

    return { message };
  });
};
