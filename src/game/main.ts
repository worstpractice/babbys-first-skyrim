import { createActions } from 'src/game/cascade/actions/createActions';
import { createEffects } from 'src/game/cascade/effects/createEffects';
import { mapAnimationNamesToAnimations } from 'src/game/cascade/mapAnimationNamestoAnimations';
import { mapEffectsToAnimationNames } from 'src/game/cascade/mapEffectsToAnimationNames';
import { mapInputToKeys } from 'src/game/cascade/mapInputToKeys';
import { mapKeysToEffects } from 'src/game/cascade/mapKeysToEffects';
import { createCamera } from 'src/game/engine/createCamera';
import { createLoadingManager } from 'src/game/engine/createLoadingManager';
import { createRenderer } from 'src/game/engine/createRenderer';
import { createScene } from 'src/game/engine/createScene';
import { createInput } from 'src/game/input/createInput';
import { registerEventListeners } from 'src/game/listeners/registerEventListeners';
import { createPlayer } from 'src/game/player/createPlayer';
import { createRenderLoop } from 'src/game/render-loop/createRenderLoop';
import type { App } from 'src/game/typings/App';
import { createAmbientLight } from 'src/game/world/createAmbientLight';
import { createDirectionalLight } from 'src/game/world/createDirectionalLight';
import { createGroundPlane } from 'src/game/world/createGroundPlane';
import type { AnimationMixer } from 'three';

const SCENE_SETUP = [
  //
  createGroundPlane,
  createAmbientLight,
  createDirectionalLight,
] as const;

export const main = async (): Promise<App> => {
  const animationMixers: AnimationMixer[] = [];

  const camera = createCamera();

  const input = createInput();

  const renderer = createRenderer();

  const loadingManager = createLoadingManager();

  const scene = createScene({ loadingManager, setup: SCENE_SETUP });

  const player = await createPlayer({ animationMixers, loadingManager, scene });

  loadingManager.onLoad = createRenderLoop({ animationMixers, camera, input, player, renderer, scene });

  const actions = createActions(player);

  const effects = createEffects(input, player);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Essential Side Effects 🤦‍♂️ *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  mapInputToKeys(input);

  mapKeysToEffects({ actions, effects, input, player });

  mapEffectsToAnimationNames({ actions, input, player });

  mapAnimationNamesToAnimations(player);

  registerEventListeners({ camera, input, renderer });

  actions.startIdling();

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return {
    animationMixers,
    camera,
    renderer,
    scene,
  } as const;
};
