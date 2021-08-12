/* eslint-disable @typescript-eslint/method-signature-style */
export {};

declare global {
  export interface ObjectConstructor {
    keys<T extends object>(t: T): readonly (keyof T)[];
  }
}
