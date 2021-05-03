export const calculateFrameRateIndependentLerpCoefficient = (deltaInSeconds: number): number => {
  return 1.0 - Math.pow(0.001, deltaInSeconds);
};
