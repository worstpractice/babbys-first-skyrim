import type { AnimationMixer, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export type App = {
  readonly animationMixers: AnimationMixer[];
  readonly camera: PerspectiveCamera;
  readonly renderer: WebGLRenderer;
  readonly scene: Scene;
};
