export const toPromises = async <T>(asyncFn: () => Promise<T>): Promise<T> => {
  return asyncFn();
};
