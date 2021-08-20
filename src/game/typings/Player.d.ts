import type { ObSet } from 'obset';
import type { ActionClips } from 'src/game/typings/ActionClips';
import type { AnimationName } from 'src/game/typings/AnimationName';
import type { Effect } from 'src/game/typings/Effect';
import type { Physics } from 'src/game/typings/Physics';
import type { AnimationMixer, Group } from 'three';

export type Player = {
  readonly actionClips: ActionClips;
  readonly activeEffects: ObSet<Effect>;
  readonly activeAnimations: ObSet<AnimationName>;
  readonly mixer: AnimationMixer;
  readonly model: Group;
  readonly physics: Physics;
};
