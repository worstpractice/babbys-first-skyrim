export const panic = <T extends Error>(error: T) => {
  throw error;
};
