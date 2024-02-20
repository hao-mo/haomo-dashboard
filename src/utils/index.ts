import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 結合 Tailwind CSS 類別和自訂類別
 * @param args - 要結合的類別
 */
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args));
};

/**
 * 透過 fetch 來取得資料
 */
export async function fetcher<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, { ...init, cache: 'no-store' });

  return response.json() as T;
}

/**
 * 將字串的第一個字母轉為大寫
 * @param target - 要轉換的字串
 */
export const capitalize = (target: string) => {
  if (typeof target !== 'string') return '';
  return target.charAt(0).toUpperCase() + target.slice(1);
};

/**
 * 將字串超過指定長度時，截斷並加上省略號
 * @param target - 要截斷的字串
 * @param length - 要截斷的長度
 */
export const truncate = (target: string, length: number) => {
  if (!target) return '';
  if (target.length <= length) {
    return target;
  }
  return target.slice(0, length) + '...';
};

/**
 * 取得模糊化的圖片資料
 * @param url - 圖片的網址
 */
export const getBlurDataURL = async (url: string | null) => {
  if (!url) {
    return 'data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
  }
  try {
    const response = await fetch(`https://wsrv.nl/?url=${url}&w=50&h=50&blur=5`);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    return 'data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
  }
};

export const placeholderBlurhash =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAoJJREFUWEfFl4lu4zAMRO3cx/9/au6reMaOdkxTTl0grQFCRoqaT+SQotq2bV9N8rRt28xms87m83l553eZ/9vr9Wpkz+ezkT0ej+6dv1X81AFw7M4FBACPVn2c1Z3zLgDeJwHgeLFYdAARYioAEAKJEG2WAjl3gCwNYymQQ9b7/V4spmIAwO6Wy2VnAMikBWlDURBELf8CuN1uHQSrPwMAHK5WqwFELQ01AIXdAa7XawfAb3p6AOwK5+v1ugAoEq4FRSFLgavfQ49jAGQpAE5wjgGCeRrGdBArwHOPcwFcLpcGU1X0IsBuN5tNgYhaiFFwHTiAwq8I+O5xfj6fOz38K+X/fYAdb7fbAgFAjIJ6Aav3AYlQ6nfnDoDz0+lUxNiLALvf7XaDNGQ6GANQBKR85V27B4D3QQRw7hGIYlQKWGM79hSweyCUe1blXhEAogfABwHAXAcqSYkxCtHLUK3XBajSc4Dj8dilAeiSAgD2+30BAEKV4GKcAuDqB4TdYwBgPQByCgApUBoE4EJUGvxUjF3Q69/zLw3g/HA45ABKgdIQu+JPIyDnisCfAxAFNFM0EFNQ64gfS0EUoQP8ighrZSjn3oziZEQpauyKbfjbZchHUL/3AS/Dd30gAkxuRACgfO+EWQW8qwI1o+wseNuKcQiESjALvwNoMI0TcRzD4lFcPYwIM+JTF5x6HOs8yI7jeB5oKhpMRFH9UwaSCDB2Jmg4rc6E2TT0biIaG0rQhNqyhpHBcayTTSXH6vcDL7/sdqRK8LkwTsU499E8vRcAojHcZ4AxABdilgrp4lsXk8oVqgwh7+6H3phqd8J0Kk4vbx/+sZqCD/vNLya/5dT9fAH8g1WdNGgwbQAAAABJRU5ErkJggg==';

/**
 * 將日期轉換為字串
 * @param date - 要轉換的日期
 */
export const toDateString = (date: Date) => {
  return new Date(date).toLocaleDateString('zh-TW', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * 在左邊補字
 * @param input - 要補字的值
 * @param size - 要補到的長度
 * @param padString - 要補的字串
 * @returns 補字後的字串
 */
export function padLeft(input: string | number, size: number, padString: string = '0') {
  const stringifiedInput = String(input);
  if (stringifiedInput.length >= size) {
    return stringifiedInput;
  }

  return getPadStringRepeat(size, padString, stringifiedInput) + stringifiedInput;
}

/**
 * 在右邊補字
 * @param input - 要補字的值
 * @param size - 要補到的長度
 * @param padString - 要補的字串
 * @returns 補字後的字串
 */
export function padRight(input: string | number, size: number, padString: string = '0') {
  const stringifiedInput = String(input);
  if (stringifiedInput.length >= size) {
    return stringifiedInput;
  }

  return stringifiedInput + getPadStringRepeat(size, padString, stringifiedInput);
}

function getPadStringRepeat(size: number, padString: string, stringifiedInput: string) {
  const differ = size - stringifiedInput.length;
  return padString.repeat(Math.max(differ, 0));
}

/**
 * 請等待指定的毫秒數
 * @param milliseconds 要等待的毫秒數
 * @returns 一個 Promise，當指定的毫秒數過後，它就會被解決
 */
export const wait = async (milliseconds: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
};
