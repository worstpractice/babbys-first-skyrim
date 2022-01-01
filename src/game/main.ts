import { default as cannonDebugger } from 'cannon-es-debugger';
import { registerActionHandlers } from 'src/game/cascade/actions/registerActionHandlers';
import { registerEffectHandlers } from 'src/game/cascade/effects/registerEffectHandlers';
import { mapAnimationNamesToAnimations } from 'src/game/cascade/mapAnimationNamesToAnimations';
import { mapEffectsToAnimationNames } from 'src/game/cascade/mapEffectsToAnimationNames';
import { mapInputToKeys } from 'src/game/cascade/mapInputToKeys';
import { mapKeysToEffects } from 'src/game/cascade/mapKeysToEffects';
import { createCamera } from 'src/game/engine/createCamera';
import { createGameLoop } from 'src/game/engine/createGameLoop';
import { createLoadingManager } from 'src/game/engine/createLoadingManager';
import { createPlayer } from 'src/game/engine/createPlayer';
import { createRenderer } from 'src/game/engine/createRenderer';
import { createScene } from 'src/game/engine/createScene';
import { createWorld } from 'src/game/engine/createWorld';
import { createActor } from 'src/game/entities/createActor';
import { createSphere } from 'src/game/entities/createSphere';
import { createInfinitePlane } from 'src/game/ground/createInfinitePlane';
import { createInput } from 'src/game/input/createInput';
import { createLevel } from 'src/game/level/createLevel';
import { createAmbientLight } from 'src/game/lights/createAmbientLight';
import { createDirectionalLight } from 'src/game/lights/createDirectionalLight';
import { registerEventListeners } from 'src/game/listeners/registerEventListeners';
import type { Game } from 'src/game/typings/Game';
import type { AnimationMixer } from 'three';

export const main = async (): Promise<Game> => {
  const world = createWorld();

  const camera = createCamera();

  const input = createInput();

  const renderer = createRenderer();

  const loadingManager = createLoadingManager();

  const scene = createScene({
    loadingManager,
  });

  const mixers: AnimationMixer[] = [];

  const player = await createPlayer({
    actor: await createActor({
      loadingManager,
      mixers,
    }),
    camera,
    input,
  });

  const actions = registerActionHandlers(player.actor);

  const effects = registerEffectHandlers(player.actor);

  const level = createLevel({
    constructors: {
      gameObjects: [
        //
        () => createInfinitePlane(),
        ...new Array(10).fill(() => createSphere()),
        () => player.actor,
      ],
      lights: [
        //
        createAmbientLight,
        createDirectionalLight,
      ],
    },
    scene,
    world,
  } as const);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Essential Side Effects 🤦‍♂️ *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const gameLoop = createGameLoop({
    level,
    mixers,
    player,
    renderer,
    scene,
    world,
  });

  mapInputToKeys(player);

  mapKeysToEffects({
    actions,
    effects,
    player,
  });

  mapEffectsToAnimationNames({
    actions,
    actor: player.actor,
    input,
  });

  mapAnimationNamesToAnimations(player.actor);

  registerEventListeners({
    camera,
    input,
    renderer,
  });

  actions.startIdling();

  cannonDebugger(scene, world.bodies);

  gameLoop();

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return {
    mixers,
    player,
    renderer,
    scene,
  } as const;
};
