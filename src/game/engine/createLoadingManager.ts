import { createRenderLoop } from 'src/game/render-loop/createRenderLoop';
import type { Input } from 'src/game/typings/Input';
import type { AnimationMixer, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { LoadingManager } from 'three';

type Props = {
  readonly animationMixers: readonly AnimationMixer[];
  readonly camera: PerspectiveCamera;
  readonly input: Input;
  readonly renderer: WebGLRenderer;
  readonly scene: Scene;
};

export const createLoadingManager = async (props: Props) => {
  const loadingManager = new LoadingManager(console.log, console.debug, console.error);

  loadingManager.onLoad = await createRenderLoop(props);

  return loadingManager;
};
