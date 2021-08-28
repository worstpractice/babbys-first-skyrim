import type { AnimationMixer } from 'three';

export const tickMixers = (deltaInSeconds: number, mixers: readonly AnimationMixer[]): void => {
  for (const mixer of mixers) {
    mixer.update(deltaInSeconds);
  }
};
