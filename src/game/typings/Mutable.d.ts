export type Mutable<T> = {
  -readonly [key in keyof T]: key extends never ? T : Mutable<T[key]>;
};
