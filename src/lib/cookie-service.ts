// src/services/CookieService.ts

export const CookieService = {
  /**
   * Sets a cookie in the browser.
   * @param name The name of the cookie.
   * @param value The value of the cookie.
   * @param days The number of days until the cookie expires.
   */
  set: (name: string, value: string, days?: number) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  },

  /**
   * Gets a cookie by name.
   * @param name The name of the cookie to retrieve.
   * @returns The value of the cookie or null if not found.
   */
  get: (name: string) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  },

  /**
   * Deletes a cookie by name.
   * @param name The name of the cookie to delete.
   */
  delete: (name: string) => {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  },
};
