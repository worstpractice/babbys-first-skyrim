import { Material } from 'cannon-es';
import cannonDebugger from 'cannon-es-debugger';
import { createActions } from 'src/game/cascade/actions/createActions';
import { createEffects } from 'src/game/cascade/effects/createEffects';
import { mapAnimationNamesToAnimations } from 'src/game/cascade/mapAnimationNamesToAnimations';
import { mapEffectsToAnimationNames } from 'src/game/cascade/mapEffectsToAnimationNames';
import { mapInputToKeys } from 'src/game/cascade/mapInputToKeys';
import { mapKeysToEffects } from 'src/game/cascade/mapKeysToEffects';
import { createCamera } from 'src/game/engine/createCamera';
import { createGameLoop } from 'src/game/engine/createGameLoop';
import { createLoadingManager } from 'src/game/engine/createLoadingManager';
import { createRenderer } from 'src/game/engine/createRenderer';
import { createScene } from 'src/game/engine/createScene';
import { createWorld } from 'src/game/engine/createWorld';
import { createRuggedTerrain } from 'src/game/ground/createRuggedTerrain';
import { createInput } from 'src/game/input/createInput';
import { createLevel } from 'src/game/level/createLevel';
import { createAmbientLight } from 'src/game/lights/createAmbientLight';
import { createDirectionalLight } from 'src/game/lights/createDirectionalLight';
import { registerEventListeners } from 'src/game/listeners/registerEventListeners';
import { createPlayer } from 'src/game/things/createPlayer';
import { createSphere } from 'src/game/things/createSphere';
import { createTank } from 'src/game/things/createTank';
import type { App } from 'src/game/typings/App';
import type { AnimationMixer } from 'three';

export const main = async (): Promise<App> => {
  const mixers: AnimationMixer[] = [];

  const world = createWorld();

  const camera = createCamera();

  const input = createInput();

  const renderer = createRenderer();

  const loadingManager = createLoadingManager();

  const scene = createScene({ loadingManager });

  const player = await createPlayer({ loadingManager, mixers });

  const actions = createActions(player);

  const effects = createEffects(input, player);

  const groundMaterial = new Material('ground');

  const level = createLevel({
    constructors: {
      lights: [
        //
        createAmbientLight,
        createDirectionalLight,
      ],
      things: [
        //
        () => {
          return createRuggedTerrain(groundMaterial);
        },
        () => {
          return player;
        },
        createSphere,
        createSphere,
        createSphere,
        createSphere,
        createSphere,
        createSphere,
        createSphere,
        createSphere,
        createSphere,
        createSphere,
      ],
    },
    scene,
    world,
  });

  const tank = createTank({ groundMaterial, world });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Essential Side Effects 🤦‍♂️ *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  loadingManager.onLoad = createGameLoop({ camera, input, level, mixers, player, renderer, scene, world });

  mapInputToKeys(input);

  mapKeysToEffects({ actions, effects, input, player });

  mapEffectsToAnimationNames({ actions, input, player });

  mapAnimationNamesToAnimations(player);

  registerEventListeners({ camera, input, renderer });

  actions.startIdling();

  cannonDebugger(scene, world.bodies);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return {
    camera,
    mixers,
    renderer,
    scene,
  } as const;
};
