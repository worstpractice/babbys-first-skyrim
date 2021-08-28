export const calculateFrameRateIndependentLerpCoefficient = (deltaInSeconds: number): number => {
  return 1 - Math.pow(0.001, deltaInSeconds);
};
