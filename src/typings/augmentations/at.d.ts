export {};

declare global {
  export interface Array<T> {
    at: (this: this, index: number) => T | undefined;
  }

  export interface ReadOnlyArray<T> {
    at: (this: this, index: number) => T | undefined;
  }
}
