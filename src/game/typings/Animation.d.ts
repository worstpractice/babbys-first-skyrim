import type { AnimationAction, AnimationClip } from 'three';

export type Animation = {
  readonly animationAction: AnimationAction;
  readonly animationClip: AnimationClip;
};
