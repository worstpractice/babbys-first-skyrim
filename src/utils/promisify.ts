export const promisify = <T>(fnExpectingCb: (cb: (value: T) => void) => void) => {
  const innerPromisify = async () => {
    return new Promise((resolve, reject) => {
      try {
        fnExpectingCb(resolve);
      } catch (error: unknown) {
        reject(error);
      }
    });
  };

  return innerPromisify as () => Promise<T>;
};
