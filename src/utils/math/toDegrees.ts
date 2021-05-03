const ONE_RADIAN = Math.PI / 180;

const TAU = Math.PI * 2;

export const toDegrees = (radians: number): number => {
  const wrappedRadians = radians % TAU;

  return wrappedRadians / ONE_RADIAN;
};
