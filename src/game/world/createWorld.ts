import { createAmbientLight } from "src/game/world/createAmbientLight";
import { createDirectionalLight } from "src/game/world/createDirectionalLight";
import { createGroundPlane } from "src/game/world/createGroundPlane";
import type { Scene } from "three";

const thingsToAddToScene = [
  //
  createGroundPlane,
  createAmbientLight,
  createDirectionalLight,
] as const;

export const createWorld = async (scene: Scene): Promise<void> => {
  for (const each of thingsToAddToScene) {
    const thing = await each();

    scene.add(thing);
  }
};
