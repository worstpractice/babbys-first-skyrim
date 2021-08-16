import type { AnimationMixerEvent } from 'src/game/typings/AnimationMixerEvent';

export type Actions = {
  readonly quickenToRun: () => void;
  readonly slowToWalk: () => void;
  readonly startAttacking: () => void;
  readonly startIdling: () => void;
  readonly startJumping: () => void;
  readonly startRunning: () => void;
  readonly startWalking: () => void;
  readonly stopAttacking: () => void;
  readonly stopIdling: () => void;
  readonly stopJumping: () => void;
  readonly stopJumpingAndCleanUp: ({ action }: AnimationMixerEvent) => void;
  readonly stopRunning: () => void;
  readonly stopWalking: () => void;
};
