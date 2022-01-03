// prettier-ignore
export const thunk = <T extends (new (...args: readonly any[]) => any)>(Class: T, deps: readonly [...ConstructorParameters<T>]) => {
  const innerThunk = (): InstanceType<T> => {
    return new Class(...deps);
  };

  return innerThunk;
};
