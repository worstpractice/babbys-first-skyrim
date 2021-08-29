/* eslint-disable @typescript-eslint/method-signature-style */
export {};

declare global {
  export interface ArrayConstructor {
    isArray<T>(arg: any): arg is readonly T[];
  }
}
