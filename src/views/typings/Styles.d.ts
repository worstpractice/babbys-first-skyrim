import type { CSSProperties } from 'react';

export type Styles<T extends { readonly [key in string]-?: CSSProperties }> = {
  readonly [key in keyof T]: CSSProperties;
};
