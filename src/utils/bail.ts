export const bail = <T extends Error>(err: T): never => {
  throw err;
};
