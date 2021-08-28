import cannonDebugger from 'cannon-es-debugger';
import { createActions } from 'src/game/cascade/actions/createActions';
import { createEffects } from 'src/game/cascade/effects/createEffects';
import { mapAnimationNamesToAnimations } from 'src/game/cascade/mapAnimationNamestoAnimations';
import { mapEffectsToAnimationNames } from 'src/game/cascade/mapEffectsToAnimationNames';
import { mapInputToKeys } from 'src/game/cascade/mapInputToKeys';
import { mapKeysToEffects } from 'src/game/cascade/mapKeysToEffects';
import { createCamera } from 'src/game/engine/createCamera';
import { createGameLoop } from 'src/game/engine/createGameLoop';
import { createLoadingManager } from 'src/game/engine/createLoadingManager';
import { createRenderer } from 'src/game/engine/createRenderer';
import { createScene } from 'src/game/engine/createScene';
import { createWorld } from 'src/game/engine/createWorld';
import { createInput } from 'src/game/input/createInput';
import { createAmbientLight } from 'src/game/lights/createAmbientLight';
import { createDirectionalLight } from 'src/game/lights/createDirectionalLight';
import { registerEventListeners } from 'src/game/listeners/registerEventListeners';
import { populate } from 'src/game/population/populate';
import { createGroundPlane } from 'src/game/things/createGroundPlane';
import { createPlayer } from 'src/game/things/createPlayer';
import { createSphere } from 'src/game/things/createSphere';
import type { App } from 'src/game/typings/App';
import type { AnimationMixer } from 'three';

export const main = async (): Promise<App> => {
  const animationMixers: AnimationMixer[] = [];

  const { physicsMaterial, world } = createWorld();

  const camera = createCamera();

  const input = createInput();

  const renderer = createRenderer();

  const loadingManager = createLoadingManager();

  const scene = createScene({ loadingManager });

  const player = await createPlayer({ animationMixers, loadingManager });

  const actions = createActions(player);

  const effects = createEffects(input, player);

  player.activeEffects.on('add', 'turning', console.log);
  player.activeEffects.on('delete', 'turning', console.log);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Essential Side Effects 🤦‍♂️ *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  loadingManager.onLoad = createGameLoop({ animationMixers, camera, input, player, renderer, scene, world });

  populate({
    constructors: {
      lights: [
        //
        createAmbientLight,
        createDirectionalLight,
      ],
      things: [
        //
        () => {
          return player;
        },
        createGroundPlane,
        createSphere,
      ],
    },
    physicsMaterial,
    scene,
    world,
  });

  mapInputToKeys(input);

  mapKeysToEffects({ actions, effects, input, player });

  mapEffectsToAnimationNames({ actions, input, player });

  mapAnimationNamesToAnimations(player);

  registerEventListeners({ camera, input, renderer });

  actions.startIdling();

  cannonDebugger(scene, world.bodies);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return {
    animationMixers,
    camera,
    renderer,
    scene,
  } as const;
};
