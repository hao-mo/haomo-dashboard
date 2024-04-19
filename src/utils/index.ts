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
 * Fetches data from a specified URL and returns the parsed JSON response.
 *
 * @param input - The URL or Request object from which to fetch the data.
 * @param init - Optional additional parameters to customize the fetch request.
 * @returns A Promise that resolves to the parsed JSON response.
 * @template T - The type of the data to be returned.
 */
export async function fetcher<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, { cache: 'no-store', ...init });

  return response.json() as T;
}

/**
 * Creates a URL search params string from a given object.
 * @param searchParams - The object containing the search parameters.
 * @returns The URL search params string.
 */
export function createURLSearchParams(searchParams: Record<string, any>): string {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      params.append(key, String(value));
    }
  });
  return params.toString();
}

/**
 * Capitalizes the first letter of a string.
 * @param target - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalize = (target: string) => {
  return target.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Truncates a string to a specified length and appends ellipsis if necessary.
 * @param target - The string to truncate.
 * @param length - The maximum length of the truncated string.
 * @returns The truncated string.
 */
export const truncate = (target: string, length: number) => {
  if (!target) return '';
  if (target.length <= length) {
    return target;
  }
  return target.slice(0, length) + '...';
};

/**
 * Retrieves the blurred data URL of an image from a given URL.
 * If the URL is null, it returns a default blurred data URL.
 * If an error occurs during the fetch, it also returns a default blurred data URL.
 * @param url - The URL of the image.
 * @returns The blurred data URL of the image.
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
 * Converts a Date object to a formatted date string.
 * @param date - The Date object to be converted.
 * @returns A formatted date string in the format "MMM dd, yyyy".
 */
export const toDateString = (date: Date) => {
  return new Date(date).toLocaleDateString('zh-TW', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Pads the input string or number with a specified padString to a specified size.
 * @param input - The input string or number to be padded.
 * @param size - The desired size of the padded string.
 * @param padString - The string used for padding. Defaults to '0'.
 * @param direction - The direction of the padding. Can be 'start' or 'end'.
 * @returns The padded string.
 */
export function pad(
  input: string | number,
  size: number,
  padString: string = '0',
  direction: 'start' | 'end' = 'start'
) {
  const stringifiedInput = String(input);
  const differ = Math.max(size - stringifiedInput.length, 0);
  const padding = padString.repeat(differ);

  return direction === 'start' ? padding + stringifiedInput : stringifiedInput + padding;
}

/**
 * Pauses the execution for the specified number of milliseconds.
 * @param milliseconds - The number of milliseconds to wait.
 * @returns A Promise that resolves after the specified number of milliseconds.
 */
export const wait = async (milliseconds: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 * Waits for the next animation frame.
 * @returns A promise that resolves when the next animation frame is available.
 */
export const nextFrame = async (): Promise<void> => {
  await new Promise((resolve) => requestAnimationFrame(resolve));
};

/**
 * Converts a string to a number.
 * @param target - The string to convert.
 * @returns The converted number.
 */
export const toNumber = (target: string) => {
  return Number(target.replace(/[^0-9.-]+/g, ''));
};
