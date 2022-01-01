// eslint-disable-next-line @typescript-eslint/promise-function-async
export const toPromises = <T>(asyncFn: (this: void) => Promise<T>): Promise<T> => {
  return asyncFn();
};
