import { createRenderLoop } from 'src/game/loop/beginRenderLoop';
import type { Scene } from 'three';
import { LoadingManager } from 'three';

export const createLoadingManager = async (scene: Scene): Promise<LoadingManager> => {
  const loadingManager = new LoadingManager(console.log, console.debug, console.error);

  loadingManager.onLoad = createRenderLoop(scene);

  return loadingManager;
};
