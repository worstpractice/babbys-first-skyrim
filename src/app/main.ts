import { registerEventListeners } from "./listeners/registerEventListeners";
import type { App } from "./typings/App";
import { preventPrematureGarbageCollection } from "./utils/preventPrematureGarbageCollection";
import { createWorld } from "./world/createWorld";
import { loadPlayerCharacter } from "./asset-loading/loadPlayerCharacter";

export const main = async (): Promise<App> => {
  registerEventListeners();

  createWorld();

  await loadPlayerCharacter();

  return preventPrematureGarbageCollection();
};
