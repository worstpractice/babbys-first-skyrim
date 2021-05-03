import { camera } from "../engine/camera";
import { mixers } from "../engine/mixers";
import { renderer } from "../engine/renderer";
import { scene } from "../engine/scene";
import type { App } from "../typings/App";

export const preventPrematureGarbageCollection = (): App => {
  return {
    camera,
    mixers,
    renderer,
    scene,
  } as const;
};
