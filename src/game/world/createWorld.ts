import { scene } from "src/game/engine/scene";
import { createAmbientLight } from "./createAmbientLight";
import { createDirectionalLight } from "./createDirectionalLight";
import { createGroundPlane } from "./createGroundPlane";

const thingsToAddToScene = [
  //
  createGroundPlane,
  createAmbientLight,
  createDirectionalLight,
] as const;

export const createWorld = (): void => {
  for (const each of thingsToAddToScene) {
    const thing = each();

    scene.add(thing);
  }
};
