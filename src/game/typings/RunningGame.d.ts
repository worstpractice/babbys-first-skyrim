import type { AnimationMixer, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export type RunningGame = {
  readonly camera: PerspectiveCamera;
  readonly mixers: readonly AnimationMixer[];
  readonly renderer: WebGLRenderer;
  readonly scene: Scene;
};
