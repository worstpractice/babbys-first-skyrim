export type Effects = {
  readonly startLevitating: () => void;
  readonly startMoving: () => void;
  readonly startTurning: () => void;
  readonly startUsing: () => void;
  readonly stopLevitating: () => void;
  readonly stopMoving: () => void;
  readonly stopTurning: () => void;
  readonly stopUsing: () => void;
};
