import { loadPlayerCharacter } from "src/game/asset-loading/loadPlayerCharacter";
import { registerEventListeners } from "src/game/listeners/registerEventListeners";
import type { App } from "src/game/typings/App";
import { preventPrematureGarbageCollection } from "src/game/utils/preventPrematureGarbageCollection";
import { createWorld } from "src/game/world/createWorld";

export const main = async (): Promise<App> => {
  registerEventListeners();

  createWorld();

  await loadPlayerCharacter();

  return preventPrematureGarbageCollection();
};
