import type { AnimationName } from 'src/game/typings/AnimationName';
import type { FbxFileName } from 'src/game/typings/FbxFileName';

export const ANIMATIONS: readonly (readonly [FbxFileName, AnimationName])[] = [
  //
  ['slash.fbx', 'attacking'],
  ['idle.fbx', 'idling'],
  ['jump.fbx', 'jumping'],
  ['run.fbx', 'running'],
  ['walk.fbx', 'walking'],
] as const;
