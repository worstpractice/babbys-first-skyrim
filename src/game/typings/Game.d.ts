import type { Actor } from 'src/game/typings/Actor';
import type { Player } from 'src/game/typings/Player';
import type { AnimationMixer, Scene, WebGLRenderer } from 'three';

export type Game = {
  readonly actors: readonly Actor[];
  readonly mixers: readonly AnimationMixer[];
  readonly player: Player;
  readonly renderer: WebGLRenderer;
  readonly scene: Scene;
};
