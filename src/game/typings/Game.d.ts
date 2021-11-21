import type { Player } from 'src/game/typings/Player';
import type { AnimationMixer, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export type Game = {
  readonly camera: PerspectiveCamera;
  readonly mixers: readonly AnimationMixer[];
  readonly player: Player;
  readonly renderer: WebGLRenderer;
  readonly scene: Scene;
};
