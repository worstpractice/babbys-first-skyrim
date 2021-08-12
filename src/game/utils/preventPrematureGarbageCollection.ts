import { camera } from "src/game/engine/camera";
import { mixers } from "src/game/engine/mixers";
import { renderer } from "src/game/engine/renderer";
import { scene } from "src/game/engine/scene";
import type { App } from "src/game/typings/App";

export const preventPrematureGarbageCollection = (): App => {
  return {
    camera,
    mixers,
    renderer,
    scene,
  } as const;
};
