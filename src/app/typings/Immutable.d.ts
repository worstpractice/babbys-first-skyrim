export type Immutable<T> = {
  readonly [key in keyof T]: T[key];
};
