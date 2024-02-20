import '@total-typescript/ts-reset';
import { StaticImageData } from 'next/image';

export {};
declare global {
  interface PropsWithChildren {
    children: React.ReactNode | React.ReactNode[];
  }

  interface WithClassName {
    className?: string;
  }

  export type Expect<T extends true> = T;
  export type ExpectTrue<T extends true> = T;
  export type ExpectFalse<T extends false> = T;
  export type IsTrue<T extends true> = T;
  export type IsFalse<T extends false> = T;

  export type Equal<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
  export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

  // https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
  export type IsAny<T> = 0 extends 1 & T ? true : false;
  export type NotAny<T> = true extends IsAny<T> ? false : true;

  export type Debug<T> = { [K in keyof T]: T[K] };
  export type MergeInsertions<T> = T extends object ? { [K in keyof T]: MergeInsertions<T[K]> } : T;

  export type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>;

  type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

  type Nullable<T> = T | null;

  type Expand<T> = {
    [K in keyof T]: T[K];
  } & Record<string, unknown>;

  type HandleChangeByKeyFunction<T> = <K extends keyof T>(key: K) => (value: T[K]) => void;

  interface ImageDataProps {
    alt: string;
    imageUrl: StaticImageData | string;
  }

  interface ImagesWithBlurUrl extends ImageDataProps {
    blurDataURL?: string;
  }

  type Sort = 'asc' | 'desc';
  type NextOrPrev = 'next' | 'prev';
  type LeftOrRight = 'left' | 'right';
  type Direction = 'up' | 'down' | 'left' | 'right';

  interface Position {
    x: number;
    y: number;
  }

  interface Pagination {
    page: number;
    pageSize: number;
    totalCount: number;
  }

  export interface IRoute {
    name: string;
    href: string;
    routes?: IRoute[];
  }
}
