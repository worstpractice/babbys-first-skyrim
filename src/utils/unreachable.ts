export const unreachable = (nope: never): never => {
  throw new ReferenceError(`unreachable ${nope}`);
};
