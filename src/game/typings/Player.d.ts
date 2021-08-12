import type { AnimationMixer, Group } from "three";
import type { ObSet } from "../abstract-data-types/ObSet";
import type { AnimationName } from "./AnimationName";
import type { Animations } from "./Animations";
import type { Effect } from "./Effect";
import type { Physics } from "./Physics";

export type Player = {
  readonly activeEffects: ObSet<Effect>;
  readonly animations: Animations;
  readonly activeAnimations: ObSet<AnimationName>;
  readonly mixer: AnimationMixer;
  readonly model: Group;
  readonly physics: Physics;
};
