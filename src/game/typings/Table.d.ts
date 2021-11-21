export type Table<T extends PropertyKey, U> = {
  readonly [key in T]: U;
};
