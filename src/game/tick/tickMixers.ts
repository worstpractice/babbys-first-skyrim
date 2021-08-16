import type { AnimationMixer } from 'three';

export const tickMixers = (deltaInSeconds: number, animationMixers: readonly AnimationMixer[]): void => {
  for (const mixer of animationMixers) {
    mixer.update(deltaInSeconds);
  }
};
