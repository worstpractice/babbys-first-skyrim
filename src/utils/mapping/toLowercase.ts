export const toLowerCase = <T extends string>(t: T): Lowercase<T> => {
  return t.toLowerCase() as Lowercase<T>;
};
