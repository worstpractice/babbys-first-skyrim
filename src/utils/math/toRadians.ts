const ONE_RADIAN = Math.PI / 180;

export const toRadians = (degrees: number): number => {
  const wrappedDegrees = degrees % 360;

  return wrappedDegrees * ONE_RADIAN;
};
