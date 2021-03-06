import type { Mutable } from 'src/game/typings/Mutable';
import { CubeTexture, CubeTextureLoader, LoadingManager, Scene, sRGBEncoding } from 'three';

type Props = {
  readonly loadingManager: LoadingManager;
};

export const createScene = ({ loadingManager }: Props) => {
  const scene = new Scene();

  const skyboxTexturePaths = [
    './assets/textures/skybox/posx.jpg',
    './assets/textures/skybox/negx.jpg',
    './assets/textures/skybox/posy.jpg',
    './assets/textures/skybox/negy.jpg',
    './assets/textures/skybox/posz.jpg',
    './assets/textures/skybox/negz.jpg',
  ] as const;

  const loader = new CubeTextureLoader(loadingManager);

  const skybox: CubeTexture = loader.load(skyboxTexturePaths as Mutable<typeof skyboxTexturePaths>);

  skybox.encoding = sRGBEncoding;

  scene.background = skybox;

  return scene;
};
