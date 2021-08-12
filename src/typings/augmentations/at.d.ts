export {};

declare global {
  export interface Array<T> {
    readonly at: (this: this, index: number) => T | undefined;
  }

  export interface ReadOnlyArray<T> {
    readonly at: (this: this, index: number) => T | undefined;
  }
}
