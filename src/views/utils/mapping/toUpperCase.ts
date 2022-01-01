export const toUpperCase = <T extends string>(t: T): Uppercase<T> => {
  return t.toUpperCase() as Uppercase<T>;
};
