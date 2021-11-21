export const unreachable = (nope: never): never => {
  throw new RangeError(`unreachable ${nope}`);
};
