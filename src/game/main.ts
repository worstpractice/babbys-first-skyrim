import { loadPlayerCharacter } from "src/game/asset-loading/loadPlayerCharacter";
import { camera } from "src/game/engine/camera";
import { createScene } from "src/game/engine/createScene";
import { mixers } from "src/game/engine/mixers";
import { renderer } from "src/game/engine/renderer";
import { registerEventListeners } from "src/game/listeners/registerEventListeners";
import type { App } from "src/game/typings/App";
import { createWorld } from "src/game/world/createWorld";

export const main = async (): Promise<App> => {
  await registerEventListeners();

  const { loadingManager, scene } = await createScene();

  await createWorld(scene);

  await loadPlayerCharacter(loadingManager, scene);

  return {
    camera,
    mixers,
    renderer,
    scene,
  } as const;
};
