import type { AnimationAction, AnimationClip } from "three";
import type { AnimationName } from "./AnimationName";

export type Animations = {
  readonly [key in AnimationName]: {
    readonly action: AnimationAction;
    readonly clip: AnimationClip;
  };
};
