import { loadPlayerCharacter } from 'src/game/asset-loading/loadPlayerCharacter';
import { createAnimationMixers } from 'src/game/engine/createAnimationMixers';
import { createCamera } from 'src/game/engine/createCamera';
import { createRenderer } from 'src/game/engine/createRenderer';
import { createScene } from 'src/game/engine/createScene';
import { createInput } from 'src/game/input/createInput';
import { registerEventListeners } from 'src/game/listeners/registerEventListeners';
import type { App } from 'src/game/typings/App';
import { createWorld } from 'src/game/world/createWorld';

export const main = async (): Promise<App> => {
  const camera = await createCamera();

  const renderer = await createRenderer();

  const input = await createInput();

  void registerEventListeners({ camera, input, renderer });

  const animationMixers = await createAnimationMixers();

  const { loadingManager, scene } = await createScene({ animationMixers, camera, input, renderer });

  await createWorld(scene);

  await loadPlayerCharacter({ animationMixers, loadingManager, scene });

  return {
    animationMixers,
    camera,
    renderer,
    scene,
  } as const;
};
