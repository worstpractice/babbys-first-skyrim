import { createRenderLoop } from 'src/game/render-loop/createRenderLoop';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';
import type { AnimationMixer, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { LoadingManager } from 'three';

type Props = {
  readonly animationMixers: readonly AnimationMixer[];
  readonly camera: PerspectiveCamera;
  readonly input: Input;
  readonly player: Player;
  readonly renderer: WebGLRenderer;
  readonly scene: Scene;
};

export const createLoadingManager = (props: Props) => {
  const loadingManager = new LoadingManager(console.log, console.debug, console.error);

  loadingManager.onLoad = createRenderLoop(props);

  return loadingManager;
};
