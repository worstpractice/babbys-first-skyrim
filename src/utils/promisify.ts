export const promisify = <T>(fnExpectingCb: (cb: (this: void, value: T) => void) => void) => {
  const innerPromisify = async () => {
    return new Promise((resolve, reject) => {
      try {
        fnExpectingCb(resolve);
      } catch (error: unknown) {
        reject(error);
      }
    });
  };

  return innerPromisify as (this: void) => Promise<T>;
};
