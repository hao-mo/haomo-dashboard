export const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
export const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const httpRegex = /^(http|https):/;

export const completeUrlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
// Research: https://spin.atomicobject.com/zod-transform-custom/
