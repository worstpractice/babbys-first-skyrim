import type { AnimationName } from 'src/game/typings/AnimationName';
import type { AnimationAction, AnimationClip } from 'three';

export type ActionClips = {
  readonly [key in AnimationName]: {
    readonly action: AnimationAction;
    readonly clip: AnimationClip;
  };
};
