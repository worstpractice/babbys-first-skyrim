import { createLoadingManager } from 'src/game/engine/createLoadingManager';
import type { Input } from 'src/game/typings/Input';
import type { Mutable } from 'src/game/typings/Mutable';
import type { AnimationMixer, CubeTexture, PerspectiveCamera, WebGLRenderer } from 'three';
import { CubeTextureLoader, Scene, sRGBEncoding } from 'three';

type Props = {
  readonly animationMixers: readonly AnimationMixer[];
  readonly camera: PerspectiveCamera;
  readonly input: Input;
  readonly renderer: WebGLRenderer;
};

export const createScene = async (props: Props) => {
  const scene = new Scene();

  const skyboxTexturePaths = [
    './assets/textures/skybox/posx.jpg',
    './assets/textures/skybox/negx.jpg',
    './assets/textures/skybox/posy.jpg',
    './assets/textures/skybox/negy.jpg',
    './assets/textures/skybox/posz.jpg',
    './assets/textures/skybox/negz.jpg',
  ] as const;

  const loadingManager = await createLoadingManager({ ...props, scene });

  const loader = new CubeTextureLoader(loadingManager);

  const skybox: CubeTexture = loader.load(skyboxTexturePaths as Mutable<typeof skyboxTexturePaths>);

  skybox.encoding = sRGBEncoding;

  scene.background = skybox;

  return {
    loadingManager,
    scene,
  } as const;
};
