/* eslint-disable @typescript-eslint/method-signature-style */
export {};

declare global {
  export interface ObjectConstructor {
    fromEntries<K extends PropertyKey, V>(entries: readonly (readonly [K, V])[]): { readonly [key in K]: V };
  }
}
