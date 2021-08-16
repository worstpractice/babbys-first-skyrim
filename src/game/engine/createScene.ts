import { createLoadingManager } from 'src/game/engine/createLoadingManager';
import type { Mutable } from 'src/game/typings/Mutable';
import type { CubeTexture, LoadingManager } from 'three';
import { CubeTextureLoader, Scene, sRGBEncoding } from 'three';

export const createScene = async (): Promise<{ readonly loadingManager: LoadingManager; readonly scene: Scene }> => {
  const scene = new Scene();

  const skyboxTexturePaths = [
    './assets/textures/skybox/posx.jpg',
    './assets/textures/skybox/negx.jpg',
    './assets/textures/skybox/posy.jpg',
    './assets/textures/skybox/negy.jpg',
    './assets/textures/skybox/posz.jpg',
    './assets/textures/skybox/negz.jpg',
  ] as const;

  const loadingManager = await createLoadingManager(scene);

  const loader = new CubeTextureLoader(loadingManager);

  const skybox: CubeTexture = loader.load(skyboxTexturePaths as Mutable<typeof skyboxTexturePaths>);

  skybox.encoding = sRGBEncoding;

  scene.background = skybox;

  return {
    loadingManager,
    scene,
  } as const;
};
