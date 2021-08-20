import type { AnimationMixerEvent } from 'src/game/typings/AnimationMixerEvent';

export type Actions = {
  readonly quickenToRun: (this: void) => void;
  readonly slowToWalk: (this: void) => void;
  readonly startAttacking: (this: void) => void;
  readonly startIdling: (this: void) => void;
  readonly startJumping: (this: void) => void;
  readonly startRunning: (this: void) => void;
  readonly startWalking: (this: void) => void;
  readonly stopAttacking: (this: void) => void;
  readonly stopIdling: (this: void) => void;
  readonly stopJumping: (this: void) => void;
  readonly stopJumpingAndCleanUp: ({ action }: AnimationMixerEvent) => void;
  readonly stopRunning: (this: void) => void;
  readonly stopWalking: (this: void) => void;
};
