import type { AnimationAction, AnimationClip, AnimationMixer, Group } from "three";
import { ObSet } from "../abstract-data-types/ObSet";
import type { AnimationName } from "src/typings/AnimationName";
import type { Animations } from "src/typings/Animations";
import type { Effect } from "src/typings/Effect";
import type { Player } from "src/typings/Player";
import { vec3 } from "src/game/utils/vec3";

////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Dynamic Dependencies (Initialized At Runtime) *
////////////////////////////////////////////////////////////////////////////////////////////////////////

/** NOTE: gets initialized at animation load time. */
const animations: Animations = {
  attacking: {
    action: undefined as any as AnimationAction, // Every action has one clip
    clip: undefined as any as AnimationClip, // Every clip has one action
  },
  idling: {
    action: undefined as any as AnimationAction,
    clip: undefined as any as AnimationClip,
  },
  jumping: {
    action: undefined as any as AnimationAction,
    clip: undefined as any as AnimationClip,
  },
  running: {
    action: undefined as any as AnimationAction,
    clip: undefined as any as AnimationClip,
  },
  walking: {
    action: undefined as any as AnimationAction,
    clip: undefined as any as AnimationClip,
  },
} as const;

////////////////////////////////////////////////////////////////////////////////////////////////////////

/** NOTE: gets initialized at animation load time. */
const mixer = undefined as any as AnimationMixer; // Every mixer has one model

////////////////////////////////////////////////////////////////////////////////////////////////////////

/** NOTE: gets initialized at model load time. */
const model = undefined as any as Group; // Every model has one mixer

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const player: Player = {
  activeAnimations: new ObSet<AnimationName>(),
  activeEffects: new ObSet<Effect>(),
  animations,
  mixer,
  model,
  physics: {
    acceleration: vec3(0, 0.25, 50.0),
    decceleration: vec3(0, -0.0001, -5.0),
    velocity: vec3(),
  },
} as const;
