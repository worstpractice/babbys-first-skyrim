export const uuid = (): string => {
  // @ts-expect-error it does exist
  return window.crypto.randomUUID();
};
