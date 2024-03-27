declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test' | 'local';
    readonly NEXT_PUBLIC_SITE_URL: string;
    readonly NEXT_PUBLIC_MEASUREMENT_ID: string;
    readonly NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: string;
    readonly SENTRY_DSN: string;
    readonly SENTRY_AUTH_TOKEN: string;
    readonly ACCESS_TOKEN_KEY: string;
    readonly REFRESH_TOKEN_KEY: string;
    readonly DATABASE_URL: string;
    readonly NEXT_PUBLIC_USER_EMAIL: string;
    readonly NEXT_PUBLIC_USER_PASSWORD: string;
    readonly NEXT_PUBLIC_SUPABASE_URL: string;
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    readonly NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY: string;
  }
}
