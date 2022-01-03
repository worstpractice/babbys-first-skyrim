import { Vec3 } from 'cannon-es';
import { default as cannonDebugger } from 'cannon-es-debugger';
import { createCamera } from 'src/engine/createCamera';
import { createGameLoop } from 'src/engine/createGameLoop';
import { createLoadingManager } from 'src/engine/createLoadingManager';
import { createPlayer } from 'src/engine/createPlayer';
import { createRenderer } from 'src/engine/createRenderer';
import { createScene } from 'src/engine/createScene';
import { createWorld } from 'src/engine/createWorld';
import { registerActionHandlers } from 'src/game/cascade/actions/registerActionHandlers';
import { registerEffectHandlers } from 'src/game/cascade/effects/registerEffectHandlers';
import { mapAnimationNamesToAnimations } from 'src/game/cascade/mapAnimationNamesToAnimations';
import { mapEffectsToAnimationNames } from 'src/game/cascade/mapEffectsToAnimationNames';
import { mapInputToKeys } from 'src/game/cascade/mapInputToKeys';
import { mapKeysToEffects } from 'src/game/cascade/mapKeysToEffects';
import { createActor } from 'src/game/entities/createActor';
import { createAmbientLight } from 'src/game/entities/createAmbientLight';
import { createDirectionalLight } from 'src/game/entities/createDirectionalLight';
import { createGround } from 'src/game/entities/createGround';
import { createInventory } from 'src/game/entities/createInventory';
import { createSphere } from 'src/game/entities/createSphere';
import { createInput } from 'src/game/input/createInput';
import { registerEventListeners } from 'src/game/input/registerEventListeners';
import { createLevel } from 'src/game/level/createLevel';
import { loadKnightAnimations } from 'src/game/loading/loadKnightAnimations';
import { loadMesh } from 'src/game/loading/loadMesh';
import { addPositionToMesh } from 'src/game/loading/tweaks/addPositionToMesh';
import { alignMeshToPlayer } from 'src/game/loading/tweaks/alignMeshToPlayer';
import { attachMeshTo } from 'src/game/loading/tweaks/attachMeshTo';
import { setMeshScalar } from 'src/game/loading/tweaks/setMeshScalar';
import { upsert } from 'src/game/loading/tweaks/upsertTable';
import type { Game } from 'src/game/typings/Game';
import { itemNameToMesh } from 'src/views/lookup-tables/itemNameToMesh';
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

  const playerMesh = await loadMesh({
    fileName: 'castle-guard.fbx',
    filePath: './assets/models/castle-guard/',
    loadingManager,
    name: 'knight',
    tweaks: [
      //
      setMeshScalar(0.09),
    ],
  });

  // AIIFE to make it extra clear that `playerMesh` is a shared dependency
  const player = await (async () => {
    const playerMesh = await loadMesh({
      fileName: 'castle-guard.fbx',
      filePath: './assets/models/castle-guard/',
      loadingManager,
      name: 'knight',
      tweaks: [
        //
        setMeshScalar(0.09),
      ],
    });

    return createPlayer({
      actor: await createActor({
        inventory: createInventory({
          startingItems: [
            {
              application: 'attacking',
              mesh: await loadMesh({
                fileName: 'sword.fbx',
                filePath: './assets/models/weapons/',
                loadingManager,
                name: 'sword',
                tweaks: [
                  //
                  setMeshScalar(0.021),
                  alignMeshToPlayer,
                  addPositionToMesh(-10, 13.37, -0.5),
                  attachMeshTo(playerMesh),
                  upsert(itemNameToMesh, 'sword'),
                ],
              }),
              name: 'sword',
            },
          ],
        }),
        mesh: playerMesh,
        mixers,
        nameClipDuos: await loadKnightAnimations({
          fileNameToAction: [
            ['slash.fbx', 'attacking'],
            ['idle.fbx', 'idling'],
            ['jump.fbx', 'jumping'],
            ['run.fbx', 'running'],
            ['walk.fbx', 'walking'],
          ],
          filePath: './assets/animations/sword-and-shield/',
          loadingManager,
        }),
        position: new Vec3(0, 20, 0),
      }),
      camera,
      input,
    });
  })();

  const actions = registerActionHandlers(player.actor);

  const effects = registerEffectHandlers(player.actor);

  const bogdan = await createActor({
    inventory: createInventory({
      startingItems: [],
    }),
    mesh: await loadMesh({
      fileName: 'castle-guard.fbx',
      filePath: './assets/models/castle-guard/',
      loadingManager,
      name: 'knight',
      tweaks: [
        //
        setMeshScalar(0.09),
      ],
    }),
    mixers,
    nameClipDuos: await loadKnightAnimations({
      fileNameToAction: [
        ['slash.fbx', 'attacking'],
        ['idle.fbx', 'idling'],
        ['jump.fbx', 'jumping'],
        ['run.fbx', 'running'],
        ['walk.fbx', 'walking'],
      ],
      filePath: './assets/animations/sword-and-shield/',
      loadingManager,
    }),
    position: new Vec3(0, 40, 0),
  });

  const level = createLevel({
    constructors: {
      gameObjects: [
        //
        () => createGround(),
        () => createSphere(),
        () => createSphere(),
        () => createSphere(),
        () => createSphere(),
        () => createSphere(),
        () => createSphere(),
        () => createSphere(),
        () => createSphere(),
        () => createSphere(),
        () => createSphere(),
        () => player.actor,
        () => bogdan,
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

  console.log(player);

  return {
    actors: [
      //
      player.actor,
      bogdan,
    ],
    mixers,
    player,
    renderer,
    scene,
  } as const;
};
