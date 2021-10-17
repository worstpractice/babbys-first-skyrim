export const asNested = <T>() => {
  const innerAsNested = <U extends T, V extends string>(obj: { readonly [key in V]: keyof U extends keyof T ? T & U : never }) => {
    return obj as {
      readonly [v in V]: {
        readonly [u in Extract<keyof T, keyof U>]: U[u];
      };
    };
  };

  return innerAsNested;
};
