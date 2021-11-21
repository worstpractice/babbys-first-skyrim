import type { Action } from 'src/game/typings/Action';
import type { FbxFileName } from 'src/game/typings/FbxFileName';

export const ANIMATIONS: readonly (readonly [FbxFileName, Action])[] = [
  //
  ['slash.fbx', 'attacking'],
  ['idle.fbx', 'idling'],
  ['jump.fbx', 'jumping'],
  ['run.fbx', 'running'],
  ['walk.fbx', 'walking'],
] as const;
