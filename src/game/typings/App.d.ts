import type { AnimationMixer, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export type App = {
  readonly camera: PerspectiveCamera;
  readonly mixers: AnimationMixer[];
  readonly renderer: WebGLRenderer;
  readonly scene: Scene;
};
