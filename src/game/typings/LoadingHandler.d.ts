import type { Action } from 'src/game/typings/Action';
import type { AnimationClip } from 'three';

export type LoadingHandler = (this: void) => Promise<readonly [Action, AnimationClip]>;
