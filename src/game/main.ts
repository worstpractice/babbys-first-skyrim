import { loadPlayerCharacter } from 'src/game/asset-loading/loadPlayerCharacter';
import { createActions } from 'src/game/cascade/actions/createActions';
import { createEffects } from 'src/game/cascade/effects/createEffects';
import { mapAnimationNamesToAnimations } from 'src/game/cascade/mapAnimationNamestoAnimations';
import { mapEffectsToAnimationNames } from 'src/game/cascade/mapEffectsToAnimationNames';
import { mapInputToKeys } from 'src/game/cascade/mapInputToKeys';
import { mapKeysToEffects } from 'src/game/cascade/mapKeysToEffects';
import { createCamera } from 'src/game/engine/createCamera';
import { createRenderer } from 'src/game/engine/createRenderer';
import { createScene } from 'src/game/engine/createScene';
import { createInput } from 'src/game/input/createInput';
import { registerEventListeners } from 'src/game/listeners/registerEventListeners';
import { createPlayer } from 'src/game/player/player';
import type { App } from 'src/game/typings/App';
import { populateWorld } from 'src/game/world/populateWorld';
import type { AnimationMixer } from 'three';

export const main = async (): Promise<App> => {
  const animationMixers: AnimationMixer[] = [];

  const camera = createCamera();

  const input = createInput();

  const player = createPlayer();

  const renderer = createRenderer();

  const actions = createActions(player);

  const effects = createEffects(input, player);

  const { loadingManager, scene } = createScene({ animationMixers, camera, input, player, renderer });

  ///////////////////////////////////////////////////////////
  // * Essential Side Effects 🤦‍♂️ *
  ///////////////////////////////////////////////////////////

  void loadPlayerCharacter({ actions, animationMixers, loadingManager, player, scene });

  populateWorld(scene);

  mapInputToKeys(input);

  mapKeysToEffects({ actions, effects, input, player });

  mapEffectsToAnimationNames({ actions, input, player });

  mapAnimationNamesToAnimations(player);

  registerEventListeners({ camera, input, renderer });

  ///////////////////////////////////////////////////////////

  return {
    animationMixers,
    camera,
    renderer,
    scene,
  } as const;
};
